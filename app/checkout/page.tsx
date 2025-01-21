"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client"; // Import Sanity client
import { groq } from "next-sanity"; // Import groq for Sanity queries

const Checkout = () => {
  const [cart, setCart] = useState<any[]>([]); // State to hold cart data
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" }); // Card details state
  const [paymentMethod, setPaymentMethod] = useState<string>(""); // Track the selected payment method
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission status
  const [contactInfo, setContactInfo] = useState({ email: "", phone: "" }); // Contact information
  const [address, setAddress] = useState({
    country: "",
    city: "",
    area: "",
    state: "",
    street: "",
  }); // State for the shipping address
  const [discountCode, setDiscountCode] = useState(""); // State for discount code input
  const [appliedDiscount, setAppliedDiscount] = useState(0); // State for applied discount amount
  const [discounts, setDiscounts] = useState<any[]>([]); // State to store fetched discounts
  const [discountError, setDiscountError] = useState(""); // State for discount error messages
  const router = useRouter();

  // Fetch discounts from Sanity
  useEffect(() => {
    const fetchDiscounts = async () => {
      const query = groq`*[_type == "discount"] {
        _id,
        code,
        discountType, // "percentage" or "fixed"
        value, // e.g., 10 for 10% or $10
        isActive
      }`;
      const fetchedDiscounts = await client.fetch(query);
      setDiscounts(fetchedDiscounts);
    };

    fetchDiscounts();
  }, []);

  // Fetch cart data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Set the cart state with the stored data
    } else {
      // Redirect to cart if no items in localStorage
      router.push("/cart");
    }
  }, [router]);

  // Handle discount code application
  const applyDiscount = () => {
    const discount = discounts.find(
      (d) => d.code === discountCode && d.isActive
    );

    if (discount) {
      setDiscountError(""); // Clear any previous error
      if (discount.discountType === "percentage") {
        // Apply percentage discount
        setAppliedDiscount((discount.value / 100) * getCartTotal());
      } else if (discount.discountType === "fixed") {
        // Apply fixed discount
        setAppliedDiscount(discount.value);
      }
    } else {
      setDiscountError("Invalid or inactive discount code.");
      setAppliedDiscount(0); // Reset discount
    }
  };

  // Calculate the total after discount
  const getDiscountedTotal = () => {
    return getCartTotal() - appliedDiscount;
  };

  // Calculate the cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle card details change
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle address change
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact information change
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle payment submission
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      alert("Payment Successful!");

      // Store the order details in localStorage
      localStorage.setItem("orderDetails", JSON.stringify({
        cart,
        total: getDiscountedTotal(),
        address,
        paymentMethod,
        contactInfo,
        appliedDiscount,
      }));

      setIsSubmitting(false);
      localStorage.removeItem("cart"); // Clear cart after checkout
      router.push("/order-confirmation"); // Redirect to confirmation page
    }, 2000);
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method); // Set the selected payment method
  };

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-xl font-medium">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={handleContactChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={contactInfo.phone}
              onChange={handleContactChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              required
            />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={address.area}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                required
              />
            </div>
            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={address.street}
              onChange={handleAddressChange}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              required
            />
          </div>
        </div>

        {/* Discount Code Input */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Apply Discount Code</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={applyDiscount}
              className="bg-[#007580] text-white px-4 py-2 rounded-lg text-sm"
            >
              Apply
            </button>
          </div>
          {discountError && (
            <p className="text-sm text-red-500 mt-2">{discountError}</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
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
                <p className="text-sm font-medium">${getCartTotal()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium">Free</p>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Discount</p>
                  <p className="text-sm font-medium text-green-500">-${appliedDiscount}</p>
                </div>
              )}
              <div className="flex justify-between mt-2">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-semibold">${getDiscountedTotal()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Options */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handlePaymentMethodChange("card")}
              className={`w-1/3 p-2 rounded-lg text-sm ${paymentMethod === "card" ? "bg-[#007580] text-white" : "bg-gray-200"}`}
            >
              Credit/Debit Card
            </button>
            <button
              onClick={() => handlePaymentMethodChange("cash")}
              className={`w-1/3 p-2 rounded-lg text-sm ${paymentMethod === "cash" ? "bg-[#007580] text-white" : "bg-gray-200"}`}
            >
              Cash on Delivery
            </button>
            <button
              onClick={() => handlePaymentMethodChange("paypal")}
              className={`w-1/3 p-2 rounded-lg text-sm ${paymentMethod === "paypal" ? "bg-[#007580] text-white" : "bg-gray-200"}`}
            >
              PayPal
            </button>
          </div>
        </div>

        {/* Conditional Rendering for Payment Method */}
        {paymentMethod === "card" && (
          <form onSubmit={handlePayment} className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Card Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleCardChange}
                  placeholder="1234 5678 9876 5432"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardChange}
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {paymentMethod === "cash" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Cash on Delivery</h2>
            <p className="text-sm text-gray-600">You will pay cash when the order is delivered.</p>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Pay with PayPal</h2>
            <p className="text-sm text-gray-600">You will be redirected to PayPal to complete your payment.</p>
          </div>
        )}

        {/* Final Payment Button */}
        {paymentMethod && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              onClick={handlePayment}
              disabled={isSubmitting}
              className={`bg-[#007580] text-white px-6 py-2 rounded-lg text-sm ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;