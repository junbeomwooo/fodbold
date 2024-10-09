"use client";

import React, { useEffect, useState } from "react";
import LeagueHeader from "./header/leagueHeader";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getLeague } from "@/lib/features/leagueSlice";

export default function LeagueMatches({
  id,
  league,
  locale,
}: {
  id: number;
  league: string;
  locale: string;
}) {
  const dispatch = useAppDispatch();
  const { seasons,match }: { seasons: any,match:any } = useAppSelector(
    (state) => state.leagueSlice
  );

  /** 선택 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState(0);

  /** 실제 사용할 데이터 */
  const season = seasons ? seasons.seasons : null;
  // useEffect(() => {
  //   /** 이전 페이지로부터 seasons을 받아오지 못한 경우에 실행
  //    * 1.getLeague를 통해 season 정보를 받아온 뒤 가장 최근 리그 데이터를 selectedYear에 저장
  //    * 2.selectYear이 변경됨으로써 useEffect가 다시 실행 됨으로 else 부분으로 넘어감
  //    */
  //   if (!season) {
  //     // 리그 데이터 받아오기
  //     dispatch(getLeague({ id })).then(({ payload }) => {
  //       const season = payload?.seasons;

  //       if (season && season.length > 0) {
  //         const lastSeason = season[season?.length - 1].year;
  //         // selectedYear에 저장
  //         setSelectedYear(lastSeason);
  //       } else {
  //         console.error("season error");
  //       } 
  //     });
  //     /** 이전 페이지에서 못받아옴으로써 if문 실행 뒤 넘어왔거나 standing이나 seasons을 이전페이지에서 받아온 경우
  //      * 1. selected가 저장된게 없다면 최근 시즌 정보를 selectedYear 상태값에 저장
  //      * 2. 그후 useEffect가 다시 실행됨으로써 getStanding을 통한 해당 년도 순위 데이터 조회
  //      * 3. 이전에 저장된 stands 상태값을 사용하지않고 최신 년도 데이터로 새로 받아오기 고정
  //      */
  //   } else {
  //     if (selectedYear === 0) {
  //       const lastSeason = season[season?.length - 1].year;
  //       setSelectedYear(lastSeason);
  //     } else {

  //     }
  //   }
  // }, [dispatch, id, season]);

  return (
    <>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
      />
      <div className="w-full mt-6 max-xl:w-full"></div>
    </>
  );
}
