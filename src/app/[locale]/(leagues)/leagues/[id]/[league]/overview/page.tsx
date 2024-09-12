import Image from "next/image";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

import LeagueOverview from "../../../../../../../components/league/leagueOverview";

/** 첫번째 글자만 대문자로 바꿈 */
function capitalizeFirst(str:string) {
  if (!str) return str; 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function generateMetadata({
  params: { league },
}: {
  params: { league: string };
}) {
  /** 메타 데이터는 decode 되어야함 */
  const decode = decodeURIComponent(league);
  const name = decode.split("-");
  const first = capitalizeFirst(name[0]);
  const second = capitalizeFirst(name[1]);
  return {
    title : second ? `${first} ${second}` : `${first}`
  }
}

export default async function Page({
  params: { id, league },
}: {
  params: { id: number, league: any};
}) {
  return (
    <div className="px-14 max-md:px-12 pt-28">
      <LeagueOverview id={id} league={league} />
    </div>
  );
}
