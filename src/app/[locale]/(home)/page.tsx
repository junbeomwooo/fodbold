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

  // const data = await response.json();
  // console.log("AHAHAHHA");
  // console.log(data?.errors?.requests);

  return response.json();
};

export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  /** epl 스탠딩 받아오기 */
  const [standing] = (await getStanding(39)).response;

  /** 전 세계 리그정보 가져오기 */
  const leagueData = (await getAllLeagues()).response;

  return <Main standing={standing} locale={locale} leagueData={leagueData} />;
}
