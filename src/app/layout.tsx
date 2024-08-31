import type { Metadata } from "next";
import "./globals.css";
import { CLEAR_COLOUR } from "@/resources/colours";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-full h-[800dvh]"
        style={{ backgroundColor: CLEAR_COLOUR }}
      >
        {children}
      </body>
    </html>
  );
}
