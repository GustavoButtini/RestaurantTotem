import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

export const getRestaurantBySlug = async (slug: string) => {
  const res = await db.restaurant.findUnique({ where: { slug: slug } });
  if (!res) {
    return notFound();
  }
  return res;
};
