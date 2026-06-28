// Vercel serverless function — CREA DDF RESO Web API via OAuth2
// Env vars required: CREA_USERNAME, CREA_PASSWORD

const TOKEN_URL  = 'https://identity.crea.ca/connect/token';
const RESO_BASE  = 'https://ddfapi.realtor.ca/odata/v1/Property';
const OFFICE_URL = 'https://ddfapi.realtor.ca/odata/v1/Office';

// Module-level token cache — survives across warm container invocations
let _cachedToken    = null;
let _tokenExpiresAt = 0;

async function getBearerToken(clientId, clientSecret) {
  const now = Date.now();
  if (_cachedToken && now < _tokenExpiresAt - 30000) return _cachedToken;

  const res = await fetch(TOKEN_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:    new URLSearchParams({ grant_type: 'client_credentials', client_id: clientId, client_secret: clientSecret }).toString()
  });

  if (!res.ok) throw new Error(`Token request failed ${res.status}`);

  const data      = await res.json();
  _cachedToken    = data.access_token;
  _tokenExpiresAt = now + (data.expires_in || 3600) * 1000;
  return _cachedToken;
}

const $select = [
  'ListingKey', 'ListingId', 'ListPrice',
  'StreetNumber', 'UnitNumber', 'StreetName', 'StreetSuffix',
  'City', 'PostalCode', 'StateOrProvince',
  'PropertySubType', 'StructureType',
  'BedroomsTotal', 'BathroomsTotalInteger', 'LivingArea',
  'PublicRemarks', 'StandardStatus', 'PhotosCount',
  'OriginalEntryTimestamp', 'ModificationTimestamp',
  'ListOfficeKey', 'ListingURL',
  'CityRegion',
  'Media'
].join(',');

async function queryRESO(token, filter, skip = 0) {
  const url = `${RESO_BASE}?$filter=${encodeURIComponent(filter)}&$select=${encodeURIComponent($select)}&$orderby=${encodeURIComponent('OriginalEntryTimestamp desc')}&$top=100&$skip=${skip}`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':        'application/json',
      'User-Agent':    'OwnGlenmore/1.0 (ownglenmore.com)'
    }
  });

  return res;
}

async function queryAllRESO(token, filter) {
  let allListings = [];
  let skip = 0;
  while (true) {
    const res = await queryRESO(token, filter, skip);
    if (!res.ok) return { ok: false, status: res.status, body: await res.text().catch(() => '') };
    const data = await res.json();
    const page = data.value || [];
    allListings = allListings.concat(page);
    if (page.length < 100) break;
    skip += 100;
    if (skip >= 500) break; // safety cap at 500
  }
  return { ok: true, listings: allListings };
}

async function fetchOfficeNames(token, officeKeys) {
  if (!officeKeys.length) return {};

  const filter = officeKeys.map(k => `OfficeKey eq '${k}'`).join(' or ');
  const url = `${OFFICE_URL}?$filter=${encodeURIComponent(filter)}&$select=OfficeKey,OfficeName`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept':        'application/json',
      'User-Agent':    'OwnGlenmore/1.0 (ownglenmore.com)'
    }
  });

  if (!res.ok) return {};

  const data = await res.json();
  const map  = {};
  for (const office of (data.value || [])) {
    map[office.OfficeKey] = office.OfficeName;
  }
  return map;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const clientId     = process.env.CREA_USERNAME;
  const clientSecret = process.env.CREA_PASSWORD;

  if (!clientId || !clientSecret) {
    return res.status(200).json({ configured: false, listings: [], count: 0 });
  }

  const { subarea } = req.query;

  const filters = [
    "City eq 'Kelowna'",
    "StateOrProvince eq 'British Columbia'",
    "(CityRegion eq 'Glenmore' or CityRegion eq 'North Glenmore')",
    "StandardStatus eq 'Active'"
  ];

  if (subarea === 'glenmore') {
    filters.push("CityRegion eq 'Glenmore'");
  } else if (subarea === 'north-glenmore') {
    filters.push("CityRegion eq 'North Glenmore'");
  }

  const $filter = filters.join(' and ');

  try {
    let token = await getBearerToken(clientId, clientSecret);
    let result = await queryAllRESO(token, $filter);

    // On 401, retry with fresh token
    if (!result.ok && result.status === 401) {
      _cachedToken = null;
      token  = await getBearerToken(clientId, clientSecret);
      result = await queryAllRESO(token, $filter);
    }

    if (!result.ok) {
      console.error(`DDF ${result.status}:`, result.body.slice(0, 500));
      return res.status(502).json({ configured: true, error: `DDF returned ${result.status}: ${result.body.slice(0, 200)}`, listings: [], count: 0 });
    }

    const listings = result.listings;

    // Batch-fetch office names for all unique ListOfficeKeys
    const uniqueKeys = [...new Set(listings.map(l => l.ListOfficeKey).filter(Boolean))];
    const officeMap  = await fetchOfficeNames(token, uniqueKeys);

    // Filter to residential only — exclude commercial/industrial/agriculture
    const residentialTypes = new Set(['Single Family', 'Multi-family', 'Other']);
    const residentialStructures = new Set(['House', 'Apartment', 'Row / Townhouse', 'Manufactured Home', 'Duplex', 'Fourplex', 'Multi-Family']);
    const filtered = listings.filter(l => {
      const struct = Array.isArray(l.StructureType) ? l.StructureType[0] : l.StructureType;
      return residentialStructures.has(struct) || residentialTypes.has(l.PropertySubType);
    });

    // Merge OfficeName onto each listing and normalise ListingURL
    for (const l of filtered) {
      if (l.ListOfficeKey && officeMap[l.ListOfficeKey]) {
        l.ListOfficeName = officeMap[l.ListOfficeKey];
      }
      // ListingURL comes back without protocol — prepend https://
      if (l.ListingURL && !l.ListingURL.startsWith('http')) {
        l.ListingURL = 'https://' + l.ListingURL;
      }
    }

    return res.status(200).json({
      configured: true,
      listings: filtered,
      count: filtered.length
    });

  } catch (err) {
    console.error('DDF error:', err.message);
    return res.status(502).json({ configured: true, error: err.message, listings: [], count: 0 });
  }
};
