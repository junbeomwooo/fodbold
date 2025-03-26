import LeagueKnockOut from "@/components/league/leagueKnockOut";

export default function page({
  params: { locale, id, league },
}: {
  params: {
    locale: string;
    id: number;
    league: string;
  };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <LeagueKnockOut locale={locale} id={id} league={league} />
    </div>
  );
}
