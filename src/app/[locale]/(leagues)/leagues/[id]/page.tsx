
import Image from "next/image";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";


export default async function Page({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) {

  return (
    <div className="px-14 max-md:px-12 pt-28">
      <></>
      <div className="w-full h-20 bg-white rounded-xl">
        <div>
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
            alt="league logo"
            width={50}
            height={50}
            style={{ width: "auto", height:"auto"}}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}
