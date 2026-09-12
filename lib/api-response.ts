export function errorResponse(status: number, message: string): Response {
  return Response.json({ error: { message } }, { status });
}

export const SERVER_ERROR_MESSAGE = 'Internal Server Error';
