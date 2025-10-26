import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios");
        }

        const res = await fetch(`${apiUrl}/auth/signIn`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!res.ok) {
          throw new Error("Falha na autenticação");
        }

        const data = await res.json();

        if (!data.access_token || !data.expiresIn) {
          throw new Error("Token ou tempo de expiração não fornecidos");
        }

        // ✅ define o tempo correto baseado no expiresIn retornado pela API
        const expiresAt = Date.now() + data.expiresIn * 1000;

        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
          token: data.access_token,
          expiresAt,
          refreshToken: data.refresh_token,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {

      // 🔹 Quando o usuário faz login
      if (user) {
        console.log("Novo login:", user);
        token.accessToken = user.token;
        token.expiresAt = user.expiresAt;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        return token;
      }

      // 🔹 Se ainda não expirou, mantém o token atual
      if (token.expiresAt && Date.now() < token.expiresAt) {
        return token;
      }
      
      try {
        const res = await fetch(`${apiUrl}/auth/refreshToken`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refreshToken: token.refreshToken,
          }),
        });

        if (!res.ok) throw new Error("Failed to refresh token");

        const data = await res.json();

        if (data?.access_token && data?.expiresIn) {
          // ✅ Atualiza o access token e o refresh token (se vier um novo)
          token.accessToken = data.access_token;
          token.expiresAt = Date.now() + data.expiresIn * 1000;
          token.refreshToken = data.refresh_token ?? token.refreshToken;
        } else {
          throw new Error("Token ou tempo de expiração não fornecidos");
        }
      } catch (error) {
        console.error("Erro ao atualizar token:", error);
        delete token.accessToken;
        delete token.expiresAt;
        delete token.refreshToken;
      }

      return token;
    },

    async session({ session, token }) {
      if (!token.accessToken) return session;

      session.accessToken = token.accessToken;
      session.expiresAt = token.expiresAt;
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as string,
      };

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
