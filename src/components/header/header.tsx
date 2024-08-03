import Link from "next/link";
import Image from "next/image";
import HeaderSetting from "./headerSetting";
import { useState } from "react";

export default function Header() {
  return (
    <>
      <div className="h-20 flex flex-row items-center justify-between hover:no-underline px-24 max-md:px-12 bg-slate-100 dark:bg-black">
        <Link
          className="font-extrabold text-xl text-emerald-400 hover:no-underline"
          href="/"
        >
          <Image
            src="/img/logo.png"
            alt="logo"
            width={100}
            height={50}
            className="dark:invert"
          />
        </Link>
        <div className="flex">
          <Link className="ml-12 max-md:hidden dark:text-white" href="/">
            Matchs
          </Link>
          <div className="relative w-5 h-5 ml-8 md:hidden">
            <Image
              src="/img/ball.png"
              alt="match"
              fill
              style={{ objectFit: 'contain' }}
              className="hover:cursor-pointer invert dark:invert-0"
            />
          </div>
          <Link className="ml-12 max-md:hidden  dark:text-white" href="/">
            News
          </Link>
          <div className="relative w-5 h-5 ml-8 md:hidden dark:invert">
            <Image
              src="/img/news.png"
              alt="news"
              fill
              style={{ objectFit: 'contain' }}
              className="hover:cursor-pointer"
            />
          </div>
          <HeaderSetting />
        </div>
      </div>
      <hr className="border-zinc-900 border-1 w-full dark:border-2" />
    </>
  );
}
