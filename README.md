# Next.js Caching Strategies - Developer Guide

**A comprehensive guide to modern caching patterns in Next.js 14+**

This project demonstrates advanced caching strategies that every Next.js developer should master. Focus on **ISR**, **Use Cache**, and **Partial Pre-rendering (PPR)** for optimal performance.

## 🎯 Why This Guide Matters

Modern web applications demand both **speed** and **freshness**. This guide shows you how to:

- ⚡ Deliver instant page loads with static generation
- 🔄 Keep content fresh with smart revalidation
- 🎪 Stream dynamic content while serving static shells
- 💾 Cache expensive operations efficiently

## 🚀 Key Strategies (Start Here)

### 1. Incremental Static Regeneration (ISR) ⭐

**The sweet spot between static and dynamic**

```typescript
// 30-second revalidation
export const revalidate = 30;

// 1-minute revalidation for better performance
export const revalidate = 60;
```

**Live Examples:**

- `/products/isr` - 30-second updates
- `/products/isr-1min` - 1-minute updates

**When to use:** Product catalogs, blog posts, news feeds - content that changes periodically but doesn't need real-time updates.

### 2. Use Cache Directive ⭐

**Eliminate redundant server operations**

```typescript
"use cache";

export async function getExpensiveData() {
  // This function result is cached across the module
  return await database.query(complexQuery);
}
```

**Live Example:** `/products/use-cache`

**When to use:** Database queries, API calls, expensive computations that can be safely cached.

### 3. Partial Pre-rendering (PPR) ⭐

**The future of web performance**

```tsx
// Static shell loads instantly
export default function Page() {
  return (
    <div>
      <StaticContent />
      <Suspense fallback={<Loading />}>
        <DynamicContent />
      </Suspense>
    </div>
  );
}
```

**Live Example:** `/products/ppr`

**When to use:** E-commerce pages, dashboards - anywhere you have static layout with personalized content.

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- Basic Next.js knowledge

### Setup

```bash
git clone <repository>
cd nextjscaching
npm install
npm run dev
```

**Visit your development server and explore each strategy!**

## 📚 Complete Strategy Reference

### Static Generation (SSG)

**Foundation strategy - blazing fast**

```typescript
// Automatically static if no dynamic functions
export default async function Page() {
  const data = await fetch("api/static-data");
  return <ProductList data={data} />;
}
```

**Example:** `/products/static`
**Use case:** Landing pages, documentation, any content that rarely changes

### Server-Side Rendering (SSR)

**Always fresh, always slow**

```typescript
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await fetch("api/dynamic-data");
  return <PersonalizedContent data={data} />;
}
```

**Example:** `/products/ssr`
**Use case:** Highly personalized content, admin dashboards

### Incremental Static Regeneration (ISR) 🌟

**The developer's best friend**

**30-Second Revalidation:**

```typescript
export const revalidate = 30;

export default async function Page() {
  const products = await fetchProducts();
  return <ProductGrid products={products} />;
}
```

**Example:** `/products/isr`

**1-Minute Revalidation:**

```typescript
export const revalidate = 60; // Better server performance
```

**Example:** `/products/isr-1min`

**💡 Pro Tips:**

- Use 30s for frequently updated content (stock prices, news)
- Use 60s+ for better server performance (product catalogs)
- Perfect for content that updates regularly but not in real-time

### Data Cache with React cache() 🌟

**Eliminate duplicate operations**

```typescript
import { cache } from "react";

const getUser = cache(async (id: string) => {
  console.log("This only runs once per request!");
  return await database.user.findUnique({ where: { id } });
});

// Multiple calls return cached result
const user1 = await getUser("123");
const user2 = await getUser("123"); // Returns cached result
```

**Example:** `/products/datacache`

### 'use cache' Directive 🌟

**Module-level caching magic**

```typescript
"use cache";

export async function getExpensiveData() {
  // Automatically cached across the module
  const result = await complexDatabaseQuery();
  return result;
}
```

**Example:** `/products/use-cache`

**🎯 Where to Use "use cache":**

**✅ Perfect Use Cases:**

- **Database queries** that don't change often (user profiles, settings)
- **API calls** to external services with stable data
- **File system operations** (reading config files, static assets)
- **Expensive computations** (image processing, calculations)
- **Static content generation** (markdown parsing, syntax highlighting)

**❌ Don't Use For:**

- **User-specific data** that varies per request
- **Real-time data** that changes frequently
- **Authentication-dependent** operations
- **Side effects** (writing to database, sending emails)

**💡 Real-World Examples:**

```typescript
// ✅ Good - Static configuration
"use cache";
export async function getAppConfig() {
  return await fs.readFile("config.json", "utf-8");
}

// ✅ Good - Product catalog
("use cache");
export async function getProducts() {
  return await db.products.findMany({ where: { active: true } });
}

// ❌ Bad - User-specific data
("use cache");
export async function getUserCart(userId: string) {
  // Don't cache - this varies per user!
  return await db.cart.findUnique({ where: { userId } });
}

// ✅ Good - Expensive computation
("use cache");
export async function generateSitemap() {
  const pages = await getAllPages();
  return generateXMLSitemap(pages); // Expensive operation
}
```

### Partial Pre-rendering (PPR) 🌟

**The holy grail of performance**

```typescript
// next.config.js
experimental: {
  cacheComponents: true; // Enables PPR
}
```

```tsx
export default function Page() {
  return (
    <div>
      {/* Static - prerendered at build time */}
      <Header />
      <ProductCatalog />

      {/* Dynamic - streamed on request */}
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile />
      </Suspense>

      <Suspense fallback={<RecsSkeleton />}>
        <PersonalizedRecommendations />
      </Suspense>
    </div>
  );
}
```

**Example:** `/products/ppr`

**Key Benefits:**

- ⚡ Static shell loads instantly (prerendered)
- 🔄 Dynamic content streams in as ready
- 🎯 Best of both static and dynamic worlds

### Client-Side Rendering (CSR)

**For highly interactive apps**

```typescript
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return <InteractiveComponent data={data} />;
}
```

**Example:** `/products/client`
**Use case:** Dashboards, real-time apps, highly interactive UIs

## 🎯 Implementation Guide

### Setting Up ISR

```typescript
// app/products/page.tsx
export const revalidate = 60; // Revalidate every minute

export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductGrid products={products} />;
}
```

### Setting Up PPR

```javascript
// next.config.js
const nextConfig = {
  experimental: {
    cacheComponents: true, // Enables PPR + 'use cache'
  },
};
```

```tsx
// app/dashboard/page.tsx
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div>
      {/* Static - loads instantly */}
      <Navigation />
      <Sidebar />

      {/* Dynamic - streams in */}
      <Suspense fallback={<Skeleton />}>
        <UserData />
      </Suspense>
    </div>
  );
}
```

### Setting Up Use Cache

```typescript
// lib/data.ts
"use cache";

export async function getUserProfile(id: string) {
  // Cached automatically across the module
  return await db.user.findUnique({ where: { id } });
}
```

**🔧 Advanced "use cache" Patterns:**

```typescript
// Pattern 1: Static data that rarely changes
"use cache";
export async function getCategories() {
  console.log("Fetching categories..."); // Only runs once
  return await db.categories.findMany();
}

// Pattern 2: Expensive transformations
("use cache");
export async function getProcessedMarkdown(slug: string) {
  const content = await fs.readFile(`posts/${slug}.md`, "utf-8");
  return await markdownProcessor.process(content); // Expensive!
}

// Pattern 3: External API calls
("use cache");
export async function getExchangeRates() {
  const response = await fetch("https://api.exchange.com/rates");
  return response.json(); // Cache API responses
}
```

**⚡ Performance Benefits:**

- Eliminates duplicate expensive operations
- Reduces database load
- Speeds up page generation
- Works across your entire module automatically

## 🚨 Common Pitfalls & Solutions

### ISR Issues

❌ **Don't:** Use random values in ISR pages

```typescript
// This breaks ISR!
const randomPrice = Math.random() * 100;
```

✅ **Do:** Keep ISR pages deterministic

```typescript
// This works with ISR
const products = await fetchStaticProducts();
```

### PPR Issues

❌ **Don't:** Use `new Date()` in static parts

```typescript
// This makes everything dynamic!
<p>Generated at: {new Date().toString()}</p>
```

✅ **Do:** Use client components for dynamic timestamps

```tsx
"use client";
export function Timestamp() {
  const [time, setTime] = useState("");
  useEffect(() => setTime(new Date().toString()), []);
  return <p>Generated at: {time}</p>;
}
```

### Cache Issues

❌ **Don't:** Cache user-specific data globally

```typescript
const getUserData = cache(async (userId) => {
  // Don't cache across users!
});
```

✅ **Do:** Cache expensive operations safely

```typescript
const getPublicConfig = cache(async () => {
  // Safe to cache across requests
});
```

### "use cache" Issues

❌ **Don't:** Use with user-specific operations

```typescript
"use cache";
export async function getUserDashboard(userId: string) {
  // BAD! This will cache the first user's data for everyone
  return await buildUserDashboard(userId);
}
```

✅ **Do:** Use for shared, static operations

```typescript
"use cache";
export async function getPublicSettings() {
  // GOOD! Same for all users
  return await db.settings.findFirst({ where: { public: true } });
}
```

❌ **Don't:** Use with side effects

```typescript
"use cache";
export async function sendWelcomeEmail(email: string) {
  // BAD! This is a side effect, not cacheable data
  await emailService.send(email, "welcome");
}
```

## 📊 Performance Decision Matrix

| Content Type    | Update Frequency | User Specific | Recommended Strategy |
| --------------- | ---------------- | ------------- | -------------------- |
| Landing Page    | Never            | No            | **SSG**              |
| Product Catalog | Daily            | No            | **ISR (60s)**        |
| News Feed       | Hourly           | No            | **ISR (30s)**        |
| User Dashboard  | Real-time        | Yes           | **PPR**              |
| Admin Panel     | Real-time        | Yes           | **SSR**              |
| Interactive App | N/A              | Yes           | **CSR**              |

## 🔧 Project Structure & Examples

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

## 📚 Learning Resources

### 🚀 Essential Next.js Caching Docs

- **[ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#time-based-revalidation)** - Master Incremental Static Regeneration
- **[Use Cache Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)** - Module-level caching patterns
- **[Partial Pre-rendering](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering)** - PPR configuration and usage
- **[React cache() API](https://nextjs.org/docs/app/building-your-application/caching#react-cache-function)** - Request-scoped caching

### 🛠️ Implementation Guides

- **[Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching)** - Complete fetching strategies
- **[Caching Overview](https://nextjs.org/docs/app/building-your-application/caching)** - Full caching ecosystem
- **[App Router Migration](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)** - Migrating from Pages Router

### 💡 In This Project

- **ISR Examples:** `/products/isr` + `/products/isr60`
- **Use Cache Demo:** `/products/use-cache`
- **PPR Implementation:** `/products/ppr`
- **React cache():** `/products/datacache`

### 🎯 Advanced Topics

- **[Streaming & Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)**
- **[Edge Runtime](https://nextjs.org/docs/app/api-reference/edge)**
- **[Performance Monitoring](https://nextjs.org/docs/app/building-your-application/optimizing)**

> 💡 **Pro Tip:** Start with ISR for content sites, add PPR for user dashboards, and use 'use cache' for expensive computations!

## License

This project is for educational purposes to demonstrate Next.js caching strategies.
