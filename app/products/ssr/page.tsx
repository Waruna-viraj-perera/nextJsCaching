import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

import { headers } from "next/headers";

// Server-Side Rendering - Generated on each request
// Using headers() to make this component dynamic instead of export const dynamic

export default async function SSRProductsPage() {
  // Access headers to make this route dynamic (compatible with cacheComponents)
  await headers();

  // This runs on every request
  const products = await fetchProducts(500); // Add delay to simulate database query

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Server-Side Rendering (SSR)
        </h1>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-green-800 mb-2">How it works:</h2>
          <ul className="text-green-700 text-sm space-y-1">
            <li>• Page is rendered on each request</li>
            <li>• Always shows fresh data</li>
            <li>• Slower than static generation</li>
            <li>• Great for personalized or frequently changing content</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="Server-Side Rendering"
          />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>This page was rendered on: {new Date().toLocaleString()}</p>
        <p className="text-sm mt-1">Refresh to see the timestamp change</p>
      </div>
    </div>
  );
}
