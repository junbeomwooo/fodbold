"use client";

import {
  getFixtures,
  getH2H,
  getInjuries,
  getFixtruesByRound,
} from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import FixtureHeader from "./header/fixtureHeader";
import { useTheme } from "next-themes";

import Image from "next/image";
import { PhoneForwarded } from "lucide-react";
import { PiSoccerBallLight } from "react-icons/pi";
import { CgArrowsExchange } from "react-icons/cg";
import { useTranslations } from "next-intl";
import LightField from "@/../public/img/lightfield.png";
import LightFieldMobile from "@/../public/img/lightfieldMobile.png";
import DarkField from "@/../public/img/darkfield.png";
import DarkFieldMobile from "@/../public/img/darkfieldMobile.png";
import { FaArrowCircleLeft } from "react-icons/fa";
import Shoes from "@/../public/img/soccershoes.png";
import MissedPenalty from "@/../public/img/missedPenalty.png";
import Saved from "@/../public/img/saved.png";
import { ImCross } from "react-icons/im";

// import { fixture } from "../../../public/example";

const FixturesOverView = ({ id, locale }: { id: number; locale: string }) => {
  // 번역
  const f = useTranslations("fixture");

  // 테마
  const { theme } = useTheme();

  /** 리덕스 초기화 */
  const dispatch = useAppDispatch();
  const { fixture, injurie, fixtureByRound, h2h }: any = useAppSelector(
    (state) => state.fixtureSlice
  );

  const { location }: any = useAppSelector((state) => state.locationSlice);

  const router = useRouter();

  // 탭 페이지 상태 값
  const [tabPage, setTabPage] = useState("factsPreview");

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  /** useEffect  */

  // 각 로케일 별로 포맷한 데이터값을 구했으니 다른 것들 마저 구현하기 , 컴포넌트의 불필요한 재렌더링으로 인해 수많은 console.log가 찍힘

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const { payload } = await dispatch(getFixtures({ id: id, timezone: locate }));
    //     await Promise.all([
    //       dispatch(getInjuries({ id: id })),
    //       dispatch(
    //         getFixtruesByRound({
    //           leagueID: payload?.league.id,
    //           season: payload?.league.season,
    //           round: payload?.league.round,
    //         })
    //       ),
    //       dispatch(
    //         getH2H({
    //           homeID: payload?.teams.home.id,
    //           awayID: payload?.teams.away.id,
    //           timezone: locate,
    //         })
    //       ),
    //     ]);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, [dispatch, id, locate]);

  /** data for using */

  // home , away match stats
  const homeStats = fixture?.statistics[0]?.statistics;
  const awayStats = fixture?.statistics[1]?.statistics;

  const finxturesByRound10 = fixtureByRound?.slice(0, 10);
  const round = fixture?.league.round.split("-")[1];
  const hometeamFormation = fixture?.lineups[0]?.formation.split("-");
  const awayteamFormation = fixture?.lineups[1]?.formation.split("-").reverse();

  /** substitutes for home team */
  const homeSubstitutes = fixture?.players[0].players.filter((v: any) => {
    return v.statistics[0].games.substitute;
  });

  const [homePlayedPlayer, homeBenchPlayer] = homeSubstitutes?.reduce(
    ([played, bench]: any[], player: any) => {
      const hasMinutes = player?.statistics[0].games.minutes;
      return hasMinutes
        ? [[...played, player], bench]
        : [played, [...bench, player]];
    },
    [[], []] // Initial value
  ) || [[], []]; // basic value : when reduce value is undefined or null, it will automatically assign array value to this funtion

  /** substitutes for away team */
  const awaySubstitutes = fixture?.players[1].players.filter((v: any) => {
    return v.statistics[0].games.substitute;
  });

  const [awayPlayedPlayer, awayBenchPlayer] = awaySubstitutes?.reduce(
    ([played, bench]: any[], player: any) => {
      const hasMinutes = player?.statistics[0].games.minutes;
      return hasMinutes
        ? [[...played, player], bench]
        : [played, [...bench, player]];
    },
    [[], []] // Initial value
  ) || [[], []]; // basic value : when reduce value is undefined or null, it will automatically assign array value to this funtion

  /** Injuried player for home team */
  const homeInjurie = injurie?.filter((v: any) => {
    return v?.team.id === fixture?.teams.home.id;
  });
  /** Injuried player for away team */
  const awayInjurie = injurie?.filter((v: any) => {
    return v?.team.id === fixture?.teams.away.id;
  });

  /** A function to calculate the number of wins for each team.  */

  const winnerCounts = h2h?.reduce((acc: any, match: any) => {
    const teamB = match.teams.away;
    const teamA = match.teams.home;

    if (teamA.winner) {
      acc[teamA.id] = (acc[teamA.id] || 0) + 1;
    } else if (teamB.winner) {
      acc[teamB.id] = (acc[teamB.id] || 0) + 1;
    } else {
      acc["draw"] = (acc["draw"] || 0) + 1;
    }

    return acc;
  }, {});

  console.log(winnerCounts);

  console.group("locate");
  console.log(locate);
  console.groupEnd();

  console.group("fixture");
  console.log(fixture);
  console.groupEnd();

  console.group("homeInjurie");
  console.log(homeInjurie);
  console.groupEnd();

  console.group("h2h");
  console.log(h2h);
  console.groupEnd();

  /** 리그URL로 이동하기위해 url 포맷변경하는 함수 */
  const formattedLeagueURL = (league: string) => {
    if (league) {
      // 하이픈을 모두 삭제합니다.
      const noHyphens = league.replace(/-/g, " ");

      // 두 번 이상의 연속 공백을 하나로 줄입니다.
      const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

      // 1. 공백을 하이픈으로 변경
      const hyphenated = cleanedString.replace(/\s+/g, "-");

      // 2. 온점을 제거
      const withoutDots = hyphenated.replace(/\./g, "");

      // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
      const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

      /** 최종 */
      return withHyphens.toLowerCase();
    } else {
      return null;
    }
  };

  /** 이동시킬 리그 URL */
  const leagueNameURL = formattedLeagueURL(fixture?.league.name);

  /**경기 상세 페이지로 이동 */
  const moveToFormattedMatchURL = (
    home: string,
    away: string,
    matchID: number
  ) => {
    const matchVS = `${home}-vs-${away}`;

    // 하이픈을 모두 삭제합니다.
    const noHyphens = matchVS.replace(/-/g, " ");

    // 두 번 이상의 연속 공백을 하나로 줄입니다.
    const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

    // 1. 공백을 하이픈으로 변경
    const hyphenated = cleanedString.replace(/\s+/g, "-");

    // 2. 온점을 제거
    const withoutDots = hyphenated.replace(/\./g, "");

    // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
    const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

    // 4. 소문자로 변환
    const name = withHyphens.toLowerCase();

    /** 최종 */
    const url = `/${locale}/matches/${name}/${matchID}`;

    router.push(url);
  };

  return (
    <div className="flex w-full justify-center">
      {/* 헤더 및 메인 컨텐츠 */}
      <div className="w-full">
        {/* 헤더 */}
        <div className="w-full mt-6 max-lg:mt-0 max-xl:w-full border-slate-200 border border-solid bg-white px-7 pt-7 rounded-xl dark:bg-custom-dark dark:border-0 max-md:px-4">
          <FixtureHeader
            fixture={fixture}
            locale={locale}
            leagueNameURL={leagueNameURL}
          />

          {/* 카테고리 */}
          <div className="flex text-base font-normal mt-10 text-gray-700 max-md:text-xs">
            {/* Facts, Preview */}
            {fixture?.statistics.length > 0 ? (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400"
                onClick={() => setTabPage("factsPreview")}
              >
                <h1
                  className={
                    tabPage === "factsPreview"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("facts")}
                </h1>
                {tabPage === "factsPreview" ? (
                  <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400"
                onClick={() => setTabPage("factsPreview")}
              >
                {" "}
                <h1
                  className={
                    tabPage === "factsPreview"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("preview")}
                </h1>
                {tabPage === "factsPreview" ? (
                  <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
                ) : (
                  <></>
                )}
              </div>
            )}

            {/* Events */}
            {fixture?.events.length > 0 && (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400 ml-10 max-md:ml-5"
                onClick={() => setTabPage("events")}
              >
                <h1
                  className={
                    tabPage === "events"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("events")}
                </h1>
                {tabPage === "events" ? (
                  <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
                ) : (
                  <></>
                )}
              </div>
            )}

            {/* Lineups */}
            {fixture?.lineups.length > 0 && (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400 ml-10 max-md:ml-5"
                onClick={() => setTabPage("lineups")}
              >
                <h1
                  className={
                    tabPage === "lineups"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("lineup")}
                </h1>
                {tabPage === "lineups" ? (
                  <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
                ) : (
                  <></>
                )}
              </div>
            )}

            {/* Stats */}
            {fixture?.statistics.length > 0 && (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400 ml-10 max-md:ml-5"
                onClick={() => setTabPage("stats")}
              >
                <h1
                  className={
                    tabPage === "stats"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("stats")}
                </h1>
                {tabPage === "stats" ? (
                  <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
                ) : (
                  <></>
                )}
              </div>
            )}

            {/* Head to Head */}
            <div
              className="flex flex-col cursor-pointer hover:text-gray-400 ml-10 max-md:ml-5"
              onClick={() => setTabPage("h2h")}
            >
              <h1
                className={
                  tabPage === "h2h"
                    ? "text-black font-medium dark:text-white"
                    : "text-gray-700 dark:text-custom-gray"
                }
              >
                {f("h2h")}
              </h1>
              {tabPage === "h2h" ? (
                <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Facts , Preview */}
        {tabPage === "factsPreview" && (
          <>
            {/* 경기가 시작했거나 끝난 경우 */}
            {fixture?.statistics.length > 0 ||
            fixture?.fixture.status.short === "FT" ? (
              <>
                {/* Match stats */}
                {fixture?.statistics.length > 0 && (
                  <div className="w-full bg-white mt-4 border border-solid border-slate-200 rounded-xl pt-7 dark:bg-custom-dark dark:border-none">
                    <div className="w-full">
                      <div className="text-base w-full">
                        <div className="flex justify-center text-base font-medium mb-8 px-7">
                          <h1>{f("matchStats")}</h1>
                        </div>
                        <div className="flex justify-center px-7">
                          <h2 className="text-xs mb-6">
                            {f("ballPossession")}
                          </h2>
                        </div>
                        {/*Ball possession bar */}
                        <div className="flex w-full px-7">
                          <div
                            style={{
                              width: homeStats[9]?.value,
                              backgroundColor: `#${
                                fixture.lineups[0].team.colors.player
                                  .primary === "ffffff"
                                  ? "F1F5F9"
                                  : fixture.lineups[0].team.colors.player
                                      .primary
                              }`,
                            }}
                            className="py-2 mr-1 rounded-l-full text-sm flex items-center text-white"
                          >
                            <h1
                              className="ml-5"
                              style={{
                                color: `${
                                  fixture.lineups[0].team.colors.player
                                    .primary === "ffffff"
                                    ? "black"
                                    : "white"
                                }`,
                              }}
                            >
                              {homeStats[9].value}
                            </h1>
                          </div>
                          <div
                            style={{
                              width: awayStats[9]?.value,
                              backgroundColor: `#${
                                fixture.lineups[1].team.colors.player
                                  .primary === "ffffff"
                                  ? "F1F5F9"
                                  : fixture.lineups[1].team.colors.player
                                      .primary
                              }`,
                            }}
                            className="py-2 ml-1  rounded-r-full  text-sm flex items-center text-white justify-end"
                          >
                            <h1
                              className="mr-5"
                              style={{
                                color: `${
                                  fixture.lineups[1].team.colors.player
                                    .primary === "ffffff"
                                    ? "black"
                                    : "white"
                                }`,
                              }}
                            >
                              {awayStats[9].value}
                            </h1>
                          </div>
                        </div>

                        {/* expected goals */}
                        <div className="flex w-full justify-between mt-8 text-xs px-7">
                          <div className="ml-2">
                            <h1>
                              {fixture.statistics[0].statistics[16].value
                                ? fixture.statistics[0].statistics[16].value
                                : 0}
                            </h1>
                          </div>
                          <div>
                            <h1>{f("expectedGoals")}</h1>
                          </div>
                          <div className="mr-2">
                            <h1>
                              {fixture.statistics[1].statistics[16].value
                                ? fixture.statistics[1].statistics[16].value
                                : 0}
                            </h1>
                          </div>
                        </div>

                        {/* total shots */}
                        <div className="flex w-full justify-between mt-8 text-xs px-7">
                          <div className="ml-2">
                            <h1>
                              {fixture?.statistics[0].statistics[2].value}
                            </h1>
                          </div>
                          <div>
                            <h1>{f("totalShots")}</h1>
                          </div>
                          <div className="mr-2">
                            <h1>
                              {fixture?.statistics[1].statistics[2].value}
                            </h1>
                          </div>
                        </div>

                        {/* Fouls */}
                        <div className="flex w-full justify-between mt-8 text-xs px-7">
                          <div className="ml-2">
                            <h1>
                              {fixture?.statistics[0].statistics[6].value}
                            </h1>
                          </div>
                          <div>
                            <h1>{f("fouls")}</h1>
                          </div>
                          <div className="mr-2">
                            <h1>
                              {fixture?.statistics[1].statistics[6].value}
                            </h1>
                          </div>
                        </div>

                        <hr className="mt-10 dark:border-custom-gray3" />

                        {/* move to all stats */}
                        <div
                          className="flex justify-center items-center p-3 cursor-pointer hover:opacity-50 hover:underline"
                          onClick={() => setTabPage("stats")}
                        >
                          <h1 className="text-xsm font-medium">
                            {f("allStats")}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Events */}
                {fixture?.events.length > 0 && (
                  <div className="w-full bg-white mt-4  border border-solid border-slate-200 rounded-xl p-7 dark:bg-custom-dark  dark:border-none">
                    <div className="flex justify-center">
                      <h1 className="text-base font-medium">{f("events")}</h1>
                    </div>

                    <div className="mt-10">
                      {fixture?.events.map((v: any, i: number) => {
                        return (
                          <div
                            key={i}
                            className={`flex w-full mb-5 items-center max-md:flex-row-reverse ${
                              v?.team.name === fixture?.teams.home.name
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            {/* 홈팀 이벤트 */}
                            <div className="font-normal w-6/12 max-md:w-auto">
                              {v?.team.name === fixture?.teams.home.name && (
                                <div className="flex items-center justify-end mr-10">
                                  {/* 타입이 골이라면 */}
                                  {v.type === "Goal" && (
                                    <>
                                      <div className="text-xsm">
                                        <h1>{v.player.name}</h1>
                                        {v.assist.name ? (
                                          <>
                                            {/* 어시스트가 있다면 */}
                                            <h2 className="text-gray-500 mt-1">
                                              {f("assistBy")} {v.assist.name}
                                            </h2>
                                          </>
                                        ) : (
                                          <>
                                            {/* 자책골이라면 */}
                                            <h2 className="text-gray-500 mt-1">
                                              {f("ownGoal")}
                                            </h2>
                                          </>
                                        )}
                                      </div>

                                      <div>
                                        <PiSoccerBallLight className="w-7 h-7 border-2 border-solid border-slate-300 rounded-full ml-6 " />
                                      </div>
                                    </>
                                  )}

                                  {/* 타입이 카드라면 */}
                                  {v.type === "Card" && (
                                    <>
                                      <div className="text-xsm">
                                        <h1>{v.player.name}</h1>
                                      </div>
                                      {v.detail === "Yellow Card" ? (
                                        <div className="w-6 h-6 bg-yellow-300 ml-6 rounded-full" />
                                      ) : (
                                        <div className="w-6 h-6 bg-red-500 ml-6 rounded-full" />
                                      )}
                                    </>
                                  )}

                                  {/* 타입이 교체라면 */}
                                  {v.type === "subst" && (
                                    <>
                                      <div className="text-xsm">
                                        <h1 className="text-green-600">
                                          {v.assist.name}
                                        </h1>
                                        <h1 className="text-red-500 mt-1">
                                          {v.player.name}
                                        </h1>
                                      </div>
                                      <div>
                                        <CgArrowsExchange className="w-7 h-7 border-2 border-solid border-slate-300 rounded-full ml-6" />
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            {/* 시간대 */}
                            <div
                              className={`font-semibold border border-solid border-slate-200 bg-slate-200 w-9 h-9 rounded-full text-sm flex justify-center items-center dark:bg-custom-gray2 dark:border-none ${
                                v?.team.name === fixture?.teams.home.name
                                  ? "max-md:mr-6"
                                  : "max-md:ml-6"
                              }`}
                            >
                              <h1>{v?.time.elapsed}&#39;</h1>
                            </div>

                            {/* 어웨이팀 이벤트 */}
                            <div className="font-normal w-6/12 max-md:w-auto">
                              {v?.team.name === fixture?.teams.away.name && (
                                <div className="flex items-center justify-start ml-10">
                                  {/* 타입이 골이라면 */}
                                  {v.type === "Goal" && (
                                    <>
                                      <div>
                                        <PiSoccerBallLight className="w-7 h-7 border-2 border-solid border-slate-300 rounded-full mr-6 " />
                                      </div>
                                      <div className="text-xsm">
                                        <h1>{v.player.name}</h1>
                                        {v.assist.name ? (
                                          <>
                                            {/* 어시스트가 있다면 */}
                                            <h2 className="text-gray-500 mt-1">
                                              {f("assistBy")} {v.assist.name}
                                            </h2>
                                          </>
                                        ) : (
                                          <>
                                            {/* 자책골이라면 */}
                                            <h2 className="text-gray-500">
                                              {f("ownGoal")}
                                            </h2>
                                          </>
                                        )}
                                      </div>
                                    </>
                                  )}

                                  {/* 타입이 카드라면 */}
                                  {v.type === "Card" && (
                                    <>
                                      {v.detail === "Yellow Card" ? (
                                        <div className="w-6 h-6 bg-yellow-300 mr-6 rounded-full" />
                                      ) : (
                                        <div className="w-6 h-6 bg-red-500 mr-6 rounded-full" />
                                      )}
                                      <div className="text-xsm">
                                        <h1>{v.player.name}</h1>
                                      </div>
                                    </>
                                  )}

                                  {/* 타입이 교체라면 */}
                                  {v.type === "subst" && (
                                    <>
                                      <div>
                                        <CgArrowsExchange className="w-7 h-7 border-2 border-solid border-slate-300 rounded-full mr-6" />
                                      </div>
                                      <div className="text-xsm">
                                        <h1 className="text-green-600">
                                          {v.assist.name}
                                        </h1>
                                        <h1 className="text-red-500 mt-1">
                                          {v.player.name}
                                        </h1>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* extra time */}
                    {fixture?.fixture.status.extra && (
                      <div className="flex justify-center">
                        <h1 className="text-xsm font-medium mt-3 dark:text-custom-gray">
                          {fixture?.fixture.status.extra} {f("minutesAdded")}
                        </h1>
                      </div>
                    )}

                    <div className="flex items-center mt-10">
                      <hr className="border-1 border-solid border-slate-200 w-full dark:border-custom-gray3" />
                      <h1 className="text-base font-semibold px-8">FT</h1>
                      <hr className="border-1 border-solid border-slate-200 w-full dark:border-custom-gray3" />
                    </div>
                  </div>
                )}

                {/* Lineups */}
                {fixture?.lineups.length > 0 && (
                  <div className="mt-4">
                    {/* lineup header */}
                    <div className="flex w-full justify-between p-5 bg-[#0B9F67]  dark:bg-custom-gray3 rounded-t-xl">
                      {/* home team */}
                      <div className="flex items-center text-base text-white">
                        <Image
                          src={fixture?.teams.home.logo}
                          alt={fixture?.teams.home.name || "home team logo"}
                          width={35}
                          height={35}
                          className="rounded-full mr-4"
                        />
                        <h2 className="mr-6">{fixture?.teams.home.name}</h2>
                        <h2 className="font-medium max-sm:hidden">
                          {fixture?.lineups[0].formation}
                        </h2>
                      </div>
                      {/* away team */}
                      <div className="flex items-center text-base text-white">
                        <h2 className="font-medium max-sm:hidden">
                          {fixture?.lineups[1].formation}
                        </h2>
                        <h2 className="ml-6">{fixture?.teams.away.name}</h2>{" "}
                        <Image
                          src={fixture?.teams.away.logo}
                          alt={fixture?.teams.away.name || "away team logo"}
                          width={35}
                          height={35}
                          className="rounded-full ml-4"
                        />
                      </div>
                    </div>
                    {/* lineup */}
                    <div className="w-full relative">
                      <div className="w-full">
                        {/* background */}
                        {theme === "light" ? (
                          <>
                            <Image
                              src={LightField}
                              alt="football lineups"
                              className="max-lg:hidden"
                            />
                            <Image
                              src={LightFieldMobile}
                              alt="football lineups mobile"
                              className="lg:hidden"
                            />
                          </>
                        ) : (
                          <>
                            <Image
                              src={DarkField}
                              alt="football lineups"
                              className="max-lg:hidden"
                            />
                            <Image
                              src={DarkFieldMobile}
                              alt="football lineups mobile"
                              className="lg:hidden w-full"
                            />
                          </>
                        )}

                        <div className="absolute top-0 left-0 text-[12px] h-full w-full flex max-lg:flex-col">
                          {/* 홈팀 */}
                          <div className="flex h-full w-1/2 justify-around px-4 items-center max-lg:flex-col max-lg:w-full max-lg:h-1/2">
                            {/* 골키퍼 */}
                            <div className="justify-center relative w-[80px]">
                              <Image
                                src={`https://media.api-sports.io/football/players/${fixture?.lineups[0].startXI[0].player.id}.png`}
                                alt={
                                  fixture?.lineups[0].startXI[0].player.name ||
                                  "keeper image"
                                }
                                width={45}
                                height={45}
                                className="rounded-full m-auto bg-white max-md:w-[40px]"
                              />
                              <div className="flex text-white mt-2 justify-center">
                                {fixture?.players[0].players[0].statistics[0]
                                  .games.captain && (
                                  <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center mr-1">
                                    <h3 className="text-[8px] font-bold text-black">
                                      C
                                    </h3>
                                  </div>
                                )}
                                <h3>
                                  {fixture?.lineups[0].startXI[0].player.number}
                                </h3>{" "}
                                &nbsp;
                                <h3>
                                  {
                                    fixture?.lineups[0].startXI[0].player.name.split(
                                      " "
                                    )[1]
                                  }
                                </h3>
                              </div>

                              {/* 골키퍼 스탯 */}
                              <>
                                {/* 골키퍼 평점 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .games.rating ? (
                                  <div
                                    className="absolute w-7 h-[18px] right-[4px] top-[-4px] rounded-full flex items-center justify-center text-white"
                                    style={{
                                      backgroundColor:
                                        parseInt(
                                          fixture?.players[0].players[0]
                                            .statistics[0].games.rating
                                        ) >= 9
                                          ? "#4389f9"
                                          : parseInt(
                                              fixture?.players[0].players[0]
                                                .statistics[0].games.rating
                                            ) >= 7
                                          ? "#22B268"
                                          : "#EF8022",
                                    }}
                                  >
                                    <h3>
                                      {
                                        fixture?.players[0].players[0]
                                          .statistics[0].games.rating
                                      }
                                    </h3>
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {/* 골키퍼 교체 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .games.minutes < 90 ? (
                                  <div className="absolute w-4 h-4 bg-white rounded-full left-3 top-[-5px] flex items-center justify-center">
                                    <h1 className="absolute mb-7 text-white text-[10px] font-medium">
                                      {
                                        fixture?.players[0].players[0]
                                          .statistics[0].games.minutes
                                      }
                                      &apos;
                                    </h1>
                                    <FaArrowCircleLeft className=" text-red-500 w-3 h-3" />
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {/* 골키퍼 카드 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .cards.red ||
                                fixture?.players[0].players[0].statistics[0]
                                  .cards.yellow ? (
                                  <div
                                    className="absolute w-4 h-4 left-[7px] top-3 rounded-full"
                                    style={{
                                      backgroundColor: fixture?.players[0]
                                        .players[0].statistics[0].cards.red
                                        ? "#EF4444"
                                        : "#FDE046",
                                    }}
                                  ></div>
                                ) : (
                                  <></>
                                )}

                                {/* 골키퍼 골 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .goals.total ? (
                                  <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                    <PiSoccerBallLight className="w-3 h-3 dark:text-black" />
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {/* 골키퍼 선방 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .penalty.saved ? (
                                  <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-[35px] flex items-center justify-center">
                                    <Image
                                      src={Saved}
                                      alt="penalty saved"
                                      width={15}
                                      height={15}
                                      className="w-3 h-3"
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}

                                {/* 골키퍼 어시스트 */}
                                {fixture?.players[0].players[0].statistics[0]
                                  .goals.assists ? (
                                  <div className="w-4 h-4 left-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                    <Image
                                      src={Shoes}
                                      alt="assist"
                                      width={15}
                                      height={15}
                                      className="w-3 h-3 -rotate-12"
                                    />
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </>
                            </div>
                            {/*
                          reudce함수를 사용하여 시작 위치의 합계를 통해 이미 이전에 언급된 인덱스를 제외하여 새로운 시작 위치를 선정
                          시작 인덱스 위치와 선수의 수가 들어있는 line 변수를 더하여 끝날 위치를 알아냄
                          그렇게 구한 startIndex와 endIndex 위치를 사용하여 각 반복마다 필요한 선수를 추출
                          */}
                            {hometeamFormation.map(
                              (line: number, index: number) => {
                                // 골키퍼를 제외한 선발 명단 선수들
                                const players =
                                  fixture?.lineups[0].startXI.slice(1, 12);

                                // 시작 인덱스
                                const startIndex = hometeamFormation
                                  .slice(0, index)
                                  .reduce(
                                    (acc: number, players: string) =>
                                      acc + parseInt(players),
                                    0
                                  );

                                // 엔드 인덱스
                                const endIndex = startIndex + Number(line);

                                // 각 포메이션 라인별 선수들
                                const playersPerLine = players.slice(
                                  startIndex,
                                  endIndex
                                );

                                return (
                                  <div
                                    key={index}
                                    className="flex lg:flex-col-reverse"
                                  >
                                    {playersPerLine.map(
                                      (player: any, playerIndex: number) => {
                                        // 성을 제외한 선수의 이름
                                        const playerName =
                                          player?.player.name.split(" ")[1] ||
                                          player?.player.name;

                                        // 플레이어의 스탯
                                        const playerStats =
                                          fixture?.players[0].players.find(
                                            (v: any) => {
                                              return (
                                                v.player.id ===
                                                player?.player.id
                                              );
                                            }
                                          );

                                        return (
                                          // 한 선수
                                          <div
                                            key={playerIndex}
                                            className="flex-col mx-0 sm:mx-6 md:mx-8 lg:mx-0 lg:my-0 xl:my-6 2xl:my-10 w-[80px] relative"
                                          >
                                            {/* 선수 이미지 */}
                                            <Image
                                              src={`https://media.api-sports.io/football/players/${player?.player.id}.png`}
                                              alt={
                                                player?.player.name ||
                                                "player image"
                                              }
                                              width={45}
                                              height={45}
                                              className="rounded-full m-auto bg-white max-md:w-[40px]"
                                            />
                                            {/* 선수 번호 및 이름 */}
                                            <div className="flex justify-center text-white mt-2">
                                              {playerStats?.statistics[0].games
                                                .captain && (
                                                <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center mr-1">
                                                  <h3 className="text-[8px] font-bold text-black">
                                                    C
                                                  </h3>
                                                </div>
                                              )}
                                              <h3>{player?.player.number}</h3>{" "}
                                              &nbsp;
                                              <h3>{playerName}</h3>
                                            </div>

                                            {/* 선수 스탯 */}
                                            <>
                                              {/* 선수 평점 */}
                                              {playerStats?.statistics[0].games
                                                .rating ? (
                                                <div
                                                  className="absolute w-7 h-[18px] right-[4px] top-[-4px] rounded-full flex items-center justify-center text-white"
                                                  style={{
                                                    backgroundColor:
                                                      parseInt(
                                                        playerStats
                                                          ?.statistics[0].games
                                                          .rating
                                                      ) >= 9
                                                        ? "#4389f9"
                                                        : parseInt(
                                                            playerStats
                                                              ?.statistics[0]
                                                              .games.rating
                                                          ) >= 7
                                                        ? "#22B268"
                                                        : "#EF8022",
                                                  }}
                                                >
                                                  <h3>
                                                    {
                                                      playerStats?.statistics[0]
                                                        .games.rating
                                                    }
                                                  </h3>
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 교체 */}
                                              {playerStats?.statistics[0].games
                                                .minutes < 90 ? (
                                                <div className="absolute w-4 h-4 bg-white rounded-full left-3 top-[-5px] flex items-center justify-center">
                                                  <h1 className="absolute mb-7 text-white text-[10px] font-medium">
                                                    {
                                                      playerStats?.statistics[0]
                                                        .games.minutes
                                                    }
                                                    &apos;
                                                  </h1>
                                                  <FaArrowCircleLeft className=" text-red-500 w-3 h-3" />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 카드 */}
                                              {playerStats?.statistics[0].cards
                                                .red ||
                                              playerStats?.statistics[0].cards
                                                .yellow ? (
                                                <div
                                                  className="absolute w-4 h-4 left-[7px] top-3 rounded-full"
                                                  style={{
                                                    backgroundColor: playerStats
                                                      ?.statistics[0].cards.red
                                                      ? "#EF4444"
                                                      : "#FDE046",
                                                  }}
                                                ></div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 골 */}
                                              {playerStats?.statistics[0].goals
                                                .total ? (
                                                <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                                  <PiSoccerBallLight className="w-3 h-3 dark:text-black" />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 패널티 실축 */}
                                              {playerStats?.statistics[0]
                                                .penalty.missed ? (
                                                <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-[35px] flex items-center justify-center">
                                                  <Image
                                                    src={MissedPenalty}
                                                    alt="penalty missed"
                                                    width={15}
                                                    height={15}
                                                    className="w-3 h-3"
                                                  />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 어시스트 */}
                                              {playerStats?.statistics[0].goals
                                                .assists ? (
                                                <div className="w-4 h-4 left-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                                  <Image
                                                    src={Shoes}
                                                    alt="assist"
                                                    width={15}
                                                    height={15}
                                                    className="w-3 h-3 -rotate-12"
                                                  />
                                                </div>
                                              ) : (
                                                <></>
                                              )}
                                            </>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                          {/* 어웨이팀 */}
                          <div className="flex h-full w-1/2 justify-around px-4 items-center max-lg:flex-col max-lg:w-full max-lg:h-1/2">
                            {/*
                          reudce함수를 사용하여 시작 위치의 합계를 통해 이미 이전에 언급된 인덱스를 제외하여 새로운 시작 위치를 선정
                          시작 인덱스 위치와 선수의 수가 들어있는 line 변수를 더하여 끝날 위치를 알아냄
                          그렇게 구한 startIndex와 endIndex 위치를 사용하여 각 반복마다 필요한 선수를 추출
                          */}
                            {awayteamFormation.map(
                              (line: number, index: number) => {
                                // 골키퍼를 제외한 선발 명단 선수들
                                const players = fixture?.lineups[1].startXI
                                  .slice(1, 12)
                                  .reverse();

                                // 시작 인덱스
                                const startIndex = awayteamFormation
                                  .slice(0, index)
                                  .reduce(
                                    (acc: number, players: string) =>
                                      acc + parseInt(players),
                                    0
                                  );

                                // 엔드 인덱스
                                const endIndex = startIndex + Number(line);

                                // 각 포메이션 라인별 선수들
                                const playersPerLine = players.slice(
                                  startIndex,
                                  endIndex
                                );

                                return (
                                  <div
                                    key={index}
                                    className="flex lg:flex-col-reverse"
                                  >
                                    {playersPerLine.map(
                                      (player: any, playerIndex: number) => {
                                        // 성을 제외한 선수의 이름
                                        const playerName =
                                          player?.player.name.split(" ")[1] ||
                                          player?.player.name;

                                        // 플레이어의 스탯
                                        const playerStats =
                                          fixture?.players[1].players.find(
                                            (v: any) => {
                                              return (
                                                v.player.id ===
                                                player?.player.id
                                              );
                                            }
                                          );

                                        return (
                                          // 한 선수
                                          <div
                                            key={playerIndex}
                                            className="flex-col mx-0 sm:mx-6 md:mx-8 lg:mx-0 lg:my-0 xl:my-6 2xl:my-10 w-[80px] relative"
                                          >
                                            {/* 선수 이미지 */}
                                            <Image
                                              src={`https://media.api-sports.io/football/players/${player?.player.id}.png`}
                                              alt={
                                                player?.player.name ||
                                                "player image"
                                              }
                                              width={45}
                                              height={45}
                                              className="rounded-full m-auto bg-white max-md:w-[40px]"
                                            />
                                            {/* 선수 번호 및 이름 */}
                                            <div className="flex justify-center text-white mt-2">
                                              {playerStats?.statistics[0].games
                                                .captain && (
                                                <div className="w-3 h-3 bg-white rounded-full flex justify-center items-center mr-1">
                                                  <h3 className="text-[8px] font-bold text-black">
                                                    C
                                                  </h3>
                                                </div>
                                              )}
                                              <h3>{player?.player.number}</h3>{" "}
                                              &nbsp;
                                              <h3>{playerName}</h3>
                                            </div>

                                            {/* 선수 스탯 */}
                                            <>
                                              {/* 선수 평점 */}
                                              {playerStats?.statistics[0].games
                                                .rating ? (
                                                <div
                                                  className="absolute w-7 h-[18px] right-[4px] top-[-4px] rounded-full flex items-center justify-center text-white"
                                                  style={{
                                                    backgroundColor:
                                                      parseInt(
                                                        playerStats
                                                          ?.statistics[0].games
                                                          .rating
                                                      ) >= 9
                                                        ? "#4389f9"
                                                        : parseInt(
                                                            playerStats
                                                              ?.statistics[0]
                                                              .games.rating
                                                          ) >= 7
                                                        ? "#22B268"
                                                        : "#EF8022",
                                                  }}
                                                >
                                                  <h3>
                                                    {
                                                      playerStats?.statistics[0]
                                                        .games.rating
                                                    }
                                                  </h3>
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 교체 */}
                                              {playerStats?.statistics[0].games
                                                .minutes < 90 ? (
                                                <div className="absolute w-4 h-4 bg-white rounded-full left-3 top-[-5px] flex items-center justify-center">
                                                  <h1 className="absolute mb-7 text-white text-[10px] font-medium">
                                                    {
                                                      playerStats?.statistics[0]
                                                        .games.minutes
                                                    }
                                                    &apos;
                                                  </h1>
                                                  <FaArrowCircleLeft className=" text-red-500 w-3 h-3" />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 카드 */}
                                              {playerStats?.statistics[0].cards
                                                .red ||
                                              playerStats?.statistics[0].cards
                                                .yellow ? (
                                                <div
                                                  className="absolute w-4 h-4 left-[7px] top-3 rounded-full"
                                                  style={{
                                                    backgroundColor: playerStats
                                                      ?.statistics[0].cards.red
                                                      ? "#EF4444"
                                                      : "#FDE046",
                                                  }}
                                                ></div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 골 */}
                                              {playerStats?.statistics[0].goals
                                                .total ? (
                                                <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                                  <PiSoccerBallLight className="w-3 h-3 dark:text-black" />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 패널티 실축 */}
                                              {playerStats?.statistics[0]
                                                .penalty.missed ? (
                                                <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-[35px] flex items-center justify-center">
                                                  <Image
                                                    src={MissedPenalty}
                                                    alt="penalty missed"
                                                    width={15}
                                                    height={15}
                                                    className="w-3 h-3"
                                                  />
                                                </div>
                                              ) : (
                                                <></>
                                              )}

                                              {/* 어시스트 */}
                                              {playerStats?.statistics[0].goals
                                                .assists ? (
                                                <div className="w-4 h-4 left-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                                  <Image
                                                    src={Shoes}
                                                    alt="assist"
                                                    width={15}
                                                    height={15}
                                                    className="w-3 h-3 -rotate-12"
                                                  />
                                                </div>
                                              ) : (
                                                <></>
                                              )}
                                            </>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {/* 골키퍼 */}
                            <div className="justify-center relative w-[80px]">
                              <Image
                                src={`https://media.api-sports.io/football/players/${fixture?.lineups[1].startXI[0].player.id}.png`}
                                alt={
                                  fixture?.lineups[1].startXI[0].player.name ||
                                  "keeper image"
                                }
                                width={45}
                                height={45}
                                className="rounded-full m-auto bg-white max-md:w-[40px] relative"
                              />
                              <div className="flex text-white mt-2 justify-center">
                                <h3>
                                  {fixture?.lineups[1].startXI[0].player.number}
                                </h3>{" "}
                                &nbsp;
                                <h3>
                                  {
                                    fixture?.lineups[1].startXI[0].player.name.split(
                                      " "
                                    )[1]
                                  }
                                </h3>
                                {/* 골키퍼 스탯 */}
                                <>
                                  {/* 골키퍼 평점 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .games.rating ? (
                                    <div
                                      className="absolute w-7 h-[18px] right-[4px] top-[-4px] rounded-full flex items-center justify-center text-white"
                                      style={{
                                        backgroundColor:
                                          parseInt(
                                            fixture?.players[0].players[0]
                                              .statistics[0].games.rating
                                          ) >= 9
                                            ? "#4389f9"
                                            : parseInt(
                                                fixture?.players[0].players[0]
                                                  .statistics[0].games.rating
                                              ) >= 7
                                            ? "#22B268"
                                            : "#EF8022",
                                      }}
                                    >
                                      <h3>
                                        {
                                          fixture?.players[0].players[0]
                                            .statistics[0].games.rating
                                        }
                                      </h3>
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 골키퍼 교체 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .games.minutes < 90 ? (
                                    <div className="absolute w-4 h-4 bg-white rounded-full left-3 top-[-5px] flex items-center justify-center">
                                      <h1 className="absolute mb-7 text-white text-[10px] font-medium">
                                        {
                                          fixture?.players[0].players[0]
                                            .statistics[0].games.minutes
                                        }
                                        &apos;
                                      </h1>
                                      <FaArrowCircleLeft className=" text-red-500 w-3 h-3" />
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 골키퍼 카드 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .cards.red ||
                                  fixture?.players[0].players[0].statistics[0]
                                    .cards.yellow ? (
                                    <div
                                      className="absolute w-4 h-4 left-[7px] top-3 rounded-full"
                                      style={{
                                        backgroundColor: fixture?.players[0]
                                          .players[0].statistics[0].cards.red
                                          ? "#EF4444"
                                          : "#FDE046",
                                      }}
                                    ></div>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 골키퍼 골 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .goals.total ? (
                                    <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                      <PiSoccerBallLight className="w-3 h-3 dark:text-black" />
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 골키퍼 선방 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .penalty.saved ? (
                                    <div className="w-4 h-4 right-3 absolute bg-white rounded-full bottom-[35px] flex items-center justify-center">
                                      <Image
                                        src={Saved}
                                        alt="penalty saved"
                                        width={15}
                                        height={15}
                                        className="w-3 h-3"
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}

                                  {/* 골키퍼 어시스트 */}
                                  {fixture?.players[1].players[0].statistics[0]
                                    .goals.assists ? (
                                    <div className="w-4 h-4 left-3 absolute bg-white rounded-full bottom-4 flex items-center justify-center">
                                      <Image
                                        src={Shoes}
                                        alt="assist"
                                        width={15}
                                        height={15}
                                        className="w-3 h-3 -rotate-12"
                                      />
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Substitutes / Coach*/}
                {fixture?.lineups.length > 0 && (
                  <div className=" border border-solid border-slate-200 bg-white dark:bg-[#1D1D1D] rounded-b-xl px-7 py-10 dark:border-0 max-xl:px-4">
                    {/* Coach */}
                    {(fixture?.lineups[0]?.coach ||
                      fixture?.lineups[1]?.coach) && (
                      <>
                        <div className="w-full flex justify-center items-center xl:hidden">
                          <h2 className="text-base font-medium mb-6">
                            {f("coach")}
                          </h2>
                        </div>
                        <div className="flex justify-between">
                          {/* home team coach */}
                          <div className="flex items-center w-[200px]">
                            <Image
                              src={
                                fixture?.lineups[0]?.coach.photo ||
                                "/img/undefined.png"
                              }
                              alt={
                                fixture?.lineups[0]?.coach.name || "undefined"
                              }
                              width={38}
                              height={38}
                              className="rounded-full bg-[#f4f4f4] mr-4"
                            />
                            <h2 className="text-sm">
                              {fixture?.lineups[0]?.coach.name || "undefined"}
                            </h2>
                          </div>
                          <div className="hidden xl:flex items-center">
                            <h2 className="text-base font-medium mx-2">
                              {f("coach")}
                            </h2>
                          </div>

                          {/* 원정팀 코치 */}
                          <div className="flex items-center justify-end  w-[200px]">
                            <h2 className="text-sm">
                              {fixture?.lineups[1]?.coach.name || "undefined"}
                            </h2>
                            <Image
                              src={
                                fixture?.lineups[1]?.coach.photo ||
                                "/img/undefined.png"
                              }
                              alt={
                                fixture?.lineups[1]?.coach.name || "undefined"
                              }
                              width={38}
                              height={38}
                              className="rounded-full bg-[#f4f4f4] ml-4"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Substitutes */}
                    {(fixture?.lineups[0]?.substitutes.length > 0 ||
                      fixture?.lineups[1]?.substitutes.length > 0) && (
                      <>
                        {/* Substitutes Title */}
                        <div className="w-full flex justify-center items-center">
                          <h2 className="text-base font-medium mt-10 mb-6">
                            {f("substitutes")}
                          </h2>
                        </div>
                        {/* Substitutes */}
                        <div className="flex w-full gap-14 max-xl:gap-0">
                          {/* Home substitutes*/}
                          <ul className="w-1/2  max-xl:w-full">
                            {homePlayedPlayer.map((v: any, i: number) => {
                              // 성을 제외한 선수의 이름
                              const playerName =
                                v?.player.name.split(" ")[1] || v?.player.name;
                              return (
                                <div key={i}>
                                  <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                    {/* player info */}
                                    <div className="flex items-center max-xl:block ">
                                      <Image
                                        src={
                                          v?.player.photo ||
                                          "./img/undefined.png"
                                        }
                                        alt={v?.player.name || "undefined"}
                                        width={38}
                                        height={38}
                                        className="rounded-full bg-[#f4f4f4] mr-4 max-xl:m-auto"
                                      />
                                      {/* player's rating */}
                                      {v?.statistics[0].games.rating && (
                                        <div
                                          className=" w-7 h-[18px] rounded-full flex items-center justify-center text-white text-xs max-xl:absolute max-xl:top-[-7px] max-xl:right-[36px] "
                                          style={{
                                            backgroundColor:
                                              parseInt(
                                                v?.statistics[0].games.rating
                                              ) >= 9
                                                ? "#4389f9"
                                                : parseInt(
                                                    v?.statistics[0].games
                                                      .rating
                                                  ) >= 7
                                                ? "#22B268"
                                                : "#EF8022",
                                          }}
                                        >
                                          <h3>
                                            {v?.statistics[0].games.rating}
                                          </h3>
                                        </div>
                                      )}
                                      {/* player's backnumber */}
                                      {v?.statistics[0].games.number && (
                                        <div className="w-[50px] h-auto text-sm flex justify-center items-center text-[#9F9F9F] max-xl:hidden">
                                          <h3>
                                            {v?.statistics[0].games.number}
                                          </h3>
                                        </div>
                                      )}

                                      {/* player name and position*/}
                                      <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                        <h3>
                                          <strong className="text-[#9f9f9f] xl:hidden">
                                            {v?.statistics[0].games.number}
                                            &nbsp;&nbsp;
                                          </strong>
                                          {playerName}
                                        </h3>
                                        <h4 className="text-[#9f9f9f]">
                                          {f(v?.statistics[0].games.position)}
                                        </h4>
                                      </div>
                                    </div>

                                    {/* player stats */}
                                    <div className="flex items-center">
                                      {/* goals */}
                                      {v?.statistics[0].goals.total && (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:right-[45px] max-xl:bottom-[46px] max-xl:bg-white max-xl:w-[20px] max-xl:rounded-full">
                                          <PiSoccerBallLight className="w-4 h-4 dark:text-black " />
                                        </div>
                                      )}

                                      {/* assists */}
                                      {v?.statistics[0].goals.assists ? (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:left-[45px] max-xl:bg-white max-xl:bottom-[48px] max-xl:rounded-full max-xl:w-[20px]">
                                          <Image
                                            src={Shoes}
                                            alt="assist"
                                            width={15}
                                            height={15}
                                            className="w-4 h-4 -rotate-12 max-xl:w-3 max-xl:h-3 dark:invert "
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* 패널티 실축혹은 세이브  */}
                                      {v?.statistics[0].penalty.missed ||
                                      v?.statistics[0].penalty.saved ? (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:right-[40px] max-xl:top-[13px]">
                                          {v?.statistics[0].penalty.missed >
                                          0 ? (
                                            <Image
                                              src={MissedPenalty}
                                              alt="penalty missed"
                                              width={15}
                                              height={15}
                                              className="w-4 h-4 dark:invert"
                                            />
                                          ) : v?.statistics[0].penalty.saved >
                                            0 ? (
                                            <Image
                                              src={Saved}
                                              alt="penalty saved"
                                              width={15}
                                              height={15}
                                              className="w-4 h-4 dark:invert"
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* cards */}
                                      {v?.statistics[0].cards.red ||
                                      v?.statistics[0].cards.yellow ? (
                                        <div
                                          className="w-[15px] h-[15px] flex items-center justify-center rounded-full ml-2 max-xl:absolute max-xl:left-[40px] max-xl:top-[10px]"
                                          style={{
                                            backgroundColor: v?.statistics[0]
                                              .cards.red
                                              ? "#EF4444"
                                              : "#FDE046",
                                          }}
                                        ></div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* substitution */}
                                      {v?.statistics[0].games.minutes && (
                                        <div className="w-[45px] h-auto flex justify-between items-center ml-4 max-xl:absolute max-xl:block max-xl:top-[-20px] max-xl:left-[20px]">
                                          <h1 className="text-green-500 text-xs font-medium max-xl:text-xs max-xl:text-center ">
                                            {90 +
                                              fixture?.fixture.status.extra -
                                              v?.statistics[0].games.minutes}
                                            &apos;
                                          </h1>
                                          <FaArrowCircleLeft className=" text-green-500 w-[16px] h-auto rotate-180 max-xl:w-3 max-xl:h-3 max-xl:m-auto" />
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                  {i < homePlayedPlayer.length - 1 && (
                                    <hr className="dark:border-[#333333] max-xl:hidden" />
                                  )}
                                </div>
                              );
                            })}
                          </ul>

                          {/* Away substitutes*/}
                          <ul className="w-1/2  max-xl:w-full">
                            {awayPlayedPlayer.map((v: any, i: number) => {
                              // 성을 제외한 선수의 이름
                              const playerName =
                                v?.player.name.split(" ")[1] || v?.player.name;

                              return (
                                <div key={i}>
                                  <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                    {/* player info */}
                                    <div className="flex items-center max-xl:block ">
                                      {" "}
                                      <Image
                                        src={
                                          v?.player.photo ||
                                          "./img/undefined.png"
                                        }
                                        alt={v?.player.name || "undefined"}
                                        width={38}
                                        height={38}
                                        className="rounded-full bg-[#f4f4f4] mr-4 max-xl:m-auto"
                                      />
                                      {/* player's rating */}
                                      {v?.statistics[0].games.rating && (
                                        <div
                                          className=" w-7 h-[18px] rounded-full flex items-center justify-center text-white text-xs max-xl:absolute max-xl:top-[-7px] max-xl:right-[36px] "
                                          style={{
                                            backgroundColor:
                                              parseInt(
                                                v?.statistics[0].games.rating
                                              ) >= 9
                                                ? "#4389f9"
                                                : parseInt(
                                                    v?.statistics[0].games
                                                      .rating
                                                  ) >= 7
                                                ? "#22B268"
                                                : "#EF8022",
                                          }}
                                        >
                                          <h3>
                                            {v?.statistics[0].games.rating}
                                          </h3>
                                        </div>
                                      )}
                                      {/* player's backnumber */}
                                      {v?.statistics[0].games.number && (
                                        <div className="w-[50px] h-auto text-sm flex justify-center items-center text-[#9F9F9F] max-xl:hidden">
                                          <h3>
                                            {v?.statistics[0].games.number}
                                          </h3>
                                        </div>
                                      )}
                                      {/* player name and position*/}
                                      <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                        <h3>
                                          <strong className="text-[#9f9f9f] xl:hidden">
                                            {v?.statistics[0].games.number}
                                            &nbsp;&nbsp;
                                          </strong>
                                          {playerName}
                                        </h3>
                                        <h4 className="text-[#9f9f9f]">
                                          {f(v?.statistics[0].games.position)}
                                        </h4>
                                      </div>
                                    </div>

                                    {/* player stats */}
                                    <div className="flex items-center">
                                      {/* goals */}
                                      {v?.statistics[0].goals.total && (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:right-[45px] max-xl:bottom-[46px] max-xl:bg-white max-xl:w-[20px] max-xl:rounded-full">
                                          <PiSoccerBallLight className="w-4 h-4 dark:text-black " />
                                        </div>
                                      )}

                                      {/* assists */}
                                      {v?.statistics[0].goals.assists ? (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:left-[45px] max-xl:bg-white max-xl:bottom-[48px] max-xl:rounded-full max-xl:w-[20px]">
                                          <Image
                                            src={Shoes}
                                            alt="assist"
                                            width={15}
                                            height={15}
                                            className="w-4 h-4 -rotate-12 max-xl:w-3 max-xl:h-3 dark:invert "
                                          />
                                        </div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* 패널티 실축혹은 세이브  */}
                                      {v?.statistics[0].penalty.missed ||
                                      v?.statistics[0].penalty.saved ? (
                                        <div className="w-[30px] h-auto flex items-center justify-center max-xl:absolute max-xl:right-[40px] max-xl:top-[13px]">
                                          {v?.statistics[0].penalty.missed >
                                          0 ? (
                                            <Image
                                              src={MissedPenalty}
                                              alt="penalty missed"
                                              width={15}
                                              height={15}
                                              className="w-4 h-4 dark:invert"
                                            />
                                          ) : v?.statistics[0].penalty.saved >
                                            0 ? (
                                            <Image
                                              src={Saved}
                                              alt="penalty saved"
                                              width={15}
                                              height={15}
                                              className="w-4 h-4 dark:invert"
                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* cards */}
                                      {v?.statistics[0].cards.red ||
                                      v?.statistics[0].cards.yellow ? (
                                        <div
                                          className="w-[15px] h-[15px] flex items-center justify-center rounded-full ml-2 max-xl:absolute max-xl:left-[40px] max-xl:top-[10px]"
                                          style={{
                                            backgroundColor: v?.statistics[0]
                                              .cards.red
                                              ? "#EF4444"
                                              : "#FDE046",
                                          }}
                                        ></div>
                                      ) : (
                                        <></>
                                      )}

                                      {/* substitution */}
                                      {v?.statistics[0].games.minutes && (
                                        <div className="w-[45px] h-auto flex justify-between items-center ml-4 max-xl:absolute max-xl:block max-xl:top-[-20px] max-xl:left-[20px]">
                                          <h1 className="text-green-500 text-xs font-medium max-xl:text-xs max-xl:text-center ">
                                            {90 +
                                              fixture?.fixture.status.extra -
                                              v?.statistics[0].games.minutes}
                                            &apos;
                                          </h1>
                                          <FaArrowCircleLeft className=" text-green-500 w-[16px] h-auto rotate-180 max-xl:w-3 max-xl:h-3 max-xl:m-auto" />
                                        </div>
                                      )}
                                    </div>
                                  </li>
                                  {i < awayPlayedPlayer.length - 1 && (
                                    <hr className="dark:border-[#333333] max-xl:hidden" />
                                  )}
                                </div>
                              );
                            })}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Bench */}
                {(fixture?.lineups[0]?.substitutes.length > 0 ||
                  fixture?.lineups[1]?.substitutes.length > 0) && (
                  <div className=" border border-solid border-slate-200 bg-white dark:bg-[#1D1D1D] rounded-xl px-7 py-7 dark:border-0 max-xl:px-4 mt-4">
                    {/* Substitutes Title */}
                    <div className="w-full flex justify-center items-center">
                      <h2 className="text-base font-medium  mb-6">
                        {f("bench")}
                      </h2>
                    </div>
                    {/* Bench */}
                    <div className="flex w-full gap-14 max-xl:gap-0">
                      {/* Home Bench*/}
                      <ul className="w-1/2  max-xl:w-full">
                        {homeBenchPlayer.map((v: any, i: number) => {
                          // 성을 제외한 선수의 이름
                          const playerName =
                            v?.player.name.split(" ")[1] || v?.player.name;
                          return (
                            <div key={i}>
                              <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                {/* player info */}
                                <div className="flex items-center max-xl:block ">
                                  {" "}
                                  <Image
                                    src={
                                      v?.player.photo || "./img/undefined.png"
                                    }
                                    alt={v?.player.name || "undefined"}
                                    width={38}
                                    height={38}
                                    className="rounded-full bg-[#f4f4f4] max-xl:m-auto"
                                  />
                                  {/* player's backnumber */}
                                  {v?.statistics[0].games.number && (
                                    <div className="w-[50px] h-auto text-sm flex justify-center items-center text-[#9F9F9F] max-xl:hidden">
                                      <h3>{v?.statistics[0].games.number}</h3>
                                    </div>
                                  )}
                                  {/* player name and position*/}
                                  <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                    <h3>
                                      <strong className="text-[#9f9f9f] xl:hidden">
                                        {v?.statistics[0].games.number}
                                        &nbsp;&nbsp;
                                      </strong>
                                      {playerName}
                                    </h3>
                                    <h4 className="text-[#9f9f9f]">
                                      {f(v?.statistics[0].games.position)}
                                    </h4>
                                  </div>
                                </div>
                              </li>
                              {i < homeBenchPlayer.length - 1 && (
                                <hr className="dark:border-[#333333] max-xl:hidden" />
                              )}
                            </div>
                          );
                        })}
                      </ul>

                      {/* Away Bench*/}
                      <ul className="w-1/2  max-xl:w-full">
                        {awayBenchPlayer.map((v: any, i: number) => {
                          // 성을 제외한 선수의 이름
                          const playerName =
                            v?.player.name.split(" ")[1] || v?.player.name;
                          return (
                            <div key={i}>
                              <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                {/* player info */}
                                <div className="flex items-center max-xl:block ">
                                  {" "}
                                  <Image
                                    src={
                                      v?.player.photo || "./img/undefined.png"
                                    }
                                    alt={v?.player.name || "undefined"}
                                    width={38}
                                    height={38}
                                    className="rounded-full bg-[#f4f4f4] max-xl:m-auto"
                                  />
                                  {/* player's backnumber */}
                                  {v?.statistics[0].games.number && (
                                    <div className="w-[50px] h-auto text-sm flex justify-center items-center text-[#9F9F9F] max-xl:hidden">
                                      <h3>{v?.statistics[0].games.number}</h3>
                                    </div>
                                  )}
                                  {/* player name and position*/}
                                  <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                    <h3>
                                      <strong className="text-[#9f9f9f] xl:hidden">
                                        {v?.statistics[0].games.number}
                                        &nbsp;&nbsp;
                                      </strong>
                                      {playerName}
                                    </h3>
                                    <h4 className="text-[#9f9f9f]">
                                      {f(v?.statistics[0].games.position)}
                                    </h4>
                                  </div>
                                </div>
                              </li>
                              {i < awayBenchPlayer.length - 1 && (
                                <hr className="dark:border-[#333333] max-xl:hidden" />
                              )}
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Injured or Suspended player */}
                {injurie?.length > 0 && (
                  <div className=" border border-solid border-slate-200 bg-white dark:bg-[#1D1D1D] rounded-xl px-7 py-7 dark:border-0 max-xl:px-4 mt-4">
                    {" "}
                    {/* Substitutes Title */}
                    <div className="w-full flex justify-center items-center">
                      <h2 className="text-base font-medium mb-6">
                        {f("injuredSuspendedPlayers")}
                      </h2>
                    </div>
                    <div className="flex w-full gap-14 max-xl:gap-0">
                      {/* Home injuried or Suspended*/}
                      <ul className="w-1/2  max-xl:w-full">
                        {homeInjurie.map((v: any, i: number) => {
                          // 성을 제외한 선수의 이름
                          const playerName =
                            v?.player.name.split(" ")[1] || v?.player.name;

                          return (
                            <div key={i}>
                              <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                {/* player info */}
                                <div className="flex items-center max-xl:block ">
                                  {" "}
                                  <Image
                                    src={
                                      v?.player.photo || "./img/undefined.png"
                                    }
                                    alt={v?.player.name || "undefined"}
                                    width={38}
                                    height={38}
                                    className="rounded-full bg-[#f4f4f4] max-xl:m-auto"
                                  />
                                  {/* injuried or Suspended* */}
                                  <div className="w-[50px] flex items-center justify-center">
                                    <div className="bg-white w-4 h-4  max-xl:right-[47px] max-xl:bottom-[45px] rounded-full flex items-center justify-center border border-solid border-red-500 max-xl:absolute">
                                      {v?.player.reason === "Suspended" ? (
                                        <div className="absolute w-4 h-4 rounded-full bg-red-500"></div>
                                      ) : (
                                        <ImCross className="text-red-500 w-[10px] h-[10px] rounded-full rotate-45" />
                                      )}
                                    </div>
                                  </div>
                                  {/* player name*/}
                                  <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                    <h3>{playerName}</h3>
                                    <h4 className="text-[#9f9f9f]">
                                      {f(v?.player.reason)}
                                    </h4>
                                  </div>
                                </div>
                              </li>
                              {i < homeInjurie.length - 1 && (
                                <hr className="dark:border-[#333333] max-xl:hidden" />
                              )}
                            </div>
                          );
                        })}
                      </ul>
                      {/* away injuried or Suspended*/}
                      <ul className="w-1/2  max-xl:w-full">
                        {awayInjurie.map((v: any, i: number) => {
                          // 성을 제외한 선수의 이름
                          const playerName =
                            v?.player.name.split(" ")[1] || v?.player.name;

                          return (
                            <div key={i}>
                              <li className="flex items-center justify-between w-full my-6 max-xl:relative max-xl:w-[150px] max-xl:m-auto max-xl:my-10 max-xl:block ">
                                {/* player info */}
                                <div className="flex items-center max-xl:block ">
                                  {" "}
                                  <Image
                                    src={
                                      v?.player.photo || "./img/undefined.png"
                                    }
                                    alt={v?.player.name || "undefined"}
                                    width={38}
                                    height={38}
                                    className="rounded-full bg-[#f4f4f4] max-xl:m-auto"
                                  />
                                  {/* injuried or Suspended* */}
                                  <div className="w-[50px] flex items-center justify-center">
                                    <div className="bg-white w-4 h-4  max-xl:right-[47px] max-xl:bottom-[45px] rounded-full flex items-center justify-center border border-solid border-red-500 max-xl:absolute">
                                      {v?.player.reason === "Suspended" ? (
                                        <div className="absolute w-4 h-4 rounded-full bg-red-500"></div>
                                      ) : (
                                        <ImCross className="text-red-500 w-[10px] h-[10px] rounded-full rotate-45" />
                                      )}
                                    </div>
                                  </div>
                                  {/* player name*/}
                                  <div className="w-[200px] h-auto text-sm flex-col justify-center items-center max-xl:text-center max-xl:w-auto max-xl:mt-3">
                                    <h3>{playerName}</h3>
                                    <h4 className="text-[#9f9f9f]">
                                      {f(v?.player.reason)}
                                    </h4>
                                  </div>
                                </div>
                              </li>
                              {i < awayInjurie.length - 1 && (
                                <hr className="dark:border-[#333333] max-xl:hidden" />
                              )}
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}

                {/* h2h */}
                {h2h?.length > 0 && (
                  <div className=" border border-solid border-slate-200 bg-white dark:bg-[#1D1D1D] rounded-xl px-7 py-7 dark:border-0 max-xl:px-4 mt-4">
                    {/* h2h Title */}
                    <div className="w-full flex justify-center items-center mb-10">
                      <h2 className="text-base font-medium mb-6">
                        {f("secondH2H")}
                      </h2>
                    </div>

                    {/* home team and away team */}
                    <div className="flex justify-between mx-32 max-lg:mx-4">
                      {/* home team and wins */}
                      <div>
                        <div className="flex items-center">
                          <Image
                            src={
                              fixture?.teams.home.logo || "/img/undefined.png"
                            }
                            alt={fixture?.teams.home.logo || "home team logo"}
                            width={100}
                            height={100}
                            className="w-[48px] h-auto mr-4 max-lg:w-[32px] "
                          />
                          <div className="ml-10 max-sm:ml-0">
                            <div
                              className="w-[72px] h-[45px] flex items-center justify-center rounded-3xl max-lg:w-[48px] max-lg:h-[30px]"
                              style={{
                                backgroundColor: `#${
                                  fixture.lineups[0].team.colors.player
                                    .primary === "ffffff"
                                    ? "F1F5F9"
                                    : fixture.lineups[0].team.colors.player
                                        .primary
                                }`,
                              }}
                            >
                              <h3
                                className="text-[21px]  max-lg:text-[14px] max-lg:font-bold"
                                style={{
                                  color: `${
                                    fixture.lineups[0].team.colors.player
                                      .primary === "ffffff"
                                      ? "black"
                                      : "white"
                                  }`,
                                }}
                              >
                                {winnerCounts[fixture?.teams.home.id]}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <h2 className="w-[72px] text-center mt-4 text-[16px]  font-medium max-lg:w-[48px] max-lg:text-[14px]">
                            {f("wins")}
                          </h2>
                        </div>
                      </div>
                      {/* draw */}
                      <div>
                        <div className="w-[72px] h-[45px] flex items-center justify-center border border-solid border-[#e4e6e8] rounded-3xl max-lg:w-[48px] max-lg:h-[30px]">
                          <h3 className="text-[21px] max-lg:text-[14px] max-lg:font-bold">
                            {" "}
                            {winnerCounts["draw"]}
                          </h3>
                        </div>
                        <div className="flex">
                          <h2 className="w-[72px] text-center mt-4 pt-[2px] text-[16px] font-medium max-lg:w-[48px] max-lg:text-[14px]">
                            {f("draws")}
                          </h2>
                        </div>
                      </div>
                      {/* away team and wins */}
                      <div>
                        <div className="flex items-center">
                          <div className="mr-10 max-sm:mr-0">
                            <div
                              className="w-[72px] h-[45px] flex items-center justify-center rounded-3xl max-lg:w-[48px] max-lg:h-[30px]"
                              style={{
                                backgroundColor: `#${
                                  fixture.lineups[1].team.colors.player
                                    .primary === "ffffff"
                                    ? "F1F5F9"
                                    : fixture.lineups[1].team.colors.player
                                        .primary
                                }`,
                              }}
                            >
                              <h3
                                className="text-[21px]  max-lg:text-[14px] max-lg:font-bold"
                                style={{
                                  color: `${
                                    fixture.lineups[1].team.colors.player
                                      .primary === "ffffff"
                                      ? "black"
                                      : "white"
                                  }`,
                                }}
                              >
                                {winnerCounts[fixture?.teams.home.id]}
                              </h3>
                            </div>
                          </div>
                          <Image
                            src={
                              fixture?.teams.away.logo || "/img/undefined.png"
                            }
                            alt={fixture?.teams.away.logo || "away team logo"}
                            width={100}
                            height={100}
                            className="w-[48px] h-auto ml-4 max-lg:w-[32px]"
                          />
                        </div>
                        <div className="flex justify-start">
                          <h2 className="w-[72px] text-center mt-4 text-[16px]  font-medium max-lg:w-[48px] max-lg:text-[14px]">
                            {f("wins")}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* h2h data */}
                    <ul>
                      {h2h.map((v: any, i: number) => {
                        console.log(v);

                        const formatDate = (dateString: string) => {
                          const date = new Date(dateString);
                          console.log(date);

                          const options: Intl.DateTimeFormatOptions = {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          };

                          const localeInfo =
                            locale === "en"
                              ? "en-GB"
                              : locale === "ko"
                              ? "ko-KR"
                              : locale === "da"
                              ? "da-DK"
                              : "";

                          return Intl.DateTimeFormat(
                            localeInfo,
                            options
                          ).format(date);
                        };

                        const formattedDate = formatDate(
                          v?.fixture.date.substring(0, 10)
                        );
                        console.log(formattedDate);

                        return <li key={i}></li>;
                      })}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // 경기가 시작하지 않은 경우
              <div></div>
            )}
          </>
        )}
      </div>

      {/* 같은 라운드 경기 보여주기, pc사이즈가 아닐경우 렌더링 x*/}
      {finxturesByRound10?.length > 0 && (
        <div className="w-[350px] h-full bg-white border-slate-200 border border-solid rounded-xl mt-6 py-5 ml-6 max-xl:hidden dark:bg-custom-dark dark:border-none">
          {/* 리그 이름 및 라운드*/}
          <div
            className="flex items-center justify-between cursor-pointer hover:opacity-60 px-5"
            onClick={() =>
              router.push(
                `/${locale}/leagues/${fixture?.league.id}/${leagueNameURL}/overview`
              )
            }
          >
            <div>
              <h1 className="text-base mb-1 font-medium">
                {fixture?.league.name}
              </h1>
              <h2 className="text-xsm">
                {round} {f("round")}
              </h2>
            </div>
            {/* 리그 이미지 */}
            <div className="border-slate-200 border border-solid rounded-full p-2 dark:border-custom-gray3">
              <Image
                src={fixture?.league.logo}
                alt={fixture?.league.name || "no league name"}
                width={30}
                height={30}
              />
            </div>
          </div>
          <hr className="mt-5 dark:border-custom-gray3" />
          {/* 다른 라운드 경기 */}
          <div>
            {finxturesByRound10?.length > 0 &&
              finxturesByRound10?.map((v: any, i: number) => {
                return (
                  <div key={i}>
                    <div
                      className="flex items-center py-3 px-6 text-xsm justify-between cursor-pointer hover:bg-slate-100"
                      onClick={() => {
                        moveToFormattedMatchURL(
                          v?.teams.home.name,
                          v?.teams.away.name,
                          v.fixture.id
                        );
                      }}
                    >
                      {/* 매치 정보 */}
                      <div className="w-8/12">
                        {/* 홈 */}
                        <div className="flex mt-2 mb-4 items-center justify-between">
                          <div className="flex items-center">
                            <Image
                              src={v?.teams.home.logo}
                              alt={v?.teams.home.name || "home team logo"}
                              width={20}
                              height={20}
                              className="mr-3"
                            />
                            <h1>{v?.teams.home.name}</h1>
                          </div>
                          <div className="ml-3">
                            <h1>{v?.score.fulltime.home}</h1>
                          </div>
                        </div>

                        {/* 원정*/}
                        <div className="flex mt-2items-center justify-between">
                          <div className="flex">
                            <Image
                              src={v?.teams.away.logo}
                              alt={v?.teams.away.name || "away team logo"}
                              width={20}
                              height={20}
                              className="mr-3"
                            />
                            <h1>{v?.teams.away.name}</h1>
                          </div>
                          <div className="ml-3">
                            <h1>{v?.score.fulltime.away}</h1>
                          </div>
                        </div>
                      </div>

                      <div className="w-3/12 flex justify-center">
                        <hr className="h-12 w-[1px] border-0 bg-slate-200 dark:bg-custom-gray3" />
                      </div>

                      {/* 경기 상태 */}
                      <div className="flex justify-center w-1/12 text-gray-400">
                        <h1>{v?.fixture.status.short}</h1>
                      </div>
                    </div>
                    {/* 마지막이 아닐 경우에만 hr 렌더링 */}
                    {i !== finxturesByRound10.length - 1 && (
                      <hr className="dark:border-custom-gray3" />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(FixturesOverView);
