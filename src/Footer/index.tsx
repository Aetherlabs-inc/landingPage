import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full py-12 px-6 md:px-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex flex-col items-center space-y-8">
                    {/* Logo placeholder */}
                    <div className="text-4xl font-medium">
                        Æ
                    </div>

                    {/* Legal links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <a href="/terms" className="hover:text-foreground transition-colors">
                            Terms and Conditions
                        </a>
                        <span>•</span>
                        <a href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy and Cookie Policy
                        </a>
                        <span>•</span>
                        <span>AetherLabs, Inc. ©{year}</span>
                    </div>

                    {/* Social links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://x.com/aetherlabs"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="AetherLabs on X"
                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
                            className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
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
