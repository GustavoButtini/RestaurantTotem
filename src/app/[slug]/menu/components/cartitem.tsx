
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MoneyFormat } from "@/helpers/moneyFormat";

import { CartProduct } from "../contexts/cart";
interface CartProductItemParams{
    prod: CartProduct
}


const CartProductItem = ({prod}:CartProductItemParams) => {
    return (               
    <div key={prod.id} className="flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
            {/* Left Side */}
            <div className="relative h-20 w-20 rounded-xl bg-gray-200">
                <Image 
                    src={prod.imageUrl}
                    alt={prod.name}
                    fill
                />
            </div>
            {/* Center */}
            <div className="space-y-1">
                <p className="text-xs max-w-[90%] truncate text-ellipsis">{prod.quantity}x {prod.name} </p>
                <p className="text-sm font-semibold">{MoneyFormat(prod.price*prod.quantity)}</p>
                <div className="flex items-center gap-1 text-center">
                    <Button className="h-7 w-7 rounded-lg"variant={"outline"}>
                        <ChevronLeftIcon />
                    </Button>
                    <p className="text-xs w-8">{prod.quantity}</p>
                    <Button className="h-7 w-7 rounded-lg" variant={"destructive"}>
                        <ChevronRightIcon />
                    </Button>
                </div>
            </div>            
        </div>
        {/* Right Side */}
        <Button className="w-7 h-7" variant={"outline"}>
            <TrashIcon/>
        </Button>
    </div> 
    );
}
 
export default CartProductItem;