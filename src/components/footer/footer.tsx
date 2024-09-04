"use client";

import React from "react";
import Image from "next/image";
import Github from "../../../public/img/github.png";
import LinkedIn from "../../../public/img/linkedin.png";
import Instagram from "../../../public/img/instagram.png";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const onClickMoveSite = (url:string) => {
    router.push(url);
  }
  return (
    <div className="w-100 h-52 bg-slate-200 mt-20 flex justify-between px-14 max-md:px-12 py-8">
      <div className="bg-green-50 w-full">
        <h1>Hello</h1>
      </div>
      <div className="bg-yellow-50 w-full">
        <h1>Hello</h1>
      </div>
      <div className="w-full flex flex-col justify-center items-end">
        <div className="flex">
          <div className="w-10 h-10 bg-slate-500 rounded-full flex justify-center items-center cursor-pointer mr-2 hover:opacity-70" onClick={() => {
            onClickMoveSite("https://github.com/junbeomwooo");
          }}> 
            <Image
              src={Github}
              alt="github"
              width={34}
              height={34}
              style={{ width: 34, height: 34 }}
              className="border-8 border-black "
            ></Image>
          </div>
          <div className="w-10 h-10 bg-slate-500 rounded-full flex justify-center items-center cursor-pointer mr-2 hover:opacity-70" onClick={() => {
            onClickMoveSite("https://www.linkedin.com/in/woojunbeom/");
          }}>
          <Image
            src={LinkedIn}
            alt="linkedin"
            width={31}
            height={31}
            style={{ width: 31, height: 31 }}
          ></Image>
          </div>
          <div className="w-10 h-10 bg-slate-500 rounded-full flex justify-center items-center cursor-pointer hover:opacity-70" onClick={() => {
            onClickMoveSite("https://www.instagram.com/wwjjjbbb/")
          }}>
          <Image
            src={Instagram}
            alt="instagram"
            width={31}
            height={31}
            style={{ width: 31, height: 31 }}
          ></Image>
          </div>
        </div>
        <div className="text-xsm font-medium text-slate-800 text-right">
          <h3 className="mt-4">junbeomwoo.woo@gmail.com</h3>
          <h3 className="mt-4">+45 44 11 14 18</h3>
        </div>
      </div>
    </div>
  );
}
