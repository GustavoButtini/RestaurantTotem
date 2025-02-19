"use client";

import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface navButtonParams{
    icon:string
    route:string
    position:string
}

const NavButton = ({icon,route,position}:navButtonParams) => {
    const router = useRouter();
    return (             
    <Button variant={"secondary"} size={"icon"} className={`absolute top-4  ${position}-4 rounded-full z-50`} onClick={route === "back" ? () =>{router.back()} : () => {router.refresh()}}>
        {icon === "back" ? <ChevronLeftIcon/> : <ScrollTextIcon/>}
    </Button> 
);

}
 
export default NavButton;