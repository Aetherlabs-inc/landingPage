"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Hero = () => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };

    // Art images with static positions
    // Using placeholder images - replace with actual artwork images later
    const artImages = [
        {
            src: '/IMG_6262-2.JPG',
            alt: 'Artwork 1',
            delay: 0.3,
            size: 'w-64 h-96 md:h-[35rem] md:w-[48rem]',
            floatDuration: 6,
            position: { top: '25%', left: '18%' } // Top left, slightly to the right
        },
        {
            src: '/IMG_8423-2.JPG',
            alt: 'Artwork 2',
            delay: 0.5,
            size: 'w-64 h-96 md:w-[38rem] md:h-[48rem]',
            floatDuration: 7,
            position: { top: '50%', left: '80%' } // Center right
        },
        {
            src: '/IMG_8591-2.JPG',
            alt: 'Artwork 3',
            delay: 0.7,
            size: 'w-64 h-96 md:h-[28rem] md:w-[38rem]',
            floatDuration: 6.5,
            position: { top: '70%', left: '20%' } // Bottom left, offset from top
        }
    ];

    return (
        <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(42,33,33,0.05) 1px, transparent 0)`,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Animation styles */}
            <style>{`
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .hero-fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .art-shadow {
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
        }
        
        .button-glow {
          box-shadow: 0 4px 20px rgba(188, 128, 16, 0.3), 0 0 40px rgba(188, 128, 16, 0.1);
        }
      `}</style>

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aether-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aether-terracotta/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aether-gold/3 rounded-full blur-3xl" />
            </div>

            {/* Art Images with animations */}
            {artImages.map((art, index) => (
                <div
                    key={index}
                    className="absolute hidden lg:block pointer-events-none z-10"
                    style={{
                        top: art.position.top,
                        left: art.position.left,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        className={`${art.size} relative art-shadow rounded-lg overflow-hidden bg-white border border-gray-200`}
                        style={{
                            animation: `float ${art.floatDuration}s ease-in-out infinite ${art.delay}s, fadeInScale 1s ease-out forwards ${art.delay}s`,
                        }}
                    >
                        <Image
                            src={art.src}
                            alt={art.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 0px, 384px"
                            priority={index < 2}
                            unoptimized={art.src.startsWith('https://placehold.co')}
                        />
                    </div>
                </div>
            ))}

            <div className="relative max-w-5xl mx-auto px-6 py-24 text-center z-20">
                {/* Main Headline */}
                <div
                    className={`hero-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ animationDelay: '0.2s' }}
                >
                    <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl text-aether-dark leading-tight mb-6 font-medium">
                        Your art&apos;s story,
                        <br />
                        <span className="text-aether-gold italic">preserved permanently</span>
                    </h1>
                </div>

                {/* Subheadline */}
                <div
                    className={`hero-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'} mb-12`}
                    style={{ animationDelay: '0.4s' }}
                >
                    <p className="font-cormorant text-2xl md:text-3xl text-aether-dark leading-relaxed max-w-3xl mx-auto mb-4">
                        A digital certificate of authenticity that lives with your art.
                    </p>
                    <p className="font-cormorant text-xl md:text-2xl text-aether-gray leading-relaxed max-w-2xl mx-auto">
                        Not in a drawer. Not in a folder. With the piece itself.
                    </p>
                </div>

                {/* CTA Button */}
                <div
                    className={`hero-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'} mb-16`}
                    style={{ animationDelay: '0.6s' }}
                >
                    <button
                        onClick={handleJoinWaitlist}
                        className="inline-block px-8 py-4 bg-aether-dark text-white font-libre text-lg rounded-lg 
                     hover:bg-aether-gold hover:text-white transition-all duration-300 transform hover:scale-105
                     shadow-lg hover:shadow-xl button-glow"
                    >
                        Join the waitlist
                    </button>
                </div>

                {/* Feature highlights */}
                <div
                    className={`hero-fade-in ${isVisible ? 'opacity-100' : 'opacity-0'} grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto`}
                    style={{ animationDelay: '0.8s' }}
                >
                    <div className="text-center">
                        <div className="font-libre text-3xl text-aether-gold mb-2">NFC</div>
                        <p className="font-cormorant text-lg text-aether-gray">
                            Tap to verify
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="font-libre text-3xl text-aether-gold mb-2">Secure</div>
                        <p className="font-cormorant text-lg text-aether-gray">
                            Cryptographically protected
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="font-libre text-3xl text-aether-gold mb-2">Permanent</div>
                        <p className="font-cormorant text-lg text-aether-gray">
                            Always with the art
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="w-6 h-10 border-2 border-aether-gray rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-aether-gray rounded-full mt-2 animate-bounce" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
