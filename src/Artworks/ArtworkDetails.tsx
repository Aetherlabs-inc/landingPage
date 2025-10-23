import React from 'react';
import { ArrowLeft, Eye, FileText, Wifi, Shield, QrCode, CheckCircle, AlertTriangle, User, Calendar, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


interface ArtworkDetailsProps {
    artwork: {
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
    };
    onBack: () => void;
    onViewCOA: () => void;
    onGenerateCOA: () => void;
    onConnectNFC: () => void;
}

const ArtworkDetails: React.FC<ArtworkDetailsProps> = ({
    artwork,
    onBack,
    onViewCOA,
    onGenerateCOA,
    onConnectNFC
}) => {
    const getVerificationInfo = () => {
        switch (artwork.verificationLevel) {
            case 'unverified':
                return {
                    icon: AlertTriangle,
                    label: 'Unverified',
                    description: 'Artist self-registered',
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100 dark:bg-gray-800'
                };
            case 'artist_verified':
                return {
                    icon: CheckCircle,
                    label: 'Artist Verified',
                    description: 'Verified by the artist',
                    color: 'text-black dark:text-white',
                    bgColor: 'bg-gray-100 dark:bg-gray-800'
                };
            case 'gallery_verified':
                return {
                    icon: Shield,
                    label: 'Gallery Verified',
                    description: 'Aether Trusted Gallery',
                    color: 'text-black dark:text-white',
                    bgColor: 'bg-gray-100 dark:bg-gray-800'
                };
            case 'third_party_verified':
                return {
                    icon: Shield,
                    label: 'Third Party Verified',
                    description: 'Independent verification',
                    color: 'text-black dark:text-white',
                    bgColor: 'bg-gray-100 dark:bg-gray-800'
                };
            default:
                return {
                    icon: AlertTriangle,
                    label: 'Unknown',
                    description: 'Verification status unknown',
                    color: 'text-gray-500',
                    bgColor: 'bg-gray-100 dark:bg-gray-800'
                };
        }
    };

    const verificationInfo = getVerificationInfo();
    const VerificationIcon = verificationInfo.icon;
    const verificationBgColor = verificationInfo.bgColor;

    return (
        <div className="min-h-screen bg-white dark:bg-black p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        onClick={onBack}
                        variant="ghost"
                        className="mb-4 flex items-center gap-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Artworks
                    </Button>

                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
                                {artwork.title}
                            </h1>
                            <p className="text-xl text-black dark:text-white mb-4">
                                by {artwork.artist}
                            </p>
                            <div className="flex items-center gap-4">
                                <Badge
                                    variant="outline"
                                    className={`px-3 py-1 ${artwork.status === 'Authenticated'
                                        ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                                        : artwork.status === 'Pending Verification'
                                            ? 'bg-yellow-500 text-black border-yellow-500'
                                            : 'bg-gray-500 text-white border-gray-500'
                                        }`}
                                >
                                    {artwork.status}
                                </Badge>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Added {artwork.date}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Artwork Image */}
                    <div className="lg:col-span-2">
                        <Card className="border border-black dark:border-white bg-white dark:bg-black">
                            <CardHeader>
                                <CardTitle className="text-black dark:text-white">Artwork</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border border-black dark:border-white rounded-lg overflow-hidden">
                                    <img
                                        src={artwork.image}
                                        alt={artwork.title}
                                        className="w-full h-96 object-cover"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Details & Actions */}
                    <div className="space-y-6">
                        {/* Artwork Information */}
                        <Card className="border border-black dark:border-white bg-white dark:bg-black">
                            <CardHeader>
                                <CardTitle className="text-black dark:text-white">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-black dark:text-white" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Artist</p>
                                        <p className="font-semibold text-black dark:text-white">{artwork.artist}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-black dark:text-white" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Year</p>
                                        <p className="font-semibold text-black dark:text-white">{artwork.year}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Ruler className="h-4 w-4 text-black dark:text-white" />
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Dimensions</p>
                                        <p className="font-semibold text-black dark:text-white">{artwork.dimensions}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Medium</p>
                                    <p className="font-semibold text-black dark:text-white">{artwork.medium}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Verification Status */}
                        <Card className="border border-black dark:border-white bg-white dark:bg-black">
                            <CardHeader>
                                <CardTitle className="text-black dark:text-white">Verification</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className={`${verificationBgColor} border border-black dark:border-white rounded-lg p-4`}>
                                    <div className="flex items-center gap-3">
                                        <VerificationIcon className={`h-6 w-6 ${verificationInfo.color}`} />
                                        <div>
                                            <p className={`font-bold ${verificationInfo.color}`}>{verificationInfo.label}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{verificationInfo.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Status */}
                                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-black dark:text-white">Certificate</span>
                                        {artwork.hasCertificate ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-black dark:text-white" />
                                                <span className="text-sm text-black dark:text-white">Issued</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4 text-gray-500" />
                                                <span className="text-sm text-gray-500">Not Issued</span>
                                            </div>
                                        )}
                                    </div>
                                    {artwork.hasCertificate && artwork.certificateId && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                            {artwork.certificateId}
                                        </p>
                                    )}
                                </div>

                                {/* NFC Status */}
                                <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-black dark:text-white">NFC Tag</span>
                                        {artwork.hasNFC ? (
                                            <div className="flex items-center gap-2">
                                                <Wifi className="h-4 w-4 text-black dark:text-white" />
                                                <span className="text-sm text-black dark:text-white">Connected</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Wifi className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm text-gray-500">Not Connected</span>
                                            </div>
                                        )}
                                    </div>
                                    {artwork.hasNFC && artwork.nfcUid && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                                            {artwork.nfcUid}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Card className="border border-black dark:border-white bg-white dark:bg-black">
                            <CardHeader>
                                <CardTitle className="text-black dark:text-white">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {artwork.hasCertificate ? (
                                    <Button
                                        onClick={onViewCOA}
                                        className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Certificate
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={onGenerateCOA}
                                        className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Generate Certificate
                                    </Button>
                                )}

                                {artwork.hasCertificate && !artwork.hasNFC && (
                                    <Button
                                        onClick={onConnectNFC}
                                        variant="outline"
                                        className="w-full border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                    >
                                        <Wifi className="h-4 w-4 mr-2" />
                                        Connect NFC Tag
                                    </Button>
                                )}

                                {artwork.hasCertificate && (
                                    <Button
                                        variant="outline"
                                        className="w-full border-black dark:border-white text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                    >
                                        <QrCode className="h-4 w-4 mr-2" />
                                        Share Certificate
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkDetails;
