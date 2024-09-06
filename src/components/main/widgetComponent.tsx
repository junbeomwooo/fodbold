import Script from "next/script";

const WidgetComponent = () => {
  return (
    <>
      <div
        id="wg-api-football-standings"
        data-host="v3.football.api-sports.io"
        data-key={process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}
        data-league="39"
        data-team=""
        data-season="2021"
        data-theme=""
        data-show-errors="false"
        data-show-logos="true"
        className="wg_loader"
      ></div>
      <Script
        src="https://widgets.api-sports.io/2.0.3/widgets.js"
        type="module"
        strategy="lazyOnload" 
      />
    </>
  );
};

export default WidgetComponent;
