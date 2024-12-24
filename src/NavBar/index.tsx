'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from "react";
import { Menu, Minimize } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/themeSwitcher";
import path from "path";

type Props = {};

const Navbar = (props: Props) => {
    const [nav, setNav] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // State for handling active dropdown
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null); // Reference for the dropdown menu

    // Toggle Navbar (Mobile)
    const handleNavClick = () => setNav(!nav);

    // Toggle Dropdowns for mobile
    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    // Close the menu when navigating
    const handleSubmenuClick = () => {
        setActiveDropdown(null);
        setNav(false); // Close the menu
    };

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Add this useEffect to disable scrolling when nav is true
    useEffect(() => {
        if (nav) {
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Enable scrolling
            document.body.style.overflow = '';
        }
    }, [nav]);

    const navLinks = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "About",
            path: "/",
        },
        {
            name: "Contact",
            path: "/",
        },
        {
            name: "demo",
            path: "/demo",
        },
        {
            name: "More",
            path: "",
            items: [
                { name: "survey", path: "/survey" },
            ],
        }
    ];

    return (
        <div ref={dropdownRef}>
            <nav className={`mx-auto fixed top-0 w-full z-50 transition-colors duration-300 min-h-[80px] text-lg bg-background`}>
                <div className="max-w-[2000px] flex flex-wrap items-center justify-between mx-auto p-4">
                    {/* Logo */}
                    <div>
                        <Link href="/" className="font-bold text-2xl">
                            Aether
                        </Link>
                    </div>

                    {/* Hamburger Icon for Mobile Menu */}
                    <button
                        onClick={handleNavClick}
                        className="z-50 inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg md:hidden"
                        aria-controls="navbar" aria-expanded={nav ? "true" : "false"}
                    >
                        {nav ? <Minimize size={24} /> : <Menu size={24} />}
                        <span className="sr-only">Open main menu</span>
                    </button>

                    {/* Desktop Menu */}
                    <div className={`hidden w-full md:block md:w-auto`} id="navbar">
                        <div className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 justify-center items-center">
                            {navLinks.map((link, index) => (
                                <div key={index} className="py-5 group relative">
                                    <Link href={link.path || "#"}
                                        className="block py-2 px-3 rounded md:p-0 text-center "
                                        onClick={link.items ? () => toggleDropdown(link.name) : handleSubmenuClick}
                                    >
                                        {link.name}
                                    </Link>
                                    {/* Dropdown for desktop */}
                                    {link.items && activeDropdown === link.name && (
                                        <div className="absolute flex flex-col bg-white dark:bg-neutral-900 mt-2 shadow-lg rounded-lg self-center">
                                            {link.items.map((subItem, subIndex) => (
                                                <Link href={subItem.path} key={subIndex} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md" onClick={handleSubmenuClick}>
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Theme Switcher & Get Started Button for Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* <ThemeSwitcher /> */}
                        <Link href="/">
                            <Button className="py-2 px-4">Get Started</Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {nav && (
                    <div className="block md:hidden fixed top-0 left-0 w-full h-screen bg-inherit z-40 ">
                        <ul className="flex flex-col pt-32 items-center h-full">
                            {navLinks.map((link, index) => (
                                <li key={index} className="py-5 w-full text-center relative">
                                    <button
                                        className="text-2xl flex items-center justify-between w-full px-5 text-center"
                                        onClick={link.items ? () => toggleDropdown(link.name) : handleNavClick}
                                    >
                                        {link.name}
                                        {link.items && (
                                            <svg className={`w-5 h-5 ml-2 transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        )}
                                    </button>
                                    {/* Mobile dropdown */}
                                    {link.items && activeDropdown === link.name && (
                                        <div className="absolute flex flex-col dark:bg-neutral-900 mt-2 shadow-lg rounded-lg self-center w-full z-50 bg-white ">
                                            {link.items.map((subItem, subIndex) => (
                                                <Link href={subItem.path} key={subIndex} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md" onClick={handleSubmenuClick}>
                                                    {subItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="fixed bottom-4 right-4 md:hidden">
                            <ThemeSwitcher />
                            <Link href="/">
                                <Button className="py-2 px-4 mt-2">Get Started</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
