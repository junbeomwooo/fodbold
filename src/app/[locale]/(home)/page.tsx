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
    `${FOOTBALL_URL}/standings?league=${id}&season=${year}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        // "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
      },
    }
  );

  return response.json();
};

/** 모든 리그 정보 받아오기 */
const getAllLeagues = async (year: number) => {
  if (year) {
    const response = await fetch(`${FOOTBALL_URL}/leagues?season=${year}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
      },
    });

    return response.json();
  }
};

export default async function page() {
  /** 현재 년도 가져오기 */
  const year = new Date().getFullYear();

  /** epl 스탠딩 받아오기 */
  // const [standing] = (await getStanding(39,year)).response;
  // const [stands] = standing?.league?.standings;

  /** 전 세계 리그정보 가져오기 */
  // const leagueData = (await getAllLeagues(year)).response;

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
  
  const leagueData = [
    {
      league: {
        id: 343,
        name: "First League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/343.png",
      },
      country: {
        name: "Armenia",
        code: "AM",
        flag: "https://media.api-sports.io/flags/am.svg",
      },
    },
    {
      league: {
        id: 701,
        name: "Liga Revelação U23",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/701.png",
      },
      country: {
        name: "Portugal",
        code: "PT",
        flag: "https://media.api-sports.io/flags/pt.svg",
      },
    },
    {
      league: {
        id: 761,
        name: "Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/761.png",
      },
      country: {
        name: "Liechtenstein",
        code: "LI",
        flag: "https://media.api-sports.io/flags/li.svg",
      },
    },
    {
      league: {
        id: 12,
        name: "CAF Champions League",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/12.png",
      },
      country: { name: "World", code: null, flag: null },
    },
    {
      league: {
        id: 492,
        name: "Tweede Divisie",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/492.png",
      },
      country: {
        name: "Netherlands",
        code: "NL",
        flag: "https://media.api-sports.io/flags/nl.svg",
      },
    },
    {
      league: {
        id: 186,
        name: "Ligue 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/186.png",
      },
      country: {
        name: "Algeria",
        code: "DZ",
        flag: "https://media.api-sports.io/flags/dz.svg",
      },
    },
    {
      league: {
        id: 854,
        name: "WE League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/854.png",
      },
      country: {
        name: "Japan",
        code: "JP",
        flag: "https://media.api-sports.io/flags/jp.svg",
      },
    },
    {
      league: {
        id: 1025,
        name: "Second League A - Fall Season Gold",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/1025.png",
      },
      country: {
        name: "Russia",
        code: "RU",
        flag: "https://media.api-sports.io/flags/ru.svg",
      },
    },
    {
      league: {
        id: 1026,
        name: "Second League A - Fall Season Silver",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/1026.png",
      },
      country: {
        name: "Russia",
        code: "RU",
        flag: "https://media.api-sports.io/flags/ru.svg",
      },
    },
    {
      league: {
        id: 755,
        name: "Oberliga - Nordost-Süd",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/755.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 754,
        name: "Oberliga - Nordost-Nord",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/754.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 751,
        name: "Oberliga - Niederrhein",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/751.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 752,
        name: "Oberliga - Rheinland-Pfalz / Saar",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/752.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 753,
        name: "Oberliga - Baden-Württemberg",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/753.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 747,
        name: "Oberliga - Westfalen",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/747.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 85,
        name: "Regionalliga - Nordost",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/85.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 745,
        name: "Oberliga - Hamburg",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/745.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 86,
        name: "Regionalliga - SudWest",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/86.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 83,
        name: "Regionalliga - Bayern",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/83.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 938,
        name: "Oberliga - Bayern Nord",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/938.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 87,
        name: "Regionalliga - West",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/87.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 939,
        name: "Oberliga - Bayern Süd",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/939.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 744,
        name: "Oberliga - Schleswig-Holstein",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/744.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 20,
        name: "CAF Confederation Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/20.png",
      },
      country: { name: "World", code: null, flag: null },
    },
    {
      league: {
        id: 484,
        name: "Frauenliga",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/484.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 1041,
        name: "Júniores U19",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/1041.png",
      },
      country: {
        name: "Portugal",
        code: "PT",
        flag: "https://media.api-sports.io/flags/pt.svg",
      },
    },
    {
      league: {
        id: 234,
        name: "Liga Nacional",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/234.png",
      },
      country: {
        name: "Honduras",
        code: "HN",
        flag: "https://media.api-sports.io/flags/hn.svg",
      },
    },
    {
      league: {
        id: 263,
        name: "Liga de Expansión MX",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/263.png",
      },
      country: {
        name: "Mexico",
        code: "MX",
        flag: "https://media.api-sports.io/flags/mx.svg",
      },
    },
    {
      league: {
        id: 924,
        name: "Piala Presiden",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/924.png",
      },
      country: {
        name: "Indonesia",
        code: "ID",
        flag: "https://media.api-sports.io/flags/id.svg",
      },
    },
    {
      league: {
        id: 506,
        name: "2. liga",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/506.png",
      },
      country: {
        name: "Slovakia",
        code: "SK",
        flag: "https://media.api-sports.io/flags/sk.svg",
      },
    },
    {
      league: {
        id: 229,
        name: "Landesliga - Steiermark",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/229.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 645,
        name: "3. liga - East",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/645.png",
      },
      country: {
        name: "Slovakia",
        code: "SK",
        flag: "https://media.api-sports.io/flags/sk.svg",
      },
    },
    {
      league: {
        id: 715,
        name: "DFB Junioren Pokal",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/715.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 675,
        name: "U21 Divisie 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/675.png",
      },
      country: {
        name: "Netherlands",
        code: "NL",
        flag: "https://media.api-sports.io/flags/nl.svg",
      },
    },
    {
      league: {
        id: 948,
        name: "1a Divisão - Women",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/948.png",
      },
      country: {
        name: "Portugal",
        code: "PT",
        flag: "https://media.api-sports.io/flags/pt.svg",
      },
    },
    {
      league: {
        id: 533,
        name: "CAF Super Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/533.png",
      },
      country: { name: "World", code: null, flag: null },
    },
    {
      league: {
        id: 644,
        name: "3. liga - West",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/644.png",
      },
      country: {
        name: "Slovakia",
        code: "SK",
        flag: "https://media.api-sports.io/flags/sk.svg",
      },
    },
    {
      league: {
        id: 232,
        name: "Landesliga - Wien",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/232.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 230,
        name: "Landesliga - Tirol",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/230.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 226,
        name: "Landesliga - Niederosterreich",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/226.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 225,
        name: "Landesliga - Karnten",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/225.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 224,
        name: "Landesliga - Burgenland",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/224.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 227,
        name: "Landesliga - Oberosterreich",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/227.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 231,
        name: "Landesliga - Vorarlbergliga",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/231.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 228,
        name: "Landesliga - Salzburg",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/228.png",
      },
      country: {
        name: "Austria",
        code: "AT",
        flag: "https://media.api-sports.io/flags/at.svg",
      },
    },
    {
      league: {
        id: 748,
        name: "Oberliga - Niedersachsen",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/748.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 84,
        name: "Regionalliga - Nord",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/84.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 138,
        name: "Serie C - Girone A",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/138.png",
      },
      country: {
        name: "Italy",
        code: "IT",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
    },
    {
      league: {
        id: 943,
        name: "Serie C - Girone C",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/943.png",
      },
      country: {
        name: "Italy",
        code: "IT",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
    },
    {
      league: {
        id: 942,
        name: "Serie C - Girone B",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/942.png",
      },
      country: {
        name: "Italy",
        code: "IT",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
    },
    {
      league: {
        id: 419,
        name: "Premyer Liqa",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/419.png",
      },
      country: {
        name: "Azerbaidjan",
        code: "AZ",
        flag: "https://media.api-sports.io/flags/az.svg",
      },
    },
    {
      league: {
        id: 197,
        name: "Super League 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/197.png",
      },
      country: {
        name: "Greece",
        code: "GR",
        flag: "https://media.api-sports.io/flags/gr.svg",
      },
    },
    {
      league: {
        id: 1128,
        name: "Brasileiro U17",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/1128.png",
      },
      country: {
        name: "Brazil",
        code: "BR",
        flag: "https://media.api-sports.io/flags/br.svg",
      },
    },
    {
      league: {
        id: 273,
        name: "Magyar Kupa",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/273.png",
      },
      country: {
        name: "Hungary",
        code: "HU",
        flag: "https://media.api-sports.io/flags/hu.svg",
      },
    },
    {
      league: {
        id: 396,
        name: "Primera Division",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/396.png",
      },
      country: {
        name: "Nicaragua",
        code: "NI",
        flag: "https://media.api-sports.io/flags/ni.svg",
      },
    },
    {
      league: {
        id: 559,
        name: "League Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/559.png",
      },
      country: {
        name: "Northern-Ireland",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 82,
        name: "Frauen Bundesliga",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/82.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 139,
        name: "Serie A Women",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/139.png",
      },
      country: {
        name: "Italy",
        code: "IT",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
    },
    {
      league: {
        id: 64,
        name: "Feminine Division 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/64.png",
      },
      country: {
        name: "France",
        code: "FR",
        flag: "https://media.api-sports.io/flags/fr.svg",
      },
    },
    {
      league: {
        id: 313,
        name: "2a Divisió",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/313.png",
      },
      country: {
        name: "Andorra",
        code: "AD",
        flag: "https://media.api-sports.io/flags/ad.svg",
      },
    },
    {
      league: {
        id: 556,
        name: "Super Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/556.png",
      },
      country: {
        name: "Spain",
        code: "ES",
        flag: "https://media.api-sports.io/flags/es.svg",
      },
    },
    {
      league: {
        id: 750,
        name: "Oberliga - Hessen",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/750.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 284,
        name: "Liga II",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/284.png",
      },
      country: {
        name: "Romania",
        code: "RO",
        flag: "https://media.api-sports.io/flags/ro.svg",
      },
    },
    {
      league: {
        id: 676,
        name: "Central Youth League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/676.png",
      },
      country: {
        name: "Poland",
        code: "PL",
        flag: "https://media.api-sports.io/flags/pl.svg",
      },
    },
    {
      league: {
        id: 410,
        name: "C-League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/410.png",
      },
      country: {
        name: "Cambodia",
        code: "KH",
        flag: "https://media.api-sports.io/flags/kh.svg",
      },
    },
    {
      league: {
        id: 63,
        name: "National 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/63.png",
      },
      country: {
        name: "France",
        code: "FR",
        flag: "https://media.api-sports.io/flags/fr.svg",
      },
    },
    {
      league: {
        id: 307,
        name: "Pro League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/307.png",
      },
      country: {
        name: "Saudi-Arabia",
        code: "SA",
        flag: "https://media.api-sports.io/flags/sa.svg",
      },
    },
    {
      league: {
        id: 91,
        name: "Eredivisie Women",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/91.png",
      },
      country: {
        name: "Netherlands",
        code: "NL",
        flag: "https://media.api-sports.io/flags/nl.svg",
      },
    },
    {
      league: {
        id: 297,
        name: "Thai League 2",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/297.png",
      },
      country: {
        name: "Thailand",
        code: "TH",
        flag: "https://media.api-sports.io/flags/th.svg",
      },
    },
    {
      league: {
        id: 178,
        name: "Third League - Southwest",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/178.png",
      },
      country: {
        name: "Bulgaria",
        code: "BG",
        flag: "https://media.api-sports.io/flags/bg.svg",
      },
    },
    {
      league: {
        id: 177,
        name: "Third League - Southeast",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/177.png",
      },
      country: {
        name: "Bulgaria",
        code: "BG",
        flag: "https://media.api-sports.io/flags/bg.svg",
      },
    },
    {
      league: {
        id: 749,
        name: "Oberliga - Bremen",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/749.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 370,
        name: "Primera Division",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/370.png",
      },
      country: {
        name: "El-Salvador",
        code: "SV",
        flag: "https://media.api-sports.io/flags/sv.svg",
      },
    },
    {
      league: {
        id: 931,
        name: "Non League Premier - Southern Central",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/931.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 705,
        name: "Campionato Primavera - 1",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/705.png",
      },
      country: {
        name: "Italy",
        code: "IT",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
    },
    {
      league: {
        id: 699,
        name: "Women's Championship",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/699.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 44,
        name: "FA WSL",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/44.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 746,
        name: "Oberliga - Mittelrhein",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/746.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 67,
        name: "National 2 - Group A",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/67.png",
      },
      country: {
        name: "France",
        code: "FR",
        flag: "https://media.api-sports.io/flags/fr.svg",
      },
    },
    {
      league: {
        id: 68,
        name: "National 2 - Group B",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/68.png",
      },
      country: {
        name: "France",
        code: "FR",
        flag: "https://media.api-sports.io/flags/fr.svg",
      },
    },
    {
      league: {
        id: 69,
        name: "National 2 - Group C",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/69.png",
      },
      country: {
        name: "France",
        code: "FR",
        flag: "https://media.api-sports.io/flags/fr.svg",
      },
    },
    {
      league: {
        id: 932,
        name: "Non League Div One - Northern East",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/932.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 52,
        name: "Non League Div One - Isthmian North",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/52.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 58,
        name: "Non League Premier - Isthmian",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/58.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 59,
        name: "Non League Premier - Northern",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/59.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 60,
        name: "Non League Premier - Southern South",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/60.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 56,
        name: "Non League Div One - Southern South",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/56.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 53,
        name: "Non League Div One - Isthmian South Central",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/53.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 57,
        name: "Non League Div One - Isthmian South East",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/57.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 54,
        name: "Non League Div One - Northern West",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/54.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 55,
        name: "Non League Div One - Northern Midlands",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/55.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 933,
        name: "Non League Div One - Southern Central",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/933.png",
      },
      country: {
        name: "England",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 958,
        name: "Copa Costa Rica",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/958.png",
      },
      country: {
        name: "Costa-Rica",
        code: "CR",
        flag: "https://media.api-sports.io/flags/cr.svg",
      },
    },
    {
      league: {
        id: 551,
        name: "Super Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/551.png",
      },
      country: {
        name: "Turkey",
        code: "TR",
        flag: "https://media.api-sports.io/flags/tr.svg",
      },
    },
    {
      league: {
        id: 181,
        name: "FA Cup",
        type: "Cup",
        logo: "https://media.api-sports.io/football/leagues/181.png",
      },
      country: {
        name: "Scotland",
        code: "GB",
        flag: "https://media.api-sports.io/flags/gb.svg",
      },
    },
    {
      league: {
        id: 356,
        name: "Second League",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/356.png",
      },
      country: {
        name: "Montenegro",
        code: "ME",
        flag: "https://media.api-sports.io/flags/me.svg",
      },
    },
    {
      league: {
        id: 204,
        name: "1. Lig",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/204.png",
      },
      country: {
        name: "Turkey",
        code: "TR",
        flag: "https://media.api-sports.io/flags/tr.svg",
      },
    },
    {
      league: {
        id: 1034,
        name: "2. Frauen Bundesliga",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/1034.png",
      },
      country: {
        name: "Germany",
        code: "DE",
        flag: "https://media.api-sports.io/flags/de.svg",
      },
    },
    {
      league: {
        id: 457,
        name: "Campeonato de Portugal Prio - Group A",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/457.png",
      },
      country: {
        name: "Portugal",
        code: "PT",
        flag: "https://media.api-sports.io/flags/pt.svg",
      },
    },
    {
      league: {
        id: 458,
        name: "Campeonato de Portugal Prio - Group B",
        type: "League",
        logo: "https://media.api-sports.io/football/leagues/458.png",
      },
      country: {
        name: "Portugal",
        code: "PT",
        flag: "https://media.api-sports.io/flags/pt.svg",
      },
    },
  ];

  return (
    <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block max-msm:px-6">
      <League leagueData={leagueData} />
      <Fixtures />
      <Standing stands={stands} />
    </div>
  );
}
