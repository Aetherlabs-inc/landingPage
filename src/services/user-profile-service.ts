import { createClient } from '@/src/lib/supabase';

export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    user_type: 'artist' | 'gallery' | 'collector';
    bio: string | null;
    website: string | null;
    location: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserProfileUpdate {
    full_name?: string | null;
    avatar_url?: string | null;
    user_type?: 'artist' | 'gallery' | 'collector';
    bio?: string | null;
    website?: string | null;
    location?: string | null;
    phone?: string | null;
}

export interface UserStats {
    artworks_count: number;
    certificates_count: number;
    collections_count: number;
}

class UserProfileService {
    private supabase = createClient();

    /**
     * Get user profile by user ID
     */
    async getUserProfile(userId: string): Promise<UserProfile | null> {
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    // No profile found, return null
                    return null;
                }
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }

    /**
     * Create or update user profile
     */
    async upsertUserProfile(profile: UserProfile): Promise<UserProfile> {
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .upsert(profile, {
                    onConflict: 'id'
                })
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error upserting user profile:', error);
            throw error;
        }
    }

    /**
     * Update user profile
     */
    async updateUserProfile(userId: string, updates: UserProfileUpdate): Promise<UserProfile> {
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    /**
     * Delete user profile
     */
    async deleteUserProfile(userId: string): Promise<void> {
        try {
            const { error } = await this.supabase
                .from('user_profiles')
                .delete()
                .eq('id', userId);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting user profile:', error);
            throw error;
        }
    }

    /**
     * Upload avatar image
     */
    async uploadAvatar(userId: string, file: File): Promise<string> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            console.log('Uploading avatar to path:', filePath);

            // Upload file to storage
            const { error: uploadError } = await this.supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    upsert: true // Replace existing file
                });

            if (uploadError) {
                console.error('Avatar upload error:', uploadError);
                throw uploadError;
            }

            console.log('Avatar uploaded successfully');

            // Get public URL
            const { data } = this.supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            console.log('Generated avatar URL:', data.publicUrl);
            return data.publicUrl;
        } catch (error) {
            console.error('Error uploading avatar:', error);
            throw error;
        }
    }

    /**
     * Delete avatar image
     */
    async deleteAvatar(userId: string): Promise<void> {
        try {
            const filePath = `avatars/${userId}`;

            const { error } = await this.supabase.storage
                .from('avatars')
                .remove([filePath]);

            if (error) throw error;
        } catch (error) {
            console.error('Error deleting avatar:', error);
            throw error;
        }
    }

    /**
     * Get user statistics
     */
    async getUserStats(userId: string): Promise<UserStats> {
        try {
            // Get artworks count
            const { count: artworksCount } = await this.supabase
                .from('artworks')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId);

            // Get certificates count (through artworks)
            const { count: certificatesCount } = await this.supabase
                .from('certificates')
                .select(`
          *,
          artworks!inner(user_id)
        `, { count: 'exact', head: true })
                .eq('artworks.user_id', userId);

            // For now, collections count is 0 (no collections table yet)
            const collectionsCount = 0;

            return {
                artworks_count: artworksCount || 0,
                certificates_count: certificatesCount || 0,
                collections_count: collectionsCount
            };
        } catch (error) {
            console.error('Error fetching user stats:', error);
            throw error;
        }
    }

    /**
     * Search users by name or email
     */
    async searchUsers(query: string, limit: number = 10): Promise<UserProfile[]> {
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
                .limit(limit);

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Error searching users:', error);
            throw error;
        }
    }

    /**
     * Get users by type
     */
    async getUsersByType(userType: 'artist' | 'gallery' | 'collector', limit: number = 20): Promise<UserProfile[]> {
        try {
            const { data, error } = await this.supabase
                .from('user_profiles')
                .select('*')
                .eq('user_type', userType)
                .limit(limit);

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Error fetching users by type:', error);
            throw error;
        }
    }

    /**
     * Create initial profile from auth user
     */
    async createInitialProfile(userId: string, email: string, metadata?: any): Promise<UserProfile> {
        try {
            const initialProfile: UserProfile = {
                id: userId,
                email,
                full_name: metadata?.full_name || null,
                avatar_url: metadata?.avatar_url || null,
                user_type: 'artist',
                bio: null,
                website: null,
                location: null,
                phone: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            return await this.upsertUserProfile(initialProfile);
        } catch (error) {
            console.error('Error creating initial profile:', error);
            throw error;
        }
    }
}

export const userProfileService = new UserProfileService();
