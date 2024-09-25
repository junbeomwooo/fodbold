import React, { useRef, useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";
// import required modules
import { Navigation } from "swiper/modules";
import Image from "next/image";

import moment from "moment-timezone";

import { useTranslations } from "next-intl";

import stringFormatDate from "@/lib/stringFormatDate";

/** 예제 파일 */
import { example } from "../../../../public/example";

export default function LeagueSwiper({
  match,
  today,
}: {
  match: any;
  today: any;
}) {
  // 번역
  const t = useTranslations("Date");

  // match가 배열인지 확인하고, 배열이 아니면 빈 배열로 설정
  const matches = Array.isArray(match) ? match : [];

  // 어제
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  //내일
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  //   let translated = "";

  //   window.location.pathname === "/en"
  //     ? (translated = `${t(weekday)} ${day} ${t(month)}`)
  //     : window.location.pathname === "/da"
  //     ? (translated = `${t(weekday)} ${day}. ${t(month)}`)
  //     : window.location.pathname === "/ko"
  //     ? (translated = `${t(month)} ${day}일 ${t(weekday)}`)
  //     : null;

  //   setFormattedDate(translated);
  // }

  /** 받아온 데이터를 시간순으로 정렬 */
  const sortedMatch = [...matches].sort((a: any, b: any) => {
    return a.fixture.timestamp - b.fixture.timestamp;
  });

  /** 오늘이나 가장 가까운 미래의 경기의 인덱스  */
  const todayIndex = sortedMatch?.findIndex((v: any, i: number) => {
    return v.fixture.date.split("T")[0] >= today;
  });

  const location = window.location.pathname.split("/")[1];

  /** key값을 통한 자동 재렌더링은 성능 저하를 야기할 수 있으니 이걸 해결하고 각 경기 상태에 따른 클라이언트 렌더링 구현하기 */
  return (
    <>
      <Swiper
        key={todayIndex} // index값이 변경될때마다 자동 재렌더링
        navigation={true}
        modules={[Navigation]}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={49}
        className="mySwiper"
        initialSlide={todayIndex >= 0 ? todayIndex : 0}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          700: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {sortedMatch?.map((v: any, i: number) => {
          /** 경기의 상태 값 */
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

          // YYYY-MM-DD
          let date = v.fixture.date.split("T")[0];

          // 경기 년도
          const matchYear = date.substring(0, 4);

          // MM:SS
          const time = v.fixture.date.split("T")[1].substring(0, 5);

          /**  지금 날짜로부터 오늘,어제,내일 일 경우, 날짜 포맷 변경 */
          if (date === today) {
            // 오늘일 경우
            date = t("today");
          } else if (date === yesterday) {
            // 어제일 경우
            date = t("yesterday");
          } else if (date === tomorrow) {
            //  내일 일 경우
            date = t("tomorrow");
          } else {
            // 그 외 날짜 포맷 23 Oct 과 같은 형식으로 변경
            const changedDate = stringFormatDate(date).toLowerCase();

            const [weekday, day, month] = changedDate?.split(" ");

            location === "en"
              ? (date = `${day} ${t(month)}`)
              : location === "da"
              ? (date = `${day}. ${t(month)}`)
              : location === "ko"
              ? (date = `${t(month)} ${day}일`)
              : null;
          }
          // 스코어
          const score = `${v.goals.home} - ${v.goals.away}`;

          return (
            <SwiperSlide key={i} className="dark:bg-custom-dark">
              <div className="w-full h-full flex justify-around items-center border border-solid  border-black rounded-xl py-7 px-4 cursor-pointer hover:opacity-50 dark:border-custom-gray3">
                <div className="flex flex-col items-center text-xsm ">
                  <Image
                    src={v.teams.home.logo}
                    alt="home tame logo"
                    width={10}
                    height={10}
                    className="w-8 h-8  object-contain"
                  />
                  <h3 className="mt-4">{v.teams.home.name}</h3>
                </div>

                {/* 경기가 시작하지 않았을 때 */}
                {scheduled.includes(v.fixture.status.short) ? (
                  <div className="flex flex-col items-center text-xsm justify-between h-14 ">
                    <h3 className="text-base font-medium">{time}</h3>
                    <h4>{date}</h4>
                  </div>
                ) : //  경기가 진행 중이거나 중단된 경우
                live.includes(v.fixture.status.short) ||
                  stop.includes(v.fixture.status.short) ? (
                  <div>
                    <h3 className="text-base font-medium">{score}</h3>
                    <h4></h4>
                  </div>
                ) : // 경기가 끝났을 경우
                finish.includes(v.fixture.status.short) ? (
                  <div className="flex flex-col items-center text-xsm justify-between h-14 ">
                    <h3 className="text-base font-medium">{score}</h3>
                    <h4>{date}</h4>
                  </div>
                ) : null}
                <div className="flex flex-col items-center text-xsm ">
                  <Image
                    src={v.teams.away.logo}
                    alt="away tame logo"
                    width={10}
                    height={10}
                    className="w-8 h-8  object-contain"
                  />
                  <h3 className="mt-4">{v.teams.away.name}</h3>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
