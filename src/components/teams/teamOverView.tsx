"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getTeamsStatistics } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";
import { getFixturesByTeam } from "@/lib/features/fixtureSlice";
import { useEffect, useMemo } from "react";
import TeamHeader from "./header/teamHeader";
import Image from "next/image";

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
  const { statics } = useAppSelector((state) => state.teamsSlice);
  const { fixtureByTeam } = useAppSelector((state) => state.fixtureSlice);
  const { location }: any = useAppSelector((state) => state.locationSlice);

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  // 어떤 데이터들을 사용할지 생각해보기
  // http://localhost:3000/en/teams/47/Tottenham
  useEffect(() => {
    // dispatch(getAllLeaguesByTeam({ team: id })).then(({ payload }) => {
    //   const nationalLeague = payload[0]?.league?.id;
    //   const latestSeason = payload[0]?.seasons?.at(-1)?.year;
    //   dispatch(
    //     getFixturesByTeam({ team: id, season: latestSeason, timezone: locate })
    //   );
    //   dispatch(getTeamsStatistics({league: nationalLeague, season:latestSeason, team:id}))
    // });
  }, [dispatch, id, locate]);

  console.log(leagues);
  console.log(statics);
  console.log(fixtureByTeam);

  return (
    <div className="w-full">
      {/* header */}
      <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
        {/* team title */}
        <div className="flex">

        </div>
      </div>
    </div>
  );
}
