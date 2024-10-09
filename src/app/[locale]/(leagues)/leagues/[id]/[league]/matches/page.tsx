import LeagueMatches from "@/components/league/leagueMatches";

export default function page({
  params: { locale, id, league },
}: {
  params: { locale: string; id: number; league: string };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <LeagueMatches locale={locale} id={id} league={league} />
    </div>
  );
}
