'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '../ThemeToggle';


const Navbar = () => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 m-10">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center">
                    <a href="#" className="text-xl font-bold text-gray-800 dark:text-white">Logo</a>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#home" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Home</a>
                    <a href="#about" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">About</a>
                    <a href="#services" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Services</a>
                    <a href="#contact" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">Contact</a>
                    <Button className="rounded-full">Sign Up</Button>
                    {/* <ThemeSwitcher /> */}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
