import React from "react";
import ThemeRegistry from "../lib/Theme/themeRegistry";
import NavBar from "../Components/NavBar/Navbar";
import { getServerSession, type Session } from "next-auth";
import { getItem } from "../lib/functions/database";
import { NextAuthProvider } from "../lib/NextAuthProvider";
import options from "./api/auth/[...nextauth]/options";
export default async function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;
  const nextAuthSession = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
    configuration: {
      mode: string;
    };
  } | null = null;
  // let globalSectorData: any;
  // let globalCryptoData: any;
  if (nextAuthSession) {
    console.log(nextAuthSession);
    userData = await getItem(
      "USER",
      `USER-PROFILE-${nextAuthSession.user.email}`
    );
  }
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }} mode={""}>
          <NextAuthProvider session={session}>
            <NavBar mode={userData.configuration.mode} />
            {children}
          </NextAuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
