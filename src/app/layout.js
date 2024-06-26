"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/utilities/Sidebar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

 const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
const pathname = usePathname();
console.log(pathname);
  return (
    <html lang="en">
      <body className={inter.className}>
        {pathname=="/login"?children:<Sidebar>{children}</Sidebar>}
        </body>
    </html>
  );
}
