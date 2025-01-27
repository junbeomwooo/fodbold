export default function page({
  params: { locale, id, name },
}: {
  params: { locale: string; id: string; name: string };
}) {

  console.log(locale);
  console.log(id);
  console.log(name);
  return (
    <div className="px-14 max-msm:px-4 pt-28 ">
      <h1>{name}</h1>
    </div>
  );
}
