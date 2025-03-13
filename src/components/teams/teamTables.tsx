"use client";

import TeamHeader from "./header/teamHeader";

import { useAppSelector } from "@/lib/storeHooks";
import { useTranslations } from "next-intl";

export default function TeamTables({
  locale,
  id,
  name,
}: {
  locale: string;
  id: number;
  name: string;
}) {
  const { fixture }: any = useAppSelector((state) => state.fixtureSlice);
  const { leagues, standing }: { leagues: any; standing: any } = useAppSelector(
    (state) => state.leagueSlice
  );

  const t = useTranslations("team");

  console.group("fixture");
  console.log(fixture);
  console.groupEnd();
  console.group("leagues");
  console.log(leagues);
  console.groupEnd();
  console.group("standing");
  console.log(standing);
  console.groupEnd();
  

  return (
    <div className="full">
      <TeamHeader
        fixture={fixture}
        leagues={leagues}
        locale={locale}
        id={id}
        name={name}
        t={t}
      />
      <h1>{locale}</h1>
      <h1>{id}</h1>
      <h1>{name}</h1>
    </div>
  );
}
