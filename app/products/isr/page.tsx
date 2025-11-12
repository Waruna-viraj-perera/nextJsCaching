import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

// Incremental Static Regeneration - Static with periodic updates
// This page will be statically generated but will regenerate every 30 seconds when requested
export const revalidate = 30; // Revalidate every 30 seconds

export default async function ISRProductsPage() {
  // This runs at build time and then every 30 seconds when requested
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Incremental Static Regeneration (ISR)
        </h1>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-purple-800 mb-2">How it works:</h2>
          <ul className="text-purple-700 text-sm space-y-1">
            <li>• Page is statically generated at build time</li>
            <li>• Regenerates in the background every 30 seconds</li>
            <li>• Serves stale content while regenerating</li>
            <li>• Best of both worlds: fast + fresh data</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="ISR (30s revalidation)"
          />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>This page was generated at: {new Date().toLocaleString()}</p>
        <p className="text-sm mt-1">
          Content updates every 30 seconds in the background
        </p>
        <p className="text-sm">Notice price variations between refreshes</p>
        <div className="mt-4">
          <Link
            href="/products/isr-1min"
            className="text-emerald-600 hover:text-emerald-700 text-sm underline"
          >
            Compare with 1-minute ISR →
          </Link>
        </div>
      </div>
    </div>
  );
}
