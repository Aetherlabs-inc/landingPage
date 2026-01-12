'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeSwitcher, ThemeSwitcherWithLabel } from '@/components/themeSwitcher';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 16);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };


    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full flex items-center justify-between px-4 py-6 sm:px-6 lg:px-8 transition-all duration-300",
                isScrolled
                    ? "border-b border-border/40 bg-background/60 backdrop-blur-md"
                    : "bg-background/40 backdrop-blur-sm"
            )}
        >
            <div className="flex w-full max-w-7xl mx-auto items-center justify-between relative">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <span
                            aria-label="AetherLabs"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background font-semibold tracking-tight"
                        >
                            Æ
                        </span>
                        <span className="text-lg font-medium tracking-tight text-foreground sm:text-xl"> AetherLabs</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden rounded-2xl p-3 text-muted-foreground hover:text-foreground"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop navigation */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
                    <div className="flex items-center gap-6">
                        <Link 
                            href="#story"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            The Aether Story
                        </Link>
                        <Button
                            onClick={handleJoinWaitlist}
                            variant="ghost"
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Join the Waitlist
                        </Button>
                    </div>
                </nav>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="absolute left-4 right-4 top-full z-50 mt-4 rounded-2xl border border-border/60 bg-background/95 px-6 py-4 shadow-xl backdrop-blur-md md:hidden">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="#story"
                                className="px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                The Aether Story
                            </Link>

                            {/* Add theme toggle for mobile */}
                            <ThemeSwitcherWithLabel />

                            <Button
                                onClick={() => {
                                    handleJoinWaitlist();
                                    setMobileMenuOpen(false);
                                }}
                                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Join the Waitlist
                            </Button>
                        </div>
                    </div>
                )}

                <div className="hidden md:flex items-center gap-4">
                    {/* Theme toggle for desktop */}
                    <ThemeSwitcher />
                </div>
            </div>
        </header>
    );
};

export default Header;
