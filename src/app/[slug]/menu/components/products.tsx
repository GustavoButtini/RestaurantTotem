import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface ProductListerParams{
    products: Product[]
}



const ProductLister = ({products}:ProductListerParams) => {
    return ( 
        <div className="space-y-3">
            {products.map(product =>(
                
                <Link href={product.slug} key={product.id} className="flex items-center justify-between border-b gap-10 py-5">
                    {/*Left Side */}
                    <div className="">
                        <h3 className="text-sm font-medium">{product.name}</h3>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                        <p>{new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(product.price)}</p>
                    </div>
                    <div className="relative min-h-[82px] min-w-[120px]">
                        <Image 
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>
                </Link>

            ))}
        </div>
    );
}
 
export default ProductLister;