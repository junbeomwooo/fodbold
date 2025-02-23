"use client";

import moment from "moment-timezone";
import { useTranslations } from "next-intl";

export default function UseFormatMatchDate(matchDate: string, locale: string) {
  const d = useTranslations("date");
  
  // YYYY-MM-DD
  let date = matchDate?.split("T")[0];

  // match year
  const matchYear = date?.substring(0, 4);

  // today
  const today = moment().format("YYYY-MM-DD");

  // yesterday
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  // tomorrow
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  // change country locale value base on language
  const localeInfo =
    locale === "en"
      ? "en-US"
      : locale === "ko"
      ? "ko-KR"
      : locale === "da"
      ? "da-DK"
      : "en-US";

  //  chnage match time's format based on language
  const matchTime = new Date(matchDate);

  const time = matchTime.toLocaleTimeString(localeInfo, {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12시간제 (오전/오후)
  });

  // this year
  const nowYear = today.substring(0, 4);

  // /**  지금 날짜로부터 오늘,어제,내일 일 경우, 날짜 포맷 변경 */
  if (date === today) {
    // // if the match is today
    // date = d("today");
  } else if (date === yesterday) {
    // // if the match was yesterday
    // date = d("yesterday");
  } else if (date === tomorrow) {
    // // if the match is tomorrow
    // date = d("tomorrow");
  } else {
    // 경기 시간을 데이터 객체로 변환 후 url 파라미터에 있는 locale값을 정식 locale값으로 변환 후 toLocaleDateString을 통해 해당 언어에 해당하는 시간 값으로 반환
    const dateObj = new Date(date);
    date = dateObj.toLocaleDateString(localeInfo?.toString(), {
      month: "long",
      day: "numeric",
    });

    // 현재년도와 매치의 년도가 다르다면 년도를 포함한 형식으로 보여줌
    if (nowYear !== matchYear) {
      date = dateObj.toLocaleDateString(localeInfo?.toString(), {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  return { time: time, date: date };
}
