import React from 'react';
import { motion } from 'framer-motion';
import { Image, FileCheck, Clock, Plus, BarChart3, Activity, Users, FileText, Search, Bell } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Dashboard = () => {
    // Mock data - replace with actual data from your backend
    const stats = {
        totalArtworks: 1250,
        issuedCertificates: 980,
        inProcessCertificates: 270,
        totalUsers: 850,
        verificationRate: 98.5,
        monthlyGrowth: 12
    };

    const recentActivity = [
        { type: 'artwork', title: 'The Starry Night', action: 'Added', time: '2 hours ago' },
        { type: 'certificate', title: 'Mona Lisa', action: 'Issued', time: '4 hours ago' },
        { type: 'verification', title: 'The Persistence of Memory', action: 'Verified', time: '5 hours ago' },
        { type: 'user', title: 'New Artist Registration', action: 'Completed', time: '6 hours ago' },
        { type: 'certificate', title: 'The Scream', action: 'Issued', time: '7 hours ago' },
    ];

    // Chart data for certificate issuance trend
    const certificateTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Certificates Issued',
                data: [120, 150, 180, 140, 160, 156],
                borderColor: 'rgb(126, 34, 206)',
                backgroundColor: 'rgba(126, 34, 206, 0.5)',
                tension: 0.4
            }
        ]
    };

    // Chart data for artwork categories
    const categoryData = {
        labels: ['Paintings', 'Sculptures', 'Digital Art', 'Photography', 'Other'],
        datasets: [
            {
                data: [45, 20, 15, 10, 10],
                backgroundColor: [
                    'rgb(126, 34, 206)', // Dark Purple
                    'rgb(107, 33, 168)', // Darker Purple
                    'rgb(88, 28, 135)', // Deep Purple
                    'rgb(126, 34, 206)', // Dark Purple
                    'rgb(107, 33, 168)'  // Darker Purple
                ]
            }
        ]
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen p-6">
            <div className="mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard Overview
                    </h1>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Total Artworks Card */}
                    <motion.div
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Artworks
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                                    {stats.totalArtworks}
                                </p>
                            </div>
                            <div className="bg-purple-700 rounded-full p-3">
                                <Image className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Issued Certificates Card */}
                    <motion.div
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Issued Certificates
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                                    {stats.issuedCertificates}
                                </p>
                            </div>
                            <div className="bg-purple-800 rounded-full p-3">
                                <FileCheck className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>

                    {/* In Process Certificates Card */}
                    <motion.div
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Certificates in Process
                                </p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                                    {stats.inProcessCertificates}
                                </p>
                            </div>
                            <div className="bg-purple-900 rounded-full p-3">
                                <Clock className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Quick Actions and Recent Activity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quick Actions */}
                    <motion.div
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Plus className="w-5 h-5 mr-2" />
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center p-4 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors">
                                <Image className="w-5 h-5 mr-2" />
                                Add Artwork
                            </button>
                            <button className="flex items-center justify-center p-4 bg-purple-800 hover:bg-purple-900 text-white rounded-lg transition-colors">
                                <FileCheck className="w-5 h-5 mr-2" />
                                Issue Certificate
                            </button>
                            <button className="flex items-center justify-center p-4 bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors">
                                <Users className="w-5 h-5 mr-2" />
                                Add Artist
                            </button>
                            <button className="flex items-center justify-center p-4 bg-purple-800 hover:bg-purple-900 text-white rounded-lg transition-colors">
                                <FileText className="w-5 h-5 mr-2" />
                                View Reports
                            </button>
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        variants={item}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Activity className="w-5 h-5 mr-2" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center">
                                        <div className={`w-2 h-2 rounded-full mr-3 ${activity.type === 'artwork' ? 'bg-purple-700' :
                                            activity.type === 'certificate' ? 'bg-purple-800' :
                                                activity.type === 'verification' ? 'bg-purple-700' :
                                                    'bg-purple-800'
                                            }`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {activity.action}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {activity.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Analytics Section */}
            <motion.div
                variants={item}
                className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
            >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analytics Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Certificates</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">156</p>
                        <p className="text-xs text-purple-700 mt-1">+12% from last month</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Verification Rate</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">98.5%</p>
                        <p className="text-xs text-purple-800 mt-1">+2.3% from last month</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
                        <p className="text-xs text-purple-700 mt-1">+8% from last month</p>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Certificate Issuance Trend */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Certificate Issuance Trend</h3>
                        <div className="h-[300px]">
                            <Line data={certificateTrendData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Artwork Categories Distribution */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">Artwork Categories</h3>
                        <div className="h-[300px]">
                            <Doughnut data={categoryData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
