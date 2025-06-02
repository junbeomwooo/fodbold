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

import { useRouter } from "next/navigation";

export default function LeagueSwiper({
  match,
  today,
  locale,
}: {
  match: any;
  today: any;
  locale: string;
}) {
  // 번역
  const t = useTranslations("date");
  const g = useTranslations("general");

  // 라우터
  const router = useRouter();

  // match가 배열인지 확인하고, 배열이 아니면 빈 배열로 설정
  const matches = Array.isArray(match) ? match : [];

  // 어제
  const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

  //내일
  const tomorrow = moment().add(1, "days").format("YYYY-MM-DD");

  /** 받아온 데이터를 시간순으로 정렬 */
  const sortedMatch = [...matches].sort((a: any, b: any) => {
    return a.fixture.timestamp - b.fixture.timestamp;
  });

  /** 오늘이나 가장 가까운 미래의 경기의 인덱스  */
  let todayIndex = sortedMatch?.findIndex((v: any, i: number) => {
    return v.fixture.date.split("T")[0] >= today;
  });

  // 👉 미래 경기가 하나도 없는 경우
  if (todayIndex === -1) {
    // 오늘 이전 경기들만 필터링해서 가장 마지막 경기 찾기
    todayIndex =
      sortedMatch
        .map((_, i: number) => i) // 인덱스만 유지
        .filter((i) => sortedMatch[i].fixture.date.split("T")[0] < today)
        .pop() ?? 0;
  }

  // 현재 년도
  const nowYear = today.substring(0, 4);

  /**경기 상세 페이지로 이동 */
  const formattedLeagueURL = (home: string, away: string, matchID: number) => {
    const matchVS = `${home}-vs-${away}`;

    // 하이픈을 모두 삭제합니다.
    const noHyphens = matchVS.replace(/-/g, " ");

    // 두 번 이상의 연속 공백을 하나로 줄입니다.
    const cleanedString = noHyphens.replace(/\s{2,}/g, " ");

    // 1. 공백을 하이픈으로 변경
    const hyphenated = cleanedString.replace(/\s+/g, "-");

    // 2. 온점을 제거
    const withoutDots = hyphenated.replace(/\./g, "");

    // 3. 대문자 뒤에 하이픈 추가 (선택 사항)
    const withHyphens = withoutDots.replace(/(?<=[A-Z])-(?=[a-z])/g, "-");

    // 4. 소문자로 변환
    const name = withHyphens.toLowerCase();

    /** 최종 */
    const url = `/${locale}/matches/${name}/${matchID}`;

    router.push(url);
  };

  /** key값을 통한 자동 재렌더링은 성능 저하를 야기할 수 있으니 이걸 해결하고 각 경기 상태에 따른 클라이언트 렌더링 구현하기 */
  return (
    <>
      {/* match */}
      {match ? (
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
          {/* sortedMatch */}
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

            // 언어별로 국가 로케일 설정값 변경
            const localeInfo =
              locale === "en"
                ? "en-US"
                : locale === "ko"
                ? "ko-KR"
                : locale === "da"
                ? "da-DK"
                : "en-US";

            /** 경기 날짜 및 시간을 로케일에 맞게 변경하도록 변경하였으니 잘 작동하는지 확인하기 */

            // 경기 시간을 언어별로 설정
            const matchTime = new Date(v.fixture.date);
            const time = matchTime.toLocaleTimeString(localeInfo, {
              hour: "numeric",
              minute: "numeric",
              hour12: true, // 12시간제 (오전/오후)
            });

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
              // 경기 시간을 데이터 객체로 변환 후 url 파라미터에 있는 locale값을 정식 locale값으로 변환 후 toLocaleDateString을 통해 해당 언어에 해당하는 시간 값으로 반환
              const matchDate = new Date(date);
              date = matchDate.toLocaleDateString(localeInfo?.toString(), {
                month: "long",
                day: "numeric",
              });

              // 현재년도와 매치의 년도가 다르다면 년도를 포함한 형식으로 보여줌
              if (nowYear !== matchYear) {
                date = matchDate.toLocaleDateString(localeInfo?.toString(), {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              }
            }
            // 스코어
            const score = `${v.goals.home} - ${v.goals.away}`;

            return (
              <SwiperSlide key={i} className="dark:bg-custom-dark">
                <div
                  className="w-full h-full flex justify-around items-center border border-solid  border-slate-200 rounded-xl py-7 px-4 cursor-pointer hover:opacity-50 dark:border-custom-gray3"
                  onClick={() =>
                    formattedLeagueURL(
                      v.teams.home.name,
                      v.teams.away.name,
                      v.fixture.id
                    )
                  }
                >
                  <div className="flex flex-col items-center text-xsm w-1/3">
                    <Image
                      src={v.teams.home.logo}
                      alt="home tame logo"
                      width={50}
                      height={50}
                      className="w-8 h-8  object-contain"
                    />
                    <h3 className="mt-4">{v.teams.home.name}</h3>
                  </div>

                  {/* 경기가 시작하지 않았을 때 */}
                  {scheduled.includes(v.fixture.status.short) ? (
                    <div className="flex flex-col items-center text-xsm justify-between h-14 w-1/3">
                      <h3 className="text-base font-medium">{time}</h3>
                      <h4>{date}</h4>
                    </div>
                  ) : //  경기가 진행 중이거나 중단된 경우
                  live.includes(v.fixture.status.short) ||
                    stop.includes(v.fixture.status.short) ? (
                    <div className="flex flex-col items-center text-xsm justify-between h-14 w-1/3">
                      <h3 className="text-base font-medium">{score}</h3>
                      <h4 className="text-green-600">
                        {v.fixture.status.elapsed}&apos;
                      </h4>
                    </div>
                  ) : // 경기가 끝났을 경우 || 부전승인 경우
                  finish.includes(v.fixture.status.short) ||
                    unearned.includes(v.fixture.status.short) ? (
                    <div className="flex flex-col items-center text-xsm justify-between h-14 w-1/3">
                      <h3 className="text-base font-medium">{score}</h3>
                      <h4>{date}</h4>
                    </div>
                  ) : // 경기가 취소, 지연되었을 경우
                  cancle.includes(v.fixture.status.short) ? (
                    <div className="flex flex-col items-center text-xsm justify-between h-14 w-1/3">
                      <h3 className="text-base font-medium line-through">
                        {score}
                      </h3>
                      <h4>Match off</h4>
                    </div>
                  ) : null}
                  <div className="flex flex-col items-center text-xsm w-1/3">
                    <Image
                      src={v.teams.away.logo}
                      alt="away tame logo"
                      width={50}
                      height={50}
                      className="w-8 h-8  object-contain"
                    />
                    <h3 className="mt-4">{v.teams.away.name}</h3>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <h1 className="text-base pt-6 pb-4">{g("noresults")}</h1>
      )}
    </>
  );
}
