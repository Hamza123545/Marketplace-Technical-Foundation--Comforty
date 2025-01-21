"use client";

import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { groq } from "next-sanity";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

type ProductDetailProps = {
  params: {
    id: string;
  };
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const { id } = params; // Extract params directly from props
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [showWishlistMessage, setShowWishlistMessage] = useState(false);

  // Fetch product data and discount data
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

  // Add to cart and wishlist
  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity: 1 });
      setShowCartMessage(true);
      setTimeout(() => setShowCartMessage(false), 3000); // Hide after 3 seconds
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
      setShowWishlistMessage(true);
      setTimeout(() => setShowWishlistMessage(false), 3000); // Hide after 3 seconds
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
      {/* Success Messages */}
      {showCartMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-slide-in">
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
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 animate-slide-in">
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

      {/* Product Details */}
      <div className="flex max-w-4xl w-full">
        {/* Image Section */}
        <div className="w-1/2 p-4">
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={300}
            height={500}
            className="rounded-lg"
          />
        </div>

        {/* Product Details Section */}
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

          {/* Add To Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#007580] text-white font-semibold py-2 px-4 rounded"
          >
            Add To Cart
          </button>

          {/* Add To Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            className="mt-4 bg-[#007580] text-white font-semibold py-2 px-4 rounded ml-4"
          >
            Add To Wishlist
          </button>

          {/* Product Tags */}
          {product.isNew && (
            <span className="text-sm text-green-600 font-medium mt-2 block">New Arrival</span>
          )}
          {product.isSale && (
            <span className="block text-sm text-red-600 font-medium mt-2">On Sale!</span>
          )}
        </div>
      </div>

      {/* Social Media Share Section */}
      <div className="mt-8 text-center">
        <p className="text-lg font-semibold mb-4">Share this product with your friends on social media:</p>
        <div className="flex justify-center gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a8 8 0 00-8 8c0 4.418 3.582 8 8 8s8-3.582 8-8a8 8 0 00-8-8zM9 4h2v2h-2V4zm1 6.021c-2.286 0-3.021 1.556-3.021 2.42 0 .56.226 1.401.77 1.568l.253.13h1.897v3.242h-3.132c-.351 0-.667-.254-.713-.593-.057-.396-.084-.665-.084-.907 0-.69.437-1.676 1.122-2.02.118-.074.266-.148.438-.222-.011-.215-.035-.426-.035-.625-.001-.407.02-.688.031-.907-.127-.11-.284-.258-.484-.378-.5-.239-.994-.413-1.422-.522-.337-.073-.649-.057-.95-.066-.409-.013-.72.324-.754.73-.067.437.194.728.435 1.05 1.755.375 3.134.784 4.393 1.237-.495-.479-.593-.857-.92-.625z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
