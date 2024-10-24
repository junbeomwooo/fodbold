"use client";

import { getFixtures } from "@/lib/features/fixtureSlice";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

import arrow from "@/../../public/img/arrow.png";

export default function Fixtures({ id }: { id: number }) {
  const f = useTranslations("fixture");

  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);

  const router = useRouter();

  useEffect(() => {
    dispatch(getFixtures({ id: id }));
  }, [dispatch, id]);
  console.log(fixture);

  return (
    <div className="w-full mt-6 max-xl:w-full border-slate-200 border border-solid bg-white p-7 rounded-xl dark:bg-custom-dark dark:border-0">
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
          <Image src={fixture.league.logo} alt={fixture.league.name} width={30} height={30} className="mr-3"/>
          <h2 className="text-lg mr-8 ">{fixture.league.name}</h2>
          <h3 className="text-xsm text-gray-600">{fixture.league.round}</h3>
        </div>
        <hr />
      </div>
    </div>
  );
}
