import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'
import imageUrlBuilder from '@sanity/image-url'  // Import the image URL builder

// Create the Sanity client instance
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Create the URL builder for images
const builder = imageUrlBuilder(client)

// urlFor function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source)
}
