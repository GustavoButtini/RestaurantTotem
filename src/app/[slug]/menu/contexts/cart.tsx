"use client"
import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, 'id' | 'name' |'price' | 'imageUrl'>{
    quantity:number
}

export interface ICartContext{
    isOpen:boolean
    total:number
    products:CartProduct[]
    toggleCart: () => void
    addProduct: (prod:CartProduct) => void
    decreaseProductQuantity : (prodid:string) => void
    increaseProductQuantity : (prodid:string) => void
    deleteProduct: (prodid:string) => void
}

export const CartContext = createContext<ICartContext>({
   isOpen:false,
   total:0,
   products:[],
   toggleCart: () => {},
   addProduct: () => {},
   decreaseProductQuantity: () => {},
   increaseProductQuantity: () => {},
   deleteProduct: ()=>{},
})
export const CartProvider = ({children} : {children: ReactNode}) =>{
    const [products,setProducts] = useState<CartProduct[]>([])
    const [isOpen,setIsOpen] = useState<boolean>(false)
    const total = products.reduce((accumulator,prod) => {return accumulator + prod.price * prod.quantity},0)
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
    const decreaseProductQuantity = (prodid:string) =>{
        setProducts(prevprods =>{
            return prevprods.map(prevprod =>{
                if(prevprod.id === prodid){
                    return {...prevprod, quantity: prevprod.quantity == 1 ? prevprod.quantity : prevprod.quantity -1}
                }
                return prevprod;
            })
        })
    }
    const increaseProductQuantity = (prodid:string) =>{
        setProducts(prevprods =>{
            return prevprods.map(prevprod =>{
                if(prevprod.id === prodid){
                    return {...prevprod, quantity: prevprod.quantity +1}
                }
                return prevprod
            })
        })
    }
    
    const deleteProduct = (prodid:string)=>{
        setProducts(products.filter((prevprod) => prevprod.id != prodid))
    }
    
    return(
        <CartContext.Provider value={{isOpen,total,products,toggleCart,addProduct,decreaseProductQuantity,increaseProductQuantity,deleteProduct}}> 
            {children}
        </CartContext.Provider>
    )
}