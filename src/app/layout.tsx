import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "This is a weather app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-3`}>{children}</body>
    </html>
  );
}
