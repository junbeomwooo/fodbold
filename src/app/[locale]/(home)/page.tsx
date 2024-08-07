import Fotmob from "fotmob";
import nowTimezone from "../../../lib/nowTimezone";
import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import arrow from "../../../../public/img/arrow.png";
import trianlge from "../../../../public/img/triangle.png";

const FOOTBALL_URL = "https://v3.football.api-sports.io";
const FOOTBALL_IMAGE = "https://media.api-sports.io/football";
const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

/** 접속한 ip를 통한 국가 가져오기 (타임존 시간대 적용하기 위해) */
const getLocation = async () => {
  const response = await fetch(
    `${GEOLOCATION_URL}?apiKey=${process.env.GEOLOCATION_API_KEY}`
  );
  return response.json();
};

/** 타임존과 검색하려는 날짜를 이용해 해당 날짜 경기를 타임존에 적용시켜 데이터 받아오기*/
const getMatches = async (
  timezone: string,
  searchDate: string | null | undefined
) => {
  const date = nowTimezone(timezone);

  const response = await fetch(
    `${FOOTBALL_URL}/fixtures?date=${searchDate || date}&timezone=${timezone}`,
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

/** 해당 리그 id를 통한 리그 스탠딩 데이터 받아오기 */
const getStanding = async (id: number) => {
  const year = new Date().getFullYear();

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

export default async function page() {
  /** 번역본 가져오기 */
  const t = await getTranslations("main");

  /** epl 스탠딩 받아오기 */
  // const [standing] = (await getStanding(39)).response;
  // const [stands] = standing?.league?.standings;

  /** 접속한 인터넷의 ip를 통해 국가를 알아내고 타임존 적용시킨 데이터 반환하기 */
  const timezone =
    (await getLocation())?.time_zone?.name || "Europe/Copenhagen";
  const { response } = await getMatches(timezone, null);

  /** 타임존에 적용시킨 현재 날짜 */
  // const date = nowTimezone(timezone);

  /** 데이터 통신대신 미리 데이터 정의한거 (나중에 지움) */
  const date = "Today";

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

  /** 리그별로 데이터 묶기 */
  const groupedByLeague = response.reduce((acc: any, match: any) => {
    // acc : 반환할 총 데이터 값 , match : 한가지 경기
    const leagueName = match.league.name;
    if (!acc[leagueName]) {
      acc[leagueName] = {
        matches: [],
      };
    }
    acc[leagueName]?.matches?.push(match);
    return acc;
  }, []);

  const leagueKeys = Object.keys(groupedByLeague);
  return (
    <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block">
      <div className=" w-1/5 max-lg:hidden max-xl:w-2/5  max-xl:mr-6 ">
        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0">
          <h1 className="text-base font-medium p-3 ml-4 dark:text-custom-green pt-6 mb-2">
            {t("topLeagues")}
          </h1>
          <ul>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/39.png`}
                alt="Premier League"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Premier League</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/140.png`}
                alt="La Liga"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">La Liga</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/78.png`}
                alt="Bundesliga"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Bundesliga</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/135.png`}
                alt="Serie A"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Serie A</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/61.png`}
                alt="Ligue 1"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Ligue 1</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/2.png`}
                alt="Champions League"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">
                Champions League
              </h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/3.png`}
                alt="Europa League"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Europa League</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/1.png`}
                alt="World Cup"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">World Cup</h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/4.png`}
                alt="Euro Championship"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">
                Euro Championship
              </h2>
            </li>
            <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/9.png`}
                alt="Copa America"
                width={16}
                height={16}
                style={{ width: 16, height: 16 }}
              />
              <h2 className="text-xsm ml-5 dark:text-white">Copa America</h2>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-3/5 mx-6 max-xl:mx-0 max-xl:w-full">
        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0 ">
          <div className="h-16 flex justify-between items-center mx-10">
            <div>
              <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400">
                <Image
                  src={arrow}
                  alt="arrow"
                  width={11}
                  height={11}
                  style={{ width: "11px", height: "11px" }}
                  className="rotate-90"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center hover:cursor-pointer">
                <h1 className="text-base font-medium">{date}</h1>
                <Image
                  src={trianlge}
                  alt="change date"
                  width={16}
                  height={16}
                  style={{ width: "16px", height: "16px" }}
                  className="ml-3"
                />
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400">
              <Image
                src={arrow}
                alt="arrow"
                width={11}
                height={11}
                style={{ width: "11px", height: "11px" }}
                className="rotate-270"
              />
            </div>
          </div>
          <hr />
        </div>

        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0 mt-4">
          <div>
            {leagueKeys.map((leagueName: string, leagueIndex: number) => {
              // 변수[키값]을 통해 해당하는 리그의 경기 데이터를 모두 가져옴
              const leagueMatch = groupedByLeague[leagueName].matches;
              console.log(leagueMatch);
              return (
                <ul key={leagueIndex}>
                  <h1>{leagueName}</h1>
                  {leagueMatch.map((match: any, matchIndex: number) => {
                    //시작안함
                    const scheduled = ["TBD", "NS"];

                    // 경기중
                    const live = ["1H", "2H", "ET", "P", "LIVE"];

                    //경기중단
                    const stop = ["HT", "BT", "SUSP", "INT"];

                    //경기 끝
                    const finish = ["FT", "AET", "PEN"];

                    // 경기 취소 및 연기
                    const cancle = ["PST", "CANC", "ABD"];

                    // 부전승
                    const unearned = ["AWD", "WO"];

                    const date = new Date(match.fixture.date);
                    console.log(date)


                    return (
                      <li key={matchIndex} className="flex">
                        {/* 경기가 시작하지 않았다면 */}
                        {scheduled.includes(match.fixture.status.short) ? (
                          <></>
                        ) : // 경기가 진행중이라면
                        live.includes(match.fixture.status.short) ? (
                          <div className="w-10 h-5 rounded-full bg-custom-green flex justify-center items-center">
                            <h1 className="text-white text-xs">
                              {match.fixture.status.elapsed}
                            </h1>
                          </div>
                        ) : // 경기가 잠시 멈췄다면
                        stop.includes(match.fixture.status.short) ? (
                          <div className="w-10 h-5 rounded-full bg-custom-gray flex justify-center items-center">
                            <h1 className="text-white text-xs">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : //경기가 끝났거나 취소 및 연기가 되었다면
                        finish.includes(match.fixture.status.short) ||
                          cancle.includes(match.fixture.status.short) ? (
                          <div className="w-10 h-5 rounded-full bg-custom-gray flex justify-center items-center">
                            <h1 className="text-white text-xs">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : // 부전승이 일어났을경우
                        unearned.includes(match.fixture.status.short) ? (
                          <div className="w-10 h-5 rounded-full bg-custom-gray flex justify-center items-center">
                            <h1 className="text-white text-xs">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : (
                          <></>
                        )}
                        <h1>{match.teams.home.name}</h1>
                        <Image
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          width={15}
                          height={15}
                        />
                        {scheduled.includes(match.fixture.status.short) ? (
                          <></>
                        ):(
                          <></>
                        )}
                        <Image
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          width={15}
                          height={15}
                        />
                        <h1>{match.teams.away.name}</h1>
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-1/5 max-xl:hidden">
        <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0">
          <div className="hover:cursor-pointer hover:opacity-60 w-full h-full flex pt-6 pb-5 px-7 justify-between">
            <div>
              <h1 className="text-base font-medium dark:text-custom-green">
                {t("premier")}
              </h1>
              <h2 className="text-xsm mt-1 text- text-custom-gray">
                {t("england")}
              </h2>
            </div>
            <div className="border-solid border border-slate-200 rounded-full w-10 h-10 flex justify-center items-center dark:border-custom-gray">
              <Image
                src={`${FOOTBALL_IMAGE}/leagues/39.png`}
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
              const champions = "Promotion - Champions League (Group Stage: )";
              const europa = "Promotion - Europa League (Group Stage: )";
              const conference =
                "Promotion - Europa Conference League (Qualification: )";
              // 강등
              const relegation = "Relegation - Championship";
              return (
                <div
                  key={i}
                  className="w-full flex justify-between py-2  hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
                >
                  {v.description &&
                  v.description.includes(relegation) === true ? (
                    <div className="w-0.5 h-5 bg-red-500 absolute" />
                  ) : v.description && v.description === champions ? (
                    <div className="w-0.5 h-5 bg-custom-green absolute" />
                  ) : v.description && v.description === europa ? (
                    <div className="w-0.5 h-5 bg-blue-500 absolute" />
                  ) : v.description && v.description === conference ? (
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
    </div>
  );
}
