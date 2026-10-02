export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  // Throw so SWR treats it as an error and retries, instead of caching the
  // error body as data.
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}
