# Gistup Marketing Website

Production-ready Next.js marketing website with TypeScript and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **CDN**: Cloudflare (in front of Vercel)
- **CI**: GitHub Actions

## Project Structure

```
gistup-marketing/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Home page
│   ├── pricing/           # Pricing page
│   ├── faq/               # FAQ page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy Policy page
│   ├── terms/             # Terms of Service page
│   └── globals.css        # Global styles with Tailwind directives
├── components/            # Reusable React components
│   ├── Header.tsx        # Site header with navigation
│   └── Footer.tsx        # Site footer with legal links
├── .github/
│   └── workflows/
│       └── ci.yml        # CI pipeline (lint + build only)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── next.config.ts        # Next.js configuration
└── eslint.config.mjs     # ESLint configuration
```

## Layout Architecture

The global layout uses a **safe, flexible design** that prevents layout issues:

- `<body>` has `min-h-screen flex flex-col`
- `<main>` has `flex-1` to fill available space
- Footer is in normal document flow (not fixed/absolute)
- Long content pages scroll naturally without overlap

This ensures the footer always appears at the bottom on short pages and scrolls naturally on long pages.

## Routes

All routes are placeholder shells ready for content:

- `/` - Home
- `/pricing` - Pricing
- `/faq` - FAQ
- `/contact` - Contact
- `/privacy` - Privacy Policy
- `/terms` - Terms of Service

## Deployment Model

**Single Environment: Production**

- Deployment happens **only** via Vercel on merges to `main`
- GitHub Actions **does not deploy** - it only validates code quality
- No dev/test environments
- Cloudflare sits in front of Vercel for DNS and CDN

### Deployment Flow

1. Developer creates a pull request
2. GitHub Actions runs CI (lint + build)
3. After approval and merge to `main`, Vercel automatically deploys to production
4. Cloudflare serves the production site

## CI Pipeline

GitHub Actions workflow runs on:
- Pull requests to `main`
- Pushes to `main`

The CI pipeline:
1. Installs dependencies with `npm ci`
2. Runs ESLint with `npm run lint`
3. Builds the project with `npm run build`
4. Fails fast on any errors

**Purpose**: Protect production by ensuring only valid code is merged.

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens development server at [http://localhost:3000](http://localhost:3000)

### Linting

```bash
npm run lint
```

### Build

```bash
npm run build
```

Builds the production-ready application.

### Production Server

```bash
npm start
```

Runs the built application in production mode.

## Configuration

### Vercel Setup

1. Connect this repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm ci`
3. Set environment variables (if needed)
4. Enable automatic deployments on `main` branch

### Cloudflare Setup

1. Add domain to Cloudflare
2. Point DNS to Vercel's nameservers or use CNAME
3. Configure SSL/TLS to Full (strict)
4. Enable Auto Minify, Brotli, and HTTP/3 for performance

## Constraints

This scaffold is intentionally minimal and production-focused:

- No feature implementations
- No animations
- No analytics
- No authentication
- No backend APIs
- No CMS integrations
- No unnecessary dependencies

The codebase is ready to be handed over to autonomous development tools (e.g., Manus) for feature implementation.

## Development Guidelines

- Use TypeScript strictly
- Follow Next.js App Router conventions
- Use Tailwind utility classes for styling
- Avoid hardcoded heights or viewport values
- Keep footer in document flow (never fixed/absolute)
- Test responsive layouts on mobile and desktop

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)