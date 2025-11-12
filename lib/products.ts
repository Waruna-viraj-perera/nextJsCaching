import { Product } from "@/types";

// Mock products for demonstration
export const mockProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    price: 59.99,
    description:
      "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300/4f46e5/ffffff?text=Headphones",
    rating: {
      rate: 4.5,
      count: 128,
    },
  },
  {
    id: 2,
    title: "Smartphone Case",
    price: 24.99,
    description:
      "Durable protective case for smartphones with drop protection and wireless charging compatibility.",
    category: "accessories",
    image: "https://via.placeholder.com/300x300/059669/ffffff?text=Phone+Case",
    rating: {
      rate: 4.2,
      count: 89,
    },
  },
  {
    id: 3,
    title: "Laptop Stand",
    price: 39.99,
    description:
      "Adjustable aluminum laptop stand for better ergonomics and improved airflow.",
    category: "accessories",
    image:
      "https://via.placeholder.com/300x300/dc2626/ffffff?text=Laptop+Stand",
    rating: {
      rate: 4.7,
      count: 156,
    },
  },
  {
    id: 4,
    title: "Wireless Mouse",
    price: 29.99,
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300/7c3aed/ffffff?text=Mouse",
    rating: {
      rate: 4.3,
      count: 201,
    },
  },
  {
    id: 5,
    title: "USB-C Hub",
    price: 49.99,
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300/ea580c/ffffff?text=USB+Hub",
    rating: {
      rate: 4.4,
      count: 67,
    },
  },
  {
    id: 6,
    title: "Portable Charger",
    price: 34.99,
    description:
      "10,000mAh portable battery pack with fast charging and multiple ports.",
    category: "electronics",
    image: "https://via.placeholder.com/300x300/0891b2/ffffff?text=Charger",
    rating: {
      rate: 4.6,
      count: 143,
    },
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all products with optional delay for demo purposes
export async function fetchProducts(delayMs: number = 0): Promise<Product[]> {
  if (delayMs > 0) {
    await delay(delayMs);
  }

  // Simulate random data changes for ISR demo
  return mockProducts.map((product) => ({
    ...product,
    // Slightly modify price for ISR demo (simulate price updates)
    price: Math.round((product.price + Math.random() * 2 - 1) * 100) / 100,
  }));
}

// Fetch static products (no randomization) for PPR static parts
export async function fetchStaticProducts(
  delayMs: number = 0
): Promise<Product[]> {
  if (delayMs > 0) {
    await delay(delayMs);
  }

  // Return products without any randomization for static generation
  return mockProducts;
}

// Fetch single product
export async function fetchProduct(
  id: number,
  delayMs: number = 0
): Promise<Product | null> {
  if (delayMs > 0) {
    await delay(delayMs);
  }

  const product = mockProducts.find((p) => p.id === id);
  if (!product) return null;

  return {
    ...product,
    // Slightly modify price for demo
    price: Math.round((product.price + Math.random() * 2 - 1) * 100) / 100,
  };
}

// Fetch products from external API (for comparison)
export async function fetchProductsFromAPI(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=6");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products from API:", error);
    // Fallback to mock data
    return mockProducts;
  }
}
