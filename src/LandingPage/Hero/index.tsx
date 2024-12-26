import Image from "next/image";
import Link from "next/link";
import React from "react";
import EnhancedBinaryBackground from '@/components/EnchancedBinaryBackground';

const Hero = () => {
    return (
        <section className="bg-card py-16">
            <div className="container mx-auto text-center flex flex-col items-center">
                {/* Title */}
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
                    Authenticating Art, One Tap at a Time
                </h1>

                {/* Subtitle */}
                <p className="mt-4 text-lg text-gray-400 max-w-lg mx-auto">
                    Discover a revolutionary way to verify art authenticity with a simple NFC tap. Empowering artists and collectors with secure, accessible certification technology.
                </p>

                {/* App Store / Google Play Buttons */}
                <div className="mt-2 flex space-x-4">
                    <Link href="">
                        <Image
                            src="/appstore-logo.svg"
                            alt="App Store"
                            width={150} // Adjust width as needed
                            height={40} // Adjust height as needed
                            className="inline"
                        /></Link>

                    <Link href="">
                        <Image
                            src="/googleplay-logo.svg"
                            alt="App Store"
                            width={150} // Adjust width as needed
                            height={40} // Adjust height as needed
                            className="inline"
                        /></Link>
                </div>

                {/* Mockup Image */}
                <div className="mt-5">
                    <Image
                        src="/aetherheroo.webp" // Replace with your image source
                        alt="App Screenshot"
                        width={400}
                        height={800}
                        className="mx-auto"
                    />
                </div>

                {/* Rating and Reviews */}
                <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="flex items-center">
                        <Image src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80" alt="User avatars" width={80} height={24} />
                        <span className="ml-2 text-yellow-400">4.9</span>
                    </div>
                    <p className="text-gray-400">Rated Highly by <strong>10k+</strong> Artists and Collectors</p>
                </div>
            </div>
            {/* <EnhancedBinaryBackground /> */}
        </section>
    );
};

export default Hero;
