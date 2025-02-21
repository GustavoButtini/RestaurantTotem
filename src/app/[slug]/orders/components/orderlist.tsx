"use client"

import { Prisma } from "@prisma/client";
import { ChevronLeftCircleIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../../menu/contexts/cart";
import MadeOrder from "./madeorder";

interface OrderListParams{
    orders: Array<Prisma.OrderGetPayload<{
        include:{
            restaurant:{
                select:{
                    name:true,
                    avatarImageUrl:true,
                }
            }
            orderProduct:{
                include:{
                    produt:true
                }
            },
        }
    }>>
}

const OrderList = ({orders}:OrderListParams) => {
    const {toggleCart} = useContext(CartContext)
    const router = useRouter();
    return ( 
        <div className="space-y-6 p6 flex flex-col">
            {/* Header */}
            <div className="relative min-h-16 w-full">
                <Button variant={"secondary"} size={"icon"} className="absolute top-4 left-4 rounded-full z-50" onClick={() => {router.replace("/")}}>
                    <ChevronLeftCircleIcon />
                </Button>
                <Button variant={"secondary"} size={"icon"} className="absolute top-4 right-4 rounded-full z-50" onClick={() => {toggleCart()}}> 
                    <ScrollTextIcon />
                </Button>
            </div>
            <div className="flex items-center gap-3 p-5 min-h-16">
                <ScrollTextIcon/>
                <h2 className="text-lg font-semibold">Meus Pedidos</h2>
            </div>
            {/*Orders */}
            <div className="flex flex-col flex-auto p-5 my-3">
                {orders.map((ord) => (
                    <MadeOrder key={ord.id} order={ord}/>
                ))}                
            </div>

        </div>
     );
}
 
export default OrderList;