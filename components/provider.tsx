"use client";
import React from 'react'
import { ThemeProvider } from './theme-provider'

import { Amplify } from 'aws-amplify';
import outputs from "@/amplify_outputs.json";
Amplify.configure(outputs, { ssr: true });

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme='light' enableSystem disableTransitionOnChange>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
        </ThemeProvider>
    )
}
