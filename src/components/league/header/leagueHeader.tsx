import React from "react";
import Image from "next/image";
import {FOOTBALL_IMAGE} from "../../../app/[locale]/(home)/page";

import { useTranslations } from "next-intl";

import triangle from "../../../../public/img/triangle.png";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function LeagueHeader({id, seasons ,setSelectedYear, selectedYear ,locale, league, setSelectedYearChanged }:{id:number , seasons:any, setSelectedYear:any, selectedYear:number, locale:string, league:string, setSelectedYearChanged?:any}) {
  
  /** 번역 */
  const c = useTranslations("countries");
  const l = useTranslations("league");

  /** url */
  const pathname = usePathname();

  /** 사용할 데이터  */
  const leagueName = seasons?.league?.name;
  const leageCountry = seasons?.country?.name?.toString();
  const totalYears = seasons?.seasons;

  /** 지울 데이터 */
  // const totalYears = [
  //   { year: 2000 },
  //   { year: 2001 },
  //   { year: 2003 },
  //   { year: 2004 },
  //   { year: 2005 },
  //   { year: 2024 },
  // ];
  // const leagueName = "Premier League";
  // const leageCountry = "England";

  return (
   <>
          {/** header */}
          <div className="w-full h-auto bg-white rounded-xl px-8 pt-10  border-slate-200 border border-solid dark:bg-custom-dark dark:border-0 max-sm:px-4 ">
        <div className="flex items-center justify-between">
          <div className="flex">
            <Image
              src={`${FOOTBALL_IMAGE}/leagues/${id}.png`}
              alt="league logo"
              width={35}
              height={35}
              style={{ width: "auto", height: "auto" }}
            />
            <div className="flex flex-col justify-center ml-4">
              <h1 className="text-lg">{leagueName}</h1>
              <h1 className="text-xsm text-custom-gray ">
                {leageCountry ? c(leageCountry) : "Unknown"}
              </h1>
            </div>
          </div>
          <div className="relative">
            <select
              className="border border-black rounded-full text-xsm p-1.5 font-medium appearance-none pr-5 pl-3 dark:bg-custom-dark dark:border-custom-gray2"
              onChange={(e) => {
                setSelectedYear(parseInt(e.currentTarget.value));
                if(setSelectedYearChanged) {
                  setSelectedYearChanged(true)
                }
              }}
              value={selectedYear}
            >
              {totalYears?.map((v: any, i: number) => {
                return (
                  <option key={i} value={v?.year}>
                    {`${v?.year}/${v?.year + 1}`}
                  </option>
                );
              })}
            </select>
            <span>
              <Image
                src={triangle}
                alt="change date"
                width={14}
                height={14}
                style={{ width: "14px", height: "14px" }}
                className={`ml-3 absolute top-1.5 right-1.5 dark:invert`}
              />
            </span>
          </div>
        </div>
        <div className="flex pt-10" style={{ fontSize: "15px" }}>
          <div className="flex flex-col">
            <Link
              href={`/${locale}/leagues/${id}/${league}/overview`}
              className="hover:no-underline  hover:text-custom-gray tracking-wide"
            >
              {l("overview")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/overview` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/leagues/${id}/${league}/tables`}
              className="ml-6 hover:no-underline hover:text-custom-gray tracking-wide"
            >
              {l("table")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/tables` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
            ) : (
              <></>
            )}
          </div>
          {/** 형식이 컵 대회일 경우에만 플레이오프 추가 */}
          {seasons?.league?.type === "Cup" && (
            <div>
              <Link
                href={`/${locale}/leagues/${id}/${league}/playoff`}
                className="ml-6 hover:no-underline hover:text-custom-gray tracking-wide"
              >
                {l("knockout")}
              </Link>
              {pathname === `/${locale}/leagues/${id}/${league}/tables` ? (
                <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
              ) : (
                <></>
              )}
            </div>
          )}
          <div>
            <Link
              href={`/${locale}/leagues/${id}/${league}/matches`}
              className="ml-6 hover:no-underline hover:text-custom-gray tracking-wide"
            >
              {l("matches")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/matches` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6 tracking-wide"></div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <Link
              href={`/${locale}/leagues/${id}/stats`}
              className="ml-6 hover:no-underline hover:text-custom-gray"
            >
              {l("stats")}
            </Link>
            {pathname === `/${locale}/leagues/${id}/${league}/stats` ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full ml-6"></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

   </>
  );
}