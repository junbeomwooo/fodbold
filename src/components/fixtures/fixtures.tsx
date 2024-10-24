"use client";

import { getFixtures } from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

import arrow from "@/../../public/img/arrow.png";
import { weekdays } from "moment-timezone";

import dateIcon from "@/../../public/img/date.png";
import venueIcon from "@/../../public/img/venue.png";
import refereeIcon from "@/../../public/img/whistle.png";

import { fixture as fixtureExample } from "../../../public/example";

export default function Fixtures({
  id,
  locale,
}: {
  id: number;
  locale: string;
}) {
  /** 번역 */
  const f = useTranslations("fixture");

  /** 리덕스 초기화 */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);

  /** 라우터 */
  const router = useRouter();

  /** 렌더링시  */
  useEffect(() => {
    dispatch(getFixtures({ id: id }));
  }, [dispatch, id]);

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

  const formattedDate = MatchTimeDateForm.toLocaleDateString(
    localeInfo?.toString(),
    {
      weekday: "short",
      day: "numeric",
      month: "long",
    }
  );

  const formattedTime = MatchTimeDateForm.toLocaleTimeString(
    localeInfo?.toString(),
    {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }
  );

  const formattedDateTime = `${formattedDate}, ${formattedTime}`;

  console.log(fixture);

  return (
    <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 rounded-xl dark:bg-custom-dark dark:border-0">
      {/* 뒤로가기 및 리그정보 */}
      <div className="flex items-center">
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
        <div className="flex justify-center items-center m-auto">
          <Image
            src={fixture?.league.logo}
            alt={fixture?.league.name || "no league name"}
            width={30}
            height={30}
            className="mr-3"
          />
          <h2 className="text-lg mr-8 ">{fixture?.league.name}</h2>
          <h3 className="text-xsm text-custom-gray3">
            {fixture?.league.round}
          </h3>
        </div>
      </div>

      <hr className="border-slate-200 my-5 dark:border-custom-gray3" />
      {/* 날짜, 경기장, 심판 정보 */}
      <div className="flex justify-center text-custom-gray">
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
      </div>
      <hr className="border-slate-200 my-5 dark:border-custom-gray2" />

      <div className="flex">
        {/* 홈팀 */}
        <div className="flex items-center">
          <Link href={"/"} className="text-2xl mr-4">
            {fixture?.teams.home.name}
          </Link>
          <Image
            src={fixture?.teams.home.logo}
            alt={fixture?.teams.home.name}
            width={60}
            height={60}
          ></Image>
        </div>
        {/* 원정팀 */}
        <div className="flex items-center">
          <Image
            src={fixture?.teams.away.logo}
            alt={fixture?.teams.away.name}
            width={60}
            height={60}
          >
            <Link href={"/"} className="text-2xl mr-4">
              {fixture?.teams.away.name}
            </Link>
          </Image>
        </div>
      </div>
    </div>
  );
}
