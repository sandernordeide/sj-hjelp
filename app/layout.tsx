import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sjøhjelp - Boat Rescue Service",
  description: "Emergency boat rescue service for Høyanger, Vestland, Norway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>
        {children}
      </body>
    </html>
  );
}
