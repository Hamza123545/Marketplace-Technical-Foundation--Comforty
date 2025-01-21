"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa"; // Icons for search and close
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Fetch products based on search query
  const fetchProducts = async (query: string) => {
    const searchQuery = groq`*[_type == "products" && title match $query] {
      _id,
      title,
      price,
      "imageUrl": image.asset->url
    }`;
    const results = await client.fetch(searchQuery, { query: `*${query}*` });
    setSearchResults(results);
  };

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      fetchProducts(query);
    } else {
      setSearchResults([]);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search bar (for mobile)
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <nav className="w-full bg-white pt-[14px] pb-[14px]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-0">
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 ml-3">
          <Link href="/" className="text-[#007580] text-[14px] font-medium">
            Home
          </Link>
          <Link href="/product" className="text-[14px] font-medium">
            Shop
          </Link>
          <Link href="/product" className="text-[14px] font-medium">
            Product
          </Link>
          <Link href="/faq" className="text-[14px] font-medium">
            Pages
          </Link>
          <Link href="/about" className="text-[14px] font-medium">
            About
          </Link>
          <Link href="/productComparision" className="text-[14px] font-medium">
            Product Comparision
          </Link>
        </div>

        {/* Desktop Search Bar and Contact Info */}
        <div className="hidden md:flex items-center gap-4 ml-auto mr-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007580]"
            />
            {searchQuery && (
              <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/product/${product._id}`}
                      className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-4"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-medium">{product.title}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No results found</p>
                )}
              </div>
            )}
          </div>
          <Link href="/contact">
            <span className="font-normal text-[#636270] text-[14px]">
              Contact:
            </span>
          </Link>
          <span className="font-medium text-[#272343] text-[14px] ml-1">
            (808) 555-0111
          </span>
        </div>

        {/* Mobile Menu and Search Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <button onClick={toggleSearch} className="p-2">
            {isSearchOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaSearch className="w-5 h-5" />
            )}
          </button>
          <button onClick={toggleMenu} className="p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden px-4 py-2 border-t border-gray-200">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#007580]"
          />
          {searchQuery && (
            <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product._id}
                    href={`/product/${product._id}`}
                    className="block px-4 py-2 hover:bg-gray-100 flex items-center gap-4"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-sm font-medium">{product.title}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 mt-4 px-4">
          <Link href="/" className="text-[#007580] text-[14px] font-medium">
            Home
          </Link>
          <Link href="/product" className="text-[14px] font-medium">
            Shop
          </Link>
          <Link href="/product" className="text-[14px] font-medium">
            Product
          </Link>
          <Link href="/faq" className="text-[14px] font-medium">
            Pages
          </Link>
          <Link href="/about" className="text-[14px] font-medium">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;