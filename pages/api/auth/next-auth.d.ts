// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "PUBLISHER";
      name?: string | null;
      email?: string | null;
    };
  }

  interface User {
    id: string;
    role: "ADMIN" | "PUBLISHER";
    // password only used internally during authorize, not exposed
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "ADMIN" | "PUBLISHER";
  }
}
