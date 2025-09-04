"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { api } from "@/api/apiClient";
import { decodeToken, saveAccessTokenToCookie } from "@/utils/authUtil";
import { useAuth } from "@/components/AuthProvider";
import * as amplitude from '@amplitude/analytics-browser';

export default function LoginPage() { 
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.login({
        username: usernameEmail,
        password: password,
      });

      console.log("Login successful:", response);

      saveAccessTokenToCookie(response.accessToken);
      login(response.accessToken);

      console.log("decoded:", decodeToken(response.accessToken));

      // 🔥 Track successful login event
      amplitude.track("Log In", {
        username_or_email: usernameEmail,
      });

      router.push('/');

    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password. Please try again.");

      // 🔥 Track failed login attempt
      amplitude.track("Login Failed", {
        username_or_email: usernameEmail,
        error: err instanceof Error ? err.message : "Unknown error"
      });
    }
  };

  return (
    // <div className="h-full w-full px-2 lg:px-15 flex flex-row items-center mt-52">
<div className="h-[calc(100vh-6rem)] w-full px-2 lg:px-15 flex flex-row items-center">
      <div className="card-gray-big-padding w-72 mx-auto">
        <p className="text-header2-white">Login</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={usernameEmail}
            onChange={(e) => setUsernameEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex w-full mt-8 justify-center md:justify-end">
            <button className="button-blue" type="submit" onClick={() => {
              amplitude.track("Clicked Login Button", {
                location: "Login Page",
              });
            }}>
              Login
            </button>
          </div>
        </form>

        {error && <p className="text-sub-red mt-4 text-center">{error}</p>}

        <div className="flex flex-row mt-4">
          <p className="text-sub-white">Don't have an account?</p> 
          <Link href={"/SignupPage"} className="text-sub-blue ml-2 hover:brightness-80 cursor-pointer">
            Sign Up Here
          </Link>
        </div>
      </div>
      <img src={"/alltier_logo_black_no_color.webp"} className="w-1/3 -z-10 absolute -left-1/12 -bottom-1/12 mt-auto opacity-20"></img>
            <img src={"/alltier_logo_black_no_color.webp"} className="w-1/3 -z-10 absolute -right-1/12 -bottom-1/12 mt-auto opacity-20 rotate-270"></img>

    </div>
  );
}
