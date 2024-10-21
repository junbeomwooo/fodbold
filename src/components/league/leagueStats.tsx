"use client";

import React, { useState, useEffect } from "react";
import LeagueHeader from "./header/leagueHeader";

import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { getLeague, getTopScoreAssist, setSelectedSeason, getTopYellowRed } from "@/lib/features/leagueSlice";

export default function LeagueStats({
  locale,
  id,
  league,
}: {
  locale: string;
  id: number;
  league: string;
}) {
  const { seasons, selectedSeason, topScoreAssist, topYellowRed }: any = useAppSelector(
    (state) => state.leagueSlice
  );

  const l = useTranslations("league");
  const g = useTranslations("general");

  const dispatch = useAppDispatch();

  /** 사용할 실제 데이터 */
  const selected = selectedSeason ? selectedSeason : 0;
  const goal = topScoreAssist?.goal;
  const assist = topScoreAssist?.assist;
  const season = seasons ? seasons.seasons : null;

  console.log(assist);
  console.log(goal);
  /** 선택 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(selected);

  /** 시즌에 대한 변경값이 있었는지 모니터링하기 위한 상태값 */
  const [selectedYearChanged, setSelectedYearChanged] = useState(false);

  useEffect(() => {
    /** 조회하려는 시즌값이 변경되지 않았으며 season과 selectedYear값이 모두 존재하는 경우 ( 즉 이전 페이지에서 전역 상태값을 잘 받아온 경우 ) */
    if (!selectedYearChanged && season && selectedYear !== 0 && topScoreAssist) {

      // topYellowRed는 모든 데이터를 fetch하는 overview페이지에서 페칭하지 않기떄문에 다른 데이터들이 존재할 경우 getTopYellowRed만 fetch
      dispatch(getTopYellowRed({ season: selectedYear, leagueID: id}));
      return;
    }
    /** 이전 페이지로부터 seasons을 받아오지 못한 경우에 실행
     * 1.getLeague를 통해 season 정보를 받아온 뒤 가장 최근 리그 데이터를 selectedYear에 저장
     * 2.selectYear이 변경됨으로써 useEffect가 다시 실행 됨으로 else 부분으로 넘어감
     */
    if (!season) {
      // 리그 데이터 받아오기
      dispatch(getLeague({ id })).then(({ payload }) => {
        const season = payload?.seasons;

        if (season && season.length > 0) {
          const lastSeason = season[season?.length - 1].year;
          // selectedYear에 저장
          setSelectedYear(lastSeason);
          /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
          dispatch(setSelectedSeason(selectedYear));
        } else {
          console.error("season error");
        }
      });
      /** 이전 페이지에서 못받아옴으로써 if문 실행 뒤 넘어왔거나 standing이나 seasons을 이전페이지에서 받아온 경우
       * 1. selected가 저장된게 없다면 최근 시즌 정보를 selectedYear 상태값에 저장
       * 2. 그후 useEffect가 다시 실행됨으로써 getStanding을 통한 해당 년도 순위 데이터 조회
       * 3. 이전에 저장된 stands 상태값을 사용하지않고 최신 년도 데이터로 새로 받아오기 고정
       */
    } else {
      // 스탠드와 시즌이 있으면서 초기 상태인 경우
      // 왜 인지는 모르겠지만 selectedYear 관한 조건문을 여기서 안넣으면 새로고침시 league = 0 으로 데이터 통신이 한번더 발생해서 조건문을 추가하였음
      if (selectedYear === 0) {
        const lastSeason = season[season?.length - 1].year;
        setSelectedYear(lastSeason);
        /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
        dispatch(setSelectedSeason(selectedYear));
      } else {
        // 초기 상태가 아닌 경우(즉 selectedYear의변화가 생긴 경우 재통신)
        dispatch(getTopScoreAssist({ season: selectedYear, leagueID: id }));
        dispatch(getTopYellowRed({ season: selectedYear, leagueID: id}));
      }
    }
    // 의존성 배열 관련 경고문은 무시해도 좋음
  }, [dispatch, id, selectedYear, season, selectedYearChanged]);


  /** topYellowRed 데이터를 잘받아오는지 확인 후 불필요한 데이터 통신이 다수로 발생하는지 확인도 하고난 뒤 나머지 페이지 코드 구성시키기 */
  console.group("page console");
  console.log(topYellowRed);
  console.groupEnd();

  return (
    <>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
        setSelectedYearChanged={setSelectedYearChanged}
      />

      {/* top score and assist */}
      <div className="w-full mt-6 max-xl:w-full max-xl:ml-0">
        <div className="w-full h-auto bg-white rounded-xl px-8 border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0 pt-6 max-sm:px-4">
          <div className="w-full flex justify-end">
            <h3 className="text-green-600 text-base cursor-pointer hover:underline">
              {l("viewall")}
            </h3>
          </div>
          <hr className="border-1 border-solid border-r-slate-200 dark:border-custom-gray3 mt-6 mb-10" />
          <div className="flex">
            {/* top scorers*/}
            <div className="w-full border border-solid border-slate-200 py-4 rounded-xl mt-6 text-base dark:border-custom-gray3">
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
                          <div>
                            {/* 가장 많은 골을 넣었을 경우 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            <h1
                              className={`font-normal text-sm w-5 ${
                                i === 0 &&
                                "bg-green-600 text-white rounded-full text-center mr-2"
                              }`}
                            >
                              {v.statistics[0].goals.total}
                            </h1>
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
                          <div>
                            {/* 가장 많은 골을 넣었을 경우 (인덱스가 0일 경우) 테두리 효과 추가 */}
                            <h1
                              className={`font-normal text-sm w-5 ${
                                i === 0 &&
                                "bg-green-600 text-white rounded-full text-center mr-2"
                              }`}
                            >
                              {v.statistics[0].goals.assists}
                            </h1>
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
