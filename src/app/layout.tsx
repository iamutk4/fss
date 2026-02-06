import type { Metadata } from "next";
import { Bubblegum_Sans, Pacifico } from "next/font/google";
import "./globals.css";

const bubblegum = Bubblegum_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bubblegum",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Will You Be My Valentine?",
  description: "A special question just for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bubblegum.variable} ${pacifico.variable}`}>
        {children}
      </body>
    </html>
  );
}
