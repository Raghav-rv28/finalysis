import React, { Suspense } from "react";
import Home from "../Components/HomePage/Home";
import Loading from "./loading";

export default function Homepage() {
  return (
    <main style={{ height: "100%" }}>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    </main>
  );
}
