import ProductCard from "../../../components/ProductCard";
import { unstable_cache } from "next/cache";

// Incremental Static Regeneration with 1-minute revalidation
// Using unstable_cache with revalidate instead of export const revalidate (compatible with cacheComponents)

// Cache function with 60-second revalidation
const fetchProducts = unstable_cache(
  async () => {
    console.log("ISR 1min: Fetching products at", new Date().toISOString());

    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
  ["isr-products-60s"],
  { revalidate: 60 } // 60 seconds (1 minute) revalidation
);

export default async function ISR1MinProductsPage() {
  // This uses cached data that revalidates every 60 seconds
  console.log("ISR 1min: Generating page at", new Date().toISOString());

  try {
    // Use the cached function instead of direct fetch
    const products = await fetchProducts();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Incremental Static Regeneration (1 Minute)
          </h1>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-2">
              Extended ISR Caching Strategy
            </h2>
            <p className="text-green-700 mb-4">
              This page regenerates every <strong>1 minute</strong> instead of
              30 seconds. Longer revalidation periods mean better performance
              but potentially staler data using unstable_cache.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-green-600">Advantages:</h3>
                <ul className="text-green-600 list-disc list-inside">
                  <li>Better server performance</li>
                  <li>Lower API usage</li>
                  <li>Reduced costs</li>
                  <li>More stable caching</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-emerald-600">Trade-offs:</h3>
                <ul className="text-emerald-600 list-disc list-inside">
                  <li>Data may be up to 1 minute old</li>
                  <li>Less real-time updates</li>
                  <li>Better for stable content</li>
                  <li>Ideal for product catalogs</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-800">
              <strong>Cache Strategy:</strong> Using unstable_cache with
              60-second revalidation (compatible with Next.js 16
              cacheComponents)
            </p>
            <p className="text-blue-700 text-sm mt-1">
              Generated at: {new Date().toLocaleString()}
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Compare timestamps with the 30-second ISR page to see the
              difference
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              cachingStrategy="ISR (1min revalidation)"
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            1-Minute ISR vs 30-Second ISR:
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                30-Second ISR:
              </h3>
              <ul className="space-y-1">
                <li>• More frequent updates</li>
                <li>• Fresher data</li>
                <li>• Higher server load</li>
                <li>• More API calls</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                1-Minute ISR:
              </h3>
              <ul className="space-y-1">
                <li>• Better performance</li>
                <li>• Lower costs</li>
                <li>• Slightly staler data</li>
                <li>• Fewer API calls</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            <strong>Best Practice:</strong> Choose revalidation time based on
            how frequently your data changes and your performance requirements.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("ISR 1min: Error fetching products:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            ISR Products - 1 Minute (Error State)
          </h1>
          <p className="text-red-700">
            Unable to fetch products. This might be due to network issues or API
            limitations.
          </p>
          <p className="text-red-600 text-sm mt-2">
            ISR will continue to serve this error page until the next successful
            regeneration in up to 1 minute.
          </p>
        </div>
      </div>
    );
  }
}
