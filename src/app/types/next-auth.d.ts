
import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    expiresAt?: number;
    user: DefaultSession["user"] & {
      id?: string;
      email?: string | null;
      name?: string | null;
      role?: string | null;
    };
  }

  interface User extends DefaultUser {
    token: string;
    expiresAt: number;
    refreshToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    id?: string;
    role?: string;
  }
}