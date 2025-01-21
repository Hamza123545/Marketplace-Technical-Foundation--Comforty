import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  imageUrl: string;
  badge?: string;
  description?: string;
  inventory?: number;
  tags?: string[];
}

export default async function OurProduct() {
  // GROQ query to fetch the first 9 products from Sanity (ensure unique)
  const query = groq`*[_type == "products"][0..8] { // Adjusted to fetch 9 products
    _id,
    title,
    price,
    priceWithoutDiscount,
    "imageUrl": image.asset->url, // Resolve image URL
    badge,
    description,
    inventory,
    tags
  }`;

  // Fetch products data from Sanity
  const products: Product[] = await client.fetch(query);

  // Remove duplicate products by title or imageUrl (whichever is appropriate)
  const uniqueProducts = Array.from(
    new Map(products.map((product) => [product.title, product])).values()
  );

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl text-center font-semibold text-[#1C1B1F] tracking-tight mb-8">
        Our Products
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {uniqueProducts.map((product) => (
          <div key={product._id} className="group relative rounded-lg bg-white">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              {product.badge && (
                <Badge className="absolute left-3 top-3 bg-emerald-500 hover:bg-emerald-600">
                  {product.badge}
                </Badge>
              )}
              <Link href={`components/productDectription/discription`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  height={400}
                  width={400}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm text-[#1C1B1F]">{product.title}</h3>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-lg font-medium text-[#1C1B1F]">
                    ${product.price}
                  </span>
                  {product.priceWithoutDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.priceWithoutDiscount}
                    </span>
                  )}
                </div>
              </div>
              <button className="rounded-full bg-[#00B5A5] p-2 text-white transition-colors hover:bg-[#00A294]">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
