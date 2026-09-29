import type { NextApiRequest, NextApiResponse } from 'next';

export function createMockReqRes(overrides: Partial<NextApiRequest> = {}) {
  const req = {
    method: 'GET',
    headers: {},
    ...overrides,
  } as unknown as NextApiRequest;

  const json = jest.fn();
  const status = jest.fn().mockReturnThis();
  const send = jest.fn();
  const setHeader = jest.fn();
  const res = { json, send, status, setHeader } as unknown as NextApiResponse;

  return { req, res, json, send, status, setHeader };
}
