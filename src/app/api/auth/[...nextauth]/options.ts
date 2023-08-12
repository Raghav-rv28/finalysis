import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth";


const options:NextAuthOptions ={
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                userName:{
                    label: "Name:",
                    type: "text", 
                    placeholder: "Enter Name",
                },
                password: {
                    label: "password",
                    type: "text",
                    placeholder: "",
                }
            },
            async authorize(credentials) {
                //get data from database.
                const user = {id:"0",userName: "Raj", password: "nextAuth"};
                if(credentials?.userName === user.userName && credentials.password === user.password){
                    return user
                }
                return null
            }
        }),
    ],
};
export default options;