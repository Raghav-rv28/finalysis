"use client"
import React from "react";
import ThemeRegistry from "./themeRegistry";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
export default function RootLayout(props: { session:Session, children: React.ReactNode; }) {
  const { session, children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
        <SessionProvider session={session}>
          {children}
          </SessionProvider>
          </ThemeRegistry>
      </body>
    </html>
  );
}