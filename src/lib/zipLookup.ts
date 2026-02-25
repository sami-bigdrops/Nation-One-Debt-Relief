const ZIPPO_API = 'https://api.zippopotam.us/us';

export type ZipLookupResult = { city: string; state: string } | null;

export async function lookupZip(zip: string): Promise<ZipLookupResult> {
  const digits = zip.replace(/\D/g, '');
  if (digits.length !== 5) return null;
  try {
    const res = await fetch(`${ZIPPO_API}/${digits}`);
    if (!res.ok) return null;
    const data = await res.json();
    const place = data?.places?.[0];
    if (!place) return null;
    const city = place['place name'] ?? '';
    const state = place['state abbreviation'] ?? '';
    return city && state ? { city: String(city), state: String(state) } : null;
  } catch {
    return null;
  }
}
