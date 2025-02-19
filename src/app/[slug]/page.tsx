import Image from "next/image";

import { getRestaurantBySlug } from "@/data/get-restaurant-by-slug";

import CardConsumptionMethod from "./components/cardcommet";

interface RestaurantAcessPageParams {
  params: Promise<{ slug: string }>;
}

const RestaurantAcess = async ({ params }: RestaurantAcessPageParams) => {
  const { slug } = await params;
  const res = await getRestaurantBySlug(slug);
  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <Image
          src={res?.avatarImageUrl}
          alt={res?.name}
          width={82}
          height={82}
        />
        <h2 className="font-semibold">GB Donalds</h2>
      </div>

      {/* Mensagem de Entrada */}
      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem vindo(a)</h3>
        <div className="p opacity-55">
          Aqui você escolhe aquela refeição perfeita para melhorar seu dia !
        </div>
      </div>
      {/* Opção de consumo */}
      <div className="pt-14 grid grid-cols-2 gap-4">
        <CardConsumptionMethod
            imagePath="/onplace.png"
            imageAlt="On Place"
            text="Comer Aqui"
            option="ON_PLACE"
            slug={slug}
        />
        <CardConsumptionMethod
            imagePath="/delivery.png"
            imageAlt="delivery"
            text="Levar para casa"
            option="DELIVERY"
            slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantAcess;
