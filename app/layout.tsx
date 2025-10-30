import "./fonts.css"; // <-- Imports our 'Inter' font
import "./globals.css"; // <-- Imports Tailwind CSS
import type { Metadata } from "next";

export const metadata: Metadata = {
  // You can update this later
  title: "Booklt - Find Your Next Experience",
  description: "Book travel experiences and slots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        We've removed the conflicting className from the body.
        Now our globals.css file can apply its styles.
      */}
      <body>{children}</body>
    </html>
  );
}
