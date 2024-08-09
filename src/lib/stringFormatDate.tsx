import React from "react";
import momentLib from "moment-timezone";

export default function stringFormatDate(date:string) {
const formattedDate = momentLib(date).format('dddd D MMMM');
  return formattedDate
}