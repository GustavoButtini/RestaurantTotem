import { PrismaClient } from "@prisma/client";

declare global {
  //eslint-disable-next-line no-var
  var prismaCached: PrismaClient;
}
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prismaCached) {
    global.prismaCached = new PrismaClient();
  }
  prisma = global.prismaCached;
}

export const db = prisma;
