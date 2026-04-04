import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Study Helper",
  description: "A small AI-enabled PDF question answering app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}