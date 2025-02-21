"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' |'price' | 'imageUrl'>{
    quantity:number
}

export interface ICartContext{
    isOpen:boolean;
    products:CartProduct[]
    toggleCart: () => void
    addProduct: (prod:CartProduct) => void
}

export const CartContext = createContext<ICartContext>({
   isOpen:false,
   products:[],
   toggleCart: () => {},
   addProduct: () => {},
})
export const CartProvider = ({children} : {children: ReactNode}) =>{
    const [products,setProducts] = useState<CartProduct[]>([])
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const toggleCart = () =>{
        setIsOpen(prev => !prev);
    }
    const addProduct =(prod: CartProduct)  =>{
            const isProdInCart = products.some(prevProd => prevProd.id === prod.id);
            if(!isProdInCart){
                return setProducts((prev) => [...prev,prod])
            }
            setProducts(prevProd =>{
                return prevProd.map(prodOld => {
                    if(prodOld.id === prod.id){
                        return {
                            ...prodOld,
                            quantity:prodOld.quantity + prod.quantity,
                        }
                    }
                    return prodOld;
                })
            })
    }
    return(
        <CartContext.Provider value={{isOpen,products,toggleCart,addProduct,}}> 
            {children}
        </CartContext.Provider>
    )
}