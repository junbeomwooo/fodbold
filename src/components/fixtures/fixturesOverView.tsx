"use client";

import { getFixtures } from "@/lib/features/fixtureSlice";
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
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);

  const [tabPage, setTabPage] = useState("overview");

  /** 렌더링시  */
  useEffect(() => {
    dispatch(getFixtures({ id: id }));
  }, [dispatch, id]);

  return (
    <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 rounded-xl dark:bg-custom-dark dark:border-0">
      {/* 헤더 */}
      <FixtureHeader fixture={fixture} locale={locale} />


      {/* useState 상태값을 이용하여 탭페이지 구성하기 */}
      {tabPage === "overview" && <h1>overview</h1>}
      {tabPage === "hello" && <h1>Hello</h1>}
    </div>
  );
}
