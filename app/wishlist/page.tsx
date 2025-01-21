"use client";

import { useWishlist } from "@/app/context/WishlistContext"; // Import the Wishlist context
import { FaTrash, FaHeart } from "react-icons/fa"; // Icons for removing items and empty state
import Link from "next/link";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 flex items-center gap-2">
          <FaHeart className="text-[#007580]" /> Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 text-lg mb-4">Your wishlist is empty.</p>
            <Link
              href="/"
              className="bg-[#007580] text-white px-6 py-2 rounded-lg hover:bg-[#005f6b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Left side: Product image and details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-lg font-medium">{item.title}</p>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>

                {/* Right side: Remove button */}
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;