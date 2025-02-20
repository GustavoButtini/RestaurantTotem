import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import PageHeader from "../components/pageheader";
import ProductsDescription from "./components/productdescription";

interface SingleProductParams{
    params: Promise<{slug:string;slugproduct:string}>
}

const SingleProduct = async ({params}:SingleProductParams) => {
    const {slugproduct} = await params;
    const prod = await db.product.findUnique({where: {slug:slugproduct}, include: {restaurant:{select:{name:true,avatarImageUrl:true}}}})
    if (!prod){
        return notFound();
    }
    return (  
        <div className="flex h-full flex-col">
            <PageHeader 
                imageheader={prod.imageUrl}
                imagealt={prod.name}
            />
            <ProductsDescription 
                prod={prod}
            />
        </div>
    );
}
 
export default SingleProduct;