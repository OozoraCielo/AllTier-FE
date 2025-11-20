import { Metadata } from "next";
import SignUpClient from "./SignUpClient";

export const metadata: Metadata = {
  title: "Sign Up Page",
  description: "Create your AllTier account and get started today.",
};

export default function SignupPage() {
  return <SignUpClient />
}