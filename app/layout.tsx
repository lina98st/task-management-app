import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Task Management App",
    template: "%s | Task Management App",
  },
  description:
    "A modern task management application for organizing, tracking, and completing daily work.",
  keywords: [
    "task management",
    "productivity",
    "next.js",
    "typescript",
    "dashboard",
  ],
  authors: [
    {
      name: "Alina Schmidt",
    },
  ],
  creator: "Alina Schmidt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] antialiased">
        {children}
      </body>
    </html>
  );
}
