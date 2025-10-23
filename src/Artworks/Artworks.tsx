'use client'
import React, { useState } from 'react';
import { Search, Filter, Plus, Image as ImageIcon, Shield, AlertCircle, Clock, Eye, Wifi, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RegisterArtwork from '@/src/Artworks/registerArtwork/RegisterArtwork';
import COACertificate from '@/src/Artworks/registerArtwork/COACertificate';
import ArtworkDetails from '@/src/Artworks/ArtworkDetails';

interface ArtworkType {
    id: number;
    title: string;
    artist: string;
    year: string;
    medium: string;
    dimensions: string;
    status: string;
    date: string;
    image: string;
    hasCertificate: boolean;
    certificateId?: string;
    verificationLevel: string;
    hasNFC: boolean;
    nfcUid?: string;
    blockchainHash?: string;
}

const Artworks: React.FC = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState<ArtworkType | null>(null);
    const [showCertificate, setShowCertificate] = useState(false);
    const [showArtworkDetails, setShowArtworkDetails] = useState(false);

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
            year: '2024',
            medium: 'Oil on Canvas',
            dimensions: '24 × 36 in',
            status: 'Authenticated',
            date: '2024-03-15',
            image: '/placeholder-artwork.jpg',
            hasCertificate: true,
            certificateId: 'COA-2024-001-ABC123',
            verificationLevel: 'artist_verified',
            hasNFC: true,
            nfcUid: 'NFC-001-456789',
            blockchainHash: '0x1234567890abcdef1234567890abcdef12345678'
        },
        {
            id: 2,
            title: 'Digital Dreams',
            artist: 'John Smith',
            year: '2024',
            medium: 'Digital Art',
            dimensions: '1920 × 1080 px',
            status: 'Pending Verification',
            date: '2024-03-14',
            image: '/placeholder-artwork.jpg',
            hasCertificate: false,
            certificateId: null,
            verificationLevel: 'unverified',
            hasNFC: false,
            nfcUid: null,
            blockchainHash: null
        },
        {
            id: 3,
            title: 'Urban Landscape',
            artist: 'Sarah Wilson',
            year: '2023',
            medium: 'Acrylic on Canvas',
            dimensions: '30 × 40 in',
            status: 'Authenticated',
            date: '2024-03-10',
            image: '/placeholder-artwork.jpg',
            hasCertificate: true,
            certificateId: 'COA-2024-002-DEF456',
            verificationLevel: 'gallery_verified',
            hasNFC: false,
            nfcUid: null,
            blockchainHash: '0xabcdef1234567890abcdef1234567890abcdef12'
        },
        {
            id: 4,
            title: 'Sculpture Series #1',
            artist: 'Mike Chen',
            year: '2024',
            medium: 'Bronze',
            dimensions: '12 × 8 × 6 in',
            status: 'Needs Review',
            date: '2024-03-08',
            image: '/placeholder-artwork.jpg',
            hasCertificate: false,
            certificateId: null,
            verificationLevel: 'unverified',
            hasNFC: false,
            nfcUid: null,
            blockchainHash: null
        }
    ];

    const handleViewArtwork = (artwork: ArtworkType) => {
        setSelectedArtwork(artwork);
        setShowArtworkDetails(true);
    };

    const handleViewCertificate = () => {
        setShowCertificate(true);
    };

    const handleGenerateCertificate = () => {
        // Navigate to certificate generation flow
        console.log('Generate certificate for:', selectedArtwork?.title);
        // This would typically navigate to a certificate generation flow
    };

    const handleConnectNFC = () => {
        // Navigate to NFC connection flow
        console.log('Connect NFC for:', selectedArtwork?.title);
        // This would typically navigate to an NFC connection flow
    };

    const handleBackToArtworks = () => {
        setShowArtworkDetails(false);
        setShowCertificate(false);
        setSelectedArtwork(null);
    };

    if (showRegisterForm) {
        return <RegisterArtwork onBack={() => setShowRegisterForm(false)} />;
    }

    if (showArtworkDetails && selectedArtwork) {
        return (
            <ArtworkDetails
                artwork={selectedArtwork}
                onBack={handleBackToArtworks}
                onViewCOA={handleViewCertificate}
                onGenerateCOA={handleGenerateCertificate}
                onConnectNFC={handleConnectNFC}
            />
        );
    }

    if (showCertificate && selectedArtwork) {
        return (
            <div className="p-6">
                <div className="mb-6">
                    <Button
                        onClick={() => setShowCertificate(false)}
                        variant="ghost"
                        className="mb-4 flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <X className="h-4 w-4" />
                        Back to Artwork Details
                    </Button>
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                        Certificate of Authenticity
                    </h1>
                    <p className="text-black dark:text-white">
                        Viewing certificate for &quot;{selectedArtwork.title}&quot;
                    </p>
                </div>

                <COACertificate
                    artworkData={{
                        title: selectedArtwork.title,
                        year: selectedArtwork.year,
                        medium: selectedArtwork.medium,
                        dimensions: selectedArtwork.dimensions,
                        artistName: selectedArtwork.artist,
                        imageUrl: selectedArtwork.image
                    }}
                    certificateData={{
                        certificateId: selectedArtwork.certificateId ?? '',
                        qrCode: `https://aether.app/verify/${selectedArtwork.certificateId}`,
                        blockchainHash: selectedArtwork.blockchainHash ?? '',
                        generatedAt: selectedArtwork.date
                    }}
                    verificationLevel={{
                        level: selectedArtwork.verificationLevel as 'artist_verified' | 'unverified' | 'gallery_verified' | 'third_party_verified',
                        hasNFC: selectedArtwork.hasNFC,
                        nfcUid: selectedArtwork.nfcUid
                    }}
                    className="shadow-lg"
                />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Artworks Dashboard</h1>
                    <p className="text-muted-foreground">Manage and monitor your authenticated artworks</p>
                </div>
                <Button
                    onClick={() => setShowRegisterForm(true)}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Register New Artwork
                </Button>
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
                <Button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent">
                    <Filter className="w-5 h-5" />
                    Filter
                </Button>
            </div>

            {/* Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork) => (
                    <Card key={artwork.id} className="border border-black dark:border-white bg-white dark:bg-black overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-900">
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="object-cover w-full h-48"
                            />
                        </div>
                        <CardContent className="p-4">
                            <div className="mb-3">
                                <h3 className="font-semibold text-lg text-black dark:text-white mb-1">{artwork.title}</h3>
                                <p className="text-black dark:text-white text-sm mb-1">{artwork.artist}</p>
                                <p className="text-gray-600 dark:text-gray-400 text-xs">{artwork.year} • {artwork.medium}</p>
                            </div>

                            {/* Certificate Status */}
                            <div className="mb-3">
                                {artwork.hasCertificate ? (
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="h-4 w-4 text-black dark:text-white" />
                                        <span className="text-sm font-medium text-black dark:text-white">Certificate Issued</span>
                                        <Badge variant="outline" className="text-xs border-black dark:border-white text-black dark:text-white">
                                            {artwork.certificateId}
                                        </Badge>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertCircle className="h-4 w-4 text-gray-500" />
                                        <span className="text-sm text-gray-500">No Certificate</span>
                                    </div>
                                )}

                                {/* NFC Status */}
                                <div className="flex items-center gap-2 mb-2">
                                    {artwork.hasNFC ? (
                                        <>
                                            <Wifi className="h-4 w-4 text-black dark:text-white" />
                                            <span className="text-xs text-black dark:text-white">NFC Linked</span>
                                        </>
                                    ) : (
                                        <>
                                            <Wifi className="h-4 w-4 text-gray-400" />
                                            <span className="text-xs text-gray-500">No NFC</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Status and Date */}
                            <div className="flex justify-between items-center mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${artwork.status === 'Authenticated'
                                    ? 'bg-black dark:bg-white text-white dark:text-black'
                                    : artwork.status === 'Pending Verification'
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-gray-500 text-white'
                                    }`}>
                                    {artwork.status}
                                </span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{artwork.date}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleViewArtwork(artwork as ArtworkType)}
                                    size="sm"
                                    className="flex-1 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                                >
                                    <Eye className="h-3 w-3 mr-1" />
                                    View Details
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Artworks; 