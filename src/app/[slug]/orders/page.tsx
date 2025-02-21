
import { db } from "@/lib/prisma";

import { checkCPF, removeCpfPunctionation } from "../menu/helpers/cpf";
import CPFForm from "./components/cpfform";
import OrderList from "./components/orderlist";

interface OrdersPageParams{
    searchParams: Promise<{cpf:string}>
}


const OrdersPage = async ({searchParams}:OrdersPageParams) => {
    const {cpf} = await searchParams
    if(!cpf){
        return <CPFForm/>
    }
    if(!checkCPF(cpf)){
        return <CPFForm/>
    }
    const orders = await db.order.findMany({
        orderBy:{
            createdAt:"desc"
        },
        where:{
            customerCPF:removeCpfPunctionation(cpf)
        },
        include:{
            restaurant:{
                select:{
                    name:true,
                    avatarImageUrl:true,
                }
            },
            orderProduct:{
                include:{
                    produt:true
                }
            },
        }
    })
    return (
        <OrderList orders={orders}/>
    );
}
 
export default OrdersPage;