"use client"

import React, { useContext} from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { MoneyFormat } from '@/helpers/moneyFormat'

import { CartContext } from '../contexts/cart'
import CartItem from './cartitem'

const ShippingCart = () => {
  const {isOpen,products,toggleCart} = useContext(CartContext)
  let total:number = 0;
  return (
    <>
    {products.map(prod =>{total = total +( prod.price*prod.quantity)})}
    <Sheet open={isOpen} onOpenChange={() => {toggleCart()}} >
        <SheetContent className='w-[75%]'>
            <SheetHeader>
                <SheetTitle className='text-left'>Sacola</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full py-5">
              <div className="flex-auto">
                {products.map((prod)=>(
                  <CartItem
                    prod={prod}
                    key={prod.id}
                  />
                ))}
              </div>
              <div className="w-full h-[150px] self-center mb-3 flex justify-center">
                <div className="h-full w-[95%] border-gray-200 border-2 self-center rounded-xl">
                  <div className="flex items-center justify-between border-gray 200 border-b-2 p-2">
                    <p className='text-sm font-light'>Subtotal</p>
                    <p className='text-sm font-semibold'>{MoneyFormat(total)}</p>
                  </div>
                  <div className="flex items-center justify-between border-gray 200 border-b-2 p-2">
                    <p className='text-sm font-light'>Descontos</p>
                    <p className='text-sm font-semibold'>{MoneyFormat(0)}</p>
                  </div>
                  <div className="flex items-center justify-between border-gray 200 border-b-2 p-2 py-5">
                    <p className='text-lg font-black'>Total</p>
                    <p className='text-lg font-black'>{MoneyFormat(total-0)}</p>
                  </div>
                </div>
              </div>
              <Button className="w-full rounded-full">
                Finalizar compra
              </Button>
            </div>
        </SheetContent>
    </Sheet>
    </>

  )
}
export default ShippingCart