import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            NextJS Caching Demo
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/products/static"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              Static
            </Link>
            <Link
              href="/products/ssr"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              SSR
            </Link>
            <Link
              href="/products/isr"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              ISR (30s)
            </Link>
            <Link
              href="/products/isr-1min"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              ISR (1min)
            </Link>
            <Link
              href="/products/datacache"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              Data Cache
            </Link>
            <Link
              href="/products/use-cache"
              className="hover:text-primary-600 transition-colors text-sm font-semibold"
            >
              'use cache'
            </Link>
            <Link
              href="/products/client"
              className="hover:text-primary-600 transition-colors text-sm"
            >
              Client
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
