'use client'

import { useState } from 'react'
import ServiceCard from './ServiceCard'
import ServiceModal from './ServiceModal'
import { urlFor } from '@/lib/sanity'

interface ServicesSectionProps {
  services: any[]
  heading: string
}

export default function ServicesSection({ services, heading }: ServicesSectionProps) {
  const [selectedService, setSelectedService] = useState<any>(null)

  const handleServiceClick = (service: any) => {
    console.log('Handling service click:', service)
    setSelectedService(service)
  }

  const handleCloseModal = () => {
    console.log('Closing modal')
    setSelectedService(null)
  }

  console.log('Current selected service:', selectedService)
  console.log('Available services:', services)

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <h2 className="heading-2 text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-4 gap-8">
          {services?.map((service: any) => (
            <ServiceCard
              key={service._id}
              title={service.title}
              description={service.description}
              imageUrl={urlFor(service.mainImage).url()}
              onCardClick={() => handleServiceClick(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={handleCloseModal}
          title={selectedService.title}
          description={selectedService.description}
          imageUrl={urlFor(selectedService.mainImage).url()}
          details={selectedService.features?.map((feature: any) => 
            `• ${feature.title}: ${feature.description}`
          ).join('\n')}
        />
      )}
    </section>
  )
} 