import Image from "next/image";
import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";
import WidgetComponent from "@/components/main/widgetComponent";

/** 리그 정보 가져오기 */
const getLeagueInfo = async (id: number) => {
  const response = await fetch(`${FOOTBALL_URL}/leagues/?id=${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
    },
  });

  return response.json();
};

export default function page({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) {
  /** 리그 정보 */
  // const league = (await getLeagueInfo(id)).response;
  // console.log(league);

  /** 리그 스탠딩 */

  return (
    // <div className="px-14 max-md:px-12 pt-28">
    //   <>
    //   </>
    //   <div className="w-full h-20 bg-white rounded-xl">
    //     <div>
    //       <Image
    //         src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
    //         alt="league logo"
    //         width={50}
    //         height={50}
    //         style={{"width":"50", "height":"50"}}
    //       />
    //     </div>
    //     <div></div>
    //   </div>
    // </div>
    <WidgetComponent />
  );
}
