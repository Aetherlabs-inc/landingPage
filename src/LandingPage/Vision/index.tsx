"use client";

import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image'
import { Heart } from 'lucide-react';

// Animated element that fades in on scroll
const FadeInElement = ({
    children,
    delay = 0,
    className = ''
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            }}
        >
            {children}
        </div>
    );
};

const Vision = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="vision" className="relative w-full py-24 md:py-32 px-6 md:px-12 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-aether-gold/5 to-white" />

            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Texture */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(188,128,16,0.04) 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Gradient blobs */}
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-aether-gold/8 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-aether-terracotta/5 rounded-full blur-3xl" />

                {/* Decorative circles */}
                <div className="absolute top-20 right-20 w-64 h-64 border border-aether-gold/10 rounded-full hidden lg:block" />
                <div className="absolute bottom-40 left-16 w-48 h-48 border border-aether-gold/10 rounded-full hidden lg:block" />
            </div>

            {/* Decorative lines */}
            <div className="absolute top-24 left-8 w-40 h-[1px] bg-gradient-to-r from-aether-gold/20 to-transparent hidden lg:block" />
            <div className="absolute top-24 right-8 w-40 h-[1px] bg-gradient-to-l from-aether-gold/20 to-transparent hidden lg:block" />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <FadeInElement delay={0}>
                        <span className="inline-block text-sm font-libre tracking-widest uppercase text-aether-gray mb-6">
                            The Vision
                        </span>
                    </FadeInElement>

                    <FadeInElement delay={100}>
                        <p className="font-playfair text-2xl md:text-3xl text-aether-gold leading-relaxed italic mb-6">
                            But we did not stop at certificates.
                        </p>
                    </FadeInElement>

                    <FadeInElement delay={200}>
                        <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-medium text-aether-dark mb-6 max-w-3xl mx-auto leading-tight">
                            Building a connected art world
                        </h2>
                    </FadeInElement>

                    <FadeInElement delay={300}>
                        <p className="font-cormorant text-xl md:text-2xl text-aether-dark leading-relaxed max-w-2xl mx-auto">
                            Art does not exist in isolation. It moves between hands, across borders, through generations. It connects people.
                        </p>
                    </FadeInElement>
                </div>

                {/* GIF Animation Placeholder */}
                <FadeInElement delay={400} className="mb-16 md:mb-20">
                    <div className="relative w-full max-w-3xl mx-auto">
                        {/* 
                            =====================================================
                            GIF PLACEHOLDER
                            =====================================================
                            Replace the placeholder below with your GIF.
                            
                            Option 1: Using Next.js Image (recommended for optimization)
                            <Image 
                                src="/path-to-your-animation.gif"
                                alt="AetherLabs connecting Artists, Galleries, Dealers, and Collectors"
                                width={800}
                                height={600}
                                className="w-full h-auto rounded-2xl"
                                unoptimized={true}  // Required for GIFs
                            />
                            
                            Option 2: Using standard img tag
                            <img 
                                src="/path-to-your-animation.gif"
                                alt="AetherLabs connecting Artists, Galleries, Dealers, and Collectors"
                                className="w-full h-auto rounded-2xl"
                            />
                            =====================================================
                        */}

                        {/* Placeholder container - remove this when adding your GIF */}
                        <div className="aspect-video bg-gradient-to-br from-aether-gold/10 to-aether-terracotta/10 
                                      rounded-2xl border-2 border-dashed border-aether-gold/30
                                      flex flex-col items-center justify-center p-8">
                            <div className="w-16 h-16 rounded-full bg-aether-gold/20 flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-aether-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="font-libre text-base text-aether-dark/70 mb-2">Connection Animation</p>
                            <p className="font-cormorant text-sm text-aether-gray text-center max-w-md">
                                GIF showing Artists, Galleries, Dealers, and Collectors connected through AetherLabs
                            </p>
                        </div>
                    </div>
                </FadeInElement>

                {/* Everyone linked statement */}
                <FadeInElement delay={500} className="text-center mb-12 md:mb-16">
                    <p className="font-cormorant text-xl md:text-2xl text-aether-gold leading-relaxed">
                        Everyone linked. Everyone trusted.
                    </p>
                </FadeInElement>

                {/* Poetic ending */}
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                    <FadeInElement delay={600}>
                        <div className="relative py-10 px-8">
                            {/* Decorative quotes */}
                            <div className="absolute top-0 left-4 text-6xl text-aether-gold/20 font-playfair">&quot;</div>
                            <div className="absolute bottom-0 right-4 text-6xl text-aether-gold/20 font-playfair rotate-180">&quot;</div>

                            <p className="font-playfair text-xl md:text-2xl text-aether-dark leading-relaxed mb-5 italic">
                                Imagine an art world where proof is built in.
                            </p>
                            <p className="font-playfair text-xl md:text-2xl text-aether-dark leading-relaxed mb-5 italic">
                                Where every piece carries its story, wherever it goes.
                            </p>
                            <p className="font-playfair text-xl md:text-2xl text-aether-dark leading-relaxed italic">
                                Where connection replaces doubt. And trust is the foundation.
                            </p>
                        </div>
                    </FadeInElement>
                </div>

                {/* CTA and Form Section */}
                <FadeInElement delay={700}>
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-xl border border-aether-gray/10 overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-aether-dark to-aether-dark/90 px-8 py-10 text-center">
                                <p className="font-playfair text-2xl md:text-3xl text-white leading-relaxed font-medium mb-3">
                                    This is the future we are building.
                                </p>
                                <p className="font-cormorant text-xl text-aether-gold">
                                    We would love you to be part of it.
                                </p>
                            </div>

                            {/* Form */}
                            <div className="px-8 py-10">
                                {!isSubmitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="font-libre text-sm text-aether-dark block mb-2"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-aether-gray/30 rounded-xl
                                                             font-cormorant text-lg text-aether-dark
                                                             focus:outline-none focus:border-aether-gold focus:ring-2 focus:ring-aether-gold/20
                                                             transition-all bg-white"
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="font-libre text-sm text-aether-dark block mb-2"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-aether-gray/30 rounded-xl
                                                             font-cormorant text-lg text-aether-dark
                                                             focus:outline-none focus:border-aether-gold focus:ring-2 focus:ring-aether-gold/20
                                                             transition-all bg-white"
                                                    placeholder="your@email.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="role"
                                                className="font-libre text-sm text-aether-dark block mb-2"
                                            >
                                                I am a...
                                            </label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-aether-gray/30 rounded-xl
                                                         font-cormorant text-lg text-aether-dark
                                                         focus:outline-none focus:border-aether-gold focus:ring-2 focus:ring-aether-gold/20
                                                         transition-all bg-white cursor-pointer appearance-none"
                                                required
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%232A2121' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 16px center'
                                                }}
                                            >
                                                <option value="">Select your role</option>
                                                <option value="artist">Artist</option>
                                                <option value="gallery">Gallery</option>
                                                <option value="dealer">Dealer</option>
                                                <option value="collector">Collector</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-aether-gold text-white font-libre text-base font-medium
                                                     rounded-xl hover:bg-aether-dark transition-colors duration-300
                                                     shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed
                                                     mt-4"
                                        >
                                            {isSubmitting ? 'Joining...' : 'Join the waitlist'}
                                        </button>

                                        <p className="font-cormorant text-sm text-aether-gray text-center mt-4">
                                            Early access members get priority onboarding and special pricing.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-aether-gold/20 
                                                      flex items-center justify-center">
                                            <Heart className="w-8 h-8 text-aether-gold" />
                                        </div>
                                        <p className="font-playfair text-2xl text-aether-dark mb-3">
                                            Welcome to the future.
                                        </p>
                                        <p className="font-cormorant text-xl text-aether-gray">
                                            We will be in touch shortly.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeInElement>
            </div>
        </section>
    );
};

export default Vision;