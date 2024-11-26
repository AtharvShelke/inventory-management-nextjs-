import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@auth/prisma-adapter';


import db from "./db";
import { compare } from "bcrypt";
const authOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                email:{ label:"Email", type:"email" },
                password:{ label:"Password", type:"password" }
            },
            async authorize(credentials){
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("No Inputs")
                        return null;
                    }
                    const existingUser = await db.user.findUnique({
                        where:{email:credentials.email},
                    })
                    if (!existingUser) {
                        console.log("User not found")
                        return;
                    }
                    const passwordMatch = await compare(
                        credentials.password,
                        existingUser.password
                    );
                    if (!passwordMatch) {
                        console.log('Password Incorrect');
                        return null;

                    }
                    const user = {
                        id: existingUser.id,
                        name:existingUser.name,
                        email:existingUser.email,
                    };
                    console.log(user);
                    return user;
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks:{
        async session ({session, user, token}){
            return session;
        },
        async jwt({token, user, account, profile, isNewUser}){
            return token;
        }
    }
} 
export { authOptions }