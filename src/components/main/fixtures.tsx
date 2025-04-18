"use client";

import React, { useEffect, useState, useRef } from "react";

import Image from "next/image";
import arrow from "../../../public/img/arrow.png";
import trianlge from "../../../public/img/triangle.png";
import search from "../../../public/img/search.png";

import moment from "moment-timezone";
import { Calendar } from "@/components/ui/calendar";

import { FOOTBALL_URL } from "@/app/[locale]/(home)/page";
import { GEOLOCATION_URL } from "@/app/[locale]/(home)/page";

import nowTimezone from "@/lib/nowTimezone";
import stringFormatDate from "@/lib/stringFormatDate";

import { useTranslations } from "next-intl";

import { useAppDispatch } from "@/lib/storeHooks";
import { setLocation } from "@/lib/features/locationSlice";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function Fixtures() {
  const router = useRouter();
  const locale = useLocale();

  const dispatch = useAppDispatch();
  // 참조변수
  const inputRef = useRef<HTMLInputElement>(null);
  // 번역
  const t = useTranslations("date");
  const s = useTranslations("status");
  const m = useTranslations("main");
  const g = useTranslations("general");

  // 데이터 조회할 날짜 상태값
  const [isDate, setIsDate] = useState("");

  // 타임존 상태값
  const [isTimezone, setTimezone] = useState(null);

  // 보여줄 날짜 상태값들
  const [formattedDate, setFormattedDate] = useState("");

  // 오늘인지 확인하려쓰는 상태값
  const [isToday, setToday] = useState("");

  // 보여줄 데이터 저장할 상태값
  const [data, setData] = useState([]);

  // 필터또는 가공되지않은 원본 데이터를 저장할 값
  const [initialData, setInitialData] = useState([]);

  // 캘린터 visible 상태값
  const [isOpenCal, setIsOpenCal] = useState(false);

  // 캘린더 date 상태값
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // 선택한 데이터 필터값
  const [filter, setFilter] = useState("all");

  // 검색 중인지 아닌지 판단
  // 검색 중일 경우 가공되지않은 원본 데이터를 사용해 검색을 함 / 전체 데이터 검색임을 알리기 위해 filter값을 all로 표시해주기 위해 forSearchRef가 true일 경우 데이터 통신을 스킵하고 끝날땐 forSearchRef 초기화, useState로 설정시 의존성 배열을 강제로 추가해야하기때문에 useRef 참조변수를 사용
  const forSearchRef = useRef(false);

  /** 접속한 ip를 통한 국가 가져오기 (타임존 시간대 적용하기 위해) */
  const getLocation = async () => {
    const response = await fetch(
      `${GEOLOCATION_URL}?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
    );
    return response.json();
  };

  /** 타임존과 검색하려는 날짜를 이용해 해당 날짜 경기를 타임존에 적용시켜 모든 데이터 받아오기*/
  const getMatches = async (isDate: string, timezone: string) => {
    const response = await fetch(
      `${FOOTBALL_URL}/fixtures?date=${isDate}&timezone=${timezone}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      }
    );
    return response.json();
  };

  /** 타임존과 파라미터를 통해 현재 진행하는 경기 데이터만 받아오기*/
  const getLiveMatches = async (timezone: string) => {
    const response = await fetch(
      `${FOOTBALL_URL}/fixtures?live=all&timezone=${timezone}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
        },
      }
    );

    return response.json();
  };

  /** 데이터 통신 useEffect */
  useEffect(() => {
    const fetch = async () => {
      /** 접속한 인터넷의 ip를 통해 국가를 알아내고 타임존 적용시킨 데이터 반환하기 */
      try {
        // isTimezone이 존재하지 않을 때만 설정
        if (!isTimezone) {
          const timezone =
            (await getLocation())?.time_zone?.name || "Europe/Copenhagen";
          setTimezone(timezone);

          /** 타임존을 전역 상태값에 저장 */
          dispatch(setLocation(timezone));
        }

        // 처음 렌더링시 isDate가 빈 문자열이니 처음에만 설정 // isTimezone값이 있을때만
        if (isDate === "" && isTimezone) {
          const currentDate = nowTimezone(isTimezone);
          setIsDate(currentDate);
          setToday(currentDate);
        }
        // 검색 중일 경우 데이터 통신x, 검색 중이 아닐 경우 데이터 통신 O
        if (!forSearchRef.current) {
          // 모든 데이터 받아오기 (Default)
          if (
            isDate &&
            isTimezone &&
            (filter === "all" ||
              filter === "finished" ||
              filter === "scheduled")
          ) {
            const { response } = await getMatches(isDate, isTimezone);

            if (filter === "all") {
              // InitialData : 초기데이터는 따로 저장해두기
              setInitialData(response);
              setData(response);
              // 끝난 경기 데이터만 보여주기(finished 클릭시)
            } else if (filter === "finished") {
              const status = ["FT", "AET", "PEN", "AWD", "WO"];
              const finishedMatch = response.filter((match: any) => {
                return status.includes(match.fixture.status.short);
              });
              setData(finishedMatch);

              // 예정된 데이터만 보여주기(scheduled 클릭시)
            } else if (filter === "scheduled") {
              const scheduledMatch = response.filter((match: any) => {
                const status = ["TBD", "NS"];
                return status.includes(match.fixture.status.short);
              });
              setData(scheduledMatch);
            }
          }
          /// 현재 진행중인 경기 데이터만 받아오기 (live 클릭시)
          else if (isTimezone && filter === "live") {
            const { response } = await getLiveMatches(isTimezone);
            setData(response);
          }
        }
      } catch (e) {
        console.error(e);
        return;
      } finally {
        forSearchRef.current = false; // 검색이 끝난 후에는 고정적으로 false로 변경
      }
    };

    fetch();
  }, [isDate, filter, isTimezone, dispatch]);

  /** 날짜 포맷 useEffect*/
  useEffect(() => {
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
  }, [isDate, isToday, t]);

  // 검색이벤트
  const onClickSearch = () => {
    // 입력된 값
    const input = inputRef.current?.value.trim().toLowerCase();
    forSearchRef.current = true;

    /** 특정 [진행중,예정된,종료된]과 같이 특정 필터가 선택된 상태에서는 사용자 편의상 검색된 결과가 전체 결과라는 것을 알려주기위해 필터를 [전체]로 바꾸어줘야하는데
     * 이런 케이스는 useState로인해 자동적으로 데이터가 다시한번 받아와져서 불필요한 통신이 생기니
     * useState문안에서 if else 조건문을 통하여 검색 중일땐 데이터 통신을 하지않고 스킵하게 끔 forSearchRef 참조변수가 true또는 false를 구분하여 구현
     * forSearchRef.current를 앞에 명시함으로써 한번의 검색 후 다시 한 번 검색시에도 불필요한 데이터 통신은 발생하지 않게 됌
     */
    setFilter("all");

    if (!input) {
      // 초반 가공되지않은 데이터로 복구
      setData(initialData);
    } else {
      // 받아온 데이터를 바탕으로 필터링
      const search = initialData.filter((match: any) => {
        return (
          match.teams.home.name.toLowerCase().includes(input) ||
          match.teams.away.name.toLowerCase().includes(input)
        );
      });

      // 필터링한 데이터 저장
      setData(search);
    }
  };

  // 리그 id가 낮은 순서부터 보여주기 위해 재배열
  const sortedData = data.sort((a:any,b:any) => a.league.id - b.league.id);

  // /** 축구경기 리그별로 데이터 묶기 */
  const groupedByLeague = sortedData?.reduce((acc: any, match: any) => {
    // acc : 반환할 총 데이터 값 , match : 한가지 경기
    const leagueId = match.league.id;
    const leagueName = match.league.name;

    if (!acc[leagueId]) {
      acc[leagueId] = {
        leagueName,
        matches: [],
      };
    }
    acc[leagueId]?.matches?.push(match);
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
  const onClickSelectDate = (selectedDate: any) => {
    // 현재 날짜 변경 값을 데이터에 반영
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    setIsDate(formattedDate);

    // 달력에 날짜 변경값 변경 후 닫기
    setDate(selectedDate);
    setIsOpenCal(!isOpenCal);
  };

  /**경기 상세 페이지로 이동 */
  const moveToFormattedMatchURL = (home: string, away: string, matchID: number) => {

    const matchVS = `${home}-vs-${away}`;

    // 하이픈을 모두 삭제합니다.
    const noHyphens = matchVS.replace(/-/g, " ");

    // 두 번 이상의 연속 공백을 하나로 줄입니다.
    const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

    // 1. 공백을 하이픈으로 변경
    const hyphenated = cleanedString.replace(/\s+/g, "-");

    // 2. 온점을 제거
    const withoutDots = hyphenated.replace(/\./g, "");

    // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
    const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

    // 4. 소문자로 변환
    const name = withHyphens.toLowerCase();

    /** 최종 */
    const url = `/${locale}/matches/${name}/${matchID}`;

    router.push(url);
  };

  return (
    <div className="w-3/5 mx-6 max-xl:mx-0 max-xl:w-full mb-20">
      {/** 필터 부분 */}
      <div className="w-full h-auto bg-white rounded-xl border-solid border border-slate-200 pb-4 dark:bg-custom-dark dark:border-0 ">
        <div className="h-16 flex justify-between items-center mx-8 max-msm:mx-4">
          <div>
            <div
              className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray"
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
                className={`ml-3 dark:invert transition-transform duration-300 ${
                  isOpenCal ? "rotate-m180" : "rotate-0"
                }`}
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
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </>
            )}
          </div>
          <div
            className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray"
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
        <div className="flex justify-between mx-8 mt-4">
          <div className="flex h-7">
            <div
              className={` rounded-2xl text-xsm px-2.5 cursor-pointer box-border flex items-center mr-3 w-fit text-nowrap dark:border-0 dark:bg-custom-gray3 dark:text-white ${
                filter === "all"
                  ? "bg-black text-white dark:bg-white dark:text-custom-gray3"
                  : "border border-solid border-slate-300 hover:bg-slate-300 dark:hover:bg-custom-gray2"
              }`}
              onClick={() => setFilter("all")}
            >
              <h1>{s("all")}</h1>
            </div>
            <div
              className={` rounded-2xl text-xsm px-2.5 cursor-pointer box-border flex items-center mr-3 w-fit text-nowrap dark:border-0 dark:bg-custom-gray3 dark:text-white ${
                filter === "live"
                  ? "bg-black text-white dark:bg-white dark:text-custom-gray3"
                  : "border border-solid border-slate-300 hover:bg-slate-300 dark:hover:bg-custom-gray2"
              }`}
              onClick={() => setFilter("live")}
            >
              <h1>{s("live")}</h1>
            </div>
            <div
              className={` rounded-2xl text-xsm px-2.5 cursor-pointer box-border flex items-center mr-3 w-fit text-nowrap dark:border-0 dark:bg-custom-gray3 dark:text-white ${
                filter === "finished"
                  ? "bg-black text-white dark:bg-white dark:text-custom-gray3"
                  : "border border-solid border-slate-300 hover:bg-slate-300 dark:hover:bg-custom-gray2"
              }`}
              onClick={() => setFilter("finished")}
            >
              <h1>{s("finished")}</h1>
            </div>
            <div
              className={` rounded-2xl text-xsm px-2.5 cursor-pointer box-border flex items-center mr-3 w-fit text-nowrap dark:border-0 dark:bg-custom-gray3 dark:text-white ${
                filter === "scheduled"
                  ? "bg-black text-white dark:bg-white dark:text-custom-gray3"
                  : "border border-solid border-slate-300 hover:bg-slate-300 dark:hover:bg-custom-gray2"
              }`}
              onClick={() => setFilter("scheduled")}
            >
              <h1>{s("scheduled")}</h1>
            </div>
          </div>
          <div className="border border-solid border-slate-300 rounded-2xl w-full dark:border-custom-gray3 h-7  max-msm:hidden">
            <div className="h-full relative">
              <input
                ref={inputRef}
                className="h-full text-xsm text-custom-gray2 rounded-2xl w-full px-4 pl-12  dark:bg-custom-gray3 dark:text-white focus:outline-none"
                placeholder={`${s("filter")}`}
              />
              <Image
                src="/img/filter.png"
                alt="filter icon"
                width={14}
                height={9}
                style={{ width: "14px", height: "9px" }}
                className="absolute top-0 mt-2 ml-5 opacity-40 dark:invert dark:opacity-100"
              />
            </div>
          </div>
          <div
            className="border border-solid border-slate-300 rounded-2xl w-64 h-7  max-msm:hidden ml-3 flex justify-center items-center cursor-pointer hover:bg-slate-300 dark:bg-custom-gray3 dark:border-0 dark:hover:bg-custom-gray2"
            onClick={onClickSearch}
          >
            <Image
              src={search}
              alt={"search"}
              width={13}
              height={13}
              style={{ width: "13px", height: "13px" }}
              className="mr-2 dark:invert"
            />
            <h1 className="text-xsm dark:text-white">{m("search")}</h1>
          </div>
        </div>
      </div>

      {/* 경기 표 */}
      <div className="w-full h-aut rounded-xl pb-4 dark:border-0 mt-4">
        <div>
          {leagueKeys.length > 0 ? (
            leagueKeys.map((leagueID: string, leagueIndex: number) => {

              // 리그 이름
              const leagueName = groupedByLeague[leagueID].leagueName;

              // 변수[키값]을 통해 해당하는 리그의 경기 데이터를 모두 가져옴
              const leagueMatch = groupedByLeague[leagueID].matches;

              // 하이픈을 모두 삭제합니다.
              const noHyphens = leagueMatch[0].league.name.replace(/-/g, " ");

              // 두 번 이상의 연속 공백을 하나로 줄입니다.
              const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

              // 1. 공백을 하이픈으로 변경
              const hyphenated = cleanedString.replace(/\s+/g, "-");

              // 2. 온점을 제거
              const withoutDots = hyphenated.replace(/\./g, "");

              // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
              const withHyphens = withoutDots.replace(
                /(?<=[A-Z])-(?=[a-z])/g,
                "-"
              );

              /** 최종 */
              const name = withHyphens.toLowerCase();

              return (
                <ul
                  key={leagueIndex}
                  className="bg-white border-solid border border-slate-200 mt-5 rounded-xl dark:border-0 dark:bg-custom-dark"
                >
                  <div
                    className="p-4 bg-slate-100 rounded-t-xl flex cursor-pointer hover:bg-slate-200 dark:bg-custom-lightDark dark:hover:bg-custom-gray3 max-msm:p-2.5"
                    onClick={() => {
                      router.push(
                        `${locale}/leagues/${leagueMatch[0].league.id}/${name}/overview`
                      );
                    }}
                  >
                    <Image
                      src={leagueMatch[0].league.logo}
                      alt={leagueMatch[0].league.name}
                      width={16}
                      height={16}
                      style={{ width: "16px", height: "16px" }}
                      className="mx-2"
                      loading="lazy" 
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
                        onClick={() => moveToFormattedMatchURL(match.teams.home.name, match.teams.away.name, match.fixture.id)}
                      >
                        {/* 경기가 시작하지 않거나 취소 및 연기 */}
                        {scheduled.includes(match.fixture.status.short) ||
                        cancle.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5" />
                        ) : // 경기가 진행중이라면
                        live.includes(match.fixture.status.short) ? (
                          <div className="w-7 h-5 rounded-full bg-green-500 flex justify-center items-center">
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
                              loading="lazy" 
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
                              loading="lazy" 
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
            })
          ) : (
            <div className="bg-white border-solid border border-slate-200 mt-5 rounded-xl dark:border-0 dark:bg-custom-dark py-8">
              <h1 className="text-center text-base dark:text-white">
                {g("noresults")}
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
