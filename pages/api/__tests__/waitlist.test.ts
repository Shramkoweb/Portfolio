import type { NextApiRequest, NextApiResponse } from 'next';

import handler from '@/pages/api/waitlist';

const mockCreate = jest.fn();

jest.mock('lib/prisma', () => ({
  __esModule: true,
  default: {
    waitlist: {
      get create() {
        return mockCreate;
      },
    },
  },
}));

function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: 'POST',
    body: { email: 'user@example.com' },
    ...overrides,
  } as unknown as NextApiRequest;

  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const res = { json, status } as unknown as NextApiResponse;

  return { req, res, json, status };
}

describe('API /api/waitlist', () => {
  describe('method guard', () => {
    it('rejects GET with 405', async () => {
      const { req, res, status } = createMockReqRes({ method: 'GET' });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(405);
    });
  });

  describe('email validation', () => {
    it('rejects missing email', async () => {
      const { req, res, status, json } = createMockReqRes({
        body: {},
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Email is required' });
    });

    it('rejects non-string email', async () => {
      const { req, res, status } = createMockReqRes({
        body: { email: 123 },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
    });

    it('rejects invalid email format', async () => {
      const { req, res, status, json } = createMockReqRes({
        body: { email: 'not-an-email' },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith({ error: 'Invalid email' });
    });

    it('rejects email exceeding max length', async () => {
      const longEmail = 'a'.repeat(250) + '@b.com';
      const { req, res, status } = createMockReqRes({
        body: { email: longEmail },
      });

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(400);
    });
  });

  describe('successful subscription', () => {
    it('normalizes email and creates record', async () => {
      mockCreate.mockResolvedValue({});
      const { req, res, status, json } = createMockReqRes({
        body: { email: '  User@EXAMPLE.com  ' },
      });

      await handler(req, res);

      expect(mockCreate).toHaveBeenCalledWith({
        data: { email: 'user@example.com' },
      });
      expect(status).toHaveBeenCalledWith(201);
      expect(json).toHaveBeenCalledWith({ success: true });
    });
  });

  describe('duplicate email', () => {
    it('returns 409 on Prisma unique constraint violation', async () => {
      mockCreate.mockRejectedValue({ code: 'P2002' });
      const { req, res, status, json } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(409);
      expect(json).toHaveBeenCalledWith({ error: 'Already subscribed' });
    });
  });

  describe('error handling', () => {
    it('returns 500 on unexpected error', async () => {
      mockCreate.mockRejectedValue(new Error('DB down'));
      const { req, res, status } = createMockReqRes();

      await handler(req, res);

      expect(status).toHaveBeenCalledWith(500);
    });
  });
});
