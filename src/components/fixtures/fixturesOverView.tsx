"use client";

import { getFixtures, getInjuries } from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import FixtureHeader from "./header/fixtureHeader";

// import { fixture } from "../../../public/example";

export default function FixturesOverView({
  id,
  locale,
}: {
  id: number;
  locale: string;
}) {
  /** 리덕스 초기화 */
  const dispatch = useAppDispatch();
  const { fixture, injurie }: any = useAppSelector((state) => state.fixtureSlice);

  const [tabPage, setTabPage] = useState("factsPreview");

  console.log(fixture);

  /** 렌더링시  */
  useEffect(() => {
    dispatch(getFixtures({ id: id }));
    dispatch(getInjuries({id: id}));
  }, [dispatch, id]);

  // getH2H 데이터를 받아와서 확인하고 원하는 데이트가 맞으면 사용하고 아닐 시 사용하지 않기 그 후에 나머지 렌더링 구현하기

  return (
    <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 rounded-xl dark:bg-custom-dark dark:border-0 ">
      {/* 헤더 */}
      <FixtureHeader fixture={fixture} locale={locale} />

      {/* 카테고리 */}
      <div className="flex text-base font-normal mt-10 text-gray-800">
        {/* Facts, Preview */}
        {fixture?.statistics.length > 0 ? (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400"
            onClick={() => setTabPage("factsPreview")}
          >
            <h1>Facts</h1>
            {tabPage === "factsPreview" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400"
            onClick={() => setTabPage("factsPreview")}
          >
            {" "}
            <h1>Preview</h1>
            {tabPage === "factsPreview" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Events */}
        {fixture?.events.length > 0 && (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400 ml-10"
            onClick={() => setTabPage("events")}
          >
            <h1>Events</h1>
            {tabPage === "events" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Lineups */}
        {fixture?.lineups.length > 0 && (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400 ml-10"
            onClick={() => setTabPage("lineups")}
          >
            <h1>Lineup</h1>
            {tabPage === "lineups" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Players */}
        {fixture?.players.length > 0 && (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400 ml-10"
            onClick={() => setTabPage("players")}
          >
            <h1>Players</h1>
            {tabPage === "players" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Stats */}
        {fixture?.statistics.length > 0 && (
          <div
            className="flex flex-col cursor-pointer hover:text-gray-400 ml-10"
            onClick={() => setTabPage("stats")}
          >
            <h1>Stats</h1>
            {tabPage === "stats" ? (
              <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
            ) : (
              <></>
            )}
          </div>
        )}

        {/* Head to Head */}
        <div
          className="flex flex-col cursor-pointer hover:text-gray-400 ml-10"
          onClick={() => setTabPage("hth")}
        >
          <h1>Head-to-Head</h1>
          {tabPage === "hth" ? (
            <div className="bg-green-600 w-auto h-1 mt-6 rounded-full"></div>
          ) : (
            <></>
          )}
        </div>
      </div>
      
      {/* Facts , Preview */}
      {tabPage === "factsPreview" && (
        <div>
          
        </div>
      )}
    </div>
  );
}
