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

export default function LeagueOverview({ id, league }: { id: number, league: string }) {

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
  //   dispatch(getList({ id: id, year: selectedYear })).then(({payload}) => {
  //     dispatch(setStanding(payload));
  //   });
    
  // }, [dispatch, id, selectedYear]);

  /** 사용할 실제 데이터 */
  // const leagueName = data?.name;
  // const leageCountry = data?.country;
  // const stands = data?.standings[0];

    /** 지울 데이터(예시 데이터) */
  const leagueName = "Premier League";
  const leageCountry = "England";
  const stands = [
    {
      rank: 1,
      team: {
        id: 50,
        name: "Manchester City",
        logo: "https://media.api-sports.io/football/teams/50.png",
      },
      points: 91,
      goalsDiff: 62,
      group: "Premier League",
      form: "WWWWW",
      status: "same",
      description: "Promotion - Champions League (Group Stage: )",
      all: { played: 38, win: 28, draw: 7, lose: 3 },
      home: { played: 19, win: 14, draw: 5, lose: 0 },
      away: { played: 19, win: 14, draw: 2, lose: 3 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 2,
      team: {
        id: 42,
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png",
      },
      points: 89,
      goalsDiff: 62,
      group: "Premier League",
      form: "WWWWW",
      status: "same",
      description: "Promotion - Champions League (Group Stage: )",
      all: { played: 38, win: 28, draw: 5, lose: 5 },
      home: { played: 19, win: 15, draw: 2, lose: 2 },
      away: { played: 19, win: 13, draw: 3, lose: 3 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 3,
      team: {
        id: 40,
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png",
      },
      points: 82,
      goalsDiff: 45,
      group: "Premier League",
      form: "WDW",
      status: "same",
      description: "Promotion - Champions League (Group Stage: )",
      all: { played: 38, win: 24, draw: 10, lose: 4 },
      home: { played: 19, win: 15, draw: 3, lose: 1 },
      away: { played: 19, win: 9, draw: 7, lose: 3 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 4,
      team: {
        id: 66,
        name: "Aston Villa",
        logo: "https://media.api-sports.io/football/teams/66.png",
      },
      points: 68,
      goalsDiff: 15,
      group: "Premier League",
      form: "LDLDW",
      status: "same",
      description: "Promotion - Champions League (Group Stage: )",
      all: { played: 38, win: 20, draw: 8, lose: 10 },
      home: { played: 19, win: 12, draw: 4, lose: 3 },
      away: { played: 19, win: 8, draw: 4, lose: 7 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 5,
      team: {
        id: 47,
        name: "Tottenham",
        logo: "https://media.api-sports.io/football/teams/47.png",
      },
      points: 66,
      goalsDiff: 13,
      group: "Premier League",
      form: "WLWLL",
      status: "same",
      description: "Promotion - Europa League (Group Stage: )",
      all: { played: 38, win: 20, draw: 6, lose: 12 },
      home: { played: 19, win: 13, draw: 0, lose: 6 },
      away: { played: 19, win: 7, draw: 6, lose: 6 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 6,
      team: {
        id: 49,
        name: "Chelsea",
        logo: "https://media.api-sports.io/football/teams/49.png",
      },
      points: 63,
      goalsDiff: 14,
      group: "Premier League",
      form: "WWWWW",
      status: "same",
      description: "Promotion - Europa Conference League (Qualification: )",
      all: { played: 38, win: 18, draw: 9, lose: 11 },
      home: { played: 19, win: 11, draw: 4, lose: 4 },
      away: { played: 19, win: 7, draw: 5, lose: 7 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 7,
      team: {
        id: 34,
        name: "Newcastle",
        logo: "https://media.api-sports.io/football/teams/34.png",
      },
      points: 60,
      goalsDiff: 23,
      group: "Premier League",
      form: "WLDWW",
      status: "same",
      description: null,
      all: { played: 38, win: 18, draw: 6, lose: 14 },
      home: { played: 19, win: 12, draw: 4, lose: 3 },
      away: { played: 19, win: 6, draw: 2, lose: 11 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 8,
      team: {
        id: 33,
        name: "Manchester United",
        logo: "https://media.api-sports.io/football/teams/33.png",
      },
      points: 60,
      goalsDiff: -1,
      group: "Premier League",
      form: "WWLLD",
      status: "same",
      description: "Promotion - Europa League (Group Stage: )",
      all: { played: 38, win: 18, draw: 6, lose: 14 },
      home: { played: 19, win: 10, draw: 3, lose: 6 },
      away: { played: 19, win: 8, draw: 3, lose: 8 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 9,
      team: {
        id: 48,
        name: "West Ham",
        logo: "https://media.api-sports.io/football/teams/48.png",
      },
      points: 52,
      goalsDiff: -14,
      group: "Premier League",
      form: "LWLDL",
      status: "same",
      description: null,
      all: { played: 38, win: 14, draw: 10, lose: 14 },
      home: { played: 19, win: 7, draw: 8, lose: 4 },
      away: { played: 19, win: 7, draw: 2, lose: 10 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 10,
      team: {
        id: 52,
        name: "Crystal Palace",
        logo: "https://media.api-sports.io/football/teams/52.png",
      },
      points: 49,
      goalsDiff: -1,
      group: "Premier League",
      form: "WWWDW",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 10, lose: 15 },
      home: { played: 19, win: 8, draw: 4, lose: 7 },
      away: { played: 19, win: 5, draw: 6, lose: 8 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 11,
      team: {
        id: 51,
        name: "Brighton",
        logo: "https://media.api-sports.io/football/teams/51.png",
      },
      points: 48,
      goalsDiff: -7,
      group: "Premier League",
      form: "LLDWL",
      status: "same",
      description: null,
      all: { played: 38, win: 12, draw: 12, lose: 14 },
      home: { played: 19, win: 8, draw: 6, lose: 5 },
      away: { played: 19, win: 4, draw: 6, lose: 9 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 12,
      team: {
        id: 67,
        name: "Fulham",
        logo: "https://media.api-sports.io/football/teams/67.png",
      },
      points: 48,
      goalsDiff: -9,
      group: "Premier League",
      form: "DLWLW",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 9, lose: 16 },
      home: { played: 19, win: 9, draw: 5, lose: 5 },
      away: { played: 19, win: 4, draw: 4, lose: 11 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 13,
      team: {
        id: 37,
        name: "Wolverhampton",
        logo: "https://media.api-sports.io/football/teams/37.png",
      },
      points: 47,
      goalsDiff: -7,
      group: "Premier League",
      form: "DLWLD",
      status: "same",
      description: null,
      all: { played: 38, win: 12, draw: 11, lose: 15 },
      home: { played: 19, win: 9, draw: 5, lose: 5 },
      away: { played: 19, win: 3, draw: 6, lose: 10 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 14,
      team: {
        id: 68,
        name: "Everton",
        logo: "https://media.api-sports.io/football/teams/68.png",
      },
      points: 46,
      goalsDiff: -13,
      group: "Premier League",
      form: "LWLWL",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 7, lose: 18 },
      home: { played: 19, win: 8, draw: 4, lose: 7 },
      away: { played: 19, win: 5, draw: 3, lose: 11 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 15,
      team: {
        id: 71,
        name: "Nottingham Forest",
        logo: "https://media.api-sports.io/football/teams/71.png",
      },
      points: 45,
      goalsDiff: -13,
      group: "Premier League",
      form: "WDLDL",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 6, lose: 19 },
      home: { played: 19, win: 6, draw: 6, lose: 7 },
      away: { played: 19, win: 7, draw: 0, lose: 12 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 16,
      team: {
        id: 53,
        name: "Bournemouth",
        logo: "https://media.api-sports.io/football/teams/53.png",
      },
      points: 43,
      goalsDiff: -12,
      group: "Premier League",
      form: "WLDLD",
      status: "same",
      description: null,
      all: { played: 38, win: 11, draw: 10, lose: 17 },
      home: { played: 19, win: 5, draw: 6, lose: 8 },
      away: { played: 19, win: 6, draw: 4, lose: 9 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 17,
      team: {
        id: 63,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/63.png",
      },
      points: 42,
      goalsDiff: -18,
      group: "Premier League",
      form: "LDLDW",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 10, draw: 12, lose: 16 },
      home: { played: 19, win: 6, draw: 6, lose: 7 },
      away: { played: 19, win: 4, draw: 6, lose: 10 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 18,
      team: {
        id: 60,
        name: "Sheffield Utd",
        logo: "https://media.api-sports.io/football/teams/60.png",
      },
      points: 36,
      goalsDiff: -31,
      group: "Premier League",
      form: "LLWLL",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 9, draw: 9, lose: 20 },
      home: { played: 19, win: 6, draw: 5, lose: 8 },
      away: { played: 19, win: 3, draw: 4, lose: 12 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 19,
      team: {
        id: 70,
        name: "Burnley",
        logo: "https://media.api-sports.io/football/teams/70.png",
      },
      points: 30,
      goalsDiff: -40,
      group: "Premier League",
      form: "LDLDW",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 7, draw: 9, lose: 22 },
      home: { played: 19, win: 4, draw: 5, lose: 10 },
      away: { played: 19, win: 3, draw: 4, lose: 12 },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 20,
      team: {
        id: 62,
        name: "Luton Town",
        logo: "https://media.api-sports.io/football/teams/62.png",
      },
      points: 28,
      goalsDiff: -50,
      group: "Premier League",
      form: "LLLLL",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 6, draw: 10, lose: 22 },
      home: { played: 19, win: 4, draw: 4, lose: 11 },
      away: { played: 19, win: 2, draw: 6, lose: 12 },
      update: "2024-05-28T00:00:00+00:00",
    },
  ];


  /** 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도 */
  const form = stands ? stands[0]?.form : null;

  /** 2010 년도부터 현재년도까지 년도 배열값구하기  */
  let totalYears = [];

  for (let i = 2010; i <= nowYear; i++) {
    totalYears.push(i);
  }

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
              defaultValue={nowYear}
            >
              {totalYears.map((v, i) => {
                return (
                  <option key={i} value={v}>
                    {`${v}/${v + 1}`}
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
          {stands ? (
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
                {stands?.map((v: any, i: any) => {
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
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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
