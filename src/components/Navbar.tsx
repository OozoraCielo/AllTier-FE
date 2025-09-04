"use client";
import { useAuth } from "./AuthProvider"; // Adjust the import path if needed
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { FiMenu, FiX } from "react-icons/fi";

interface NavbarProps {
  color: string;
}

export default function Navbar({ color }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="shadow-md rounded-b-4xl h-14 w-full text-header3-black flex justify-between items-center p-2 md:px-20 z-50 fixed"
      style={{
        backgroundColor: color,
        transition: "background-color 5s ease-in-out",
      }}
    >
      {/* Left Items */}
      <div className="flex items-center">
        <Link href="/" className="hover:brightness-90 transition-opacity">
          <img src={"/alltier_logo.webp"} className="h-10 w-10" alt="AllTier Logo"/>
        </Link>
        <Link href="/" className="hover:text-gray-800 transition-colors ml-2">
          AllTier
        </Link>
      </div>

      {/* Right Items */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="bg-[rgba(255,255,255,0.5)] h-10 w-44 md:w-56  rounded-xl">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-full bg-transparent focus:outline-none"
          />
        </div>
        <Link
          href="/CreateNewTierListPage"
          className="hover:text-gray-800 transition-colors whitespace-nowrap"
        >
          Create Tier List
        </Link>

        {user ? (
          <>
            <Link
              href="/ProfilePage"
              className="hover:text-gray-800 transition-colors"
            >
              <FaUser />
            </Link>
            <button
              onClick={logout}
              className="hover:text-gray-800 transition-colors cursor-pointer"
              title="Logout"
            >
              <IoLogOutOutline size={28} />
            </button>
          </>
        ) : (
          <Link
            href="/LoginPage"
            className="hover:text-gray-800 transition-colors"
          >
            <FaUser />
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mr-1 flex flex-row">
        <div className="bg-[rgba(255,255,255,0.5)] h-10 w-44 md:w-56 rounded-xl mr-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 w-full bg-transparent focus:outline-none"
          />
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer">
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full right-2 mt-2 w-56 rounded-xl shadow-lg p-4 z-20 cursor-pointer"
        style={{
        backgroundColor: color,
        transition: "background-color 5s ease-in-out",
      }}>
          <div className="flex flex-col space-y-4">
            <Link
              href="/CreateNewTierListPage"
              className="hover:text-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Tier List
            </Link>

            {user ? (
              <>
                <Link
                  href="/ProfilePage"
                  className="hover:text-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left hover:text-gray-800 transition-colors  cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/LoginPage"
                className="hover:text-gray-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}