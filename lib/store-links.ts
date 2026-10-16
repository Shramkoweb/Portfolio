export function withStoreUtm(
  url: string,
  medium: string,
  campaign: string,
): string {
  const tagged = new URL(url);
  tagged.searchParams.set('utm_source', 'shramko.dev');
  tagged.searchParams.set('utm_medium', medium);
  tagged.searchParams.set('utm_campaign', campaign);
  return tagged.toString();
}
