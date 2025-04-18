import TeamTables from "@/components/teams/teamTables";

export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: number; name: string };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <TeamTables locale={locale} id={id} name={name}/>
    </div>
  );
}
