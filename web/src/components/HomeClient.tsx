'use client'

import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServicesSection from '@/components/ServicesSection'
import ContactForm from '@/components/ContactForm'

interface HomepageContent {
  backgroundVideo?: {
    asset: {
      url: string
    }
  }
  heroHeading: string
  heroTagline: string
  ctaText: string
  servicesHeading: string
  whyHeading: string
  whyDescription: string
  whyBullets: string[]
  whyImage: any
  ctaHeading: string
  ctaDescription: string
}

interface Service {
  title: string
  description: string
  icon?: any
}

interface ContactFormData {
  formTitle: string
  formDescription?: string
  fields: Array<{
    label: string
    name: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
    required: boolean
    placeholder?: string
    options?: string[]
  }>
  submitButtonText: string
  successMessage: string
  errorMessage: string
}

export default function HomeClient({ 
  homepageContent, 
  services,
  contactForm 
}: { 
  homepageContent: HomepageContent
  services: Service[]
  contactForm: ContactFormData | null
}) {
  console.log('HomeClient rendering with:', { homepageContent, services })
  console.log('Contact Form Data:', contactForm)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen">
          {/* Background Video */}
          {homepageContent.backgroundVideo?.asset?.url && (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              >
                <source src={homepageContent.backgroundVideo.asset.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Overlay to make content more readable */}
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
          )}

          {/* Hero Content */}
          <div className="relative h-full flex items-center justify-center pt-16">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className={`heading-1 mb-6 ${homepageContent.backgroundVideo ? 'text-white' : 'text-gray-900'}`}>
                  {homepageContent.heroHeading}
                </h1>
                <p className={`text-xl mb-8 ${homepageContent.backgroundVideo ? 'text-gray-200' : 'text-gray-600'}`}>
                  {homepageContent.heroTagline}
                </p>
                <a
                  href="#why-choose-us"
                  className="btn-primary"
                >
                  {homepageContent.ctaText}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection 
          services={services} 
          heading={homepageContent.servicesHeading} 
        />

        {/* Why Choose Us Section */}
        <section id="why-choose-us" className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="heading-2 mb-6">{homepageContent.whyHeading}</h2>
                <p className="text-gray-600 mb-6">{homepageContent.whyDescription}</p>
                {homepageContent.whyBullets && homepageContent.whyBullets.length > 0 && (
                  <ul className="space-y-3">
                    {homepageContent.whyBullets.map((bullet: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-[#4A90E2] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {homepageContent.whyImage && (
                <div className="relative h-96">
                  <Image
                    src={urlFor(homepageContent.whyImage).url()}
                    alt="Why Choose Us"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-20 bg-white">
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto">
              {contactForm && contactForm.fields ? (
                <div className="transform hover:scale-[1.01] transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl">
                    <ContactForm {...contactForm} />
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-white mb-6">{homepageContent.ctaHeading}</h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    {homepageContent.ctaDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 