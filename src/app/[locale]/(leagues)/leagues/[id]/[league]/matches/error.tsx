"use client";

import React from "react";
import Image from "next/image";
import errorImg from "../../../../../../../../public/img/exclamation.png";
/** error.rsx
 * 에러가 났을때 보여줄 UI
 * 함수이름 아무거나 사용 가능
 * error 컴포넌트에는 'use client'를 사용하여 클라이언트 컴포넌트로 변경해야함
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function ErrorOMG() {
  const router = useRouter();
  return (
    <div
      style={{
        padding: "100px 30px 0 30px",
        height: "800px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Image
        src={errorImg}
        alt="error"
        width={100}
        height={100}
        style={{ width: "100px", margin: "-100px 0 20px 0" }}
      />
      <h1 style={{ fontSize: "40px" }}>Something went wrong</h1>
      <p
        style={{
          textAlign: "center",
          lineHeight: "30px",
          marginTop: "30px",
          fontSize: "16px",
        }}
      >
        There was a problem processing the request. Please try again. <br />
        To report an issue,
        <span>
          <Link
            href={"https://github.com/junbeomwooo"}
            style={{ color: "#2191EC", marginLeft: "5px" }}
          >
            click here
          </Link>
        </span>
        .
      </p>
      <button
        style={{
          marginTop: "30px",
          width: "180px",
          height: "50px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          transform: "scale(1)",
        }}
        className="bg-black text-white dark:bg-white dark:text-black"
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => {
          router.push("/");
        }}
      >
        Return to main page
      </button>
    </div>
  );
}
