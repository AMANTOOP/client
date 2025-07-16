"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  TicketPlus,
  X as XIcon,
  CircleUserRound,
} from "lucide-react";

import AuthContext from "@/context/authContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 text-white">
      {/* Logo */}
      <Link href="/" className="max-md:flex-1">
        <Image src="/logo.svg" alt="iodify" width={100} height={30} className="h-auto" />
      </Link>

      {/* Mobile Menu */}
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link href="/playlists" onClick={() => setIsOpen(false)}>
          Playlists
        </Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
        {!isLoggedIn ? (
          <>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white"
          >
            Logout
          </button>
        )}
      </div>

      {/* Right-side Icons + Auth */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        {pathname !== "/search" && (
          <Link href="/search">
            <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
          </Link>
        )}

        {/* User Auth */}
        {!isLoggedIn ? (
          <Link
            href="/login"
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary/70 transition rounded-full font-medium"
          >
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <CircleUserRound className="w-6 h-6" />
            <span>{user?.name?.split(" ")[0] || "Guest"}</span>
            <button
              onClick={handleLogout}
              className="hidden md:inline-block bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Hamburger Menu */}
      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
  );
}
