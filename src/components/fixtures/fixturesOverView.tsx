"use client";

import {
  getFixtures,
  getH2H,
  getInjuries,
  getFixtruesByRound,
} from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FixtureHeader from "./header/fixtureHeader";
import { useTheme } from "next-themes";

import Image from "next/image";
import { PhoneForwarded } from "lucide-react";
import { PiSoccerBallLight } from "react-icons/pi";
import { CgArrowsExchange } from "react-icons/cg";
import { useTranslations } from "next-intl";
import LightField from "@/../public/img/lightfield.png";
import DarkField from "@/../public/img/darkfield.png";

// import { fixture } from "../../../public/example";

export default function FixturesOverView({
  id,
  locale,
}: {
  id: number;
  locale: string;
}) {
  // 번역
  const f = useTranslations("fixture");

  // 테마
  const { theme } = useTheme();

  console.log(theme);
  /** 리덕스 초기화 */
  const dispatch = useAppDispatch();
  const { fixture, injurie, h2h, fixtureByRound }: any = useAppSelector(
    (state) => state.fixtureSlice
  );

  const router = useRouter();

  // 탭 페이지 상태 값
  const [tabPage, setTabPage] = useState("factsPreview");

  /** 렌더링시  */
  useEffect(() => {
    dispatch(getFixtures({ id: id })).then(({ payload }) => {
      // dispatch(getInjuries({id: id}));
      // dispatch(
      //   getH2H({
      //     homeID: payload?.teams.home.id,
      //     awayID: payload?.teams.away.id,
      //   })
      // );
      // dispatch(
      //   getFixtruesByRound({
      //     leagueID: payload?.league.id,
      //     season: payload?.league.season,
      //     round: payload?.league.round,
      //   })
      // );
    });
  }, [dispatch, id]);

  // home , away match stats
  const homeStats = fixture?.statistics[0]?.statistics;
  const awayStats = fixture?.statistics[1]?.statistics;

  /** 사용할 데이터 */
  const finxturesByRound10 = fixtureByRound?.slice(0, 10);
  const round = fixture?.league.round.split("-")[1];
  const hometeamFormation = fixture?.lineups[0].formation.split("-");
  const awayteamFormation = fixture?.lineups[1].formation.split("-");
  console.log(fixture);

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

            {/* Players */}
            {fixture?.players.length > 0 && (
              <div
                className="flex flex-col cursor-pointer hover:text-gray-400 ml-10 max-md:ml-5"
                onClick={() => setTabPage("players")}
              >
                <h1
                  className={
                    tabPage === "players"
                      ? "text-black font-medium dark:text-white"
                      : "text-gray-700 dark:text-custom-gray"
                  }
                >
                  {f("players")}
                </h1>
                {tabPage === "players" ? (
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
            {fixture?.statistics.length > 0 ? (
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
                            }}
                            className="py-2 mr-1 rounded-l-full text-sm flex items-center text-white bg-red-500"
                          >
                            <h1 className="ml-5">{homeStats[9].value}</h1>
                          </div>
                          <div
                            style={{
                              width: awayStats[9]?.value,
                            }}
                            className="py-2 ml-1  rounded-r-full  text-sm flex items-center text-white justify-end bg-blue-500"
                          >
                            <h1 className="mr-5">{awayStats[9].value}</h1>
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

                    <div className="flex justify-center">
                      <h1 className="text-xsm font-medium mt-3 dark:text-custom-gray">
                        {fixture?.fixture.status.extra}
                        {f("minutesAdded")}
                      </h1>
                    </div>

                    <div className="flex items-center mt-10">
                      <hr className="border-1 border-solid border-slate-200 w-full dark:border-custom-gray3" />
                      <h1 className="text-base font-semibold px-8">FT</h1>
                      <hr className="border-1 border-solid border-slate-200 w-full dark:border-custom-gray3" />
                    </div>
                  </div>
                )}

                {/* Lineups */}
                {fixture?.lineups.length > 0 && (
                  <div className="w-full bg-[#0B9F67] mt-4 rounded-xl border border-solid border-slate-200">
                    {/* lineup header */}
                    <div className="flex justify-between p-5">
                      {/* home team */}
                      <div className="flex items-center text-base text-white">
                        <Image
                          src={fixture?.teams.home.logo}
                          alt={fixture?.teams.home.name || "home team logo"}
                          width={35}
                          height={35}
                          className="rounded-full mr-2"
                        />
                        <h2 className="mr-6">{fixture?.teams.home.name}</h2>
                        <h2 className="font-medium">
                          {fixture?.lineups[0].formation}
                        </h2>
                      </div>
                      {/* away team */}
                      <div className="flex items-center text-base text-white">
                        <h2 className="font-medium">
                          {fixture?.lineups[1].formation}
                        </h2>
                        <h2 className="ml-6">{fixture?.teams.away.name}</h2>{" "}
                        <Image
                          src={fixture?.teams.away.logo}
                          alt={fixture?.teams.away.name || "away team logo"}
                          width={35}
                          height={35}
                          className="rounded-full ml-2"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      {/* background */}
                      {theme === "light" ? (
                        <Image src={LightField} alt="football lineups" />
                      ) : (
                        <Image src={DarkField} alt="football lineups" />
                      )}

                      <div className="absolute top-0 left-0 text-sm h-full w-full">
                        {/* 홈팀 */}
                        <div className="flex h-full w-1/2 justify-between px-10 items-center">
                          {/* 골키퍼 */}
                          <div className="flex">
                            <h3>
                              {fixture?.lineups[0].startXI[0].player.number}
                            </h3>{" "}
                            &nbsp;
                            <h3>
                              {fixture?.lineups[0].startXI[0].player.name}
                            </h3>
                          </div>
                          {/*
                          reudce함수를 사용하여 시작 위치의 합계를 통해 이미 이전에 언급된 인덱스를 제외하여 새로운 시작 위치를 선정
                          시작 인덱스 위치와 선수의 수가 들어있는 line 변수를 더하여 끝날 위치를 알아냄
                          그렇게 구한 startIndex와 endIndex 위치를 사용하여 각 반복마다 필요한 선수를 추출
                          */}
                          {hometeamFormation.map(
                            (line: number, index: number) => {
                              // 골키퍼를 제외한 선발 명단 선수들
                              const players = fixture?.lineups[0].startXI.slice(
                                1,
                                12
                              );

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
                                <div key={index}>
                                  {playersPerLine.map(
                                    (player: any, playerIndex: number) => {
                                      const foundPlayer =
                                        fixture?.players[0].players.find(
                                          (v: any) =>
                                            v.player.id === player?.player.id
                                        );

                                        /** foundIndex또는 find를 이용하여 해당선수의 이미지 경로를 찾기 */
                                        console.log(foundPlayer);

                                      return (
                                        <div key={playerIndex}>
                                          {/* <Image
                                            src={
                                              fixture?.players[0].players[
                                                playerPictureIndex
                                              ].player.photo
                                            }
                                            alt={player?.player.name}
                                            width={50}
                                            height={50}
                                            className="rounded-full m-auto"
                                          /> */}
                                          <div className="flex">
                                          <h3>{player?.player.number}</h3>{" "}
                                          &nbsp;
                                          <h3>{player?.player.name}</h3>
                                          </div>
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
                        <div></div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // 경기가 시작하지 않은 경우
              <div>
                <h1>No</h1>
              </div>
            )}
          </>
        )}
      </div>

      {/* 같은 라운드 경기 보여주기, pc사이즈가 아닐경우 렌더링 x*/}
      {finxturesByRound10?.length > 0 && (
        <div className="w-[350px] h-full bg-white border-slate-200 border border-solid rounded-xl mt-6 py-5 ml-6 max-lg:hidden dark:bg-custom-dark dark:border-none">
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
                  <>
                    <div
                      key={i}
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
                              alt={v?.teams.home.name}
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
                              alt={v?.teams.away.name}
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
                  </>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
