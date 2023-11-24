import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import CognitoProvider from "next-auth/providers/cognito";
import Token from "../../../../types/next-auth";
import { NextAuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { btoa } from "buffer";

const options: NextAuthOptions = {
  secret:
    (process.env.NEXTAUTH_SECRET as string) ||
    (process.env.NEXT_PUBLIC_SECRET as string),
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      issuer: process.env.COGNITO_ISSUER,
      authorization: {
        params: {
          redirect_uri: `${process.env.NEXTAUTH_URL}api/auth/callback/cognito`,
        },
      },
      token: {
        url: "https://finalysis-test.auth.us-east-2.amazoncognito.com/oauth2/token",
        params: {
          Authorization: `Basic ${btoa(
            `${process.env.COGNITO_CLIENT_ID}:${process.env.COGNITO_CLIENT_SECRET}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
          grant_type: " refresh_token ",
          client_id: process.env.COGNITO_CLIENT_ID as string,
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      return token;
    },
    async session({ session, user, token }) {
      return { token, ...session };
    },
  },
};
export default options;
