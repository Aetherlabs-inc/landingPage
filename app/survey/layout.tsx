import type { Metadata } from "next";
import Footer from "@/src/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Aether Survey",
    description: "Shape the future of art authentication",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex flex-col">
            <header className="flex justify-between items-center p-4 shadow-md">
                <h1 className="text-xl font-semibold">Aether Survey</h1>
                <Link href="/">
                    <button className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Exit Survey
                    </button>
                </Link>
            </header>
            <main className="flex-grow p-6 bg-gray-50">{children}</main>
            <Footer />
        </div>
    );
}
