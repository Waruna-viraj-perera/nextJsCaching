import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Next.js Caching Demo
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore different caching strategies in Next.js with this
          demonstration application
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Static Generation */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Static Generation (SSG)
          </h2>
          <p className="text-gray-600 mb-4">
            Pre-built at build time. Fastest loading, great for product
            catalogs.
          </p>
          <Link href="/products/static" className="btn btn-primary">
            View Static Products
          </Link>
        </div>

        {/* Server-Side Rendering */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Server-Side Rendering (SSR)
          </h2>
          <p className="text-gray-600 mb-4">
            Generated on each request. Always fresh data, slower loading.
          </p>
          <Link href="/products/ssr" className="btn btn-primary">
            View SSR Products
          </Link>
        </div>

        {/* Incremental Static Regeneration */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Incremental Static Regeneration (ISR)
          </h2>
          <p className="text-gray-600 mb-4">
            Static with periodic updates. Best of both worlds.
          </p>
          <Link href="/products/isr" className="btn btn-primary">
            View ISR (30s)
          </Link>
        </div>

        {/* ISR 1 Minute */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            ISR (1-Minute Revalidation)
          </h2>
          <p className="text-gray-600 mb-4">
            Longer revalidation period. Less server load, slightly older data.
          </p>
          <Link href="/products/isr-1min" className="btn btn-primary">
            View ISR (1min)
          </Link>
        </div>

        {/* Data Cache */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Data Cache
          </h2>
          <p className="text-gray-600 mb-4">
            Cache function results per request. Prevents duplicate fetches.
          </p>
          <Link href="/products/datacache" className="btn btn-primary">
            View Data Cache
          </Link>
        </div>

        {/* 'use cache' Directive */}
        <div className="card p-6 border-2 border-primary-200">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            'use cache' Directive
          </h2>
          <p className="text-gray-600 mb-4">
            <span className="bg-yellow-100 px-2 py-1 rounded text-sm font-semibold">
              NEW
            </span>{" "}
            Module-level caching in Next.js 15+. Automatic function caching.
          </p>
          <Link href="/products/use-cache" className="btn btn-primary">
            View 'use cache'
          </Link>
        </div>

        {/* Partial Prerendering */}
        <div className="card p-6 border-2 border-indigo-200">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Partial Prerendering (PPR)
          </h2>
          <p className="text-gray-600 mb-4">
            <span className="bg-blue-100 px-2 py-1 rounded text-sm font-semibold">
              EXPERIMENTAL
            </span>{" "}
            Static shell with dynamic streaming. Best of all worlds.
          </p>
          <Link href="/products/ppr" className="btn btn-primary">
            View PPR Demo
          </Link>
        </div>

        {/* Client-Side Rendering */}
        <div className="card p-6">
          <h2 className="text-2xl font-semibold mb-4 text-primary-600">
            Client-Side Rendering (CSR)
          </h2>
          <p className="text-gray-600 mb-4">
            Rendered in the browser. Interactive, but slower initial load.
          </p>
          <Link href="/products/client" className="btn btn-primary">
            View Client Products
          </Link>
        </div>
      </div>

      {/* Caching Info */}
      <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Caching Strategies Explained
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Static Generation (SSG)
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Pages pre-built at build time</li>
              <li>Served from CDN</li>
              <li>Fastest performance</li>
              <li>Best for content that doesn't change often</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Server-Side Rendering (SSR)
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Generated on each request</li>
              <li>Always up-to-date data</li>
              <li>Slower than SSG</li>
              <li>Good for personalized content</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Incremental Static Regeneration (ISR)
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Static generation with periodic updates</li>
              <li>Revalidate after specified time (30s or 60s)</li>
              <li>Best of both worlds</li>
              <li>Perfect for semi-dynamic content</li>
              <li>Longer intervals = better performance, less fresh data</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Data Cache</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Caches function results per request</li>
              <li>Prevents duplicate data fetching</li>
              <li>Uses React's cache() function</li>
              <li>Great for expensive operations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              'use cache' Directive{" "}
              <span className="text-sm bg-yellow-100 px-2 py-1 rounded">
                NEW
              </span>
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Module-level automatic caching</li>
              <li>Caches all exports in the module</li>
              <li>Reduces server-side computation</li>
              <li>Available in Next.js 15+</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Partial Prerendering (PPR){" "}
              <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                EXPERIMENTAL
              </span>
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Static shell prerendered at build time</li>
              <li>Dynamic content streamed on request</li>
              <li>Uses React Suspense boundaries</li>
              <li>Best performance for mixed content</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Client-Side Rendering (CSR)
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Rendered in the browser</li>
              <li>Highly interactive</li>
              <li>SEO considerations</li>
              <li>Good for dashboards and apps</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
