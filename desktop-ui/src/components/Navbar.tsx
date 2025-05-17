"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <nav className="bg-red-950 text-white p-6 shadow-md flex justify-between font-light text-xl items-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        EDS System
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/new" className="hover:text-primary">
              Add Employee
            </Link>
            <Button onClick={handleLogout} className="hover:border-neutral-500">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-primary">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
