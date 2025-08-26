"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import AllTierLogo from "../../public/AllTier_Logo.webp"

const colors = [
  "#AE5050",
  "#AE7F50",
  "#AEA450",
  "#64AE50",
  "#50AEAC",
  "#5077AE",
  "#6E50AE",
];

export default function Navbar() {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav
      className="shadow-md rounded-b-4xl text-header3-black flex"
      style={{
        backgroundColor: colors[currentColorIndex],
        transition: "background-color 5s ease-in-out",
      }}
    >
      <div className="p-2 flex items-center sm:ml-20">
        <Link href="/" className="hover:brightness-90 transition-opacity">
          <img src={"/alltier_logo.webp"} className="h-10 w-10"/>
        </Link>
        <Link href="/" className="hover:text-gray-800 transition-colors ml-2">
          AllTier
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-6 ml-auto p-2 sm:mr-20">
        <div className="bg-[rgba(255,255,255,0.5)] h-10 w-56 rounded-xl">
            <input type="text" placeholder="Search..." className="p-2 opacity-100 focus:outline-none"></input>

        </div>
        <Link href="/CreateNewTierListPage" className="hover:text-gray-800 transition-colors">
          Create TierList
        </Link>
        <Link href="/about" className="hover:text-gray-800 transition-colors">
          Username
        </Link>
      </div>
    </nav>
  );
}
