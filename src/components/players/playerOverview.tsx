"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useRouter } from "next/navigation";
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";
import {
  getSeasonByPlayer,
  getPlayerStatistics,
  getTeamsByPlayer,
  getTrophiesByPlayer,
} from "@/lib/features/playerSlice";

import Image from "next/image";
import triangle from "@/../public/img/triangle.png";
import noImage from "@/../public/img/noimage.png";

import { useTranslations } from "next-intl";

export default function PlayerOverview({
  locale,
  id,
  name,
}: {
  locale: string;
  id: string;
  name: string;
}) {
  /** translations */
  const p = useTranslations("player");

  /** router */
  const router = useRouter();

  /** redux */
  const dispatch = useAppDispatch();
  const {
    season,
    statics,
    teams,
    trophies,
  }: { season: any; statics: any; teams: any; trophies: any } = useAppSelector(
    (state) => state.playerSlice
  );
  const playerID = parseInt(id);

  /** State for year */
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  /** image url */
  const FOOTBALL_IMAGE = "https://media.api-sports.io/football";

  // http://localhost:3000/en/players/18784/J.-Maddison
  // http://localhost:3000/en/players/306/Mohamed-Salah
  // http://localhost:3000/en/players/186/Son-Heung-Min

  const firstRender = useRef(false);

  /** 네트워크 페칭이 몇번되는지 확인하고 적절히 조절하기 
   *  이 후 첫 렌더링시 selectLeague 가 잘 작동안하는 것도 수정하기 (121~128 라인)
   *  */ 

  useEffect(() => {
    // When its first rendering, recieve Trophies, Teams, PlayerStatics data
    if (!firstRender.current) {
      firstRender.current = true;
      // dispatch(getTrophiesByPlayer({ id: playerID }));
      dispatch(getTeamsByPlayer({ id: playerID })).then((payload) => {
        const lastestSeason =
          payload && payload?.payload[0] && payload?.payload[0]?.seasons[0];
        setSelectedYear(lastestSeason);
        dispatch(getPlayerStatistics({ id: playerID, season: lastestSeason }));
      });
      return;
    } else {
      // When selectYear value change receive new data
      dispatch(getPlayerStatistics({ id: playerID, season: selectedYear }));
    }
  }, [dispatch, playerID, selectedYear]);

  /** data for using */
  const playerStatics = statics && statics[0];
  const playerTeams = teams && teams[0];

  const trophiesGroupByCountry = trophies
    ? Object.entries(
        trophies?.reduce((acc: any, v: any) => {
          const key = v?.country;

          if (!acc[key]) {
            acc[key] = [];
          }

          acc[key].push(v);

          return acc;
        }, [])
      )
    : null;

  const seasonsByTeamData = teams?.flatMap((team: any) => team.seasons);
  const allSeasons = Array.from(new Set(seasonsByTeamData)).sort(
    (a: any, b: any) => {
      return b - a;
    }
  );

  /** State for League Name */
  const [selectedLeague, setSelectLeague] = useState(
    playerStatics?.statistics[0]?.league?.id
  );

  // Renew data based on selectedLeague value
  const staticsData = playerStatics?.statistics?.filter((v: any) => {
    return selectedLeague === v?.league?.id;
  })[0];

  
  // const firstRender2 = useRef(false);

  // useEffect(() => {
  //   if(!firstRender2.current) {
  //     firstRender.current = true;
  //     setSelectLeague(playerStatics?.statistics[0]?.league?.id);
  //   }
  // }, [playerStatics]);


  console.group("season");
  console.log(season);
  console.groupEnd();

  console.group("playerStatics");
  console.log(playerStatics);
  console.groupEnd();

  console.group("teams");
  console.log(teams);
  console.groupEnd();

  console.group("trophies");
  console.log(trophies);
  console.groupEnd();

  console.group("allSeasons");
  console.log(allSeasons);
  console.groupEnd();

  console.group("staticsData");
  console.log(staticsData);
  console.groupEnd();

  return (
    <div className="w-full flex justify-center">
      {/* Profile */}
      <div className="w-full">
        {/** header */}
        <div className="w-full h-auto bg-white rounded-t-xl px-8 py-6  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 border-b-0 dark:border-b-[1px] dark:border-[#464646]">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src={`${FOOTBALL_IMAGE}/players/${id}.png`}
                alt="Player profile picture"
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex flex-col justify-center ml-6">
                <h1 className="text-xl">{playerStatics?.player?.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    src={playerTeams?.team?.logo}
                    alt="nationallity, team logo"
                    width={20}
                    height={20}
                  />
                  <h1
                    className="text-base text-custom-gray cursor-pointer hover:underline"
                    onClick={() => {
                      router.push(
                        `/${locale}/teams/${
                          playerTeams?.team?.id
                        }/${FormatLeagueOrTeamName(
                          playerTeams?.team?.name
                        )}/overview`
                      );
                    }}
                  >
                    {playerTeams?.team?.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* player Info */}
        <div className="w-full h-auto bg-white rounded-b-xl px-8 pt-8  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 pb-8 flex gap-10">
          {/* left */}
          <div className="w-1/2 h-auto ">
            {/* country, position] */}
            <div className="flex text-[16px] gap-10">
              {/* country */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.nationality}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("country")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* position */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.statistics[0]?.games?.position}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("position")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* height, weight */}
            <div className="flex text-[16px] gap-10">
              {/* height */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.height}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("height")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* weight */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.weight}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("weight")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* age, date */}
            <div className="flex text-[16px] gap-10">
              {/* dge */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.age}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("age")}
                </h3>
              </div>

              {/* date */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.birth?.date}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("date")}
                </h3>
              </div>
            </div>
          </div>
          <div className="w-px bg-slate-200 h-auto mx-4 dark:bg-[#464646]" />

          {/* right */}
          <div className="w-1/2 h-auto ">
            {/* country, position] */}
            <div className="flex text-[16px] gap-10">
              {/* country */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.nationality}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("country")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* position */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.statistics[0]?.games?.position}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("position")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* height, weight */}
            <div className="flex text-[16px] gap-10">
              {/* height */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.height}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("height")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>

              {/* weight */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.weight}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("weight")}
                </h3>
                <hr className="my-8 dark:border-[#464646]" />
              </div>
            </div>

            {/* age, date */}
            <div className="flex text-[16px] gap-10">
              {/* dge */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.age}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("age")}
                </h3>
              </div>

              {/* date */}
              <div className="w-1/2 h-auto">
                <h2>{playerStatics?.player?.birth?.date}</h2>
                <h3 className="text-[14px] text-custom-gray mt-2">
                  {p("date")}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* player statics */}
        <div className="w-full bg-white rounded-xl mt-6 dark:bg-custom-dark border-slate-200 border border-solid dark:border-0">
          {/* title */}
          <div className="text-base py-6 px-8 flex items-center gap-5">
            {/* logo */}
            <Image
              src={
                playerStatics?.statistics[0]?.league?.logo ||
                playerStatics?.statistics[0]?.team?.logo ||
                noImage
              }
              alt={
                playerStatics?.statistics[0]?.league?.name ||
                playerStatics?.statistics[0]?.team?.name ||
                "team"
              }
              width={20}
              height={20}
              className="w-[20px] h-[20px] rounded-full"
            />

            {/* selectYear */}
            <div className="flex items-center cursor-pointer hover:opacity-60">
              <select
                onChange={(e) => {
                  setSelectedYear(parseInt(e.currentTarget.value));
                }}
                value={selectedYear}
                className="appearance-none"
                id="season"
              >
                {allSeasons?.map((v: any, i: number) => {
                  return (
                    <option key={i} value={v}>
                      {`${v}/${v + 1}`}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="season">
                <Image
                  src={triangle}
                  alt="change date"
                  width={14}
                  height={14}
                  style={{ width: "14px", height: "14px" }}
                  className="ml-3 dark:invert"
                />
              </label>
            </div>

            <div className="w-[1.1px] h-4 bg-slate-300 mx-2"></div>

            {/* laague select 잘 작동하는지 확인하기, 이후 선택한 리그와 같은 값을 출력시키고 리그 이름값이 변경될때 해당 데이터 값도 변경된 값으로 변경하기 */}

            {/* league name */}
            <div className="flex items-center cursor-pointer hover:opacity-60">
              <select
                onChange={(e) => {
                  setSelectLeague(e.currentTarget.value);
                }}
                value={selectedLeague}
                className="appearance-none text-base font-medium"
                id="league"
              >
                {playerStatics?.statistics?.map((v: any, i: number) => {
                  return (
                    <option key={i} value={v?.league?.id}>
                      {v?.league?.name || v?.team?.name}
                    </option>
                  );
                })}
              </select>

              <label htmlFor="league">
                <Image
                  src={triangle}
                  alt="change date"
                  width={14}
                  height={14}
                  style={{ width: "14px", height: "14px" }}
                  className="ml-3 dark:invert"
                />
              </label>
            </div>
          </div>

          <hr className="dark:border-[#464646] " />
          <div className="py-6 px-8 ">
            <h1>
              {staticsData?.team?.name}
              {staticsData?.games?.lineups}
            </h1>
          </div>
        </div>
      </div>

      {/* Career, Trophies */}
      <div className="w-[700px] h-full">
        {/* Career */}
        <div className="bg-white border-slate-200 border border-solid rounded-xl py-5 ml-6 dark:bg-custom-dark dark:border-none">
          {/* Header*/}
          <div className="flex items-center justify-between px-5 mt-2">
            <div className="w-full">
              <h1 className="text-base font-medium">Career</h1>
            </div>
          </div>
          <hr className="dark:border-[#464646] mt-6 mb-4" />

          {/* Content */}
          {teams?.map((v: any, i: number) => {
            const recentSeason =
              v?.seasons.length > 0 ? Math.max(...v?.seasons) : null;
            const oldestSeason =
              v?.seasons.length > 0 ? Math.min(...v?.seasons) : null;

            return (
              <div
                key={i}
                className="flex items-center mx-3 px-4 py-4 cursor-pointer hover:bg-[#F1F4F7] dark:hover:bg-[#282828] rounded-xl"
                onClick={() =>
                  router.push(
                    `/${locale}/teams/${v?.team?.id}/${FormatLeagueOrTeamName(
                      v?.team?.name
                    )}/overview`
                  )
                }
              >
                {/* Image */}
                <div className="w-[24px] h-[24px] relative mr-5">
                  <Image
                    src={v?.team?.logo}
                    alt={v?.team?.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Name, Season */}
                <div className="text-[14px]">
                  <h1>{v?.team?.name}</h1>
                  <h3 className="text-custom-gray mt-2">
                    {oldestSeason && recentSeason
                      ? oldestSeason === recentSeason
                        ? `${oldestSeason}`
                        : `${oldestSeason}-${recentSeason}`
                      : "-"}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trophies */}
        <div className="bg-white border-slate-200 border border-solid rounded-xl py-5 ml-6 dark:bg-custom-dark dark:border-none mt-6">
          {/* Header*/}
          <div className="flex items-center justify-between px-5 mt-2">
            <div className="w-full">
              <h1 className="text-base font-medium mb-4">Trophies</h1>
            </div>
          </div>

          {/* Content */}
          {trophies &&
            trophiesGroupByCountry?.map((country: any, i: number) => {
              // console.log(country);

              return (
                <div
                  key={i}
                  className="text-sm border-slate-200 border border-solid ark:bg-custom-dark dark:border-none mx-4 my-4 rounded-xl"
                >
                  <div className="bg-slate-100 py-3 px-3 rounded-t-xl dark:bg-custom-lightDark">
                    <h1>{country[0]}</h1>
                  </div>
                  <div>
                    {country[1]?.map((v: any, i: number) => {
                      return (
                        <Fragment key={i}>
                          <div className="flex gap-3 px-4 py-3 text-[#4A4A4A] justify-between dark:text-white">
                            <div>
                              <h3>{v?.league}</h3>
                              <h3 className="mt-2 text-xs">{v?.season}</h3>
                            </div>
                            <div>
                              <h3>{v?.place}</h3>
                            </div>
                          </div>
                          {country[1]?.length > i + 1 && (
                            <hr className="dark:border-[#464646] " />
                          )}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
