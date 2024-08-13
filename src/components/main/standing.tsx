import React from "react";
import Image from "next/image";
import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

export default function Standing({ t, stands }: { t: any; stands: any }) {
  return (
    <div className="w-1/5 max-xl:hidden">
      {/* epl */}
      <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-6 dark:bg-custom-dark dark:border-0">
        <div className="hover:cursor-pointer hover:opacity-60 w-full h-full flex pt-6 pb-5 px-7 justify-between">
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
          {stands.map((v: any, i: any) => {
            // 승급
            const champions = "Promotion - Champions League (Group Stage: )";
            const europa = "Promotion - Europa League (Group Stage: )";
            const conference =
              "Promotion - Europa Conference League (Qualification: )";
            // 강등
            const relegation = "Relegation - Championship";
            return (
              <div
                key={i}
                className="w-full flex justify-between py-2  hover:cursor-pointer  hover:bg-slate-100 dark:hover:bg-zinc-700"
              >
                {v.description &&
                v.description.includes(relegation) === true ? (
                  <div className="w-0.5 h-5 bg-red-500 absolute" />
                ) : v.description && v.description === champions ? (
                  <div className="w-0.5 h-5 bg-custom-green absolute" />
                ) : v.description && v.description === europa ? (
                  <div className="w-0.5 h-5 bg-blue-500 absolute" />
                ) : v.description && v.description === conference ? (
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
                  />
                  <h2 className="text-xs pl-3">{v?.team?.name}</h2>
                </div>
                <div className="flex pr-1 dark:text-white">
                  <h2 className="text-xs w-7">{v.all.played}</h2>
                  <h2 className="text-xs w-7">{v.goalsDiff}</h2>
                  <h2 className="text-xs w-7 ">{v.points}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
