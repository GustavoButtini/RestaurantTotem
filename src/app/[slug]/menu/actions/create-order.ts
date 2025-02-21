"use server";

import { consumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";

import { removeCpfPunctionation } from "../helpers/cpf";
interface CreateOrderInput {
  customerName: string;
  customerCPF: string;
  products: Array<{
    id: string;
    price: number;
    quantity: number;
  }>;
  consumptionMethod: consumptionMethod;
  slug: string;
}

export const createOrder = async (input: CreateOrderInput) => {
  const prodsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });
  const prodsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: prodsWithPrices.find((p) => p.id === product.id)!.price,
  }));
  const res = await db.restaurant.findUnique({ where: { slug: input.slug } });
  if (!res) {
    throw new Error("Restaurante Invalido");
  }
  await db.order.create({
    data: {
      consumptionMethod: input.consumptionMethod,
      status: "PENDING",
      customerName: input.customerName,
      customerCPF: removeCpfPunctionation(input.customerCPF),
      orderProduct: {
        createMany: {
          data: input.products.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
            price: prodsWithPrices.find((p) => p.id === product.id)!.price,
          })),
        },
      },
      total: prodsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price + product.quantity,
        0,
      ),
      restaurantId: res!.id,
    },
  });
};
