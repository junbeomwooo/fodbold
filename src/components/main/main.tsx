"use client";

import Fixtures from "./fixtures";
import League from "./leagues";
import Standing from "./standing";
import { TbPlayFootball } from "react-icons/tb";

import { Fragment, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAppSelector } from "@/lib/storeHooks";
import moment from "moment-timezone";

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
  const [dontShowToday, setDontShowToday] = useState(false);

  const { location }: any = useAppSelector((state) => state.locationSlice);

  const locate = location || "Europe/Copenhagen";

  const m = useTranslations("main");

  // today
  const getToday = (timezone: string) => {
    return moment().tz(timezone).startOf("day").format("YYYY-MM-DD");
  };
  console.log(getToday(locate));


  useEffect(() => {
    const hideDate = localStorage.getItem("HIDE_POPUP_TODAY");
    const today = getToday(locate);

    // if hide data was yesterday or before, remove storage data.
    if (hideDate && hideDate !== today) {
      localStorage.removeItem("HIDE_POPUP_TODAY"); 
    }

    // if hide data is today,hide popup ui
    if (hideDate && hideDate === today) {
      setIsPopup(false);
    }
  }, [locate]);

  return (
    <Fragment>
      <div className="flex w-full h-full px-14 pt-28 dark:bg-black max-lg:block max-msm:px-4 ">
        <League leagueData={leagueData} locale={locale} />
        <Fixtures />
        <Standing standing={standing} locale={locale} />
      </div>
      {isPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div>
            <div className="w-full h-20 bg-[#E2E8F0] dark:bg-[#1D1D1D] flex items-center justify-center rounded-t-xl">
              <TbPlayFootball className="text-black dark:text-white w-[50px] h-[50px]" />
            </div>
            <hr className="border-white dark:border-[#5F5F5F] border-[0.5px]" />
            {/* Box */}
            <div
              className="bg-white dark:bg-[#1D1D1D] p-8 rounded-b-xl shadow-lg z-60 w-[450px]"
              onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭은 닫히지 않게
            >
              <h1 className="text-2xl font-bold text-black dark:text-white">
                {m("notification")}
              </h1>

              <p className="text-black dark:text-white text-base mt-8 font-light">
                {m("notification1")}
              </p>
              <p className="text-black dark:text-white text-base mt-2 font-light">
                {m("notification2")}
              </p>
              <p className="text-black dark:text-white text-base mt-2 font-light">
                {m("notification3")}
              </p>
              <button
                className="mt-[40px] mb-1 px-4 py-[13px] bg-[#16A348] text-white rounded w-full 
             transform transition-transform duration-200 hover:scale-[103%]"
                onClick={() => {
                  if (dontShowToday) {
                    localStorage.setItem("HIDE_POPUP_TODAY", getToday(locate));
                  }
                  setIsPopup(false);
                }}
              >
                {m("gotit")}
              </button>
              <label className="text-sm flex items-center gap-2 cursor-pointer mt-3">
                <input
                  type="checkbox"
                  className="accent-green-600 scale-[1.1]"
                  checked={dontShowToday}
                  onChange={(e) => setDontShowToday(e.target.checked)}
                />
                {m("dontshowtoday")}
              </label>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
