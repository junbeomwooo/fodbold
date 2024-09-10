
import Image from "next/image";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

import League from "@/components/league/league";


export default async function Page({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) {

  return (
    <div className="px-14 max-md:px-12 pt-28">
      <League id={id} />
    </div>
  );
}
