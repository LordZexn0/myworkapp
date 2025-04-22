'use client'

import { useState } from 'react'

interface FormField {
  label: string
  name: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  required: boolean
  placeholder?: string
  options?: string[]
}

interface ContactFormProps {
  formTitle: string
  formDescription?: string
  fields: FormField[]
  submitButtonText: string
  successMessage: string
  errorMessage: string
}

const defaultFields: FormField[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    required: true,
    placeholder: 'Your name'
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'Your email'
  },
  {
    label: 'Message',
    name: 'message',
    type: 'textarea',
    required: true,
    placeholder: 'Your message'
  }
]

export default function ContactForm({
  formTitle = 'Contact Us',
  formDescription,
  fields = defaultFields,
  submitButtonText = 'Send Message',
  successMessage = 'Thank you for your message. We will get back to you soon!',
  errorMessage = 'Something went wrong. Please try again.',
}: ContactFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: Object.entries(formData).map(([fieldName, value]) => ({
            fieldName,
            fieldValue: value,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitStatus('success')
      setFormData({})
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: FormField, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field.name]: value,
    }))
  }

  if (submitStatus === 'success') {
    return (
      <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-8 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-2">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-green-800">{successMessage}</h3>
      </div>
    )
  }

  const formFields = Array.isArray(fields) && fields.length > 0 ? fields : defaultFields

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{formTitle}</h2>
        {formDescription && (
          <p className="text-lg text-gray-600 max-w-xl mx-auto">{formDescription}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {formFields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  rows={4}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 form-focus-ring transition-all-fast resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={`mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg form-focus-ring transition-all-fast ${formData[field.name] ? 'text-gray-900' : 'text-gray-500'}`}
                >
                  <option value="">Select an option</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 form-focus-ring transition-all-fast"
                />
              )}
            </div>
          ))}
        </div>

        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-50 p-4 mt-6">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="mt-8 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all-fast
              ${isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-400 active:bg-blue-600'
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>
    </div>
  )
} 