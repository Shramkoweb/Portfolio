import { PrismaClient } from '@prisma/client';
import { isProduction } from '@/lib/utils';

 
/* https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices#solution */

declare global {
  // allow global `var` declarations
   
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (!isProduction()) {
  global.prisma = prisma;
}
