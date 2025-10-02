import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Access your AllTier account by logging in securely.",
};

export default function LoginPage() { 
  return <LoginClient />
}
