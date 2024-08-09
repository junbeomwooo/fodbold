import React from "react";
import Image from "next/image";

import { FOOTBALL_IMAGE } from "@/app/[locale]/(home)/page";

export default async function Leagues({t}:{t:any}) {

  return (
    <div className=" w-1/5 max-lg:hidden max-xl:w-2/5  max-xl:mr-6 ">
    <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0">
      <h1 className="text-base font-medium p-3 ml-4 dark:text-custom-green pt-6 mb-2">
        {t("topLeagues")}
      </h1>
      <ul>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/39.png`}
            alt="Premier League"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Premier League</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/140.png`}
            alt="La Liga"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">La Liga</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/78.png`}
            alt="Bundesliga"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Bundesliga</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/135.png`}
            alt="Serie A"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Serie A</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/61.png`}
            alt="Ligue 1"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Ligue 1</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/2.png`}
            alt="Champions League"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">
            Champions League
          </h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/3.png`}
            alt="Europa League"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Europa League</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/1.png`}
            alt="World Cup"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">World Cup</h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/4.png`}
            alt="Euro Championship"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">
            Euro Championship
          </h2>
        </li>
        <li className="flex hover:cursor-pointer hover:bg-slate-100 p-3 pl-7 dark:hover:bg-zinc-700">
          <Image
            src={`${FOOTBALL_IMAGE}/leagues/9.png`}
            alt="Copa America"
            width={16}
            height={16}
            style={{ width: 16, height: 16 }}
          />
          <h2 className="text-xsm ml-5 dark:text-white">Copa America</h2>
        </li>
      </ul>
    </div>
  </div>
  );
}