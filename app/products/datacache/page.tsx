import { cache } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

// Data Cache example using React's cache() function
// This caches the result of the function call for the duration of the request
const getCachedProducts = cache(async (): Promise<Product[]> => {
  console.log(
    "Fetching products with Data Cache - this should only log once per request"
  );

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate fetching from external API or database
  const response = await fetch("https://fakestoreapi.com/products?limit=6", {
    // Force fresh data on each request (bypassing HTTP cache)
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await response.json();

  // Return products with timestamp metadata
  const timestamp = new Date().toISOString();
  return products.map((product: any) => ({
    ...product,
    metadata: { fetchedAt: timestamp },
  }));
});

// Another cached function to demonstrate multiple cache usage
const getCachedStats = cache(async () => {
  console.log("Calculating stats - this should only log once per request");

  const products = await getCachedProducts(); // This will use cached result

  return {
    totalProducts: products.length,
    averagePrice:
      products.reduce((sum, p) => sum + p.price, 0) / products.length,
    categories: Array.from(new Set(products.map((p) => p.category))),
    calculatedAt: new Date().toISOString(),
  };
});

export default async function DataCacheProductsPage() {
  // Both of these calls will use the same cached data
  const products = await getCachedProducts();
  const stats = await getCachedStats();

  // Call getCachedProducts again to show it uses cached result
  const productsAgain = await getCachedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Data Cache Example
        </h1>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-indigo-800 mb-2">How it works:</h2>
          <ul className="text-indigo-700 text-sm space-y-1">
            <li>
              • Uses React's cache() function to cache data fetching results
            </li>
            <li>• Cache is scoped to a single request (server-side)</li>
            <li>
              • Multiple calls to the same cached function return the same
              result
            </li>
            <li>
              • Prevents duplicate network requests during server rendering
            </li>
            <li>
              • Different from HTTP caching - this is in-memory for the request
            </li>
          </ul>
        </div>

        {/* Stats panel to show cached data usage */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            Cached Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium">Total Products</div>
              <div className="text-indigo-600">{stats.totalProducts}</div>
            </div>
            <div>
              <div className="font-medium">Average Price</div>
              <div className="text-indigo-600">
                ${stats.averagePrice.toFixed(2)}
              </div>
            </div>
            <div>
              <div className="font-medium">Categories</div>
              <div className="text-indigo-600">{stats.categories.length}</div>
            </div>
            <div>
              <div className="font-medium">Cache Status</div>
              <div className="text-green-600">
                {products === productsAgain ? "Cache Hit ✓" : "Cache Miss ✗"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Data fetched at: {(products[0] as any)?.metadata?.fetchedAt}
          </div>
          <div className="text-xs text-gray-500">
            Stats calculated at: {stats.calculatedAt}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="Data Cache"
          />
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-3">Technical Details</h3>
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Cache Scope:</strong> The cache() function creates a
            per-request cache. All calls to the same cached function within a
            single request return the same result.
          </p>
          <p>
            <strong>Performance:</strong> Eliminates duplicate data fetching
            during server-side rendering, improving performance when multiple
            components need the same data.
          </p>
          <p>
            <strong>Use Cases:</strong> Perfect for expensive operations like
            database queries, API calls, or computations that might be called
            multiple times during rendering.
          </p>
          <p>
            <strong>Cache Duration:</strong> Cache only lasts for the duration
            of the server request. Each new page request starts with a fresh
            cache.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Check the server console to see cache behavior</p>
        <p className="text-sm mt-1">
          The fetch function should only be called once despite multiple usages
        </p>
      </div>
    </div>
  );
}
