"use client";

import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../lib/storeHooks";
import { getCurrentData } from "../../lib/features/standingSlice";

export default function LeagueStanding() {

    const dispatch = useAppDispatch();
    const { data }:any = useAppSelector((state) => state.standingSlice);
  
    useEffect(() => {
      dispatch(getCurrentData());
      console.log(data)
    },[data, dispatch]);

  return (
    <div>
      
    </div>
  );
}