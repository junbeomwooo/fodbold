import PlayerOverview from "@/components/players/playerOverview";

export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: string; name: string };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <PlayerOverview locale={locale} id={id} name={name} />
    </div>
  );
}
