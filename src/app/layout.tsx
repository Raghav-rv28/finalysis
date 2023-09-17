import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
export default function RootLayout(props: {
  session: Session;
  children: React.ReactNode;
}) {
  const { session, children } = props;
  // const mode = localStorage.getItem("mode");

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
