import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import NavButton from "./components/navButton";

interface RestaurantPageMenuParams{
    params: Promise<{slug:string}>
    searchParams: Promise<{consumptionMethod:string}>
}

const consumptionMethodChecker = (method:string) =>{
    return ["ON_PLACE","DELIVERY"].includes(method.toUpperCase());
}

const RestaurantPageMenu = async({params,searchParams} : RestaurantPageMenuParams) => {
    const {slug} = await params;
    const {consumptionMethod} = await searchParams;
    if(!consumptionMethodChecker(consumptionMethod)){
        return notFound()
    }
    const res = await getRestaurantBySlug(slug);
    return (
    <div>
        {/* Header of page */}
        <div className="relative h-[250px] w-full ">
            <NavButton
                icon="back"
                position="left"
                route="back"
            />
            <Image
                src={res.coverImageUrl}
                alt={res.name}
                fill
                className="object-cover"
            />
            <NavButton
                icon="order"
                position="right"
                route="order"
            />
        </div>
        {/* Pre title */}
        <RestaurantCategories 
        res={res}
        />
    </div>);
}
 
export default RestaurantPageMenu;