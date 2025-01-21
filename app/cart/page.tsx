"use client";

import { useCart } from "@/app/context/CartContext"; // Import from your context
import Link from "next/link";
import { FaShoppingCart, FaTrash } from "react-icons/fa"; // Import icons

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart(); // Access cart state and methods

  const handleQuantityChange = (id: string, action: "increase" | "decrease") => {
    updateQuantity(id, action); // Update quantity when + or - is clicked
  };

  const handleCheckout = () => {
    // Store cart data in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 flex items-center gap-2">
          <FaShoppingCart className="text-[#007580]" /> Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 text-lg mb-4">Your cart is empty.</p>
            <Link
              href="/"
              className="bg-[#007580] text-white px-6 py-2 rounded-lg hover:bg-[#005f6b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
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

                  {/* Right side: Quantity controls and total price */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item._id, "decrease")}
                        className="bg-gray-200 text-gray-800 w-8 h-8 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-lg w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item._id, "increase")}
                        className="bg-gray-200 text-gray-800 w-8 h-8 rounded-lg hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-medium">${item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Total: ${getCartTotal()}</p>
                <Link
                  href="/checkout"
                  onClick={handleCheckout}
                  className="bg-[#007580] text-white px-6 py-2 rounded-lg hover:bg-[#005f6b] transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;