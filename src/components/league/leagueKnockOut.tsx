"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LeagueHeader from "./header/leagueHeader";

import {
  getLeague,
  setSelectedSeason,
  getMatches,
  setSeasonChanged,
} from "@/lib/features/leagueSlice";
import Image from "next/image";
import FormatMatchDate from "@/lib/formatMatchDate";
import { useTranslations } from "next-intl";

export default function LeagueKnockOut({
  id,
  locale,
  league,
}: {
  id: number;
  locale: string;
  league: string;
}) {
  /**
   *
   * Knockout Round Play-offs
   * Round of 16 || 8th Finals
   * Quarter-finals
   * Semi-finals
   * Final
   * 3rd Place Final
   */

  /** data for location state value */
  const { location }: any = useAppSelector((state) => state.locationSlice);

  /** Redux */
  const dispatch = useAppDispatch();

  /** Router */
  const router = useRouter();

  /** translate */
  const d = useTranslations("date");

  /** match data state value */
  const {
    seasons,
    match,
    selectedSeason,
    seasonChange,
  }: { seasons: any; match: any; selectedSeason: any; seasonChange: any } =
    useAppSelector((state) => state.leagueSlice);

  const season = seasons ? seasons.seasons : null;
  const selected = selectedSeason ? selectedSeason : 0;

  /** State value for selected year */
  const [selectedYear, setSelectedYear] = useState<number>(selected);

  /** State value for checking year has been changed*/
  const [selectedYearChanged, setSelectedYearChanged] =
    useState<boolean>(seasonChange);

  /** Formmat locale(language) information which applied for this website */
  const localeInfo =
    locale === "en"
      ? "en-US"
      : locale === "ko"
      ? "ko-KR"
      : locale === "da"
      ? "da-DK"
      : null;

  const OnHandleSeasonChange = (value: boolean) => {
    dispatch(setSeasonChanged(value));
  };

  /**
   * 1. 원하는 데이터 잘추출했고 모든 페이지에서 잘 작동하는거 확인했으니 넉아웃 페이지 구현하기
   * http://localhost:3000/en/leagues/1/world-cup/playoff
   * http://localhost:3000/en/leagues/2/champions-league/playoff
   */

  // 1. if there is no season data, fetch season data
  // useEffect(() => {
  //   if (!season) {
  //     dispatch(getLeague({ id }));
  //   }
  // }, [dispatch, id, season]);

  // // 2 if selectedYear has no value, set lastest season
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

  // // 3. When selected year has been changed, fetch new data for chnaged month
  // useEffect(() => {
  //   if (selectedYear !== 0 && selectedYearChanged) {
  //     // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
  //     dispatch(setSelectedSeason(selectedYear));
  //     dispatch(
  //       getMatches({ leagueID: id, season: selectedYear, timezone: location })
  //     );
  //   }
  // }, [dispatch, id, selectedYear, selectedYearChanged, location]);

  /** Find 'Round of 16' data */
  const round16 = match?.filter((v: any) => {
    return (
      v?.league?.round === "Round of 16" || v?.league?.round === "8th Finals"
    );
  });

  const groupdByRound16 = round16?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");
    console.log(v);
    if (!acc[key]) {
      acc[key] = {
        team1: v?.teams?.home?.name,
        team2: v?.teams?.away?.name,
        team1ID: v?.teams?.home?.id,
        team2ID: v?.teams?.away?.id,
        team1Score: v?.goals?.home || 0,
        team2Score: v?.goals?.away || 0,
        team1Penalty: v?.score?.penalty?.home || 0,
        team2Penalty: v?.score?.penalty?.away || 0,
        team1Logo: v?.teams?.home?.logo,
        team2Logo: v?.teams?.away?.logo,
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
    }
    return acc;
  }, []);

  const roundOf16 = round16 && Object.values(groupdByRound16);

  console.group("Round of 16");
  console.log(roundOf16);
  console.groupEnd();

  /** Find Quarter-finals data */
  const quarter = match?.filter((v: any) => {
    return v?.league?.round === "Quarter-finals";
  });

  const groupdByquarter = quarter?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");
    if (!acc[key]) {
      acc[key] = {
        team1: v?.teams?.home?.name,
        team2: v?.teams?.away?.name,
        team1ID: v?.teams?.home?.id,
        team2ID: v?.teams?.away?.id,
        team1Score: v?.goals?.home || 0,
        team2Score: v?.goals?.away || 0,
        team1Penalty: v?.score?.penalty?.home || 0,
        team2Penalty: v?.score?.penalty?.away || 0,
        team1Logo: v?.teams?.home?.logo,
        team2Logo: v?.teams?.away?.logo,
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
    }
    return acc;
  }, []);

  const quarterFinals = groupdByquarter && Object.values(groupdByquarter);

  console.group("Quarter-finals");
  console.log(quarterFinals);
  console.groupEnd();

  /** Find Semi-finals data */
  const semi = match?.filter((v: any) => {
    return v?.league?.round === "Semi-finals";
  });

  const groupdBySemi = semi?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");
    if (!acc[key]) {
      acc[key] = {
        team1: v?.teams?.home?.name,
        team2: v?.teams?.away?.name,
        team1ID: v?.teams?.home?.id,
        team2ID: v?.teams?.away?.id,
        team1Score: v?.goals?.home || 0,
        team2Score: v?.goals?.away || 0,
        team1Penalty: v?.score?.penalty?.home || 0,
        team2Penalty: v?.score?.penalty?.away || 0,
        team1Logo: v?.teams?.home?.logo,
        team2Logo: v?.teams?.away?.logo,
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
    }
    return acc;
  }, []);

  const semiFinals = groupdBySemi && Object.values(groupdBySemi);

  console.group("Semi-finals");
  console.log(semiFinals);
  console.groupEnd();

  /** Find Final data */
  const lastStage = match?.filter((v: any) => {
    return v?.league?.round === "Final";
  });

  const groupdByLastStage = lastStage?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");
    if (!acc[key]) {
      acc[key] = {
        team1: v?.teams?.home?.name,
        team2: v?.teams?.away?.name,
        team1ID: v?.teams?.home?.id,
        team2ID: v?.teams?.away?.id,
        team1Score: v?.goals?.home || 0,
        team2Score: v?.goals?.away || 0,
        team1Penalty: v?.score?.penalty?.home || 0,
        team2Penalty: v?.score?.penalty?.away || 0,
        team1Logo: v?.teams?.home?.logo,
        team2Logo: v?.teams?.away?.logo,
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
    }
    return acc;
  }, []);

  const final = groupdByLastStage && Object.values(groupdByLastStage);

  console.group("Final");
  console.log(final);
  console.groupEnd();

  // /** Find 3rd Place Final data */
  // const thirdPlace = match?.filter((v: any) => {
  //   return v?.league?.round === "3rd Place Final";
  // });

  // console.group("3rd Place Final");
  // console.log(thirdPlace);
  // console.groupEnd();

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
        onHandleSeasonChange={OnHandleSeasonChange}
      />
      <div className="w-full h-[600px] mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 max-sm:px-0 rounded-xl dark:bg-custom-dark dark:border-0 flex">
        {/* left */}
        <div className="h-full w-4/12 flex">
          {/* Round of 16 */}
          <div className="w-1/2 h-full flex flex-col relative">
            {roundOf16?.slice(0, 4).map((v: any, i: number) => {
              // Check all matchs are already done
              const isAllFT = v?.status.every((v: any) => v === "FT" || "PEN");
              
              // Check whether team 1 is winner or not
              const team1Winner =
                (v?.team1Score !== v?.team2Score
                  ? v?.team1Score > v?.team2Score
                  : v?.team1Penalty > v?.team2Penalty);

              // Check whether team 2 is winner or not
              const team2Winner = 
                (v?.team2Score !== v?.team1Score
                  ? v?.team2Score > v?.team1Score
                  : v?.team2Penalty > v?.team1Penalty);

              // format match date based on location
              const formattedMatchDate = FormatMatchDate(v?.date[0], locale, d);

              return (
                <div key={i} className="w-full h-1/4 flex items-center">
                  <div className="w-[80px] h-[80px] border-slate-500 border border-solid rounded-[6px] px-[6px] py-[8px]">
                    <div className="flex justify-between">
                      {/* Home */}
                      <div className="flex-col">
                        <Image
                          src={v?.team1Logo}
                          alt={v?.team1}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                        <h1
                          className={`text-[13px] font-medium text-center pt-[4px] ${
                            isAllFT && (team1Winner ? "" : "line-through text-[#9F9F9F]")
                          }`}
                        >
                          {v?.team1?.substr(0, 3)?.toUpperCase()}
                        </h1>
                      </div>

                      <div></div>

                      {/* Away */}
                      <div className="flex-col">
                        <Image
                          src={v?.team2Logo}
                          alt={v?.team2}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                        <h1
                          className={`text-[13px] font-medium text-center pt-[4px] ${
                            isAllFT && (team2Winner ? "" : "line-through text-[#9F9F9F]")
                          }`}
                        >
                          {v?.team2?.substr(0, 3)?.toUpperCase()}
                        </h1>
                      </div>
                    </div>
                    {/* Score or Date */}
                    {v?.team1Score || v?.team2Score ? (
                      <div className="flex justify-between text-[13px] text-center pt-[9px]">
                        <h2 className="text-[13px] w-[26.11px]">
                          {v?.team1Score}
                        </h2>
                        <h2>-</h2>
                        <h2 className="text-[13px] w-[26.11px]">
                          {v?.team2Score}
                        </h2>
                      </div>
                    ) : (
                      <div className="text-[13px] text-center pt-[9px]">
                        {formattedMatchDate?.date}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center flex-1">
                    <hr className="border-l border-solid border-slate-500 w-full" />
                  </div>

                  {i % 2 !== 0 && (
                    <div className="absolute right-0 top-[68px] h-1/4 border-l border-solid border-slate-500"></div>
                  )}

                  {i % 2 === 0 && i < roundOf16.length - 1 && (
                    <div className="absolute right-[0px] bottom-[68px] h-1/4 border-l border-solid border-slate-500"></div>
                  )}
                </div>
              );
            })}
          </div>
          {/* Quater finals */}
          <div className="w-1/2 h-full flex flex-col relative"></div>
        </div>

        {/* center */}
        <div className="h-full w-4/12 flex"></div>
        {/* right */}
        <div className="h-full w-4/12 flex"></div>
      </div>
    </>
  );
}
