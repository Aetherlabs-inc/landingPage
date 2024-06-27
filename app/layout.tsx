import type { Metadata } from "next";
import "./globals.css";
import NavBar from '@/src/NavBar';
import Provider from "@/components/provider";


export const metadata: Metadata = {
  title: "ArtAuthentic",
  description: "Bringing Authenticity to Creativity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gtt1ipu.css"></link>
      </head>
      <body  className="flex flex-col">
        {/* <Provider> */}
          <NavBar />
          {children}
        {/* </Provider> */}
      </body>
    </html>
  );
}
