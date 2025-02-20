"use client";

import { ChevronLeftCircleIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


interface PageHeaderParams{
    imageheader:string
    imagealt:string
    height:string
}

const PageHeader = ({imageheader,imagealt,height}:PageHeaderParams) => {
    const router = useRouter();
    return (
    <div className={`relative h-[${height}] w-full`}>
        <Button variant={"secondary"} size={"icon"} className="absolute top-4 left-4 rounded-full z-50" onClick={() => {router.back()}}>
            <ChevronLeftCircleIcon />
        </Button>
        <Image src={imageheader} alt={imagealt} fill className="object-cover"/>
        <Button variant={"secondary"} size={"icon"} className="absolute top-4 right-4 rounded-full z-50" onClick={() => {router.refresh()}}> 
            <ScrollTextIcon />
        </Button>
    </div>             
);

}
 
export default PageHeader;