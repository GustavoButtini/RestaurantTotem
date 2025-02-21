import { orderStatus, Prisma } from "@prisma/client";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MoneyFormat } from "@/helpers/moneyFormat";

interface OrderParams{
    order: Prisma.OrderGetPayload<{
        include:{
            restaurant:{
                select:{
                    name:true,
                    avatarImageUrl:true
                }
            },
            orderProduct:{
                include:{
                    produt:true
                }
            }
        }
    }>
}
const getStatusLabel= (status:orderStatus) =>{
    if (status === "FINISHED") return "Finalizado";
    if (status === "IN_PREPARATION") return "Em Preparo";
    if (status === "PENDING") return "Pendente";
    return ""
}
const MadeOrder = ({order}:OrderParams) => {
    return (
        <Card>
            <CardContent className="space-y-4 p-5">
                <div className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${order.status === orderStatus.FINISHED ? "bg-green-500" : "bg-gray-300"}`}>
                    {getStatusLabel(order.status)}
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                        <Image
                            src={order.restaurant.avatarImageUrl}
                            alt={order.restaurant.name}
                            fill
                            className="rounded-xl"
                        />
                    </div>
                    <p className="font-semibol text-sm">{order.restaurant.name}</p>
                </div>
                <Separator />
                {order.orderProduct.map((prod) => (
                    <div className="flex items-center gap-2" key={prod.id}>
                         <div className="h-4 w-4 flex items-center justify-center rounded-full font-semibold bg-gray-300 text-xs">
                            {prod.quantity}
                         </div>
                        <p>{prod.produt.name}</p>
                    </div>
                ))}
                <Separator />
                <p className="text-sm">{MoneyFormat(order.total)}</p>
            </CardContent>
        </Card>
    );
}
 
export default MadeOrder;