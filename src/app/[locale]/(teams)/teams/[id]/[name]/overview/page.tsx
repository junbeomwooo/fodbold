import TeamOverView from "@/components/teams/teamOverView";

export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: number; name: string };
}) {

  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <TeamOverView locale={locale} id={id} name={name}/>
    </div>
  );
}
