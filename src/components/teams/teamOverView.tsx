export default function TeamOverView({
  locale,
  id,
  name
}: {
  locale: string;
  id: number;
  name:string
}) {
  return <div>{name}</div>;
}
