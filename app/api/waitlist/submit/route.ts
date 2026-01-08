import { createClient } from '@/src/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, role } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const supabase = createClient();

        // Check if email already exists
        const { data: existingEntry, error: checkError } = await supabase
            .from('waitlist')
            .select('id, email')
            .eq('email', email)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            // PGRST116 is "not found" which is fine
            console.error('Error checking existing entry:', checkError);
            return NextResponse.json(
                { error: 'Failed to check existing entry' },
                { status: 500 }
            );
        }

        if (existingEntry) {
            return NextResponse.json(
                { error: 'This email is already on the waitlist', success: true },
                { status: 200 }
            );
        }

        // Insert new waitlist entry
        const { error } = await supabase
            .from('waitlist')
            .insert({
                email: email,
                name: name || null,
                role: role || null,
            });

        if (error) {
            console.error('Error saving waitlist entry:', error);
            return NextResponse.json(
                { error: 'Failed to save waitlist entry' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing waitlist submission:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

