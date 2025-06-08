/** 메인페이지 */
import League from "@/components/main/leagues";
import Standing from "@/components/main/standing";
import Fixtures from "@/components/main/fixtures";
import Main from "@/components/main/main";

import { FOOTBALL_URL } from "@/constants/api";

// 메인페이지 최신시즌값 자동으로 받아온후 해당시즌에 대한 스탠딩값 가져오기
/** 해당 리그 id를 통한 리그 스탠딩 데이터 받아오기 */
const getStanding = async (id: number) => {
  // const year = await fetch(`${FOOTBALL_URL}/leagues?id=${id}`, {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-host": "v3.football.api-sports.io",
  //     "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
  //   },
  // });

  // // chnage to JSON
  // const yearJSON = await year.json();

  // console.log(yearJSON);

  // // latest season data
  // const yearData = yearJSON?.response[0]?.seasons?.at(-1)?.year;

  const response = await fetch(
    `${FOOTBALL_URL}/standings?league=${id}&season=2024`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
      },
    }
  );

  /** API가 일일 한도치 또는 분당 한도치에 초과하였을 경우 알림메세지 보여주기 */
  const data = await response.json();

  if (data?.errors?.rateLimit) {
    throw new Error("Too Many Requests");
  }

  if (data?.errors?.requests) {
    throw new Error("API Limit Reached");
  }

  return data;
};

/** 모든 리그 정보 받아오기 */
const getAllLeagues = async () => {
  const response = await fetch(`${FOOTBALL_URL}/leagues?current=true`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
    },
  });

  /** API가 일일 한도치 또는 분당 한도치에 초과하였을 경우 알림메세지 보여주기 */
  const data = await response.json();

  if (data?.errors?.rateLimit) {
    throw new Error("Too Many Requests");
  }

  if (data?.errors?.requests) {
    throw new Error("API Limit Reached");
  }

  return data;
};

/**
  main ,match , league, teams, players
 * */

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  try {
    /** epl 스탠딩 받아오기 */
    const [standing] = (await getStanding(39)).response;

    console.log(standing);

    /** 전 세계 리그정보 가져오기 */
    const leagueData = (await getAllLeagues()).response;

    return <Main standing={standing} locale={locale} leagueData={leagueData} />;
  } catch (error) {
    console.error(error);
    return <Main locale={locale} error={(error as Error).message} />;
  }
}
