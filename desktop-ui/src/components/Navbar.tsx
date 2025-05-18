"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

import Button from "./Button";

export default function Navbar() {
  // const [isMounted, setIsMounted] = useState(false);

  const { token, setToken } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };
  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) {
  //   return null; // Prevent hydration mismatch
  // }

  return (
    <nav className="bg-red-950 text-white p-6 shadow-md flex justify-between font-light text-xl items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        EDS System
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link href="/dashboard" className="hover:text-primary hover:font-bold transition-all duration-300">
              Dashboard
            </Link>
            <Link href="/new" className="hover:text-primary hover:font-bold transition-all duration-200">
              Add Employee
            </Link>
            <Button onClick={handleLogout} className="hover:border-neutral-500 hover:font-bold transition-all duration-300">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-primary hover:font-bold ">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
