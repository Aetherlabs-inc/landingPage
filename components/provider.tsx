"use client";
import React from 'react'
import { ThemeProvider } from './theme-provider'


export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme='system' enableSystem disableTransitionOnChange>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
        </ThemeProvider>
    )
}
