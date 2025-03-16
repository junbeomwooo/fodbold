"use client";

/** Component */
import TeamHeader from "./header/teamHeader";

// *
import { useAppSelector, useAppDispatch } from "@/lib/storeHooks";
import { useTranslations } from "use-intl";
import { useEffect, useMemo, useState } from "react";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// fetching data
import { getFixtures } from "@/lib/features/fixtureSlice";
import { getFixturesByTeam } from "@/lib/features/fixtureSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";
import { getTeamInfo } from "@/lib/features/teamsSlice";

// format url function
import FormatMatchDetailURL from "@/lib/formatMatchDetailURL";
import FormatMatchDate from "@/lib/formatMatchDate";

/** images */
import Image from "next/image";
import arrow from "../../../public/img/arrow.png";

/** motion */
import { motion, AnimatePresence } from "motion/react";

export default function TeamFixture({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  /** dispatch */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);
  const { teamInfo }: any = useAppSelector((state) => state.teamsSlice);
  const { leagues }: { leagues: any } = useAppSelector(
    (state) => state.leagueSlice
  );
  const { fixtureByTeam }: any = useAppSelector((state) => state.fixtureSlice);
  const { location }: any = useAppSelector((state) => state.locationSlice);

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  // firstRender acts to ensure that a function runs only on the initial render of the component
  // for removing alert from dependency array of useEffect
  const firstRender = useRef(true);

  /** if date can't be recieved through redux global state, it will fetch data */
  useEffect(() => {
    if (firstRender.current) {
      if (
        (!leagues || !fixtureByTeam) && // leagues 또는 standing이 없고
        (!fixture || !teamInfo)
      ) {
        firstRender.current = false; // after first rendering, it will chagne useRef value as fasle.
        console.log("fetched!!");

        dispatch(getTeamInfo({ team: id }));
        dispatch(getAllLeaguesByTeam({ team: id })).then((payload) => {
          const leagues = payload?.payload;
          const nationalLeagueObj = leagues?.filter(
            (league: any) =>
              league?.league?.type === "League" &&
              league?.seasons?.some((v: any) => v?.current === true)
          );
          const latestSeason = nationalLeagueObj[0]?.seasons?.at(-1)?.year;
          dispatch(
            getFixturesByTeam({
              team: id,
              season: latestSeason,
              timezone: locate,
            })
          );
        });
      }
    }
  }, [dispatch, fixture, fixtureByTeam, id, leagues, locate, teamInfo]);
  /** routing */
  const router = useRouter();

  /** translations */
  const t = useTranslations("team");
  const d = useTranslations("date");

  /** State value to change between match time and match points when the game is ongoing */
  const [isPoint, setIsPoint] = useState(true);

  /** match stats */
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

  // Upcoming matches
  const upcomingMatch = (fixtureByTeam ?? [])
    .filter((match: any) => {
      const status = match?.fixture?.status?.short;

      return (
        scheduled.includes(status) ||
        live.includes(status) ||
        stop.includes(status)
      );
    }) // convert from milliseconds to seconds
    .sort(
      (a: any, b: any) => a?.fixture?.timestamp - b?.fixture?.timestamp
    ) as any[];

  /** pagenation */
  const sortedFixtureByTeam = useMemo(() => {
    return Array.isArray(fixtureByTeam)
      ? [...fixtureByTeam].sort(
          (a: any, b: any) => a?.fixture?.timestamp - b?.fixture?.timestamp
        )
      : [];
  }, [fixtureByTeam]);

  // 1. find index for today date or closest date (deafult value)
  const closestIndex = useMemo(() => {
    const today = moment();
    return sortedFixtureByTeam?.findIndex((match: any) => {
      // find same date or after date
      return moment(match?.fixture?.date).isSameOrAfter(today, "day") || 0;
    });
  }, [sortedFixtureByTeam]);

  // 2. state value for pagenation
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (Number.isFinite(closestIndex)) {
      setStartIndex(Math.max(0, closestIndex - (closestIndex % 5)));
    }
  }, [closestIndex]);

  const matchesPerPage = 10;

  // 3. match data for current page
  const displayedMatches = sortedFixtureByTeam?.slice(
    startIndex,
    startIndex + matchesPerPage
  );

  // 4. Page movement function
  const moveNext = () => {
    if (startIndex + matchesPerPage < sortedFixtureByTeam?.length) {
      setStartIndex(startIndex + matchesPerPage);
    }
  };

  const movePrev = () => {
    if (startIndex - matchesPerPage >= 0) {
      setStartIndex(startIndex - matchesPerPage);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsPoint((prev) => !prev); // match goals <-> match time
    }, 2500);

    return () => clearInterval(interval); // clear Interval when componets is unmounted
  }, []);

  return (
    <div className="w-full">
      <TeamHeader
        fixture={fixture}
        teamInfo={teamInfo}
        leagues={leagues}
        locale={locale}
        id={id}
        name={name}
        t={t}
      />

      {/* fixture pagenation */}
      {fixtureByTeam?.length > 0 && (
        <div className="w-full bg-white rounded-xl mt-6 px-8 pt-5 pb-4 dark:bg-custom-dark max-sm:px-4  border-slate-200 border border-solid dark:border-0">
          {/* fixture header */}
          <div className="flex w-full items-center justify-between">
            {/* left button */}
            <div
              className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray"
              onClick={movePrev}
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

            <h1 className="text-sm">{t("fixtures")}</h1>

            {/* right button */}
            <div
              className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer  hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray"
              onClick={moveNext}
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

          {/* fixtures */}
          <ul className="w-full">
            {displayedMatches?.map((v: any, i: number) => {
              const { date, time } = FormatMatchDate(
                v?.fixture?.date,
                locale,
                d
              );

              // check which team is winner for when match is done
              let win = null;

              const numbericID = Number(id);

              const isHomeTeam = v?.teams?.home?.id === numbericID;
              const isAwayTeam = v?.teams?.away?.id === numbericID;

              if (isHomeTeam) {
                win = v?.teams?.home?.winner;
              } else if (isAwayTeam) {
                win = v?.teams?.away?.winner;
              }

              return (
                <div key={i} className="hover:cursor-pointer hover:opacity-70">
                  <li
                    className="w-full pt-[35px] pb-[10px]"
                    onClick={() =>
                      router.push(
                        FormatMatchDetailURL(
                          v?.teams?.home?.name,
                          v?.teams?.away?.name,
                          v?.fixture?.id,
                          locale
                        )
                      )
                    }
                  >
                    {/* match date and league */}
                    <div className="w-full flex justify-between text-xs text-custom-gray h-[18px] items-center">
                      <h4>{date}</h4>
                      <div className="flex items-center gap-2">
                        <h4>{v?.league?.name}</h4>
                        <div className="w-4 h-4 rounded-full border border-solid border-custom-gray flex items-center justify-center">
                          <Image
                            src={v?.league?.logo}
                            alt={v?.league?.name}
                            width={12}
                            height={12}
                          />
                        </div>
                      </div>
                    </div>
                    {/* team and match time */}
                    <div className="text-xs flex justify-center h-[41px] items-center">
                      {/* home team */}
                      <div className="flex w-2/5 justify-end items-center gap-4">
                        <h3>{v?.teams?.home?.name}</h3>
                        <Image
                          src={v?.teams?.home?.logo}
                          alt={v?.teams?.home?.name}
                          width={30}
                          height={30}
                        />
                      </div>
                      {/* match time */}
                      <div className="w-1/5 flex justify-center">
                        {/* match didn't start yet */}
                        {scheduled.includes(v?.fixture?.status?.short) ? (
                          <h3>{time}</h3>
                        ) : // live match || Match is stopped by referee
                        live.includes(v?.fixture?.status?.short) ||
                          stop.includes(v?.fixture?.status?.short) ? (
                          <AnimatePresence>
                            <div className="bg-[#00985F] text-white text-sm w-[45px] h-[24px] rounded-[0.4vw] flex items-center justify-center">
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
                                  ? `${upcomingMatch[0]?.goals?.home}
                                      -
                                      ${upcomingMatch[0]?.goals?.away}`
                                  : `${
                                      upcomingMatch[0]?.fixture?.status
                                        ?.elapsed || 0
                                    }'`}
                              </motion.h3>
                            </div>
                          </AnimatePresence>
                        ) : // Match finished
                        finish.includes(v?.fixture?.status?.short) ? (
                          <h3
                            className={`text-xs px-3 py-[2px] ${
                              win === null
                                ? "bg-[#8C9498]"
                                : win === true
                                ? "bg-[#00985f]"
                                : "bg-[#dd3635]"
                            } rounded-[0.4vw] text-white`}
                          >
                            {v?.goals?.home}-{v?.goals?.away}
                          </h3>
                        ) : // Match is cancled
                        cancle.includes(v?.fixture?.status?.short) ? (
                          <h3 className="line-through">{time}</h3>
                        ) : unearned.includes(v?.fixture?.status?.short) ? (
                          <h3>
                            {" "}
                            className=
                            {`text-xs px-3 py-[2px] ${
                              win === null
                                ? "bg-[#8C9498]"
                                : win === true
                                ? "bg-[#00985f]"
                                : "bg-[#dd3635]"
                            } rounded-[0.4vw] text-white`}
                            {v?.fixture?.status?.short}
                          </h3>
                        ) : (
                          <></>
                        )}
                      </div>

                      {/* away team */}
                      <div className="flex w-2/5 items-center gap-4">
                        <Image
                          src={v?.teams?.away?.logo}
                          alt={v?.teams?.away?.name}
                          width={30}
                          height={30}
                        />
                        <h3>{v?.teams?.away?.name}</h3>
                      </div>
                    </div>
                  </li>
                  {displayedMatches?.length > i + 1 && (
                    <hr className="dark:border-custom-gray3" />
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
