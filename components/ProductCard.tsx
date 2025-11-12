import Image from "next/image";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  cachingStrategy?: string;
}

export default function ProductCard({
  product,
  cachingStrategy,
}: ProductCardProps) {
  return (
    <div className="card">
      {cachingStrategy && (
        <div className="bg-primary-50 px-4 py-2">
          <span className="text-sm font-medium text-primary-700">
            {cachingStrategy}
          </span>
        </div>
      )}
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ${product.price}
            </span>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600 ml-1">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500 font-medium">Demo Product</div>
        </div>
      </div>
    </div>
  );
}
