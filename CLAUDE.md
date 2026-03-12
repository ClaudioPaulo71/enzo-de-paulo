# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/recruiting website for Enzo De Paulo — a single-page Next.js site with sections for Hero, About, Athletics, Academic, Gallery, and Footer. Dark theme with amber (#f59e0b) accent color on a deep navy (#0a0f1e) background.

## Commands

- `npm run dev` — Start dev server (Next.js)
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config with Next.js core-web-vitals + TypeScript rules)

## Architecture

- **Next.js 16 App Router** with a single route (`app/page.tsx`) that composes all section components
- **`app/layout.tsx`** — Root layout with Geist font family and global metadata
- **`app/globals.css`** — Tailwind v4 import (`@import "tailwindcss"`) plus custom CSS variables and base styles
- **`components/`** — One component per page section, all client components (`"use client"`) using Framer Motion for animations
- **`public/images/`** — Static image assets served directly (football photos, portraits, technical/workshop photos)

## Key Conventions

- **Styling**: Tailwind CSS v4 with PostCSS. Custom theme tokens defined via CSS variables in `globals.css` using `@theme inline`.
- **Path alias**: `@/*` maps to project root (e.g., `@/components/Navbar`)
- **Images**: Use `next/image` with images from `public/images/`. Gallery component has its own photo manifest with category filtering (Football, Personal, Technical).
- **Animations**: Framer Motion (`motion`, `AnimatePresence`) used throughout all section components for scroll-triggered and entrance animations.
- **Navigation**: Smooth-scroll anchor links between sections (`#about`, `#athletics`, `#academic`, `#gallery`). Each section has a matching `id` attribute.
