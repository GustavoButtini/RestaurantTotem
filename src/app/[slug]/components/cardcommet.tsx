import { consumptionMethod } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'


interface cardConsumptionMethodParams{
    imagePath:string;
    imageAlt:string;
    text:string;
    option:consumptionMethod;
    slug:string
}

const CardConsumptionMethod = ({imagePath,imageAlt,text,option,slug}:cardConsumptionMethodParams) => {
  return (
    <Card>
        <CardContent className="items-center flex flex-col gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
            <Image src={imagePath} fill alt={imageAlt} className="object-contain"/>
        </div>

        <Button className="rounded-full" variant="secondary" asChild>
            <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
                {text}
            </Link>
        </Button>
        </CardContent>
    </Card>
  )
}

export default CardConsumptionMethod