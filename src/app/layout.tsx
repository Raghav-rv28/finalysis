import React from "react";
import ThemeRegistry from "../lib/Theme/themeRegistry";
import NavBar from "../Components/NavBar/Navbar";
import type { Session } from "next-auth";
import { NextAuthProvider } from "../lib/NextAuthProvider";
import { useStore } from "../lib/store";
export default function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;

  useStore.setState({ mode: "light" });

  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }} mode={useStore.getState().mode}>
          <NextAuthProvider session={session}>
            <NavBar />
            {children}
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
