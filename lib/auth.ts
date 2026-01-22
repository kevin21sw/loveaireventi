import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const adminEmail = process.env.ADMIN_EMAIL ?? "";
const adminPassword = process.env.ADMIN_PASSWORD ?? "";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!adminEmail || !adminPassword) return null;
        if (
          credentials.email === adminEmail &&
          credentials.password === adminPassword
        ) {
          return { id: "admin", email: adminEmail, name: "Admin" };
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};
