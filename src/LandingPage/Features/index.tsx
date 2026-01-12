'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Layers, Grid3x3, ListCheck, BookOpen, Star, LayoutDashboard } from "lucide-react";

const Features = () => {
    const router = useRouter();
    const [openFeature, setOpenFeature] = useState<number | null>(null);
    
    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };

    const features = [
        {
            title: "Secure Digital Certificates",
            description: "Every certificate is cryptographically secured—tamper-proof and permanent.",
            expandedDescription: "Your artwork's authenticity is guaranteed forever with secure digital certificates. Every certificate is stored permanently in tamper-proof digital records, ensuring permanent cloud storage. All records are cryptographically secured while maintaining artist privacy. Military-grade cryptography protects your digital certificates.",
            icon: (
                <Layers size={24} className="text-cosmic-accent" />
            )
        },
        {
            title: "NFC Technology",
            description: "Tap any smartphone to instantly verify—no app download required.",
            expandedDescription: "Simple tap verification works with any NFC-enabled smartphone. No apps to download, no QR codes to scan—just tap and verify instantly. The NFC tags are water-resistant, tamper-evident, and work through glass and frames. Each tag is cryptographically linked to your secure digital certificate.",
            icon: (
                <Grid3x3 size={24} className="text-cosmic-accent" />
            )
        },
        {
            title: "Provenance Tracking",
            description: "Complete ownership history automatically recorded forever.",
            expandedDescription: "Build trust with complete transparency. Every sale, transfer, and exhibition is automatically documented in tamper-proof digital records. Track your artwork's journey from creation to current owner. Provenance records increase value and authenticity for collectors and galleries.",
            icon: (
                <LayoutDashboard size={24} className="text-cosmic-accent" />
            )
        },
        {
            title: "Digital Portfolio",
            description: "Showcase your collection with beautiful online galleries.",
            expandedDescription: "Create stunning online portfolios that showcase your authenticated works. Share with collectors, galleries, or keep private. Professional presentation with customizable layouts and high-resolution image support. Each artwork links directly to its secure digital certificate for instant verification.",
            icon: (
                <ListCheck size={24} className="text-cosmic-accent" />
            )
        },
        {
            title: "Easy Transfers",
            description: "Transfer ownership in seconds with cryptographically secured records.",
            expandedDescription: "Streamline your sales process with cryptographically secured transfers. No paperwork, no delays—ownership transfers complete in seconds. Our secure system handles the entire process transparently and securely. Complete provenance history transfers with the artwork automatically.",
            icon: (
                <Star size={24} className="text-cosmic-accent" />
            )
        },
        {
            title: "Cloud Storage",
            description: "Unlimited high-resolution image storage for your artwork.",
            expandedDescription: "Never lose your documentation with secure cloud storage. Upload unlimited high-resolution images of your artworks. Automatic backup ensures your images are accessible anywhere, anytime. Professional-grade storage with enterprise security and 99.9% uptime.",
            icon: (
                <BookOpen size={24} className="text-cosmic-accent" />
            )
        }
    ];

    const toggleFeature = (index: number) => {
        setOpenFeature(openFeature === index ? null : index);
    };

    return (
        <section id="features" className="w-full py-12 md:py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tighter">
                        Everything You Need to Protect Your Art
                    </h2>
                    <p className="text-cosmic-muted text-lg">
                        Built for artists, galleries, and collectors who demand the highest level of security
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Collapsible
                            key={index}
                            open={openFeature === index}
                            onOpenChange={() => toggleFeature(index)}
                            className={`rounded-xl border ${openFeature === index ? 'border-cosmic-light/40' : 'border-cosmic-light/20'} cosmic-gradient transition-all duration-300`}
                        >
                            <CollapsibleTrigger className="w-full text-left p-6 flex flex-col">
                                <div className="flex justify-between items-start">
                                    <div className="h-16 w-16 rounded-full bg-cosmic-light/10 flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <ChevronDown
                                        className={`h-5 w-5 text-cosmic-muted transition-transform duration-200 ${openFeature === index ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                                <h3 className="text-xl font-medium tracking-tighter mb-3">{feature.title}</h3>
                                <p className="text-cosmic-muted">{feature.description}</p>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="px-6 pb-6 pt-2">
                                <div className="pt-3 border-t border-cosmic-light/10">
                                    <p className="text-cosmic-muted">{feature.expandedDescription}</p>
                                    <div className="mt-4 flex justify-end">
                                        <button className="text-cosmic-accent hover:text-cosmic-accent/80 text-sm font-medium">
                                            Learn more →
                                        </button>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </div>
                
                <div className="text-center space-y-4 pt-8">
                    <Button 
                        onClick={handleJoinWaitlist}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl px-8 h-12"
                    >
                        Join Waitlist - Get Early Access
                    </Button>
                    <p className="text-sm text-muted-foreground">
                        Unlock all features with early access pricing. Contact us for details.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Features;
