'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const WaitlistSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast({
                title: "Email required",
                description: "Please enter your email address.",
                variant: "destructive",
            });
            return;
        }

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
                    name: null,
                    role: null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to join waitlist');
            }

            toast({
                title: "Welcome to Aether! 🎉",
                description: "You're on the list! Check your email for next steps.",
            });

            setEmail('');
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

    return (
        <section id="waitlist" className="w-full py-20 md:py-32 px-6 md:px-12 bg-muted/30">
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">
                    A new era of art authentication is here.
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-12 text-base"
                        disabled={isSubmitting}
                    />
                    <Button 
                        type="submit" 
                        size="lg"
                        className="h-12 px-8"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Joining...' : 'Join waitlist'}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default WaitlistSection;

