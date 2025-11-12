import { NextResponse } from "next/server";
import { fetchProducts } from "@/lib/products";

// API route for client-side fetching
export async function GET() {
  try {
    // Add delay to simulate database query
    const products = await fetchProducts(300);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
