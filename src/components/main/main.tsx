"use client";

import Fixtures from "./fixtures";
import League from "./leagues";
import Standing from "./standing";
import { TbPlayFootball } from "react-icons/tb";

import { Fragment, useState } from "react";

export default function Main({
  standing,
  locale,
  leagueData,
}: {
  standing: any;
  locale: string;
  leagueData: any;
}) {
  const [isPopup, setIsPopup] = useState(true);
  return (
    <Fragment>
      <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block max-msm:px-4">
        <League leagueData={leagueData} locale={locale} />
        <Fixtures />
        <Standing standing={standing} locale={locale} />
      </div>
      {isPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div>
            <div className="w-full h-20 bg-[#E2E8F0] flex items-center justify-center rounded-t-xl">
              <TbPlayFootball className="text-black w-[50px] h-[50px]" />
            </div>
            <div
              className="bg-white dark:bg-gray-800 p-8 rounded-b-xl shadow-lg z-60 w-[400px]"
              onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭은 닫히지 않게
            >
              <h1 className="text-2xl font-bold text-black">Notification</h1>
              <p className="text-black dark:text-white text-base">
                This site uses API-Football’s free tier, which is limited to 100
                requests per day and 10 per minute. If data fails to load,
                please try again in 1 minute. Once the daily limit is reached,
                the service will resume the following day.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-[#16A349] text-white rounded"
                onClick={() => setIsPopup(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
