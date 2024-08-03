import Fotmob from "fotmob";
import nowTimezone from "../../lib/nowTimezone";

const FOOTBALL_URL = "https://v3.football.api-sports.io";
const GEOLOCATION_URL = "https://api.ipgeolocation.io/ipgeo";

const getLocation = async () => {
  const response = await fetch(
    `${GEOLOCATION_URL}?apiKey=${process.env.GEOLOCATION_API_KEY}`
  );
  return response.json();
};

const getTodayMatches = async (timezone: string) => {
  const date = nowTimezone(timezone);

  const response = await fetch(
    `${FOOTBALL_URL}/fixtures?date=${date}&timezone=${timezone}`,
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
  // const fotmob = new Fotmob();

  /** 접속한 인터넷의 ip를 통해 국가를 알아내고 타임존 적용시킨 데이터 반환하기 */
  // const timezone =
  //   (await getLocation())?.time_zone?.name || "Europe/Copenhagen";
  // const { response } = await getTodayMatches(timezone);
  // console.log(response);

  /** 뉴스가져오기(fotmob)  */
  // let worldNews = await fotmob.getWorldNews();
  // console.log(worldNews);

  return (
    <div>
      {/* {response.map((v:any,i:number) => (
        <h1 key={i}>{v.fixture.id}</h1>
      ))} */}
    </div>
  );
}
