"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FOOTBALL_IMAGE } from "@/constants/api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";

export default function Standing({
  standing,
  locale,
}: {
  standing: any;
  locale: string;
}) {
  const t = useTranslations("main");
  const g = useTranslations("general");

  const [stands] = Array.isArray(standing?.league?.standings)
    ? standing?.league?.standings
    : [];
  const router = useRouter();

  return (
    <div className="w-1/5 max-xl:hidden">
      {/* epl */}
      <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0">
        <div
          className="hover:cursor-pointer hover:opacity-60 w-full h-full flex pt-6 pb-5 px-7 justify-between"
          onClick={() => {
            router.push(
              `/${locale}/leagues/${
                standing?.league.id
              }/${FormatLeagueOrTeamName(standing?.league?.name)}/overview`
            );
          }}
        >
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
          {stands?.length > 0 ? (
            stands.map((v: any, i: any) => {
              // 승급
              const champions = "Champions League";
              const europa = "Europa League";
              const conference = "Europa Conference League";
              // 강등
              const relegation = "Relegation";
              return (
                <div
                  key={i}
                  className="w-full flex justify-between py-2  hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
                  onClick={() => {
                    router.push(
                      `/${locale}/teams/${v?.team?.id}/${FormatLeagueOrTeamName(
                        v?.team?.name
                      )}/overview`
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
                    <h2 className="text-xs pr-4 font-semibold">{v?.rank}</h2>
                    <Image
                      src={v?.team?.logo}
                      alt={v?.team?.name}
                      width={50}
                      height={50}
                      style={{ width: 15, height: 15 }}
                      className="object-contain"
                    />
                    <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                  </div>
                  <div className="flex pr-3 dark:text-white">
                    <h2 className="text-xs w-7 text-center">{v.all.played}</h2>
                    <h2 className="text-xs w-7 text-center">{v.goalsDiff}</h2>
                    <h2 className="text-xs w-7 text-center ">{v.points}</h2>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <h1 className="text-sm ml-4 mt-2">{g("noresults")}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
