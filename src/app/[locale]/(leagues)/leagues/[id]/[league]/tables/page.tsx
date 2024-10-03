import LeagueTable from "@/components/league/leagueTable";

export default function page({params:{id, league}}: {params:{id:number, league:string}}) {

  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
    <LeagueTable id={id} league={league} />
    </div>
  );
}