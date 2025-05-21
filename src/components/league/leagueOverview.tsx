"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import Image from "next/image";
import LeagueSwiper from "./swiper/leagueSwiper";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import {
  getLeague,
  getStanding,
  getMatches,
  getTopScoreAssist,
} from "@/lib/features/leagueSlice";

import { useTranslations } from "next-intl";

import nowTimezone from "@/lib/nowTimezone";
import { setSelectedSeason } from "@/lib/features/leagueSlice";

/** 지울 데이터 */
import {
  leagueStands,
  groupStands,
  assist,
  goal,
} from "../../../public/example";
import LeagueHeader from "./header/leagueHeader";

export default function LeagueOverview({
  id,
  league,
  locale,
}: {
  id: number;
  league: string;
  locale: string;
}) {
  const l = useTranslations("league");
  const g = useTranslations("general");

  const pathname = usePathname();

  const dispatch = useAppDispatch();

  const { standing, seasons, match, topScoreAssist }: any = useAppSelector(
    (state) => state.leagueSlice
  );

  console.log(match);

  /** 접속 해당 위치의 전역 상태값 가져오기 */
  const { location }: any = useAppSelector((state) => state.locationSlice);

  /** 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    /** selectedYear가 비어있을 때 **/
    if (selectedYear === 0) {
      // 리그 시즌 데이터 가져온 뒤 상태값에 저장
      dispatch(getLeague({ id })).then(({ payload }) => {
        const season = payload?.seasons;

        if (season && season.length > 0) {
          const lastSeason = season[season?.length - 1].year;
          // selectedYear이 변경됨으로 useEffect가 다시 실행되며 selectYear 값이 0이 아니니 else 부분으로 넘어감
          setSelectedYear(lastSeason);
          dispatch(setSelectedSeason(lastSeason));
          /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
          dispatch(setSelectedSeason(lastSeason));
        } else {
          console.error("season error");
        }
      });
      //   /** selectedYear가 비어있지 않을 때 */
    } else {
      // 선택된 시즌의 스탠딩 정보 가져오기
      dispatch(getStanding({ id: id, year: selectedYear }));
      /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
      dispatch(setSelectedSeason(selectedYear));

      /** 해당 시즌의 경기 데이터 구하기  */
      dispatch(
        getMatches({ leagueID: id, season: selectedYear, timezone: location })
      );
      /** 득점왕 및 어시왕 정보 가져오기 */
      dispatch(getTopScoreAssist({ season: selectedYear, leagueID: id }));
    }
  }, [dispatch, id, selectedYear, location]);

  // location이 없다면 코펜하겐으로 고정
  const locate = location || "Europe/Copenhagen";

  /** 타임존을 베이스로한 오늘 날짜 알아내기 */
  const currentDate = nowTimezone(locate);

  /** 사용할 실제 데이터 */
  const stands = standing;
  const goal = topScoreAssist?.goal;
  const assist = topScoreAssist?.assist;

  /** 지울 데이터(예시 데이터) */
  // const stands = leagueStands;
  // const stands = groupStands;

  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0][0]?.form : null;

  // overview에서는 이 함수가 필요없음. 다른 탭에서 사용하는 디스패칭 함수인데 이걸 파라미터로 헤더에 전달하지않으면 오류가 생겨서 일시적으로 넣어둠
  const OnHandleSeasonChange = (value: boolean) => {
    return;
  };

  return (
    <>
      {/** header */}
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
        onHandleSeasonChange={OnHandleSeasonChange}
      />

      {/** match slide */}
      <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
        <div className="flex justify-between text-base mb-4">
          <h3>{l("matches")}</h3>
          <h3 className="text-green-600 cursor-pointer hover:underline">
            {l("allmatches")}
          </h3>
        </div>
        <LeagueSwiper match={match} today={currentDate} locale={locale} />
      </div>

      {/*standing, top score and assist */}
      <div className="flex justify-between max-xl:block">
        {/* standing */}
        <div className="w-3/5 mt-6 max-xl:w-full">
          <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0 pt-6 max-sm:px-4">
            {/* 데이터가 있을 경우 데이터를 보여주고 없을 경우 데이터가 없다고 알려줌 */}
            {stands ? (
              /** 조별리그 스탠딩 */
              stands.length > 1 ? (
                <>
                  <div className="flex flex-col mx-4 mt-3 font-semibold ">
                    {stands.map((v: any, i: number) => {
                      return (
                        <div key={i} className="mb-7">
                          <h1 className="text-black dark:text-white text-sm font-medium">
                            {v[0].group}
                          </h1>
                          <hr className="border-slate-200 my-5 dark:border-custom-gray3" />
                          <div className="flex justify-between">
                            <div>
                              <h2 className="text-xs">#</h2>
                            </div>
                            <div className="flex mr-8 text-custom-gray  max-md:mr-4">
                              <h2 className="text-xs w-5 px-5">PL</h2>
                              <h2 className="text-xs w-5 px-5 max-md:hidden">
                                W
                              </h2>
                              <h2 className="text-xs w-5 px-5 max-md:hidden">
                                D
                              </h2>
                              <h2 className="text-xs w-5 px-5 max-md:hidden">
                                L
                              </h2>
                              <h2 className="text-xs w-5 px-5">GD</h2>
                              <h2 className="text-xs w-5 px-5">PTS</h2>
                              {
                                /** 데이터에 form 필드가 있다면 보여주고 없다면 보여주지않기
                                 * form데이터 길이에 따라 너비 조절
                                 */
                                form ? (
                                  <>
                                    <h2
                                      className="text-xs w-5 px-5  max-md:hidden"
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
                            {v?.map((v: any, i: any) => {
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
                                >
                                  {v.description &&
                                  v.description.includes(relegation) ===
                                    true ? (
                                    <div className="w-0.5 h-5 bg-red-500 absolute" />
                                  ) : v.description &&
                                    v.description.includes(champions) ===
                                      true ? (
                                    <div className="w-0.5 h-5 bg-custom-green absolute" />
                                  ) : v.description &&
                                    v.description.includes(europa) === true ? (
                                    <div className="w-0.5 h-5 bg-blue-500 absolute" />
                                  ) : v.description &&
                                    v.description.includes(conference) ===
                                      true ? (
                                    <div className="w-0.5 h-5 bg-sky-300 absolute" />
                                  ) : (
                                    <></>
                                  )}
                                  <div className="flex pl-4 dark:text-white font-normal">
                                    <h2 className="text-xs pr-4 font-semibold">
                                      {v?.rank}
                                    </h2>
                                    <Image
                                      src={v?.team?.logo}
                                      alt={v?.team?.name}
                                      width={50}
                                      height={50}
                                      className="w-[15px] h-[15px] object-contain"
                                    />
                                    <h2 className="text-xs pl-3">
                                      {v?.team?.name}
                                    </h2>
                                  </div>
                                  <div className="flex dark:text-white mr-3 font-medium">
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
                                    <h2 className="text-xs w-5 px-5 ">
                                      {v.goalsDiff}
                                    </h2>
                                    <h2 className="text-xs w-5 px-5">
                                      {v.points}
                                    </h2>
                                    {form ? (
                                      <div className="flex items-center ml-4 w-36 max-md:hidden">
                                        {recentResult?.map(
                                          (v: string, i: number) => {
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
                                          }
                                        )}
                                      </div>
                                    ) : (
                                      <div className="mr-3" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /** 일반 리그 스탠딩일 경우 */
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
                              className="w-[15px] h-[15px] object-contain"
                            />
                            <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                          </div>
                          <div className="flex dark:text-white mr-3">
                            <h2 className="text-xs w-5 px-5">{v.all.played}</h2>
                            <h2 className="text-xs w-5 px-5  max-md:hidden">
                              {v.all.win}
                            </h2>
                            <h2 className="text-xs w-5 px-5  max-md:hidden">
                              {v.all.draw}
                            </h2>
                            <h2 className="text-xs w-5 px-5  max-md:hidden">
                              {v.all.lose}
                            </h2>
                            <h2 className="text-xs w-5 px-5">{v.goalsDiff}</h2>
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
              )
            ) : (
              <div className="w-full h-20 px-8 py-10">
                <h1 className="text-base">{g("noresults")}</h1>
              </div>
            )}
          </div>
        </div>
        {/* top score and assist */}
        <div className="w-2/5 mt-6 ml-10 max-xl:w-full max-xl:ml-0">
          <div className="w-full h-auto bg-white rounded-xl px-8 border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0 pt-6 max-sm:px-4">
            <div className="w-full flex justify-end">
              <h3 className="text-green-600 text-base cursor-pointer hover:underline">
                {l("viewall")}
              </h3>
            </div>
            <hr className="border-1 border-solid border-r-slate-200 dark:border-custom-gray3 mt-6 mb-10" />
            {/* top scorers*/}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("topscorers")}</h3>
                <h4 className="text-xsm mr-1 text-custom-gray">{l("goals")}</h4>
              </div>
              {goal && goal.length > 0 ? (
                <div>
                  {goal?.slice(0, 3).map((v: any, i: number) => {
                    return (
                      <div key={i}>
                        <div className="flex py-4 px-8 justify-between items-center cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700">
                          <div className="flex items-center">
                            <Image
                              src={v.player.photo}
                              alt={v.player.name}
                              width={40}
                              height={40}
                              className="rounded-full mr-3"
                            />
                            <div className="flex flex-col justify-between">
                              <h1 className="text-xsm">{v.player.name}</h1>
                              <div className="flex items-center">
                                <Image
                                  src={v.statistics[0].team.logo}
                                  alt={v.statistics[0].team.name}
                                  width={14}
                                  height={14}
                                  className="w-[14px] h-[14px] object-contain"
                                />
                                <h4 className="text-xxs ml-2">
                                  {v.statistics[0].team.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="justify-center flex">
                            {/* 가장 많은 골을 넣었을 경우 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            {i === 0 ? (
                              <div className="bg-green-600 rounded-full p-[3px] flex justify-center items-center">
                                <h1 className="font-normal text-sm w-5 text-center text-white">
                                  {v.statistics[0].goals.total}
                                </h1>
                              </div>
                            ) : (
                              <h1 className="font-normal text-sm w-5">
                                {v.statistics[0].goals.total}
                              </h1>
                            )}
                          </div>
                        </div>
                        {/* 마지막 인덱스가 아니라면 border표시 */}
                        {i !== goal.length - 1 && (
                          <hr className="border-solid border-1 border-slate-200 dark:border-custom-gray3" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1 className="text-base px-8 pt-6 pb-2">{g("noresults")}</h1>
              )}
            </div>
            {/* top assists */}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("topassists")}</h3>
                <h4 className="text-xsm mr-1 text-custom-gray">
                  {l("assists")}
                </h4>
              </div>
              {assist && assist.length > 0 ? (
                <div>
                  {assist?.slice(0, 3).map((v: any, i: number) => {
                    return (
                      <div key={i}>
                        <div
                          key={i}
                          className="flex py-4 px-8 justify-between items-center cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
                        >
                          <div className="flex items-center">
                            <Image
                              src={v.player.photo}
                              alt={v.player.name}
                              width={40}
                              height={40}
                              className="rounded-full mr-3"
                            />
                            <div className="flex flex-col justify-between">
                              <h1 className="text-xsm">{v.player.name}</h1>
                              <div className="flex items-center">
                                <Image
                                  src={v.statistics[0].team.logo}
                                  alt={v.statistics[0].team.name}
                                  width={14}
                                  height={14}
                                  className="w-[14px] h-[14px] object-contain"
                                />
                                <h4 className="text-xxs ml-2">
                                  {v.statistics[0].team.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="justify-center flex">
                            {/* 가장 많은 어시스트 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            {i === 0 ? (
                              <div className="bg-blue-600 rounded-full p-[3px] flex justify-center items-center">
                                <h1 className="font-normal text-sm w-5 text-center text-white">
                                  {v.statistics[0].goals.assists}
                                </h1>
                              </div>
                            ) : (
                              <h1 className="font-normal text-sm w-5">
                                {v.statistics[0].goals.assists}
                              </h1>
                            )}
                          </div>
                        </div>
                        {/* 마지막 인덱스가 아니라면 border표시 */}
                        {i !== goal.length - 1 && (
                          <hr className="border-solid border-1 border-slate-200 dark:border-custom-gray3" />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <h1 className="text-base px-8 pt-6 pb-2">{g("noresults")}</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
