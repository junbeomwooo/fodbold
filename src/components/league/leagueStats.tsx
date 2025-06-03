"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import LeagueHeader from "./header/leagueHeader";

import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  getLeague,
  getTopScoreAssist,
  setSelectedSeason,
  getTopYellowRed,
  setSeasonChanged,
} from "@/lib/features/leagueSlice";

import handleLimitedError from "../../lib/handleLimitedError";
import LimittedError from "../reuse/limittedError";

export default function LeagueStats({
  locale,
  id,
  league,
}: {
  locale: string;
  id: number;
  league: string;
}) {
  const {
    seasons,
    selectedSeason,
    topScoreAssist,
    topYellowRed,
    seasonChange,
  }: any = useAppSelector((state) => state.leagueSlice);

  const l = useTranslations("league");
  const g = useTranslations("general");

  const dispatch = useAppDispatch();

  /** 사용할 실제 데이터 */
  const selected = selectedSeason ? selectedSeason : 0;
  const goal = topScoreAssist?.goal;
  const assist = topScoreAssist?.assist;
  const season = seasons ? seasons.seasons : null;
  const yellow = topYellowRed?.yellow;
  const red = topYellowRed?.red;

  /** 선택 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(selected);

  /** 시즌에 대한 변경값이 있었는지 모니터링하기 위한 상태값 */
  const [selectedYearChanged, setSelectedYearChanged] =
    useState<boolean>(seasonChange);

  // 이전 탭에서 년도 값 변경이 있었는지 모니터링하기위한 상태값;
  const OnHandleSeasonChange = (value: boolean) => {
    dispatch(setSeasonChanged(value));
  };

  // State value for Error components
  const [isError, setIsError] = useState<string | null>(null);
  // Ref value for preventing duplicate error messages
  const hadErrorMsgRef = useRef(false);

  /** 현재 코드 */
  // // 1. 시즌 정보가 없을 때 가져오는 useEffect
  useEffect(() => {
    const fetchSeason = async () => {
      if (!season) {
        try {
          await dispatch(getLeague({ id })).unwrap();
        } catch (error: any) {
          handleLimitedError({
            error: error,
            ref: hadErrorMsgRef,
            setIsError: setIsError,
          });
        }
      }
    };

    fetchSeason();
  }, [dispatch, id, season]);

  // 2. selectedYear가 0이면 최신 시즌을 설정하는 useEffect , 데이터가 없을 경우 데이터 fetch
  useEffect(() => {
    const initSelectedYear = async () => {
      try {
        if (season && selectedYear === 0) {
          const lastSeason = season[season.length - 1].year;
          setSelectedYear(lastSeason);

          if (!topScoreAssist) {
            await dispatch(
              getTopScoreAssist({ season: lastSeason, leagueID: id })
            ).unwrap();
          }
        }
      } catch (error: any) {
        handleLimitedError({
          error: error,
          ref: hadErrorMsgRef,
          setIsError: setIsError,
        });
      }
    };

    initSelectedYear();
  }, [season, selectedYear, dispatch, id, topScoreAssist]);

  // 3. 년도값이 바뀌었거나 topYellowRed가 없을 경우 yellow,red card 데이터 페칭
  useEffect(() => {
    const fetchingYellowRedData = async () => {
      if (!selectedYearChanged && selectedYear && !topYellowRed) {
        try {
          await dispatch(
            getTopYellowRed({ season: selectedYear, leagueID: id })
          ).unwrap();
        } catch (error: any) {
          handleLimitedError({
            error: error,
            ref: hadErrorMsgRef,
            setIsError: setIsError,
          });
        }
      }
    };
    fetchingYellowRedData();
  }, [dispatch, id, selectedYear, topYellowRed, selectedYearChanged]);

  // 4. selectedYear이 변경될 때 모든 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchingAllData = async () => {
      if (selectedYear !== 0 && selectedYearChanged) {
        try {
          // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
          await dispatch(setSelectedSeason(selectedYear));
          await dispatch(
            getTopScoreAssist({ season: selectedYear, leagueID: id })
          ).unwrap();
          await dispatch(
            getTopYellowRed({ season: selectedYear, leagueID: id })
          ).unwrap();
        } catch (error: any) {
          handleLimitedError({
            error: error,
            ref: hadErrorMsgRef,
            setIsError: setIsError,
          });
        }
      }
    };

    fetchingAllData();
  }, [dispatch, id, selectedYear, selectedYearChanged]);

  /** 이전 코드 */
  // // 1. 시즌 정보가 없을 때 가져오는 useEffect
  // useEffect(() => {
  //   if (!season) {
  //     dispatch(getLeague({ id }));
  //   }
  // }, [dispatch, id, season]);

  // // 2. selectedYear가 0이면 최신 시즌을 설정하는 useEffect , 데이터가 없을 경우 데이터 fetch
  // useEffect(() => {
  //   if (season && selectedYear === 0) {
  //     const lastSeason = season[season.length - 1].year;
  //     setSelectedYear(lastSeason);

  //     if (!topScoreAssist) {
  //       dispatch(getTopScoreAssist({ season: lastSeason, leagueID: id }));
  //     }
  //   }
  // }, [season, selectedYear, dispatch, id, topScoreAssist]);

  // useEffect(() => {
  //   if (!selectedYearChanged && selectedYear && !topYellowRed) {
  //     dispatch(getTopYellowRed({ season: selectedYear, leagueID: id }));
  //   }
  // }, [dispatch, id, selectedYear, topYellowRed, selectedYearChanged]);

  // // 3. selectedYear이 변경될 때 순위 데이터를 가져오는 useEffect
  // useEffect(() => {
  //   console.log(selectedYearChanged);
  //   if (selectedYear !== 0 && selectedYearChanged) {
  //     // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
  //     dispatch(setSelectedSeason(selectedYear));
  //     dispatch(getTopScoreAssist({ season: selectedYear, leagueID: id }));
  //     dispatch(getTopYellowRed({ season: selectedYear, leagueID: id }));
  //   }
  // }, [dispatch, id, selectedYear, selectedYearChanged]);

  return (
    <Fragment>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
        setSelectedYearChanged={setSelectedYearChanged}
        onHandleSeasonChange={OnHandleSeasonChange}
      />

      {/* 탑스어 부ㄴ 수정했으니 같은 방식으로 어시스트,레드,옐로우 카드 css 수정
          이후 오버뷰 부분도 수정      
      */}

      {/* top score and assist and yellow and red */}
      <div className="w-full mt-6 max-xl:w-full max-xl:ml-0">
        <div className="w-full h-auto bg-white rounded-xl px-8 border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0 pt-6 max-sm:px-4">
          <hr className="border-1 border-solid border-r-slate-200 dark:border-custom-gray3 mt-6 mb-10" />
          <div className="flex max-xl:block">
            {/* top scorers*/}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3 mr-4 max-xl:mr-0">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("topscorers")}</h3>
                <h4 className="text-xsm mr-1 text-custom-gray">{l("goals")}</h4>
              </div>
              {goal && goal.length > 0 ? (
                <div>
                  {goal?.slice(0, 20).map((v: any, i: number) => {
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
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3 mx-4 max-xl:mx-0">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("topassists")}</h3>
                <h4 className="text-xsm mr-1 text-custom-gray">
                  {l("assists")}
                </h4>
              </div>
              {assist && assist.length > 0 ? (
                <div>
                  {assist?.slice(0, 20).map((v: any, i: number) => {
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

            {/* red cards */}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3 mx-4 max-xl:mx-0">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("redcards")}</h3>
              </div>
              {red && red.length > 0 ? (
                <div>
                  {red?.slice(0, 20).map((v: any, i: number) => {
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
                                />
                                <h4 className="text-xxs ml-2">
                                  {v.statistics[0].team.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="justify-center flex">
                            {/* 가장 많은 레드카드 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            {i === 0 ? (
                              <div className="bg-red-600 rounded-full p-[3px] flex justify-center items-center">
                                <h1 className="font-normal text-sm w-5 text-center text-white">
                                  {v.statistics[0].cards.red}
                                </h1>
                              </div>
                            ) : (
                              <h1 className="font-normal text-sm w-5">
                                {v.statistics[0].cards.red}
                              </h1>
                            )}
                          </div>
                        </div>
                        {/* 마지막 인덱스가 아니라면 border표시 */}
                        {i !== red.length - 1 && (
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

            {/* yellow cards */}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3 ml-4 max-xl:ml-0 ">
              <div className="flex justify-between mb-4 px-8 items-center">
                <h3>{l("yellowcards")}</h3>
              </div>
              {yellow && yellow.length > 0 ? (
                <div>
                  {yellow?.slice(0, 20).map((v: any, i: number) => {
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
                                />
                                <h4 className="text-xxs ml-2">
                                  {v.statistics[0].team.name}
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="justify-center flex">
                            {/* 가장 많은 옐로카드 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            {i === 0 ? (
                              <div className="bg-yellow-600 rounded-full p-[3px] flex justify-center items-center">
                                <h1 className="font-normal text-sm w-5 text-center text-white">
                                  {v.statistics[0].cards.yellow}
                                </h1>
                              </div>
                            ) : (
                              <h1 className="font-normal text-sm w-5">
                                {v.statistics[0].cards.yellow}
                              </h1>
                            )}
                          </div>
                        </div>
                        {/* 마지막 인덱스가 아니라면 border표시 */}
                        {i !== yellow.length - 1 && (
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
      {isError && <LimittedError isError={isError} setIsError={setIsError} />}
    </Fragment>
  );
}
