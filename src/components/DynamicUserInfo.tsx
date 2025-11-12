// This component simulates dynamic user information that requires server-side processing
// It will be part of the dynamic portion in PPR

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulate fetching user data from a database or external API
async function fetchUserData() {
  // Simulate network delay
  await delay(800);

  // Simulate dynamic user data that would come from authentication/database
  return {
    name: "John Doe",
    email: "john.doe@example.com",
    lastVisit: new Date().toLocaleString(),
    location: "San Francisco, CA",
    memberSince: "January 2024",
    orderCount: Math.floor(Math.random() * 50) + 1,
    favoriteCategory: ["electronics", "accessories", "books"][
      Math.floor(Math.random() * 3)
    ],
  };
}

export default async function DynamicUserInfo() {
  const userData = await fetchUserData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold text-lg">
            {userData.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{userData.name}</h3>
          <p className="text-gray-600 text-sm">{userData.email}</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Last Visit:</span>
          <span className="font-medium">{userData.lastVisit}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Location:</span>
          <span className="font-medium">{userData.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Member Since:</span>
          <span className="font-medium">{userData.memberSince}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Orders:</span>
          <span className="font-medium text-green-600">
            {userData.orderCount}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Favorite Category:</span>
          <span className="font-medium capitalize">
            {userData.favoriteCategory}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">
          ⚡ This data was fetched dynamically and streamed to your browser
        </p>
      </div>
    </div>
  );
}
