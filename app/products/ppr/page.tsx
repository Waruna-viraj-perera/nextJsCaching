import { Suspense } from "react";
import ProductCard from "../../../components/ProductCard";
import { fetchStaticProducts } from "../../../lib/products";
import DynamicUserInfo from "../../../components/DynamicUserInfo";
import DynamicRecommendations from "../../../components/DynamicRecommendations";
import DynamicTimestamp from "../../../components/DynamicTimestamp";

// Static part - this will be prerendered
async function StaticProductList() {
  // This runs at build time and is statically generated (no random values)
  const products = await fetchStaticProducts();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cachingStrategy="PPR - Static Part"
        />
      ))}
    </div>
  );
}

// This page demonstrates Partial Prerendering (PPR)
// The static content is prerendered, while dynamic content is streamed
export default function PPRProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Partial Prerendering (PPR)
        </h1>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-indigo-800 mb-2">How it works:</h2>
          <ul className="text-indigo-700 text-sm space-y-1">
            <li>• Static parts are prerendered at build time</li>
            <li>• Dynamic parts are streamed when requested</li>
            <li>• Best performance for mixed static/dynamic content</li>
            <li>• Uses React Suspense boundaries to define dynamic areas</li>
          </ul>
        </div>
      </div>

      {/* Static Content - Prerendered at Build Time */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          📦 Static Product Catalog (Prerendered)
        </h2>
        <p className="text-gray-600 mb-4">
          This product list is statically generated at build time and served
          immediately.
        </p>
        <StaticProductList />
      </div>

      {/* Dynamic Content - Streamed on Request */}
      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            👤 User Information (Dynamic)
          </h2>
          <p className="text-gray-600 mb-4">
            This section is dynamically rendered and streamed to the client.
          </p>
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            }
          >
            <DynamicUserInfo />
          </Suspense>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            🎯 Personalized Recommendations (Dynamic)
          </h2>
          <p className="text-gray-600 mb-4">
            These recommendations are generated based on user data and current
            trends.
          </p>
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                </div>
              </div>
            }
          >
            <DynamicRecommendations />
          </Suspense>
        </div>
      </div>

      {/* Information Box */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">PPR Architecture</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">
              Static Shell (Prerendered)
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Page layout and navigation</li>
              <li>• Product catalog</li>
              <li>• Static content sections</li>
              <li>• Served immediately from CDN</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Dynamic Content (Streamed)
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• User-specific information</li>
              <li>• Personalized recommendations</li>
              <li>• Real-time data</li>
              <li>• Streamed as ready</li>
            </ul>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="mt-8 text-center text-gray-600">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-48 mx-auto"></div>
            </div>
          </div>
        }
      >
        <DynamicTimestamp />
      </Suspense>
    </div>
  );
}
