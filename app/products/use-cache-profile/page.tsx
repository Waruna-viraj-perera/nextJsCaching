"use cache";

import { Suspense } from "react";

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/80",
    role: "Developer",
    joinDate: "2023-01-15",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://via.placeholder.com/80",
    role: "Designer",
    joinDate: "2023-03-20",
    preferences: {
      theme: "light",
      notifications: false,
    },
  },
  {
    id: "3",
    name: "Bob Wilson",
    email: "bob@example.com",
    avatar: "https://via.placeholder.com/80",
    role: "Manager",
    joinDate: "2022-12-10",
    preferences: {
      theme: "auto",
      notifications: true,
    },
  },
];

// Simulate delay for demonstration
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// This function is cached using 'use cache' directive
async function getUser(userId: string) {
  console.log(`Fetching user ${userId} with use cache directive...`);

  // Simulate database query delay
  await delay(1000);

  const user = mockUsers.find((u) => u.id === userId);
  if (!user) {
    throw new Error(`User ${userId} not found`);
  }

  return user;
}

// This function is also cached
async function getUserStats(userId: string) {
  console.log(`Fetching stats for user ${userId}...`);

  // Simulate expensive computation
  await delay(800);

  return {
    postsCount: Math.floor(Math.random() * 100) + 10,
    followersCount: Math.floor(Math.random() * 1000) + 50,
    followingCount: Math.floor(Math.random() * 500) + 20,
    lastActive: new Date().toISOString(),
  };
}

// Profile component using cached data
async function Profile({ userId }: { userId: string }) {
  const user = await getUser(userId);
  const stats = await getUserStats(userId);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.postsCount}
          </div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.followersCount}
          </div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {stats.followingCount}
          </div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
      </div>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
        <p>Theme: {user.preferences.theme}</p>
        <p>
          Notifications:{" "}
          {user.preferences.notifications ? "Enabled" : "Disabled"}
        </p>
      </div>
    </div>
  );
}

export default async function UseCacheProfilePage() {
  const userIds = ["1", "2", "3"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          'use cache' with User Profiles
        </h1>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>Advanced Cache Strategy:</strong> This page demonstrates
                multiple functions using the{" "}
                <code className="bg-green-100 px-2 py-1 rounded">
                  'use cache'
                </code>{" "}
                directive. Each function is cached independently.
              </p>
              <ul className="mt-2 text-sm text-green-600 list-disc list-inside">
                <li>
                  <code>getUser(userId)</code> - Cached per user ID
                </li>
                <li>
                  <code>getUserStats(userId)</code> - Cached per user ID
                </li>
                <li>Functions cache results based on their parameters</li>
                <li>Perfect for expensive database queries or API calls</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Code Example:</h3>
          <pre className="text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
            {`'use cache';

async function getUser(userId: string) {
  // This function is cached per userId parameter
  const user = await database.user.findUnique({
    where: { id: userId }
  });
  return user;
}

export default async function Profile({ userId }: { userId: string }) {
  const user = await getUser(userId); // Cached!
  return <div>{user.name}</div>;
}`}
          </pre>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm text-yellow-700">
            <strong>⚠️ Important:</strong> The 'use cache' directive caches
            based on function parameters. In this example,{" "}
            <code>getUser("1")</code> and
            <code>getUser("2")</code> are cached separately. Refresh the page to
            see that the data loads instantly after the first visit!
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          Page generated at: {new Date().toLocaleTimeString()} -
          <span className="font-semibold">
            {" "}
            Notice how user data loads instantly on refresh due to caching
          </span>
        </p>
      </div>

      <div className="space-y-6">
        {userIds.map((userId) => (
          <Suspense
            key={userId}
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-48"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            }
          >
            <Profile userId={userId} />
          </Suspense>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">
          Performance Benefits:
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            ✅ First load: Functions execute normally with simulated delays
          </li>
          <li>✅ Subsequent loads: Cached results return instantly</li>
          <li>
            ✅ Parameter-based caching: Each userId gets its own cache entry
          </li>
          <li>
            ✅ Automatic cache invalidation: Based on Next.js caching policies
          </li>
        </ul>
      </div>
    </div>
  );
}
