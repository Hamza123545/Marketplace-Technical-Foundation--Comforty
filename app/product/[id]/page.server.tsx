import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

export async function generateStaticParams() {
  const query = groq`*[_type == "products"] { _id }`;
  const products: { _id: string }[] = await client.fetch(query);

  return products.map((product) => ({
    id: product._id,
  }));
}
