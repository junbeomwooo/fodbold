"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import leagueSlice, {
  getLeague,
  getStanding,
} from "@/lib/features/leagueSlice";
import { useLocale } from "next-intl";

import Image from "next/image";
/** 지울 데이터 */
import { leagueStands, groupStands } from "../../../public/example";
import { useTranslations } from "next-intl";
import LeagueHeader from "./header/leagueHeader";
import locationSlice from "@/lib/features/locationSlice";

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
  const { standing, seasons }: { standing: any; seasons: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  const { location }: any = useAppSelector((state) => state.locationSlice);

  /** 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(0);

  /** useEffect */
  useEffect(() => {}, [dispatch]);

  /** 사용할 실제 데이터 */
  const season = seasons ? seasons.seasons : null;
  const stands = standing ? standing : null;

  /** 지울 데이터 */
  // const stands = leagueStands;

  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0][0]?.form : null;



  /** 의도한대로 통신이 잘 발생하는 지 확인하기  */
  
  useEffect(() => {
    // 스탠드와 시즌이 없는 경우
    if (!standing && !seasons) {
      // 리그 데이터 받아오기
      dispatch(getLeague({ id })).then(({ payload }) => {
        const season = payload?.seasons;

        if (season && season.length > 0) {
          const lastSeason = season[season?.length - 1].year;
          // selectedYear에 저장
          setSelectedYear(lastSeason);

          // 스탠딩 데이터 받아오기
          dispatch(getStanding({ id: id, year: lastSeason }));
        } else {
          console.error("season error");
        }
      });
      // 스탠드와 시즌이 있을 경우
    } else if (standing && seasons){
      // 스탠드와 시즌이 있으면서 초기 상태인 경우 리턴
      if (selectedYear === 0) {
        return;
      } else {
        // 초기 상태가 아닌 경우(즉 selectedYear의변화가 생긴 경우 재통신)
        dispatch(getStanding({ id: id, year: selectedYear }));
      }
    }
  }, [season, dispatch, id, selectedYear, standing, seasons]);

  return (
    <>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
      />
      {/** standings*/}
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
