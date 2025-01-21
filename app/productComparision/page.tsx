"use client";

import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client"; // Import your client setup
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/client"; // Import the urlFor function for image rendering

type Product = {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount?: number;
  image: any; // Image reference from Sanity
  description: string;
  isNew?: boolean;
  isSale?: boolean;
};

const ProductComparison = () => {
  const [products, setProducts] = useState<Product[]>([]); // Store products fetched from Sanity
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); // Store products selected for comparison

  // Fetch products from Sanity when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      const query = groq`*[_type == "products"][1..8]{
        _id,
        title,
        price,
        priceWithoutDiscount,
        image,
        description,
        isNew,
        isSale
      }`;

      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // Handle adding/removing products to/from comparison
  const toggleComparison = (product: Product) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.some((item) => item._id === product._id)
        ? prevSelected.filter((item) => item._id !== product._id)
        : [...prevSelected, product]
    );
  };

  // Clear all selected products
  const clearComparison = () => {
    setSelectedProducts([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Product Comparison</h1>

        {/* Displaying all products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Image rendering using urlFor */}
              <img
                src={urlFor(product.image).width(400).url()} // Using urlFor for image rendering
                alt={product.title}
                className="h-48 w-full object-contain rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-lg font-semibold">${product.price}</p>
                {product.priceWithoutDiscount && (
                  <p className="text-sm text-gray-500 line-through">${product.priceWithoutDiscount}</p>
                )}
              </div>
              <button
                onClick={() => toggleComparison(product)}
                className={`w-full px-4 py-2 rounded-lg ${
                  selectedProducts.some((item) => item._id === product._id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-[#007580] text-white hover:bg-[#005f6b]"
                } transition-colors`}
              >
                {selectedProducts.some((item) => item._id === product._id)
                  ? "Remove from Comparison"
                  : "Add to Comparison"}
              </button>
            </div>
          ))}
        </div>

        {/* Displaying selected products for comparison */}
        {selectedProducts.length > 0 && (
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Comparison Details</h2>
              <button
                onClick={clearComparison}
                className="px-4 py-2 bg-[#007580] text-white rounded-lg hover:bg-[#005f6b] transition-colors"
              >
                Clear Comparison
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                    {selectedProducts.map((product) => (
                      <th key={product._id} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        {product.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">Image</td>
                    {selectedProducts.map((product) => (
                      <td key={product._id} className="px-6 py-4">
                        <img
                          src={urlFor(product.image).width(200).url()}
                          alt={product.title}
                          className="h-24 w-full object-contain"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">Price</td>
                    {selectedProducts.map((product) => (
                      <td key={product._id} className="px-6 py-4 text-sm text-gray-700">
                        ${product.price}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">Description</td>
                    {selectedProducts.map((product) => (
                      <td key={product._id} className="px-6 py-4 text-sm text-gray-700">
                        {product.description}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="px-6 py-4 text-sm text-gray-700">Discount</td>
                    {selectedProducts.map((product) => (
                      <td key={product._id} className="px-6 py-4 text-sm text-gray-700">
                        {product.priceWithoutDiscount ? (
                          <span className="text-red-500">
                            ${product.priceWithoutDiscount - product.price} off
                          </span>
                        ) : (
                          "No discount"
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComparison;