"use client";

/** Component */
import TeamHeader from "./header/teamHeader";

// *
import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { getAllLeaguesByTeam, getStanding } from "@/lib/features/leagueSlice";
import { getTeamInfo } from "@/lib/features/teamsSlice";

/**  Format url function */
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";

export default function TeamTables({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  /** dispatch */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);
  const { teamInfo }: any = useAppSelector((state) => state.teamsSlice);
  const { leagues, standing }: { leagues: any; standing: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  /** routing */
  const router = useRouter();

  /** translations */
  const t = useTranslations("team");
  const g = useTranslations("general");

  /** standing */
  const stands = standing ? standing : null;
  // 배열의 첫 인덱스만 가져와서 form이 있는지 길이가 몇인지 확인하는 용도
  const form = stands ? stands[0][0]?.form : null;

  /** league  */
  const leagueNational = leagues?.filter(
    (league: any) =>
      league?.league?.type === "League" &&
      league?.seasons?.some((v: any) => v?.current === true)
  )[0];

  // firstRender acts to ensure that a function runs only on the initial render of the component
  // for removing alert from dependency array of useEffect
  const firstRender = useRef(true);

  // http://localhost:3000/en/teams/47/Tottenham/tables

  // 1..League 페이지 useEffect 의존성 배열 또한 기입하고 useRef를 사용하여 불필요한 데이터 페칭 방지하기.
  // 2. sqaud 페이지 만들어 두었으니 위 두가지를 수행한 후 구현하기

  useEffect(() => {
    if (firstRender.current) {
      if (
        (!leagues || !standing) && // leagues 또는 standing이 없고
        (!fixture || !teamInfo)
      ) {
        firstRender.current = false; // after first rendering, it will chagne useRef value as fasle.
        console.log("fetched!!");

        dispatch(getTeamInfo({ team: id }));
        dispatch(getAllLeaguesByTeam({ team: id })).then((payload) => {
          const leagues = payload?.payload;
          const nationalLeagueObj = leagues?.filter(
            (league: any) =>
              league?.league?.type === "League" &&
              league?.seasons?.some((v: any) => v?.current === true)
          );
          const nationalLeague = nationalLeagueObj[0]?.league?.id;
          const latestSeason = nationalLeagueObj[0]?.seasons?.at(-1)?.year;

          dispatch(getStanding({ id: nationalLeague, year: latestSeason }));
        });
      }
    }
  }, [dispatch, fixture, id, leagues, standing, teamInfo]);

  return (
    <div className="full">
      <TeamHeader
        fixture={fixture}
        teamInfo={teamInfo}
        leagues={leagues}
        locale={locale}
        id={id}
        name={name}
        t={t}
      />
      {stands?.length > 0 && (
        <>
          <div className="w-full bg-white rounded-xl mt-6 px-8 py-5 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
            <div
              className="w-full flex items-center gap-4 mb-5 cursor-pointer hover:opacity-70"
              onClick={() => {
                router.push(
                  `/${locale}/leagues/${
                    leagueNational?.league?.id
                  }/${FormatLeagueOrTeamName(
                    leagueNational?.league?.name
                  )}/overview`
                );
              }}
            >
              <Image
                src={leagueNational?.league?.logo}
                alt={leagueNational?.league?.name}
                width={27}
                height={27}
              />
              <h1 className="text-sm font-medium">
                {leagueNational?.league?.name}
              </h1>
            </div>
            <hr className="dark:border-custom-gray3" />
            {/* 데이터가 있을 경우 데이터를 보여주고 없을 경우 데이터가 없다고 알려줌 */}
            {stands ? (
              <>
                <div className="flex justify-between mx-4 mt-3 text-custom-gray font-semibold">
                  <div>
                    <h2 className="text-xs">#</h2>
                  </div>
                  <div className="flex mr-3 max-md:mr-0">
                    <h2 className="text-xs w-5 px-5">PL</h2>
                    <h2 className="text-xs w-5 px-5  max-md:hidden">W</h2>
                    <h2 className="text-xs w-5 px-5  max-md:hidden">D</h2>
                    <h2 className="text-xs w-5 px-5  max-md:hidden">L</h2>
                    <h2 className="text-xs w-5 px-5">GD</h2>
                    <h2 className="text-xs w-5 px-5">PTS</h2>
                    {
                      /** 데이터에 form 필드가 있다면 보여주고 없다면 보여주지않기
                       * form데이터 길이에 따라 너비 조절
                       */
                      form ? (
                        <>
                          <h2
                            className="text-xs w-5 px-5 max-md:hidden"
                            style={{ marginRight: "103px" }}
                          >
                            Form
                          </h2>
                        </>
                      ) : (
                        <></>
                      )
                    }
                  </div>
                </div>
                <div className="mt-3 flex flex-col">
                  {stands[0]?.map((v: any, i: any) => {
                    // 승급
                    const champions = "Champions League";
                    const europa = "Europa League";
                    const conference = "Europa Conference League";
                    // 강등
                    const relegation = "Relegation";

                    // 최근전적
                    const recentResult = v.form?.split("");
                    return (
                      <div
                        key={i}
                        className="w-full flex justify-between py-2  hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
                        onClick={() => {
                          router.push(
                            `/${locale}/teams/${
                              v?.team?.id
                            }/${FormatLeagueOrTeamName(v?.team?.name)}/overview`
                          );
                        }}
                      >
                        {v.description &&
                        v.description.includes(relegation) === true ? (
                          <div className="w-0.5 h-5 bg-red-500 absolute" />
                        ) : v.description &&
                          v.description.includes(champions) === true ? (
                          <div className="w-0.5 h-5 bg-custom-green absolute" />
                        ) : v.description &&
                          v.description.includes(europa) === true ? (
                          <div className="w-0.5 h-5 bg-blue-500 absolute" />
                        ) : v.description &&
                          v.description.includes(conference) === true ? (
                          <div className="w-0.5 h-5 bg-sky-300 absolute" />
                        ) : (
                          <></>
                        )}
                        <div className="flex pl-4 dark:text-white">
                          <h2 className="text-xs pr-4 font-semibold">
                            {v?.rank}
                          </h2>
                          <Image
                            src={v?.team?.logo}
                            alt={v?.team?.name}
                            width={50}
                            height={50}
                            style={{ width: 15, height: 15 }}
                          />
                          <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                        </div>
                        <div className="flex dark:text-white mr-3">
                          <h2 className="text-xs w-5 px-5">{v.all.played}</h2>
                          <h2 className="text-xs w-5 px-5  max-md:hidden">
                            {v.all.win}
                          </h2>
                          <h2 className="text-xs w-5 px-5  max-md:hidden">
                            {v.all.draw}
                          </h2>
                          <h2 className="text-xs w-5 px-5  max-md:hidden">
                            {v.all.lose}
                          </h2>
                          <h2 className="text-xs w-5 px-5">{v.goalsDiff}</h2>
                          <h2 className="text-xs w-5 px-5">{v.points}</h2>
                          {form ? (
                            <div className="flex items-center ml-4 w-36  max-md:hidden">
                              {recentResult?.map((v: string, i: number) => {
                                return (
                                  <h2
                                    className={`text-xs w-5 py-0.5 ml-2 text-center text-white rounded-md ${
                                      v === "W"
                                        ? "bg-green-500"
                                        : v === "D"
                                        ? "bg-custom-gray"
                                        : "bg-red-500"
                                    }`}
                                    key={i}
                                  >
                                    {v}
                                  </h2>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="mr-3" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="w-full h-20 px-8 py-10">
                <h1 className="text-base">{g("noresults")}</h1>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
