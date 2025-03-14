import TeamSquad from "@/components/teams/teamSquad";

export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: number; name: string };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <TeamSquad locale={locale} id={id} name={name}/>
    </div>
  );
}
