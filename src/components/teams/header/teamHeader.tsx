import Image from "next/image";

import { usePathname } from "next/navigation";
import Link from "next/link";

import noimage from "@/../public/img/noimage.png";

export default function TeamHeader({
  fixture,
  leagues,
  locale,
  id,
  t,
  name,
}: {
  fixture: any;
  leagues: any;
  locale: any;
  id: number;
  t: any;
  name: string;
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

  console.log(lastMatchStartXI);

  return (
    <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
      {/* team title */}
      <div className="flex items-center">
        <Image
          src={
            lastMatchStartXI?.length > 0
              ? lastMatchStartXI[0]?.team?.logo
              : noimage
          }
          alt={
            lastMatchStartXI?.length > 0
              ? lastMatchStartXI[0]?.team?.name
              : "no home team"
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
              : null}
          </h1>
          <h1 className="text-sm mr-8 max-lg:mr-0 max-lg:text-xs text-custom-gray">
            {leagues?.length > 0 ? nationalLeagueObj?.country?.name : null}
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
      </div>
    </div>
  );
}
