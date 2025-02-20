"use client"
import { Prisma} from "@prisma/client";
import { ChefHatIcon, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductsDescriptionParams{
    prod: Prisma.ProductGetPayload<{include:{restaurant:{select:{name:true,avatarImageUrl:true}}}}>
}

const ProductsDescription = ({prod}:ProductsDescriptionParams) => {
    const [quantity,setQuantity] = useState(1);
    return (  
        <div className="relative z-50 rounded-t-3xl p-5 flex flex-auto flex-col overflow-hidden">
            <div className="flex-auto overflow-hidden">
                {/*Product header */}
                <div className="flex items-center gap-1">
                    <Image 
                        src={prod.restaurant.avatarImageUrl}
                        alt={prod.restaurant.name}
                        width={25}
                        height={25}
                    />
                    <p className="text-xs text-muted-foreground">{prod.restaurant.name}</p>
                    
                </div>
                
                {/*Product name */}
                <h2 className="mt-4 text-xl font-semibold">{prod.name}</h2>

                {/*Product price and amout controller */}
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-2xl">{new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(prod.price)}</p>
                    <div className="flex items-center gap-4">
                        <Button variant={"outline"} className="h-8 w-8 rounded-xl" onClick={()=>{setQuantity(quantity == 1? 1:quantity-1)}}>
                            <Minus />
                        </Button>
                        <p>{quantity}</p>
                        <Button variant={"destructive"} className="h-8 w-8 rounded-xl" onClick={()=>{setQuantity(quantity+1)}}>
                            <Plus />
                        </Button>
                    </div>
                </div>
 
                <ScrollArea className="h-full">
                {/* Product description */}
                    <div className="mt-6 space-y-3">
                        <h4 className="text-xl font-semibold">Sobre</h4>
                        <p className="text-xs text-muted-foreground">{prod.description}</p>
                    </div>                    
                {/*Product ingredients */}
                    <div className="mt-10 space-y-2">
                        <div className="flex items-center gap-1 5">
                            <ChefHatIcon size={18}/>
                            <h5 className="text-xl font-semibold">Ingredientes</h5>
                        </div>
                        <ul className="list-disc px-5 text-sm text-muted-foreground">
                            {prod.ingredients.map((ingredient) => (<li key={ingredient}>{ingredient}</li>))}
                        </ul>
                    </div> 
                </ScrollArea>
            </div>
            <Button className="mt-6 w-full rounded-full">
                    Adicionar à sacola
            </Button>
        </div>
    );
}
 
export default ProductsDescription;