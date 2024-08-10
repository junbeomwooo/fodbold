import React from "react";
import { getTranslations } from "next-intl/server";

/** 메인페이지 */
import League from "@/components/main/leagues";
import Standing from "@/components/main/standing";
import Fixtures from "@/components/main/fixtures";

export const FOOTBALL_URL = "https://v3.football.api-sports.io";
export const FOOTBALL_IMAGE = "https://media.api-sports.io/football";
export const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

/** 해당 리그 id를 통한 리그 스탠딩 데이터 받아오기 */
const getStanding = async (id: number, year: number) => {
  const response = await fetch(
    `${FOOTBALL_URL}/standings?league=${id}&season=2023`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
      },
    }
  );

  return response.json();
};

/** 모든 리그 정보 받아오기 */
const getAllLeagues = async (year: number) => {
  const response = await fetch(`${FOOTBALL_URL}/leagues?season=${year}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
    },
  });
};

export default async function page() {
  /** 번역본 가져오기 */
  const t = await getTranslations("main");
  /** 현재 년도 가져오기 */
  const year = new Date().getFullYear();

  /** epl 스탠딩 받아오기 */
  // const [standing] = (await getStanding(39,year)).response;
  // const [stands] = standing?.league?.standings;

  /** 전 세계 리그정보 가져오기 */
  // const allLeagues = await getAllLeagues(year);




  /** 지울 데이터 (데이터 통신 대용으로 사용중)*/
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
      all: { played: 38, win: 28, draw: 7, lose: 3, goals: [Object] },
      home: { played: 19, win: 14, draw: 5, lose: 0, goals: [Object] },
      away: { played: 19, win: 14, draw: 2, lose: 3, goals: [Object] },
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
      all: { played: 38, win: 28, draw: 5, lose: 5, goals: [Object] },
      home: { played: 19, win: 15, draw: 2, lose: 2, goals: [Object] },
      away: { played: 19, win: 13, draw: 3, lose: 3, goals: [Object] },
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
      all: { played: 38, win: 24, draw: 10, lose: 4, goals: [Object] },
      home: { played: 19, win: 15, draw: 3, lose: 1, goals: [Object] },
      away: { played: 19, win: 9, draw: 7, lose: 3, goals: [Object] },
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
      all: { played: 38, win: 20, draw: 8, lose: 10, goals: [Object] },
      home: { played: 19, win: 12, draw: 4, lose: 3, goals: [Object] },
      away: { played: 19, win: 8, draw: 4, lose: 7, goals: [Object] },
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
      all: { played: 38, win: 20, draw: 6, lose: 12, goals: [Object] },
      home: { played: 19, win: 13, draw: 0, lose: 6, goals: [Object] },
      away: { played: 19, win: 7, draw: 6, lose: 6, goals: [Object] },
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
      all: { played: 38, win: 18, draw: 9, lose: 11, goals: [Object] },
      home: { played: 19, win: 11, draw: 4, lose: 4, goals: [Object] },
      away: { played: 19, win: 7, draw: 5, lose: 7, goals: [Object] },
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
      all: { played: 38, win: 18, draw: 6, lose: 14, goals: [Object] },
      home: { played: 19, win: 12, draw: 4, lose: 3, goals: [Object] },
      away: { played: 19, win: 6, draw: 2, lose: 11, goals: [Object] },
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
      all: { played: 38, win: 18, draw: 6, lose: 14, goals: [Object] },
      home: { played: 19, win: 10, draw: 3, lose: 6, goals: [Object] },
      away: { played: 19, win: 8, draw: 3, lose: 8, goals: [Object] },
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
      all: { played: 38, win: 14, draw: 10, lose: 14, goals: [Object] },
      home: { played: 19, win: 7, draw: 8, lose: 4, goals: [Object] },
      away: { played: 19, win: 7, draw: 2, lose: 10, goals: [Object] },
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
      all: { played: 38, win: 13, draw: 10, lose: 15, goals: [Object] },
      home: { played: 19, win: 8, draw: 4, lose: 7, goals: [Object] },
      away: { played: 19, win: 5, draw: 6, lose: 8, goals: [Object] },
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
      all: { played: 38, win: 12, draw: 12, lose: 14, goals: [Object] },
      home: { played: 19, win: 8, draw: 6, lose: 5, goals: [Object] },
      away: { played: 19, win: 4, draw: 6, lose: 9, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 12,
      team: {
        id: 35,
        name: "Bournemouth",
        logo: "https://media.api-sports.io/football/teams/35.png",
      },
      points: 48,
      goalsDiff: -13,
      group: "Premier League",
      form: "LLLWW",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 9, lose: 16, goals: [Object] },
      home: { played: 19, win: 7, draw: 6, lose: 6, goals: [Object] },
      away: { played: 19, win: 6, draw: 3, lose: 10, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 13,
      team: {
        id: 36,
        name: "Fulham",
        logo: "https://media.api-sports.io/football/teams/36.png",
      },
      points: 47,
      goalsDiff: -6,
      group: "Premier League",
      form: "WLDDL",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 8, lose: 17, goals: [Object] },
      home: { played: 19, win: 9, draw: 2, lose: 8, goals: [Object] },
      away: { played: 19, win: 4, draw: 6, lose: 9, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 14,
      team: {
        id: 39,
        name: "Wolves",
        logo: "https://media.api-sports.io/football/teams/39.png",
      },
      points: 46,
      goalsDiff: -15,
      group: "Premier League",
      form: "LLLWL",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 7, lose: 18, goals: [Object] },
      home: { played: 19, win: 8, draw: 3, lose: 8, goals: [Object] },
      away: { played: 19, win: 5, draw: 4, lose: 10, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 15,
      team: {
        id: 45,
        name: "Everton",
        logo: "https://media.api-sports.io/football/teams/45.png",
      },
      points: 40,
      goalsDiff: -11,
      group: "Premier League",
      form: "LWDWW",
      status: "same",
      description: null,
      all: { played: 38, win: 13, draw: 9, lose: 16, goals: [Object] },
      home: { played: 19, win: 8, draw: 4, lose: 7, goals: [Object] },
      away: { played: 19, win: 5, draw: 5, lose: 9, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 16,
      team: {
        id: 55,
        name: "Brentford",
        logo: "https://media.api-sports.io/football/teams/55.png",
      },
      points: 39,
      goalsDiff: -9,
      group: "Premier League",
      form: "LWDLW",
      status: "same",
      description: null,
      all: { played: 38, win: 10, draw: 9, lose: 19, goals: [Object] },
      home: { played: 19, win: 5, draw: 7, lose: 7, goals: [Object] },
      away: { played: 19, win: 5, draw: 2, lose: 12, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 17,
      team: {
        id: 65,
        name: "Nottingham Forest",
        logo: "https://media.api-sports.io/football/teams/65.png",
      },
      points: 32,
      goalsDiff: -18,
      group: "Premier League",
      form: "WLWLL",
      status: "same",
      description: null,
      all: { played: 38, win: 9, draw: 9, lose: 20, goals: [Object] },
      home: { played: 19, win: 5, draw: 5, lose: 9, goals: [Object] },
      away: { played: 19, win: 4, draw: 4, lose: 11, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 18,
      team: {
        id: 1359,
        name: "Luton",
        logo: "https://media.api-sports.io/football/teams/1359.png",
      },
      points: 26,
      goalsDiff: -33,
      group: "Premier League",
      form: "LLDLL",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 6, draw: 8, lose: 24, goals: [Object] },
      home: { played: 19, win: 4, draw: 4, lose: 11, goals: [Object] },
      away: { played: 19, win: 2, draw: 4, lose: 13, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 19,
      team: {
        id: 44,
        name: "Burnley",
        logo: "https://media.api-sports.io/football/teams/44.png",
      },
      points: 24,
      goalsDiff: -37,
      group: "Premier League",
      form: "LLLDW",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 5, draw: 9, lose: 24, goals: [Object] },
      home: { played: 19, win: 2, draw: 4, lose: 13, goals: [Object] },
      away: { played: 19, win: 3, draw: 5, lose: 11, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
    {
      rank: 20,
      team: {
        id: 62,
        name: "Sheffield Utd",
        logo: "https://media.api-sports.io/football/teams/62.png",
      },
      points: 16,
      goalsDiff: -69,
      group: "Premier League",
      form: "LLLLL",
      status: "same",
      description: "Relegation - Championship",
      all: { played: 38, win: 3, draw: 7, lose: 28, goals: [Object] },
      home: { played: 19, win: 2, draw: 4, lose: 13, goals: [Object] },
      away: { played: 19, win: 1, draw: 3, lose: 15, goals: [Object] },
      update: "2024-05-28T00:00:00+00:00",
    },
  ];

  return (
    <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block max-msm:px-6">
      <League t={t} />
      <Fixtures />
      <Standing t={t} stands={stands} />
    </div>
  );
}
