import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
};

const ProductCard = ({ product }: { product: Product }) => (
  <div key={product._id} className="group relative rounded-lg bg-white p-4">
    <div className="relative aspect-square overflow-hidden rounded-lg">
      {product.isNew && (
        <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
          New
        </Badge>
      )}
      {product.isSale && (
        <Badge className="absolute left-3 top-3 bg-orange-500 hover:bg-orange-600">
          Sale
        </Badge>
      )}
      <Link href={`/product/${product._id}`}>
        <Image
          src={product.imageUrl}
          alt={product.title}
          height={400}
          width={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          aria-label={`View details of ${product.title}`}
        />
      </Link>
    </div>
    <div className="mt-4 flex flex-col items-start justify-between">
      <div>
        <h3 className="text-sm sm:text-base text-[#1C1B1F]">{product.title}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg sm:text-xl font-medium text-[#1C1B1F]">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
      <button
        className="mt-4 rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294] w-full sm:w-auto"
        aria-label={`Add ${product.title} to cart`}
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export default async function AllProduct() {
  // GROQ query to fetch 9 products from Sanity
  const query = groq`*[_type == "products"][1..8] {
    _id,
    title,
    price,
    "imageUrl": image.asset->url, // Resolve image URL
    originalPrice,
    isNew,
    isSale
  }`;

  // Fetch products from Sanity
  const products: Product[] = await client.fetch(query);

  // Fetch a new chair product (assuming a chair with a unique title such as "ComfyChair")
  const newChairQuery = groq`*[_type == "products" && title == "ComfyChair"][1] {
    _id,
    title,
    price,
    "imageUrl": image.asset->url, 
    originalPrice,
    isNew,
    isSale
  }`;

  // Fetch the new chair product
  const newChair: Product | null = await client.fetch(newChairQuery);

  // If the new chair is found, add it to the list; if not, just use the original products
  const allProducts = newChair ? [...products, newChair] : products;

  // Remove duplicates by ensuring each product has a unique _id
  const uniqueProducts = Array.from(
    new Map(
      allProducts.map((product) => [product._id, product]) // Ensure unique products based on _id
    ).values()
  );

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl sm:text-4xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniqueProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
