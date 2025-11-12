# Next.js Caching Strategies Demo

This project demonstrates different caching strategies in Next.js 14+ using the App Router. It showcases various data fetching and caching patterns.

## Features

- **Multiple Caching Strategies**:

  - Static Generation (SSG)
  - Server-Side Rendering (SSR)
  - Incremental Static Regeneration (ISR) - 30 seconds
  - ISR with 1-minute revalidation
  - Data Cache (React cache() function)
  - Partial Prerendering (PPR) - Experimental
  - Client-Side Rendering (CSR)

- **Modern Tech Stack**:
  - Next.js 14+ with App Router
  - React 18+
  - TypeScript
  - Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Caching Strategies Explained

### 1. Static Generation (SSG)

**Route**: `/products/static`

- Pages are pre-built at build time
- Served from CDN for fastest performance
- Perfect for content that doesn't change often
- Data is fetched during the build process

### 2. Server-Side Rendering (SSR)

**Route**: `/products/ssr`

- Pages are rendered on each request
- Always shows fresh data
- Slower than static generation
- Great for personalized or frequently changing content
- Uses `dynamic = 'force-dynamic'` to ensure SSR

### 3. Incremental Static Regeneration (ISR) - 30 seconds

**Route**: `/products/isr`

- Static generation with periodic updates
- Uses `revalidate = 30` for 30-second revalidation
- Serves stale content while regenerating in background
- Best of both worlds: performance + freshness

### 4. ISR with 1-Minute Revalidation

**Route**: `/products/isr-1min`

- Similar to 30-second ISR but with longer revalidation period
- Uses `revalidate = 60` for 1-minute revalidation
- Better server performance with slightly less fresh data
- Perfect for content that doesn't need frequent updates
- Good for moderate update frequency scenarios

### 5. Data Cache

**Route**: `/products/datacache`

- Uses React's `cache()` function to cache data fetching results
- Cache is scoped to a single request (server-side)
- Prevents duplicate network requests during server rendering
- Multiple calls to the same cached function return the same result
- Perfect for expensive operations like database queries or API calls

### 6. Partial Prerendering (PPR) - Experimental

**Route**: `/products/ppr`

- Static shell is prerendered at build time for immediate delivery
- Dynamic content is streamed to the client as it becomes ready
- Uses React Suspense boundaries to define dynamic sections
- Combines the benefits of SSG (fast initial load) with SSR (fresh dynamic data)
- Perfect for pages with both static content (product catalog) and personalized content (user info, recommendations)
- Enabled via `experimental.cacheComponents = true` in next.config.js (PPR is now part of cacheComponents)
- Uses hydration-safe patterns for client components to prevent SSR/client mismatches

### 7. Client-Side Rendering (CSR)

**Route**: `/products/client`

- Page shell loads immediately
- Data is fetched in browser after page load
- Highly interactive and dynamic
- SEO considerations (content not immediately available)

## Project Structure

```
├── app/                      # App Router pages (root directory)
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page with strategy overview
│   ├── products/            # Product listing pages
│   │   ├── static/          # SSG example
│   │   ├── ssr/             # SSR example
│   │   ├── isr/             # ISR (30s) example
│   │   ├── isr-1min/        # ISR (1min) example
│   │   ├── datacache/       # Data Cache example
│   │   ├── ppr/             # Partial Prerendering example
│   │   └── client/          # CSR example
│   └── api/                 # API routes
├── components/              # Reusable components
├── lib/                     # Utility functions
├── types/                   # TypeScript definitions
└── src/                     # Alternative source directory (some files)
```

## Key Files

- `next.config.js` - Next.js configuration with experimental.cacheComponents enabled for PPR
- `lib/products.ts` - Mock product data and fetching logic (with static and dynamic variants)
- `app/layout.tsx` - Root layout
- `components/Dynamic*.tsx` - Hydration-safe dynamic components for PPR demo

## Performance Comparison

| Strategy   | Build Time | Runtime Performance | Data Freshness | Use Case             |
| ---------- | ---------- | ------------------- | -------------- | -------------------- |
| SSG        | Longer     | Fastest             | Build-time     | Static content       |
| SSR        | Faster     | Slowest             | Always fresh   | Dynamic content      |
| ISR (30s)  | Longer     | Fast                | 30s periods    | Frequently updated   |
| ISR (1min) | Longer     | Fast                | 60s periods    | Moderately updated   |
| Data Cache | N/A        | Fast                | Per-request    | Expensive operations |
| PPR        | Longer     | Fastest\*           | Mixed          | Static + Dynamic     |
| CSR        | Fastest    | Medium              | Always fresh   | Interactive apps     |

\*PPR provides the fastest initial load (static shell) while still delivering fresh dynamic content

## Caching Headers & Behavior

Each strategy demonstrates different caching behaviors:

- **SSG**: Cached indefinitely until rebuild
- **SSR**: No caching (always fresh)
- **ISR (30s)**: Cached with 30-second revalidation periods
- **ISR (1min)**: Cached with 1-minute revalidation periods
- **Data Cache**: Per-request caching (server-side memory)
- **PPR**: Static shell cached indefinitely, dynamic content fresh per request
- **CSR**: Client-side caching via browser/SWR

## Development Tips

1. **Check Network Tab**: Monitor requests to see caching in action
2. **Build vs Dev**: Some caching behaviors only appear in production
3. **Revalidation**: ISR pages show timestamp changes after revalidation
4. **Price Variations**: Mock data includes random price changes for ISR demo
5. **PPR Demo**: Visit `/products/ppr` to see static shell with streaming dynamic content
6. **Hydration Safety**: Dynamic timestamps use `useEffect` to prevent SSR/client mismatches

## Build and Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

## PPR Implementation Details

### Configuration

```javascript
// next.config.js
experimental: {
  cacheComponents: true, // Enables both 'use cache' directive and PPR
}
```

### Key Components

- **Static Parts**: Use `fetchStaticProducts()` without random values for deterministic builds
- **Dynamic Parts**: Access request data via `headers()` to ensure proper dynamic behavior
- **Client Components**: Use `useEffect` patterns to prevent hydration mismatches

### Troubleshooting PPR

1. **Build Errors**: Ensure static parts don't use `Math.random()` or `Date.now()`
2. **Hydration Errors**: Use `useEffect` for client-side dynamic values
3. **Dynamic Detection**: Access `headers()`, `cookies()`, or `searchParams` in dynamic components

## Learning Resources

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)

## License

This project is for educational purposes to demonstrate Next.js caching strategies.
