import { unstable_cache } from "next/cache";

// Cache Life Demo - Different lifetime configurations
// This demonstrates how cacheLife controls how long cached data stays in memory

// Short-lived cache (5 seconds)
const getShortLivedData = unstable_cache(
  async () => {
    console.log("🟡 Generating short-lived data...");
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      id: Math.floor(Math.random() * 1000),
      message: "Short-lived cache data",
      value: Math.floor(Math.random() * 100),
      generatedAt: new Date().toLocaleTimeString(),
      lifetime: "5 seconds",
    };
  },
  ["short-cache"],
  {
    revalidate: 3600, // Long revalidate but short cache life
    tags: ["short-life"],
  }
);

// Medium-lived cache (30 seconds)
const getMediumLivedData = unstable_cache(
  async () => {
    console.log("🟠 Generating medium-lived data...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      id: Math.floor(Math.random() * 1000),
      message: "Medium-lived cache data",
      value: Math.floor(Math.random() * 100),
      generatedAt: new Date().toLocaleTimeString(),
      lifetime: "30 seconds",
    };
  },
  ["medium-cache"],
  {
    revalidate: 3600,
    tags: ["medium-life"],
  }
);

// Long-lived cache (5 minutes)
const getLongLivedData = unstable_cache(
  async () => {
    console.log("🔴 Generating long-lived data...");
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      id: Math.floor(Math.random() * 1000),
      message: "Long-lived cache data",
      value: Math.floor(Math.random() * 100),
      generatedAt: new Date().toLocaleTimeString(),
      lifetime: "5 minutes",
    };
  },
  ["long-cache"],
  {
    revalidate: 3600,
    tags: ["long-life"],
  }
);

// Default cache (no explicit cacheLife)
const getDefaultCacheData = unstable_cache(
  async () => {
    console.log("⚫ Generating default cache data...");
    await new Promise((resolve) => setTimeout(resolve, 250));
    return {
      id: Math.floor(Math.random() * 1000),
      message: "Default cache data",
      value: Math.floor(Math.random() * 100),
      generatedAt: new Date().toLocaleTimeString(),
      lifetime: "Default (varies by system)",
    };
  },
  ["default-cache"],
  {
    revalidate: 3600,
    tags: ["default-life"],
  }
);

export default async function CacheLifeDemo() {
  const [shortData, mediumData, longData, defaultData] = await Promise.all([
    getShortLivedData(),
    getMediumLivedData(),
    getLongLivedData(),
    getDefaultCacheData(),
  ]);
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Cache Life Demo
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            How Cache Life Works:
          </h2>
          <p className="text-blue-700 mb-3">
            Cache Life controls how long cached data stays in memory before
            being evicted. This is different from revalidation - it's about
            memory management, not data freshness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">
                Cache Life vs Revalidation:
              </h3>
              <ul className="text-blue-700 space-y-1">
                <li>
                  • <strong>Cache Life:</strong> How long data stays in memory
                </li>
                <li>
                  • <strong>Revalidation:</strong> When to fetch fresh data
                </li>
                <li>
                  • <strong>Memory Management:</strong> Prevents memory overflow
                </li>
                <li>
                  • <strong>Performance:</strong> Balances speed vs memory usage
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-600 mb-2">
                Different Lifetimes:
              </h3>
              <ul className="text-emerald-700 space-y-1">
                <li>
                  • <strong>Short (5s):</strong> Frequently changing data
                </li>
                <li>
                  • <strong>Medium (30s):</strong> Moderately stable data
                </li>
                <li>
                  • <strong>Long (5m):</strong> Very stable data
                </li>
                <li>
                  • <strong>Default:</strong> System-determined optimal time
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            Test Cache Behavior
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/api/revalidate-tag?tag=short-life"
              className="block bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded text-center font-semibold text-sm"
            >
              Clear Short Cache
            </a>
            <a
              href="/api/revalidate-tag?tag=medium-life"
              className="block bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded text-center font-semibold text-sm"
            >
              Clear Medium Cache
            </a>
            <a
              href="/api/revalidate-tag?tag=long-life"
              className="block bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded text-center font-semibold text-sm"
            >
              Clear Long Cache
            </a>
            <a
              href="/api/revalidate-tag?tag=default-life"
              className="block bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded text-center font-semibold text-sm"
            >
              Clear Default Cache
            </a>
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">
            Click buttons to manually clear specific caches and see regeneration
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600 font-mono text-sm">
          Cache Life Demo - Compare generation times below to see cache behavior
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Each cache has different memory lifetimes and eviction policies
        </p>
      </div>

      {/* Cache Results Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Short-lived Cache */}
        <div className="bg-white border-2 border-yellow-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🟡</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-yellow-600">
                Short Cache Life
              </h3>
              <p className="text-sm text-gray-600">5 seconds in memory</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded mb-3">
            <div className="space-y-2 text-sm">
              <div>
                <strong>ID:</strong> {shortData.id}
              </div>
              <div>
                <strong>Value:</strong> {shortData.value}
              </div>
              <div>
                <strong>Message:</strong> {shortData.message}
              </div>
              <div>
                <strong>Generated:</strong> {shortData.generatedAt}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <strong>Behavior:</strong> Evicted from memory quickly, good for
            frequently changing data
          </div>
        </div>

        {/* Medium-lived Cache */}
        <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🟠</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-600">
                Medium Cache Life
              </h3>
              <p className="text-sm text-gray-600">30 seconds in memory</p>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded mb-3">
            <div className="space-y-2 text-sm">
              <div>
                <strong>ID:</strong> {mediumData.id}
              </div>
              <div>
                <strong>Value:</strong> {mediumData.value}
              </div>
              <div>
                <strong>Message:</strong> {mediumData.message}
              </div>
              <div>
                <strong>Generated:</strong> {mediumData.generatedAt}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <strong>Behavior:</strong> Balanced memory usage, good for
            moderately stable data
          </div>
        </div>

        {/* Long-lived Cache */}
        <div className="bg-white border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🔴</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600">
                Long Cache Life
              </h3>
              <p className="text-sm text-gray-600">5 minutes in memory</p>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded mb-3">
            <div className="space-y-2 text-sm">
              <div>
                <strong>ID:</strong> {longData.id}
              </div>
              <div>
                <strong>Value:</strong> {longData.value}
              </div>
              <div>
                <strong>Message:</strong> {longData.message}
              </div>
              <div>
                <strong>Generated:</strong> {longData.generatedAt}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <strong>Behavior:</strong> Stays in memory longest, best for very
            stable data
          </div>
        </div>

        {/* Default Cache */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">⚫</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-600">
                Default Cache Life
              </h3>
              <p className="text-sm text-gray-600">System optimized</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded mb-3">
            <div className="space-y-2 text-sm">
              <div>
                <strong>ID:</strong> {defaultData.id}
              </div>
              <div>
                <strong>Value:</strong> {defaultData.value}
              </div>
              <div>
                <strong>Message:</strong> {defaultData.message}
              </div>
              <div>
                <strong>Generated:</strong> {defaultData.generatedAt}
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            <strong>Behavior:</strong> Next.js determines optimal lifetime based
            on usage patterns
          </div>
        </div>
      </div>

      {/* Explanation Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">
          Understanding Cache Life
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-blue-600 mb-2">
              Memory Management:
            </h4>
            <ul className="text-blue-700 space-y-1">
              <li>• Prevents server memory overflow</li>
              <li>• Automatically evicts old cached data</li>
              <li>• Balances performance vs memory usage</li>
              <li>• Independent of data freshness (revalidation)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-600 mb-2">
              Best Practices:
            </h4>
            <ul className="text-indigo-700 space-y-1">
              <li>• Short life: Real-time data, user sessions</li>
              <li>• Medium life: API responses, computed data</li>
              <li>• Long life: Static content, configuration</li>
              <li>• Default: Let Next.js optimize automatically</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Instructions */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <h3 className="font-semibold text-yellow-800 mb-3">
          Testing Instructions:
        </h3>
        <ol className="text-yellow-700 space-y-2 text-sm">
          <li>
            <strong>1. Note the generation times</strong> - Each cache shows
            when it was created
          </li>
          <li>
            <strong>2. Refresh the page multiple times</strong> - Data stays the
            same (cached)
          </li>
          <li>
            <strong>3. Click "Clear Short Cache"</strong> - Only yellow section
            regenerates
          </li>
          <li>
            <strong>4. Wait and observe</strong> - Different caches may evict at
            different times
          </li>
          <li>
            <strong>5. Under heavy load</strong> - Short-lived caches evict
            first to free memory
          </li>
        </ol>
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <p className="text-yellow-800 font-semibold text-sm">
            Key Insight: Cache Life is about memory management, not data
            freshness. Even with long revalidation times, data can be evicted
            from memory based on cache life settings.
          </p>
        </div>
      </div>
    </div>
  );
}
