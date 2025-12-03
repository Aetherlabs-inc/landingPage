'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Sparkles, Network, Heart, ArrowRight } from 'lucide-react';

const Community = () => {
    const router = useRouter();

    const handleJoinWaitlist = () => {
        router.push('/waitlist');
    };

    const communityPillars = [
        {
            icon: <Sparkles className="h-6 w-6" />,
            title: "Empowering Artists",
            description: "Give artists the tools and platform to protect their work, build their reputation, and connect directly with collectors and galleries.",
            image: "/images/community/artist.jpg", // Placeholder - replace with actual image
            color: "from-cosmic-purple/20 to-cosmic-indigo/20"
        },
        {
            icon: <Network className="h-6 w-6" />,
            title: "Connecting Collectors",
            description: "Build trust and transparency in the art market. Collectors can verify authenticity instantly and discover new artists through our network.",
            image: "/images/community/collector.jpg", // Placeholder - replace with actual image
            color: "from-cosmic-indigo/20 to-neon-blue/20"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Supporting Galleries",
            description: "Galleries can showcase authenticated works, build buyer confidence, and streamline their operations with our platform.",
            image: "/images/community/gallery.jpg", // Placeholder - replace with actual image
            color: "from-neon-blue/20 to-cosmic-purple/20"
        }
    ];

    const connections = [
        {
            from: "Artists",
            to: "Galleries",
            description: "Direct connections for exhibitions and sales"
        },
        {
            from: "Collectors",
            to: "Artists",
            description: "Discover and support emerging talent"
        },
        {
            from: "Galleries",
            to: "Collectors",
            description: "Trusted marketplace with verified authenticity"
        }
    ];

    return (
        <section className="w-full py-20 md:py-24 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-cosmic-indigo rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cosmic-purple rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                {/* Header Section */}
                <div className="text-center space-y-6 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic-indigo/10 border border-cosmic-indigo/20">
                        <Heart className="h-4 w-4 text-cosmic-indigo" />
                        <span className="text-sm font-medium text-cosmic-indigo">More Than Authentication</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-foreground">
                        Building a Connected
                        <span className="block bg-gradient-to-r from-cosmic-indigo to-cosmic-purple bg-clip-text text-transparent">
                            Art Community
                        </span>
                    </h2>
                    
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        AetherLabs isn&apos;t just about protecting art—it&apos;s about empowering artists, 
                        connecting collectors, and supporting galleries. We&apos;re building the infrastructure 
                        for a more transparent, accessible, and vibrant art ecosystem.
                    </p>
                </div>

                {/* Three Pillars with Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {communityPillars.map((pillar, index) => (
                        <Card 
                            key={index} 
                            className="group border border-border hover:border-cosmic-indigo/30 transition-all duration-300 overflow-hidden bg-card"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {/* Image placeholder - replace with actual images */}
                                <div className={`w-full h-full bg-gradient-to-br ${pillar.color} flex items-center justify-center`}>
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                            {pillar.icon}
                                        </div>
                                        <p className="text-sm text-muted-foreground">Image Placeholder</p>
                                    </div>
                                </div>
                                {/* Uncomment when you have actual images:
                                <Image
                                    src={pillar.image}
                                    alt={pillar.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                */}
                            </div>
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-indigo/20 to-cosmic-purple/20 flex items-center justify-center text-cosmic-indigo">
                                        {pillar.icon}
                                    </div>
                                    <h3 className="text-xl font-medium text-foreground">{pillar.title}</h3>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Connection Flow */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-foreground mb-3">
                            Connecting the Art World
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Our platform creates meaningful connections between all participants in the art ecosystem
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {connections.map((connection, index) => (
                            <div 
                                key={index}
                                className="relative p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-cosmic-indigo/30 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cosmic-indigo/20 to-cosmic-purple/20 flex items-center justify-center">
                                            <Network className="h-5 w-5 text-cosmic-indigo" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-foreground">{connection.from}</div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground mt-1" />
                                            <div className="font-medium text-foreground">{connection.to}</div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{connection.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community Stats or Benefits */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                    <div className="text-center space-y-2">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic-indigo to-cosmic-purple bg-clip-text text-transparent">
                            1,000+
                        </div>
                        <div className="text-sm text-muted-foreground">Artists on Platform</div>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic-indigo to-cosmic-purple bg-clip-text text-transparent">
                            50+
                        </div>
                        <div className="text-sm text-muted-foreground">Partner Galleries</div>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic-indigo to-cosmic-purple bg-clip-text text-transparent">
                            5,000+
                        </div>
                        <div className="text-sm text-muted-foreground">Collectors</div>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cosmic-indigo to-cosmic-purple bg-clip-text text-transparent">
                            10K+
                        </div>
                        <div className="text-sm text-muted-foreground">Artworks Protected</div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center space-y-6 pt-8">
                    <div className="space-y-3">
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tighter text-foreground">
                            Join the Movement
                        </h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Be part of a community that&apos;s revolutionizing how art is authenticated, 
                            collected, and shared. Together, we&apos;re building the future of the art world.
                        </p>
                    </div>
                    <Button
                        onClick={handleJoinWaitlist}
                        className="bg-gradient-to-r from-cosmic-indigo to-cosmic-purple text-white hover:from-cosmic-indigo/90 hover:to-cosmic-purple/90 shadow-lg hover:shadow-xl px-8 h-12 text-base font-medium"
                    >
                        Join the Community
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Community;

