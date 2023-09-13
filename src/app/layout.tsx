"use client";
import React, { useEffect, useState } from "react";
import ThemeRegistry from "./themeRegistry";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import NavBar from "./Navbar/page";
export default function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;
  // const mode = localStorage.getItem("mode");
  const [mode, setMode] = useState<string>();

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
