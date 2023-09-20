"use client";
import { SessionProvider } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import ThemeRegistry from "../lib/Theme/themeRegistry";
import NavBar from "../Components/NavBar/Navbar";
import type { Session } from "next-auth";
export default function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;
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
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }} mode={mode}>
          <SessionProvider session={session}>
            <NavBar setMode={setMode} mode={mode} />
            {children}
          </SessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
