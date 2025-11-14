import { unstable_cache as cacheTag } from "next/cache";

// Simple data generators that create different content each time
function generateUserData() {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  return {
    id: Math.floor(Math.random() * 1000),
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    joinedAt: new Date().toLocaleTimeString(),
  };
}

function generateProductData() {
  const products = ["Laptop", "Phone", "Tablet", "Watch", "Headphones"];
  const randomProduct = products[Math.floor(Math.random() * products.length)];
  return {
    id: Math.floor(Math.random() * 1000),
    name: randomProduct,
    price: Math.floor(Math.random() * 1000) + 100,
    stock: Math.floor(Math.random() * 50) + 1,
    updatedAt: new Date().toLocaleTimeString(),
  };
}

// Cache functions with different tags
const getUserInfo = cacheTag(
  async () => {
    console.log("🔵 Generating user data...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateUserData();
  },
  ["user-info"],
  {
    tags: ["users"],
    revalidate: 3600, // Long cache - only updates when tag is revalidated
  }
);

const getProductInfo = cacheTag(
  async () => {
    console.log("🟢 Generating product data...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateProductData();
  },
  ["product-info"],
  {
    tags: ["products"],
    revalidate: 3600, // Long cache - only updates when tag is revalidated
  }
);

const getSharedInfo = cacheTag(
  async () => {
    console.log("🟣 Generating shared data...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      message: `System message ${Math.floor(Math.random() * 100)}`,
      timestamp: new Date().toLocaleTimeString(),
      status: Math.random() > 0.5 ? "Active" : "Maintenance",
    };
  },
  ["shared-info"],
  {
    tags: ["users", "products"], // This cache has BOTH tags
    revalidate: 3600,
  }
);

export default async function CacheTagsDemo() {
  const [userInfo, productInfo, sharedInfo] = await Promise.all([
    getUserInfo(),
    getProductInfo(),
    getSharedInfo(),
  ]);
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          🏷️ Cache Tags Demo
        </h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">
            How Cache Tags Work:
          </h2>
          <p className="text-blue-700 mb-3">
            Each cache below has different tags. When you revalidate a tag, only
            caches with that tag will update - others stay the same!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-100 p-3 rounded">
              <div className="font-semibold">🔵 User Cache</div>
              <div>
                Tag: <code>['users']</code>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded">
              <div className="font-semibold">🟢 Product Cache</div>
              <div>
                Tag: <code>['products']</code>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded">
              <div className="font-semibold">🟣 Shared Cache</div>
              <div>
                Tags: <code>['users', 'products']</code>
              </div>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">
            🧪 Test Cache Tag Revalidation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/api/revalidate-tag?tag=users"
              className="block bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded text-center font-semibold"
            >
              Revalidate 'users' Tag
            </a>
            <a
              href="/api/revalidate-tag?tag=products"
              className="block bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded text-center font-semibold"
            >
              Revalidate 'products' Tag
            </a>
            <a
              href="/"
              className="block bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded text-center font-semibold"
            >
              Back to Home
            </a>
          </div>
          <p className="text-sm text-gray-600 text-center mt-3">
            Click a button above, then come back to see which caches updated!
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <p className="text-gray-600">
          <span className="font-mono font-bold">
            Cache Tags Demo - Compare timestamps below to see selective updates
          </span>
        </p>
      </div>

      {/* Cache Results */}
      <div className="grid gap-6 mb-8">
        {/* User Cache */}
        <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🔵</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-600">
                User Cache
              </h3>
              <p className="text-sm text-gray-600">
                Tag: ['users'] • Updates when 'users' tag is revalidated
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ID:</strong> {userInfo.id}
              </div>
              <div>
                <strong>Name:</strong> {userInfo.name}
              </div>
              <div>
                <strong>Email:</strong> {userInfo.email}
              </div>
              <div>
                <strong>Generated:</strong> {userInfo.joinedAt}
              </div>
            </div>
          </div>
        </div>

        {/* Product Cache */}
        <div className="bg-white border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🟢</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">
                Product Cache
              </h3>
              <p className="text-sm text-gray-600">
                Tag: ['products'] • Updates when 'products' tag is revalidated
              </p>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>ID:</strong> {productInfo.id}
              </div>
              <div>
                <strong>Name:</strong> {productInfo.name}
              </div>
              <div>
                <strong>Price:</strong> ${productInfo.price}
              </div>
              <div>
                <strong>Stock:</strong> {productInfo.stock}
              </div>
              <div>
                <strong>Generated:</strong> {productInfo.updatedAt}
              </div>
            </div>
          </div>
        </div>

        {/* Shared Cache */}
        <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-xl">🟣</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-600">
                Shared Cache
              </h3>
              <p className="text-sm text-gray-600">
                Tags: ['users', 'products'] • Updates when EITHER tag is
                revalidated
              </p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Message:</strong> {sharedInfo.message}
              </div>
              <div>
                <strong>Status:</strong> {sharedInfo.status}
              </div>
              <div>
                <strong>Generated:</strong> {sharedInfo.timestamp}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
        <h3 className="font-semibold text-yellow-800 mb-3">
          🧪 Testing Instructions:
        </h3>
        <ol className="text-yellow-700 space-y-2">
          <li>
            <strong>1. Note the data above</strong> - Remember the names,
            numbers, and times
          </li>
          <li>
            <strong>2. Click "Revalidate 'users' Tag"</strong> - This should
            update User Cache + Shared Cache
          </li>
          <li>
            <strong>3. Come back and refresh</strong> - Only blue and purple
            sections should have new data!
          </li>
          <li>
            <strong>4. Click "Revalidate 'products' Tag"</strong> - This should
            update Product Cache + Shared Cache
          </li>
          <li>
            <strong>5. Come back and refresh</strong> - Only green and purple
            sections should change!
          </li>
        </ol>
        <div className="mt-4 p-3 bg-yellow-100 rounded">
          <p className="text-yellow-800 font-semibold">
            💡 Key Insight: The purple "Shared Cache" updates when EITHER tag is
            revalidated because it has both tags ['users', 'products']
          </p>
        </div>
      </div>
    </div>
  );
}
