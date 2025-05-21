"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useRouter } from "next/navigation";
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";
import {
  getSeasonByPlayer,
  getPlayerStatistics,
  getTeamsByPlayer,
  getTrophiesByPlayer,
} from "@/lib/features/playerSlice";

import Image from "next/image";
import triangle from "@/../public/img/triangle.png";
import noImage from "@/../public/img/noimage.png";

import { useTranslations } from "next-intl";

export default function PlayerOverview({
  locale,
  id,
  name,
}: {
  locale: string;
  id: string;
  name: string;
}) {
  /** translations */
  const p = useTranslations("player");

  /** router */
  const router = useRouter();

  /** redux */
  const dispatch = useAppDispatch();
  const {
    season,
    statics,
    teams,
    trophies,
  }: { season: any; statics: any; teams: any; trophies: any } = useAppSelector(
    (state) => state.playerSlice
  );
  const playerID = parseInt(id);

  /** State for year */
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  /** image url */
  const FOOTBALL_IMAGE = "https://media.api-sports.io/football";

  // http://localhost:3000/en/players/18784/J.-Maddison
  // http://localhost:3000/en/players/306/Mohamed-Salah
  // http://localhost:3000/en/players/186/Son-Heung-Min
  // http://localhost:3000/en/players/31354/G.-Vicario

  
  useEffect(() => {
    dispatch(getTrophiesByPlayer({ id: playerID }));
    dispatch(getTeamsByPlayer({ id: playerID })).then((payload) => {
      const lastestSeason =
        payload && payload?.payload[0] && payload?.payload[0]?.seasons[0];
      dispatch(getPlayerStatistics({ id: playerID, season: lastestSeason }));
    });
  }, [dispatch, playerID]);

  /** data for using */
  const playerStatics = statics && statics[0];
  const playerTeams = teams && teams[0];

  const trophiesGroupByCountry = trophies
    ? Object.entries(
        trophies?.reduce((acc: any, v: any) => {
          const key = v?.country;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(v);

          return acc;
        }, [])
      )
    : null;

  const seasonsByTeamData = teams?.flatMap((team: any) => team.seasons);
  const allSeasons = Array.from(new Set(seasonsByTeamData)).sort(
    (a: any, b: any) => {
      return b - a;
    }
  );

  /** State for League Name */
  const [selectedLeague, setSelectLeague] = useState(
    playerStatics?.statistics[0]?.league?.id
  );

  /** State for Statistics Data */
  const [staticsData, setStaticsData] = useState(
    playerStatics?.statistics[0]?.league?.id
  );

  // UseEffect for rendering statics data, when its initial rendering
  useEffect(() => {
    const staticsData = playerStatics?.statistics?.filter((v: any) => {
      return playerStatics?.statistics[0]?.league?.id === v?.league?.id;
    })[0];

    setStaticsData(staticsData);
  }, [playerStatics]);

  console.group("season");
  console.log(season);
  console.groupEnd();

  console.group("playerStatics");
  console.log(playerStatics);
  console.groupEnd();

  console.group("teams");
  console.log(teams);
  console.groupEnd();

  console.group("trophies");
  console.log(trophies);
  console.groupEnd();

  console.group("allSeasons");
  console.log(allSeasons);
  console.groupEnd();

  console.group("staticsData");
  console.log(staticsData);
  console.groupEnd();

  return (
    <div className="w-full flex justify-center max-xl:block">
      {/* Profile */}
      <div className="w-full">
        {/** header */}
        <div className="w-full h-auto bg-white rounded-t-xl px-8 py-6  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 border-b-0 dark:border-b-[1px] dark:border-[#464646]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={`${FOOTBALL_IMAGE}/players/${id}.png`}
                alt="Player profile picture"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center ml-6">
                <h1 className="text-xl">{playerStatics?.player?.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    src={playerTeams?.team?.logo}
                    alt="nationallity, team logo"
                    width={20}
                    height={20}
                  />
                  <h1
                    className="text-base text-custom-gray cursor-pointer hover:underline"
                    onClick={() => {
                      router.push(
                        `/${locale}/teams/${
                          playerTeams?.team?.id
                        }/${FormatLeagueOrTeamName(
                          playerTeams?.team?.name
                        )}/overview`
                      );
                    }}
                  >
                    {playerTeams?.team?.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* player Info */}
        <div className="w-full h-auto bg-white rounded-b-xl px-8 pt-8  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 pb-8 flex gap-10">
          <div className="w-full h-auto ">
            {/* country, position] */}
            <div className="flex text-[16px] gap-10">
              {/* country */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.nationality}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("country")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* position */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.statistics[0]?.games?.position}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("position")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* height, weight */}
            <div className="flex text-[16px] gap-10">
              {/* height */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.height}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("height")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* weight */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.weight}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("weight")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* age, date */}
            <div className="flex text-[16px] gap-10">
              {/* dge */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.age}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("age")}
                </h3>
              </div>

              {/* date */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.birth?.date}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("date")}
                </h3>
              </div>
            </div>
          </div>
          {/* <div className="w-px bg-slate-200 h-auto mx-4 dark:bg-[#464646]" /> */}
        </div>

        {/* player statics */}
        <div className="w-full bg-white rounded-xl mt-6 dark:bg-custom-dark border-slate-200 border border-solid dark:border-0">
          {/* title */}
          <div className="text-base py-6 px-8 flex items-center gap-5">
            {/* logo */}
            <Image
              src={
                staticsData?.league?.logo || staticsData?.team?.logo || noImage
              }
              alt={
                staticsData?.league?.name || staticsData?.team?.name || "team"
              }
              width={20}
              height={20}
              className="w-[20px] h-[20px] rounded-full"
            />

            {/* selectYear */}
            <div className="flex items-center cursor-pointer hover:opacity-60 w-full">
              <select
                onChange={(e) => {
                  setSelectedYear(parseInt(e.currentTarget.value));
                  dispatch(
                    getPlayerStatistics({
                      id: playerID,
                      season: Number(e.currentTarget.value),
                    })
                  );
                }}
                value={selectedYear}
                className="appearance-none dark:bg-[#1D1D1D] max-sm:text-xs w-full"
                id="season"
              >
                {allSeasons?.map((v: any, i: number) => {
                  return (
                    <option key={i} value={v}>
                      {`${v}/${v + 1}`}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="season">
                <Image
                  src={triangle}
                  alt="change date"
                  width={14}
                  height={14}
                  style={{ width: "14px", height: "14px" }}
                  className="ml-3 dark:invert max-sm:ml-0"
                />
              </label>
            </div>

            <div className="w-[1.1px] h-4 bg-slate-300 mx-2 max-sm:mx-0"></div>

            {/* league name */}
            <div className="flex items-center cursor-pointer hover:opacity-60 w-full">
              <select
                onChange={(e) => {
                  setSelectLeague(e.currentTarget.value);

                  const staticsData = playerStatics?.statistics?.filter(
                    (v: any) => {
                      return Number(e.currentTarget.value) === v?.league?.id;
                    }
                  )[0];

                  setStaticsData(staticsData);
                }}
                value={selectedLeague}
                className="appearance-none text-base font-medium dark:bg-[#1D1D1D] max-sm:text-xs w-full overflow-hidden truncate"
                id="league"
              >
                {playerStatics?.statistics?.map((v: any, i: number) => {
                  return (
                    <option key={i} value={v?.league?.id}>
                      {v?.league?.name || v?.team?.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="league">
                <Image
                  src={triangle}
                  alt="change date"
                  width={14}
                  height={14}
                  style={{ width: "14px", height: "14px" }}
                  className="ml-3 dark:invert max-sm:ml-0"
                />
              </label>
            </div>
          </div>

          <hr className="dark:border-[#464646] " />
          <div className="py-6 px-8 ">
            {staticsData ? (
              <div className="text-sm font-light">
                {/* Games */}
                <div>
                  <h1 className="font-normal mb-6 text-base">{p("games")}</h1>
                  {/* Rating */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("rating")}</h2>
                    <h2>{staticsData?.games?.rating?.substr(0, 3) || 0}</h2>
                  </div>
                  {/* Minutes */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("minutes")}</h2>
                    <h2>{staticsData?.games?.minutes || 0}</h2>
                  </div>
                  {/* Appearences */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("appearences")}</h2>
                    <h2>{staticsData?.games?.appearences || 0}</h2>
                  </div>
                  {/* Lineups */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("lineups")}</h2>
                    <h2>{staticsData?.games?.lineups || 0}</h2>
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("goals")}</h1>
                  {/* Total */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("total")}</h2>
                    <h2>{staticsData?.goals?.total || 0}</h2>
                  </div>
                  {/* Assists */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("assists")}</h2>
                    <h2>{staticsData?.goals?.assists || 0}</h2>
                  </div>
                  {/* Saves */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("saves")}</h2>
                    <h2>{staticsData?.goals?.saves || 0}</h2>
                  </div>
                  {/* Conceded */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("conceded")}</h2>
                    <h2>{staticsData?.goals?.conceded || 0}</h2>
                  </div>
                </div>

                {/* Shots */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("shots")}</h1>
                  {/* Total */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("total")}</h2>
                    <h2>{staticsData?.shots?.total || 0}</h2>
                  </div>
                  {/* On */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("on")}</h2>
                    <h2>{staticsData?.shots?.on || 0}</h2>
                  </div>
                </div>

                {/* Passes */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("passes")}</h1>
                  {/* Total */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("total")}</h2>
                    <h2>{staticsData?.passes?.total || 0}</h2>
                  </div>
                  {/* key */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("key")}</h2>
                    <h2>{staticsData?.passes?.key || 0}</h2>
                  </div>
                  {/* accuracy */}
                  {staticsData?.passes?.accuracy !== null && (
                    <div className="flex justify-between mb-2">
                      <h2>{p("accuracy")}</h2>
                      <h2>{staticsData?.accuracy?.key}</h2>
                    </div>
                  )}
                </div>

                {/* Dribbles */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("dribbles")}</h1>
                  {/* Attempts */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("attempts")}</h2>
                    <h2>{staticsData?.dribbles?.attempts || 0}</h2>
                  </div>
                  {/* Success */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("success")}</h2>
                    <h2>{staticsData?.dribbles?.success || 0}</h2>
                  </div>
                  {/* Past */}
                  {staticsData?.dribbles?.past !== null && (
                    <div className="flex justify-between mb-2">
                      <h2>{p("past")}</h2>
                      <h2>{staticsData?.dribbles?.past}</h2>
                    </div>
                  )}
                </div>

                {/* Tackles */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("tackles")}</h1>
                  {/* Total */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("total")}</h2>
                    <h2>{staticsData?.tackles?.total || 0}</h2>
                  </div>
                  {/* Blocks */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("blocks")}</h2>
                    <h2>{staticsData?.tackles?.blocks || 0}</h2>
                  </div>
                  {/* Interceptions */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("interceptions")}</h2>
                    <h2>{staticsData?.tackles?.interceptions}</h2>
                  </div>
                </div>

                {/* Duels */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("duels")}</h1>
                  {/* Total */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("total")}</h2>
                    <h2>{staticsData?.duels?.total || 0}</h2>
                  </div>
                  {/* Won */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("won")}</h2>
                    <h2>{staticsData?.duels?.won || 0}</h2>
                  </div>
                </div>

                {/* Penalty */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("penalty")}</h1>
                  {/* Commited */}
                  {staticsData?.penalty?.commited !== null && (
                    <div className="flex justify-between mb-2">
                      <h2>{p("commited")}</h2>
                      <h2>{staticsData?.penalty?.commited || 0}</h2>
                    </div>
                  )}

                  {/* Missed */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("missed")}</h2>
                    <h2>{staticsData?.penalty?.missed || 0}</h2>
                  </div>

                  {/* Saved */}
                  {staticsData?.penalty?.saved !== null && (
                    <div className="flex justify-between mb-2">
                      <h2>{p("saved")}</h2>
                      <h2>{staticsData?.penalty?.saved || 0}</h2>
                    </div>
                  )}

                  {/* Scored */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("scored")}</h2>
                    <h2>{staticsData?.penalty?.scored || 0}</h2>
                  </div>

                  {/* Won */}
                  {staticsData?.penalty?.won !== null && (
                    <div className="flex justify-between mb-2">
                      <h2>{p("won")}</h2>
                      <h2>{staticsData?.penalty?.won || 0}</h2>
                    </div>
                  )}
                </div>

                {/* Fouls */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("fouls")}</h1>
                  {/* Committed */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("committed")}</h2>
                    <h2>{staticsData?.fouls?.committed || 0}</h2>
                  </div>
                  {/* Drawn */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("drawn")}</h2>
                    <h2>{staticsData?.fouls?.drawn || 0}</h2>
                  </div>
                </div>

                {/* Cards */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("cards")}</h1>
                  {/* yellow */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("yellow")}</h2>
                    <h2>{staticsData?.cards?.yellow || 0}</h2>
                  </div>
                  {/* Second Y */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("second Y")}</h2>
                    <h2>{staticsData?.cards?.yellowred || 0}</h2>
                  </div>
                  {/*  Red */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("red")}</h2>
                    <h2>{staticsData?.cards?.red || 0}</h2>
                  </div>
                </div>

                {/* Substitutes */}
                <div>
                  <h1 className="font-normal my-6 text-base">{p("substitutes")}</h1>
                  {/* Bench */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("bench")}</h2>
                    <h2>{staticsData?.substitutes?.bench || 0}</h2>
                  </div>
                  {/* In */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("in")}</h2>
                    <h2>{staticsData?.substitutes?.in || 0}</h2>
                  </div>
                  {/*  Out */}
                  <div className="flex justify-between mb-2">
                    <h2>{p("out")}</h2>
                    <h2>{staticsData?.substitutes?.out || 0}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-sm py-3">{p("noResults")}</h1>
            )}
          </div>
        </div>
      </div>

      {/* Career, Trophies */}
      <div className="w-[700px] h-full max-xl:w-full">
        {/* Career */}
        <div className="bg-white border-slate-200 border border-solid rounded-xl py-5 ml-6 max-xl:ml-0 max-xl:mt-6 dark:bg-custom-dark dark:border-none">
          {/* Header*/}
          <div className="flex items-center justify-between px-5 mt-2">
            <div className="w-full">
              <h1 className="text-base font-medium">{p("career")}</h1>
            </div>
          </div>
          <hr className="dark:border-[#464646] mt-6 mb-4" />

          {/* Content */}
          {teams ? (
            teams?.map((v: any, i: number) => {
              const recentSeason =
                v?.seasons.length > 0 ? Math.max(...v?.seasons) : null;
              const oldestSeason =
                v?.seasons.length > 0 ? Math.min(...v?.seasons) : null;

              return (
                <div
                  key={i}
                  className="flex items-center mx-3 px-4 py-4 cursor-pointer hover:bg-[#F1F4F7] dark:hover:bg-[#282828] rounded-xl"
                  onClick={() =>
                    router.push(
                      `/${locale}/teams/${v?.team?.id}/${FormatLeagueOrTeamName(
                        v?.team?.name
                      )}/overview`
                    )
                  }
                >
                  {/* Image */}
                  <div className="w-[24px] h-[24px] relative mr-5">
                    <Image
                      src={v?.team?.logo}
                      alt={v?.team?.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Name, Season */}
                  <div className="text-[14px]">
                    <h1>{v?.team?.name}</h1>
                    <h3 className="text-custom-gray mt-2">
                      {oldestSeason && recentSeason
                        ? oldestSeason === recentSeason
                          ? `${oldestSeason}`
                          : `${oldestSeason}-${recentSeason}`
                        : "-"}
                    </h3>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-3 text-sm">{p("noResults")}</div>
          )}
        </div>

        {/* Trophies */}
        <div className="bg-white border-slate-200 border border-solid rounded-xl py-5 ml-6 max-xl:ml-0 dark:bg-custom-dark dark:border-none mt-6">
          {/* Header*/}
          <div className="flex items-center justify-between px-5 mt-2">
            <div className="w-full">
              <h1 className="text-base font-medium mb-4">{p("trophies")}</h1>
            </div>
          </div>

          {/* Content */}
          {trophies ? (
            trophiesGroupByCountry?.map((country: any, i: number) => {
              return (
                <div
                  key={i}
                  className="text-sm border-slate-200 border border-solid ark:bg-custom-dark dark:border-none mx-4 my-4 rounded-xl"
                >
                  <div className="bg-slate-100 py-3 px-3 rounded-t-xl dark:bg-custom-lightDark">
                    <h1>{country[0]}</h1>
                  </div>
                  <div>
                    {country[1]?.map((v: any, i: number) => {
                      return (
                        <Fragment key={i}>
                          <div className="flex gap-3 px-4 py-3 text-[#4A4A4A] justify-between dark:text-white">
                            <div>
                              <h3>{v?.league}</h3>
                              <h3 className="mt-2 text-xs">{v?.season}</h3>
                            </div>
                            <div>
                              <h3>{v?.place}</h3>
                            </div>
                          </div>
                          {country[1]?.length > i + 1 && (
                            <hr className="dark:border-[#464646] " />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 pt-8 pb-3  text-sm">{p("noResults")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
