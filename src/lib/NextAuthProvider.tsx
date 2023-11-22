"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session: Session;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider
      basePath={process.env.NEXTAUTH_URL}
      baseUrl={process.env.NEXTAUTH_URL}
      session={session}
    >
      {children}
    </SessionProvider>
  );
};
