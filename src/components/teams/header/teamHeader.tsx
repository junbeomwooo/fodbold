import Image from "next/image";

import { usePathname } from "next/navigation";
import Link from "next/link";

import noimage from "@/../public/img/noimage.png";

export default function TeamHeader({
  fixture,
  teamInfo,
  leagues,
  locale,
  id,
  name,
  squads,
  t,
}: {
  fixture?: any;
  teamInfo?: any;
  leagues: any;
  locale: any;
  id: number;
  name: string;
  squads?: any;
  t: any;
}) {
  const pathname = usePathname();

  const nationalLeagueObj = leagues?.filter(
    (league: any) =>
      league?.league?.type === "League" &&
      league?.seasons?.some((v: any) => v?.current === true)
  )[0];

  const lastMatchStartXI = fixture?.lineups?.filter((team: any) => {
    return Number(id) === team?.team?.id;
  });

  // overView를 통한 리덕스 전역변수 공유에 실패했을경우 (새로고침 등)) 팀정보를 받아오는 데이터를 페칭해 lastMatchStartXI값이 없을 경우 새로 페칭한 teamInfo 값을 보여줌. 불필요한 데이터 페칭을 통해 lastMatchStartXI 값을 구하는 것보다 리그 이름과 팀 정보가 들어있는 팀정보를 받아오는 게 데이터 통신을 덜 할수 있어서 이 방법을 사용. (teamOverView 페이지에서는 teamInfo 값을 구할 필요가 없어 이 컴포넌트에서 옵셔널 값으로 설정)

  return (
    <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
      {/* team title */}
      <div className="flex items-center">
        <Image
          src={
            lastMatchStartXI?.length > 0
              ? lastMatchStartXI[0]?.team?.logo
              : teamInfo
              ? teamInfo?.team?.logo
              : `https://media.api-sports.io/football/teams/${id}.png`
          }
          alt={
            lastMatchStartXI?.length > 0
              ? lastMatchStartXI[0]?.team?.name
              : teamInfo
              ? teamInfo?.team?.name
              : name
          }
          width={35}
          height={35}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="flex flex-col justify-center ml-4">
          <h1 className="text-lg">
            {" "}
            {lastMatchStartXI?.length > 0
              ? lastMatchStartXI[0]?.team?.name
              : teamInfo
              ? teamInfo?.team?.name
              : name}
          </h1>
          <h1 className="text-sm mr-8 max-lg:mr-0 max-lg:text-xs text-custom-gray">
            {leagues?.length > 0
              ? nationalLeagueObj?.country?.name
              : teamInfo
              ? teamInfo?.team?.country
              : ""}
          </h1>
        </div>
      </div>
      {/* category */}
      <div className="flex pt-10" style={{ fontSize: "15px" }}>
        {/* overview */}
        <div className="flex flex-col">
          <Link
            href={`/${locale}/teams/${id}/${name}/overview`}
            className="hover:no-underline  hover:text-custom-gray tracking-wide"
          >
            {t("overview")}
          </Link>
          {pathname === `/${locale}/teams/${id}/${name}/overview` ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
          ) : (
            <></>
          )}
        </div>

        {/* table */}
        <div className="flex flex-col">
          <Link
            href={`/${locale}/teams/${id}/${name}/tables`}
            className="hover:no-underline  hover:text-custom-gray tracking-wide ml-6"
          >
            {t("table")}
          </Link>
          {pathname === `/${locale}/teams/${id}/${name}/tables` ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
          ) : (
            <></>
          )}
        </div>

        {/* fixture */}
        <div className="flex flex-col">
          <Link
            href={`/${locale}/teams/${id}/${name}/fixture`}
            className="hover:no-underline  hover:text-custom-gray tracking-wide ml-6"
          >
            {t("fixture")}
          </Link>
          {pathname === `/${locale}/teams/${id}/${name}/fixture` ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
          ) : (
            <></>
          )}
        </div>

        {/* sqaud */}
        <div className="flex flex-col">
          <Link
            href={`/${locale}/teams/${id}/${name}/squad`}
            className="hover:no-underline  hover:text-custom-gray tracking-wide ml-6"
          >
            {t("squad")}
          </Link>
          {pathname === `/${locale}/teams/${id}/${name}/squad` ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
          ) : (
            <></>
          )}
        </div>

        {/* transfer */}
        <div className="flex flex-col">
          <Link
            href={`/${locale}/teams/${id}/${name}/transfer`}
            className="hover:no-underline  hover:text-custom-gray tracking-wide ml-6"
          >
            {t("transfer")}
          </Link>
          {pathname === `/${locale}/teams/${id}/${name}/transfer` ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
