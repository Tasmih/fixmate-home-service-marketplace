import "better-auth";

declare module "better-auth" {
  interface User {
    role: "admin" | "provider" | "customer";
    phone?: string;
    avatar?: string;
  }
  
  interface Session {
    user: User;
  }
}