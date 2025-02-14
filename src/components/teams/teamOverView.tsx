"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getTeamsStatistics } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam, getStanding } from "@/lib/features/leagueSlice";
import { getFixturesByTeam } from "@/lib/features/fixtureSlice";
import { getFixtures } from "@/lib/features/fixtureSlice";
import FormatMatchDetailURL from "@/lib/formatMatchDetailURL";
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";
import FormatMatchDate from "@/lib/formatMatchDate";

import lightFieldHalf from "@/../public/img/lightfieldHalf.png";
import darkFieldHalf from "@/../public/img/darkfieldHalf.png";

import noimage from "@/../public/img/noimage.png";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import undefined from "@/../public/img/undefined.png";

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
  const { leagues, standing }: { leagues: any; standing: any } = useAppSelector(
    (state) => state.leagueSlice
  );
  const { statics } = useAppSelector((state) => state.teamsSlice) as {
    statics: Statics | null;
  };
  const { fixtureByTeam } = useAppSelector((state) => state.fixtureSlice);
  const { location }: any = useAppSelector((state) => state.locationSlice);
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  const pathname = usePathname();

  const t = useTranslations("team");
  const d = useTranslations("date");

  const router = useRouter();

  const { theme } = useTheme();

  // http://localhost:3000/en/teams/47/Tottenham/overview
  // http://localhost:3000/en/teams/1577/Al%20Ahly/overview

  /**
   * 1. 축구 라인업 화면 어떻게 구성할건지 생각하기
   */

  useEffect(() => {
    // dispatch(getAllLeaguesByTeam({ team: id })).then(({ payload }) => {
    //   const nationalLeague = payload[0]?.league?.id;
    //   const latestSeason = payload[0]?.seasons?.at(-1)?.year;
    //   dispatch(
    //     getFixturesByTeam({ team: id, season: latestSeason, timezone: locate })
    //   ).then(({ payload }) => {
    //     // to get latest match data
    //     const lastMatch = (payload ?? [])
    //       .filter((match: any) =>
    //         ["FT", "PEN", "AET"].includes(match.fixture.status.short)
    //       )
    //       .sort(
    //         (a: any, b: any) =>
    //           new Date(b?.fixture?.date).getTime() -
    //           new Date(a?.fixture?.date).getTime()
    //       )
    //       .at(0);
    //     dispatch(getFixtures({ id: lastMatch?.fixture?.id, timezone: locate }));
    //   });
    //   dispatch(getStanding({ id: nationalLeague, year: latestSeason }));
    //   // dispatch(
    //   //   getTeamsStatistics({
    //   //     league: nationalLeague,
    //   //     season: latestSeason,
    //   //     team: id,
    //   //   })
    //   // );
    // });
  }, [dispatch, id, locate]);

  console.group("leagues");
  console.log(leagues);
  console.groupEnd();
  console.group("fixtureByTeam");
  console.log(fixtureByTeam);
  console.groupEnd();
  console.group("standing");
  console.log(standing);
  console.groupEnd();
  console.group("fixture");
  console.log(fixture);
  console.groupEnd();

  // statics은 쓸데이터인지 확실하지 않음 아직
  console.group("statics");
  console.log(statics);
  console.groupEnd();

  /** data for using */

  /** Last match's start XI */
  const lastMatchStartXI = fixture?.lineups?.filter((team: any) => {
    return Number(id) === team?.team?.id;
  });

  const lastMatchPlayers = fixture?.players?.filter((team: any) => {
    return Number(id) === team?.team?.id;
  });

  // last match formation
  console.group("lastMatchStartXI");
  console.log(lastMatchStartXI);
  console.groupEnd();

  console.group("lastMatchPlayers");
  console.log(lastMatchPlayers);
  console.groupEnd();

  const lastMatchFormation = lastMatchStartXI?.length
    ? lastMatchStartXI[0]?.formation?.split("-")
    : [];

  /** Last Recent 5 Matches */
  // ?? 연산자 fixtureByTeam이 값이 없을 경우 빈배열로 대체
  const lastRecentMatches = (fixtureByTeam ?? [])
    .filter((match: any) =>
      ["FT", "PEN", "AET"].includes(match.fixture.status.short)
    )
    .sort(
      (a: any, b: any) =>
        new Date(b?.fixture?.date).getTime() -
        new Date(a?.fixture?.date).getTime()
    )
    .slice(0, 5);

  /** Match status  */

  // scehduled
  const scheduled = ["TBD", "NS"];
  // ongoing
  const live = ["1H", "2H", "ET", "P", "LIVE", "HT", "BT"];
  // stopped by referee
  const stop = ["SUSP", "INT"];

  /** Upcoming matches */
  const upcomingMatch = (fixtureByTeam ?? [])
    .filter((match: any) => {
      const status = match?.fixture?.status?.short;

      return (
        scheduled.includes(status) ||
        live.includes(status) ||
        stop.includes(status)
      );
    }) // convert from milliseconds to seconds
    .sort(
      (a: any, b: any) => a?.fixture?.timestamp - b?.fixture?.timestamp
    ) as any[];

  const stands = standing ? standing : null;
  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0][0]?.form : null;
  const g = useTranslations("general");

  // Next match date and time
  const nextMatchDateWithTime = FormatMatchDate(
    upcomingMatch[0]?.fixture?.date,
    locale
  );

  // State value to change between match time and match points when the game is ongoing
  const [isPoint, setIsPoint] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPoint((prev) => !prev); // match goals <-> match time
    }, 2500); // it updates useState value every 2.5 seconds

    return () => clearInterval(interval); // clear Interval when componets is unmounted
  }, []);

  return (
    <div className="w-full">
      {/* header */}
      <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
        {/* team title */}
        <div className="flex items-center">
          <Image
            src={statics?.team?.logo || noimage}
            alt={statics?.team?.name || "no home team"}
            width={35}
            height={35}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="flex flex-col justify-center ml-4">
            <h1 className="text-lg"> {statics?.team?.name}</h1>
            <h1 className="text-sm mr-8 max-lg:mr-0 max-lg:text-xs text-custom-gray">
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
        {/* last 5 matches , next match || ongoing match */}
        <div className="w-7/12">
          {/* team form */}
          {lastRecentMatches?.length > 0 && (
            <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
              <h3 className="text-base">{t("teamForm")}</h3>
              <div className="flex justify-between mt-6">
                {lastRecentMatches?.map((v: any, i: number) => {
                  let win = null;

                  const numbericID = Number(id);

                  const isHomeTeam = v?.teams?.home?.id === numbericID;
                  const isAwayTeam = v?.teams?.away?.id === numbericID;

                  const opponentTeam =
                    v?.teams?.home?.id === numbericID
                      ? v?.teams?.away
                      : v?.teams?.home;

                  if (isHomeTeam) {
                    win = v?.teams?.home?.winner;
                  } else if (isAwayTeam) {
                    win = v?.teams?.away?.winner;
                  }

                  return (
                    <div
                      key={i}
                      className="text-center cursor-pointer hover:opacity-70"
                      onClick={() => {
                        router.push(
                          FormatMatchDetailURL(
                            v?.teams?.home?.name,
                            v?.teams?.away?.name,
                            v?.fixture?.id,
                            locale
                          )
                        );
                      }}
                    >
                      <span
                        className={`text-xs px-3 py-[2px] ${
                          win === true ? "bg-[#00985f]" : "bg-[#dd3635]"
                        } rounded-[0.4vw] text-white`}
                      >
                        {v?.goals?.home}-{v?.goals?.away}
                      </span>
                      <div className="flex justify-center mt-4 w-full h-[30px] items-center">
                        <Image
                          src={opponentTeam?.logo}
                          alt={opponentTeam?.name}
                          width={30}
                          height={30}
                          className="m-auto w-auto h-full"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* upcoming match || ongoing match */}
          {upcomingMatch?.length > 0 && (
            <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
              <div className="w-full flex justify-between items-center">
                {/* next match || ongoing match */}
                <h3 className="text-base">
                  {/* the title change based on whether match is ongoing or not  */}
                  {live?.includes(upcomingMatch[0]?.fixture?.status?.short) ||
                  stop?.includes(upcomingMatch[0]?.fixture?.status?.short)
                    ? t("onGoing")
                    : t("nextMatch")}
                </h3>
                {/* League name and logo */}
                <div
                  className="flex items-center gap-2 cursor-pointer hover:opacity-70"
                  onClick={() => {
                    router.push(
                      FormatLeagueOrTeamName(
                        `/${locale}/league/${leagues[0]?.league?.id}/${leagues[0]?.league?.name}/overview`
                      )
                    );
                  }}
                >
                  <h3 className="text-xs text-custom-gray">
                    {upcomingMatch[0]?.league?.name}
                  </h3>
                  <div className="w-[25px] h-[25px] rounded-full border border-solid border-[#E8E8E8] flex justify-center items-center">
                    <Image
                      src={upcomingMatch[0]?.league?.logo || noimage}
                      alt={upcomingMatch[0]?.league?.name || "no league name"}
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex justify-between items-center mt-6 cursor-pointer hover:opacity-70"
                onClick={() => {
                  router.push(
                    FormatMatchDetailURL(
                      upcomingMatch[0]?.teams?.home?.name,
                      upcomingMatch[0]?.teams?.away?.name,
                      upcomingMatch[0]?.fixture?.id,
                      locale
                    )
                  );
                }}
              >
                {/* home team */}
                <div>
                  <div className="w-full h-[50px]">
                    <Image
                      src={upcomingMatch[0]?.teams?.home?.logo || noimage}
                      alt={
                        upcomingMatch[0]?.teams?.home?.name || "no home team"
                      }
                      width={50}
                      height={50}
                      className="m-auto w-auto h-full"
                    />
                  </div>
                  <h1 className="text-sm text-center mt-3">
                    {upcomingMatch[0]?.teams?.home?.name}
                  </h1>
                </div>

                {/* fixture info */}
                <div>
                  {live?.includes(upcomingMatch[0]?.fixture?.status?.short) ||
                  stop?.includes(upcomingMatch[0]?.fixture?.status?.short) ? (
                    <AnimatePresence>
                      <div className="bg-[#00985F] text-white text-sm w-[45px] h-[24px] rounded-[0.4vw] flex items-center justify-center">
                        <motion.h3
                          key={isPoint ? "score" : "time"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                          {isPoint
                            ? `${upcomingMatch[0]?.goals?.home}
                          -
                          ${upcomingMatch[0]?.goals?.away}`
                            : `${
                                upcomingMatch[0]?.fixture?.status?.elapsed || 0
                              }'`}
                        </motion.h3>
                      </div>
                    </AnimatePresence>
                  ) : (
                    <div className="text-center">
                      <h3>{nextMatchDateWithTime?.time || "null"}</h3>
                      <h4 className="text-sm text-custom-gray mt-3">
                        {nextMatchDateWithTime?.date || "null"}
                      </h4>
                    </div>
                  )}
                </div>

                {/* away team */}
                <div>
                  <div className="w-full h-[50px]">
                    <Image
                      src={upcomingMatch[0]?.teams?.away?.logo || noimage}
                      alt={
                        upcomingMatch[0]?.teams?.away?.name || "no away team"
                      }
                      width={50}
                      height={50}
                      className="m-auto w-auto h-full"
                    />
                  </div>
                  <h1 className="text-sm text-center mt-3">
                    {upcomingMatch[0]?.teams?.away?.name}
                  </h1>
                </div>
              </div>
            </div>
          )}

          {/* national league stands */}
          {stands?.length > 0 && (
            <>
              <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
                <div
                  className="w-full flex items-center gap-4 mb-5 cursor-pointer hover:opacity-70"
                  onClick={() => {
                    router.push(
                      `/${locale}/leagues/${
                        leagues[0]?.league?.id
                      }/${FormatLeagueOrTeamName(
                        leagues[0]?.league?.name
                      )}/overview`
                    );
                  }}
                >
                  <Image
                    src={leagues[0]?.league?.logo}
                    alt={leagues[0]?.league?.name}
                    width={27}
                    height={27}
                  />
                  <h1 className="text-sm font-medium">
                    {leagues[0]?.league?.name}
                  </h1>
                </div>
                <hr />
                {/* 데이터가 있을 경우 데이터를 보여주고 없을 경우 데이터가 없다고 알려줌 */}
                {stands ? (
                  <>
                    <div className="flex justify-between mx-4 mt-3 text-custom-gray font-semibold">
                      <div>
                        <h2 className="text-xs">#</h2>
                      </div>
                      <div className="flex mr-3 max-md:mr-0">
                        <h2 className="text-xs w-5 px-5">PL</h2>
                        <h2 className="text-xs w-5 px-5  max-md:hidden">W</h2>
                        <h2 className="text-xs w-5 px-5  max-md:hidden">D</h2>
                        <h2 className="text-xs w-5 px-5  max-md:hidden">L</h2>
                        <h2 className="text-xs w-5 px-5">GD</h2>
                        <h2 className="text-xs w-5 px-5">PTS</h2>
                        {
                          /** 데이터에 form 필드가 있다면 보여주고 없다면 보여주지않기
                           * form데이터 길이에 따라 너비 조절
                           */
                          form ? (
                            <>
                              <h2
                                className="text-xs w-5 px-5 max-md:hidden"
                                style={{ marginRight: "103px" }}
                              >
                                Form
                              </h2>
                            </>
                          ) : (
                            <></>
                          )
                        }
                      </div>
                    </div>
                    <div className="mt-3 flex flex-col">
                      {stands[0]?.map((v: any, i: any) => {
                        // 승급
                        const champions = "Champions League";
                        const europa = "Europa League";
                        const conference = "Europa Conference League";
                        // 강등
                        const relegation = "Relegation";

                        // 최근전적
                        const recentResult = v.form?.split("");
                        return (
                          <div
                            key={i}
                            className="w-full flex justify-between py-2  hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
                            onClick={() => {
                              router.push(
                                `/${locale}/teams/${
                                  v?.team?.id
                                }/${FormatLeagueOrTeamName(
                                  v?.team?.name
                                )}/overview`
                              );
                            }}
                          >
                            {v.description &&
                            v.description.includes(relegation) === true ? (
                              <div className="w-0.5 h-5 bg-red-500 absolute" />
                            ) : v.description &&
                              v.description.includes(champions) === true ? (
                              <div className="w-0.5 h-5 bg-custom-green absolute" />
                            ) : v.description &&
                              v.description.includes(europa) === true ? (
                              <div className="w-0.5 h-5 bg-blue-500 absolute" />
                            ) : v.description &&
                              v.description.includes(conference) === true ? (
                              <div className="w-0.5 h-5 bg-sky-300 absolute" />
                            ) : (
                              <></>
                            )}
                            <div className="flex pl-4 dark:text-white">
                              <h2 className="text-xs pr-4 font-semibold">
                                {v?.rank}
                              </h2>
                              <Image
                                src={v?.team?.logo}
                                alt={v?.team?.name}
                                width={50}
                                height={50}
                                style={{ width: 15, height: 15 }}
                              />
                              <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                            </div>
                            <div className="flex dark:text-white mr-3">
                              <h2 className="text-xs w-5 px-5">
                                {v.all.played}
                              </h2>
                              <h2 className="text-xs w-5 px-5  max-md:hidden">
                                {v.all.win}
                              </h2>
                              <h2 className="text-xs w-5 px-5  max-md:hidden">
                                {v.all.draw}
                              </h2>
                              <h2 className="text-xs w-5 px-5  max-md:hidden">
                                {v.all.lose}
                              </h2>
                              <h2 className="text-xs w-5 px-5">
                                {v.goalsDiff}
                              </h2>
                              <h2 className="text-xs w-5 px-5">{v.points}</h2>
                              {form ? (
                                <div className="flex items-center ml-4 w-36  max-md:hidden">
                                  {recentResult?.map((v: string, i: number) => {
                                    return (
                                      <h2
                                        className={`text-xs w-5 py-0.5 ml-2 text-center text-white rounded-md ${
                                          v === "W"
                                            ? "bg-green-500"
                                            : v === "D"
                                            ? "bg-custom-gray"
                                            : "bg-red-500"
                                        }`}
                                        key={i}
                                      >
                                        {v}
                                      </h2>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="mr-3" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="w-full h-20 px-8 py-10">
                    <h1 className="text-base">{g("noresults")}</h1>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        {/* last stratXI */}
        <div className="w-5/12">
          {fixture?.lineups && (
            <>
              {/* header */}
              <div className="w-full bg-white rounded-t-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0 flex">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={fixture?.league?.logo}
                      alt={fixture?.league?.name}
                      width={20}
                      height={20}
                    />
                    <h1 className="text-base">Season stats</h1>
                  </div>
                  <h1 className="text-xs text-custom-gray">Last starting XI</h1>
                </div>
              </div>
              {/* feild */}
              <div className="w-full relative">
                <div className="w-full">
                  <Image
                    src={theme === "light" ? lightFieldHalf : darkFieldHalf}
                    alt="field"
                    width={1000}
                    height={1000}
                    className="w-full h-auto"
                  />
                </div>

                {/* start XI */}
                <div className="absolute top-0 left-0 text-[12px] h-full w-full flex-col-reverse">
                  <div className="flex-col-reverse h-full w-1/2 justify-around px-4 items-center">
                    {/* goal keeper */}
                    <div
                      className="justify-center relative w-[80px] hover:opacity-70 cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/${locale}/players/${
                            fixture?.lineups[0].startXI[0].player.id
                          }/${(fixture?.lineups[0].startXI[0].player.name).replace(
                            / /g,
                            "-"
                          )}`
                        )
                      }
                    >
                      <Image
                        src={`https://media.api-sports.io/football/players/${lastMatchStartXI[0]?.startXI[0]?.player?.id}.png`}
                        alt={
                          lastMatchStartXI[0]?.startXI[0]?.player?.name ||
                          "keeper image"
                        }
                        width={45}
                        height={45}
                        className="rounded-full m-auto bg-white max-md:w-[40px]"
                      />

                      <div className="flex text-white mt-2 justify-center">
                        {fixture?.players[0]?.players[0]?.statistics[0]?.games
                          ?.captain && (
                          <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center mr-1">
                            <h3 className="text-[8px] font-bold text-black">
                              C
                            </h3>
                          </div>
                        )}
                        <h3>{lastMatchStartXI[0]?.startXI[0].player.number}</h3>{" "}
                        &nbsp;
                        <h3>
                          {lastMatchStartXI[0]?.startXI[0].player?.name.split(
                            " "
                          )[1] || lastMatchStartXI[0]?.startXI[0]?.player?.name}
                        </h3>
                      </div>
                    </div>
                    {/* players */}
                    {lastMatchFormation?.map((line: number, index: number) => {
                      const players = lastMatchStartXI[0]?.startXI?.slice(
                        1,
                        11
                      );

                      /** ex) 4-2-3-1
                       *
                       * when slice is (0,0) it always returns 0.
                       *
                       * index = 1 =>  startIndex = 0 , endIndex = 4
                       * index = 2 =>  startIndex = 4 , endIndex = 6
                       * index = 3 =>  startIndex = 6 , endIndex = 9
                       * index = 4 =>  startIndex = 9 , endIndex = 10
                       */
                      const startIndex = lastMatchFormation
                        .slice(0, index)
                        .reduce((acc: number, players: string) => {
                          return acc + parseInt(players);
                        }, 0);

                      const endIndex = startIndex + Number(line);

                      const playersPerLine = players.slice(
                        startIndex,
                        endIndex
                      );

                      // console.log(playersPerLine);

                      return (
                        <div key={index} className="flex ">
                          {playersPerLine.map(
                            (player: any, playerIndex: number) => {
                              // player first name
                              const playerName =
                                player?.player.name?.split(" ")[1] ||
                                player?.player.name;

                              const playerStats =
                                lastMatchPlayers[0]?.players?.find((v: any) => {
                                  return v?.player?.id === player?.player?.id;
                                });

                              return (
                                <div
                                  key={playerIndex}
                                  className="flex-col mx-0 sm:mx-6 md:mx-8 lg:mx-0 lg:my-0 xl:my-6 2xl:my-10 w-[80px] relative hover:opacity-70 cursor-pointer"
                                  onClick={() =>
                                    router.push(
                                      `/${locale}/players/${
                                        player?.player.id
                                      }/${(player?.player.name).replace(
                                        / /g,
                                        "-"
                                      )}`
                                    )
                                  }
                                >
                                  {/* player image */}
                                  <Image
                                    src={`https://media.api-sports.io/football/players/${player?.player.id}.png`}
                                    alt={player?.player.name || "player image"}
                                    width={45}
                                    height={45}
                                    className="rounded-full m-auto bg-white max-md:w-[40px]"
                                  />
                                  {/* player number and name */}
                                  <div className="flex justify-center text-white mt-2">
                                    {playerStats?.statistics[0].games
                                      .captain && (
                                      <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center mr-1">
                                        <h3 className="text-[8px] font-bold text-black">
                                          C
                                        </h3>
                                      </div>
                                    )}
                                    <h3>{player?.player.number}</h3> &nbsp;
                                    <h3>{playerName}</h3>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
