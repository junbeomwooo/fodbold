import momentLib from "moment-timezone";

export default function moment(timezone:any) {
  const now = momentLib();
  const setTimezone = now.tz(timezone).format("YYYY-MM-DD");
  return setTimezone;
}
