import Link from "next/link";
import Image from "next/image";
import HeaderSetting from "./headerSetting";
import {useTranslations} from 'next-intl';

export default function Header() {
  const t = useTranslations("header");
  return (
    <>
      <div className="h-20 flex flex-row items-center justify-between hover:no-underline px-14 max-md:px-12 bg-slate-100 dark:bg-black fixed w-full">
        <Link
          className="font-extrabold text-xl text-emerald-400 hover:no-underline"
          href="/"
        >
          <Image
            src="/img/logo.png"
            alt="logo"
            width={100}
            height={50}
            className="dark:invert object-contain"
            style={{ width: 100, height: 50 }}
            priority 
          />
        </Link>
        <div className="flex">
          <Link className="ml-12 max-md:hidden dark:text-white" href="/">
            {t('matches')}
          </Link>
          <div className="relative w-5 h-5 ml-8 md:hidden">
            <Image
              src="/img/ball.png"
              alt="match"
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
              className="hover:cursor-pointer invert dark:invert-0"
            />
          </div>
          <Link className="ml-12 max-md:hidden  dark:text-white" href="/">
          {t('news')}
          </Link>
          <div className="relative w-5 h-5 ml-8 md:hidden dark:invert">
            <Image
              src="/img/news.png"
              alt="news"
              fill
              sizes="100%"
              style={{ objectFit: "contain" }}
              className="hover:cursor-pointer"
            />
          </div>
          <HeaderSetting />
        </div>
        <hr className="border-zinc-900 border-1 w-full dark:border-2  absolute bottom-0 left-0 px-0" />
      </div>
    </>
  );
}
