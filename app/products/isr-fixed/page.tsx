import ProductCard from "../../../components/ProductCard";
import { unstable_cache } from "next/cache";

// Incremental Static Regeneration - Static with periodic updates
// Using unstable_cache with revalidate instead of export const revalidate (compatible with cacheComponents)

// Cache function with 30-second revalidation
const fetchProducts = unstable_cache(
  async () => {
    console.log("ISR: Fetching products at", new Date().toISOString());

    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  },
  ["isr-products-30s"],
  { revalidate: 30 } // 30 seconds revalidation
);

export default async function ISRProductsPage() {
  // This uses cached data that revalidates every 30 seconds
  console.log("ISR: Generating page at", new Date().toISOString());

  try {
    // Use the cached function instead of direct fetch
    const products = await fetchProducts();

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Incremental Static Regeneration (30s)
          </h1>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              ISR Caching Strategy
            </h2>
            <p className="text-purple-700 mb-4">
              This page is statically generated at build time and regenerated
              every <strong>30 seconds</strong> when requested. It provides a
              balance between performance and data freshness using
              unstable_cache.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold text-purple-600">Benefits:</h3>
                <ul className="text-purple-600 list-disc list-inside">
                  <li>Fast loading (cached/static)</li>
                  <li>Periodic updates (30s)</li>
                  <li>Reduced server load</li>
                  <li>SEO friendly</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600">Use Cases:</h3>
                <ul className="text-blue-600 list-disc list-inside">
                  <li>Product catalogs</li>
                  <li>News articles</li>
                  <li>Blog posts</li>
                  <li>Semi-dynamic content</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-yellow-800">
              <strong>Cache Strategy:</strong> Using unstable_cache with
              30-second revalidation (compatible with Next.js 16
              cacheComponents)
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Generated at: {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              cachingStrategy="ISR (30s revalidation)"
            />
          ))}
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">How This Works:</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>1. Build Time:</strong> Page is pre-rendered with initial
              data
            </p>
            <p>
              <strong>2. First Request:</strong> Serves the cached static page
              instantly
            </p>
            <p>
              <strong>3. After 30s:</strong> Next request triggers background
              regeneration
            </p>
            <p>
              <strong>4. Subsequent Requests:</strong> Serve updated static page
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("ISR: Error fetching products:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            ISR Products (Error State)
          </h1>
          <p className="text-red-700">
            Unable to fetch products. This might be due to network issues or API
            limitations.
          </p>
          <p className="text-red-600 text-sm mt-2">
            ISR will continue to serve this error page until the next successful
            regeneration.
          </p>
        </div>
      </div>
    );
  }
}
