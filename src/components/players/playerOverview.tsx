"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import {
  getSeasonByPlayer,
  getPlayerStatistics,
  getTeamsByPlayer,
} from "@/lib/features/playerSlice";

import Image from "next/image";
import triangle from "@/../public/img/triangle.png";

export default function PlayerOverview({
  locale,
  id,
  name,
}: {
  locale: string;
  id: string;
  name: string;
}) {
  /** redux */
  const dispatch = useAppDispatch();
  const { season, statics, teams }: { season: any; statics: any; teams: any } =
    useAppSelector((state) => state.playerSlice);
  const playerID = parseInt(id);

  /** State value */
  const [selectedYear, setSelectedYear] = useState<number>(0);

  /** image url */
  const FOOTBALL_IMAGE = "https://media.api-sports.io/football";

  useEffect(() => {
    dispatch(getTeamsByPlayer({ id: playerID })).then((payload) => {
      const lastestSeason = payload?.payload[0]?.seasons[0];
      setSelectedYear(lastestSeason);
      dispatch(getPlayerStatistics({ id: playerID, season: lastestSeason }));
    });
  }, [dispatch, playerID]);

  /** data for using */
  const playerStatics = statics && statics[0];
  const playerTeams = teams && teams[0];

  console.group("season");
  console.log(season);
  console.groupEnd();

  console.group("statics");
  console.log(playerStatics);
  console.groupEnd();

  console.group("teams");
  console.log(teams);
  console.groupEnd();

  return (
    <div className="w-full">
      {/** header */}
      <div className="w-full h-auto bg-white rounded-xl px-8 py-10  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 ">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Image
              src={`${FOOTBALL_IMAGE}/players/${id}.png`}
              alt="Player profile picture"
              width={35}
              height={35}
              style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col justify-center ml-4">
              <h1 className="text-lg">{playerStatics?.player?.name}</h1>
              <div className="flex">
                <Image
                  src={playerTeams?.team?.logo}
                  alt="nationallity, team logo"
                  width={35}
                  height={35}
                  style={{ width: "auto", height: "auto" }}
                />
                <h1 className="text-xsm text-custom-gray ">{playerTeams?.team?.name}</h1>
              </div>
            </div>
          </div>
          <div className="relative">
            <select
              className="border border-black rounded-full text-xsm p-1.5 font-medium appearance-none pr-5 pl-3 dark:bg-custom-dark dark:border-custom-gray2"
              onChange={(e) => {
                setSelectedYear(parseInt(e.currentTarget.value));
              }}
              value={selectedYear}
            >
              {season?.map((v: any, i: number) => {
                return (
                  <option key={i} value={v?.year}>
                    {`${v?.year}/${v?.year + 1}`}
                  </option>
                );
              })}
            </select>
            <span>
              <Image
                src={triangle}
                alt="change date"
                width={14}
                height={14}
                style={{ width: "14px", height: "14px" }}
                className={`ml-3 absolute top-1.5 right-1.5 dark:invert`}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
