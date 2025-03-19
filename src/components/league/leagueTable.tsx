"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import leagueSlice, {
  getLeague,
  getStanding,
  setSelectedSeason,
} from "@/lib/features/leagueSlice";
import { useLocale } from "next-intl";

import Image from "next/image";

import { useTranslations } from "next-intl";
import LeagueHeader from "./header/leagueHeader";

export default function LeagueTable({
  id,
  league,
}: {
  id: number;
  league: string;
}) {
  /** 번역 */
  const g = useTranslations("general");
  const locale = useLocale();

  /** 리덕스 */
  const dispatch = useAppDispatch();
  const {
    standing,
    seasons,
    selectedSeason,
  }: { standing: any; seasons: any; selectedSeason: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  /** useEffect */
  useEffect(() => {}, [dispatch]);
  /** 사용할 실제 데이터 */
  const season = seasons ? seasons.seasons : null;
  const stands = standing ? standing : null;
  const selected = selectedSeason ? selectedSeason : 0;

  /** 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(selected);

  /** 시즌에 대한 변경값이 있었는지 모니터링하기 위한 상태값 */
  const [selectedYearChanged, setSelectedYearChanged] = useState(false);

  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0][0]?.form : null;

  // useEffect(() => {
  //   /** 조회하려는 시즌값이 변경되지 않았으며 season과 selectedYear값이 모두 존재하는 경우 ( 즉 이전 페이지에서 전역 상태값을 잘 받아온 경우 ) */
  //   if (!selectedYearChanged && season && selectedYear !== 0 && stands) {
  //     return;
  //   }
  //   /** 이전 페이지로부터 seasons을 받아오지 못한 경우에 실행
  //    * 1.getLeague를 통해 season 정보를 받아온 뒤 가장 최근 리그 데이터를 selectedYear에 저장
  //    * 2.selectYear이 변경됨으로써 useEffect가 다시 실행 됨으로 else 부분으로 넘어감
  //    */
  //   if (!season) {
  //     // 리그 데이터 받아오기
  //     dispatch(getLeague({ id })).then(({ payload }) => {
  //       const season = payload?.seasons;

  //       if (season && season.length > 0) {
  //         const lastSeason = season[season?.length - 1].year;
  //         // selectedYear에 저장
  //         setSelectedYear(lastSeason);
  //         /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
  //         dispatch(setSelectedSeason(selectedYear));
  //       } else {
  //         console.error("season error");
  //       }
  //     });
  //     /** 이전 페이지에서 못받아옴으로써 if문 실행 뒤 넘어왔거나 standing이나 seasons을 이전페이지에서 받아온 경우
  //      * 1. selected가 저장된게 없다면 최근 시즌 정보를 selectedYear 상태값에 저장
  //      * 2. 그후 useEffect가 다시 실행됨으로써 getStanding을 통한 해당 년도 순위 데이터 조회
  //      * 3. 이전에 저장된 stands 상태값을 사용하지않고 최신 년도 데이터로 새로 받아오기 고정
  //      */
  //   } else {
  //     // 스탠드와 시즌이 있으면서 초기 상태인 경우
  //     // 왜 인지는 모르겠지만 selectedYear 관한 조건문을 여기서 안넣으면 새로고침시 league = 0 으로 데이터 통신이 한번더 발생해서 조건문을 추가하였음
  //     if (selectedYear === 0) {
  //       const lastSeason = season[season?.length - 1].year;
  //       setSelectedYear(lastSeason);
  //       /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
  //       dispatch(setSelectedSeason(selectedYear));
  //     } else {
  //       // 초기 상태가 아닌 경우(즉 selectedYear의변화가 생긴 경우 재통신)
  //       dispatch(getStanding({ id: id, year: selectedYear }));
  //     }
  //   }
  //   // 의존성 배열 관련 경고문은 무시해도 좋음
  // }, [dispatch, id, selectedYear, season, selectedYearChanged]);

  /** 이 코드 말고 전에 썼던 코드 사용시 년도 값이 바뀌는지 확인하기. 
   * 만약 년도값이 바뀐다면 해당 기능을 그대로 구현하기 위해 아래 코드를 수정하기
   * 만약 년도값이 바뀌지않는다면 헤더에 년도값 전역상태값으로써 공유하고 수정할수있는 메서드 전달해서 구현할지 고민하기
   */
  
  // 1. 시즌 정보가 없을 때 가져오는 useEffect
  useEffect(() => {
    if (!season) {
      dispatch(getLeague({ id }));
    }
  }, [dispatch, id, season]);

  // 2. selectedYear가 0이면 최신 시즌을 설정하는 useEffect
  useEffect(() => {
    if (season && selectedYear === 0) {
      const lastSeason = season[season.length - 1].year;
      setSelectedYear(lastSeason);
      dispatch(setSelectedSeason(lastSeason));

      if (!standing) {
        dispatch(getStanding({ id, year: lastSeason }));
      }
    }
  }, [season, selectedYear, dispatch, id, standing]);

  // 3. selectedYear이 변경될 때 순위 데이터를 가져오는 useEffect
  useEffect(() => {
    if (selectedYear !== 0 && selectedYearChanged) {
      dispatch(getStanding({ id, year: selectedYear }));
    }
  }, [dispatch, id, selectedYear, selectedYearChanged]);

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
      {/** standings*/}
      <div className="w-full mt-6 max-xl:w-full">
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
                        <h1 className="text-black dark:text-white">
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
                                v.description.includes(relegation) === true ? (
                                  <div className="w-0.5 h-5 bg-red-500 absolute" />
                                ) : v.description &&
                                  v.description.includes(champions) === true ? (
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
                                    style={{ width: 15, height: 15 }}
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
                            style={{ width: 15, height: 15 }}
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
    </>
  );
}
