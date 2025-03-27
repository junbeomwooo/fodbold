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

  // 1. if there is no season data, fetch season data
  useEffect(() => {
    if (!season) {
      dispatch(getLeague({ id }));
    }
  }, [dispatch, id, season]);

  // 2 if selectedYear has no value, set lastest season
  useEffect(() => {
    if (season && selectedYear === 0) {
      const lastSeason = season[season.length - 1].year;
      setSelectedYear(lastSeason);

      if (!match) {
        dispatch(
          getMatches({ leagueID: id, season: lastSeason, timezone: location })
        );
      }
    }
  }, [season, selectedYear, dispatch, id, location, match]);

  // 3. When selected year has been changed, fetch new data for chnaged month

  /**
   * 1. 월드컵 페이지에서도 잘작동하는지 확인하기 (왜냐하면 1차전 2차전이 없는 단독 데이터)
   * http://localhost:3000/en/leagues/1/world-cup/playoff
   * http://localhost:3000/en/leagues/2/champions-league/playoff
   */

  useEffect(() => {
    if (selectedYear !== 0 && selectedYearChanged) {
      // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
      dispatch(setSelectedSeason(selectedYear));
      dispatch(
        getMatches({ leagueID: id, season: selectedYear, timezone: location })
      );
    }
  }, [dispatch, id, selectedYear, selectedYearChanged, location]);

  /** Find 'Round of 16' data */
  const round16 = match?.filter((v: any) => {
    return (
      v?.league?.round === "Round of 16" || v?.league?.round === "8th Finals"
    );
  });

  const groupdByRound16 = round16?.reduce((acc: any, v: any) => {
    console.log(v);
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
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date]
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
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date]
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
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date]
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
        status: [v?.fixture?.status?.short],
        date: [v?.fixture?.date]
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
      <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 max-sm:px-0 rounded-xl dark:bg-custom-dark dark:border-0">
        <h1>Hello</h1>
      </div>
    </>
  );
}
