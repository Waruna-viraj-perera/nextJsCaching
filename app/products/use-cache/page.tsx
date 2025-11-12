"use cache";

import ProductCard from "../../../components/ProductCard";
import { fetchProducts } from "../../../lib/products";
import { Product } from "../../../types";

// This function will be cached using the new 'use cache' directive
async function getCachedProducts(): Promise<Product[]> {
  console.log("Fetching products with use cache directive...");
  const products = await fetchProducts();
  return products;
}

export default async function UseCachePage() {
  const products = await getCachedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          'use cache' Directive Demo
        </h1>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Cache Strategy:</strong> This page uses the new{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">
                  'use cache'
                </code>{" "}
                directive introduced in Next.js 15. This directive automatically
                caches the entire module and its exports.
              </p>
              <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
                <li>Caches function results automatically</li>
                <li>Reduces server-side computation</li>
                <li>Improves response times for repeated requests</li>
                <li>Works at the module level</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">How it works:</h3>
          <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
            {`'use cache';

async function getCachedProducts() {
  // This function is automatically cached
  const products = await getProducts();
  return products;
}`}
          </pre>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          Generated at: {new Date().toLocaleTimeString()} -
          <span className="font-semibold">
            {" "}
            Refresh to see if timestamp changes
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="use cache"
          />
        ))}
      </div>
    </div>
  );
}
