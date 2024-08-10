"use client";

import React, { useEffect } from "react";

import Image from "next/image";
import arrow from "../../../public/img/arrow.png";
import trianlge from "../../../public/img/triangle.png";

import moment from "moment-timezone";
import { Calendar } from "@/components/ui/calendar";

import { useState } from "react";
import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { GEOLOCATION_URL } from "@/app/[locale]/(home)/page";

import nowTimezone from "@/lib/nowTimezone";
import stringFormatDate from "@/lib/stringFormatDate";

import { useTranslations } from "next-intl";

export default function Fixtures() {
  // 번역
  const t = useTranslations("Date");

  // 데이터 조회할 날짜 상태값
  const [isDate, setIsDate] = useState("");

  // 보여줄 날짜 상태값들
  const [formattedDate, setFormattedDate] = useState("");

  // 오늘인지 확인하려쓰는 상태값
  const [isToday, setToday] = useState("");

  // 데이터 저장할 상태값
  const [data, setData] = useState([]);

  // 캘린터 visible 상태값
  const [isOpenCal, setIsOpenCal] = useState(false);

  // 캘린더 date 상태값
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  /** 접속한 ip를 통한 국가 가져오기 (타임존 시간대 적용하기 위해) */
  const getLocation = async () => {
    const response = await fetch(
      `${GEOLOCATION_URL}?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
    );
    return response.json();
  };

  /** 타임존과 검색하려는 날짜를 이용해 해당 날짜 경기를 타임존에 적용시켜 데이터 받아오기*/
  const getMatches = async (isDate: string, timezone: string) => {
    const response = await fetch(
      `${FOOTBALL_URL}/fixtures?date=${isDate}&timezone=${timezone}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          // "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      }
    );

    return response.json();
  };

  useEffect(() => {
    const fetch = async () => {

      /** 접속한 인터넷의 ip를 통해 국가를 알아내고 타임존 적용시킨 데이터 반환하기 */
      try {
        const timezone =
          (await getLocation())?.time_zone?.name || "Europe/Copenhagen";

        // 처음 렌더링시 isDate가 빈 문자열이니 처음에만 설정
        if (isDate === "") {
          const currentDate = nowTimezone(timezone);
          setIsDate(currentDate);
          setToday(currentDate);
        }

        // isDate와 Timezone이 있을 경우에만 데이터 Fetcing
        if (isDate && timezone) {
          const { response } = await getMatches(isDate, timezone);
          setData(response);
        }
      } catch (e) {
        console.error(e);
        return;
      }
    };

    fetch();

    // 어제
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    //내일
    const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

    // 오늘 인경우
    if (isToday === isDate) {
      setFormattedDate(t("today"));
      // 어제인 경우
    } else if (isDate === yesterday) {
      setFormattedDate(t("yesterday"));
      // 내일인 경우
    } else if (isDate === tomorrow) {
      setFormattedDate(t("tomorrow"));
    } else {
      /** 스트링 형식의 날짜로 변경 Ex) Wednesday 7 August */
      const changedDate = stringFormatDate(isDate).toLowerCase();
      const [weekday, day, month] = changedDate.split(" ");

      let translated = "";

      window.location.pathname === "/en"
        ? (translated = `${t(weekday)} ${day} ${t(month)}`)
        : window.location.pathname === "/da"
        ? (translated = `${t(weekday)} ${day}. ${t(month)}`)
        : window.location.pathname === "/ko"
        ? (translated = `${t(month)} ${day}일 ${t(weekday)}`)
        : null;

      setFormattedDate(translated);
    }
  }, [isDate, t, isToday]);

  // /** 축구경기 리그별로 데이터 묶기 */
  const groupedByLeague = data?.reduce((acc: any, match: any) => {
    // acc : 반환할 총 데이터 값 , match : 한가지 경기
    const leagueName = match.league.name;
    if (!acc[leagueName]) {
      acc[leagueName] = {
        matches: [],
      };
    }
    acc[leagueName]?.matches?.push(match);
    return acc;
  }, []);

  const leagueKeys = Object.keys(groupedByLeague);

  // 이전날짜 로 바꾸기
  const onClickPreviousDate = () => {
    const dateChange = new Date(isDate);
    dateChange.setDate(dateChange.getDate() - 1);
    const changedDate = dateChange.toISOString().slice(0, 10);
    setIsDate(changedDate);
  };

  // 다음날짜로 바꾸기
  const onClickNextDate = () => {
    const dateChange = new Date(isDate);
    dateChange.setDate(dateChange.getDate() + 1);
    const changedDate = dateChange.toISOString().slice(0, 10);
    setIsDate(changedDate);
  };

    // 달력 날짜 선택
  const onClickSelectDate = (selectedDate:any) => {
    
    // 현재 날짜 변경 값을 데이터에 반영 
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    setIsDate(formattedDate);

    // 달력에 날짜 변경값 변경 후 닫기
    setDate(selectedDate);
    setIsOpenCal(!isOpenCal);
  };


  return (
    <div className="w-3/5 mx-6 max-xl:mx-0 max-xl:w-full mb-20">
      <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0 ">
        <div className="h-16 flex justify-between items-center mx-8 max-msm:mx-4">
          <div>
            <div
              className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400 dark:bg-custom-gray2 dark:hover:bg-custom-gray"
              onClick={onClickPreviousDate}
            >
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
            <div
              className="flex items-center hover:cursor-pointer"
              onClick={() => {
                setIsOpenCal(!isOpenCal);
              }}
            >
              <h1 className="text-base dark:text-white">{formattedDate}</h1>
              <Image
                src={trianlge}
                alt="change date"
                width={16}
                height={16}
                style={{ width: "16px", height: "16px" }}
                className="ml-3 dark:invert"
              />
            </div>
            {isOpenCal && (
              <>
                <div
                  className="w-full h-full bg-black opacity-40 z-40 absolute left-0 top-0"
                  onClick={() => {
                    setIsOpenCal(!isOpenCal);
                  }}
                ></div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={onClickSelectDate}
                  className="fixed rounded-xl border z-50 top-2/4 left-2/4 shadow bg-white dark:bg-black dark:border-solid dark:border-white dark:border-1"
                  style={{  "transform": "translate(-50%, -50%)", }}
                />
              </>
            )}
          </div>
          <div
            className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray2 dark:hover:bg-custom-gray"
            onClick={onClickNextDate}
          >
            <Image
              src={arrow}
              alt="arrow"
              width={11}
              height={11}
              style={{ width: "11px", height: "11px" }}
              className="rotate-270 dark:invert"
            />
          </div>
        </div>
        <hr className="dark:border-custom-gray2" />
      </div>

      <div className="w-full h-aut rounded-xl pb-4 dark:border-0 mt-4">
        <div>
          {leagueKeys.map((leagueName: string, leagueIndex: number) => {
            // 변수[키값]을 통해 해당하는 리그의 경기 데이터를 모두 가져옴
            const leagueMatch = groupedByLeague[leagueName].matches;

            return (
              <ul
                key={leagueIndex}
                className="bg-white border-solid border border-slate-200 mt-5 rounded-xl dark:border-0 dark:bg-custom-dark"
              >
                <div className="p-4 bg-slate-100 rounded-t-xl flex cursor-pointer hover:bg-slate-200 dark:bg-custom-lightDark dark:hover:bg-custom-gray3 max-msm:p-2.5">
                  <Image
                    src={leagueMatch[0].league.logo}
                    alt={leagueMatch[0].league.name}
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "16px" }}
                    className="mx-2"
                  />
                  <h1 className="text-sm font-medium ml-3 dark:text-white max-msm:text-xs">
                    {leagueName}
                  </h1>
                </div>
                {leagueMatch.map((match: any, matchIndex: number) => {
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

                  // 매치시간 (경기가 스케줄되었을떄)
                  const matchTime = new Date(match.fixture.date)
                    .toString()
                    .substring(16, 21);

                  // 스코어
                  const score = `${match.goals.home} - ${match.goals.away}`;

                  // 패널티 스코어
                  const penaltyScore = `(${match.score.penalty.home} - ${match.score.penalty.away})`;

                  return (
                    <li
                      key={matchIndex}
                      className="flex px-4 py-5 text-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-custom-gray3 dark:hover:rounded-b-xl"
                    >
                      {/* 경기가 시작하지 않거나 취소 및 연기 */}
                      {scheduled.includes(match.fixture.status.short) ||
                      cancle.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5" />
                      ) : // 경기가 진행중이라면
                      live.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-green-600 flex justify-center items-center">
                          <h1 className="text-white text-xs max-msm:text-xxs">
                            {match.fixture.status.elapsed}
                          </h1>
                        </div>
                      ) : // 경기가 잠시 멈췄다면
                      stop.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : //경기가 끝났을 경우
                      finish.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300  flex justify-center items-center dark:bg-custom-gray2">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : // 부전승이 일어났을경우
                      unearned.includes(match.fixture.status.short) ? (
                        <div className="w-7 h-5 rounded-full bg-slate-300 flex justify-center items-center dark:bg-custom-gray2">
                          <h1 className="text-white text-xs dark:text-gray-200 max-msm:text-xxs">
                            {match.fixture.status.short}
                          </h1>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="w-full flex justify-center mr-7">
                        <div className="flex w-2/5 justify-end">
                          <h1 className="dark:text-white max-msm:text-xxs">
                            {match.teams.home.name}
                          </h1>
                          <Image
                            src={match.teams.home.logo}
                            alt={match.teams.home.name}
                            width={15}
                            height={15}
                            style={{ width: "18px", height: "18px" }}
                            className="ml-5 max-msm:ml-2"
                          />
                        </div>
                        {/* 경기가 시작하지않았다면 */}
                        {scheduled.includes(match.fixture.status.short) ? (
                          <div className="w-1/5 flex justify-center">
                            <h1 className="dark:text-white max-msm:text-xxs">
                              {matchTime}
                            </h1>
                          </div>
                        ) : // 경기가 진행중, 중단, 끝났을때
                        live.includes(match.fixture.status.short) ||
                          stop.includes(match.fixture.status.short) ||
                          finish.includes(match.fixture.status.short) ||
                          unearned.includes(match.fixture.status.short) ? (
                          <div className="w-1/5 h-full flex flex-col items-center justify-center">
                            <h1 className="dark:text-white max-msm:text-xxs">
                              {score}
                            </h1>
                            {/* 패널티 골이 있을경우 */}
                            {match.score.penalty.home ||
                            match.score.penalty.away ? (
                              <h1 className="dark:text-white text-xs max-msm:text-xxs">
                                {penaltyScore}
                              </h1>
                            ) : (
                              <></>
                            )}
                          </div>
                        ) : // 경기가 중단 및 연기되었을떄
                        cancle.includes(match.fixture.status.short) ? (
                          <div className="w-1/5 flex justify-center">
                            <h1 className="dark:text-white max-msm:text-xxs">
                              {matchTime}
                            </h1>
                          </div>
                        ) : (
                          <></>
                        )}
                        <div className="flex w-2/5">
                          <Image
                            src={match.teams.away.logo}
                            alt={match.teams.away.name}
                            width={15}
                            height={15}
                            className="mr-5 max-msm:mr-2"
                            style={{ width: "18px", height: "18px" }}
                          />
                          <h1 className="dark:text-white max-msm:text-xxs">
                            {match.teams.away.name}
                          </h1>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
