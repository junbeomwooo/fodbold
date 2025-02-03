"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getTeamsStatistics } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";
import { getFixturesByTeam } from "@/lib/features/fixtureSlice";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import noimage from "@/../public/img/noimage.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

/** for statics */
interface Team {
  id: number;
  name: string;
  logo: string;
}

interface League {
  country: string;
  flag: string;
  id: number;
  logo: string;
  name: string;
  stason: number;
}

interface Statics {
  team: Team;
  league: League;
}

export default function TeamOverView({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  const dispatch = useAppDispatch();
  const { leagues } = useAppSelector((state) => state.leagueSlice);
  const { statics } = useAppSelector((state) => state.teamsSlice) as {
    statics: Statics | null;
  };
  const { fixtureByTeam } = useAppSelector((state) => state.fixtureSlice);
  const { location }: any = useAppSelector((state) => state.locationSlice);

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  const pathname = usePathname();

  const t = useTranslations("team");

  // 어떤 데이터들을 사용할지 생각해보기
  // http://localhost:3000/en/teams/47/Tottenham
  useEffect(() => {
    // dispatch(getAllLeaguesByTeam({ team: id })).then(({ payload }) => {
    //   const nationalLeague = payload[0]?.league?.id;
    //   const latestSeason = payload[0]?.seasons?.at(-1)?.year;
    //   dispatch(
    //     getFixturesByTeam({ team: id, season: latestSeason, timezone: locate })
    //   );
    //   dispatch(
    //     getTeamsStatistics({
    //       league: nationalLeague,
    //       season: latestSeason,
    //       team: id,
    //     })
    //   );
    // });
  }, [dispatch, id, locate]);

  console.log(leagues);
  console.log(statics);
  console.log(fixtureByTeam);

  // data for using

  // ?? 연산자 fixtureByTeam이 값이 없을 경우 빈배열로 대체
  const lastRecentMatches = (fixtureByTeam ?? [])
    .filter((match: any) =>
      ["FT", "PEN", "AET"].includes(match.fixture.status.short)
    )
    .sort(
      (a, b) =>
        new Date(b?.fixture?.date).getTime() - new Date(a?.fixture?.date).getTime()
    );

  console.log(lastRecentMatches);
  return (
    <div className="w-full">
      {/* header */}
      <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
        {/* team title */}
        <div className="flex">
          <Image
            src={statics?.team?.logo || noimage}
            alt={statics?.team?.name || "no home team"}
            width={50}
            height={50}
          />
          <div className="ml-4">
            <h1 className="text-lg mr-8 max-lg:mr-0 max-lg:text-xs max-lg:mt-4 text-center">
              {statics?.team?.name}
            </h1>
            <h1 className="text-sm mr-8 max-lg:mr-0 max-lg:text-xs max-lg:mt-4 text-custom-gray">
              {statics?.league?.country}
            </h1>
          </div>
        </div>
        {/* category */}
        <div className="flex pt-10" style={{ fontSize: "15px" }}>
          <div className="flex flex-col">
            <Link
              href={`/`}
              className="hover:no-underline  hover:text-custom-gray tracking-wide"
            >
              Overview
            </Link>
            {pathname === `/${locale}/teams/${id}/${name}/overview` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-7/12">
          <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0 flex">
            <h3 className="text-base">{t("teamForm")}</h3>
          </div>
          <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0 flex">
            <h3 className="text-base">{t("nextMatch")}</h3>
          </div>
        </div>
        <div className="w-5/12">
          <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0 flex"></div>
        </div>
      </div>
    </div>
  );
}
