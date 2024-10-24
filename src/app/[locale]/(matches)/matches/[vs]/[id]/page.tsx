import Fixtures from "@/components/fixtures/fixtures";

export default function page({
  params: { locale, vs, id },
}: {
  params: { locale: string; vs: string; id: number };
}) {
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <Fixtures id={id} />
    </div>
  );
}
