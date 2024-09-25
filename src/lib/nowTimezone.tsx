import momentLib from "moment-timezone";

export default function moment(timezone:any) {

  // 타임존이 들어오지 않았을 경우
  if (!timezone) {
    console.error("Invalid timezone provided");
    return ''; 
  }

  const now = momentLib();
  const setTimezone = now.tz(timezone).format("YYYY-MM-DD") || '';
  return setTimezone;
}