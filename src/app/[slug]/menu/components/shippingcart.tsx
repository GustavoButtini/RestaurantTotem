"use client";

import React, { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MoneyFormat } from "@/helpers/moneyFormat";

import { CartContext } from "../contexts/cart";
import CartItem from "./cartitem";
import FinishOrderDialog from "./finish-order-dialog";

const ShippingCart = () => {
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  const { isOpen, total, products, toggleCart } = useContext(CartContext);
  return (
    <>
      <Sheet
        open={isOpen}
        onOpenChange={() => {
          toggleCart();
        }}
      >
        <SheetContent className="w-[75%]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col py-5">
            <div className="flex-auto">
              {products.map((prod) => (
                <CartItem prod={prod} key={prod.id} />
              ))}
            </div>
            <div className="mb-3 flex h-[189px] w-full justify-center self-center">
              <div className="h-full w-[95%] self-center rounded-xl border-2 border-gray-200">
                <div className="border-gray 200 flex items-center justify-between rounded-xl border-b-2 p-5">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-semibold">{MoneyFormat(total)}</p>
                </div>
                <div className="border-gray 200 flex items-center justify-between rounded-xl border-b-2 p-5">
                  <p className="text-sm text-muted-foreground">Descontos</p>
                  <p className="text-sm font-semibold">{MoneyFormat(0)}</p>
                </div>
                <div className="border-gray 200 flex items-center justify-between rounded-xl border-b-2 p-5">
                  <p className="text-sm font-semibold text-muted-foreground">
                    Total
                  </p>
                  <p className="text-sm font-bold">{MoneyFormat(total - 0)}</p>
                </div>
              </div>
            </div>
            <Button
              className="w-full rounded-full"
              onClick={() => {
                setFinishOrderDialogIsOpen(true);
              }}
            >
              Finalizar Pedido
            </Button>
            <FinishOrderDialog
              open={finishOrderDialogIsOpen}
              onOpenChange={setFinishOrderDialogIsOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
export default ShippingCart;
