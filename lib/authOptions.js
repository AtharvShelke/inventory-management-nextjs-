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
                        role:existingUser.role
                    };
                    console.log(user);
                    return user;
                } catch (error) {
                    console.log(error)
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    name: token.name,
                    email: token.email,
                    role: token.role, // Include the role in the session
                };
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role; // Include the role in the JWT token
            }
            return token;
        },
    },
    
} 
export { authOptions }