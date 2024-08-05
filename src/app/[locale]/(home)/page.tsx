import Fotmob from "fotmob";
import nowTimezone from "../../../lib/nowTimezone";
import React from "react";
import Image from "next/image";

const FOOTBALL_URL = "https://v3.football.api-sports.io";
const FOOTBALL_IMAGE = "https://media.api-sports.io/football";
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
    <div className="flex w-full h-full px-24 pt-28 dark:bg-black">
      <div className="bg-black w-1/5 h-screen">
        <div className="w-full h-auto bg-white rounded-2xl border-solid border-2 border-slate-200 p-6">
          <h1 className="text-base font-medium">Top Leagues</h1>
          <ul>
            <li className="flex mt-7">
              <Image src={`${FOOTBALL_IMAGE}/leagues/39.png`} alt="Premier League" width={16} height={16} />
              <h2 className="text-sm ml-5">Premier League</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/140.png`} alt="La Liga" width={16} height={16} />
              <h2 className="text-sm ml-5">La Liga</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/78.png`} alt="Bundesliga" width={16} height={16} />
              <h2 className="text-sm ml-5">Bundesliga</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/135.png`} alt="Serie A" width={16} height={16} />
              <h2 className="text-sm ml-5">Serie A</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/61.png`} alt="Ligue 1" width={16} height={16} />
              <h2 className="text-sm ml-5">Ligue 1</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/2.png`} alt="Champions League" width={16} height={16} />
              <h2 className="text-sm ml-5">Champions League</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/3.png`} alt="Europa League" width={16} height={16} />
              <h2 className="text-sm ml-5">Europa League</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/1.png`} alt="World Cup" width={16} height={16} />
              <h2 className="text-sm ml-5">World Cup</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/4.png`} alt="Euro Championship" width={16} height={16} />
              <h2 className="text-sm ml-5">Euro Championship</h2>
            </li>
            <li className="flex mt-5">
              <Image src={`${FOOTBALL_IMAGE}/leagues/9.png`} alt="Copa America" width={16} height={16} />
              <h2 className="text-sm ml-5">Copa America</h2>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white w-3/5 h-screen">
      </div>
      <div className="bg-black w-1/5 h-screen">

      </div>
      {/* {response.map((v:any,i:number) => (
        <h1 key={i}>{v.fixture.id}</h1>
      ))} */}
    </div>
  );
}
