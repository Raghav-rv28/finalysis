import React from "react";
import ThemeRegistry from "../lib/Theme/themeRegistry";
import NavBar from "../Components/NavBar/Navbar";
import type { Session } from "next-auth";
import { NextAuthProvider } from "../lib/NextAuthProvider";
export default function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;

  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }} mode={""}>
          <NextAuthProvider session={session}>
            <NavBar mode={""} />
            {children}
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
