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
import arrow from "../../../public/img/arrow.png";
import trianlge from "../../../public/img/triangle.png";

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

  const initializedDate = new Date(match[0]?.fixture.date);

  /** 시즌에 대한 변경값이 있었는지 모니터링하기 위한 상태값 */
  const [selectedYearChanged, setSelectedYearChanged] = useState(false);

  /** 각 월별로 데이터 필터링을 위한 상태값 */
  const [filterMonth, setFilterMonth] = useState(new Date(initializedDate));

  const localeInfo =
    locale === "en"
      ? "en-US"
      : locale === "ko"
      ? "ko-KR"
      : locale === "da"
      ? "da-DK"
      : null;

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
        // 초기 상태가 아닌 경우(즉 selectedYear의변화가 생긴 경우 재통신)
        dispatch(
          getMatches({ leagueID: id, season: selectedYear, timezone: location })
        );
      }
    }
    // 의존성 배열 관련 경고문은 무시해도 좋음
  }, [dispatch, id, selectedYear, season, selectedYearChanged, location]);

  /** 받아온 데이터를 시간순으로 정렬 */
  const sortedMatch = Array.isArray(match)
    ? [...match].sort((a: any, b: any) => {
        return a.fixture.timestamp - b.fixture.timestamp;
      })
    : null;







      // 잘작동하는지 확인 후 filterMonth를 현재 진행중인 시즌일 때는 현재 달로 초기상태를 지정하고 현재 달이 아닐 경우에는 항상 시즌 첫 경기 시간을 초기시간대로 지정 
      
  /** (matches, month, year) 파라미터를 통해 같은 년도와 월의 데이터 값만 가져올 함수 */
  const filterMatchesByMonthAndYear = (matches: any[], month: number) => {
    return matches.filter((match) => {
      const matchDate = new Date(match.fixture.date);
      return matchDate.getMonth() + 1 === month; // 월은 0부터 시작하므로 +1
    });
  };

  /** 필터링된 월별 데이터 */
  const filteredMatches = sortedMatch
    ? filterMatchesByMonthAndYear(sortedMatch, filterMonth.getMonth() + 1)
    : [];

  /** 시즌 시작일로부터 끝나는 일까지 */
  const foundSeason = seasons?.seasons.find(
    (season: any) => season.year === selectedYear
  );

  // 시즌 시작
  const startedDate = new Date(foundSeason?.start);

  // 시즌 종료
  const endDate = new Date(foundSeason?.end);

  const onClickNextMonth = () => {
    // 현재 데이터 객체 가져오기
    const date = new Date(filterMonth);

    // 만약 시즌 종료일보다 크다면 아무 반응 없게하기
    if (date >= endDate) {
      console.log("end");
      return;
    } else {
      // 다음달로 변경
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
      setFilterMonth(date);
    }
  };







  

  /** 날짜별로 경기 데이터 묶기 */
  const groupedByDate = filteredMatches?.reduce((acc: any, match: any) => {
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
      <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 max-sm:px-0 rounded-xl">
        {/* 날짜 선택 부분 */}
        <div className="h-16 flex justify-between items-center max-msm:mx-4">
          <div>
            <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray">
              <Image
                src={arrow}
                alt="arrow"
                width={11}
                height={11}
                style={{ width: "11px", height: "11px" }}
                className="rotate-90 dark:invert"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center hover:cursor-pointer">
              <h1 className="text-base dark:text-white">
                {filterMonth.toLocaleDateString(localeInfo?.toString(), {
                  month: "long",
                })}
              </h1>
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray">
            <Image
              src={arrow}
              alt="arrow"
              width={11}
              height={11}
              style={{ width: "11px", height: "11px" }}
              className="rotate-270 dark:invert"
              onClick={onClickNextMonth}
            />
          </div>
        </div>

        {/* 경기 리스트 */}
        {dateKeys.length > 0 ? (
          dateKeys.map((date: any, dateIndex: number) => {
            const dateMatch = groupedByDate[date].matches;

            let dateform = null;

            /** 현재년도와 비교하여 경기년도가 같다면 일, 월만 보여주고 아니라면 년도까지 보여주기 */
            const matchDate = new Date(date);

            // 현재년도
            const nowYear = new Date().getFullYear().toString();
            const matchYear = date.substring(0, 4);

            dateform = matchDate.toLocaleDateString(localeInfo?.toString(), {
              weekday: "long",
              month: "long",
              day: "numeric",
            });

            if (nowYear !== matchYear) {
              dateform = matchDate.toLocaleDateString(localeInfo?.toString(), {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              });
            }

            return (
              <div key={dateIndex}>
                <div className="w-full h-10 bg-slate-100 rounded-xl flex items-center px-5 max-sm:rounded-none">
                  <h1 className="text-base font-medium">{dateform}</h1>
                </div>

                {/* 해당 날짜안의 경기 반복문 돌리기 */}
                {dateMatch.map((match: any, matchIndex: number) => {
                  // 경기 시간을 데이터 객체로 변환 후 url 파라미터에 있는 locale값을 정식 locale값으로 변환 후 toLocaleTimeString을 통해 해당 언어에 해당하는 시간 값으로 반환
                  const matchDate = new Date(match.fixture.date);

                  const matchTime = matchDate.toLocaleTimeString(
                    localeInfo?.toString(),
                    { hour: "numeric", minute: "numeric", hour12: true }
                  );

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

                  // 스코어
                  const score = `${match.goals.home} - ${match.goals.away}`;

                  // 패널티 스코어
                  const penaltyScore = `(${match.score.penalty.home} - ${match.score.penalty.away})`;

                  return (
                    <div
                      key={matchIndex}
                      className="flex h-16 text-sm justify-center items-center cursor-pointer hover:bg-slate-200"
                    >
                      {/* 경기가 시작하지 않거나 취소 및 연기 */}
                      {scheduled.includes(match.fixture.status.short) ||
                      cancle.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5" />
                      ) : // 경기가 진행중이라면
                      live.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-green-500 flex justify-center items-center ml-3">
                          <h1 className="text-white text-xs max-msm:text-xxs">
                            {match.fixture.status.elapsed}
                          </h1>
                        </div>
                      ) : // 경기가 잠시 멈췄다면
                      stop.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2 ml-3">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : //경기가 끝났을 경우
                      finish.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2 ml-3">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : // 부전승이 일어났을경우
                      unearned.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300 flex justify-center items-center dark:bg-custom-gray2 ml-3">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="flex w-6/12 justify-end items-center">
                        <h1 className="dark:text-white max-msm:text-xxs max-sm:w-14 text-center leading-3">
                          {match.teams.home.name}
                        </h1>
                        <Image
                          src={match.teams.home.logo}
                          alt={match.teams.home.name}
                          width={15}
                          height={15}
                          className="mr-4 ml-4 max-sm:mr-0"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </div>
                      <div className="flex w-20 justify-center text-xsm text-gray-600">
                        {/* 경기가 시작하지않았다면 */}
                        {scheduled.includes(match.fixture.status.short) ? (
                          <div>
                            <h1 className="dark:text-white text-xsm max-msm:text-xxs">
                              {matchTime}
                            </h1>
                          </div>
                        ) : // 경기가 진행중, 중단, 끝났을때
                        live.includes(match.fixture.status.short) ||
                          stop.includes(match.fixture.status.short) ||
                          finish.includes(match.fixture.status.short) ||
                          unearned.includes(match.fixture.status.short) ? (
                          <div>
                            <h1 className="dark:text-white text-xsm max-msm:text-xxs">
                              {score}
                            </h1>
                            {/* 패널티 골이 있을경우 */}
                            {match.score.penalty.home ||
                            match.score.penalty.away ? (
                              <h1 className="dark:text-white text-xsm max-msm:text-xxs">
                                {penaltyScore}
                              </h1>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : // 경기가 중단 및 연기되었을떄
                        cancle.includes(match.fixture.status.short) ? (
                          <div>
                            <h1 className="dark:text-white max-msm:text-xxs">
                              {matchTime}
                            </h1>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex w-6/12 justify-start items-center">
                        <Image
                          src={match.teams.away.logo}
                          alt={match.teams.away.name}
                          width={15}
                          height={15}
                          className="ml-4 mr-4 max-sm:ml-0"
                          style={{ width: "18px", height: "18px" }}
                        />
                        <h1 className="dark:text-white max-msm:text-xxs max-sm:w-14  text-center leading-3">
                          {match.teams.away.name}
                        </h1>
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
