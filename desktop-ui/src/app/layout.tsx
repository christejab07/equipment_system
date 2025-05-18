import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Equipment management system",
  description: "Equipment management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <AuthProvider>
          <Navbar />
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
