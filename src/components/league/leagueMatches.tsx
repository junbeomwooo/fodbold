"use client";

import React, { useEffect, useState, useRef, Fragment } from "react";
import LeagueHeader from "./header/leagueHeader";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useRouter } from "next/navigation";

import {
  getLeague,
  setSelectedSeason,
  getMatches,
  setSeasonChanged,
} from "@/lib/features/leagueSlice";

import { useTranslations } from "next-intl";

import Image from "next/image";
import arrow from "../../../public/img/arrow.png";
import LimittedError from "../reuse/limittedError";
import handleLimitedError from "@/lib/handlelimitedError";

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
    seasonChange,
  }: { seasons: any; match: any; selectedSeason: any; seasonChange: any } =
    useAppSelector((state) => state.leagueSlice);

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
  const [selectedYearChanged, setSelectedYearChanged] =
    useState<boolean>(seasonChange);

  /** 각 월별로 데이터 필터링을 위한 상태값 */
  const [filterMonth, setFilterMonth] = useState(new Date());

  /** 현재 url에 적용된 locale을 정보를 localeDateString 형식에 맞게 변환하기 */
  const localeInfo =
    locale === "en"
      ? "en-US"
      : locale === "ko"
      ? "ko-KR"
      : locale === "da"
      ? "da-DK"
      : null;

  const router = useRouter();

  // 이전 탭에서 년도 값 변경이 있었는지 모니터링하기위한 상태값;
  const OnHandleSeasonChange = (value: boolean) => {
    dispatch(setSeasonChanged(value));
  };

  // State value for Error components
  const [isError, setIsError] = useState<string | null>(null);
  // Ref value for preventing duplicate error messages
  const hadErrorMsgRef = useRef(false);

  // 1. 시즌 정보가 없을 때 가져오는 useEffect
  useEffect(() => {
    const fetchSeason = async () => {
      if (!season) {
        try {
          await dispatch(getLeague({ id })).unwrap();
        } catch (error: any) {
          handleLimitedError({
            error: error,
            ref: hadErrorMsgRef,
            setIsError: setIsError,
          });
        }
      }
    };

    fetchSeason();
  }, [dispatch, id, season]);

  // 2. selectedYear가 0이면 최신 시즌을 설정하는 useEffect, 매치데이터가 없을경우 매치데이터 페칭
  useEffect(() => {
    const initSelectedYear = async () => {
      try {
        if (season && selectedYear === 0) {
          const lastSeason = season[season.length - 1].year;
          setSelectedYear(lastSeason);

          if (!match) {
            await dispatch(
              getMatches({
                leagueID: id,
                season: lastSeason,
                timezone: location,
              })
            ).unwrap();
          }
        }
      } catch (error: any) {
        handleLimitedError({
          error: error,
          ref: hadErrorMsgRef,
          setIsError: setIsError,
        });
      }
    };

    initSelectedYear();
  }, [season, selectedYear, dispatch, id, location, match]);

  // 3. selectedYear이 변경될 때 매치 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchingMatchData = async () => {
      try {
        if (selectedYear !== 0 && selectedYearChanged) {
          // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
          await dispatch(setSelectedSeason(selectedYear));
          const payload = await dispatch(
            getMatches({
              leagueID: id,
              season: selectedYear,
              timezone: location,
            })
          ).unwrap();

          // 시즌 값이 변경되면서 페이지네이션을 위한 filterMonth 상태값을 해당 시즌의 첫경기로 고정시키기 위해
          const match = payload?.payload;
          const sortedMatch = Array.isArray(match)
            ? [...match].sort((a: any, b: any) => {
                return a.fixture.timestamp - b.fixture.timestamp;
              })
            : null;
          if (sortedMatch) {
            const newFilterMonth = new Date(sortedMatch[0]?.fixture?.date);
            setFilterMonth(newFilterMonth);
          }
        }
      } catch (error: any) {
        handleLimitedError({
          error: error,
          ref: hadErrorMsgRef,
          setIsError: setIsError,
        });
      }
    };

    fetchingMatchData();
  }, [dispatch, id, selectedYear, selectedYearChanged, location]);

  /** 이전 코드 */
  // // 1. 시즌 정보가 없을 때 가져오는 useEffect
  // useEffect(() => {
  //   if (!season) {
  //     dispatch(getLeague({ id }));
  //   }
  // }, [dispatch, id, season]);

  // // 2. selectedYear가 0이면 최신 시즌을 설정하는 useEffect
  // useEffect(() => {
  //   if (season && selectedYear === 0) {
  //     const lastSeason = season[season.length - 1].year;
  //     setSelectedYear(lastSeason);

  //     if (!match) {
  //       dispatch(
  //         getMatches({ leagueID: id, season: lastSeason, timezone: location })
  //       );
  //     }
  //   }
  // }, [season, selectedYear, dispatch, id, location, match]);

  // // 3. selectedYear이 변경될 때 데이터를 가져오는 useEffect
  // useEffect(() => {
  //   if (selectedYear !== 0 && selectedYearChanged) {
  //     // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
  //     dispatch(setSelectedSeason(selectedYear));
  //     dispatch(
  //       getMatches({ leagueID: id, season: selectedYear, timezone: location })
  //       // 시즌 값이 변경되면서 페이지네이션을 위한 filterMonth 상태값을 해당 시즌의 첫경기로 고정시키기 위해
  //     ).then((payload) => {
  //       const match = payload?.payload;
  //       const sortedMatch = Array.isArray(match)
  //         ? [...match].sort((a: any, b: any) => {
  //             return a.fixture.timestamp - b.fixture.timestamp;
  //           })
  //         : null;
  //       if (sortedMatch) {
  //         const newFilterMonth = new Date(sortedMatch[0]?.fixture?.date);
  //         setFilterMonth(newFilterMonth);
  //       }
  //     });
  //   }
  // }, [dispatch, id, selectedYear, selectedYearChanged, location]);

  /** 받아온 데이터를 시간순으로 정렬 */
  const sortedMatch = Array.isArray(match)
    ? [...match].sort((a: any, b: any) => {
        return a.fixture.timestamp - b.fixture.timestamp;
      })
    : null;

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

    console.log(filteredMatches);

  /** 선택한 년도와 같은 시즌 정보 가져오기 */
  const foundSeason = seasons?.seasons.find(
    (season: any) => season.year === selectedYear
  );

  // 시즌 시작
  const startedDate = new Date(foundSeason?.start);

  // 시즌 종료
  const endDate = new Date(foundSeason?.end);

  /** 다음 달로 데이터 조회 */
  const onClickNextMonth = () => {
    const date = new Date(filterMonth);
    date.setMonth(date.getMonth() + 1);
    /** 다음 달의 첫번째 날짜로 설정
     * ex) 시즌 끝 : 6월 30일이고 만약 현재 날짜가 5월 31일일 경우 자동으로 6월달 데이터는 없다고 판단할 수 있기에
     * 날짜를 고정적으로 첫번째로 정해줄 경우 이러한 경우를 방지할 수 있음.
     */
    date.setDate(1);

    if (date > endDate) {
      return;
    }
    // 다음달로 변경
    setFilterMonth(date);
  };

  /** 이전 달로 데이터 조회 */
  const onClickPrevMonth = () => {
    const date = new Date(filterMonth);
    date.setMonth(date.getMonth() - 1);

    /** 다음 달의 마지막 날짜로 설정 (어떤 달은 31일이나 30일이 존재하지않아서 오류가 생겨서 월 변환이 잘이루어지지않아서 사용하지 않음)
     *  차선책으로 startedDate의 date객체만 빼서 setDate에 지정 시
     * 설령 시즌 시작일일지라도 같은 값을 가지고있어 return문을 발생시키지않고 시즌 시작일 보다 이전일 경우에는
     * 시즌 시작일 값이 더 크기때문에 의도대로 잘 작동함
     */
    date.setDate(startedDate.getDate());

    if (date < startedDate) {
      return;
    }
    // 이전 달로 변경
    setFilterMonth(date);
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

  /**경기 상세 페이지로 이동 */
  const formattedLeagueURL = (home: string, away: string, matchID: number) => {
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

  const isPrevMonthDisabled =
    new Date(filterMonth.getFullYear(), filterMonth.getMonth(), 1) <=
    new Date(startedDate.getFullYear(), startedDate.getMonth(), 1);

  const isNextMonthDisabled =
    new Date(filterMonth.getFullYear(), filterMonth.getMonth(), 1) >=
    new Date(endDate.getFullYear(), endDate.getMonth(), 1);

  return (
    <Fragment>
      <LeagueHeader
        id={id}
        seasons={seasons}
        setSelectedYear={setSelectedYear}
        selectedYear={selectedYear}
        locale={locale}
        league={league}
        setSelectedYearChanged={setSelectedYearChanged}
        onHandleSeasonChange={OnHandleSeasonChange}
      />
      {/* 날짜 키 값 반복돌리기 */}
      <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 max-sm:px-0 rounded-xl dark:bg-custom-dark dark:border-0">
        {/* 날짜 선택 부분 */}
        <div className="h-16 flex justify-between items-center max-msm:mx-4">
          <div>
            <div
              className={`w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center dark:bg-custom-gray3 ${
                isPrevMonthDisabled
                  ? "opacity-30"
                  : "opacity-100 hover:cursor-pointer hover:bg-slate-400 dark:hover:bg-custom-gray"
              }`}
              onClick={onClickPrevMonth}
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
            <div className="flex items-center hover:cursor-pointer">
              <h1 className="text-base dark:text-white">
                {new Date().getFullYear() === filterMonth.getFullYear()
                  ? filterMonth.toLocaleDateString(localeInfo?.toString(), {
                      month: "long",
                    })
                  : filterMonth.toLocaleDateString(localeInfo?.toString(), {
                      year: "numeric",
                      month: "long",
                    })}
              </h1>
            </div>
          </div>
          <div
            className={`w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center dark:bg-custom-gray3 ${
              isNextMonthDisabled
                ? "opacity-30"
                : "opacity-100 hover:cursor-pointer hover:bg-slate-400 dark:hover:bg-custom-gray"
            }`}
            onClick={onClickNextMonth}
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
                <div className="w-full h-10 bg-slate-100 dark:bg-[#333333] rounded-xl flex items-center px-5 max-sm:rounded-none">
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
                    /** headtohead 페이지를 위한 url 조작하기 */
                    <div
                      key={matchIndex}
                      className="flex h-16 text-sm justify-center items-center cursor-pointer hover:bg-slate-200"
                      onClick={() =>
                        formattedLeagueURL(
                          match.teams.home.name,
                          match.teams.away.name,
                          match.fixture.id
                        )
                      }
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
      {isError && <LimittedError isError={isError} setIsError={setIsError} />}
    </Fragment>
  );
}
