"use client";

import { getFixtures } from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FixtureHeader from "./header/fixtureHeader";

// import { fixture } from "../../../public/example";

export default function FixturesOverView({
  id,
  locale,
}: {
  id: number;
  locale: string;
}) {
  /** 리덕스 초기화 */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);

  const [tabPage, setTabPage] = useState("overview");

  console.log(fixture);

  /** 렌더링시  */
  useEffect(() => {
    dispatch(getFixtures({ id: id }));
  }, [dispatch, id]);

  const onClick = () => {
    setTabPage("hello");
  };

  console.log(fixture);

  /** 경기 별 상태  */

  //시작안함
  const scheduled = ["TBD", "NS"];

  // 경기중 (하프타임 브레이킹타임 포함)
  const live = ["1H", "2H", "ET", "P", "LIVE", "HT", "BT"];

  //심판 자의로 경기중단
  const stop = ["SUSP", "INT"];

  //경기 끝
  const finish = ["FT", "AET", "PEN"];

  // 경기 취소 및 연기
  const cancle = ["PST", "CANC", "ABD"];

  // 부전승
  const unearned = ["AWD", "WO"];

  return (
    <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 rounded-xl dark:bg-custom-dark dark:border-0">
      {/* 헤더 */}
      <FixtureHeader fixture={fixture} locale={locale} />

      {/* 카테고리 */}
      <div className="flex text-base font-normal mt-6">
        {fixture?.statistics.length > 0 && (
          <h1 className="cursor-pointer">Facts</h1>
        )}
        {fixture?.lineups.length > 0 && (
          <h1 className="ml-5 cursor-pointer">Lineup</h1>
        )}
      </div>
    </div>
  );
}
