import React from 'react';
import { Search, Filter, Plus, Image as ImageIcon, Shield, AlertCircle, Clock } from 'lucide-react';

const Artworks: React.FC = () => {
    // Dummy data for demonstration
    const stats = [
        { label: 'Total Artworks', value: '156', icon: ImageIcon },
        { label: 'Authenticated', value: '142', icon: Shield },
        { label: 'Pending Verification', value: '8', icon: Clock },
        { label: 'Needs Review', value: '6', icon: AlertCircle },
    ];

    const artworks = [
        {
            id: 1,
            title: 'Abstract Harmony',
            artist: 'Jane Doe',
            status: 'Authenticated',
            date: '2024-03-15',
            image: '/placeholder-artwork.jpg',
        },
        {
            id: 2,
            title: 'Digital Dreams',
            artist: 'John Smith',
            status: 'Pending Verification',
            date: '2024-03-14',
            image: '/placeholder-artwork.jpg',
        },
        // Add more dummy artworks as needed
    ];

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Artworks Dashboard</h1>
                    <p className="text-muted-foreground">Manage and monitor your authenticated artworks</p>
                </div>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    <Plus className="w-5 h-5" />
                    Register New Artwork
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-lg border p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <stat.icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search and Filter Section */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search artworks..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent">
                    <Filter className="w-5 h-5" />
                    Filter
                </button>
            </div>

            {/* Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                    <div key={artwork.id} className="rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
                        <div className="aspect-w-16 aspect-h-9 bg-muted">
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-1">{artwork.title}</h3>
                            <p className="text-muted-foreground text-sm mb-2">{artwork.artist}</p>
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${artwork.status === 'Authenticated'
                                    ? 'bg-green-500/10 text-green-500'
                                    : artwork.status === 'Pending Verification'
                                        ? 'bg-yellow-500/10 text-yellow-500'
                                        : 'bg-red-500/10 text-red-500'
                                    }`}>
                                    {artwork.status}
                                </span>
                                <span className="text-sm text-muted-foreground">{artwork.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Artworks; 