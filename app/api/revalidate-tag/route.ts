import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  if (!tag) {
    return NextResponse.json(
      { error: "Missing tag parameter. Use ?tag=users or ?tag=products" },
      { status: 400 }
    );
  }

  try {
    // Attempt to revalidate the specific tag
    revalidateTag(tag);

    console.log(`✅ Cache tag '${tag}' revalidated successfully`);

    // Create success response with redirect
    const response = NextResponse.redirect(
      new URL("/products/cache-tags", request.url)
    );

    // Add cache headers to ensure this response isn't cached
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );

    return response;
  } catch (error) {
    console.error("❌ Error revalidating tag:", error);

    // On error, still redirect but log the issue
    const response = NextResponse.redirect(
      new URL("/products/cache-tags", request.url)
    );
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );

    return response;
  }
}
