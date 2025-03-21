'use client'
import React from 'react';
import { Home, List, Activity, Grid, Users, Settings, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Avatar } from '@/components/ui/avatar';

import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const AetherPlatformUI = () => {
    const certificates = [
        { title: "The Starry Night", status: "Authenticated", time: "5 mins ago" },
        { title: "The Persistence of Memory", status: "Pending Verification", time: "2 hours ago" },
        { title: "Guernica", status: "Flagged for Review", time: "1 day ago" },
    ];

    // Define dynamic styles based on status
    const statusStyles: { [key: string]: string } = {
        "Authenticated": "bg-gray-700 text-gray-100",
        "Pending Verification": "bg-gray-600 text-gray-100",
        "Flagged for Review": "bg-gray-800 text-gray-100",
    };

    // CertificateCard component
    const CertificateCard = ({ title, status, time }: { title: string, status: string, time: string }) => (
        <div className="flex items-center justify-between bg-gray-900 rounded-lg p-4 shadow-md hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-3">
                <List className="w-5 h-5 text-gray-400" />
                <div>
                    <h3 className="text-base font-semibold text-gray-100">{title}</h3>
                    <p className="text-sm text-gray-400">Deploys from GitHub · {time}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                    {status}
                </span>
                <button className="text-gray-100 bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1 text-sm">
                    Preview
                </button>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    );

    // Data for Doughnut Chart (Certificate Status Breakdown)
    const certificateData = {
        labels: ['Authenticated', 'Pending', 'Flagged'],
        datasets: [
            {
                data: [80, 30, 10],
                backgroundColor: ['#4B5563', '#6B7280', '#1F2937'],
                hoverBackgroundColor: ['#374151', '#4B5563', '#111827']
            }
        ],
        circumference: 20,
    };

    // Data for Line Chart (Recent Verifications)
    const verificationData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Verifications',
                data: [5, 15, 8, 20, 12, 18, 9],
                borderColor: '#9CA3AF',
                backgroundColor: 'rgba(156, 163, 175, 0.2)',
                fill: true,
            }
        ]
    };

    // Data for Bar Chart (Flagged Items)
    const flaggedData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Flagged Items',
                data: [2, 4, 1, 5, 2, 3],
                backgroundColor: '#6B7280',
            }
        ]
    };

    return (
        <div className="flex min-h-screen bg-gray-950 text-gray-100">
            {/* Sidebar Navigation */}
            <div className="bg-gray-900 p-4 space-y-4 w-64 shadow-lg sticky top-0 h-screen overflow-y-auto">
                <nav className="space-y-4">
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">Navigation</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <Home className="w-5 h-5 text-gray-400" />
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <List className="w-5 h-5 text-gray-400" />
                                    <span>Certificates</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <Activity className="w-5 h-5 text-gray-400" />
                                    <span>Activity</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <Grid className="w-5 h-5 text-gray-400" />
                                    <span>Collections</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <span>Usage</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3 rounded-lg px-3 py-2 hover:bg-gray-800">
                                    <Settings className="w-5 h-5 text-gray-400" />
                                    <span>Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-100">All Certificates</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search certificates..."
                                className="bg-gray-900 rounded-lg px-4 py-2 pr-10 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <Avatar>
                                <Image src="/path/to/profile-image.jpg" alt="Profile" layout="fill" className="rounded-full" />
                            </Avatar>
                        </div>
                    </div>
                </div>

                {/* Dashboard Widgets with Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {/* Doughnut Chart for Certificate Status */}
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center h-[300px]">
                        <h2 className="text-lg font-semibold text-gray-100 mb-4">Certificate Status</h2>
                        <div className="h-[200px] flex items-center justify-center">
                            <Doughnut data={certificateData} />
                        </div>
                    </div>
                    {/* Line Chart for Recent Verifications */}
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center h-[300px]">
                        <h2 className="text-lg font-semibold text-gray-100 mb-4">Recent Verifications</h2>
                        <div className="h-[200px] flex items-center justify-center">
                            <Line data={verificationData} />
                        </div>
                    </div>
                    {/* Bar Chart for Flagged Items */}
                    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-center h-[300px]">
                        <h2 className="text-lg font-semibold text-gray-100 mb-4">Flagged Items</h2>
                        <div className="h-[200px] flex items-center justify-center">
                            <Bar data={flaggedData} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {certificates.map((certificate, index) => (
                        <div key={index}>
                            <CertificateCard
                                title={certificate.title}
                                status={certificate.status}
                                time={certificate.time}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="bg-gray-900 w-64 p-4 space-y-4 shadow-lg sticky top-0 h-screen overflow-y-auto">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">Notifications</h3>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                            <AlertCircle className="text-gray-400" />
                            <span className="text-gray-100">New flag in Guernica</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                            <CheckCircle className="text-gray-400" />
                            <span className="text-gray-100">New certificate authenticated</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-gray-400">Quick Actions</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800">
                                <Activity className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-100">View Activity Logs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800">
                                <Settings className="w-5 h-5 text-gray-400" />
                                <span className="text-gray-100">Account Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AetherPlatformUI;
