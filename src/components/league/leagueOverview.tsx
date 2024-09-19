"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

import Image from "next/image";
import triangle from "../../../public/img/triangle.png";

import Link from "next/link";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getList, setStanding } from "@/lib/features/standingSlice";

import { useTranslations } from "next-intl";

/** 지울 데이터 */
import { leagueStands, groupStands } from "../../../public/example";

export default function LeagueOverview({
  id,
  league,
}: {
  id: number;
  league: string;
}) {
  const c = useTranslations("countries");
  const l = useTranslations("league");

  const pathname = usePathname();

  const locale = useLocale();

  const dispatch = useAppDispatch();

  const { data }: any = useAppSelector((state) => state.standingSlice);

  /** 현재 년도 가져오기 */
  const nowYear = new Date().getFullYear();

  /** 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(nowYear);

  // useEffect(() => {
  //   /** 스탠딩 데이터 가져온 뒤 상태값에 저장 */
  //   dispatch(getList({ id: id, year: selectedYear })).then(({ payload }) => {
  //     dispatch(setStanding(payload));
  //   });
  // }, [dispatch, id, selectedYear]);

  // // /** 사용할 실제 데이터 */
  // const stands = data?.stands;
  // const season = data?.season;
  // const leagueName = season?.league?.name;
  // const leageCountry = season?.country?.name;
  // const totalYears = season?.seasons;

  /** 지울 데이터(예시 데이터) */
  const totalYears = [
    { year: 2000 },
    { year: 2001 },
    { year: 2003 },
    { year: 2004 },
    { year: 2005 },
    { year: 2024 },
  ];
  const leagueName = "Premier League";
  const leageCountry = "England";
  // const stands = leagueStands;
  const stands = groupStands;

  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0][0]?.form : null;
  return (
    <>
      <div className="w-full h-auto bg-white rounded-xl px-8 pt-10  dark:bg-custom-dark dark:border-0">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Image
              src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
              alt="league logo"
              width={35}
              height={35}
              style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col justify-center ml-4">
              <h1 className="text-lg">{leagueName}</h1>
              <h1 className="text-xsm text-custom-gray ">{c(leageCountry)}</h1>
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
              {totalYears?.map((v: any, i: number) => {
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
        <div className="flex pt-10" style={{ fontSize: "15px" }}>
          <div className="flex flex-col">
            <Link
              href={`/${locale}/leagues/${id}/${league}/overview`}
              className="hover:no-underline  hover:text-custom-gray tracking-wide"
            >
              {l("overview")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/overview` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/leagues/${id}/${league}/tables`}
              className="ml-6 hover:no-underline hover:text-custom-gray tracking-wide"
            >
              {l("table")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/tables` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/leagues/${id}/${league}/matches`}
              className="ml-6 hover:no-underline hover:text-custom-gray tracking-wide"
            >
              {l("matches")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/matches` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6 tracking-wide"></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/leagues/${id}/stats`}
              className="ml-6 hover:no-underline hover:text-custom-gray"
            >
              {l("stats")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/stats` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/*standing */}
      <div className="w-3/5 mt-6">
        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0 pt-6">
          {/* 데이터가 있을 경우 데이터를 보여주고 없을 경우 데이터가 없다고 알려줌 */}
          {stands ? (
            /** 조별리그 스탠딩 */
            stands.length > 1 ? (
              <>
                <div className="flex flex-col mx-4 mt-3 text-custom-gray font-semibold ">
                  {stands.map((v: any, i: number) => {
                    return (
                      <div key={i} className="mb-7">
                        <h1 >{v[0].group}</h1>
                        <hr className="border-custom-gray3 my-5"/>
                        <div className="flex justify-between">
                          <div>
                            <h2 className="text-xs">#</h2>
                          </div>
                          <div className="flex mr-8">
                            <h2 className="text-xs w-5 px-5">PL</h2>
                            <h2 className="text-xs w-5 px-5">W</h2>
                            <h2 className="text-xs w-5 px-5">D</h2>
                            <h2 className="text-xs w-5 px-5">L</h2>
                            <h2 className="text-xs w-5 px-5">GD</h2>
                            <h2 className="text-xs w-5 px-5">PTS</h2>
                            {
                              /** 데이터에 form 필드가 있다면 보여주고 없다면 보여주지않기
                               * form데이터 길이에 따라 너비 조절
                               */
                              form ? (
                                <>
                                  <h2
                                    className="text-xs w-5 px-5"
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
                                  <h2 className="text-xs pl-3">
                                    {v?.team?.name}
                                  </h2>
                                </div>
                                <div className="flex dark:text-white mr-3">
                                  <h2 className="text-xs w-5 px-5">
                                    {v.all.played}
                                  </h2>
                                  <h2 className="text-xs w-5 px-5">
                                    {v.all.win}
                                  </h2>
                                  <h2 className="text-xs w-5 px-5">
                                    {v.all.draw}
                                  </h2>
                                  <h2 className="text-xs w-5 px-5">
                                    {v.all.lose}
                                  </h2>
                                  <h2 className="text-xs w-5 px-5">
                                    {v.goalsDiff}
                                  </h2>
                                  <h2 className="text-xs w-5 px-5">
                                    {v.points}
                                  </h2>
                                  {form ? (
                                    <div className="flex items-center ml-4 w-36">
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
                  <div className="flex mr-3">
                    <h2 className="text-xs w-5 px-5">PL</h2>
                    <h2 className="text-xs w-5 px-5">W</h2>
                    <h2 className="text-xs w-5 px-5">D</h2>
                    <h2 className="text-xs w-5 px-5">L</h2>
                    <h2 className="text-xs w-5 px-5">GD</h2>
                    <h2 className="text-xs w-5 px-5">PTS</h2>
                    {
                      /** 데이터에 form 필드가 있다면 보여주고 없다면 보여주지않기
                       * form데이터 길이에 따라 너비 조절
                       */
                      form ? (
                        <>
                          <h2
                            className="text-xs w-5 px-5"
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
                          <h2 className="text-xs w-5 px-5">{v.all.win}</h2>
                          <h2 className="text-xs w-5 px-5">{v.all.draw}</h2>
                          <h2 className="text-xs w-5 px-5">{v.all.lose}</h2>
                          <h2 className="text-xs w-5 px-5">{v.goalsDiff}</h2>
                          <h2 className="text-xs w-5 px-5">{v.points}</h2>
                          {form ? (
                            <div className="flex items-center ml-4 w-36">
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
              <h1 className="text-base">No data available</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
