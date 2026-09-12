export function routeContext<T extends Record<string, string>>(params: T) {
  return { params: Promise.resolve(params) };
}

export function jsonRequest(
  url: string,
  init: { method?: string; body?: unknown } = {},
): Request {
  const { method = 'GET', body } = init;
  return new Request(`http://localhost${url}`, {
    method,
    ...(body !== undefined
      ? {
          headers: { 'Content-Type': 'application/json' },
          body: typeof body === 'string' ? body : JSON.stringify(body),
        }
      : {}),
  });
}
