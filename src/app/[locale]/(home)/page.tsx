/** 메인페이지 */
import League from "@/components/main/leagues";
import Standing from "@/components/main/standing";
import Fixtures from "@/components/main/fixtures";

export const FOOTBALL_URL = "https://v3.football.api-sports.io";
export const FOOTBALL_IMAGE = "https://media.api-sports.io/football";
export const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

// 메인페이지 최신시즌값 자동으로 받아온후 해당시즌에 대한 스탠딩값 가져오기
/** 해당 리그 id를 통한 리그 스탠딩 데이터 받아오기 */
const getStanding = async (id: number) => {
  const year = await fetch(`${FOOTBALL_URL}/leagues?id=${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": `${process.env.FOOTBALL_API_KEY}`,
    },
  });
  console.group("YEAR &&&&&&");
  console.log(year);
  console.groupEnd();

  const response = await fetch(
    `${FOOTBALL_URL}/standings?league=${id}&season=${year}`,
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

  return response.json();
};

export default async function page() {
  /** epl 스탠딩 받아오기 */
  const [standing] = (await getStanding(39)).response;
  // const [stands] = standing?.league?.standings;

  /** 전 세계 리그정보 가져오기 */
  const leagueData = (await getAllLeagues()).response;

  /** 지울 데이터 (데이터 통신 대용으로 사용중)*/

  return (
    <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block max-msm:px-4">
      <League leagueData={leagueData} />
      <Fixtures />
      {/* <Standing stands={stands} /> */}
    </div>
  );
}
