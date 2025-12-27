export const cities = [
  { slug: 'charleston-wv', name: 'Charleston', state: 'WV', phone: '304-410-9208', zip: '25301' },
  { slug: 'union-city-nj', name: 'Union City', state: 'NJ', phone: '304-410-9208', zip: '07087' },
  { slug: 'sunny-isles-beach-fl', name: 'Sunny Isles Beach', state: 'FL', phone: '304-410-9208', zip: '33160' },
  // --- PRIORITY TARGETS (Your Home Bases) ---
  { 
    slug: "charleston-wv", 
    name: "Charleston", 
    state: "WV", 
    zip: "25301", 
    county: "Kanawha", 
    type: "Headquarters",
    keywords: "aging homes, knob and tube, storm resilience, generator maintenance"
  },
  { 
    slug: "teays-valley-wv", 
    name: "Teays Valley", 
    state: "WV", 
    zip: "25560", 
    county: "Putnam", 
    type: "Satellite",
    keywords: "residential growth, panel upgrades, smart home installation"
  },
  { 
    slug: "gainesville-fl", 
    name: "Gainesville", 
    state: "FL", 
    zip: "32601", 
    county: "Alachua", 
    type: "Expansion",
    keywords: "hurricane prep, surge protection, humidity control, student housing safety"
  },

  // --- TOP DENSELY POPULATED CITIES (Programmatic Scale) ---
  // North East Corridor (Aging Infrastructure Focus)
  { slug: "new-york-ny", name: "New York City", state: "NY", zip: "10001", county: "New York", keywords: "brownstones, rewiring, commercial codes" },
  { slug: "jersey-city-nj", name: "Jersey City", state: "NJ", zip: "07302", county: "Hudson", keywords: "high-rise safety, urban retrofit" },
  { slug: "paterson-nj", name: "Paterson", state: "NJ", zip: "07501", county: "Passaic", keywords: "industrial electrical, aging grid" },
  { slug: "camden-nj", name: "Camden", state: "NJ", zip: "08103", county: "Camden", keywords: "infrastructure repair, safety audits" },
  { slug: "philadelphia-pa", name: "Philadelphia", state: "PA", zip: "19107", county: "Philadelphia", keywords: "row homes, historic preservation, brick wiring" },
  { slug: "boston-ma", name: "Boston", state: "MA", zip: "02108", county: "Suffolk", keywords: "triple-deckers, old wiring, snow resilience" },
  { slug: "cambridge-ma", name: "Cambridge", state: "MA", zip: "02138", county: "Middlesex", keywords: "tech commercial, lab safety, residential upgrades" },
  { slug: "somerville-ma", name: "Somerville", state: "MA", zip: "02143", county: "Middlesex", keywords: "dense residential, panel capacity" },
  { slug: "newark-nj", name: "Newark", state: "NJ", zip: "07102", county: "Essex", keywords: "commercial logistics, airport proximity, infrastructure" },
  { slug: "elizabeth-nj", name: "Elizabeth", state: "NJ", zip: "07201", county: "Union", keywords: "port industry, residential safety" },

  // West Coast (Earthquake & Modernization Focus)
  { slug: "san-francisco-ca", name: "San Francisco", state: "CA", zip: "94102", county: "San Francisco", keywords: "victorian homes, seismic safety, EV chargers" },
  { slug: "daly-city-ca", name: "Daly City", state: "CA", zip: "94015", county: "San Mateo", keywords: "fog corrosion, residential upgrades" },
  { slug: "berkeley-ca", name: "Berkeley", state: "CA", zip: "94704", county: "Alameda", keywords: "student housing, seismic retrofit, green energy" },
  { slug: "santa-monica-ca", name: "Santa Monica", state: "CA", zip: "90401", county: "Los Angeles", keywords: "luxury residential, commercial retail, automation" },
  { slug: "west-hollywood-ca", name: "West Hollywood", state: "CA", zip: "90069", county: "Los Angeles", keywords: "high-end finish, smart lighting, entertainment commercial" },
  { slug: "los-angeles-ca", name: "Los Angeles", state: "CA", zip: "90012", county: "Los Angeles", keywords: "commercial studios, residential sprawl, heat load" },
  { slug: "long-beach-ca", name: "Long Beach", state: "CA", zip: "90802", county: "Los Angeles", keywords: "port infrastructure, coastal corrosion" },
  { slug: "santa-ana-ca", name: "Santa Ana", state: "CA", zip: "92701", county: "Orange", keywords: "dense housing, multi-family units" },
  { slug: "huntington-park-ca", name: "Huntington Park", state: "CA", zip: "90255", county: "Los Angeles", keywords: "industrial manufacturing, residential safety" },
  { slug: "inglewood-ca", name: "Inglewood", state: "CA", zip: "90301", county: "Los Angeles", keywords: "commercial development, sports venues, housing" },

  // Midwest (Weather Extremes & Industrial)
  { slug: "chicago-il", name: "Chicago", state: "IL", zip: "60601", county: "Cook", keywords: "conduit requirements, winter heating, high-rise" },
  { slug: "cicero-il", name: "Cicero", state: "IL", zip: "60804", county: "Cook", keywords: "manufacturing support, brick bungalow wiring" },
  { slug: "evanston-il", name: "Evanston", state: "IL", zip: "60201", county: "Cook", keywords: "university housing, older estates" },
  { slug: "oak-park-il", name: "Oak Park", state: "IL", zip: "60302", county: "Cook", keywords: "historic homes, frank lloyd wright era wiring" },
  { slug: "berwyn-il", name: "Berwyn", state: "IL", zip: "60402", county: "Cook", keywords: "dense bungalows, service upgrades" },
  { slug: "minneapolis-mn", name: "Minneapolis", state: "MN", zip: "55401", county: "Hennepin", keywords: "severe cold, heating circuits, backup power" },
  { slug: "st-paul-mn", name: "St. Paul", state: "MN", zip: "55102", county: "Ramsey", keywords: "historic preservation, boiler wiring" },

  // South & Florida (Hurricanes, Humidity, Cooling)
  { slug: "miami-fl", name: "Miami", state: "FL", zip: "33101", county: "Miami-Dade", keywords: "hurricane generators, salt air, condo maintenance" },
  { slug: "hialeah-fl", name: "Hialeah", state: "FL", zip: "33010", county: "Miami-Dade", keywords: "industrial parks, multi-generation housing" },
  { slug: "miami-beach-fl", name: "Miami Beach", state: "FL", zip: "33139", county: "Miami-Dade", keywords: "hospitality commercial, luxury condos, flood safety" },
  { slug: "fort-lauderdale-fl", name: "Fort Lauderdale", state: "FL", zip: "33301", county: "Broward", keywords: "marine electrical, dock power, high-rise" },
  { slug: "alexandria-va", name: "Alexandria", state: "VA", zip: "22314", county: "Alexandria City", keywords: "historic district, government contractors, older panels" },
  { slug: "arlington-va", name: "Arlington", state: "VA", zip: "22201", county: "Arlington", keywords: "commercial office, high-density residential" },

  // Other Major Density Centers
  { slug: "washington-dc", name: "Washington", state: "DC", zip: "20004", county: "District of Columbia", keywords: "federal buildings, row houses, historic codes" },
  { slug: "baltimore-md", name: "Baltimore", state: "MD", zip: "21202", county: "Baltimore City", keywords: "row homes, waterfront commercial, revitalization" },
  { slug: "seattle-wa", name: "Seattle", state: "WA", zip: "98104", county: "King", keywords: "moisture protection, tech office, EV infrastructure" },
  { slug: "providence-ri", name: "Providence", state: "RI", zip: "02903", county: "Providence", keywords: "historic homes, college housing, urban commercial" },
  { slug: "central-falls-ri", name: "Central Falls", state: "RI", zip: "02863", county: "Providence", keywords: "multi-family density, safety inspections" },
  { slug: "hartford-ct", name: "Hartford", state: "CT", zip: "06103", county: "Hartford", keywords: "insurance headquarters, commercial uptime" },
  { slug: "new-haven-ct", name: "New Haven", state: "CT", zip: "06510", county: "New Haven", keywords: "university infrastructure, coastal resilience" },
  { slug: "bridgeport-ct", name: "Bridgeport", state: "CT", zip: "06604", county: "Fairfield", keywords: "industrial conversion, multi-family safety" },
  { slug: "yonkers-ny", name: "Yonkers", state: "NY", zip: "10701", county: "Westchester", keywords: "riverfront development, commuter residential" },
  { slug: "mount-vernon-ny", name: "Mount Vernon", state: "NY", zip: "10550", county: "Westchester", keywords: "dense suburban, service upgrades" },
  { slug: "new-rochelle-ny", name: "New Rochelle", state: "NY", zip: "10801", county: "Westchester", keywords: "coastal residential, downtown revitalization" },
  { slug: "passaic-nj", name: "Passaic", state: "NJ", zip: "07055", county: "Passaic", keywords: "dense urban, mixed-use buildings" },
  { slug: "union-city-nj", name: "Union City", state: "NJ", zip: "07087", county: "Hudson", keywords: "highest density, fire safety compliance" },
  { slug: "west-new-york-nj", name: "West New York", state: "NJ", zip: "07093", county: "Hudson", keywords: "hudson river views, high-rise wiring" }
];

];

export function getCityBySlug(slug) {
  return cities.find(city => city.slug === slug);
}
