import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FTL iMeeting - Booking Room",
  description: "Meeting Room Booking System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="h-full bg-[#f0f2f4] text-slate-900 font-sans">
        <Navbar />
        <Sidebar />
        <div className="p-6 sm:ml-16 pt-28 h-full overflow-y-auto">
          <main className="max-w-7xl mx-auto h-full rounded-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </main>
        </div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
