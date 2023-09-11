"use client";
import { Sparklines, SparklinesLine } from "react-sparklines-typescript";
export default function Indexes() {
  return (
    <div>
      {" "}
      <Sparklines data={[5, 10, 5, 20]}>
        <SparklinesLine color="blue" />
      </Sparklines>
    </div>
  );
}
