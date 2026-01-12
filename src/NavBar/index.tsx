'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
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
                    ? "border-b border-aether-gray/30 bg-white/95 backdrop-blur-md"
                    : "bg-white/90 backdrop-blur-sm"
            )}
        >
            <div className="flex w-full max-w-7xl mx-auto items-center justify-between relative">
                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center gap-3">
                        <span
                            aria-label="AetherLabs"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-aether-dark text-white font-libre font-semibold tracking-tight"
                        >
                            Æ
                        </span>
                        <span className="text-lg font-libre font-medium tracking-tight text-aether-dark sm:text-xl">AetherLabs</span>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden rounded-lg p-2 text-aether-gray hover:text-aether-dark transition-colors"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop navigation */}
                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
                    <div className="flex items-center gap-8">
                        <Link 
                            href="#features"
                            className="font-cormorant text-lg text-aether-gray hover:text-aether-dark transition-colors"
                        >
                            Features
                        </Link>
                        <Link 
                            href="#pricing"
                            className="font-cormorant text-lg text-aether-gray hover:text-aether-dark transition-colors"
                        >
                            Pricing
                        </Link>
                        <Button
                            onClick={handleJoinWaitlist}
                            className="font-libre text-sm bg-aether-dark text-white hover:bg-aether-gold transition-colors px-6 py-2 rounded-lg"
                        >
                            Join the Waitlist
                        </Button>
                    </div>
                </nav>

                {/* Mobile navigation */}
                {mobileMenuOpen && (
                    <div className="absolute left-4 right-4 top-full z-50 mt-4 rounded-xl border border-aether-gray/30 bg-white px-6 py-4 shadow-xl backdrop-blur-md md:hidden">
                        <div className="flex flex-col gap-4">
                            <Link
                                href="#features"
                                className="px-3 py-2 text-sm font-cormorant rounded-md transition-colors text-aether-gray hover:text-aether-dark hover:bg-aether-gold/10"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                className="px-3 py-2 text-sm font-cormorant rounded-md transition-colors text-aether-gray hover:text-aether-dark hover:bg-aether-gold/10"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Button
                                onClick={() => {
                                    handleJoinWaitlist();
                                    setMobileMenuOpen(false);
                                }}
                                className="h-11 rounded-lg bg-aether-dark text-white hover:bg-aether-gold font-libre mt-2"
                            >
                                Join the Waitlist
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
