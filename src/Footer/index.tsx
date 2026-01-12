import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full py-16 px-6 md:px-12 bg-white border-t border-aether-gray/20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col items-center space-y-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-aether-dark text-white font-libre font-semibold text-xl">
                            Æ
                        </span>
                        <span className="text-xl font-libre font-medium tracking-tight text-aether-dark">AetherLabs</span>
                    </div>

                    {/* Legal links */}
                    <div className="flex flex-wrap items-center justify-center gap-6 font-cormorant text-lg text-aether-gray">
                        <a href="/terms" className="hover:text-aether-dark transition-colors">
                            Terms and Conditions
                        </a>
                        <span className="text-aether-gray">•</span>
                        <a href="/privacy" className="hover:text-aether-dark transition-colors">
                            Privacy and Cookie Policy
                        </a>
                        <span className="text-aether-gray">•</span>
                        <span className="font-libre">AetherLabs, Inc. ©{year}</span>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-6 pt-4">
                        <a
                            href="https://x.com/aetherlabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="AetherLabs on X"
                            className="h-10 w-10 rounded-full border border-aether-gray/30 flex items-center justify-center text-aether-gray hover:text-aether-gold hover:border-aether-gold/50 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4.01s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="https://instagram.com/aetherlabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="AetherLabs on Instagram"
                            className="h-10 w-10 rounded-full border border-aether-gray/30 flex items-center justify-center text-aether-gray hover:text-aether-gold hover:border-aether-gold/50 transition-all"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                                <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
