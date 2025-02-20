"use client";

import { ChevronLeftCircleIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";

import { CartContext } from "../contexts/cart";


interface PageHeaderParams{
    imageheader:string
    imagealt:string
}

const PageHeader = ({imageheader,imagealt}:PageHeaderParams) => {
    const {toggleCart} = useContext(CartContext)
    const router = useRouter();
    return (
    <div className={`relative min-h-64 w-full`}>
        <Button variant={"secondary"} size={"icon"} className="absolute top-4 left-4 rounded-full z-50" onClick={() => {router.back()}}>
            <ChevronLeftCircleIcon />
        </Button>
        <Image src={imageheader} alt={imagealt} fill className="object-cover"/>
        <Button variant={"secondary"} size={"icon"} className="absolute top-4 right-4 rounded-full z-50" onClick={() => {toggleCart()}}> 
            <ScrollTextIcon />
        </Button>
    </div>             
);

}
 
export default PageHeader;