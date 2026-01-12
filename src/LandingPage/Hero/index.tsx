"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const router = useRouter();
    const [visibleLines, setVisibleLines] = useState<number[]>([]);

    useEffect(() => {
        // Stagger the appearance of each line
        const delays = [200, 600, 1000, 1400, 1800];
        delays.forEach((delay, index) => {
            setTimeout(() => {
                setVisibleLines(prev => [...prev, index]);
            }, delay);
        });
    }, []);

    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };

    const isVisible = (index: number) => visibleLines.includes(index);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(42,33,33,0.03) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Soft gradient accents */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-aether-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-aether-terracotta/3 rounded-full blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">

                {/* Line 1 */}
                <p
                    className={`font-cormorant text-3xl md:text-4xl lg:text-5xl text-aether-dark leading-relaxed mb-6
                               transition-all duration-700 ease-out
                               ${isVisible(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    Every piece of art carries a story.
                </p>

                {/* Line 2 */}
                <p
                    className={`font-cormorant text-xl md:text-2xl text-aether-gray leading-relaxed mb-8
                               transition-all duration-700 ease-out
                               ${isVisible(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    Who made it. Who owned it. Where it has been.
                </p>

                {/* Line 3 - with provenance tooltip */}
                <p
                    className={`font-cormorant text-xl md:text-2xl text-aether-dark leading-relaxed mb-8
                               transition-all duration-700 ease-out
                               ${isVisible(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    This is called{' '}
                    <span className="relative inline-block group">
                        <span className="text-aether-gold font-medium border-b border-dotted border-aether-gold cursor-help">
                            provenance
                        </span>
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3
                                        bg-aether-dark text-white text-base rounded-lg shadow-xl
                                        min-w-[280px] text-center z-50 font-cormorant leading-relaxed
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                        pointer-events-none">
                            The documented history of an artwork - who created it, who owned it, and how it changed hands over time.
                            <span className="absolute top-full left-1/2 -translate-x-1/2 
                                           border-8 border-transparent border-t-aether-dark" />
                        </span>
                    </span>
                    {' '}- the chain of ownership that follows a piece through time.
                </p>

                {/* Line 4 */}
                <p
                    className={`font-playfair text-2xl md:text-3xl text-aether-dark leading-relaxed mb-12 font-medium
                               transition-all duration-700 ease-out
                               ${isVisible(3) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    We built AetherLabs to protect it.
                </p>

                {/* CTA Button */}
                <div
                    className={`transition-all duration-700 ease-out
                               ${isVisible(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                >
                    <button
                        onClick={handleJoinWaitlist}
                        className="inline-block px-8 py-4 bg-aether-dark text-white font-libre text-lg
                                 rounded-lg hover:bg-aether-gold transition-colors duration-300
                                 shadow-lg hover:shadow-xl"
                    >
                        Join the waitlist
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                           transition-all duration-700 ease-out delay-500
                           ${isVisible(4) ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="font-libre text-sm text-aether-gray tracking-wide">Scroll</span>
                    <div className="w-6 h-10 border-2 border-aether-gray/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-aether-gray/50 rounded-full mt-2 animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;