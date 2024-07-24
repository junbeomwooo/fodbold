import FotMob from "fotmob";
const fotmob = new FotMob();

export default function page() {
  const getData = async () => {
    let worldNews = await fotmob.getWorldNews();
    let transfers = await fotmob.getTransfers();
    let AllLeagues = await fotmob.getAllLeagues();

    // console.log(worldNews);
    // console.log(transfers);
    const league = AllLeagues;
    console.log(league);
  };

  getData();
  return (
<h1>hi</h1>
  );
}
