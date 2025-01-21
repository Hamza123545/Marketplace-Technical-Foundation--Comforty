"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface Category {
  _id: string;
  title: string;
  imageUrl: string; // Resolved image URL
  products: number;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories data from Sanity
  useEffect(() => {
    const fetchCategories = async () => {
      const query = groq`*[_type == "categories"] {
        _id,
        title,
        "imageUrl": image.asset->url, // Resolve image URL
        products
      }`;

      const data: Category[] = await client.fetch(query);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full px-4 py-[7rem] md:px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight  mb-8">
          Top Categories
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={"../components/productDectription/discription"}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] w-full">
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                  width={400}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                <div className="absolute bottom-0 p-6">
                  <h3 className="mb-2 font-inter text-xl font-medium text-white">
                    {category.title}
                  </h3>
                  <p className="font-inter text-sm text-gray-200">
                    {category.products} Products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
