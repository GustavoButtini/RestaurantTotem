"use client"

import React, { useContext } from 'react'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'

import { CartContext } from '../contexts/cart'

const ShippingCart = () => {
  const {isOpen,toggleCart} = useContext(CartContext)
  return (
    <>
    <Sheet open={isOpen} onOpenChange={() => {toggleCart()}}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Sua Sacola</SheetTitle>
                <SheetDescription>Texto Dummy</SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
    </>

  )
}
export default ShippingCart