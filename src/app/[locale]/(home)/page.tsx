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
  // const timezone =
  //   (await getLocation())?.time_zone?.name || "Europe/Copenhagen";
  // const { response } = await getMatches(timezone, null);

  /** 타임존에 적용시킨 현재 날짜 */
  // const date = nowTimezone(timezone);

  // /** 축구경기 리그별로 데이터 묶기 */
  // const groupedByLeague = response.reduce((acc: any, match: any) => {
  //   // acc : 반환할 총 데이터 값 , match : 한가지 경기
  //   const leagueName = match.league.name;
  //   if (!acc[leagueName]) {
  //     acc[leagueName] = {
  //       matches: [],
  //     };
  //   }
  //   acc[leagueName]?.matches?.push(match);
  //   return acc;
  // }, []);

  // const leagueKeys = Object.keys(groupedByLeague);


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

 const groupedByLeague = {
  'Serie C': {
    matches: [
      {
        fixture: {
          id: 1183564,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 282,
            name: 'Estádio Olímpico Colosso da Lagoa',
            city: 'Erechim, Rio Grande do Sul'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 75,
          name: 'Serie C',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/75.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Regular Season - 5'
        },
        teams: {
          home: {
            id: 1221,
            name: 'Ypiranga-RS',
            logo: 'https://media.api-sports.io/football/teams/1221.png',
            winner: true
          },
          away: {
            id: 7770,
            name: 'Caxias',
            logo: 'https://media.api-sports.io/football/teams/7770.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Mineiro U20': {
    matches: [
      {
        fixture: {
          id: 1200111,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 20710,
            name: 'Complexo Esportivo da UIT',
            city: 'Itaúna, Minas Gerais'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1107,
          name: 'Mineiro U20',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/1107.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: '1st Phase - 10'
        },
        teams: {
          home: {
            id: 20758,
            name: 'Inter de Minas U20',
            logo: 'https://media.api-sports.io/football/teams/20758.png',
            winner: true
          },
          away: {
            id: 23651,
            name: 'Tres Coracoes U20',
            logo: 'https://media.api-sports.io/football/teams/23651.png',
            winner: false
          }
        },
        goals: { home: 4, away: 1 },
        score: {
          halftime: { home: 2, away: 0 },
          fulltime: { home: 4, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Concacaf Central American Cup': {
    matches: [
      {
        fixture: {
          id: 1207960,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 3498,
            name: 'Estadio Cacique Diriangén',
            city: 'Diriamba'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1028,
          name: 'Concacaf Central American Cup',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/1028.png',
          flag: null,
          season: 2024,
          round: 'Group Stage - 2'
        },
        teams: {
          home: {
            id: 4641,
            name: 'Diriangén',
            logo: 'https://media.api-sports.io/football/teams/4641.png',
            winner: false
          },
          away: {
            id: 815,
            name: 'CS Herediano',
            logo: 'https://media.api-sports.io/football/teams/815.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1207958,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: null,
            name: 'Estadio Nacional Jorge Mágico González',
            city: 'San Salvador'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1028,
          name: 'Concacaf Central American Cup',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/1028.png',
          flag: null,
          season: 2024,
          round: 'Group Stage - 2'
        },
        teams: {
          home: {
            id: 4303,
            name: 'Firpo',
            logo: 'https://media.api-sports.io/football/teams/4303.png',
            winner: false
          },
          away: {
            id: 822,
            name: 'LD Alajuelense',
            logo: 'https://media.api-sports.io/football/teams/822.png',
            winner: true
          }
        },
        goals: { home: 3, away: 4 },
        score: {
          halftime: { home: 2, away: 3 },
          fulltime: { home: 3, away: 4 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1207962,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:00:00+02:00',
          timestamp: 1723082400,
          periods: { first: 1723082400, second: 1723086000 },
          venue: {
            id: 2441,
            name: 'Estadio Cementos Progreso',
            city: 'Ciudad de Guatemala'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1028,
          name: 'Concacaf Central American Cup',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/1028.png',
          flag: null,
          season: 2024,
          round: 'Group Stage - 2'
        },
        teams: {
          home: {
            id: 3658,
            name: 'Comunicaciones',
            logo: 'https://media.api-sports.io/football/teams/3658.png',
            winner: true
          },
          away: {
            id: 4299,
            name: 'Alianza',
            logo: 'https://media.api-sports.io/football/teams/4299.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Copa Espírito Santo': {
    matches: [
      {
        fixture: {
          id: 1214109,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 20691,
            name: 'Estádio Kleber José de Andrade',
            city: 'Cariacica, Espírito Santo'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1097,
          name: 'Copa Espírito Santo',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/1097.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: '2nd Phase - 6'
        },
        teams: {
          home: {
            id: 10690,
            name: 'Rio Branco ES',
            logo: 'https://media.api-sports.io/football/teams/10690.png',
            winner: false
          },
          away: {
            id: 7837,
            name: 'Vitória ES',
            logo: 'https://media.api-sports.io/football/teams/7837.png',
            winner: true
          }
        },
        goals: { home: 1, away: 2 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Primera División': {
    matches: [
      {
        fixture: {
          id: 1214198,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 2488,
            name: 'Estadio Ramón Aguilera Costas',
            city: 'Santa Cruz de la Sierra'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 344,
          name: 'Primera División',
          country: 'Bolivia',
          logo: 'https://media.api-sports.io/football/leagues/344.png',
          flag: 'https://media.api-sports.io/flags/bo.svg',
          season: 2024,
          round: 'Clausura - 10'
        },
        teams: {
          home: {
            id: 3707,
            name: 'Oriente Petrolero',
            logo: 'https://media.api-sports.io/football/teams/3707.png',
            winner: null
          },
          away: {
            id: 3709,
            name: 'Royal Pari',
            logo: 'https://media.api-sports.io/football/teams/3709.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1234071,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:45:00+02:00',
          timestamp: 1723074300,
          periods: { first: 1723074300, second: 1723077900 },
          venue: {
            id: 1664,
            name: 'Estadio Rafael Agustín Tovar',
            city: 'Barinas'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 299,
          name: 'Primera División',
          country: 'Venezuela',
          logo: 'https://media.api-sports.io/football/leagues/299.png',
          flag: 'https://media.api-sports.io/flags/ve.svg',
          season: 2024,
          round: 'Clausura - 3'
        },
        teams: {
          home: {
            id: 2814,
            name: 'Portuguesa FC',
            logo: 'https://media.api-sports.io/football/teams/2814.png',
            winner: false
          },
          away: {
            id: 2808,
            name: 'Caracas FC',
            logo: 'https://media.api-sports.io/football/teams/2808.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1214199,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: { id: 11130, name: 'Estadio IV Centenario', city: 'Tarija' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 344,
          name: 'Primera División',
          country: 'Bolivia',
          logo: 'https://media.api-sports.io/football/leagues/344.png',
          flag: 'https://media.api-sports.io/flags/bo.svg',
          season: 2024,
          round: 'Clausura - 10'
        },
        teams: {
          home: {
            id: 15708,
            name: 'Real Tomayapo',
            logo: 'https://media.api-sports.io/football/teams/15708.png',
            winner: true
          },
          away: {
            id: 15702,
            name: 'Independiente Petrolero',
            logo: 'https://media.api-sports.io/football/teams/15702.png',
            winner: false
          }
        },
        goals: { home: 3, away: 2 },
        score: {
          halftime: { home: 2, away: 0 },
          fulltime: { home: 3, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1214200,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T21:00:00+02:00',
          timestamp: 1723143600,
          periods: { first: null, second: null },
          venue: {
            id: 2488,
            name: 'Estadio Ramón Aguilera Costas',
            city: 'Santa Cruz de la Sierra'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 344,
          name: 'Primera División',
          country: 'Bolivia',
          logo: 'https://media.api-sports.io/football/leagues/344.png',
          flag: 'https://media.api-sports.io/flags/bo.svg',
          season: 2024,
          round: 'Clausura - 10'
        },
        teams: {
          home: {
            id: 12259,
            name: 'Santa Cruz',
            logo: 'https://media.api-sports.io/football/teams/12259.png',
            winner: null
          },
          away: {
            id: 3711,
            name: 'The Strongest',
            logo: 'https://media.api-sports.io/football/teams/3711.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1234068,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:00:00+02:00',
          timestamp: 1723150800,
          periods: { first: null, second: null },
          venue: {
            id: 1653,
            name: 'Estadio Olímpico de la UCV',
            city: 'Caracas'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 299,
          name: 'Primera División',
          country: 'Venezuela',
          logo: 'https://media.api-sports.io/football/leagues/299.png',
          flag: 'https://media.api-sports.io/flags/ve.svg',
          season: 2024,
          round: 'Clausura - 3'
        },
        teams: {
          home: {
            id: 2813,
            name: 'Real Esppor Club',
            logo: 'https://media.api-sports.io/football/teams/2813.png',
            winner: null
          },
          away: {
            id: 2838,
            name: 'Angostura FC',
            logo: 'https://media.api-sports.io/football/teams/2838.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Copa Do Brasil': {
    matches: [
      {
        fixture: {
          id: 1251951,
          referee: 'Wilton Pereira Sampaio, Brazil',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 220,
            name: 'Estádio Nabi Abi Chedid',
            city: 'Bragança Paulista, São Paulo'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 794,
            name: 'RB Bragantino',
            logo: 'https://media.api-sports.io/football/teams/794.png',
            winner: false
          },
          away: {
            id: 134,
            name: 'Atletico Paranaense',
            logo: 'https://media.api-sports.io/football/teams/134.png',
            winner: true
          }
        },
        goals: { home: 2, away: 3 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: 2, away: 3 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1251955,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: null,
            name: 'Arena MRV',
            city: 'Belo Horizonte, Minas Gerais'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 1062,
            name: 'Atletico-MG',
            logo: 'https://media.api-sports.io/football/teams/1062.png',
            winner: true
          },
          away: {
            id: 146,
            name: 'CRB',
            logo: 'https://media.api-sports.io/football/teams/146.png',
            winner: false
          }
        },
        goals: { home: 3, away: 0 },
        score: {
          halftime: { home: 2, away: 0 },
          fulltime: { home: 3, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1251957,
          referee: 'Rafael Rodrigo Klein, Brazil',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: 1723068000, second: 1723071600 },
          venue: {
            id: 216,
            name: 'Arena Fonte Nova',
            city: 'Salvador, Bahia'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 118,
            name: 'Bahia',
            logo: 'https://media.api-sports.io/football/teams/118.png',
            winner: true
          },
          away: {
            id: 120,
            name: 'Botafogo',
            logo: 'https://media.api-sports.io/football/teams/120.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1251947,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:00:00+02:00',
          timestamp: 1723071600,
          periods: { first: 1723071600, second: 1723075200 },
          venue: {
            id: 258,
            name: 'Allianz Parque',
            city: 'São Paulo, São Paulo'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 121,
            name: 'Palmeiras',
            logo: 'https://media.api-sports.io/football/teams/121.png',
            winner: true
          },
          away: {
            id: 127,
            name: 'Flamengo',
            logo: 'https://media.api-sports.io/football/teams/127.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1251959,
          referee: 'Bruno Arleu de Araujo, Brazil',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:30:00+02:00',
          timestamp: 1723077000,
          periods: { first: 1723077000, second: 1723080600 },
          venue: {
            id: 230,
            name: 'Estádio Major Antônio Couto Pereira',
            city: 'Curitiba, Paraná'
          },
          status: { long: 'Match Finished', short: 'PEN', elapsed: 120 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 130,
            name: 'Gremio',
            logo: 'https://media.api-sports.io/football/teams/130.png',
            winner: false
          },
          away: {
            id: 131,
            name: 'Corinthians',
            logo: 'https://media.api-sports.io/football/teams/131.png',
            winner: true
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 0 },
          extratime: { home: 0, away: 0 },
          penalty: { home: 1, away: 3 }
        }
      },
      {
        fixture: {
          id: 1251961,
          referee: 'Raphael Claus, Brazil',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:30:00+02:00',
          timestamp: 1723077000,
          periods: { first: 1723077000, second: 1723080600 },
          venue: {
            id: null,
            name: 'Estadio Jornalista Mário Filho',
            city: 'Rio de Janeiro, Rio de Janeiro'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 73,
          name: 'Copa Do Brasil',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/73.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Round of 16'
        },
        teams: {
          home: {
            id: 124,
            name: 'Fluminense',
            logo: 'https://media.api-sports.io/football/teams/124.png',
            winner: null
          },
          away: {
            id: 152,
            name: 'Juventude',
            logo: 'https://media.api-sports.io/football/teams/152.png',
            winner: null
          }
        },
        goals: { home: 2, away: 2 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: 2, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Primera Division': {
    matches: [
      {
        fixture: {
          id: 1260816,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Estadio Mario Enrique Arriaza',
            city: 'Gualán'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 338,
          name: 'Primera Division',
          country: 'Guatemala',
          logo: 'https://media.api-sports.io/football/leagues/338.png',
          flag: 'https://media.api-sports.io/flags/gt.svg',
          season: 2024,
          round: 'Apertura - 2'
        },
        teams: {
          home: {
            id: 24527,
            name: 'Gualan',
            logo: 'https://media.api-sports.io/football/teams/24527.png',
            winner: null
          },
          away: {
            id: 3655,
            name: 'Sacachispas',
            logo: 'https://media.api-sports.io/football/teams/3655.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Paraibano U20': {
    matches: [
      {
        fixture: {
          id: 1282121,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T00:00:00+02:00',
          timestamp: 1723068000,
          periods: { first: null, second: null },
          venue: {
            id: 224,
            name: 'Estádio Governador Ernani Sátyro',
            city: 'Campina Grande, Paraíba'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1120,
          name: 'Paraibano U20',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/1120.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: 'Final'
        },
        teams: {
          home: {
            id: 22847,
            name: 'Serra Branca U20',
            logo: 'https://media.api-sports.io/football/teams/22847.png',
            winner: false
          },
          away: {
            id: 24037,
            name: 'Cruzeiro Itaporanga U20',
            logo: 'https://media.api-sports.io/football/teams/24037.png',
            winner: true
          }
        },
        goals: { home: 0, away: 2 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: 0, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'USL Championship': {
    matches: [
      {
        fixture: {
          id: 1150022,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:00:00+02:00',
          timestamp: 1723071600,
          periods: { first: 1723071600, second: 1723075200 },
          venue: {
            id: 6281,
            name: 'Keyworth Stadium',
            city: 'Hamtramck, Michigan'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 255,
          name: 'USL Championship',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/255.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 26'
        },
        teams: {
          home: {
            id: 9043,
            name: 'Detroit City',
            logo: 'https://media.api-sports.io/football/teams/9043.png',
            winner: null
          },
          away: {
            id: 4010,
            name: 'Pittsburgh Riverhounds',
            logo: 'https://media.api-sports.io/football/teams/4010.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1150181,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:00:00+02:00',
          timestamp: 1723071600,
          periods: { first: 1723071600, second: 1723075200 },
          venue: {
            id: 19452,
            name: 'Michael A. Carroll Stadium',
            city: 'Indianapolis, Indiana'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 255,
          name: 'USL Championship',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/255.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 26'
        },
        teams: {
          home: {
            id: 3996,
            name: 'Indy Eleven',
            logo: 'https://media.api-sports.io/football/teams/3996.png',
            winner: true
          },
          away: {
            id: 22855,
            name: 'Rhode Island',
            logo: 'https://media.api-sports.io/football/teams/22855.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'MLS Next Pro': {
    matches: [
      {
        fixture: {
          id: 1174422,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:00:00+02:00',
          timestamp: 1723071600,
          periods: { first: 1723071600, second: 1723075200 },
          venue: {
            id: 20585,
            name: 'South Carolina United FC BB&T Soccer Complex',
            city: 'Irmo, South Carolina'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 909,
          name: 'MLS Next Pro',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/909.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 28'
        },
        teams: {
          home: {
            id: 23063,
            name: 'Carolina Core',
            logo: 'https://media.api-sports.io/football/teams/23063.png',
            winner: false
          },
          away: {
            id: 10280,
            name: 'Fort Lauderdale CF',
            logo: 'https://media.api-sports.io/football/teams/10280.png',
            winner: true
          }
        },
        goals: { home: 1, away: 5 },
        score: {
          halftime: { home: 0, away: 2 },
          fulltime: { home: 1, away: 5 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1174423,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T03:00:00+02:00',
          timestamp: 1723078800,
          periods: { first: 1723078800, second: 1723082400 },
          venue: {
            id: 3128,
            name: 'Swangard Stadium',
            city: 'Burnaby, British Columbia'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 909,
          name: 'MLS Next Pro',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/909.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 28'
        },
        teams: {
          home: {
            id: 4028,
            name: 'Whitecaps II',
            logo: 'https://media.api-sports.io/football/teams/4028.png',
            winner: false
          },
          away: {
            id: 4102,
            name: 'Colorado Rapids II',
            logo: 'https://media.api-sports.io/football/teams/4102.png',
            winner: true
          }
        },
        goals: { home: 1, away: 2 },
        score: {
          halftime: { home: 0, away: 2 },
          fulltime: { home: 1, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'USL League One': {
    matches: [
      {
        fixture: {
          id: 1148522,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T01:30:00+02:00',
          timestamp: 1723073400,
          periods: { first: 1723073400, second: 1723077000 },
          venue: {
            id: 6261,
            name: 'CHI Memorial Stadium',
            city: 'East Ridge, Tennessee'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 489,
          name: 'USL League One',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/489.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 8'
        },
        teams: {
          home: {
            id: 9016,
            name: 'Chattanooga Red Wolves',
            logo: 'https://media.api-sports.io/football/teams/9016.png',
            winner: false
          },
          away: {
            id: 22785,
            name: 'Spokane Velocity',
            logo: 'https://media.api-sports.io/football/teams/22785.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Liga Pro Serie B': {
    matches: [
      {
        fixture: {
          id: 1181283,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: null,
            name: 'Estadio Folke Anderson',
            city: 'Esmeraldas'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 243,
          name: 'Liga Pro Serie B',
          country: 'Ecuador',
          logo: 'https://media.api-sports.io/football/leagues/243.png',
          flag: 'https://media.api-sports.io/flags/ec.svg',
          season: 2024,
          round: 'Regular Season - 23'
        },
        teams: {
          home: {
            id: 19042,
            name: 'Vargas Torres',
            logo: 'https://media.api-sports.io/football/teams/19042.png',
            winner: false
          },
          away: {
            id: 10111,
            name: '9 de Octubre',
            logo: 'https://media.api-sports.io/football/teams/10111.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1181280,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T22:30:00+02:00',
          timestamp: 1723149000,
          periods: { first: null, second: null },
          venue: {
            id: 1702,
            name: 'Estadio Christian Benítez Betancourt',
            city: 'Guayaquil'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 243,
          name: 'Liga Pro Serie B',
          country: 'Ecuador',
          logo: 'https://media.api-sports.io/football/leagues/243.png',
          flag: 'https://media.api-sports.io/flags/ec.svg',
          season: 2024,
          round: 'Regular Season - 23'
        },
        teams: {
          home: {
            id: 1159,
            name: 'Guayaquil City FC',
            logo: 'https://media.api-sports.io/football/teams/1159.png',
            winner: null
          },
          away: {
            id: 21103,
            name: 'Cuniburo',
            logo: 'https://media.api-sports.io/football/teams/21103.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  '1. Division': {
    matches: [
      {
        fixture: {
          id: 1191471,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Match Cancelled', short: 'CANC', elapsed: null }
        },
        league: {
          id: 388,
          name: '1. Division',
          country: 'Kazakhstan',
          logo: 'https://media.api-sports.io/football/leagues/388.png',
          flag: 'https://media.api-sports.io/flags/kz.svg',
          season: 2024,
          round: 'Regular Season - 19'
        },
        teams: {
          home: {
            id: 4553,
            name: 'Kyran',
            logo: 'https://media.api-sports.io/football/teams/4553.png',
            winner: null
          },
          away: {
            id: 4544,
            name: 'Altay',
            logo: 'https://media.api-sports.io/football/teams/4544.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1191472,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:00:00+02:00',
          timestamp: 1723118400,
          periods: { first: 1723118400, second: 1723122000 },
          venue: {
            id: null,
            name: "Stadion Oktiyabr' Zharylkapov",
            city: 'Turkistan'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 388,
          name: '1. Division',
          country: 'Kazakhstan',
          logo: 'https://media.api-sports.io/football/leagues/388.png',
          flag: 'https://media.api-sports.io/flags/kz.svg',
          season: 2024,
          round: 'Regular Season - 19'
        },
        teams: {
          home: {
            id: 16610,
            name: 'Yassy Turkistan',
            logo: 'https://media.api-sports.io/football/teams/16610.png',
            winner: null
          },
          away: {
            id: 4552,
            name: 'Kaspiy',
            logo: 'https://media.api-sports.io/football/teams/4552.png',
            winner: null
          }
        },
        goals: { home: 2, away: 2 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 2, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1191474,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:00:00+02:00',
          timestamp: 1723118400,
          periods: { first: 1723118400, second: 1723122000 },
          venue: { id: null, name: 'Stadion Metallurg', city: 'Zhezqazghan' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 388,
          name: '1. Division',
          country: 'Kazakhstan',
          logo: 'https://media.api-sports.io/football/leagues/388.png',
          flag: 'https://media.api-sports.io/flags/kz.svg',
          season: 2024,
          round: 'Regular Season - 19'
        },
        teams: {
          home: {
            id: 21010,
            name: 'Ulytau',
            logo: 'https://media.api-sports.io/football/teams/21010.png',
            winner: true
          },
          away: {
            id: 4546,
            name: 'Aktobe Jas',
            logo: 'https://media.api-sports.io/football/teams/4546.png',
            winner: false
          }
        },
        goals: { home: 6, away: 0 },
        score: {
          halftime: { home: 3, away: 0 },
          fulltime: { home: 6, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1191475,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:00:00+02:00',
          timestamp: 1723118400,
          periods: { first: 1723118400, second: 1723122000 },
          venue: {
            id: null,
            name: 'Stadion im. K. Munaytpasova',
            city: 'Zhetisay'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 388,
          name: '1. Division',
          country: 'Kazakhstan',
          logo: 'https://media.api-sports.io/football/leagues/388.png',
          flag: 'https://media.api-sports.io/flags/kz.svg',
          season: 2024,
          round: 'Regular Season - 19'
        },
        teams: {
          home: {
            id: 21012,
            name: 'Zhetisay',
            logo: 'https://media.api-sports.io/football/teams/21012.png',
            winner: true
          },
          away: {
            id: 4547,
            name: 'Akzhayik',
            logo: 'https://media.api-sports.io/football/teams/4547.png',
            winner: false
          }
        },
        goals: { home: 3, away: 0 },
        score: {
          halftime: { home: 2, away: 0 },
          fulltime: { home: 3, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1191470,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T16:00:00+02:00',
          timestamp: 1723125600,
          periods: { first: 1723125600, second: null },
          venue: { id: 20661, name: 'Ortalyq stadıon', city: 'Taraz' },
          status: { long: 'Halftime', short: 'HT', elapsed: 45 }
        },
        league: {
          id: 388,
          name: '1. Division',
          country: 'Kazakhstan',
          logo: 'https://media.api-sports.io/football/leagues/388.png',
          flag: 'https://media.api-sports.io/flags/kz.svg',
          season: 2024,
          round: 'Regular Season - 19'
        },
        teams: {
          home: {
            id: 4559,
            name: 'Taraz',
            logo: 'https://media.api-sports.io/football/teams/4559.png',
            winner: true
          },
          away: {
            id: 10414,
            name: 'Arys',
            logo: 'https://media.api-sports.io/football/teams/10414.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Division Profesional - Clausura': {
    matches: [
      {
        fixture: {
          id: 1223099,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: 1212,
            name: 'Estadio Monumental Río Parapití',
            city: 'Pedro Juan Caballero'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 252,
          name: 'Division Profesional - Clausura',
          country: 'Paraguay',
          logo: 'https://media.api-sports.io/football/leagues/252.png',
          flag: 'https://media.api-sports.io/flags/py.svg',
          season: 2024,
          round: 'Clausura - 4'
        },
        teams: {
          home: {
            id: 2140,
            name: '2 de Mayo',
            logo: 'https://media.api-sports.io/football/teams/2140.png',
            winner: true
          },
          away: {
            id: 1175,
            name: 'Nacional Asuncion',
            logo: 'https://media.api-sports.io/football/teams/1175.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1223098,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:30:00+02:00',
          timestamp: 1723152600,
          periods: { first: null, second: null },
          venue: {
            id: 1226,
            name: 'Estadio Feliciano Cáceres',
            city: 'Luque'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 252,
          name: 'Division Profesional - Clausura',
          country: 'Paraguay',
          logo: 'https://media.api-sports.io/football/leagues/252.png',
          flag: 'https://media.api-sports.io/flags/py.svg',
          season: 2024,
          round: 'Clausura - 4'
        },
        teams: {
          home: {
            id: 1183,
            name: 'Sportivo Luqueno',
            logo: 'https://media.api-sports.io/football/teams/1183.png',
            winner: null
          },
          away: {
            id: 10491,
            name: 'Tacuary',
            logo: 'https://media.api-sports.io/football/teams/10491.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Copa Ecuador': {
    matches: [
      {
        fixture: {
          id: 1232611,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: 465,
            name: 'Estadio Olímpico Atahualpa',
            city: 'Quito'
          },
          status: { long: 'Match Finished', short: 'PEN', elapsed: 120 }
        },
        league: {
          id: 917,
          name: 'Copa Ecuador',
          country: 'Ecuador',
          logo: 'https://media.api-sports.io/football/leagues/917.png',
          flag: 'https://media.api-sports.io/flags/ec.svg',
          season: 2023,
          round: '2nd Round'
        },
        teams: {
          home: {
            id: 24073,
            name: 'Tumbaco AV25',
            logo: 'https://media.api-sports.io/football/teams/24073.png',
            winner: false
          },
          away: {
            id: 1148,
            name: 'Emelec',
            logo: 'https://media.api-sports.io/football/teams/1148.png',
            winner: true
          }
        },
        goals: { home: 1, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 1 },
          extratime: { home: 0, away: 0 },
          penalty: { home: 5, away: 6 }
        }
      }
    ]
  },
  'Primera A': {
    matches: [
      {
        fixture: {
          id: 1234179,
          referee: 'Carlos Betancur Gutierrez, Colombia',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: 369,
            name: 'Estadio Alfonso López',
            city: 'Bucaramanga'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 239,
          name: 'Primera A',
          country: 'Colombia',
          logo: 'https://media.api-sports.io/football/leagues/239.png',
          flag: 'https://media.api-sports.io/flags/co.svg',
          season: 2024,
          round: 'Clausura - 4'
        },
        teams: {
          home: {
            id: 1131,
            name: 'Bucaramanga',
            logo: 'https://media.api-sports.io/football/teams/1131.png',
            winner: false
          },
          away: {
            id: 1139,
            name: 'Santa Fe',
            logo: 'https://media.api-sports.io/football/teams/1139.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Copa Costa Rica': {
    matches: [
      {
        fixture: {
          id: 1260796,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: null,
            name: 'Estadio Municipal Pérez Zeledón',
            city: 'San Isidro de El General'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 958,
          name: 'Copa Costa Rica',
          country: 'Costa-Rica',
          logo: 'https://media.api-sports.io/football/leagues/958.png',
          flag: 'https://media.api-sports.io/flags/cr.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 819,
            name: 'Perez Zeledon',
            logo: 'https://media.api-sports.io/football/teams/819.png',
            winner: false
          },
          away: {
            id: 19738,
            name: 'Quepos Cambute',
            logo: 'https://media.api-sports.io/football/teams/19738.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1260797,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:00:00+02:00',
          timestamp: 1723075200,
          periods: { first: 1723075200, second: 1723078800 },
          venue: {
            id: 405,
            name: 'Estadio Municipal de Puntarenas Miguel Ángel Lito Pérez Treacy',
            city: 'Puntarenas'
          },
          status: { long: 'Match Finished', short: 'PEN', elapsed: 120 }
        },
        league: {
          id: 958,
          name: 'Copa Costa Rica',
          country: 'Costa-Rica',
          logo: 'https://media.api-sports.io/football/leagues/958.png',
          flag: 'https://media.api-sports.io/flags/cr.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 2045,
            name: 'Puntarenas FC',
            logo: 'https://media.api-sports.io/football/teams/2045.png',
            winner: true
          },
          away: {
            id: 2043,
            name: 'ADR Jicaral',
            logo: 'https://media.api-sports.io/football/teams/2043.png',
            winner: false
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 0 },
          extratime: { home: 0, away: 0 },
          penalty: { home: 5, away: 4 }
        }
      },
      {
        fixture: {
          id: 1260798,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T03:00:00+02:00',
          timestamp: 1723078800,
          periods: { first: null, second: null },
          venue: { id: 1916, name: 'Estadio de Piedades', city: 'Santa Ana' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 958,
          name: 'Copa Costa Rica',
          country: 'Costa-Rica',
          logo: 'https://media.api-sports.io/football/leagues/958.png',
          flag: 'https://media.api-sports.io/flags/cr.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 2057,
            name: 'Santa Ana',
            logo: 'https://media.api-sports.io/football/teams/2057.png',
            winner: null
          },
          away: {
            id: 2055,
            name: 'AD Cofutpa',
            logo: 'https://media.api-sports.io/football/teams/2055.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1260799,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:15:00+02:00',
          timestamp: 1723083300,
          periods: { first: null, second: null },
          venue: {
            id: 398,
            name: 'Estadio José Rafael Fello Meza',
            city: 'Cartago'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 958,
          name: 'Copa Costa Rica',
          country: 'Costa-Rica',
          logo: 'https://media.api-sports.io/football/leagues/958.png',
          flag: 'https://media.api-sports.io/flags/cr.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 820,
            name: 'CS Cartagines',
            logo: 'https://media.api-sports.io/football/teams/820.png',
            winner: null
          },
          away: {
            id: 17377,
            name: 'Escorpiones Belén',
            logo: 'https://media.api-sports.io/football/teams/17377.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'League 1 Ontario': {
    matches: [
      {
        fixture: {
          id: 1192118,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T02:30:00+02:00',
          timestamp: 1723077000,
          periods: { first: null, second: null },
          venue: {
            id: 18600,
            name: 'North Maple Regional Park Turf 1',
            city: 'Vaughan, Ontario'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 923,
          name: 'League 1 Ontario',
          country: 'Canada',
          logo: 'https://media.api-sports.io/football/leagues/923.png',
          flag: 'https://media.api-sports.io/flags/ca.svg',
          season: 2024,
          round: 'Regular Season - 11'
        },
        teams: {
          home: {
            id: 2620,
            name: 'Vaughan Azzurri',
            logo: 'https://media.api-sports.io/football/teams/2620.png',
            winner: null
          },
          away: {
            id: 19099,
            name: 'Burlington',
            logo: 'https://media.api-sports.io/football/teams/19099.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  NISA: {
    matches: [
      {
        fixture: {
          id: 1182119,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:00:00+02:00',
          timestamp: 1723082400,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Long Beach City College Soccer Fields',
            city: 'Long Beach, California'
          },
          status: { long: 'Technical loss', short: 'AWD', elapsed: null }
        },
        league: {
          id: 523,
          name: 'NISA',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/523.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 8'
        },
        teams: {
          home: {
            id: 10872,
            name: 'LA Force',
            logo: 'https://media.api-sports.io/football/teams/10872.png',
            winner: true
          },
          away: {
            id: 23217,
            name: 'Arizona Monsoon',
            logo: 'https://media.api-sports.io/football/teams/23217.png',
            winner: false
          }
        },
        goals: { home: 3, away: 0 },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1182152,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:00:00+02:00',
          timestamp: 1723082400,
          periods: { first: null, second: null },
          venue: {
            id: 11934,
            name: 'Championship Soccer Stadium',
            city: 'Irvine, California'
          },
          status: { long: 'Match Cancelled', short: 'CANC', elapsed: null }
        },
        league: {
          id: 523,
          name: 'NISA',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/523.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 8'
        },
        teams: {
          home: {
            id: 23222,
            name: 'Irvine Zeta',
            logo: 'https://media.api-sports.io/football/teams/23222.png',
            winner: null
          },
          away: {
            id: 21005,
            name: 'Savannah Clovers',
            logo: 'https://media.api-sports.io/football/teams/21005.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1182153,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:00:00+02:00',
          timestamp: 1723082400,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Veterans Memorial Stadium',
            city: 'Long Beach, California'
          },
          status: { long: 'Match Cancelled', short: 'CANC', elapsed: null }
        },
        league: {
          id: 523,
          name: 'NISA',
          country: 'USA',
          logo: 'https://media.api-sports.io/football/leagues/523.png',
          flag: 'https://media.api-sports.io/flags/us.svg',
          season: 2024,
          round: 'Regular Season - 8'
        },
        teams: {
          home: {
            id: 10872,
            name: 'LA Force',
            logo: 'https://media.api-sports.io/football/teams/10872.png',
            winner: null
          },
          away: {
            id: 21003,
            name: 'Club De Lyon',
            logo: 'https://media.api-sports.io/football/teams/21003.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Leagues Cup': {
    matches: [
      {
        fixture: {
          id: 1280598,
          referee: 'Jon Freemon, USA',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:30:00+02:00',
          timestamp: 1723084200,
          periods: { first: 1723084200, second: 1723087800 },
          venue: {
            id: 19419,
            name: 'BMO Stadium',
            city: 'Los Angeles, California'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 772,
          name: 'Leagues Cup',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/772.png',
          flag: null,
          season: 2024,
          round: 'Round of 32'
        },
        teams: {
          home: {
            id: 1616,
            name: 'Los Angeles FC',
            logo: 'https://media.api-sports.io/football/teams/1616.png',
            winner: true
          },
          away: {
            id: 16489,
            name: 'Austin',
            logo: 'https://media.api-sports.io/football/teams/16489.png',
            winner: false
          }
        },
        goals: { home: 2, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 2, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1280599,
          referee: 'César Ramos Palazuelos, Mexico',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T04:30:00+02:00',
          timestamp: 1723084200,
          periods: { first: 1723084200, second: 1723087800 },
          venue: {
            id: 19445,
            name: 'BC Place',
            city: 'Vancouver, British Columbia'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 772,
          name: 'Leagues Cup',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/772.png',
          flag: null,
          season: 2024,
          round: 'Round of 32'
        },
        teams: {
          home: {
            id: 1603,
            name: 'Vancouver Whitecaps',
            logo: 'https://media.api-sports.io/football/teams/1603.png',
            winner: false
          },
          away: {
            id: 2286,
            name: 'U.N.A.M. - Pumas',
            logo: 'https://media.api-sports.io/football/teams/2286.png',
            winner: true
          }
        },
        goals: { home: 0, away: 2 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: 0, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Persha Liga': {
    matches: [
      {
        fixture: {
          id: 1278190,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T11:00:00+02:00',
          timestamp: 1723107600,
          periods: { first: null, second: null },
          venue: { id: 19985, name: 'Stadion Yuvilejnyj', city: 'Bucha' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 334,
          name: 'Persha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/334.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 21953,
            name: 'Kudrivka',
            logo: 'https://media.api-sports.io/football/teams/21953.png',
            winner: null
          },
          away: {
            id: 21957,
            name: 'UCSA',
            logo: 'https://media.api-sports.io/football/teams/21957.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1278186,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T12:00:00+02:00',
          timestamp: 1723111200,
          periods: { first: 1723111200, second: 1723114800 },
          venue: {
            id: 20123,
            name: 'Miskyi Tsentralnyi Stadion Rukh',
            city: 'Ivano-Frankivsk'
          },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 334,
          name: 'Persha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/334.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 3631,
            name: 'Prykarpattia',
            logo: 'https://media.api-sports.io/football/teams/3631.png',
            winner: null
          },
          away: {
            id: 6486,
            name: 'Bukovyna',
            logo: 'https://media.api-sports.io/football/teams/6486.png',
            winner: null
          }
        },
        goals: { home: 1, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1278191,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:00:00+02:00',
          timestamp: 1723118400,
          periods: { first: 1723118400, second: 1723122000 },
          venue: { id: 20316, name: 'Stadion Kolos', city: 'Boryspil' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 334,
          name: 'Persha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/334.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 14441,
            name: "Yarud Mariupol'",
            logo: 'https://media.api-sports.io/football/teams/14441.png',
            winner: true
          },
          away: {
            id: 3628,
            name: 'Metalist 1925 Kharkiv',
            logo: 'https://media.api-sports.io/football/teams/3628.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1278187,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:30:00+02:00',
          timestamp: 1723120200,
          periods: { first: 1723120200, second: 1723123800 },
          venue: { id: 20126, name: 'Stadion Podillia', city: 'Khmelnytskyi' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 334,
          name: 'Persha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/334.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6495,
            name: 'Podillya Khmelnytskyi',
            logo: 'https://media.api-sports.io/football/teams/6495.png',
            winner: true
          },
          away: {
            id: 21203,
            name: 'Khust City',
            logo: 'https://media.api-sports.io/football/teams/21203.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1278188,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T16:00:00+02:00',
          timestamp: 1723125600,
          periods: { first: 1723125600, second: null },
          venue: {
            id: 20125,
            name: 'Ternopilskyi miskyi stadion im. Romana Shukhevycha',
            city: 'Ternopil'
          },
          status: { long: 'Halftime', short: 'HT', elapsed: 45 }
        },
        league: {
          id: 334,
          name: 'Persha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/334.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6493,
            name: 'Nyva Ternopil',
            logo: 'https://media.api-sports.io/football/teams/6493.png',
            winner: null
          },
          away: {
            id: 14434,
            name: 'Epitsentr Dunayivtsi',
            logo: 'https://media.api-sports.io/football/teams/14434.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Calcutta Premier Division': {
    matches: [
      {
        fixture: {
          id: 1268021,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T11:30:00+02:00',
          timestamp: 1723109400,
          periods: { first: 1723109400, second: 1723113000 },
          venue: { id: null, name: null, city: null },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1020,
          name: 'Calcutta Premier Division',
          country: 'India',
          logo: 'https://media.api-sports.io/football/leagues/1020.png',
          flag: 'https://media.api-sports.io/flags/in.svg',
          season: 2024,
          round: 'Regular Season - 10'
        },
        teams: {
          home: {
            id: 21607,
            name: 'Patha Chakra',
            logo: 'https://media.api-sports.io/football/teams/21607.png',
            winner: true
          },
          away: {
            id: 21606,
            name: 'Kidderpore',
            logo: 'https://media.api-sports.io/football/teams/21606.png',
            winner: false
          }
        },
        goals: { home: 3, away: 2 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 3, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Druha Liga': {
    matches: [
      {
        fixture: {
          id: 1275148,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T11:45:00+02:00',
          timestamp: 1723110300,
          periods: { first: 1723110300, second: 1723113900 },
          venue: { id: 12062, name: 'Chernihiv Arena', city: 'Chernihiv' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 14433,
            name: 'Chernihiv',
            logo: 'https://media.api-sports.io/football/teams/14433.png',
            winner: true
          },
          away: {
            id: 24586,
            name: 'Metalist 1925 II Kharkiv',
            logo: 'https://media.api-sports.io/football/teams/24586.png',
            winner: false
          }
        },
        goals: { home: 8, away: 2 },
        score: {
          halftime: { home: 5, away: 0 },
          fulltime: { home: 8, away: 2 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275143,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T12:30:00+02:00',
          timestamp: 1723113000,
          periods: { first: 1723113000, second: 1723116600 },
          venue: { id: 21086, name: 'Stadion Kolos', city: 'Horodenka' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 24568,
            name: 'Probiy Horodenka',
            logo: 'https://media.api-sports.io/football/teams/24568.png',
            winner: true
          },
          away: {
            id: 24570,
            name: 'Vilkhivtsi',
            logo: 'https://media.api-sports.io/football/teams/24570.png',
            winner: false
          }
        },
        goals: { home: 1, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 1, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275144,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T13:00:00+02:00',
          timestamp: 1723114800,
          periods: { first: 1723114800, second: 1723118400 },
          venue: { id: 4770, name: 'Stadion FSK Ivan', city: 'Odesa' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6497,
            name: 'Real Pharm',
            logo: 'https://media.api-sports.io/football/teams/6497.png',
            winner: false
          },
          away: {
            id: 24569,
            name: 'Revera Ivano-Frankivsk',
            logo: 'https://media.api-sports.io/football/teams/24569.png',
            winner: true
          }
        },
        goals: { home: 0, away: 3 },
        score: {
          halftime: { home: 0, away: 2 },
          fulltime: { home: 0, away: 3 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275150,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T13:15:00+02:00',
          timestamp: 1723115700,
          periods: { first: 1723115700, second: 1723119300 },
          venue: {
            id: 20192,
            name: 'Stadion Yunist',
            city: 'Horishni Plavni'
          },
          status: { long: 'Second Half', short: '2H', elapsed: 86 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 3624,
            name: 'Hirnyk-Sport',
            logo: 'https://media.api-sports.io/football/teams/3624.png',
            winner: false
          },
          away: {
            id: 24588,
            name: 'Oleksandria II',
            logo: 'https://media.api-sports.io/football/teams/24588.png',
            winner: true
          }
        },
        goals: { home: 0, away: 2 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275146,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T13:45:00+02:00',
          timestamp: 1723117500,
          periods: { first: 1723117500, second: 1723121100 },
          venue: { id: 21085, name: 'Arena Kulykiv', city: 'Kulykiv' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 24566,
            name: 'Kulykiv',
            logo: 'https://media.api-sports.io/football/teams/24566.png',
            winner: true
          },
          away: {
            id: 24589,
            name: 'Polissya II',
            logo: 'https://media.api-sports.io/football/teams/24589.png',
            winner: false
          }
        },
        goals: { home: 3, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 3, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275152,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:15:00+02:00',
          timestamp: 1723119300,
          periods: { first: 1723119300, second: 1723122900 },
          venue: { id: 20104, name: 'NTB Nyva Pole 1', city: 'Vinnytsia' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6494,
            name: 'Nyva Vinnytsya',
            logo: 'https://media.api-sports.io/football/teams/6494.png',
            winner: null
          },
          away: {
            id: 17167,
            name: 'Trostianets',
            logo: 'https://media.api-sports.io/football/teams/17167.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 0 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275147,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:00:00+02:00',
          timestamp: 1723122000,
          periods: { first: 1723122000, second: 1723125600 },
          venue: { id: 10795, name: 'Stadion Avanhard', city: 'Uzhhorod' },
          status: { long: 'Second Half', short: '2H', elapsed: 90 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6499,
            name: 'Uzhhorod',
            logo: 'https://media.api-sports.io/football/teams/6499.png',
            winner: null
          },
          away: {
            id: 21976,
            name: 'Rukh Vynnyky II',
            logo: 'https://media.api-sports.io/football/teams/21976.png',
            winner: null
          }
        },
        goals: { home: 2, away: 2 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275149,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:30:00+02:00',
          timestamp: 1723123800,
          periods: { first: 1723123800, second: 1723127400 },
          venue: {
            id: 20193,
            name: 'Tsentralnyi stadion im. Mikhaila Brukvenka',
            city: 'Makariv'
          },
          status: { long: 'Second Half', short: '2H', elapsed: 69 }
        },
        league: {
          id: 336,
          name: 'Druha Liga',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/336.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 6483,
            name: 'Chayka',
            logo: 'https://media.api-sports.io/football/teams/6483.png',
            winner: null
          },
          away: {
            id: 24585,
            name: 'Kolos Kovalivka II',
            logo: 'https://media.api-sports.io/football/teams/24585.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'U19 League': {
    matches: [
      {
        fixture: {
          id: 1222813,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T12:00:00+02:00',
          timestamp: 1723111200,
          periods: { first: 1723111200, second: 1723114800 },
          venue: { id: null, name: 'NTB Veres', city: 'Rivne' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1065,
          name: 'U19 League',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/1065.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 2'
        },
        teams: {
          home: {
            id: 23082,
            name: 'Veres Rivne U19',
            logo: 'https://media.api-sports.io/football/teams/23082.png',
            winner: null
          },
          away: {
            id: 7898,
            name: 'Dynamo Kyiv U19',
            logo: 'https://media.api-sports.io/football/teams/7898.png',
            winner: null
          }
        },
        goals: { home: 1, away: 1 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: 1, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1222691,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T13:00:00+02:00',
          timestamp: 1723114800,
          periods: { first: 1723114800, second: 1723118400 },
          venue: { id: 20196, name: 'Stadion Livyi Bereh', city: 'Kyiv' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1065,
          name: 'U19 League',
          country: 'Ukraine',
          logo: 'https://media.api-sports.io/football/leagues/1065.png',
          flag: 'https://media.api-sports.io/flags/ua.svg',
          season: 2024,
          round: 'Regular Season - 2'
        },
        teams: {
          home: {
            id: 23074,
            name: 'Dnipro-1 U19',
            logo: 'https://media.api-sports.io/football/teams/23074.png',
            winner: true
          },
          away: {
            id: 23083,
            name: 'Vorskla U19',
            logo: 'https://media.api-sports.io/football/teams/23083.png',
            winner: false
          }
        },
        goals: { home: 2, away: 1 },
        score: {
          halftime: { home: 1, away: 0 },
          fulltime: { home: 2, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Premier League': {
    matches: [
      {
        fixture: {
          id: 1234479,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T12:00:00+02:00',
          timestamp: 1723111200,
          periods: { first: 1723111200, second: 1723114800 },
          venue: { id: 20179, name: 'Woochu Sports Arena', city: 'Paro' },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 1031,
          name: 'Premier League',
          country: 'Bhutan',
          logo: 'https://media.api-sports.io/football/leagues/1031.png',
          flag: 'https://media.api-sports.io/flags/bt.svg',
          season: 2024,
          round: 'Regular Season - 6'
        },
        teams: {
          home: {
            id: 9426,
            name: 'Paro',
            logo: 'https://media.api-sports.io/football/teams/9426.png',
            winner: true
          },
          away: {
            id: 21277,
            name: 'Tsirang',
            logo: 'https://media.api-sports.io/football/teams/21277.png',
            winner: false
          }
        },
        goals: { home: 2, away: 1 },
        score: {
          halftime: { home: 2, away: 1 },
          fulltime: { home: 2, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1189707,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T16:00:00+02:00',
          timestamp: 1723125600,
          periods: { first: 1723125600, second: null },
          venue: { id: null, name: 'Stadion Kurmanbek', city: 'Jalal-Abad' },
          status: { long: 'Halftime', short: 'HT', elapsed: 45 }
        },
        league: {
          id: 569,
          name: 'Premier League',
          country: 'Kyrgyzstan',
          logo: 'https://media.api-sports.io/football/leagues/569.png',
          flag: 'https://media.api-sports.io/flags/kg.svg',
          season: 2024,
          round: 'Regular Season - 5'
        },
        teams: {
          home: {
            id: 21167,
            name: 'Muras United',
            logo: 'https://media.api-sports.io/football/teams/21167.png',
            winner: null
          },
          away: {
            id: 12234,
            name: 'Abdish-Ata',
            logo: 'https://media.api-sports.io/football/teams/12234.png',
            winner: null
          }
        },
        goals: { home: 0, away: 0 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1221650,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:30:00+02:00',
          timestamp: 1723138200,
          periods: { first: null, second: null },
          venue: {
            id: 2348,
            name: 'Al-Sadaqua Walsalam Stadium',
            city: 'Kuwait City'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 330,
          name: 'Premier League',
          country: 'Kuwait',
          logo: 'https://media.api-sports.io/football/leagues/330.png',
          flag: 'https://media.api-sports.io/flags/kw.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 3535,
            name: 'Al Kuwait',
            logo: 'https://media.api-sports.io/football/teams/3535.png',
            winner: null
          },
          away: {
            id: 3537,
            name: 'Al Qadsia',
            logo: 'https://media.api-sports.io/football/teams/3537.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1176843,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 477,
            name: 'Cairo International Stadium',
            city: 'Cairo'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 233,
          name: 'Premier League',
          country: 'Egypt',
          logo: 'https://media.api-sports.io/football/leagues/233.png',
          flag: 'https://media.api-sports.io/flags/eg.svg',
          season: 2023,
          round: 'Regular Season - 23'
        },
        teams: {
          home: {
            id: 7520,
            name: 'Masr',
            logo: 'https://media.api-sports.io/football/teams/7520.png',
            winner: null
          },
          away: {
            id: 1040,
            name: 'Zamalek SC',
            logo: 'https://media.api-sports.io/football/teams/1040.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1176850,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Borg El Arab Stadium',
            city: 'Alexandria'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 233,
          name: 'Premier League',
          country: 'Egypt',
          logo: 'https://media.api-sports.io/football/leagues/233.png',
          flag: 'https://media.api-sports.io/flags/eg.svg',
          season: 2023,
          round: 'Regular Season - 24'
        },
        teams: {
          home: {
            id: 1044,
            name: 'Smouha SC',
            logo: 'https://media.api-sports.io/football/teams/1044.png',
            winner: null
          },
          away: {
            id: 1577,
            name: 'Al Ahly',
            logo: 'https://media.api-sports.io/football/teams/1577.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Friendlies Clubs': {
    matches: [
      {
        fixture: {
          id: 1276328,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T14:00:00+02:00',
          timestamp: 1723118400,
          periods: { first: null, second: null },
          venue: { id: 4321, name: 'Forestiersstadion', city: 'Harelbeke' },
          status: { long: 'Match Cancelled', short: 'CANC', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 3'
        },
        teams: {
          home: {
            id: 5817,
            name: 'Harelbeke',
            logo: 'https://media.api-sports.io/football/teams/5817.png',
            winner: null
          },
          away: {
            id: 6214,
            name: 'Deinze',
            logo: 'https://media.api-sports.io/football/teams/6214.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1280853,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:00:00+02:00',
          timestamp: 1723122000,
          periods: { first: 1723122000, second: 1723125600 },
          venue: { id: null, name: null, city: null },
          status: { long: 'Match Finished', short: 'FT', elapsed: 90 }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 4'
        },
        teams: {
          home: {
            id: 15562,
            name: 'Kitara',
            logo: 'https://media.api-sports.io/football/teams/15562.png',
            winner: false
          },
          away: {
            id: 2475,
            name: 'Tusker',
            logo: 'https://media.api-sports.io/football/teams/2475.png',
            winner: true
          }
        },
        goals: { home: 0, away: 1 },
        score: {
          halftime: { home: 0, away: 0 },
          fulltime: { home: 0, away: 1 },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1277954,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:45:00+02:00',
          timestamp: 1723131900,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 5'
        },
        teams: {
          home: {
            id: 12260,
            name: 'Atromitos',
            logo: 'https://media.api-sports.io/football/teams/12260.png',
            winner: null
          },
          away: {
            id: 1124,
            name: 'OFI',
            logo: 'https://media.api-sports.io/football/teams/1124.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1276329,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:30:00+02:00',
          timestamp: 1723134600,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Stadio Vitex Ammochostos Epistrofi',
            city: 'Larnaca'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 3'
        },
        teams: {
          home: {
            id: 3401,
            name: 'Nea Salamis',
            logo: 'https://media.api-sports.io/football/teams/3401.png',
            winner: null
          },
          away: {
            id: 22127,
            name: 'Spartakos Kitiou',
            logo: 'https://media.api-sports.io/football/teams/22127.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1283359,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:30:00+02:00',
          timestamp: 1723134600,
          periods: { first: null, second: null },
          venue: { id: null, name: 'TBC', city: 'TBC' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 3'
        },
        teams: {
          home: {
            id: 515,
            name: 'Spezia',
            logo: 'https://media.api-sports.io/football/teams/515.png',
            winner: null
          },
          away: {
            id: 9433,
            name: 'Fezzanese',
            logo: 'https://media.api-sports.io/football/teams/9433.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1283365,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:30:00+02:00',
          timestamp: 1723138200,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 4'
        },
        teams: {
          home: {
            id: 9712,
            name: 'Móstoles',
            logo: 'https://media.api-sports.io/football/teams/9712.png',
            winner: null
          },
          away: {
            id: 15332,
            name: 'Marchamalo',
            logo: 'https://media.api-sports.io/football/teams/15332.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1276330,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Stadio Georgios Karaiskáki',
            city: 'Piraeus'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 3'
        },
        teams: {
          home: {
            id: 553,
            name: 'Olympiakos Piraeus',
            logo: 'https://media.api-sports.io/football/teams/553.png',
            winner: null
          },
          away: {
            id: 65,
            name: 'Nottingham Forest',
            logo: 'https://media.api-sports.io/football/teams/65.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1276331,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:30:00+02:00',
          timestamp: 1723141800,
          periods: { first: null, second: null },
          venue: {
            id: 1479,
            name: 'Estadio Nuevo Los Cármenes',
            city: 'Granada'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 667,
          name: 'Friendlies Clubs',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/667.png',
          flag: null,
          season: 2024,
          round: 'Club Friendlies 3'
        },
        teams: {
          home: {
            id: 715,
            name: 'Granada CF',
            logo: 'https://media.api-sports.io/football/teams/715.png',
            winner: null
          },
          away: {
            id: 2937,
            name: 'Al Wehda Club',
            logo: 'https://media.api-sports.io/football/teams/2937.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'First League': {
    matches: [
      {
        fixture: {
          id: 1275132,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:00:00+02:00',
          timestamp: 1723122000,
          periods: { first: null, second: null },
          venue: { id: 19103, name: 'Gandzasar Stadium', city: 'Kapan' },
          status: { long: 'Match Postponed', short: 'PST', elapsed: null }
        },
        league: {
          id: 343,
          name: 'First League',
          country: 'Armenia',
          logo: 'https://media.api-sports.io/football/leagues/343.png',
          flag: 'https://media.api-sports.io/flags/am.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 20087,
            name: 'Syunik',
            logo: 'https://media.api-sports.io/football/teams/20087.png',
            winner: null
          },
          away: {
            id: 3696,
            name: 'Pyunik II',
            logo: 'https://media.api-sports.io/football/teams/3696.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1275133,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:00:00+02:00',
          timestamp: 1723122000,
          periods: { first: null, second: null },
          venue: { id: 2478, name: 'Vanadzor Stadium', city: 'Vanadzor' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 343,
          name: 'First League',
          country: 'Armenia',
          logo: 'https://media.api-sports.io/football/leagues/343.png',
          flag: 'https://media.api-sports.io/flags/am.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 24423,
            name: 'Bentonit Idzhevan',
            logo: 'https://media.api-sports.io/football/teams/24423.png',
            winner: null
          },
          away: {
            id: 3689,
            name: 'Ararat-Armenia II',
            logo: 'https://media.api-sports.io/football/teams/3689.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Pro League A': {
    matches: [
      {
        fixture: {
          id: 1268092,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:30:00+02:00',
          timestamp: 1723123800,
          periods: { first: 1723123800, second: 1723127400 },
          venue: { id: null, name: null, city: null },
          status: { long: 'Second Half', short: '2H', elapsed: 73 }
        },
        league: {
          id: 1075,
          name: 'Pro League A',
          country: 'Uzbekistan',
          logo: 'https://media.api-sports.io/football/leagues/1075.png',
          flag: 'https://media.api-sports.io/flags/uz.svg',
          season: 2024,
          round: 'Regular Season - 15'
        },
        teams: {
          home: {
            id: 18785,
            name: 'Aral',
            logo: 'https://media.api-sports.io/football/teams/18785.png',
            winner: true
          },
          away: {
            id: 18787,
            name: 'Dostlik',
            logo: 'https://media.api-sports.io/football/teams/18787.png',
            winner: false
          }
        },
        goals: { home: 2, away: 1 },
        score: {
          halftime: { home: 2, away: 0 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1268093,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T15:30:00+02:00',
          timestamp: 1723123800,
          periods: { first: 1723123800, second: 1723127400 },
          venue: { id: null, name: null, city: null },
          status: { long: 'Second Half', short: '2H', elapsed: 65 }
        },
        league: {
          id: 1075,
          name: 'Pro League A',
          country: 'Uzbekistan',
          logo: 'https://media.api-sports.io/football/leagues/1075.png',
          flag: 'https://media.api-sports.io/flags/uz.svg',
          season: 2024,
          round: 'Regular Season - 15'
        },
        teams: {
          home: {
            id: 4222,
            name: 'Shortan',
            logo: 'https://media.api-sports.io/football/teams/4222.png',
            winner: null
          },
          away: {
            id: 4211,
            name: 'Buxoro',
            logo: 'https://media.api-sports.io/football/teams/4211.png',
            winner: null
          }
        },
        goals: { home: 1, away: 1 },
        score: {
          halftime: { home: 0, away: 1 },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Cupa României': {
    matches: [
      {
        fixture: {
          id: 1278133,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T16:30:00+02:00',
          timestamp: 1723127400,
          periods: { first: null, second: null },
          venue: {
            id: 19740,
            name: 'Stadionul Central Băneasa',
            city: 'Băneasa'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 285,
          name: 'Cupa României',
          country: 'Romania',
          logo: 'https://media.api-sports.io/football/leagues/285.png',
          flag: 'https://media.api-sports.io/flags/ro.svg',
          season: 2024,
          round: '2nd Round'
        },
        teams: {
          home: {
            id: 21430,
            name: 'Gloria Băneasa',
            logo: 'https://media.api-sports.io/football/teams/21430.png',
            winner: null
          },
          away: {
            id: 2582,
            name: 'Dunarea Calarasi',
            logo: 'https://media.api-sports.io/football/teams/2582.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Nasjonal U19 Champions League': {
    matches: [
      {
        fixture: {
          id: 1205384,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: { id: 1203, name: 'Intility Arena', city: 'Oslo' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 823,
          name: 'Nasjonal U19 Champions League',
          country: 'Norway',
          logo: 'https://media.api-sports.io/football/leagues/823.png',
          flag: 'https://media.api-sports.io/flags/no.svg',
          season: 2024,
          round: '9th-16th Place Play-offs'
        },
        teams: {
          home: {
            id: 16568,
            name: 'Vålerenga U19',
            logo: 'https://media.api-sports.io/football/teams/16568.png',
            winner: null
          },
          away: {
            id: 16565,
            name: 'Strømsgodset U19',
            logo: 'https://media.api-sports.io/football/teams/16565.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  Cup: {
    matches: [
      {
        fixture: {
          id: 1239397,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Futbalový štadión Lovča', city: 'Lovča' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 680,
          name: 'Cup',
          country: 'Slovakia',
          logo: 'https://media.api-sports.io/football/leagues/680.png',
          flag: 'https://media.api-sports.io/flags/sk.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 21754,
            name: 'Lovca',
            logo: 'https://media.api-sports.io/football/teams/21754.png',
            winner: null
          },
          away: {
            id: 14940,
            name: 'Banská Štiavnica',
            logo: 'https://media.api-sports.io/football/teams/14940.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  League: {
    matches: [
      {
        fixture: {
          id: 1265738,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: { id: 3428, name: 'Petra Field', city: 'Amman' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 387,
          name: 'League',
          country: 'Jordan',
          logo: 'https://media.api-sports.io/football/leagues/387.png',
          flag: 'https://media.api-sports.io/flags/jo.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 4529,
            name: 'Al Ahli',
            logo: 'https://media.api-sports.io/football/teams/4529.png',
            winner: null
          },
          away: {
            id: 17467,
            name: 'Moghayer Al Sarhan',
            logo: 'https://media.api-sports.io/football/teams/17467.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1265737,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:45:00+02:00',
          timestamp: 1723139100,
          periods: { first: null, second: null },
          venue: {
            id: 3433,
            name: 'Aqaba Development Stadium',
            city: 'Aqaba'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 387,
          name: 'League',
          country: 'Jordan',
          logo: 'https://media.api-sports.io/football/leagues/387.png',
          flag: 'https://media.api-sports.io/flags/jo.svg',
          season: 2024,
          round: 'Regular Season - 1'
        },
        teams: {
          home: {
            id: 4538,
            name: 'Aqaba',
            logo: 'https://media.api-sports.io/football/teams/4538.png',
            winner: null
          },
          away: {
            id: 4534,
            name: 'Al Ramtha',
            logo: 'https://media.api-sports.io/football/teams/4534.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'UEFA Europa Conference League': {
    matches: [
      {
        fixture: {
          id: 1273690,
          referee: 'Dario Bel, Croatia',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Ķekavas stadions', city: 'Kekava' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 4135,
            name: 'Auda',
            logo: 'https://media.api-sports.io/football/teams/4135.png',
            winner: null
          },
          away: {
            id: 14281,
            name: 'Drita',
            logo: 'https://media.api-sports.io/football/teams/14281.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274797,
          referee: 'Kristoffer Hagenes, Norway',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: {
            id: 121,
            name: 'Vazgen Sargsyan anvan Hanrapetakan Marzadasht',
            city: 'Yerevan'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 3683,
            name: 'Ararat-Armenia',
            logo: 'https://media.api-sports.io/football/teams/3683.png',
            winner: null
          },
          away: {
            id: 2391,
            name: 'Puskas Academy',
            logo: 'https://media.api-sports.io/football/teams/2391.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274845,
          referee: 'Ondrej Berka, Czech Republic',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Kazhimukan Munaitpasov Stadium',
            city: 'Shymkent'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 692,
            name: 'Ordabasy',
            logo: 'https://media.api-sports.io/football/teams/692.png',
            winner: null
          },
          away: {
            id: 709,
            name: 'Pyunik Yerevan',
            logo: 'https://media.api-sports.io/football/teams/709.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1271725,
          referee: 'S. Putros',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: { id: 615, name: 'Bolt Arena', city: 'Helsinki' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 649,
            name: 'HJK helsinki',
            logo: 'https://media.api-sports.io/football/teams/649.png',
            winner: null
          },
          away: {
            id: 3745,
            name: 'Dečić',
            logo: 'https://media.api-sports.io/football/teams/3745.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274795,
          referee: 'J. Hyytiä',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: { id: 2494, name: 'Lokotrans Aréna', city: 'Mladá Boleslav' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 640,
            name: 'Mlada Boleslav',
            logo: 'https://media.api-sports.io/football/teams/640.png',
            winner: null
          },
          away: {
            id: 563,
            name: 'Hapoel Beer Sheva',
            logo: 'https://media.api-sports.io/football/teams/563.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274817,
          referee: 'E. Maļcevs',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: { id: 617, name: 'Tammelan Stadion', city: 'Tampere' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 1163,
            name: 'Ilves Tampere',
            logo: 'https://media.api-sports.io/football/teams/1163.png',
            winner: null
          },
          away: {
            id: 364,
            name: 'Djurgardens IF',
            logo: 'https://media.api-sports.io/football/teams/364.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274825,
          referee: 'D. Dickinson',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: {
            id: 2302,
            name: 'Mikheil Meskhis sakhelobis Stadioni',
            city: 'Tbilisi'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 3502,
            name: 'Saburtalo',
            logo: 'https://media.api-sports.io/football/teams/3502.png',
            winner: null
          },
          away: {
            id: 564,
            name: 'Istanbul Basaksehir',
            logo: 'https://media.api-sports.io/football/teams/564.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274821,
          referee: 'César Soto',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:30:00+02:00',
          timestamp: 1723134600,
          periods: { first: null, second: null },
          venue: {
            id: 2354,
            name: 'Futbalový štadión MFK Ružomberok',
            city: 'Ružomberok'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 3549,
            name: 'Ružomberok',
            logo: 'https://media.api-sports.io/football/teams/3549.png',
            winner: null
          },
          away: {
            id: 608,
            name: 'HNK Hajduk Split',
            logo: 'https://media.api-sports.io/football/teams/608.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274831,
          referee: 'H. Nalbandyan',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:30:00+02:00',
          timestamp: 1723134600,
          periods: { first: null, second: null },
          venue: { id: 459, name: 'JYSK park', city: 'Silkeborg' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 2073,
            name: 'Silkeborg',
            logo: 'https://media.api-sports.io/football/teams/2073.png',
            winner: null
          },
          away: {
            id: 631,
            name: 'Gent',
            logo: 'https://media.api-sports.io/football/teams/631.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274799,
          referee: 'M. Barbu',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 1533, name: 'Stadion Letzigrund', city: 'Zürich' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 783,
            name: 'FC Zurich',
            logo: 'https://media.api-sports.io/football/teams/783.png',
            winner: null
          },
          away: {
            id: 224,
            name: 'Guimaraes',
            logo: 'https://media.api-sports.io/football/teams/224.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274827,
          referee: 'M. Dohál',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 443, name: 'Brøndby Stadion', city: 'Brøndby' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 407,
            name: 'Brondby',
            logo: 'https://media.api-sports.io/football/teams/407.png',
            winner: null
          },
          away: {
            id: 339,
            name: 'Legia Warszawa',
            logo: 'https://media.api-sports.io/football/teams/339.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274839,
          referee: 'L. Tschudi',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Neo GSP', city: 'Levkosía' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 3402,
            name: 'Omonia Nicosia',
            logo: 'https://media.api-sports.io/football/teams/3402.png',
            winner: null
          },
          away: {
            id: 610,
            name: 'Fehérvár FC',
            logo: 'https://media.api-sports.io/football/teams/610.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274841,
          referee: 'V. Fotias',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 1442, name: 'Stadion Stožice', city: 'Ljubljana' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 677,
            name: 'Olimpija Ljubljana',
            logo: 'https://media.api-sports.io/football/teams/677.png',
            winner: null
          },
          away: {
            id: 568,
            name: 'Sheriff Tiraspol',
            logo: 'https://media.api-sports.io/football/teams/568.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274815,
          referee: 'D. Shurman',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:30:00+02:00',
          timestamp: 1723138200,
          periods: { first: null, second: null },
          venue: { id: 1912, name: 'Stadion Vasil Levski', city: 'Sofia' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 1426,
            name: 'CSKA 1948',
            logo: 'https://media.api-sports.io/football/teams/1426.png',
            winner: null
          },
          away: {
            id: 3403,
            name: 'Pafos',
            logo: 'https://media.api-sports.io/football/teams/3403.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1271723,
          referee: 'J. Sundberg',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Stadiumi Fadil Vokrri', city: 'Pristina' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 12733,
            name: 'Ballkani',
            logo: 'https://media.api-sports.io/football/teams/12733.png',
            winner: null
          },
          away: {
            id: 5354,
            name: 'Larne',
            logo: 'https://media.api-sports.io/football/teams/5354.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274807,
          referee: 'M. Antoniou',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 19215,
            name: 'The BBSP Stadium Rugby Park',
            city: 'Kilmarnock'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 250,
            name: 'Kilmarnock',
            logo: 'https://media.api-sports.io/football/teams/250.png',
            winner: null
          },
          away: {
            id: 325,
            name: 'Tromso',
            logo: 'https://media.api-sports.io/football/teams/325.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274819,
          referee: 'I. Barbara',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 1894, name: 'Stadionul Municipal', city: 'Sibiu' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 20034,
            name: 'Corvinul Hunedoara',
            logo: 'https://media.api-sports.io/football/teams/20034.png',
            winner: null
          },
          away: {
            id: 562,
            name: 'FC Astana',
            logo: 'https://media.api-sports.io/football/teams/562.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274829,
          referee: 'P. Kolarić',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 297,
            name: 'Vivacom Arena - Georgi Asparuhov',
            city: 'Sofia'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 4495,
            name: 'Maccabi Petah Tikva',
            logo: 'https://media.api-sports.io/football/teams/4495.png',
            winner: null
          },
          away: {
            id: 2246,
            name: 'CFR 1907 Cluj',
            logo: 'https://media.api-sports.io/football/teams/2246.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274833,
          referee: 'A. Diamantopoulos',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 20730, name: 'Opus Arena', city: 'Osijek' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 616,
            name: 'NK Osijek',
            logo: 'https://media.api-sports.io/football/teams/616.png',
            winner: null
          },
          away: {
            id: 648,
            name: 'Zira',
            logo: 'https://media.api-sports.io/football/teams/648.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274837,
          referee: 'Fábio Veríssimo',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 19922, name: 'Stadion Hristo Botev', city: 'Plovdiv' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 634,
            name: 'Botev Plovdiv',
            logo: 'https://media.api-sports.io/football/teams/634.png',
            winner: null
          },
          away: {
            id: 588,
            name: 'Zrinjski',
            logo: 'https://media.api-sports.io/football/teams/588.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274805,
          referee: 'D. Stefanski',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:15:00+02:00',
          timestamp: 1723140900,
          periods: { first: null, second: null },
          venue: { id: 1441, name: 'Ljudski vrt', city: 'Maribor' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 552,
            name: 'Maribor',
            logo: 'https://media.api-sports.io/football/teams/552.png',
            winner: null
          },
          away: {
            id: 702,
            name: 'Vojvodina',
            logo: 'https://media.api-sports.io/football/teams/702.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274843,
          referee: 'A. Ghaltakchyan',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:15:00+02:00',
          timestamp: 1723140900,
          periods: { first: null, second: null },
          venue: { id: 831, name: 'Víkingsvöllur', city: 'Reykjavík' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 278,
            name: 'Vikingur Reykjavik',
            logo: 'https://media.api-sports.io/football/teams/278.png',
            winner: null
          },
          away: {
            id: 687,
            name: 'Flora Tallinn',
            logo: 'https://media.api-sports.io/football/teams/687.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274809,
          referee: 'S. Karabayev',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:30:00+02:00',
          timestamp: 1723141800,
          periods: { first: null, second: null },
          venue: {
            id: 11602,
            name: 'CITY ARENA – Štadión Antona Malatinského',
            city: 'Trnava'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 1120,
            name: 'Spartak Trnava',
            logo: 'https://media.api-sports.io/football/teams/1120.png',
            winner: null
          },
          away: {
            id: 338,
            name: 'Wisla Krakow',
            logo: 'https://media.api-sports.io/football/teams/338.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274811,
          referee: 'V. Thórarinsson',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:45:00+02:00',
          timestamp: 1723142700,
          periods: { first: null, second: null },
          venue: { id: 865, name: 'Tallaght Stadium', city: 'Dublin' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 3843,
            name: "St Patrick's Athl.",
            logo: 'https://media.api-sports.io/football/teams/3843.png',
            winner: null
          },
          away: {
            id: 13976,
            name: 'Sabah FA',
            logo: 'https://media.api-sports.io/football/teams/13976.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274813,
          referee: 'M. De Gabriele',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:45:00+02:00',
          timestamp: 1723142700,
          periods: { first: null, second: null },
          venue: { id: 11913, name: 'The SMISA Stadium', city: 'Paisley' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 848,
          name: 'UEFA Europa Conference League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/848.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 251,
            name: 'ST Mirren',
            logo: 'https://media.api-sports.io/football/teams/251.png',
            winner: null
          },
          away: {
            id: 319,
            name: 'Brann',
            logo: 'https://media.api-sports.io/football/teams/319.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Olympics Men': {
    matches: [
      {
        fixture: {
          id: 1280854,
          referee: 'Ramon Abatti Abel, Brazil',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T17:00:00+02:00',
          timestamp: 1723129200,
          periods: { first: null, second: null },
          venue: {
            id: 662,
            name: 'Stade de la Beaujoire - Louis Fonteneau',
            city: 'Nantes'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 480,
          name: 'Olympics Men',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/480.png',
          flag: null,
          season: 2024,
          round: '3rd Place Final'
        },
        teams: {
          home: {
            id: 10172,
            name: 'Egypt U23',
            logo: 'https://media.api-sports.io/football/teams/10172.png',
            winner: null
          },
          away: {
            id: 10179,
            name: 'Morocco U23',
            logo: 'https://media.api-sports.io/football/teams/10179.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'DBU Pokalen': {
    matches: [
      {
        fixture: {
          id: 1228232,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: {
            id: 18831,
            name: 'Solrød Sports Centre',
            city: 'Solrød Strand'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 121,
          name: 'DBU Pokalen',
          country: 'Denmark',
          logo: 'https://media.api-sports.io/football/leagues/121.png',
          flag: 'https://media.api-sports.io/flags/dk.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 14575,
            name: 'Solrød',
            logo: 'https://media.api-sports.io/football/teams/14575.png',
            winner: null
          },
          away: {
            id: 11501,
            name: 'FC Nakskov',
            logo: 'https://media.api-sports.io/football/teams/11501.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1228251,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T18:00:00+02:00',
          timestamp: 1723132800,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Ejbyskolen', city: 'Odense Sø' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 121,
          name: 'DBU Pokalen',
          country: 'Denmark',
          logo: 'https://media.api-sports.io/football/leagues/121.png',
          flag: 'https://media.api-sports.io/flags/dk.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 11494,
            name: 'BiH Odense',
            logo: 'https://media.api-sports.io/football/teams/11494.png',
            winner: null
          },
          away: {
            id: 6051,
            name: 'SGI',
            logo: 'https://media.api-sports.io/football/teams/6051.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1228252,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: null, name: 'Bellinge Stadion', city: 'Odense' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 121,
          name: 'DBU Pokalen',
          country: 'Denmark',
          logo: 'https://media.api-sports.io/football/leagues/121.png',
          flag: 'https://media.api-sports.io/flags/dk.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 24212,
            name: 'BBB',
            logo: 'https://media.api-sports.io/football/teams/24212.png',
            winner: null
          },
          away: {
            id: 17247,
            name: 'Give Fremad',
            logo: 'https://media.api-sports.io/football/teams/17247.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'UEFA Europa League': {
    matches: [
      {
        fixture: {
          id: 1274777,
          referee: 'K. Tohver',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 20189, name: 'Papara Park', city: 'Trabzon' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 998,
            name: 'Trabzonspor',
            logo: 'https://media.api-sports.io/football/teams/998.png',
            winner: null
          },
          away: {
            id: 781,
            name: 'Rapid Vienna',
            logo: 'https://media.api-sports.io/football/teams/781.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274779,
          referee: 'Luís Godinho',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 1184, name: 'Aker Stadion', city: 'Molde' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 329,
            name: 'Molde',
            logo: 'https://media.api-sports.io/football/teams/329.png',
            winner: null
          },
          away: {
            id: 741,
            name: 'Cercle Brugge',
            logo: 'https://media.api-sports.io/football/teams/741.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274785,
          referee: 'O. Berka',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:00:00+02:00',
          timestamp: 1723136400,
          periods: { first: null, second: null },
          venue: { id: 2609, name: 'Tórsvøllur', city: 'Tórshavn, Streymoy' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 701,
            name: 'KI Klaksvik',
            logo: 'https://media.api-sports.io/football/teams/701.png',
            winner: null
          },
          away: {
            id: 3364,
            name: 'Borac Banja Luka',
            logo: 'https://media.api-sports.io/football/teams/3364.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1253321,
          referee: 'S. Gishamer',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 18644,
            name: 'Košická futbalová aréna',
            city: 'Košice'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 6489,
            name: 'Kryvbas KR',
            logo: 'https://media.api-sports.io/football/teams/6489.png',
            winner: null
          },
          away: {
            id: 567,
            name: 'Plzen',
            logo: 'https://media.api-sports.io/football/teams/567.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274775,
          referee: 'A. Sidiropoulos',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 423, name: 'Stadion HNK Rijeka', city: 'Rijeka' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 561,
            name: 'HNK Rijeka',
            logo: 'https://media.api-sports.io/football/teams/561.png',
            winner: null
          },
          away: {
            id: 372,
            name: 'IF elfsborg',
            logo: 'https://media.api-sports.io/football/teams/372.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274781,
          referee: 'F. Glova',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: null,
            name: 'Olympiako Stadio Spyros Louis',
            city: 'Athens'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 617,
            name: 'Panathinaikos',
            logo: 'https://media.api-sports.io/football/teams/617.png',
            winner: null
          },
          away: {
            id: 194,
            name: 'Ajax',
            logo: 'https://media.api-sports.io/football/teams/194.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274787,
          referee: 'I. Frid',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 2618,
            name: 'Estadi Nacional',
            city: 'Andorra la Vella'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 703,
            name: 'UE Santa Coloma',
            logo: 'https://media.api-sports.io/football/teams/703.png',
            winner: null
          },
          away: {
            id: 4160,
            name: 'Rīgas FS',
            logo: 'https://media.api-sports.io/football/teams/4160.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274789,
          referee: 'S. van der Eijk',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 1424, name: 'Stadion Partizana', city: 'Beograd' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 573,
            name: 'FK Partizan',
            logo: 'https://media.api-sports.io/football/teams/573.png',
            winner: null
          },
          away: {
            id: 606,
            name: 'FC Lugano',
            logo: 'https://media.api-sports.io/football/teams/606.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1273692,
          referee: 'D. Sylwestrzak',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:15:00+02:00',
          timestamp: 1723140900,
          periods: { first: null, second: null },
          venue: { id: 3332, name: "Stadion Z'dežele", city: 'Celje' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 4360,
            name: 'Celje',
            logo: 'https://media.api-sports.io/football/teams/4360.png',
            winner: null
          },
          away: {
            id: 652,
            name: 'Shamrock Rovers',
            logo: 'https://media.api-sports.io/football/teams/652.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274791,
          referee: 'N. Minaković',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:45:00+02:00',
          timestamp: 1723142700,
          periods: { first: null, second: null },
          venue: { id: 805, name: 'Városi Stadion', city: 'Mezőkövesd' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 394,
            name: 'Dinamo Minsk',
            logo: 'https://media.api-sports.io/football/teams/394.png',
            winner: null
          },
          away: {
            id: 667,
            name: 'Lincoln Red Imps FC',
            logo: 'https://media.api-sports.io/football/teams/667.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1274783,
          referee: 'G. Kruashvili',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T21:30:00+02:00',
          timestamp: 1723145400,
          periods: { first: null, second: null },
          venue: {
            id: 1291,
            name: 'Estádio Municipal de Braga',
            city: 'Braga'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 3,
          name: 'UEFA Europa League',
          country: 'World',
          logo: 'https://media.api-sports.io/football/leagues/3.png',
          flag: null,
          season: 2024,
          round: '3rd Qualifying Round'
        },
        teams: {
          home: {
            id: 217,
            name: 'SC Braga',
            logo: 'https://media.api-sports.io/football/teams/217.png',
            winner: null
          },
          away: {
            id: 2184,
            name: 'Servette FC',
            logo: 'https://media.api-sports.io/football/teams/2184.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Landesliga - Steiermark': {
    matches: [
      {
        fixture: {
          id: 1245847,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:30:00+02:00',
          timestamp: 1723138200,
          periods: { first: null, second: null },
          venue: { id: 140, name: 'PROfertil ARENA', city: 'Hartberg' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 229,
          name: 'Landesliga - Steiermark',
          country: 'Austria',
          logo: 'https://media.api-sports.io/football/leagues/229.png',
          flag: 'https://media.api-sports.io/flags/at.svg',
          season: 2024,
          round: 'Steiermark - 2'
        },
        teams: {
          home: {
            id: 21729,
            name: 'FSC Hochegger Dächer',
            logo: 'https://media.api-sports.io/football/teams/21729.png',
            winner: null
          },
          away: {
            id: 4934,
            name: 'Allerheiligen',
            logo: 'https://media.api-sports.io/football/teams/4934.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Copa Rio': {
    matches: [
      {
        fixture: {
          id: 1200684,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T19:45:00+02:00',
          timestamp: 1723139100,
          periods: { first: null, second: null },
          venue: {
            id: 208,
            name: 'Estádio Antônio Ferreira de Medeiros',
            city: 'Cardoso Moreira, Rio de Janeiro'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 1035,
          name: 'Copa Rio',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/1035.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: '1st Round'
        },
        teams: {
          home: {
            id: 2203,
            name: 'Americano Campos',
            logo: 'https://media.api-sports.io/football/teams/2203.png',
            winner: null
          },
          away: {
            id: 23665,
            name: 'Zinza',
            logo: 'https://media.api-sports.io/football/teams/23665.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Liga Profesional Argentina': {
    matches: [
      {
        fixture: {
          id: 1158797,
          referee: 'N. Lamolina',
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: {
            id: 37,
            name: 'Estadio Diego Armando Maradona',
            city: 'Capital Federal, Ciudad de Buenos Aires'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 128,
          name: 'Liga Profesional Argentina',
          country: 'Argentina',
          logo: 'https://media.api-sports.io/football/leagues/128.png',
          flag: 'https://media.api-sports.io/flags/ar.svg',
          season: 2024,
          round: '2nd Phase - 10'
        },
        teams: {
          home: {
            id: 458,
            name: 'Argentinos JRS',
            logo: 'https://media.api-sports.io/football/teams/458.png',
            winner: null
          },
          away: {
            id: 474,
            name: 'Sarmiento Junin',
            logo: 'https://media.api-sports.io/football/teams/474.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  '1. Deild': {
    matches: [
      {
        fixture: {
          id: 1173784,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T20:00:00+02:00',
          timestamp: 1723140000,
          periods: { first: null, second: null },
          venue: { id: 3189, name: 'Skansi Arena', city: 'Argir, Streymoy' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 366,
          name: '1. Deild',
          country: 'Faroe-Islands',
          logo: 'https://media.api-sports.io/football/leagues/366.png',
          flag: 'https://media.api-sports.io/flags/fo.svg',
          season: 2024,
          round: 'Regular Season - 18'
        },
        teams: {
          home: {
            id: 4184,
            name: 'AB',
            logo: 'https://media.api-sports.io/football/teams/4184.png',
            winner: null
          },
          away: {
            id: 4181,
            name: 'NSÍ II',
            logo: 'https://media.api-sports.io/football/teams/4181.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1152853,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T21:15:00+02:00',
          timestamp: 1723144500,
          periods: { first: null, second: null },
          venue: {
            id: 20543,
            name: 'Fagverksvöllurinn Varmá Gervigras',
            city: 'Mosfellsbær'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 165,
          name: '1. Deild',
          country: 'Iceland',
          logo: 'https://media.api-sports.io/football/leagues/165.png',
          flag: 'https://media.api-sports.io/flags/is.svg',
          season: 2024,
          round: 'Regular Season - 16'
        },
        teams: {
          home: {
            id: 3514,
            name: 'Afturelding',
            logo: 'https://media.api-sports.io/football/teams/3514.png',
            winner: null
          },
          away: {
            id: 2114,
            name: 'Leiknir R.',
            logo: 'https://media.api-sports.io/football/teams/2114.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1152854,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T21:15:00+02:00',
          timestamp: 1723144500,
          periods: { first: null, second: null },
          venue: {
            id: 19615,
            name: 'HS Orku völlurinn',
            city: 'Keflavík, Reykjanesbær'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 165,
          name: '1. Deild',
          country: 'Iceland',
          logo: 'https://media.api-sports.io/football/leagues/165.png',
          flag: 'https://media.api-sports.io/flags/is.svg',
          season: 2024,
          round: 'Regular Season - 16'
        },
        teams: {
          home: {
            id: 269,
            name: 'Keflavik',
            logo: 'https://media.api-sports.io/football/teams/269.png',
            winner: null
          },
          away: {
            id: 277,
            name: 'Grindavik',
            logo: 'https://media.api-sports.io/football/teams/277.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Úrvalsdeild': {
    matches: [
      {
        fixture: {
          id: 1152214,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T21:15:00+02:00',
          timestamp: 1723144500,
          periods: { first: null, second: null },
          venue: { id: 824, name: 'Kórinn', city: 'Kópavogur' },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 164,
          name: 'Úrvalsdeild',
          country: 'Iceland',
          logo: 'https://media.api-sports.io/football/leagues/164.png',
          flag: 'https://media.api-sports.io/flags/is.svg',
          season: 2024,
          round: 'Regular Season - 17'
        },
        teams: {
          home: {
            id: 2113,
            name: 'HK Kopavogur',
            logo: 'https://media.api-sports.io/football/teams/2113.png',
            winner: null
          },
          away: {
            id: 271,
            name: 'KR Reykjavik',
            logo: 'https://media.api-sports.io/football/teams/271.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'CBF Brasileiro U20': {
    matches: [
      {
        fixture: {
          id: 1190374,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:00:00+02:00',
          timestamp: 1723150800,
          periods: { first: null, second: null },
          venue: {
            id: 237,
            name: 'Estádio Municipal Presidente Getúlio Vargas',
            city: 'Fortaleza, Ceará'
          },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 740,
          name: 'CBF Brasileiro U20',
          country: 'Brazil',
          logo: 'https://media.api-sports.io/football/leagues/740.png',
          flag: 'https://media.api-sports.io/flags/br.svg',
          season: 2024,
          round: '1st Phase - 17'
        },
        teams: {
          home: {
            id: 12956,
            name: 'Ceará U20',
            logo: 'https://media.api-sports.io/football/teams/12956.png',
            winner: null
          },
          away: {
            id: 11054,
            name: 'Flamengo U20',
            logo: 'https://media.api-sports.io/football/teams/11054.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  },
  'Reserve League': {
    matches: [
      {
        fixture: {
          id: 1222526,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:00:00+02:00',
          timestamp: 1723150800,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 906,
          name: 'Reserve League',
          country: 'Argentina',
          logo: 'https://media.api-sports.io/football/leagues/906.png',
          flag: 'https://media.api-sports.io/flags/ar.svg',
          season: 2024,
          round: '2nd Phase - 3'
        },
        teams: {
          home: {
            id: 22938,
            name: 'Independiente Riva. Res.',
            logo: 'https://media.api-sports.io/football/teams/22938.png',
            winner: null
          },
          away: {
            id: 18702,
            name: 'Vélez Sársfield Res.',
            logo: 'https://media.api-sports.io/football/teams/18702.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1222527,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:00:00+02:00',
          timestamp: 1723150800,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 906,
          name: 'Reserve League',
          country: 'Argentina',
          logo: 'https://media.api-sports.io/football/leagues/906.png',
          flag: 'https://media.api-sports.io/flags/ar.svg',
          season: 2024,
          round: '2nd Phase - 3'
        },
        teams: {
          home: {
            id: 18699,
            name: 'Talleres Córdoba Res.',
            logo: 'https://media.api-sports.io/football/teams/18699.png',
            winner: null
          },
          away: {
            id: 18687,
            name: 'Godoy Cruz Res.',
            logo: 'https://media.api-sports.io/football/teams/18687.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      },
      {
        fixture: {
          id: 1222528,
          referee: null,
          timezone: 'Europe/Copenhagen',
          date: '2024-08-08T23:00:00+02:00',
          timestamp: 1723150800,
          periods: { first: null, second: null },
          venue: { id: null, name: null, city: null },
          status: { long: 'Not Started', short: 'NS', elapsed: null }
        },
        league: {
          id: 906,
          name: 'Reserve League',
          country: 'Argentina',
          logo: 'https://media.api-sports.io/football/leagues/906.png',
          flag: 'https://media.api-sports.io/flags/ar.svg',
          season: 2024,
          round: '2nd Phase - 3'
        },
        teams: {
          home: {
            id: 18695,
            name: 'River Plate Res.',
            logo: 'https://media.api-sports.io/football/teams/18695.png',
            winner: null
          },
          away: {
            id: 18694,
            name: 'Racing Club Res.',
            logo: 'https://media.api-sports.io/football/teams/18694.png',
            winner: null
          }
        },
        goals: { home: null, away: null },
        score: {
          halftime: { home: null, away: null },
          fulltime: { home: null, away: null },
          extratime: { home: null, away: null },
          penalty: { home: null, away: null }
        }
      }
    ]
  }
};

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
              <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400 dark:bg-custom-gray2 dark:hover:bg-custom-gray">
                <Image
                  src={arrow}
                  alt="arrow"
                  width={11}
                  height={11}
                  style={{ width: "11px", height: "11px" }}
                  className="rotate-90 dark:invert"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center hover:cursor-pointer">
                <h1 className="text-base font-medium dark:text-white">{date}</h1>
                <Image
                  src={trianlge}
                  alt="change date"
                  width={16}
                  height={16}
                  style={{ width: "16px", height: "16px" }}
                  className="ml-3 dark:invert"
                />
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray2 dark:hover:bg-custom-gray">
              <Image
                src={arrow}
                alt="arrow"
                width={11}
                height={11}
                style={{ width: "11px", height: "11px" }}
                className="rotate-270 dark:invert"
              />
            </div>
          </div>
          <hr className="dark:border-custom-gray2"/>
        </div>

        <div className="w-full h-aut rounded-xl pb-4 dark:border-0 mt-4">
          <div>
            {leagueKeys.map((leagueName: string, leagueIndex: number) => {
              // 변수[키값]을 통해 해당하는 리그의 경기 데이터를 모두 가져옴
              const leagueMatch = groupedByLeague[leagueName].matches;

              return (
                <ul key={leagueIndex} className="bg-white border-solid border border-slate-200 mt-5 rounded-xl dark:border-0 dark:bg-custom-dark">
                  <div className="p-4 bg-slate-100 rounded-t-xl flex cursor-pointer hover:bg-slate-200 dark:bg-custom-lightDark dark:hover:bg-custom-gray3">
                    <Image src={leagueMatch[0].league.logo} alt={leagueMatch[0].league.name} width={16} height={16} style={{ "width":"16px", "height":"16px"}}
                    className="mx-2"/>
                    <h1 className="text-sm font-medium ml-3 dark:text-white">{leagueName}</h1>
                  </div>
                  {leagueMatch.map((match: any, matchIndex: number) => {
                    //시작안함
                    const scheduled = ["TBD", "NS"];

                    // 경기중 (하프타임 브레이킹타임 포함)
                    const live = ["1H", "2H", "ET", "P", "LIVE", "HT", "BT"];

                    //심판 자의로 경기중단
                    const stop = ["SUSP", "INT"];

                    //경기 끝
                    const finish = ["FT", "AET", "PEN"];

                    // 경기 취소 및 연기
                    const cancle = ["PST", "CANC", "ABD"];



                    // 부전승
                    const unearned = ["AWD", "WO"];

                    // 매치시간 (경기가 스케줄되었을떄)
                    const matchTime = new Date(match.fixture.date).toString().substring(16,21);

                    // 스코어 (경기중일때)
                    const liveScore = `${match.goals.home} - ${match.goals.away}`;
                    
                    return (
                      <li key={matchIndex} className="flex px-4 py-5 text-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-custom-gray3 dark:hover:rounded-b-xl">
                        {/* 경기가 시작하지 않거나 취소 및 연기 */}
                        {scheduled.includes(match.fixture.status.short) || cancle.includes(match.fixture.status.short)  ? (
                          <div className="w-7 h-5" />
                        ) : // 경기가 진행중이라면
                        live.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5 rounded-full bg-green-600 flex justify-center items-center">
                            <h1 className="text-white text-xs">
                              {match.fixture.status.elapsed}
                            </h1>
                          </div>
                        ) : // 경기가 잠시 멈췄다면
                        stop.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2">
                            <h1 className="text-white text-xs dark:text-gray-200">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : //경기가 끝났을 경우
                        finish.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2">
                            <h1 className="text-white text-xs dark:text-gray-200">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : // 부전승이 일어났을경우
                        unearned.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5 rounded-full bg-slate-300 flex justify-center items-center dark:bg-custom-gray2">
                            <h1 className="text-white text-xs dark:text-gray-200">
                              {match.fixture.status.short}
                            </h1>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="w-full flex justify-center mr-7">
                          <div className="flex w-[300px] justify-end">
                          <h1 className="dark:text-white">{match.teams.home.name}</h1>
                          <Image
                            src={match.teams.home.logo}
                            alt={match.teams.home.name}
                            width={15}
                            height={15}
                            className="ml-5"
                          />
                          </div>
                          {/* 경기가 시작하지않았다면 */}
                          {scheduled.includes(match.fixture.status.short) ? (
                            <div className="w-[80px] flex justify-center">
                            <h1  className="dark:text-white">
                              {matchTime}
                            </h1>
                            </div>
                            // 경기가 진행중, 중단, 끝났을때
                          ):live.includes(match.fixture.status.short) || stop.includes(match.fixture.status.short) || finish.includes(match.fixture.status.short) || unearned.includes(match.fixture.status.short) ?  (
                            <div className="w-[80px] flex justify-center">
                            <h1  className="dark:text-white">
                              {liveScore}
                            </h1>
                            </div>
                            // 경기가 중단 및 연기되었을떄
                          ):cancle.includes(match.fixture.status.short) ? (
                            <div className="w-[80px] flex justify-center">
                            <h1  className="dark:text-white">
                              {matchTime}
                            </h1>
                            </div>
                          ):(
                            <></>
                          )}
                          <div className="flex w-[300px]">
                          <Image
                            src={match.teams.away.logo}
                            alt={match.teams.away.name}
                            width={15}
                            height={15}
                            className="mr-5"
                          />
                          <h1  className="dark:text-white">{match.teams.away.name}</h1>
                          </div>
                        </div>
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
