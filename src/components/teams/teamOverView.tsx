"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { getTeamsStatistics } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";
import { useEffect } from "react";


export default function TeamOverView({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  const dispatch = useAppDispatch();
  const { leagues } = useAppSelector((state) => state.leagueSlice);
  const { statics } = useAppSelector((state) => state.teamsSlice);

  console.log(leagues);


  // slice 파일에 받아오는 데이터 콘솔로 찍어놨으니까 그거 확인 후 마저 팀 페이지 구현하기
  // 리그값이 각각 따로 들어오니 이거에 따른 디자인 구상해보기
  // http://localhost:3000/en/teams/47/Tottenham
  useEffect(() => {
    dispatch(getAllLeaguesByTeam({team:id})).then(({payload}) => {
      const nationalLeague = payload[0]?.league?.id
      const latestSeason = payload[0]?.seasons?.at(-1)?.year;
      console.log(nationalLeague);
      console.log(latestSeason);
      dispatch(getTeamsStatistics({league: nationalLeague, season:latestSeason, team:id}))
    })
  },[dispatch, id])

  console.log(statics);


  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
