"use client";

import arrow from "@/../../public/img/arrow.png";
import dateIcon from "@/../../public/img/date.png";
import venueIcon from "@/../../public/img/venue.png";
import refereeIcon from "@/../../public/img/whistle.png";
import ball from "@/../../public/img/ball.png";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function FixtureHeader({
  fixture,
  locale,
  leagueNameURL,
}: {
  fixture: any;
  locale: string;
  leagueNameURL: any;
}) {
  /** 번역 */
  const f = useTranslations("fixture");

  /** 라우터 */
  const router = useRouter();

  /** url을 로케일 형식에 맞게 변환 */
  const localeInfo =
    locale === "en"
      ? "en-US"
      : locale === "ko"
      ? "ko-KR"
      : locale === "da"
      ? "da-DK"
      : null;

  /** 경기 시간을 특정 형태로 지정 */
  const MatchTimeDateForm = new Date(fixture?.fixture.date);

  // ex) Sat, October 5 형태
  const formattedDate = MatchTimeDateForm.toLocaleDateString(
    localeInfo?.toString(),
    {
      weekday: "short",
      day: "numeric",
      month: "long",
    }
  );

  // ex) 13:30 형태
  const formattedTime = MatchTimeDateForm.toLocaleTimeString(
    localeInfo?.toString(),
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  // ex) Sat, October 5, 13:30
  const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  // ex) Oct, 1
  let formattedDate2 = MatchTimeDateForm.toLocaleDateString(
    localeInfo?.toString(),
    {
      month: "short",
      day: "numeric",
    }
  );

  // ex) 1 - 1
  const score = `${fixture?.goals.home} - ${fixture?.goals.away}`;

  // ex) 5 - 4 (Pk)
  const penaltyScore = `Pen:${fixture?.score.penalty.home}-${fixture?.score.penalty.away}`;

  /** 경기 별 상태  */

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

  /** 득점자 */

  // 경기의 득점
  const matchScore = fixture?.events.filter((v: any) => {
    return v.type === "Goal";
  });

  // 홈팀 득점자
  const homeScorer = matchScore?.filter((v: any) => {
    return v.team.id === fixture.teams.home.id;
  });
  // 어웨이팀 득점자
  const awayScorer = matchScore?.filter((v: any) => {
    return v.team.id === fixture.teams.away.id;
  });

  return (
    <div>
      {/* 뒤로가기 및 리그정보 */}
      <div className="flex items-center max-lg:hidden">
        {/* 뒤로가기 버튼 */}
        <div className="flex items-center justify-start">
          <div className="w-7 h-7 rounded-full bg-slate-200 flex justify-center items-center hover:cursor-pointer hover:bg-slate-400 dark:bg-custom-gray3 dark:hover:bg-custom-gray">
            <Image
              src={arrow}
              alt="arrow"
              width={11}
              height={11}
              style={{ width: "11px", height: "11px" }}
              className="rotate-90 dark:invert"
              onClick={() => {
                router.back();
              }}
            />
          </div>
          <h1 className="ml-3 text-base">{f("back")}</h1>
        </div>
        {/* 리그 이름 및 라운드 */}
        <div className="flex justify-center items-center m-auto ">
          <Image
            src={fixture?.league.logo}
            alt={fixture?.league.name || "no league name"}
            width={30}
            height={30}
            className="mr-3"
          />
          <Link
            href={`/${locale}/leagues/${fixture?.league.id}/${leagueNameURL}/overview`}
            className="text-lg mr-8 "
          >
            {fixture?.league.name}
          </Link>
          <h3 className="text-xsm text-custom-gray3">
            {fixture?.league.round}
          </h3>
        </div>
      </div>

      <hr className="border-slate-200 my-5 dark:border-custom-gray3  max-lg:hidden" />
      {/* 날짜, 경기장, 심판 정보 */}
      <div className="flex justify-center text-custom-gray  max-lg:hidden">
        <div className="mx-2 flex items-center">
          <Image
            src={dateIcon}
            alt={"date"}
            width={15}
            height={15}
            className="opacity-60 mr-2"
          />
          <h3 className="text-sm">{formattedDateTime}</h3>
        </div>
        <div className="mx-2 flex items-center">
          <Image
            src={venueIcon}
            alt={"venue"}
            width={25}
            height={25}
            className="opacity-60  mr-2"
          />
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${fixture?.fixture.venue.name}`}
            className="text-sm"
          >
            {fixture?.fixture.venue.name}
          </Link>
        </div>
        {fixture?.fixture.referee ? (
          <div className="mx-2 flex items-center">
            <Image
              src={refereeIcon}
              alt={"referee"}
              width={15}
              height={15}
              className="opacity-60  mr-2"
            />
            <h3 className="text-sm">{fixture?.fixture.referee}</h3>
          </div>
        ) : (
          <></>
        )}
      </div>
      <hr className="border-slate-200 my-5 dark:border-custom-gray2  max-lg:hidden" />
      {/* 경기 할 팀 로고, 경기 정보 */}
      <div className="flex items-center justify-center w-full">
        {/* 홈팀 */}
        <div className="flex items-center w-5/12 justify-end max-lg:flex-col-reverse max-md:w-4/12">
          <Link
            href={"/"}
            className="text-xl mr-8 max-lg:mr-0 max-lg:text-xs max-lg:mt-4 text-center"
          >
            {fixture?.teams.home.name}
          </Link>
          <Image
            src={fixture?.teams.home.logo}
            alt={fixture?.teams.home.name}
            width={50}
            height={50}
          />
        </div>
        {/* 경기시간 || 스코어 */}
        <div className="flex flex-col justify-center items-center w-2/12 max-md:w-4/12">
          {/* 경기의 상태에 따라 렌더링 구현 다르기 하기  */}
          {/* 경기가 시작하지않았다면 */}
          {scheduled.includes(fixture?.fixture.status.short) ? (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-medium">{formattedTime}</h2>
              <h3 className="text-base font-medium text-custom-gray">
                {formattedDate2}
              </h3>
            </div>
          ) : // 경기가 끝났을때
          finish.includes(fixture?.fixture.status.short) ||
            unearned.includes(fixture?.fixture.status.short) ? (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-medium max-lg:text-xl">{score}</h2>
              {/* 패널티 골이 있을경우 */}
              {fixture?.score.penalty.home || fixture?.score.penalty.away ? (
                <h3 className="text-base font-medium text-custom-gray  max-lg:text-sm">
                  {penaltyScore}
                </h3>
              ) : (
                <h3 className="text-base font-medium text-custom-gray max-lg:text-xsm">
                  Full time
                </h3>
              )}
            </div>
          ) : // 경기가 진행중, 중단 중일 때
          live.includes(fixture?.fixture.status.short) ||
            stop.includes(fixture?.fixture.status.short) ? (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-medium">{score}</h2>
              <h3 className="text-base font-medium text-green-600">
                {fixture?.fixture.status.elapsed}
              </h3>
            </div>
          ) : // 경기가 취소 및 연기되었을떄
          cancle.includes(fixture?.fixture.status.short) ? (
            <div>
              <h1 className="dark:text-white max-msm:text-xxs line-through">
                {formattedDate2}
              </h1>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/* 원정팀 */}
        <div className="flex items-center w-5/12 justify-start  max-lg:flex-col max-md:w-4/12">
          <Image
            src={fixture?.teams.away.logo}
            alt={fixture?.teams.away.name}
            width={50}
            height={50}
          />
          <Link
            href={"/"}
            className="text-xl ml-8 max-lg:ml-0 max-lg:text-xs max-lg:mt-4 text-center"
          >
            {fixture?.teams.away.name}
          </Link>
        </div>
      </div>
      {/* 득점이 있을경우 득점자 섹션 보여주기 (경기가 시작하지 않았을 경우 득점은 없음으로 자동으로 필터링 효과도있음)*/}
      <div>
        {fixture?.goals.home || fixture?.goals.away ? (
          <div className="flex justify-center mt-10">
            {/* 홈팀 득점자 */}
            <div className="flex flex-col items-end text-sm text-gray-500 w-5/12">
              {homeScorer.map((v: any, i: number) => {
                return !v.time.extra ? (
                  // 일반 시간에 득점
                  <div key={i} className="flex">
                    {/* player name */}
                    <h4 className="text-xs">{v.player.name}</h4>
                    {/* score time */}
                    <h3 className="text-xs font-semibold ml-2">
                      {v.time.elapsed}&apos;
                    </h3>
                  </div>
                ) : (
                  // 추가시간에 득점
                  <div key={i} className="flex">
                    <h4 className="text-xs">{v.player.name}</h4>
                    <h3 className="text-xs font-semibold ml-2">
                      {v.time.elapsed}+{v.time.extra}&apos;
                    </h3>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center w-2/12">
              <Image
                src={ball}
                alt="score"
                width={15}
                height={15}
                className="invert w-3 h-3 mx-16 opacity-70"
              />
            </div>
            {/* 원정팀 득점자 */}
            <div className="flex flex-col items-start text-sm text-gray-500 w-5/12">
              {awayScorer.map((v: any, i: number) => {
                return !v.time.extra ? (
                  // 일반 시간에 득점
                  <div key={i} className="flex">
                    {/* player name */}
                    <h4 className="text-xs">{v.player.name}</h4>
                    {/* score time */}
                    <h3 className="text-xs font-semibold ml-2">
                      {v.time.elapsed}&apos;
                    </h3>
                  </div>
                ) : (
                  // 추가시간에 득점
                  <div key={i} className="flex">
                    <h4 className="text-xs">{v.player.name}</h4>
                    <h3 className="text-xs font-semibold ml-2">
                      {v.time.elapsed}+{v.time.extra}&apos;
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
