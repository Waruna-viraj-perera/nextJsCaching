import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/products";

// Static Generation - Pre-rendered at build time
// This page will be generated once at build time and served from CDN
export default async function StaticProductsPage() {
  // This runs at build time
  const products = await fetchProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Static Generation (SSG)
        </h1>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-800 mb-2">How it works:</h2>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Page is pre-rendered at build time</li>
            <li>• Served from CDN for fastest performance</li>
            <li>• Data is fetched during build process</li>
            <li>• Perfect for content that doesn't change often</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="Static Generation"
          />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>
          This page was generated at build time: {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}
