"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/api/apiClient"

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const newUser = await api.signup({
        username,
        email,
        password,
        confirmPassword,
      });

      console.log("Signup successful:", newUser);
      setSuccess(`Account for ${newUser.username} created! You can now log in.`);
      
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (err) {
      console.error("Signup failed:", err);
      setError("Failed to create account. The username or email might already be taken.");
    }
  };

  return (
    <div className="h-full w-full px-1 lg:px-15 flex flex-row items-center mt-20">
      <div className="card-gray-big-padding w-72 mx-auto">
        <p className="text-header2-white">Sign up</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2 focus:outline-none text-normal-black h-10 w-full bg-white rounded-xl mt-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <div className="flex w-full mt-8 justify-center md:justify-end">
            <button type="submit" className="button-blue">
              Sign up
            </button>
          </div>
        </form>

        {error && <p className="text-sub-red mt-4 text-center">{error}</p>}
        {success && <p className="text-sub-green text-sm mt-4 text-center">{success}</p>}

        <div className="flex flex-row mt-4">
          <p className="text-sub-white">Already have an account?</p>
          <Link href={"/LoginPage"} className="text-sub-blue ml-2 hover:brightness-80 cursor-pointer">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}