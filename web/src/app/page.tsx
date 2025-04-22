import { getHomepageContent, getServices, client } from '@/lib/sanity'
import HomeClient from '@/components/HomeClient'

// Server component for data fetching
async function getData() {
  try {
    console.log('Fetching data...')
    const [homepageContent, services, contactForm] = await Promise.all([
      getHomepageContent(),
      getServices(),
      client.fetch('*[_type == "contactForm"][0]')
    ])
    
    console.log('Homepage Content:', homepageContent)
    console.log('Services:', services)
    console.log('Contact Form:', contactForm)

    if (!homepageContent) {
      console.error('No homepage content found')
      throw new Error('No homepage content found')
    }

    return { 
      homepageContent, 
      services: services || [],
      contactForm
    }
  } catch (error) {
    console.error('Error in getData:', error)
    throw error
  }
}

// Server component
export default async function Home() {
  const data = await getData()
  return <HomeClient {...data} />
}
