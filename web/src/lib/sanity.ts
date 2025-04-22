import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production only
  token: process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_SANITY_API_TOKEN : undefined, // Only use token in development
  stega: false, // Disable visual editing
  perspective: 'published',
  withCredentials: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch homepage content
export async function getHomepageContent() {
  const query = `*[_type == "homepageContent"][0]{
    _id,
    heroHeading,
    heroTagline,
    ctaText,
    backgroundVideo {
      asset->{
        url,
        _id
      }
    },
    whyHeading,
    whyDescription,
    whyBullets,
    whyImage,
    servicesHeading,
    ctaHeading,
    ctaDescription,
    ctaButtonText
  }`
  return await client.fetch(query)
}

// Fetch all services
export async function getServices() {
  const query = `*[_type == "services"]{
    _id,
    title,
    slug,
    description,
    mainImage,
    features[]{
      title,
      description,
      icon
    },
    benefits,
    useCases[]{
      title,
      description,
      image
    }
  }`
  return await client.fetch(query)
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string) {
  const query = `*[_type == "services" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    description,
    mainImage,
    features[]{
      title,
      description,
      icon
    },
    benefits,
    useCases[]{
      title,
      description,
      image
    }
  }`
  return await client.fetch(query, { slug })
}

// Fetch contact information
export async function getContactInfo() {
  const query = `*[_type == "contact"][0]{
    email,
    phone,
    address,
    socialMedia[]{
      platform,
      url,
      icon
    }
  }`
  return await client.fetch(query)
}

export async function getFooter() {
  const query = `*[_type == "footer"][0]{
    companyName,
    companyDescription,
    email,
    phone,
    address,
    socialMedia[]{
      platform,
      url,
      icon
    }
  }`
  return await client.fetch(query)
}

export async function getContactForm() {
  try {
    const query = `*[_type == "contactForm"][0]{
      heading,
      description,
      formFields[]{
        fieldName,
        fieldType,
        placeholder,
        required,
        options
      },
      submitButtonText,
      successMessage,
      errorMessage
    }`
    const result = await client.fetch(query)
    console.log('Sanity Query Result:', result)
    return result
  } catch (error) {
    console.error('Error fetching contact form:', error)
    return null
  }
}