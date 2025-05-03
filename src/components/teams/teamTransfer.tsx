"use client";

import TeamHeader from "./header/teamHeader";
import { useAppDispatch, useAppSelector } from "@/lib/storeHooks";
import { useTranslations } from "next-intl";
import { useState, Fragment, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { getTeamInfo, getTransferInfoByTeam } from "@/lib/features/teamsSlice";
import { getAllLeaguesByTeam } from "@/lib/features/leagueSlice";

import Image from "next/image";

export default function TeamTransfer({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  /** router  */
  const router = useRouter();

  /** dispatch */
  const dispatch = useAppDispatch();
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);
  const { teamInfo, transfer }: any = useAppSelector(
    (state) => state.teamsSlice
  );
  const { leagues }: { leagues: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  const [transferFilter, setTransferFilter]: any = useState("playerIn");

  /** translataions */
  const t = useTranslations("team");

  // firstRender acts to ensure that a function runs only on the initial render of the component
  // for removing alert from dependency array of useEffect
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      if (
        (!leagues || !transfer) && // leagues 또는 transfer 없고
        (!fixture || !teamInfo)
      ) {
        firstRender.current = false; // after first rendering, it will chagne useRef value as fasle.

        dispatch(getTeamInfo({ team: id }));
        dispatch(getAllLeaguesByTeam({ team: id }));
        dispatch(getTransferInfoByTeam({ team: id }));
      }
    }
  }, [dispatch, fixture, id, leagues, , teamInfo, transfer]);

  /** data for using */

  let nationalLeagueObj = leagues?.filter(
    (league: any) =>
      league?.league?.type === "League" &&
      league?.seasons?.some((v: any) => v?.current === true)
  );

  // if there is no league type data, then find cup type data
  if (nationalLeagueObj?.length === 0) {
    nationalLeagueObj =
      leagues?.filter(
        (league: any) =>
          league?.league?.type === "Cup" &&
          league?.seasons?.some((v: any) => v?.current === true)
      ) || [];
  }
  console.log(nationalLeagueObj);

  // // find most recent league
  const sortedNationalLeagues = Array.isArray(nationalLeagueObj) ?[...nationalLeagueObj].sort(
    (a: any, b: any) => {
      const aLatestSeason = a.seasons?.at(-1)?.year || 0;
      const bLatestSeason = b.seasons?.at(-1)?.year || 0;
      return bLatestSeason - aLatestSeason;
    }
  ): [];
  console.log(sortedNationalLeagues);

  const leagueNational = sortedNationalLeagues[0];

  // Find player transfer history in lastest season
  const filterTransfer = transfer
    ?.filter(
      (player: any) =>
        new Date(player?.update) >=
        new Date(leagueNational?.seasons?.at(-1)?.start)
    )
    .map((v: any) => {
      return {
        ...v,
        transfers: v?.transfers?.filter((transfer: any) => {
          return (
            new Date(transfer?.date) >=
            new Date(leagues[0]?.seasons?.at(-1)?.start)
          );
        }),
      };
    })
    ?.filter((v: any) => v?.transfers?.length > 0);

  // Find data that the current team has signed the player
  const transferIn = filterTransfer
    ?.flatMap((v: any) =>
      v.transfers
        ?.filter((transfer: any) => transfer?.teams?.in?.id === Number(id))
        ?.map((transfer: any) => ({
          player: v.player,
          update: v.update,
          transfer,
        }))
    )
    .sort((a: any, b: any) => {
      return (
        new Date(b?.transfer?.date).getTime() -
        new Date(a?.transfer?.date).getTime()
      );
    });
  // Find data that the current team has released the player
  const transferOut = filterTransfer
    ?.flatMap((v: any) =>
      v.transfers
        ?.filter((transfer: any) => transfer?.teams?.out?.id === Number(id))
        ?.map((transfer: any) => ({
          player: v.player,
          update: v.update,
          transfer,
        }))
    )
    .sort((a: any, b: any) => {
      return (
        new Date(b?.transfer?.date).getTime() -
        new Date(a?.transfer?.date).getTime()
      );
    });

  console.log(transfer);
  console.log(leagueNational);
  console.log(filterTransfer);
  console.log(transferIn);
  console.log(transferOut);

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
      {/* transfer info */}
      {(transferIn?.length > 0 || transferOut?.length > 0) && (
        <div className="w-full bg-white rounded-xl mt-6 pt-5 dark:bg-custom-dark border-slate-200 border border-solid dark:border-0">
          {/* transfer header */}
          <h1 className="text-base mb-5 px-8">{t("transfer")}</h1>

          {/* transfer filter */}
          <div className="flex text-xsm font-medium gap-3 my-4 items-center px-8">
            <button
              className={`w-1/2 mlg:w-[110px] h-[34px] border border-solid border-[#E4E7EB] rounded-full
                        dark:border-none
                        ${
                          transferFilter === "playerIn"
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "dark:bg-[#333333]"
                        }`}
              onClick={() => setTransferFilter("playerIn")}
            >
              <h1>{t("playerIn")}</h1>
            </button>
            <button
              className={`w-1/2 mlg:w-[110px] h-[34px] border border-solid border-[#E4E7EB] rounded-full
                        dark:border-none
                        ${
                          transferFilter === "playerOut"
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "dark:bg-[#333333]"
                        }`}
              onClick={() => setTransferFilter("playerOut")}
            >
              <h1>{t("playerOut")}</h1>
            </button>
          </div>
          <hr className="border-1 border-solid mt-5 dark:border-custom-gray3" />

          {/* Dedktop , tablet version */}
          <div className="px-8">
            <table className="w-full mt-6 hidden md:table">
              <thead>
                <tr className="text-sm">
                  <th className="text-start pb-4">{t("player")}</th>
                  <th className="text-start pb-4">{t("fee")}</th>
                  {transferFilter === "playerIn" && (
                    <th className="text-start pb-4">{t("from")}</th>
                  )}
                  {transferFilter === "playerOut" && (
                    <th className="text-start pb-4">{t("to")}</th>
                  )}
                  <th className="text-start pb-4">{t("date")}</th>
                </tr>
              </thead>

              <tbody className="text-xs w-full relative">
                {/* when user want to view all players who came to this team */}
                {transferFilter === "playerIn" &&
                  (transferIn?.length > 0 ? (
                    transferIn?.map((v: any, i: number) => {
                      return (
                        <Fragment key={i}>
                          <tr
                            className="align-middle h-[50px] cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-custom-lightDark"
                            onClick={() => {
                              router.push(
                                `/${locale}/players/${
                                  v?.player?.id
                                }/${(v?.player.name).replace(/ /g, "-")}`
                              );
                            }}
                          >
                            <td className="h-[50px] py-4 w-2/5">
                              <div className="flex gap-4 items-center h-[50px] ">
                                <Image
                                  src={`https://media.api-sports.io/football/players/${v?.player?.id}.png`}
                                  alt={v?.player?.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <span>{v?.player?.name}</span>
                              </div>
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              {v?.transfer?.type}
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              <div className="flex items-center gap-4 h-[50px]">
                                <Image
                                  src={v?.transfer?.teams?.out?.logo}
                                  alt={v?.transfer?.teams?.out?.name}
                                  width={20}
                                  height={20}
                                />
                                {v?.transfer?.teams?.out?.name}
                              </div>
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              {v?.transfer?.date}
                            </td>
                          </tr>
                          {transferIn.length > i + 1 && (
                            <tr>
                              <td colSpan={4} className="p-0">
                                <div className="w-full h-[1px] bg-[#e5e5e5] dark:bg-custom-gray3" />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  ) : (
                    <h1 className="py-6 text-sm">{t("noTransfer")}</h1>
                  ))}

                {/* when user want to view all players who went out of this team */}
                {transferFilter === "playerOut" &&
                  (transferOut?.length > 0 ? (
                    transferOut?.map((v: any, i: number) => {
                      return (
                        <Fragment key={i}>
                          <tr
                            className="align-middle h-[50px] cursor-pointer hover:bg-[#F5F5F5] dark:hover:bg-custom-lightDark"
                            onClick={() => {
                              router.push(
                                `/${locale}/players/${
                                  v?.player?.id
                                }/${(v?.player.name).replace(/ /g, "-")}`
                              );
                            }}
                          >
                            <td className="h-[50px] py-4 w-2/5">
                              <div className="flex gap-4 items-center h-[50px] ">
                                <Image
                                  src={`https://media.api-sports.io/football/players/${v?.player?.id}.png`}
                                  alt={v?.player?.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                                <span>{v?.player?.name}</span>
                              </div>
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              {v?.transfer?.type}
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              <div className="flex items-center gap-4 h-[50px]">
                                <Image
                                  src={v?.transfer?.teams?.in?.logo}
                                  alt={v?.transfer?.teams?.in?.name}
                                  width={20}
                                  height={20}
                                />
                                {v?.transfer?.teams?.in?.name}
                              </div>
                            </td>
                            <td className="h-[50px] align-middle py-4 w-1/5">
                              {v?.transfer?.date}
                            </td>
                          </tr>
                          {transferOut.length > i + 1 && (
                            <tr>
                              <td colSpan={4} className="p-0">
                                <div className="w-full h-[1px] bg-[#e5e5e5] dark:bg-custom-gray3" />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })
                  ) : (
                    <h1 className="py-6 text-sm">{t("noTransfer")}</h1>
                  ))}
              </tbody>
            </table>
          </div>

          {/* mobile version */}
          <div>
            {/* player */}
            <div className="blcok md:hidden px-4">
              {/* when user want to view all players who came to this team */}
              {transferFilter === "playerIn" &&
                (transferIn?.length > 0 ? (
                  transferIn?.map((v: any, i: number) => {
                    return (
                      <Fragment key={i}>
                        <div
                          className="w-[300px] text-xs m-auto mt-10 mb-6 hover:opacity-70 cursor-pointer"
                          onClick={() => {
                            router.push(
                              `/${locale}/players/${
                                v?.player?.id
                              }/${(v?.player.name).replace(/ /g, "-")}`
                            );
                          }}
                        >
                          <Image
                            src={`https://media.api-sports.io/football/players/${v?.player?.id}.png`}
                            alt={v?.player?.name}
                            width={50}
                            height={50}
                            className="rounded-full m-auto"
                          />
                          <h2 className="text-center mt-2 text-xs font-medium">
                            {v?.player?.name}
                          </h2>
                          <div className="flex items-center justify-center w-full mt-2 gap-3">
                            <span className="text-custom-gray">From</span>
                            <Image
                              src={v?.transfer?.teams?.out?.logo}
                              alt={v?.transfer?.teams?.out?.name}
                              width={20}
                              height={20}
                            />
                            <h3>{v?.transfer?.teams?.out?.name}</h3>
                          </div>
                          <div className="flex gap-4 w-full justify-center mt-2">
                            <h3> {v?.transfer?.type}</h3>
                            <h3> {v?.transfer?.date}</h3>
                          </div>
                        </div>
                        {transferIn?.length > i + 1 && (
                          <hr className="dark:border-custom-gray3" />
                        )}
                      </Fragment>
                    );
                  })
                ) : (
                  <h1 className="py-6 text-sm">{t("noTransfer")}</h1>
                ))}

              {/* when user want to view all players who went out of this team */}
              {transferFilter === "playerOut" &&
                (transferOut?.length > 0 ? (
                  transferOut?.map((v: any, i: number) => {
                    return (
                      <Fragment key={i}>
                        <div
                          className="w-[300px] text-xs m-auto mt-10 mb-6 hover:opacity-70 cursor-pointer"
                          onClick={() => {
                            router.push(
                              `/${locale}/players/${
                                v?.player?.id
                              }/${(v?.player.name).replace(/ /g, "-")}`
                            );
                          }}
                        >
                          <Image
                            src={`https://media.api-sports.io/football/players/${v?.player?.id}.png`}
                            alt={v?.player?.name}
                            width={50}
                            height={50}
                            className="rounded-full m-auto"
                          />
                          <h2 className="text-center mt-2 text-xs font-medium">
                            {v?.player?.name}
                          </h2>
                          <div className="flex items-center justify-center w-full mt-2 gap-3">
                            <span className="text-custom-gray">To</span>
                            <Image
                              src={v?.transfer?.teams?.in?.logo}
                              alt={v?.transfer?.teams?.in?.name}
                              width={20}
                              height={20}
                            />
                            <h3>{v?.transfer?.teams?.in?.name}</h3>
                          </div>
                          <div className="flex gap-4 w-full justify-center mt-2">
                            <h3> {v?.transfer?.type}</h3>
                            <h3> {v?.transfer?.date}</h3>
                          </div>
                        </div>
                        {transferOut?.length > i + 1 && (
                          <hr className="dark:border-custom-gray3" />
                        )}
                      </Fragment>
                    );
                  })
                ) : (
                  <h1 className="py-6 text-sm">{t("noTransfer")}</h1>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
