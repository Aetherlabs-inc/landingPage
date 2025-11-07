'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ThemeSwitcher, ThemeSwitcherWithLabel } from '@/components/themeSwitcher';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();
    const [activePage, setActivePage] = useState('features');
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

    const handleNavClick = (page: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        setActivePage(page);
        const element = document.getElementById(page);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };


    return (
        <div className="sticky top-0 z-50 flex w-full justify-center px-4 pt-4 sm:px-6 lg:px-8">
            <header
                className={cn(
                    "relative flex w-full max-w-7xl items-center justify-between rounded-[45px] px-4 py-4 sm:px-6 lg:px-8 transition-all duration-300",
                    isScrolled
                        ? "border border-border/60 bg-background/80 shadow-lg backdrop-blur-lg"
                        : "bg-background/40"
                )}
            >
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
                    <div className="rounded-full border border-border/60 bg-background/80 px-1 py-1 shadow-lg backdrop-blur-md">
                        <ToggleGroup type="single" value={activePage} onValueChange={(value) => value && setActivePage(value)}>
                            <ToggleGroupItem
                                value="features"
                                className={cn(
                                    "px-4 py-2 rounded-full transition-colors relative",
                                    activePage === 'features' ? 'text-accent-foreground bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                                onClick={handleNavClick('features')}
                            >
                                Features
                            </ToggleGroupItem>
                            <ToggleGroupItem
                                value="pricing"
                                className={cn(
                                    "px-4 py-2 rounded-full transition-colors relative",
                                    activePage === 'pricing' ? 'text-accent-foreground bg-accent' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                                onClick={handleNavClick('pricing')}
                            >
                                Pricing
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                </nav>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="absolute left-4 right-4 top-full z-50 mt-4 rounded-2xl border border-border/60 bg-background/95 px-6 py-4 shadow-xl backdrop-blur-md md:hidden">
                        <div className="flex flex-col gap-4">
                            <a
                                href="#features"
                                className={`px-3 py-2 text-sm rounded-md transition-colors ${activePage === 'features' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                                onClick={handleNavClick('features')}
                            >
                                Features
                            </a>
                            <a
                                href="#pricing"
                                className={`px-3 py-2 text-sm rounded-md transition-colors ${activePage === 'pricing' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                                onClick={handleNavClick('pricing')}
                            >
                                Pricing
                            </a>
                            <a
                                href="#"
                                className="px-3 py-2 text-sm rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                FAQ
                            </a>

                            {/* Add theme toggle for mobile */}
                            <ThemeSwitcherWithLabel />

                            <Button
                                onClick={() => {
                                    handleJoinWaitlist();
                                    setMobileMenuOpen(false);
                                }}
                                className="h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Join Waitlist
                            </Button>
                        </div>
                    </div>
                )}

                <div className="hidden md:flex items-center gap-4">
                    {/* Theme toggle for desktop */}
                    <ThemeSwitcher />
                    <div className="rounded-2xl">
                        <Button
                            onClick={handleJoinWaitlist}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl"
                        >
                            Join Waitlist
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
