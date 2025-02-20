import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import PageHeader from "../components/pageheader";

interface SingleProductParams{
    params: Promise<{slug:string;slugproduct:string}>
}

const SingleProduct = async ({params}:SingleProductParams) => {
    const {slugproduct} = await params;
    const prod = await db.product.findUnique({where: {slug:slugproduct}})
    if (!prod){
        return notFound();
    }
    return (  
        <div>
            <PageHeader 
                imageheader={prod.imageUrl}
                imagealt={prod.name}
                height="250px"
            />
        </div>
    );
}
 
export default SingleProduct;