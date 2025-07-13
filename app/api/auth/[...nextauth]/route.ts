import NextAuth, { Account, User as TUser } from "next-auth";
import User from "@/app/api/models/user.model";
import { connectDB } from "../../db/connectDB";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'credentials',
      credentials: {
        email: {label: "Email", type: "email"},
        password:{label: "Password", type: "password"}
      },
      async authorize(credentials) {
        try{
          await connectDB();
          const user = await User.findOne({email: credentials?.email});
          if(!user) {
            throw new Error("");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "", user.password as string
          );
          if(!isValidPassword) {
            throw new Error("");
          }
          return user;
        }
        catch{
          return null
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    })
  ],
  callbacks: {
    async jwt({token, user, account} : {
      token: JWT,
      account?: Account | null,
      user: TUser
    }) {
      if(account?.provider === 'credentials' && user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      if(account?.provider === 'google' && user) {
        await connectDB();
        let userData = await User.findOne({email: user.email});

        if (!userData) {
        userData = await User.create({
          email: user.email,
          name: user.name,
          role: 'user', // default role
          provider: 'google'
        });
      }

        token.id = userData._id.toString();
        token.email = userData.email;
        token.role = userData.role;
        token.name = userData.name;
      }
      return token;
    },
    async session({session, token}) {
      if(token) {
        session.user = {
          email: token.email,
          name: token.name,
          image: token.picture,
          role: token.role,
        };
      };
      return session;
    }
  },
  pages: {
    signIn: "/sign-in",
  },
});
export {handler as GET, handler as POST}