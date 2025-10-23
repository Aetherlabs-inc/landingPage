import React from "react"
import { SupabaseMultiStepSignup } from "@/src/auth/supabase-multi-step-signup"

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <SupabaseMultiStepSignup />
            </div>
        </div>
    )
}
