"use client"

import React, { useContext } from 'react'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { CartContext } from '../contexts/cart'
import CartItem from './cartitem'

const ShippingCart = () => {
  const {isOpen,products,toggleCart} = useContext(CartContext)
  return (
    <>
    <Sheet open={isOpen} onOpenChange={() => {toggleCart()}}>
        <SheetContent className='w-[75%]'>
            <SheetHeader>
                <SheetTitle className='text-left'>Sacola</SheetTitle>
            </SheetHeader>
            <div className="py-5">
              {products.map((prod)=>(
                <CartItem
                  prod={prod}
                  key={prod.id}
                />
              ))}
            </div>
        </SheetContent>
    </Sheet>
    </>

  )
}
export default ShippingCart