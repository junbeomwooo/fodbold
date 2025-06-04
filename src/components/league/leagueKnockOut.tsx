"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect, useState, useRef, Fragment } from "react";
import { useRouter } from "next/navigation";

import LeagueHeader from "./header/leagueHeader";

import {
  getLeague,
  setSelectedSeason,
  getMatches,
  setSeasonChanged,
} from "@/lib/features/leagueSlice";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MdOutlineShield } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import FormatMatchDate from "@/lib/formatMatchDate";
import FormatLeagueOrTeamName from "@/lib/formatLeagueOrTeamName";

import { GiLaurelsTrophy } from "react-icons/gi";
import ConfettiExplosion from "react-confetti-explosion";
import ColorThief from "colorthief";

import handleLimitedError from "@/lib/handleLimitedError";
import LimittedError from "../reuse/limittedError";

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
  const l = useTranslations("league");

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

  // State value to change between match time and match points when the game is ongoing
  const [isPoint, setIsPoint] = useState(true);

  // State value for popup
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  // State value for match data to display when the popup opens
  const [isPopupData, setIsPopupData] = useState<any>(null);

  // confetti
  const [isExploding, setIsExploding] = useState(false);

  // Match status

  // ongoing
  const live = ["1H", "2H", "ET", "P", "LIVE", "HT", "BT"];
  //match finsiehd
  const finish = ["FT", "AET", "PEN"];

  /**
   * http://localhost:3000/en/leagues/1/world-cup/playoff
   * http://localhost:3000/en/leagues/2/champions-league/playoff
   */

  // State value for Error components
  const [isError, setIsError] = useState<string | null>(null);
  // Ref value for preventing duplicate error messages
  const hadErrorMsgRef = useRef(false);

  /** 현재 코드 */
  // 1. if there is no season data, fetch season data
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

  // 2 if selectedYear has no value, set lastest season
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

  // 3. When selected year has been changed, fetch new data for chnaged month
  useEffect(() => {
    const fetchingMatch = async () => {
      if (selectedYear !== 0 && selectedYearChanged) {
        try {
          // 시즌 값이 변경되었을 경우 다른 탭페이지와 공유하기 위해 상태값 업데이트
          await dispatch(setSelectedSeason(selectedYear));
          await dispatch(
            getMatches({
              leagueID: id,
              season: selectedYear,
              timezone: location,
            })
          ).unwrap();
        } catch (error: any) {
          handleLimitedError({
            error: error,
            ref: hadErrorMsgRef,
            setIsError: setIsError,
          });
        }
      }
    };

    fetchingMatch();
  }, [dispatch, id, selectedYear, selectedYearChanged, location]);

  /** 이전 코드 */
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

  // Show match scores and game time alternately every 2.5 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPoint((prev) => !prev); // match goals <-> match time
    }, 2500);

    return () => clearInterval(interval); // clear Interval when componets is unmounted
  }, []);

  /** Find 'Round of 16' data */
  const round16 = match?.filter((v: any) => {
    return (
      v?.league?.round === "Round of 16" || v?.league?.round === "8th Finals"
    );
  });

  const groupdByRound16 = round16?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");

    // if match is ongoing add data for match elapsed
    const liveElapsed = live.includes(v?.fixture?.status?.short)
      ? v?.fixture?.status?.elapsed
      : null;

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
        roundScore: [v?.goals],
        matches: [v],
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short);
      acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
      acc[key].matches.push(v);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  const roundOf16 = round16 && Object.values(groupdByRound16);
  // const roundOf16 = null;

  console.group("Round of 16");
  console.log(roundOf16);
  console.groupEnd();

  /** Find Quarter-finals data */
  const quarter = match?.filter((v: any) => {
    return v?.league?.round === "Quarter-finals";
  });

  const groupdByquarter = quarter?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");

    // if match is ongoing add data for match elapsed
    const liveElapsed = live.includes(v?.fixture?.status?.short)
      ? v?.fixture?.status?.elapsed
      : null;

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
        roundScore: [v?.goals],
        matches: [v],
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short);
      acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
      acc[key].matches.push(v);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  const quarterFinals = groupdByquarter && Object.values(groupdByquarter);
  // const quarterFinals = null;

  console.group("Quarter-finals");
  console.log(quarterFinals);
  console.groupEnd();

  /** Find Semi-finals data */
  const semi = match?.filter((v: any) => {
    return v?.league?.round === "Semi-finals";
  });

  const groupdBySemi = semi?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");

    // if match is ongoing add data for match elapsed
    const liveElapsed = live.includes(v?.fixture?.status?.short)
      ? v?.fixture?.status?.elapsed
      : null;

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
        roundScore: [v?.goals],
        matches: [v],
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short);
      acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
      acc[key].matches.push(v);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  const semiFinals = groupdBySemi && Object.values(groupdBySemi);
  // const semiFinals = null;

  console.group("Semi-finals");
  console.log(semiFinals);
  console.groupEnd();

  // /** Find Final data */
  const lastStage = match?.filter((v: any) => {
    return v?.league?.round === "Final";
  });

  const groupdByLastStage = lastStage?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");

    // if match is ongoing add data for match elapsed
    const liveElapsed = live.includes(v?.fixture?.status?.short)
      ? v?.fixture?.status?.elapsed
      : null;

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
        roundScore: [v?.goals],
        matches: [v],
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short);
      acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
      acc[key].matches.push(v);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  const final = groupdByLastStage && Object.values(groupdByLastStage);
  // const final = null;

  console.group("Final");
  console.log(final);
  console.groupEnd();

  // /** Find 3rd Place Final data */
  const third = match?.filter((v: any) => {
    return v?.league?.round === "3rd Place Final";
  });

  const groupByThird = third?.reduce((acc: any, v: any) => {
    const key = [v?.teams?.home?.name, v?.teams?.away?.name].sort().join(" - ");

    // if match is ongoing add data for match elapsed
    const liveElapsed = live.includes(v?.fixture?.status?.short)
      ? v?.fixture?.status?.elapsed
      : null;

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
        roundScore: [v?.goals],
        matches: [v],
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short);
      acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
      acc[key].matches.push(v);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  const thirdPlace = groupByThird && Object.values(groupByThird);

  console.group("3rd Place Final");
  console.log(thirdPlace);
  console.groupEnd();

  const onClickViewMatch = (matchData: any) => {
    setIsPopupOpen(true);
    setIsPopupData(matchData);
    console.log(matchData);
  };

  /**  A function to find the current round's data based on the next round's data
   *
   *   The function finds the current round’s data based on the next round’s position. The next round’s data is
   *   determined by the current round’s results, so the current round’s position should change accordingly.
   */
  const getSortedMatchesBasedOnNextRound = (
    nowRounds: any[],
    nextRounds: any[],
    indexRange?: [number, number]
  ) => {
    const slicedNextRounds: any[] = indexRange
      ? nextRounds?.slice(indexRange[0], indexRange[1])
      : nextRounds; // indexRange가 없으면 전체 사용

    return nowRounds
      ?.filter((nowRound: any) => {
        return slicedNextRounds?.some(
          (nextRound: any) =>
            nextRound.team1ID === nowRound.team1ID ||
            nextRound.team2ID === nowRound.team1ID ||
            nextRound.team1ID === nowRound.team2ID ||
            nextRound.team2ID === nowRound.team2ID
        );
      })
      .sort((a: any, b: any) => {
        // The round of 16 matches are checked against the positions in the quarterfinals, and by returning a negative value through indexA - indexB, they are arranged in order closest to the quarterfinals.
        const indexA = nextRounds?.findIndex(
          (v: any) =>
            v.team1ID === a.team1ID ||
            v.team2ID === a.team1ID ||
            v.team1ID === a.team2ID ||
            v.team2ID === a.team2ID
        );
        const indexB = nextRounds?.findIndex(
          (v: any) =>
            v.team1ID === b.team1ID ||
            v.team2ID === b.team1ID ||
            v.team1ID === b.team2ID ||
            v.team2ID === b.team2ID
        );

        return indexA - indexB;
      });
  };

  console.log(getSortedMatchesBasedOnNextRound(quarterFinals, semiFinals));

  // Check all matchs are already done
  const checkMatchIsDone = (v: any) => {
    return v?.status.every((v: any) => v === "FT" || v === "PEN");
  };

  // Check whether team 1 is winner or not
  const checkTeam1IsWinner = (v: any) => {
    return v?.team1Score !== v?.team2Score
      ? v?.team1Score > v?.team2Score
      : v?.team1Penalty > v?.team2Penalty;
  };

  // Check whether team 2 is winner or not
  const checkTeam2IsWinner = (v: any) => {
    return v?.team2Score !== v?.team1Score
      ? v?.team2Score > v?.team1Score
      : v?.team2Penalty > v?.team1Penalty;
  };

  // State for
  const [confettiColor, setConfettiColor] = useState<string[]>([]);

  // Ref for champion image
  const imgRef = useRef<HTMLImageElement | null>(null);

  // from RGB value to Hex
  const rgbToHex = (rgb: any[]): string => {
    return (
      "#" +
      rgb
        .map((val) => val.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase()
    );
  };

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
      {/* Knock out page */}
      <div className="w-full h-[600px] mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 max-sm:px-0 rounded-xl dark:bg-custom-dark dark:border-0 flex max-lg:flex-col max-lg:h-full">
        {/* left */}
        <div className="h-full w-4/12 flex max-lg:flex-col max-lg:w-full">
          {/* Round of 16 */}
          <div className="w-1/2 h-full flex flex-col relative max-lg:flex-row max-lg:w-full">
            {roundOf16?.length > 0
              ? quarterFinals?.length > 0
                ? // if there are quarterFinal and roundOf16 data, show this
                  getSortedMatchesBasedOnNextRound(
                    roundOf16,
                    semiFinals?.length > 0
                      ? getSortedMatchesBasedOnNextRound(
                          quarterFinals,
                          semiFinals
                        )
                      : quarterFinals,
                    [0, 2]
                  )?.map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );
                    console.log(isLive);

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>

                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}

                        {i % 2 === 0 && i < roundOf16.length - 1 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                          </>
                        )}
                      </div>
                    );
                  })
                : // if there is no quarterFinal Data, But there is roundOf16 Data.
                  roundOf16?.slice(0, 4).map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );
                    console.log(isLive);

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>

                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}

                        {i % 2 === 0 && i < roundOf16.length - 1 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                          </>
                        )}
                      </div>
                    );
                  })
              : // if there  no data, show this
                Array.from({ length: 4 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                    >
                      <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                        <div className="flex justify-between">
                          {/* Home */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                          {/* Away */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                        </div>
                        {/* Match Date */}
                        <div className="text-[13px] text-center pt-[9px] font-medium">
                          TBD
                        </div>
                      </div>
                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                      </div>

                      {i % 2 !== 0 && (
                        <>
                          {/* computer */}
                          <div className="absolute right-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>

                          {/* mobile */}
                          <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                        </>
                      )}

                      {i % 2 === 0 && (
                        <>
                          {/* computer */}
                          <div className="absolute right-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                        </>
                      )}
                    </div>
                  );
                })}
          </div>

          {/* Quarter-finals */}
          <div className="w-1/2 h-full flex flex-col relative max-lg:flex-row max-lg:w-full">
            {quarterFinals?.length > 0
              ? semiFinals?.length > 0
                ? // if there are quarterFinal and semiFinals data, show this
                  getSortedMatchesBasedOnNextRound(
                    quarterFinals,
                    semiFinals,
                    [0, 1]
                  )?.map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );
                    console.log(isLive);

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/2 flex items-center  max-lg:flex-col max-lg:h-[110px]"
                      >
                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}
                      </div>
                    );
                  })
                : // if there is no semiFinals Data, But there is quarterFinal Data.
                  quarterFinals?.slice(0, 2).map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );
                    console.log(isLive);

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/2 flex items-center  max-lg:flex-col max-lg:h-[110px]"
                      >
                        {/* hr */}
                        <div className="flex items-center flex-1 ">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute right-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}
                      </div>
                    );
                  })
              : // if there  no data, show this
                Array.from({ length: 2 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-1/2 flex items-center max-lg:flex-col max-lg:h-[110px]"
                    >
                      {/* hr */}
                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                      </div>

                      {/* contents */}
                      <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                        <div className="flex justify-between">
                          {/* Home */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                          {/* Away */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                        </div>
                        {/* Match Date */}
                        <div className="text-[13px] text-center pt-[9px] font-medium">
                          TBD
                        </div>
                      </div>

                      {/* hr */}
                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                      </div>

                      {i % 2 !== 0 && (
                        <>
                          {/* computer */}
                          <div className="absolute right-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                          {/* mobile */}
                          <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                        </>
                      )}
                    </div>
                  );
                })}
          </div>
        </div>

        {/* center */}
        <div className="h-full w-4/12 relative max-lg:w-full">
          {/* confetti */}
          {isExploding && (
            <div className="absolute inset-0 flex justify-center">
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={180}
                width={1000}
                height="80vh"
                colors={confettiColor}
              />
            </div>
          )}

          <div className="flex flex-col h-full max-lg:flex-row max-lg:w-full max-lg:items-center max-lg:justify-center">
            {/* trophy */}
            <div
              className={`flex flex-col items-center justify-end h-1/3 max-lg:h-full max-lg:w-1/3 max-lg:mt-10 ${
                finish.includes(final && final[0]?.status[0])
                  ? "cursor-pointer hover:opacity-70"
                  : ""
              }`}
              onMouseEnter={() => {
                setIsExploding(true);
                setTimeout(() => {
                  setIsExploding(false);
                }, 3000);
              }}
              onClick={() => {
                const finalMatch = final && final[0];
                finish.includes(final && finalMatch?.status[0])
                  ? router.push(
                      checkTeam1IsWinner(finalMatch)
                        ? `/${locale}/teams/${
                            finalMatch?.team1ID
                          }/${FormatLeagueOrTeamName(
                            finalMatch?.team1
                          )}/overview`
                        : `/${locale}/teams/${
                            finalMatch?.team2ID
                          }/${FormatLeagueOrTeamName(
                            finalMatch?.team2
                          )}/overview`
                    )
                  : null;
              }}
            >
              <GiLaurelsTrophy className="text-[#CCCCCC] scale-[5]" />
              {finish.includes(final && final[0]?.status[0]) && (
                <div className=" w-[30px] h-[30px] rounded-full overflow-hidden z-10 absolute top-[65px] max-lg:top-[110px]">
                  <Image
                    src={
                      checkTeam1IsWinner(final[0])
                        ? final[0]?.team1Logo
                        : final[0]?.team2Logo
                    }
                    alt={
                      checkTeam1IsWinner(final[0])
                        ? final[0]?.team1
                        : final[0]?.team2
                    }
                    fill
                    className="object-cover"
                    ref={imgRef}
                    onLoad={() => {
                      if (imgRef.current) {
                        const colorThief = new ColorThief();
                        const palette = colorThief
                          .getPalette(imgRef.current)
                          .slice(0, 3);
                        const colors = palette.map((v) => {
                          return rgbToHex(v);
                        });

                        setConfettiColor(colors);
                      }
                    }}
                  />
                </div>
              )}
              <div className="text-xs mt-[42px]  text-[#9F9F9F] tracking-widest font-medium flex flex-col items-center">
                {finish.includes(final && final[0]?.status[0]) && (
                  <h1>
                    {(checkTeam1IsWinner(final[0])
                      ? final[0]?.team1
                      : final[0]?.team2
                    ).toUpperCase()}
                  </h1>
                )}
                <h1>CHAMPION</h1>
              </div>
            </div>
            {/* contents */}
            {semiFinals?.length > 0 ? (
              <div className="w-full flex items-center h-1/3 max-lg:flex-col max-lg:h-full max-lg:w-1/3">
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* semiFinals[0] */}
                <div
                  className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                  onClick={() => {
                    onClickViewMatch(semiFinals[0]);
                  }}
                >
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      {semiFinals[0]?.team1Logo ? (
                        <Image
                          src={semiFinals[0]?.team1Logo}
                          alt={semiFinals[0]?.team1}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}

                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(semiFinals[0]) &&
                          (checkTeam1IsWinner(semiFinals[0])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {semiFinals[0]?.team1?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>

                    <div></div>
                    {/* Away */}
                    <div className="flex-col">
                      {semiFinals[0]?.team2Logo ? (
                        <Image
                          src={semiFinals[0]?.team2Logo}
                          alt={semiFinals[0]?.team2}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}
                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(semiFinals[0]) &&
                          (checkTeam2IsWinner(semiFinals[0])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {semiFinals[0]?.team2?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>
                  </div>
                  {/* Score or Date */}
                  {semiFinals[0]?.status?.some((status: any) =>
                    live?.includes(status)
                  ) && semiFinals[0]?.elapsed?.length > 0 ? (
                    <AnimatePresence>
                      <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                        <motion.h3
                          key={isPoint ? "score" : "time"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          {isPoint
                            ? `${semiFinals[0]?.team1Score}
                          -
                          ${semiFinals[0]?.team2Score}`
                            : `${semiFinals[0]?.elapsed[0] || 0}'`}
                        </motion.h3>
                      </div>
                    </AnimatePresence>
                  ) : semiFinals[0]?.team1Score ||
                    semiFinals[0]?.team2Score ||
                    finish?.includes(
                      semiFinals[0]?.matches[0]?.fixture?.status?.short
                    ) ||
                    finish?.includes(
                      semiFinals[0]?.matches[1]?.fixture?.status?.short
                    ) ? (
                    <div className="flex justify-between text-[13px] text-center pt-[9px]">
                      <h2 className="text-[13px] w-[26.11px]">
                        {semiFinals[0]?.team1Score}
                      </h2>
                      <h2>-</h2>
                      <h2 className="text-[13px] w-[26.11px]">
                        {semiFinals[0]?.team2Score}
                      </h2>
                    </div>
                  ) : FormatMatchDate(semiFinals[0]?.date[0], locale, d)
                      ?.date ? (
                    <div className="text-[13px] text-center pt-[9px]">
                      {FormatMatchDate(semiFinals[0]?.date[0], locale, d)?.date}
                    </div>
                  ) : (
                    <h1 className="text-[13px] text-center pt-[9px] font-medium">
                      TBD
                    </h1>
                  )}
                </div>
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* Finals*/}
                {final?.length > 0 ? (
                  <div
                    className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                    onClick={() => {
                      onClickViewMatch(final[0]);
                    }}
                  >
                    <div className="flex justify-between">
                      {/* Home */}
                      <div className="flex-col">
                        {final[0]?.team1Logo ? (
                          <Image
                            src={final[0]?.team1Logo}
                            alt={final[0]?.team1}
                            width={20}
                            height={20}
                            className="w-[20px] h-[20px] m-auto object-contain"
                          />
                        ) : (
                          <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                        )}

                        <h1
                          className={`text-[13px] font-medium text-center pt-[4px] ${
                            checkMatchIsDone(final[0]) &&
                            (checkTeam1IsWinner(final[0])
                              ? ""
                              : "line-through text-[#9F9F9F]")
                          }`}
                        >
                          {final[0]?.team1?.substr(0, 3)?.toUpperCase()}
                        </h1>
                      </div>

                      <div></div>
                      {/* Away */}
                      <div className="flex-col">
                        {final[0]?.team2Logo ? (
                          <Image
                            src={final[0]?.team2Logo}
                            alt={final[0]?.team2}
                            width={20}
                            height={20}
                            className="w-[20px] h-[20px] m-auto object-contain"
                          />
                        ) : (
                          <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                        )}
                        <h1
                          className={`text-[13px] font-medium text-center pt-[4px] ${
                            checkMatchIsDone(final[0]) &&
                            (checkTeam2IsWinner(final[0])
                              ? ""
                              : "line-through text-[#9F9F9F]")
                          }`}
                        >
                          {final[0]?.team2?.substr(0, 3)?.toUpperCase()}
                        </h1>
                      </div>
                    </div>
                    {/* Score or Date */}
                    {final[0]?.status?.some((status: any) =>
                      live?.includes(status)
                    ) && final[0]?.elapsed?.length > 0 ? (
                      <AnimatePresence>
                        <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                          <motion.h3
                            key={isPoint ? "score" : "time"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.5,
                              ease: "easeInOut",
                            }}
                          >
                            {isPoint
                              ? `${final[0]?.team1Score}
                          -
                          ${final[0]?.team2Score}`
                              : `${final[0]?.elapsed[0] || 0}'`}
                          </motion.h3>
                        </div>
                      </AnimatePresence>
                    ) : final[0]?.team1Score ||
                      final[0]?.team2Score ||
                      finish?.includes(
                        final[0]?.matches[0]?.fixture?.status?.short
                      ) ||
                      finish?.includes(
                        final[0]?.matches[1]?.fixture?.status?.short
                      ) ? (
                      <div className="flex justify-between text-[13px] text-center pt-[9px]">
                        <h2 className="text-[13px] w-[26.11px]">
                          {final[0]?.team1Score}
                        </h2>
                        <h2>-</h2>
                        <h2 className="text-[13px] w-[26.11px]">
                          {final[0]?.team2Score}
                        </h2>
                      </div>
                    ) : FormatMatchDate(final[0]?.date[0], locale, d)?.date ? (
                      <div className="text-[13px] text-center pt-[9px]">
                        {FormatMatchDate(final[0]?.date[0], locale, d)?.date}
                      </div>
                    ) : (
                      <h1 className="text-[13px] text-center pt-[9px] font-medium">
                        TBD
                      </h1>
                    )}
                    {/* final tag */}
                    <div className="bg-[#F8D76A] flex items-center justify-center h-[15px] mx-2 mt-1 rounded-xl text-black z-10 relative">
                      <h2 className="text-xxs font-medium">FINAL</h2>
                    </div>
                  </div>
                ) : (
                  <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                    <div className="flex justify-between">
                      {/* Home */}
                      <div className="flex-col">
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                        <h1 className="text-[13px] font-medium text-center pt-[4px]">
                          TBD
                        </h1>
                      </div>
                      {/* Away */}
                      <div className="flex-col">
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                        <h1 className="text-[13px] font-medium text-center pt-[4px]">
                          TBD
                        </h1>
                      </div>
                    </div>
                    {/* Match Date */}
                    <div className="text-[13px] text-center pt-[9px] font-medium">
                      TBD
                    </div>
                    {/* final tag */}
                    <div className="bg-[#F8D76A] flex items-center justify-center h-[15px] mx-2 mt-1 rounded-xl text-black z-10 relative">
                      <h2 className="text-xxs font-medium">{l("final")}</h2>
                    </div>
                  </div>
                )}

                {/* hr */}
                <div className="flex items-center flex-1  z-0">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* semiFinals[1] */}
                <div
                  className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                  onClick={() => {
                    onClickViewMatch(semiFinals[1]);
                  }}
                >
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      {semiFinals[1]?.team1Logo ? (
                        <Image
                          src={semiFinals[1]?.team1Logo}
                          alt={semiFinals[1]?.team1}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}

                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(semiFinals[1]) &&
                          (checkTeam1IsWinner(semiFinals[1])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {semiFinals[1]?.team1?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>

                    <div></div>
                    {/* Away */}
                    <div className="flex-col">
                      {semiFinals[1]?.team2Logo ? (
                        <Image
                          src={semiFinals[1]?.team2Logo}
                          alt={semiFinals[1]?.team2}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}
                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(semiFinals[1]) &&
                          (checkTeam2IsWinner(semiFinals[1])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {semiFinals[1]?.team2?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>
                  </div>
                  {/* Score or Date */}
                  {semiFinals[1]?.status?.some((status: any) =>
                    live?.includes(status)
                  ) && semiFinals[1]?.elapsed?.length > 0 ? (
                    <AnimatePresence>
                      <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                        <motion.h3
                          key={isPoint ? "score" : "time"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          {isPoint
                            ? `${semiFinals[1]?.team1Score}
                          -
                          ${semiFinals[1]?.team2Score}`
                            : `${semiFinals[1]?.elapsed[0] || 0}'`}
                        </motion.h3>
                      </div>
                    </AnimatePresence>
                  ) : semiFinals[1]?.team1Score ||
                    semiFinals[1]?.team2Score ||
                    finish?.includes(
                      semiFinals[1]?.matches[0]?.fixture?.status?.short
                    ) ||
                    finish?.includes(
                      semiFinals[1]?.matches[1]?.fixture?.status?.short
                    ) ? (
                    <div className="flex justify-between text-[13px] text-center pt-[9px]">
                      <h2 className="text-[13px] w-[26.11px]">
                        {semiFinals[1]?.team1Score}
                      </h2>
                      <h2>-</h2>
                      <h2 className="text-[13px] w-[26.11px]">
                        {semiFinals[1]?.team2Score}
                      </h2>
                    </div>
                  ) : FormatMatchDate(semiFinals[1]?.date[0], locale, d)
                      ?.date ? (
                    <div className="text-[13px] text-center pt-[9px]">
                      {FormatMatchDate(semiFinals[1]?.date[0], locale, d)?.date}
                    </div>
                  ) : (
                    <h1 className="text-[13px] text-center pt-[9px] font-medium">
                      TBD
                    </h1>
                  )}
                </div>
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center h-1/3 max-lg:flex-col max-lg:h-full max-lg:w-1/3">
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* semiFinals[0] */}
                <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                    {/* Away */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                  </div>
                  {/* Match Date */}
                  <div className="text-[13px] text-center pt-[9px] font-medium">
                    TBD
                  </div>
                </div>
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* Finals*/}
                <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                    {/* Away */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                  </div>
                  {/* Match Date */}
                  <div className="text-[13px] text-center pt-[9px] font-medium">
                    TBD
                  </div>
                  {/* final tag */}
                  <div className="bg-[#F8D76A] flex items-center justify-center h-[15px] mx-2 mt-1 rounded-xl text-black z-10 relative">
                    <h2 className="text-xxs font-medium">{l("final")}</h2>
                  </div>
                </div>

                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
                {/* semiFinals[1] */}
                <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                    {/* Away */}
                    <div className="flex-col">
                      <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      <h1 className="text-[13px] font-medium text-center pt-[4px]">
                        TBD
                      </h1>
                    </div>
                  </div>
                  {/* Match Date */}
                  <div className="text-[13px] text-center pt-[9px] font-medium">
                    TBD
                  </div>
                </div>
                {/* hr */}
                <div className="flex items-center flex-1">
                  <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-[20px]" />
                </div>
              </div>
            )}
            {/* 3rd Place Final  */}
            {thirdPlace?.length > 0 ? (
              <div className="h-1/3 flex justify-center max-lg:h-full max-lg:w-1/3">
                {/* third place */}
                <div
                  className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B] relative"
                  onClick={() => {
                    onClickViewMatch(semiFinals[0]);
                  }}
                >
                  <div className="flex justify-between">
                    {/* Home */}
                    <div className="flex-col">
                      {thirdPlace[0]?.team1Logo ? (
                        <Image
                          src={thirdPlace[0]?.team1Logo}
                          alt={thirdPlace[0]?.team1}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}

                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(thirdPlace[0]) &&
                          (checkTeam1IsWinner(thirdPlace[0])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {thirdPlace[0]?.team1?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>

                    <div></div>
                    {/* Away */}
                    <div className="flex-col">
                      {thirdPlace[0]?.team2Logo ? (
                        <Image
                          src={thirdPlace[0]?.team2Logo}
                          alt={thirdPlace[0]?.team2}
                          width={20}
                          height={20}
                          className="w-[20px] h-[20px] m-auto object-contain"
                        />
                      ) : (
                        <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                      )}
                      <h1
                        className={`text-[13px] font-medium text-center pt-[4px] ${
                          checkMatchIsDone(thirdPlace[0]) &&
                          (checkTeam2IsWinner(thirdPlace[0])
                            ? ""
                            : "line-through text-[#9F9F9F]")
                        }`}
                      >
                        {thirdPlace[0]?.team2?.substr(0, 3)?.toUpperCase()}
                      </h1>
                    </div>
                  </div>
                  {/* Score or Date */}
                  {thirdPlace[0]?.status?.some((status: any) =>
                    live?.includes(status)
                  ) && thirdPlace[0]?.elapsed?.length > 0 ? (
                    <AnimatePresence>
                      <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                        <motion.h3
                          key={isPoint ? "score" : "time"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          {isPoint
                            ? `${thirdPlace[0]?.team1Score}
                          -
                          ${thirdPlace[0]?.team2Score}`
                            : `${thirdPlace[0]?.elapsed[0] || 0}'`}
                        </motion.h3>
                      </div>
                    </AnimatePresence>
                  ) : thirdPlace[0]?.team1Score ||
                    thirdPlace[0]?.team2Score ||
                    finish?.includes(
                      thirdPlace[0]?.matches[0]?.fixture?.status?.short
                    ) ||
                    finish?.includes(
                      thirdPlace[0]?.matches[1]?.fixture?.status?.short
                    ) ? (
                    <div className="flex justify-between text-[13px] text-center pt-[9px]">
                      <h2 className="text-[13px] w-[26.11px]">
                        {thirdPlace[0]?.team1Score}
                      </h2>
                      <h2>-</h2>
                      <h2 className="text-[13px] w-[26.11px]">
                        {thirdPlace[0]?.team2Score}
                      </h2>
                    </div>
                  ) : FormatMatchDate(thirdPlace[0]?.date[0], locale, d)
                      ?.date ? (
                    <div className="text-[13px] text-center pt-[9px]">
                      {FormatMatchDate(thirdPlace[0]?.date[0], locale, d)?.date}
                    </div>
                  ) : (
                    <h1 className="text-[13px] text-center pt-[9px] font-medium">
                      TBD
                    </h1>
                  )}
                  {/* final tag */}
                  <div className="bg-[#db8632] flex items-center justify-center h-[15px] mt-1 rounded-xl text-black absolute left-0 w-full">
                    <h2 className="text-[9px] font-medium">
                      {l("bronze-final")}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-1/3 max-lg:w-1/3"></div>
            )}
          </div>
        </div>

        {/* right */}
        <div className="h-full w-4/12 flex max-lg:flex-col max-lg:w-full">
          {/* Quarter-finals */}
          <div className="w-1/2 h-full flex flex-col relative max-lg:flex-row max-lg:w-full">
            {quarterFinals?.length > 0
              ? semiFinals?.length > 0
                ? // if there are quarterFinal and semiFinals data, show this
                  getSortedMatchesBasedOnNextRound(
                    quarterFinals,
                    semiFinals,
                    [1, 2]
                  )?.map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/2 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}
                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>
                      </div>
                    );
                  })
                : // if there is no semiFianls Data, But there is quarterFinal Data.
                  quarterFinals?.slice(2, 4).map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );
                    console.log(isLive);

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/2 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}
                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>
                      </div>
                    );
                  })
              : // if there  no data, show this
                Array.from({ length: 2 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-1/2 flex items-center max-lg:flex-col max-lg:h-[110px]"
                    >
                      {i % 2 !== 0 && (
                        <>
                          {/* computer */}
                          <div className="absolute left-0 top-[135px] h-1/2 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                          {/* mobile */}
                          <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                        </>
                      )}

                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                      </div>

                      {/* content */}
                      <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                        <div className="flex justify-between">
                          {/* Home */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                          {/* Away */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                        </div>
                        {/* Match Date */}
                        <div className="text-[13px] text-center pt-[9px] font-medium">
                          TBD
                        </div>
                      </div>

                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* Round of 16 */}
          <div className="w-1/2 h-full flex flex-col relative max-lg:flex-row max-lg:w-full">
            {roundOf16?.length > 0
              ? quarterFinals?.length > 0
                ? // if there are quarterFinal and roundOf16 data, show this
                  getSortedMatchesBasedOnNextRound(
                    roundOf16,
                    semiFinals?.length > 0
                      ? getSortedMatchesBasedOnNextRound(
                          quarterFinals,
                          semiFinals
                        )
                      : quarterFinals,
                    [2, 4]
                  )?.map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );
                    return (
                      <div
                        key={i}
                        className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>

                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 === 0 && i < roundOf16.length - 1 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                          </>
                        )}
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>
                      </div>
                    );
                  })
                : // if there is no quarterFinal Data, But there is roundOf16 Data.
                  roundOf16?.slice(4, 8).map((v: any, i: number) => {
                    // Check all matces are ongoing
                    const isLive = v?.status?.some((status: any) =>
                      live?.includes(status)
                    );

                    // Check all matchs are already done
                    const isAllFT = v?.status.every(
                      (v: any) => v === "FT" || v === "PEN"
                    );

                    // Check whether team 1 is winner or not
                    const team1Winner =
                      v?.team1Score !== v?.team2Score
                        ? v?.team1Score > v?.team2Score
                        : v?.team1Penalty > v?.team2Penalty;

                    // Check whether team 2 is winner or not
                    const team2Winner =
                      v?.team2Score !== v?.team1Score
                        ? v?.team2Score > v?.team1Score
                        : v?.team2Penalty > v?.team1Penalty;

                    // format match date based on location
                    const formattedMatchDate = FormatMatchDate(
                      v?.date[0],
                      locale,
                      d
                    );

                    return (
                      <div
                        key={i}
                        className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                      >
                        {i % 2 !== 0 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>

                            {/* mobile */}
                            <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                          </>
                        )}

                        {/* hr */}
                        <div className="flex items-center flex-1 max-lg:h-full">
                          <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />
                        </div>

                        {i % 2 === 0 && i < roundOf16.length - 1 && (
                          <>
                            {/* computer */}
                            <div className="absolute left-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                          </>
                        )}
                        {/* contents */}
                        <div
                          className="w-[80px] h-[80px] border-[#E8E8E8] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] cursor-pointer hover:bg-[#EDEDED] hover:border-[#EDEDED] dark:border-[#464646] dark:hover:bg-[#2B2B2B]"
                          onClick={() => {
                            onClickViewMatch(v);
                          }}
                        >
                          <div className="flex justify-between">
                            {/* Home */}
                            <div className="flex-col">
                              {v?.team1Logo ? (
                                <Image
                                  src={v?.team1Logo}
                                  alt={v?.team1}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}

                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team1Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team1?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>

                            <div></div>

                            {/* Away */}
                            <div className="flex-col">
                              {v?.team2Logo ? (
                                <Image
                                  src={v?.team2Logo}
                                  alt={v?.team2}
                                  width={20}
                                  height={20}
                                  className="w-[20px] h-[20px] m-auto object-contain"
                                />
                              ) : (
                                <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                              )}
                              <h1
                                className={`text-[13px] font-medium text-center pt-[4px] ${
                                  isAllFT &&
                                  (team2Winner
                                    ? ""
                                    : "line-through text-[#9F9F9F]")
                                }`}
                              >
                                {v?.team2?.substr(0, 3)?.toUpperCase()}
                              </h1>
                            </div>
                          </div>

                          {/* Score or Date */}
                          {isLive && v?.elapsed?.length > 0 ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.team1Score}
                          -
                          ${v?.team2Score}`
                                    : `${v?.elapsed[0] || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : v?.team1Score ||
                            v?.team2Score ||
                            finish?.includes(
                              v?.matches[0]?.fixture?.status?.short
                            ) ||
                            finish?.includes(
                              v?.matches[1]?.fixture?.status?.short
                            ) ? (
                            <div className="flex justify-between text-[13px] text-center pt-[9px]">
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team1Score}
                              </h2>
                              <h2>-</h2>
                              <h2 className="text-[13px] w-[26.11px]">
                                {v?.team2Score}
                              </h2>
                            </div>
                          ) : formattedMatchDate?.date ? (
                            <div className="text-[13px] text-center pt-[9px]">
                              {formattedMatchDate?.date}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center pt-[9px] font-medium">
                              TBD
                            </h1>
                          )}
                        </div>
                      </div>
                    );
                  })
              : // if there  no data, show this
                Array.from({ length: 4 }).map((_, i) => {
                  return (
                    <div
                      key={i}
                      className="w-full h-1/4 flex items-center max-lg:flex-col max-lg:h-[110px]"
                    >
                      {i % 2 !== 0 && (
                        <>
                          {/* computer */}
                          <div className="absolute left-0 top-[68px] h-1/4 border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] max-lg:hidden"></div>
                          {/* mobile */}
                          <div className="w-full mr-[99%] border-l border-solid border-[#E8E8E8] border-[1.2px] dark:border-[#464646] lg:hidden"></div>
                        </>
                      )}

                      <div className="flex items-center flex-1 max-lg:h-full">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646] max-lg:h-full" />

                        {i % 2 === 0 && (
                          <div className="absolute left-[0px] bottom-[68px] h-1/4 border-l border-solid border-[#E8E8E8] dark:border-[#464646] border-[1.2px] max-lg:hidden"></div>
                        )}
                      </div>
                      <div className="w-[80px] h-[80px] border-[#E8E8E8]  dark:border-[#464646] border-[1.5px] border-solid rounded-[6px] px-[6px] py-[8px] ">
                        <div className="flex justify-between">
                          {/* Home */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                          {/* Away */}
                          <div className="flex-col">
                            <MdOutlineShield className="w-[20px] h-[20px] m-auto object-contain" />
                            <h1 className="text-[13px] font-medium text-center pt-[4px]">
                              TBD
                            </h1>
                          </div>
                        </div>
                        {/* Match Date */}
                        <div className="text-[13px] text-center pt-[9px] font-medium">
                          TBD
                        </div>
                      </div>
                      <div className="flex items-center flex-1 lg:hidden">
                        <hr className="border-l border-[1.2px] border-solid border-[#E8E8E8] w-full dark:border-[#464646]" />
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      {/** Display it if state value for popup is true */}
      {isPopupOpen && (
        <div className="fixed w-full h-full inset-0 flex items-center justify-center z-50">
          {/* dark background */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsPopupOpen(false)}
          ></div>

          {/* contents */}
          <div className="relative bg-white dark:bg-[#272727] w-[350px] sm:w-[450px] pt-6 rounded-[20px] shadow-lg z-50">
            {/* title */}
            <div className="flex justify-center items-center w-full pb-3 text-base font-medium">
              <h1>{l("matches")}</h1>
            </div>
            {isPopupData &&
              isPopupData?.matches?.map((v: any, i: number) => {
                console.log(v);
                const formattedDate = FormatMatchDate(
                  v?.fixture?.date,
                  locale,
                  d
                );
                return (
                  <div key={i}>
                    <hr className="w-full border-[0.5px] border-solid dark:border-[#323232]" />
                    <div
                      className="cursor-pointer hover:bg-[#F6F6F6] dark:hover:bg-[#323232]"
                      onClick={() => {
                        router.push(
                          `/${locale}/matches/${FormatLeagueOrTeamName(
                            v?.teams?.home?.name
                          )}-vs-${FormatLeagueOrTeamName(
                            v?.teams?.away?.name
                          )}/${v?.fixture?.id}`
                        );
                      }}
                    >
                      {/* Date */}
                      <h4 className="text-xs text-[#8F8F8F] pt-4 px-4">
                        {formattedDate?.date}
                      </h4>

                      {/* Match */}
                      <div className="flex w-full pt-2 pb-4 cursor-pointer hover:bg-[#F6F6F6] px-4 dark:hover:bg-[#323232]">
                        {/* Home */}
                        <div className="flex items-center w-6/12 justify-end gap-2">
                          <h1 className="text-xs">{v?.teams?.home?.name}</h1>
                          <Image
                            src={v?.teams?.home?.logo}
                            alt={v?.teams?.home?.name}
                            width={24}
                            height={24}
                            className="object-contain w-[24px] h-[24px]"
                          />
                        </div>
                        {/* Score || Match Time || elapsed */}
                        <div className="w-[140px]">
                          {live?.includes(v?.fixture?.status?.short) ? (
                            <AnimatePresence>
                              <div className="bg-[#00985F] text-white text-sm w-[50px] h-[20px] rounded-[0.4vw] flex items-center justify-center m-auto mt-[7px] text-[11px]">
                                <motion.h3
                                  key={isPoint ? "score" : "time"}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                  }}
                                >
                                  {isPoint
                                    ? `${v?.goals?.home}
                          -
                          ${v?.goals?.away}`
                                    : `${v?.fixture?.status?.elapsed || 0}'`}
                                </motion.h3>
                              </div>
                            </AnimatePresence>
                          ) : finish?.includes(v?.fixture?.status?.short) ? (
                            <div className="flex justify-center text-[13px] text-center gap-2 items-center h-full">
                              <h2 className="text-[13px]">{v?.goals?.home}</h2>
                              <h2>-</h2>
                              <h2 className="text-[13px]">{v?.goals?.away}</h2>
                            </div>
                          ) : formattedDate?.time ? (
                            <div className="text-[13px] text-center flex h-full items-center justify-center">
                              {formattedDate?.time}
                            </div>
                          ) : (
                            <h1 className="text-[13px] text-center font-medium">
                              TBD
                            </h1>
                          )}
                        </div>
                        {/* Away */}
                        <div className="flex items-center w-6/12 gap-2">
                          <Image
                            src={v?.teams?.away?.logo}
                            alt={v?.teams?.away?.name}
                            width={24}
                            height={24}
                            className="object-contain w-[24px] h-[24px]"
                          />
                          <h1 className="text-xs">{v?.teams?.away?.name}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* close */}
            <div
              className="bg-[#F9F9FA] py-4 rounded-b-[20px] flex justify-center items-center cursor-pointer dark:bg-[#232323]"
              onClick={() => setIsPopupOpen(false)}
            >
              <h3 className="text-sm text-green-600">{l("close")}</h3>
            </div>
          </div>
        </div>
      )}

      {isError && <LimittedError isError={isError} setIsError={setIsError} />}
    </Fragment>
  );
}
