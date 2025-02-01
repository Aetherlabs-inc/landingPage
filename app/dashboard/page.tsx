'use client';
import React from 'react';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {

    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut();
            console.log('Signed out');
            router.push("/");

        } catch (error: unknown) {
            console.error('Error signing out', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard</h1>
            <button onClick={handleSignOut} style={{ marginBottom: '20px' }}>Sign Out</button>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', width: '30%' }}>
                    <h2>Widget 1</h2>
                    <p>Some content for widget 1.</p>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '10px', width: '30%' }}>
                    <h2>Widget 2</h2>
                    <p>Some content for widget 2.</p>
                </div>
                <div style={{ border: '1px solid #ccc', padding: '10px', width: '30%' }}>
                    <h2>Widget 3</h2>
                    <p>Some content for widget 3.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;