'use client'

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { userProfileService, UserProfile, UserStats } from '@/src/services/user-profile-service';
import { ArtworkService } from '@/src/services/artwork-service';
import { ArtworkWithDetails } from '@/src/types/database';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share2, MapPin, Globe, Shield, Image as ImageIcon, FileText, Grid3x3, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NextImage from 'next/image';

export default function PublicProfilePage() {
    const params = useParams();
    const router = useRouter();
    const identifier = params?.userId as string;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [artworks, setArtworks] = useState<ArtworkWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (identifier) {
            fetchProfile();
        }
    }, [identifier]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch profile first
            const profileData = await userProfileService.getPublicProfile(identifier);

            if (!profileData) {
                setError('Profile not found');
                return;
            }

            // If accessed via UUID but user has a username, redirect to /a/username URL
            const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
            if (isUUID && profileData.username) {
                router.replace(`/a/${profileData.username}`);
                return;
            }

            // Check profile visibility
            if (profileData.profile_visibility === 'private') {
                setError('This profile is private');
                return;
            }

            setProfile(profileData);

            // Fetch stats and artworks using the profile ID
            const [statsData, artworksData] = await Promise.all([
                userProfileService.getPublicStats(profileData.id),
                ArtworkService.getPublicArtworks(profileData.id)
            ]);

            setStats(statsData);
            setArtworks(artworksData);
        } catch (err) {
            console.error('Error fetching profile:', err);
            setError(err instanceof Error ? err.message : 'Failed to load profile');
            toast({
                title: "Error",
                description: "Failed to load profile",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        // Always use username for share links (cleaner URLs)
        if (!profile || !profile.username) {
            toast({
                title: "Cannot Share",
                description: "Please set a username in your profile settings to share your profile",
                variant: "destructive",
            });
            return;
        }

        const url = `${window.location.origin}/a/${profile.username}`;
        try {
            await navigator.clipboard.writeText(url);
            toast({
                title: "Link copied!",
                description: "Profile link has been copied to clipboard",
            });
        } catch (err) {
            console.error('Failed to copy:', err);
            toast({
                title: "Error",
                description: "Failed to copy link",
                variant: "destructive",
            });
        }
    };

    const getInitials = (name: string | null) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getUserTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            artist: 'Artist',
            gallery: 'Gallery',
            collector: 'Collector'
        };
        return labels[type] || type;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Profile Not Found</h1>
                    <p className="text-muted-foreground">{error || 'The profile you are looking for does not exist.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section - Instagram-like */}
            <div className="border-b border-border bg-card">
                <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
                                <AvatarImage src={profile.avatar_url || undefined} alt={profile.full_name || 'User'} />
                                <AvatarFallback className="text-2xl md:text-3xl">
                                    {getInitials(profile.full_name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <h1 className="text-2xl md:text-3xl font-semibold">
                                    {profile.full_name || 'Anonymous User'}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary">{getUserTypeLabel(profile.user_type)}</Badge>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleShare}
                                        className="gap-2"
                                    >
                                        <Share2 className="h-4 w-4" />
                                        Share
                                    </Button>
                                </div>
                            </div>

                            {/* Stats */}
                            {stats && (
                                <div className="flex gap-6 md:gap-8">
                                    <div className="text-center">
                                        <div className="text-xl md:text-2xl font-semibold">{stats.artworks_count}</div>
                                        <div className="text-sm text-muted-foreground">Artworks</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl md:text-2xl font-semibold">{stats.certificates_count}</div>
                                        <div className="text-sm text-muted-foreground">Certificates</div>
                                    </div>
                                </div>
                            )}

                            {/* Bio and Details */}
                            <div className="space-y-2">
                                {profile.bio && (
                                    <p className="text-foreground">{profile.bio}</p>
                                )}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    {profile.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            <span>{profile.location}</span>
                                        </div>
                                    )}
                                    {profile.website && (
                                        <a
                                            href={profile.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                                        >
                                            <Globe className="h-4 w-4" />
                                            <span>Website</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Artworks Grid - Instagram-style */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {artworks.length === 0 ? (
                    <div className="text-center py-16">
                        <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground">No artworks to display</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {artworks.map((artwork) => {
                            const hasCertificate = artwork.certificates && artwork.certificates.length > 0;
                            const hasNFC = artwork.nfc_tags && artwork.nfc_tags.some(tag => tag.is_bound);

                            return (
                                <Card
                                    key={artwork.id}
                                    className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-muted">
                                        <NextImage
                                            src={artwork.image_url || '/placeholder-artwork.jpg'}
                                            alt={artwork.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="flex items-center gap-4 text-white">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-5 w-5" />
                                                    <span className="text-sm font-medium">View</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Badges */}
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            {hasCertificate && (
                                                <Badge className="bg-primary/90 text-primary-foreground">
                                                    <Shield className="h-3 w-3 mr-1" />
                                                </Badge>
                                            )}
                                            {hasNFC && (
                                                <Badge variant="secondary" className="bg-secondary/90">
                                                    <Grid3x3 className="h-3 w-3 mr-1" />
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="p-3">
                                        <h3 className="font-medium text-sm line-clamp-1">{artwork.title}</h3>
                                        <p className="text-xs text-muted-foreground line-clamp-1">{artwork.artist}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

