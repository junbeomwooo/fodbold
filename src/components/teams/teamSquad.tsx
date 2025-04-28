"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { getTeamSquad, getTeamInfo } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";

import TeamHeader from "./header/teamHeader";

export default function TeamSquad({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  /** dispatch */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);
  const { teamInfo, squads }: any = useAppSelector((state) => state.teamsSlice);
  const { leagues }: { leagues: any } = useAppSelector(
    (state) => state.leagueSlice
  );
  const { location }: any = useAppSelector((state) => state.locationSlice);

  /** routing */
  const router = useRouter();

  /** translataions */
  const t = useTranslations("team");

  // if there is no location it will fixed Europe/Copenhagen as timezone
  const locate = useMemo(() => location || "Europe/Copenhagen", [location]);

  // firstRender acts to ensure that a function runs only on the initial render of the component
  // for removing alert from dependency array of useEffect
  const firstRender = useRef(true);

  // http://localhost:3000/en/teams/47/Tottenham/tables

  // 마저 완성하기
  useEffect(() => {
    if (firstRender.current) {
      if (!teamInfo) {
        firstRender.current = false; // after first rendering, it will chagne useRef value as fasle.
        dispatch(getTeamInfo({ team: id }));
      }
      dispatch(getTeamSquad({ team: id }));
    }
  }, [dispatch, fixture, id, leagues, squads, teamInfo]);

  console.log(squads);

  return (
    <div className="w-full">
      <TeamHeader
        fixture={fixture}
        teamInfo={teamInfo}
        leagues={leagues}
        locale={locale}
        id={id}
        name={name}
        t={t}
      />
    </div>
  );
}
