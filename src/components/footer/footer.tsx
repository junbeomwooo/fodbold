"use client";

import React from "react";
import Image from "next/image";
import Github from "../../../public/img/github.png";
import LinkedIn from "../../../public/img/linkedin.png";
import Instagram from "../../../public/img/instagram.png";
import Logo from "../../../public/img/logo.png";
import Ball from "../../../public/img/ball.png"
import { useRouter } from "next/navigation";


export default function Footer() {
  const router = useRouter();

  const onClickMoveSite = (url:string) => {
    router.push(url);
  }
  return (
    <div className="w-100 h-64 bg-slate-200 mt-20 flex justify-between py-8 px-6 md:px-14 sm:px-12  dark:bg-custom-dark">
      <div className="w-full flex items-end">

        <h3 className="text-sm font-semibold text-slate-800 dark:text-white max-sm:text-xs">@2024 Junbeom Woo</h3>

      </div>
      <div className="w-full flex flex-col justify-end items-end">
        <div className="flex">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer mr-2 hover:opacity-70 dark:bg-slate-600 max-sm:w-8 max-sm:h-8" onClick={() => {
            onClickMoveSite("https://github.com/junbeomwooo");
          }}> 
            <Image
              src={Github}
              alt="github"
              className="border-8 border-blac w-8 h-8  max-sm:w-6 max-sm:h-6"
            ></Image>
          </div>
          <div className="w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer mr-2 hover:opacity-70 dark:bg-slate-600 max-sm:w-8 max-sm:h-8" onClick={() => {
            onClickMoveSite("https://www.linkedin.com/in/woojunbeom/");
          }}>
          <Image
            src={LinkedIn}
            alt="linkedin"
            className="border-8 border-blac w-8 h-8 max-sm:w-6 max-sm:h-6"
          ></Image>
          </div>
          <div className="w-10 h-10 bg-slate-700 rounded-full flex justify-center items-center cursor-pointer hover:opacity-70 dark:bg-slate-600 max-sm:w-8 max-sm:h-8" onClick={() => {
            onClickMoveSite("https://www.instagram.com/wwjjjbbb/")
          }}>
          <Image
            src={Instagram}
            alt="instagram"
            className="border-8 border-blac w-8 h-8 max-sm:w-6 max-sm:h-6"
          ></Image>
          </div>
        </div>
        <div className="text-xsm font-medium text-slate-800 text-right dark:text-white max-sm:text-xxs">
          <h3 className="mt-4">junbeomwoo.woo@gmail.com</h3>
          <h3 className="mt-4">+45 44 11 14 18</h3>
        </div>
      </div>
    </div>
  );
}
