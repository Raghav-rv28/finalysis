"use client";
import React, { useEffect, useState } from "react";
import Home from "./Home/page";
import NavBar from "./Navbar/page";
import ThemeRegistry from "./themeRegistry";
export default function Homepage() {
  const [mode, setMode] = useState<string>();
  useEffect(() => {
    setMode(localStorage.getItem("mode"));
  }, []);
  useEffect(() => {
    if (mode !== undefined) {
      localStorage.setItem("mode", mode);
    }
  }, [mode]);
  return (
    <main>
      <ThemeRegistry options={{ key: "mui" }} mode={mode}>
        <NavBar setMode={setMode} mode={mode} />
        <Home />
      </ThemeRegistry>
    </main>
  );
}
