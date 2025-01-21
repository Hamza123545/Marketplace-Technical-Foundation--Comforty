"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState<any>(null); // State to hold order details
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState<string>(""); // State for estimated delivery date
  const router = useRouter();

  useEffect(() => {
    // Retrieve order details from localStorage
    const savedOrderDetails = localStorage.getItem("orderDetails");
    if (savedOrderDetails) {
      const details = JSON.parse(savedOrderDetails);
      setOrderDetails(details);

      // Calculate estimated delivery date (3-5 business days from today)
      const deliveryDays = Math.floor(Math.random() * 3) + 3; // Random between 3 and 5 days
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
      setEstimatedDeliveryDate(deliveryDate.toDateString());
    } else {
      // Redirect to home if no order details are found
      router.push("/");
    }
  }, [router]);

  const handleContinueShopping = () => {
    // Clear the cart from localStorage
    localStorage.removeItem("cart");

    // Redirect to the home page and reload
    router.push("/");
    window.location.reload(); // Reload the page to reflect the changes
  };

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-xl font-medium">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8 text-center">Order Confirmation</h1>

        {/* Thank You Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Thank You for Your Order!</h2>
          <p className="text-sm text-gray-600">
            Your order has been placed successfully. We will send you a confirmation email shortly.
          </p>
        </div>

        {/* Estimated Delivery Date */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Estimated Delivery Date</h2>
          <p className="text-lg text-[#007580] font-medium">{estimatedDeliveryDate}</p>
          <p className="text-sm text-gray-600 mt-2">
            Your order will arrive by this date. We'll notify you if there are any delays.
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {orderDetails.cart.map((item: any) => (
              <div key={item._id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.title} className="h-12 w-12 object-cover rounded-lg" />
                  <div className="ml-4">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="text-sm font-medium">${item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium">${orderDetails.total}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium">Free</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">${orderDetails.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">{orderDetails.address.street}</p>
            <p className="text-sm text-gray-700">
              {orderDetails.address.area}, {orderDetails.address.city}
            </p>
            <p className="text-sm text-gray-700">
              {orderDetails.address.state}, {orderDetails.address.country}
            </p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <p className="text-sm text-gray-700 capitalize">{orderDetails.paymentMethod}</p>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">Email: {orderDetails.contactInfo.email}</p>
            <p className="text-sm text-gray-700">Phone: {orderDetails.contactInfo.phone}</p>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleContinueShopping}
            className="bg-[#007580] text-white px-6 py-2 rounded-lg text-sm"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;