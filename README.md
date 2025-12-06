# AetherLabs Landing Page

Public-facing marketing website for AetherLabs - Art Authentication Platform.

## Overview

This repository contains the landing page and public profile viewing functionality for AetherLabs.

## Features

- **Landing Page**: Marketing site with hero, features, pricing, FAQ, and more
- **Public Profiles**: View artist/collector/gallery profiles at `/a/[username]`
- **Legal Pages**: Terms, Privacy Policy, Cookies
- **Survey & Waitlist**: User engagement features

**Note**: Authentication (login/signup) and dashboard functionality are handled by separate repositories.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- React 18
- Tailwind CSS
- shadcn/ui components
- Supabase (for public profile data)
- Three.js (for animations)

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  (LandingPage)/     # Landing page routes
  a/[username]/      # Public profile pages
  profile/[userId]/  # Profile redirect
  privacy/           # Legal pages
  terms/
  cookies/
  survey/            # Survey page
  waitlist/          # Waitlist page

src/
  LandingPage/       # Landing page components
  NavBar/            # Navigation
  Footer/            # Footer
  lib/               # Supabase client
  services/          # Public profile services
  types/             # TypeScript types

components/          # Shared UI components
public/              # Static assets
```

## Deployment

This is a public-facing site and can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service
