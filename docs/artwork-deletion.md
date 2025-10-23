# Artwork Deletion Process

## Overview

The artwork deletion process in Aether is designed to safely remove artworks and all their associated data while maintaining data integrity and providing a good user experience.

## Components Involved

### 1. Database Schema
- **Cascade Deletes**: The database schema includes `ON DELETE CASCADE` constraints for related tables:
  - `certificates` → `artworks`
  - `nfc_tags` → `artworks` 
  - `verification_levels` → `artworks`
  - `artworks` → `auth.users`

### 2. Service Layer (`ArtworkService.deleteArtwork`)
- **Authentication Check**: Verifies user is authenticated
- **Data Retrieval**: Gets artwork data before deletion (for image cleanup)
- **Database Deletion**: Deletes artwork record (triggers cascade deletes)
- **Storage Cleanup**: Attempts to delete associated image from Supabase Storage
- **Error Handling**: Gracefully handles storage deletion failures

### 3. UI Components

#### Artworks List (`Artworks.tsx`)
- **Delete Button**: Red trash icon button on each artwork card
- **Confirmation Dialog**: AlertDialog with artwork details and warnings
- **State Management**: Updates local state after successful deletion
- **Loading States**: Disables delete button during deletion process

#### Artwork Details (`ArtworkDetails.tsx`)
- **Delete Button**: Red delete button in actions section
- **Confirmation Dialog**: Same AlertDialog component with artwork context
- **Navigation**: Automatically returns to artworks list after deletion

### 4. User Experience Features

#### Confirmation Dialog
- **Artwork Title**: Shows which artwork will be deleted
- **Warning Messages**: Alerts about certificates and NFC tags being deleted
- **Action Buttons**: Cancel (safe) and Delete (destructive) options
- **Visual Design**: Red styling for destructive actions

#### State Management
- **Local Updates**: Immediately removes artwork from UI after deletion
- **Selection Clearing**: Clears selected artwork if it was deleted
- **Error Handling**: Shows error messages if deletion fails

## Data Deletion Flow

1. **User Action**: User clicks delete button
2. **Confirmation**: User confirms deletion in dialog
3. **Authentication**: Service verifies user ownership
4. **Database Deletion**: Artwork record deleted (cascades to related data)
5. **Storage Cleanup**: Associated image file deleted from storage
6. **UI Update**: Artwork removed from interface
7. **Navigation**: User returned to appropriate view

## Security Considerations

- **User Ownership**: Only artwork owners can delete their artworks
- **Authentication Required**: All deletion operations require valid user session
- **Database Constraints**: RLS policies prevent unauthorized access
- **Cascade Protection**: Related data automatically cleaned up

## Error Handling

- **Network Errors**: User sees error message, artwork remains
- **Storage Errors**: Logged but don't prevent deletion
- **Authentication Errors**: User redirected to login
- **Database Errors**: Detailed error messages shown to user

## Testing

The deletion process includes comprehensive tests covering:
- Successful deletion with image cleanup
- Deletion without images
- Storage deletion failures
- Authentication edge cases

## Future Enhancements

- **Soft Delete**: Option to restore deleted artworks
- **Bulk Deletion**: Delete multiple artworks at once
- **Audit Trail**: Log deletion events for compliance
- **Backup**: Automatic backup before deletion
