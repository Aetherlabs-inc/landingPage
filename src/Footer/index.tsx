import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {/* Brand + blurb */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Simple logomark placeholder: swap with your SVG */}
                        <div className="inline-flex items-center gap-2">
                            <span
                                aria-label="AetherLabs"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background font-semibold tracking-tight"
                            >
                                Æ
                            </span>
                            <span className="text-xl font-medium tracking-tight text-foreground">AetherLabs</span>
                        </div>

                        <p className="text-muted-foreground max-w-xs">
                            Modern art authentication and management
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#"
                                aria-label="AetherLabs on X (Twitter)"
                                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {/* X / Twitter */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4.01s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="AetherLabs on LinkedIn"
                                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {/* LinkedIn */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="AetherLabs on Instagram"
                                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {/* Instagram */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                                    <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                aria-label="AetherLabs on YouTube"
                                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {/* YouTube */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2c.313-1.732.467-3.482.46-5.33a29.005 29.005 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.75 15.02l5.75-3.27-5.75-3.27v6.54z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>

                        {/* Tech note */}
                        <p className="text-xs text-muted-foreground">
                            Built with AWS Amplify Gen 2 · Next.js · NFC smart-tags
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-lg text-foreground">Product</h4>
                        <ul className="space-y-3">
                            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">NFC Certificates</a></li>
                            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Portfolios</a></li>
                            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Collections</a></li>
                            <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Exhibitions</a></li>
                            <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Updates</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-lg text-foreground">Company</h4>
                        <ul className="space-y-3">
                            <li><a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="font-medium text-lg text-foreground">Resources</h4>
                        <ul className="space-y-3">
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Implementation Guides</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
                            <li><a href="/coming-soon" className="text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
                    <div>© {year} AetherLabs. All rights reserved.</div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="/cookies" className="hover:text-foreground transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
