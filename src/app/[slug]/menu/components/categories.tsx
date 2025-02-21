"use client"

import { Prisma} from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoneyFormat } from "@/helpers/moneyFormat";

import { CartContext } from "../contexts/cart";
import ProductLister from "./products";
import ShippingCart from "./shippingcart";

interface RestaurantCategoriesParams{
    res:Prisma.RestaurantGetPayload<{
        include:{
            menuCategories:{
                include:{
                    products:true
                }
            }
        }
    }>;
}
type MenuCategoryWithProducts = Prisma.MenuCategoryGetPayload<{
    include: {products:true}
}>;

const RestaurantCategories = ({res}:RestaurantCategoriesParams) => {
    const [selectedCategory,setSelectedCategory] = useState<MenuCategoryWithProducts>(res.menuCategories[0]);
    const handleCategoryOnClick = (clickedCategory:MenuCategoryWithProducts) => {
        setSelectedCategory(clickedCategory)
    }
    const {products,total,totalQuantity,toggleCart} = useContext(CartContext);
    return (  
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white p-5">
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image src={res.avatarImageUrl} alt={res.name} width={45} height={45}/>
                    <div>
                        <h2 className="font-semibold text-lg">{res.name}</h2>
                        <p className="text-xs opacity-55">{res.description}</p>
                    </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-green-500">
                    <ClockIcon size={12}/>
                    <p>Aberto !</p>
                </div>
            </div>
            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-4 pt-0">
                    {res.menuCategories.map(category => (
                        <Button key={category.id} onClick={() => {handleCategoryOnClick(category)}} variant={selectedCategory.id === category.id ? "default" : "secondary"} size="sm" className="rounded-full">
                            {category.name}
                        </Button>
                    ) )}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>

            <h3 className="py-5 font-semibold">{selectedCategory.name}</h3>
            <ProductLister products={selectedCategory.products}/>
            {products.length > 0 &&(
                <div className="fixed bottom-0 left-0 rigth-0 flex items-center justify-between w-full p-4 bg-white border-t border-g px-5 py-3">
                    <div>
                        <p className="text-xs text-muted-foreground" >
                            Total dos Pedidos
                        </p>
                        <p className="text-sm font-semibold">
                            {MoneyFormat(total)} 
                            <span className="text-xs font-normal text-muted-foreground">/ {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}</span>
                        </p>
                    </div>
                    <Button onClick={()=>{toggleCart()}}>
                        Ver Sacola
                    </Button>
                    <ShippingCart/>
                </div>
            ) }
        </div>
    );
}
 
export default RestaurantCategories;