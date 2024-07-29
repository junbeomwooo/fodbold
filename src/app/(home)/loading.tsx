"use client";

import { RingLoader } from "react-spinners";

export default function Loading() {
  return (
    <div style={{
      width: '100%',
      height: '900px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <RingLoader color="white" size={100} />
    </div>
  );
}