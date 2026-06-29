// Proxy to KelownaListings hub — no DDF credentials needed on this site
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { subarea } = req.query;

  try {
    const hubRes = await fetch('https://kelownalistings.com/api/listings?area=glenmore');
    const data   = await hubRes.json();

    if (!data.configured || data.error) {
      return res.status(200).json(data);
    }

    let listings = data.listings || [];

    // Subarea filtering
    if (subarea === 'glenmore') {
      listings = listings.filter(l => l.CityRegion === 'Glenmore');
    } else if (subarea === 'north-glenmore') {
      listings = listings.filter(l => l.CityRegion === 'North Glenmore');
    }

    return res.status(200).json({ configured: true, listings, count: listings.length });

  } catch (err) {
    console.error('Hub error:', err.message);
    return res.status(502).json({ configured: true, error: err.message, listings: [], count: 0 });
  }
};
