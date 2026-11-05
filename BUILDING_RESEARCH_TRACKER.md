# OwnGlenmore Building Research Tracker

Source: live DDF feed via `https://ownglenmore.com/api/listings` (proxies `https://kelownalistings.com/api/listings?area=glenmore`), pulled 2026-11-05. 210 active listings at time of pull, grouped by normalized civic address (StreetNumber + StreetName, directional suffixes normalized where present) and cross-referenced against the 15 buildings already live on the site.

**Methodology:** never invent building names, unit counts, year built, or amenities. A building name is only used if confirmed via matching `PublicRemarks` text across its listings — otherwise the page title/slug is the civic address itself, matching the convention used elsewhere on this site and across this network for unnamed buildings. An address needs 2+ active listings to justify a dedicated page. Tenure note: this site's listings proxy does not expose a title/tenure field (trimmed field set compared to the raw DDF export used on some other sites in this network) — all 5 new buildings below are treated as Freehold/Strata by convention, consistent with every other Glenmore building already on this site (none flagged leasehold), since remarks for none of them mention a land lease. Not independently re-verified per-listing beyond that.

## Already covered (15, pre-existing)
glenmore-place, yaletown, the-verve, sandpointe, glenmore-central, trellis, the-peaks, parkway-place, drysdale-row, skyview-terraces, glenmeadows, the-grove-glenmore, orchard-brook-village, parklane-glenmore, eminence-knox-mountain.

## New pages built this pass (5)

| Status | Address | Building Name | # Listings | Page URL | Notes |
|---|---|---|---|---|---|
| ✅ Page live | 600 Boynton Place | Glen Valley | 5 | `/glen-valley` | Name confirmed via remarks. 2012 Tommie Award winner, geothermal heating/cooling, next to Knox Mountain Park. Different building from the existing Eminence at Knox Mountain (630 Boynton Place) despite sharing the street. |
| ✅ Page live | 218 Glen Park Drive | Elios | 2 | `/elios` | Name confirmed via remarks. Walking distance to groceries/schools, quick UBCO commute. |
| ✅ Page live | 1660 Ufton Court | Parkside Manor | 4 | `/parkside-manor` | Name confirmed via remarks (1 of 4 listings). Neighbours the Parkinson Recreation Centre. |
| ✅ Page live | 1665 Ufton Court | Tudor Manor | 2 | `/tudor-manor` | Name confirmed via remarks. Separate building from Parkside Manor despite sharing Ufton Court — confirmed via distinct civic number and distinct remarks. |
| ✅ Page live | 1870 Parkinson Way | 1870 Parkinson Way | 2 | `/1870-parkinson-way` | No distinct marketed name found across either listing. Used address as title/slug per site convention. |

## Checked, not built (real addresses, correctly excluded)

| Address | # Listings | Reason excluded |
|---|---|---|
| 630 Boynton Place | 6 | Already covered — existing `/eminence-knox-mountain` page. |
| 720 Valley Road | 3 | Already covered — existing `/trellis` page. |
| 722 Valley Road | 2 | Already covered — existing `/glenmore-central` page. |
| 1455 Cara Glen Court | 3 | Already covered — existing `/the-peaks` page. |
| 1515 Highland Drive | 3 | Already covered — existing `/skyview-terraces` page. |
| 1483 Glenmore Road | 2 | Already covered — existing `/yaletown` page. |
| 115 Wyndham Crescent | 2 | Already covered — existing `/parklane-glenmore` page. |
| 615 Glenmeadows Road | 2 | Already covered — existing `/glenmeadows` page. |
| 400 Sutton Crescent | 2 | Already covered — existing `/orchard-brook-village` page. |
| 300 Drysdale Boulevard | 2 | Already covered — existing `/the-grove-glenmore` page. |
| 571 Yates Road | 2 | Already covered — existing `/the-verve` page. |
| 595 Yates Road | 4 | Confirmed via remarks as SandPointe — same building as existing `/sandpointe` page (which previously had no exact civic number confirmed; now confirmed as 595 Yates Road among others). |
| 533, 539, 547, 555, 563 Yates Road | 2–3 each | All confirmed via remarks as "The Verve" — same building as existing `/the-verve` page (571 Yates Road). The Verve spans multiple civic addresses along Yates Road; not separate buildings. |
| 180 Sheerwater Court | 3 | Real, named gated waterfront enclave (Sheerwater) of individually-named custom estate homes (Luminescence, Mont des Cieux) plus a vacant land parcel — not a strata condo/townhome building, out of scope for this site's building directory. |
| 250 Lochview Road | 2 | Vacant land / lakeshore acreage parcels, not a residential strata building. |
| 2400 Longhill Road | 2 | Agricultural acreage property with a detached art studio, not a strata building. |
| 371 Valley Road | 2 | 13.7-acre farm estate property, not a strata building. |
| 2550 Hollywood Road | 2 | Individual single-family detached homes in the College Heights area, not a strata complex. |
| 1634 Harvey Avenue | 2 | Commercial office space listings, not residential. |
| 3036, 3116, 3179, 3196 Appaloosa Road | 2–4 each | Appaloosa Industrial Centre / Appaloosa industrial corridor — I2-zoned industrial/commercial units, not residential. |

## Site-wide wiring completed
- Footer "Buildings" list updated across all 36 pages that carry it — this site has two different footer HTML formats (compact single-line, used on building pages, and pretty-printed multi-line, used on the homepage/blog/team/contact/etc.); both caught and handled correctly via indentation-matching insertion.
- Homepage `#buildings` section: 5 new cards added (as `.building-card-extra`, revealed via the existing "View All" toggle, consistent with how the last several pre-existing buildings are shown), "View All 15 Buildings" → "View All 20 Buildings" (both the button text and the JS toggle string).
- The "More Buildings Coming Soon" card remains last in the grid, position and styling unchanged.
- `sitemap.xml`: 5 new URLs added.
