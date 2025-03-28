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
import { MdOutlineShield } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

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

  // State value to change between match time and match points when the game is ongoing
  const [isPoint, setIsPoint] = useState(true);

  // Match status

  // scehduled
  const scheduled = ["TBD", "NS"];
  // ongoing
  const live = ["1H", "2H", "ET", "P", "LIVE", "HT", "BT"];
  // stopped by referee
  const stop = ["SUSP", "INT"];
  //match finsiehd
  const finish = ["FT", "AET", "PEN"];
  // match cancled || postponed
  const cancle = ["PST", "CANC", "ABD"];
  // unearned win
  const unearned = ["AWD", "WO"];

  /**
   * 1. 원하는 데이터 잘추출했고 모든 페이지에서 잘 작동하는거 확인했으니 넉아웃 페이지 구현하기\
   * 클릭시 팝업 구현
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
        elapsed: liveElapsed !== null ? [liveElapsed] : [],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date),
        acc[key].roundScore.push(v?.goals);
      if (liveElapsed !== null) {
        acc[key].elapsed.push(liveElapsed);
      }
    }
    return acc;
  }, []);

  // const roundOf16 = round16 && Object.values(groupdByRound16);
  const roundOf16 = [
    {
      date: ["2025-03-04T17:45:00+00:00", "2025-03-12T20:00:00+00:00"],
      roundScore: [
        { home: 1, away: 3 },
        { home: 3, away: 0 },
      ],
      status: ["LIVE", "FT"],
      team1: "Club Brugge KV",
      team1ID: 569,
      team1Logo: "https://media.api-sports.io/football/teams/569.png",
      team1Penalty: 0,
      team1Score: 1,
      team2: "Aston Villa",
      team2ID: 66,
      team2Logo: "https://media.api-sports.io/football/teams/66.png",
      team2Penalty: 0,
      team2Score: 6,
      elapsed: [65],
    },
    {
      date: ["2025-03-04T17:45:00+00:00", "2025-03-12T20:00:00+00:00"],
      roundScore: [
        { home: 1, away: 3 },
        { home: 3, away: 0 },
      ],
      status: ["FT", "FT"],
      team1: "Club Brugge KV",
      team1ID: 569,
      team1Logo: "https://media.api-sports.io/football/teams/569.png",
      team1Penalty: 0,
      team1Score: 1,
      team2: "Aston Villa",
      team2ID: 66,
      team2Logo: "https://media.api-sports.io/football/teams/66.png",
      team2Penalty: 0,
      team2Score: 6,
      elapsed: [65],
    },
    {
      date: ["2025-03-04T17:45:00+00:00", "2025-03-12T20:00:00+00:00"],
      roundScore: [
        { home: 1, away: 3 },
        { home: 3, away: 0 },
      ],
      status: ["FT", "FT"],
      team1: "Club Brugge KV",
      team1ID: 569,
      team1Logo: "https://media.api-sports.io/football/teams/569.png",
      team1Penalty: 0,
      team1Score: 1,
      team2: "Aston Villa",
      team2ID: 66,
      team2Logo: "https://media.api-sports.io/football/teams/66.png",
      team2Penalty: 0,
      team2Score: 6,
    },
    {
      date: ["2025-03-04T17:45:00+00:00", "2025-03-12T20:00:00+00:00"],
      roundScore: [
        { home: 1, away: 3 },
        { home: 3, away: 0 },
      ],
      status: ["FT", "FT"],
      team1: "Club Brugge KV",
      team1ID: 569,
      team1Logo: "https://media.api-sports.io/football/teams/569.png",
      team1Penalty: 0,
      team1Score: 1,
      team2: "Aston Villa",
      team2ID: 66,
      team2Logo: "https://media.api-sports.io/football/teams/66.png",
      team2Penalty: 0,
      team2Score: 6,
    },
  ];

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
        roundScore: [v?.goals],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
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
        roundScore: [v?.goals],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
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
        roundScore: [v?.goals],
      };
    } else {
      // 이미 해당 팀 간 경기가 존재하면 스코어 합산
      acc[key].team1Score += v?.goals?.away || 0;
      acc[key].team2Score += v?.goals?.home || 0;
      acc[key].team1Penalty += v?.score?.penalty?.away || 0;
      acc[key].team2Penalty += v?.score?.penalty?.home || 0;
      acc[key].status.push(v?.fixture?.status?.short),
        acc[key].date.push(v?.fixture?.date);
      acc[key].roundScore.push(v?.goals);
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
            {roundOf16
              ? roundOf16?.slice(0, 4).map((v: any, i: number) => {
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

                  console.log(v);

                  return (
                    <div key={i} className="w-full h-1/4 flex items-center">
                      <div className="w-[80px] h-[80px] border-slate-500 border border-solid rounded-[6px] px-[6px] py-[8px]">
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
                        ) : v?.team1Score || v?.team2Score ? (
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
                })
              : // if there is no data, show this
                Array.from({ length: 4 }).map((_, i) => {
                  return (
                    <div key={i} className="w-full h-1/4 flex items-center">
                      <div className="w-[80px] h-[80px] border-slate-500 border border-solid rounded-[6px] px-[6px] py-[8px]">
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
