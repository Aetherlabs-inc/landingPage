import React from "react";
import type { Metadata } from "next";
import "./../styles/globals.css";
import Provider from "@/components/provider";



export const metadata: Metadata = {
    title: "Aether",
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
            <body className="flex flex-col">
                <Provider>
                    <main className="">
                        {children}
                    </main>
                </Provider>

            </body>

        </html>
    );
}
