import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

// Incremental Static Regeneration with 1-minute revalidation
// This page will be statically generated but will regenerate every minute when requested
export const revalidate = 60; // Revalidate every 60 seconds (1 minute)

export default async function ISR1MinProductsPage() {
  // This runs at build time and then every minute when requested
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ISR with 1-Minute Revalidation
        </h1>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-emerald-800 mb-2">How it works:</h2>
          <ul className="text-emerald-700 text-sm space-y-1">
            <li>• Page is statically generated at build time</li>
            <li>• Regenerates in the background every 60 seconds (1 minute)</li>
            <li>• Serves stale content while regenerating</li>
            <li>
              • Longer revalidation period = better performance, less fresh data
            </li>
            <li>
              • Perfect for content that changes moderately (e.g., stock prices,
              news)
            </li>
          </ul>
        </div>

        {/* Comparison with 30-second ISR */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">
            Comparison: 30s vs 1min Revalidation
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-700 mb-1">30-second ISR:</h4>
              <ul className="text-blue-600 space-y-1">
                <li>• Updates every 30 seconds</li>
                <li>• More server load</li>
                <li>• Fresher data</li>
                <li>• Good for frequently changing content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-700 mb-1">1-minute ISR:</h4>
              <ul className="text-blue-600 space-y-1">
                <li>• Updates every 60 seconds</li>
                <li>• Less server load</li>
                <li>• Slightly older data (max 1 min)</li>
                <li>• Better for moderate update frequency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="ISR (60s revalidation)"
          />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>This page was generated at: {new Date().toLocaleString()}</p>
        <p className="text-sm mt-1">
          Content updates every 60 seconds (1 minute) in the background
        </p>
        <div className="mt-4">
          <Link
            href="/products/isr"
            className="text-purple-600 hover:text-purple-700 text-sm underline"
          >
            Compare with 30-second ISR →
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">
          Use Cases for 1-Minute ISR
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Good For:</h4>
            <ul className="space-y-1">
              <li>• Product catalogs with occasional updates</li>
              <li>• Blog posts with view counts</li>
              <li>• Stock prices (non-real-time)</li>
              <li>• Weather updates</li>
              <li>• Social media feeds</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Consider Alternatives For:
            </h4>
            <ul className="space-y-1">
              <li>• Real-time chat applications (use CSR/SSR)</li>
              <li>• Live sports scores (use shorter revalidation)</li>
              <li>• User-specific content (use SSR)</li>
              <li>• Completely static content (use SSG)</li>
              <li>• Highly dynamic content (use SSR)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
