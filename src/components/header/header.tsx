import Link from "next/link";

export default function Header() {

  return (
    <>
      <div className="h-24 flex flex-row items-center justify-between hover:no-underline mx-24">
        <Link className="font-extrabold text-xl text-emerald-400 hover:no-underline" href="/">FOTBOLD</Link>
        <div>
          <Link className="ml-10 transition ease-in-out duration-300  hover:text-emerald-500 font-medium hover:no-underline" href="/">Matchs</Link>
          <Link className="ml-10 transition ease-in-out duration-300  hover:text-emerald-500 font-medium hover:no-underline" href="/">News</Link>
          <Link className="ml-10 transition ease-in-out duration-300 hover:text-emerald-500 font-medium hover:no-underline" href="/">Transfers</Link>
        </div>
      </div>
      <hr className="border-zinc-900 border-2 w-full" />
    </>
  );
}
