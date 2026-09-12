/**
 * @jest-environment node
 */
import { errorResponse } from '@/lib/api-response';

describe('errorResponse', () => {
  it('returns the status and the { error: { message } } body', async () => {
    const res = errorResponse(404, 'Unknown slug');

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: { message: 'Unknown slug' } });
  });
});
