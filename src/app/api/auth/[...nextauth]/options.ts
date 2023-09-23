import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log(
  `Testing: ${process.env.NEXTAUTH_SECRET} ${
    process.env.NEXT_PUBLIC_SECRET as string
  }`
);
const options: NextAuthOptions = {
  secret:
    (process.env.NEXTAUTH_SECRET as string) ||
    (process.env.NEXT_PUBLIC_SECRET as string),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
};
export default options;
