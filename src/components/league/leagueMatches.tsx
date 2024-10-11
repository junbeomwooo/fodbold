"use client";

import React, { useEffect, useState } from "react";
import LeagueHeader from "./header/leagueHeader";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import {
  getLeague,
  setSelectedSeason,
  getMatches,
} from "@/lib/features/leagueSlice";

import { useTranslations } from "next-intl";

import Image from "next/image";

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
  const {
    seasons,
    match,
    selectedSeason,
  }: { seasons: any; match: any; selectedSeason: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  /** 번역 */
  const g = useTranslations("general");

  /** 접속 해당 위치의 전역 상태값 가져오기 */
  const { location }: any = useAppSelector((state) => state.locationSlice);

  /** 실제 사용할 데이터 */
  const season = seasons ? seasons.seasons : null;
  const selected = selectedSeason ? selectedSeason : 0;

  /** 선택 년도 상태값 */
  const [selectedYear, setSelectedYear] = useState<number>(selected);

  /** 시즌에 대한 변경값이 있었는지 모니터링하기 위한 상태값 */
  const [selectedYearChanged, setSelectedYearChanged] = useState(false);

  useEffect(() => {
    /** 조회하려는 시즌값이 변경되지 않았으며 season과 selectedYear값이 모두 존재하는 경우 ( 즉 이전 페이지에서 전역 상태값을 잘 받아온 경우 ) */
    if (!selectedYearChanged && season && selectedYear !== 0 && match) {
      return;
    }
    /** 이전 페이지로부터 seasons을 받아오지 못한 경우에 실행
     * 1.getLeague를 통해 season 정보를 받아온 뒤 가장 최근 리그 데이터를 selectedYear에 저장
     * 2.selectYear이 변경됨으로써 useEffect가 다시 실행 됨으로 else 부분으로 넘어감
     */
    if (!season) {
      // 리그 데이터 받아오기
      dispatch(getLeague({ id })).then(({ payload }) => {
        const season = payload?.seasons;

        if (season && season.length > 0) {
          const lastSeason = season[season?.length - 1].year;
          // selectedYear에 저장
          setSelectedYear(lastSeason);
          /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
          dispatch(setSelectedSeason(selectedYear));
        } else {
          console.error("season error");
        }
      });
      /** 이전 페이지에서 못받아옴으로써 if문 실행 뒤 넘어왔거나 standing이나 seasons을 이전페이지에서 받아온 경우
       * 1. selected가 저장된게 없다면 최근 시즌 정보를 selectedYear 상태값에 저장
       * 2. 그후 useEffect가 다시 실행됨으로써 getStanding을 통한 해당 년도 순위 데이터 조회
       * 3. 이전에 저장된 stands 상태값을 사용하지않고 최신 년도 데이터로 새로 받아오기 고정
       */
    } else {
      // 스탠드와 시즌이 있으면서 초기 상태인 경우
      // 왜 인지는 모르겠지만 selectedYear 관한 조건문을 여기서 안넣으면 새로고침시 league = 0 으로 데이터 통신이 한번더 발생해서 조건문을 추가하였음
      if (selectedYear === 0) {
        const lastSeason = season[season?.length - 1].year;
        setSelectedYear(lastSeason);
        /** 전역 상태값으로 써 공유를 하기위해 선택한 년도를 상태값으로써 저장 */
        dispatch(setSelectedSeason(selectedYear));
      } else {
        console.log(selectedYear);
        // 초기 상태가 아닌 경우(즉 selectedYear의변화가 생긴 경우 재통신)
        dispatch(
          getMatches({ leagueID: id, season: selectedYear, timezone: location })
        );
      }
    }
    // 의존성 배열 관련 경고문은 무시해도 좋음
  }, [dispatch, id, selectedYear, season, selectedYearChanged, location]);

  /** 날짜별로 경기 데이터 묶기 */
  const groupedByDate = match?.reduce((acc: any, match: any) => {
    // acc : 반환할 총 데이터 값 , match : 한가지 경기
    const matchDate = match.fixture.date.substring(0, 10);
    if (!acc[matchDate]) {
      acc[matchDate] = {
        matches: [],
      };
    }
    acc[matchDate]?.matches?.push(match);

    return acc;
  }, []);

  /** 날짜 키 받기 */
  const dateKeys = groupedByDate ? Object.keys(groupedByDate) : [];

  /** 현재 년도값 가져오기 */
  const nowYear = new Date().getFullYear();

  return (
    <>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
        setSelectedYearChanged={setSelectedYearChanged}
      />
      {/* 날짜 키 값 반복돌리기 */}
      <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7">
        {dateKeys.length > 0 ? (
          dateKeys.map((date: any, dateIndex: number) => {
            const dateMatch = groupedByDate[date].matches;
            return (
              <div key={dateIndex}>
                <div className="w-full h-10 bg-slate-100 rounded-xl flex items-center px-5">
                  <h1 className="text-base font-medium">{date}</h1>
                </div>

                {/* 해당 날짜안의 경기 반복문 돌리기 */}
                {dateMatch.map((match: any, matchIndex: number) => {
                  // 경기 시간을 데이터 객체로 변환 후 url 파라미터에 있는 locale값을 정식 locale값으로 변환 후 toLocaleTimeString을 통해 해당 언어에 해당하는 시간 값으로 반환
                  const matchDate = new Date(match.fixture.date);

                  const localeInfo =
                    locale === "en"
                      ? "en-US"
                      : locale === "ko"
                      ? "ko-KR"
                      : locale === "da"
                      ? "da-DK"
                      : null;

                  const matchTime = matchDate.toLocaleTimeString(
                    localeInfo?.toString(),
                    { hour: "numeric", minute: "numeric", hour12: true }
                  );

                  return (
                    <div
                      key={matchIndex}
                      className="flex h-14 text-sm justify-center items-center cursor-pointer hover:bg-slate-200"
                    >
                      <div className="flex w-6/12 justify-end">
                        <h1>{match.teams.home.name}</h1>
                        <Image
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          width={15}
                          height={15}
                          className="mr-4 ml-3"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </div>
                      <div className="flex w-20 justify-center text-xsm text-gray-600">
                        <h1>{matchTime}</h1>
                      </div>
                      <div className="flex w-6/12 justify-start">
                        <Image
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          width={15}
                          height={15}
                          className="ml-4 mr-3"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <h1>{match.teams.away.name}</h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="bg-white border-solid border border-slate-200 mt-5 rounded-xl dark:border-0 dark:bg-custom-dark py-8">
            <h1 className="text-center text-base dark:text-white">
              {g("noresults")}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
