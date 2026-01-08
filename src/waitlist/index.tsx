'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const Waitlist = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Missing Information",
                description: "Please enter your email address to join the waitlist.",
                variant: "destructive",
            });
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/waitlist/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    name: name || null,
                    role: role || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to join waitlist');
            }

            setIsSubmitted(true);
            toast({
                title: "Welcome to Aether! 🎉",
                description: "You&apos;re on the list! Check your email for next steps.",
            });
        } catch (error) {
            console.error('Error submitting waitlist:', error);
            toast({
                title: "Submission Error",
                description: error instanceof Error ? error.message : "Failed to join waitlist. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl text-center">
                    <CardHeader className="space-y-6">
                        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl mb-4">You&apos;re on the List!</CardTitle>
                            <CardDescription className="text-lg">
                                Thank you for joining the Aether waitlist. We&apos;ll send you early access details soon.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                            <p className="font-medium text-foreground">What happens next?</p>
                            <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-md mx-auto">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Check your email for a welcome message</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Get early access 2 weeks before public launch</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Lock in founding member pricing (up to 50% off)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                    <span>Receive exclusive launch bonuses</span>
                                </li>
                            </ul>
                        </div>
                        <Button
                            onClick={() => router.push("/")}
                            variant="outline"
                            size="lg"
                        >
                            Back to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="inline-block mx-auto mb-4 px-4 py-2 bg-muted rounded-full">
                        <span className="text-sm font-medium text-primary">
                            Launching Fall 2026 - Limited Early Access Only 5,000 Spots Available!
                        </span>
                    </div>
                    <CardTitle className="text-3xl mb-2">Join the Aether Waitlist - Only 5,000 Spots Available!</CardTitle>
                    <CardDescription className="text-lg">
                        Be among the first to authenticate your artwork with blockchain technology and secure your spot in the early access program.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>I am a... <span className="text-muted-foreground text-sm font-normal">(optional)</span></Label>
                            <RadioGroup value={role} onValueChange={setRole} className="space-y-3">
                                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                                    <RadioGroupItem value="artist" id="artist" />
                                    <Label htmlFor="artist" className="flex-1 cursor-pointer">
                                        <div className="font-medium">Artist</div>
                                        <div className="text-sm text-muted-foreground">Create and protect your original artwork</div>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                                    <RadioGroupItem value="gallery" id="gallery" />
                                    <Label htmlFor="gallery" className="flex-1 cursor-pointer">
                                        <div className="font-medium">Art Gallery</div>
                                        <div className="text-sm text-muted-foreground">Manage exhibitions and authenticate collections</div>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                                    <RadioGroupItem value="collector" id="collector" />
                                    <Label htmlFor="collector" className="flex-1 cursor-pointer">
                                        <div className="font-medium">Collector</div>
                                        <div className="text-sm text-muted-foreground">Build and verify your art collection</div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-4 pt-4">
                            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
                            </Button>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    ✓ Early access 2 weeks before launch<br />
                                    ✓ Founding member pricing (up to 50% off)<br />
                                    ✓ No spam, unsubscribe anytime
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Waitlist;
