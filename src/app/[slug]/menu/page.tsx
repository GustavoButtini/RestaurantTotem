
import { notFound } from "next/navigation";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import RestaurantCategories from "./components/categories";
import PageHeader from "./components/pageheader";

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
        <PageHeader
            imageheader={res.coverImageUrl}
            imagealt={res.name}
            height="250px"
            imageCl="object-cover"
        />
        {/* Pre title */}
        <RestaurantCategories 
        res={res}
        />
    </div>);
}
 
export default RestaurantPageMenu;