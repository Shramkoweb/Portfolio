import { PrismaClient } from '@prisma/client';

/* https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution */

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var,vars-on-top
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
