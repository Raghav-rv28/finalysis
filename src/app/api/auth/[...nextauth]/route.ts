import NextAuth from "next-auth";
import options from "./options";
console.log(process.env.COGNITO_CLIENT_ID);
const handler = NextAuth(options);

export { handler as GET, handler as POST };
