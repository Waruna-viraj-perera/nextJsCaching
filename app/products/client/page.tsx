"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";

// Client-Side Rendering - Rendered in the browser
export default function ClientProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Fetch from our mock API
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Client-Side Rendering (CSR)
        </h1>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-orange-800 mb-2">How it works:</h2>
          <ul className="text-orange-700 text-sm space-y-1">
            <li>• Page shell loads immediately</li>
            <li>• Data is fetched in the browser after page load</li>
            <li>• Highly interactive and dynamic</li>
            <li>• SEO considerations (content not immediately available)</li>
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cachingStrategy="Client-Side Rendering"
          />
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>This content was fetched and rendered in your browser</p>
        <p className="text-sm mt-1">
          Check the Network tab to see the API call
        </p>
      </div>
    </div>
  );
}
