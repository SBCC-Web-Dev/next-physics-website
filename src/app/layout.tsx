import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SBCC - Physics - Home",
  description: "The homepage for Santa Barbara City College Physics Department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
