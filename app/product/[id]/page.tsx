"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { groq } from "next-sanity";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Product = {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  description?: string;
  discount?: { percentage: number; code: string };
};

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id; // Retrieve the dynamic route parameter
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const query = groq`*[_type == "products" && _id == $id][0] {
          _id,
          title,
          price,
          "imageUrl": image.asset->url,
          originalPrice,
          isNew,
          isSale,
          description,
          "discount": *[_type == "discounts" && $id in applicableProducts[]->_id][0] {
            percentage,
            code
          }
        }`;
        const fetchedProduct = await client.fetch(query, { id });
        setProduct(fetchedProduct);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      setShowCartMessage(true);
      setTimeout(() => setShowCartMessage(false), 3000);
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      setShowWishlistMessage(true);
      setTimeout(() => setShowWishlistMessage(false), 3000);
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-xl font-medium">Product not found</p>
      </div>
    );
  }

  const finalPrice = product.discount
    ? product.price - (product.price * product.discount.percentage) / 100
    : product.price;

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      {showCartMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm">Added to cart!</p>
          </div>
        </div>
      )}

      {showWishlistMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-semibold">{product.title}</p>
            <p className="text-sm">Added to wishlist!</p>
          </div>
        </div>
      )}

      <div className="flex max-w-4xl w-full">
        <div className="w-1/2 p-4">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={300}
            height={500}
            className="rounded-lg"
          />
        </div>

        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <button className="mt-4 mb-4 bg-[#007580] text-white font-semibold py-2 px-4 rounded">
            ${finalPrice.toFixed(2)}
          </button>
          {product.originalPrice && (
            <p className="text-sm text-gray-500 line-through mt-2">
              Original Price: ${product.originalPrice}
            </p>
          )}
          {product.discount && (
            <p className="text-sm text-red-500 font-medium mt-2">
              Discount: {product.discount.percentage}% off (Code: {product.discount.code})
            </p>
          )}
          <p className="text-gray-700 mt-4">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#007580] text-white font-semibold py-2 px-4 rounded"
          >
            Add To Cart
          </button>

          <button
            onClick={handleAddToWishlist}
            className="mt-4 bg-[#007580] text-white font-semibold py-2 px-4 rounded ml-4"
          >
            Add To Wishlist
          </button>

          {product.isNew && (
            <span className="text-sm text-green-600 font-medium mt-2 block">New Arrival</span>
          )}
          {product.isSale && (
            <span className="block text-sm text-red-600 font-medium mt-2">On Sale!</span>
          )}
        </div>
      </div>
    </div>
  );
}
