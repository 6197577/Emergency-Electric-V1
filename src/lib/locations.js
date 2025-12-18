export const cities = [
  { slug: 'charleston-wv', name: 'Charleston', state: 'WV', phone: '304-410-9208', zip: '25301' },
  { slug: 'union-city-nj', name: 'Union City', state: 'NJ', phone: '304-410-9208', zip: '07087' },
  { slug: 'sunny-isles-beach-fl', name: 'Sunny Isles Beach', state: 'FL', phone: '304-410-9208', zip: '33160' },
  // ... Add the rest of your 50 cities here
];

export function getCityBySlug(slug) {
  return cities.find(city => city.slug === slug);
}
