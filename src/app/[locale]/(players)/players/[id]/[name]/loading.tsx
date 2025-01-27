"use client";

import React from "react";
import { RingLoader } from "react-spinners";
import { useTheme } from "next-themes";

export default function Loading() {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div style={{
      width: '100%',
      height: '900px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <RingLoader color={currentTheme === "dark" ? "white" : "black"} size={100} />
    </div>
  );
}