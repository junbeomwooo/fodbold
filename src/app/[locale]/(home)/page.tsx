/** 메인페이지 */
import League from "@/components/main/leagues";
import Standing from "@/components/main/standing";
import Fixtures from "@/components/main/fixtures";
import Main from "@/components/main/main";

export const FOOTBALL_URL = "https://v3.football.api-sports.io";
export const FOOTBALL_IMAGE = "https://media.api-sports.io/football";
export const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

// 메인페이지 최신시즌값 자동으로 받아온후 해당시즌에 대한 스탠딩값 가져오기
/** 해당 리그 id를 통한 리그 스탠딩 데이터 받아오기 */
const getStanding = async (id: number) => {
  // const year = await fetch(`${FOOTBALL_URL}/leagues?id=${id}`, {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-host": "v3.football.api-sports.io",
  //     "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
  //   },
  // });

  // // chnage to JSON
  // const yearJSON = await year.json();

  // // latest season data
  // const yearData = yearJSON?.response[0]?.seasons?.at(-1)?.year;


  /** 
   * 1. 모든 데이터를 잘 받아오는 지 확인 메인페이지 및 fixtureOverView 에서 
   * 2. 에러 핸들링이 메인페이지에서 분당 , 하루 할당량 넘었을 경우 잘 작동하는지 확인
   * 3. 그 이후 fixtureOverView에서도 잘작동하는 지 확인
   * 4. 모두 잘 작동한다면 나머지 에러 핸들링도 구현
   * 현재까지 메인페이지의 page.tsx , fixtureOverView 까지 에러 핸들링 구현 완료 
   * */

  const response = await fetch(
    `${FOOTBALL_URL}/standings?league=${id}&season=2024`,
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
const getAllLeagues = async () => {
  const response = await fetch(`${FOOTBALL_URL}/leagues?current=true`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
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

  return response.json();
};

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  try {
    /** epl 스탠딩 받아오기 */
    const [standing] = (await getStanding(39)).response;

    /** 전 세계 리그정보 가져오기 */
    const leagueData = (await getAllLeagues()).response;

    return <Main standing={standing} locale={locale} leagueData={leagueData} />;
  } catch (error) {
    console.error(error);
    return <Main locale={locale} error={(error as Error).message} />;
  }
}
