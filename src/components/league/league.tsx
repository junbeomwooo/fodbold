"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getList } from "@/lib/features/standingSlice";

export default function League({ id }: { id: number }) {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.standingSlice);

  /** 현재 년도 가져오기 */
  const nowYear = new Date().getFullYear();

  /** 년도 상태값 */
  const [year, setYear] = useState(nowYear);

  useEffect(() => {
    dispatch(getList({ id: id, year: year }));
  }, [dispatch, id, year]);

  console.log(data);

  /** 지울 데이터(예시 데이터) */
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
      form: "WDWDL",
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

  return (
    <>
      <div className="w-full h-32 bg-white rounded-xl">
        <div>
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
            alt="league logo"
            width={50}
            height={50}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
      <div className="w-3/5">
        {/* epl */}
        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0">
          <div className="hover:cursor-pointer hover:opacity-60 w-full h-full flex pt-6 pb-5 px-7 justify-between">
            <div>
              <h1 className="text-base font-medium dark:text-custom-green">
              1
              </h1>
              <h2 className="text-xsm mt-1 text- text-custom-gray">
               1
              </h2>
            </div>
            <div className="border-solid border border-slate-200 rounded-full w-10 h-10 flex justify-center items-center dark:border-custom-gray">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
                alt="Premier League"
                width={25}
                height={25}
                style={{ width: 25, height: 25 }}
              />
            </div>
          </div>
          <hr className="border-solid border-slate-200 w-full dark:border-custom-gray2" />
          <div className="flex justify-between mx-4 mt-3 text-custom-gray font-semibold">
            <div>
              <h2 className="text-xs">#</h2>
            </div>
            <div className="flex">
              <h2 className="text-xs ml-2">PL</h2>
              <h2 className="text-xs ml-2">GD</h2>
              <h2 className="text-xs ml-2">PTS</h2>
            </div>
          </div>
          <div className="mt-3 flex flex-col">
            {stands.map((v: any, i: any) => {
              // 승급
              const champions = "Champions League";
              const europa = "Europa League";
              const conference = "Europa Conference League";
              // 강등
              const relegation = "Relegation";
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
                    <h2 className="text-xs pr-4 font-semibold">{v?.rank}</h2>
                    <Image
                      src={v?.team?.logo}
                      alt={v?.team?.name}
                      width={50}
                      height={50}
                      style={{ width: 15, height: 15 }}
                    />
                    <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                  </div>
                  <div className="flex pr-1 dark:text-white">
                    <h2 className="text-xs w-7">{v.all.played}</h2>
                    <h2 className="text-xs w-7">{v.goalsDiff}</h2>
                    <h2 className="text-xs w-7 ">{v.points}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
