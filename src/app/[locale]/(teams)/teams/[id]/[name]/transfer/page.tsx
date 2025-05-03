import TeamTransfer from "@/components/teams/teamTransfer";

export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: number; name: string };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <TeamTransfer locale={locale} id={id} name={name}/>
    </div>
  );
}
