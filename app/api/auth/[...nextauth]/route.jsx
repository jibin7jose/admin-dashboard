import NextAuth from 'next-auth';
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import bcrypt from "bcrypt";

const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'name@solidserve.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                // check to see if email and password is there
                if (!credentials.email || !credentials.password) {
                    throw new Error('Missing credentials. Please enter an email and password.');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // if no user was found
                if (!user || !user.hashedPassword) {
                    throw new Error('No user found');
                }

                // check to see if the password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

                if (!passwordMatch) {
                    throw new Error('Invalid password');
                }
                return user;
            }
        }),
    ],
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    },
    debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
