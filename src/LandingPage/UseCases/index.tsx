'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Building2, Gem } from 'lucide-react';

const UseCases = () => {
    const router = useRouter();

    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };

    const useCases = [
        {
            icon: <Palette className="h-8 w-8 text-primary" />,
            title: "For Artists",
            description: "Build your professional portfolio and protect your work from day one. Increase resale value with verifiable authenticity.",
            features: [
                "Authenticate unlimited artworks",
                "Create stunning online portfolios",
                "Track where your art travels",
                "Receive royalties on resales"
            ],
            bgColor: "bg-primary/5"
        },
        {
            icon: <Building2 className="h-8 w-8 text-primary" />,
            title: "For Galleries",
            description: "Manage entire exhibitions with confidence. Provide buyers with instant proof of authenticity at point of sale.",
            features: [
                "Bulk authentication for exhibitions",
                "White-label certificates",
                "Integration with inventory systems",
                "Enhanced buyer confidence"
            ],
            bgColor: "bg-primary/5"
        },
        {
            icon: <Gem className="h-8 w-8 text-primary" />,
            title: "For Collectors",
            description: "Build and manage your collection with complete provenance records. Verify authenticity before you buy.",
            features: [
                "Instant verification before purchase",
                "Digital collection management",
                "Insurance documentation",
                "Easy resale with proven authenticity"
            ],
            bgColor: "bg-primary/5"
        }
    ];

    return (
        <section className="w-full py-20 px-6 md:px-12 bg-muted/30">
            <div className="max-w-7xl mx-auto space-y-16">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">
                        Built for Every Stage of the Art Journey
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <Card key={index} className={`border border-border ${useCase.bgColor} hover:border-primary/30 transition-all duration-300`}>
                            <CardContent className="p-8 space-y-6">
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-2xl font-medium text-foreground">{useCase.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{useCase.description}</p>
                                <div className="space-y-3">
                                    {useCase.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                                            <span className="text-primary">•</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center space-y-4 pt-8">
                    <h3 className="text-2xl font-medium tracking-tighter text-foreground">
                        Ready to protect your art journey?
                    </h3>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Join artists, galleries, and collectors who are securing their artwork with secure digital certificates and tamper-proof digital records.
                    </p>
                    <Button
                        onClick={handleJoinWaitlist}
                        className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl px-8 h-12"
                    >
                        Join Waitlist - Get Started Today
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UseCases;
