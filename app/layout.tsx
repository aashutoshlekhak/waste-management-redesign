import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waste Management App",
  description: "Assignment app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
