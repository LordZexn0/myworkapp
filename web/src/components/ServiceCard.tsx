'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  slug?: string
  onCardClick: () => void
}

export default function ServiceCard({ title, description, imageUrl, onCardClick }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    console.log('Service card clicked:', title)
    onCardClick()
  }

  return (
    <div 
      className="group bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'bg-opacity-20' : 'bg-opacity-0'}`} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
        <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{description}</p>
        <div className="mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium">View Details</span>
          <svg 
            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
} 