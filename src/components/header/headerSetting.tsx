"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function HeaderSetting() {
  const { systemTheme, theme, setTheme } = useTheme();
  // 테마 선택전엔 테마가 비어있을테니 시스템 테마를 가져다씀
  const currentTheme = theme === "system" ? systemTheme : theme;
  // console.log(` theme ::::: ${theme}`);
  // console.log(` currentTheme ::::: ${currentTheme}`);

  const [openSetting, setOpenSetting] = useState(false);
  const [openLanguge, setOpenLanguge] = useState(false);

  /** 번역 */
  const t = useTranslations("header");
  const router= useRouter();

  /** 페이지 이동 */
  const changeLan = (lan:string):void => {
    const changeUrl = window.location.pathname.replace(/^\/[a-z]{2}/,lan);
    router.push(`/${changeUrl}`);
  }

  return (
    <>
      <div className="relative w-5 h-5 ml-12 max-md:ml-8">
        <Image
          src="/img/setting.png"
          alt="setting"
          fill
          sizes="100%"
          style={{ objectFit: "contain" }}
          className="hover:cursor-pointer dark:invert"
          onClick={() => {
            setOpenSetting(!openSetting);
          }}
        />
      </div>
      {openSetting && (
        <div className="fixed right-0 mr-24 top-24 w-48 h-fit bg-white dark:bg-zinc-800 z-10 rounded max-md:absolute max-md:w-full max-md:mr-0 max-md:top-20 ">
          <div
            className="flex place-content-between cursor-pointer px-5 py-5 max-md:px-10 hover:bg-slate-300 dark:hover:bg-zinc-900 transition-all ease-in-out duration-300"
            onClick={() => {
              setTheme(currentTheme === "dark" ? "light" : "dark");
              setOpenSetting(!openSetting);
            }}
          >
            <h1 className="dark:text-white">{t("theme")}</h1>
            <div className="flex">
              <div className="relative w-4 h-4 mr-1.5 ">
                <Image
                  src="/img/sun.png"
                  alt="dropdown"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  className="mt-0.5 invert dark:invert-0"
                />
              </div>
              <h1 className="dark:text-white">/</h1>
              <div className="relative w-4 h-4 ml-1.5">
                <Image
                  src="/img/moon.png"
                  alt="dropdown"
                  fill
                  sizes="100vw"
                  style={{ objectFit: "contain" }}
                  className="mt-0.5 dark:invert"
                />
              </div>
            </div>
          </div>
          <hr className="border-slate-100 dark:border-zinc-900 border-1 mx-4 max-md:mx-0" />
          <div
            className="flex place-content-between cursor-pointer px-5 py-5 max-md:px-10 hover:bg-slate-300 dark:hover:bg-zinc-900  transition-all ease-in-out duration-300"
            onClick={() => {
              setOpenLanguge(!openLanguge);
            }}
          >
            <h1 className="dark:text-white">{t("language")}</h1>
            <div className="relative w-4 h-4 mr-1.5 ">
              <Image
                src="/img/arrow.png"
                alt="dropdown"
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
                className="mt-0.5 dark:invert"
              />
            </div>
          </div>
          {openLanguge && (
            <>
              <hr className="border-slate-100 dark:border-zinc-900 border-1 mx-4 max-md:mx-0" />
              <div>
                <h1 className="py-3 px-5 text-sm dark:text-white hover:bg-slate-300 dark:hover:bg-zinc-900 hover:cursor-pointer transition-all ease-in-out duration-300" onClick={()=>{
                  changeLan('en');
                }}>
                {t("lanOption.english")}
                </h1>
                <h1 className="py-3 px-5 text-sm dark:text-white hover:bg-slate-300 dark:hover:bg-zinc-900 hover:cursor-pointer transition-all ease-in-out duration-300" onClick={()=>{
                  changeLan('da');
                }}>
                {t("lanOption.danish")}
                </h1>
                <h1 className="py-3 px-5 text-sm dark:text-white hover:bg-slate-300 dark:hover:bg-zinc-900 hover:cursor-pointer transition-all ease-in-out duration-300" onClick={()=>{
                  changeLan('ko');
                }}>
                {t("lanOption.korean")}
                </h1>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
