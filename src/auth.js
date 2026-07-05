import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) throw new Error("User not found");

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) throw new Error("Wrong credentials");

          return user;
        } catch (err) {
          throw new Error(err.message || "Authorization error");
        }
      },
    }),
  ],
  pages:{
    error:"/dashboard/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});