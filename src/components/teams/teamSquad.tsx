"use client";

import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import { getTeamSquad, getTeamInfo } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";
import Image from "next/image";

import TeamHeader from "./header/teamHeader";
import ColorThief from "colorthief";

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

  // http://localhost:3000/en/teams/47/Tottenham/squad
  // 1. ref를 통해 색상 추출하고 해당 색상을 통해 tshirt 부분 backgroud 색상 입히기
  // 2. teamSqaud, teamOverView 테이블 부분 에러 고치기
  // 3. 마저 완성하고 transfer 페이지도 만들기

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // after first rendering, it will chagne useRef value as fasle.

      if (!teamInfo) {
        dispatch(getTeamInfo({ team: id }));
      }

      if (!squads) {
        dispatch(getTeamSquad({ team: id }));
      }
    }
  }, [dispatch, id, teamInfo, squads]);

  console.log(teamInfo);

  const players = squads ? squads[0]?.players : null;

  const imgRef = useRef<HTMLImageElement | null>(null);

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

      {
        <div className="w-full bg-white rounded-xl mt-6 pt-5 dark:bg-custom-dark border-slate-200 border border-solid dark:border-0">
          <div className="px-8">
            <table className="w-full mt-6">
              <thead>
                <tr className="text-sm">
                  <th className="text-start pb-4">{t("player")}</th>
                  <th className="text-center pb-4 max-md:hidden">
                    {t("position")}
                  </th>
                  <th className="text-center pb-4">{t("age")}</th>
                  <th className="text-center pb-4">{t("shirt")}</th>
                </tr>
              </thead>

              <tbody className="text-xs w-full relative">
                {/* when user want to view all players who came to this team */}
                {players?.length > 0 ? (
                  players?.map((v: any, i: number) => {
                    return (
                      <>
                        <tr
                          key={i}
                          className="align-middle h-[50px] cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-custom-lightDark"
                          onClick={() => {
                            router.push(
                              `/${locale}/players/${v?.id}/${(v?.name).replace(
                                / /g,
                                "-"
                              )}`
                            );
                          }}
                        >
                          <td className="h-[50px] py-4 w-3/5 md:w-2/5">
                            <div className="flex gap-4 items-center h-[50px]">
                              <Image
                                src={`https://media.api-sports.io/football/players/${v?.id}.png`}
                                alt={v?.name}
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div className="text-[12px]">
                                <div>{v?.name}</div>
                                <div className="md:hidden text-[#8A8A8B]">
                                  {t(v?.position)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="h-[50px] align-middle py-4 text-center w-1/5 hidden md:table-cell ">
                            {t(v?.position)}
                          </td>
                          <td className="h-[50px] align-middle py-4 text-center w-1/5">
                            {v?.age}
                          </td>
                          <td className="h-[50px] align-middle py-4 text-center w-1/5">
                            {v?.number}
                          </td>
                        </tr>
                        {players?.length > i + 1 && (
                          <hr className="w-full border-1 border-solid absolute dark:border-custom-gray3" />
                        )}
                      </>
                    );
                  })
                ) : (
                  <h1 className="py-6 text-sm">{t("noTransfer")}</h1>
                )}
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  );
}
