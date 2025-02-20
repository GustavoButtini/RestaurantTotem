"use client"

import { CrossIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { MoneyFormat } from '@/helpers/moneyFormat'

import { CartContext } from '../contexts/cart'

const ShippingCart = () => {
  const {isOpen,products,toggleCart} = useContext(CartContext)
  return (
    <>
    <Sheet open={isOpen} onOpenChange={() => {toggleCart()}}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Sua Sacola</SheetTitle>
                <SheetDescription>Texto Dummy</SheetDescription>
            </SheetHeader>
            {products.map((prod)=>(
              <div key={prod.id}>
                <Image 
                  src={prod.imageUrl}
                  alt={prod.name}
                  height={50}
                  width={50}
                />
                <h1 >{prod.quantity}x {prod.name} </h1>
                <p>{MoneyFormat(prod.price*prod.quantity)}</p>
                <Button variant="destructive">
                    x
                </Button>
              </div>

            ))}
        </SheetContent>
    </Sheet>
    </>

  )
}
export default ShippingCart