import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity'
import { randomUUID } from 'crypto'

export async function POST(request: Request) {
  try {
    const { formData } = await request.json()

    // Validate the form data
    if (!Array.isArray(formData) || formData.length === 0) {
      return NextResponse.json(
        { error: 'Invalid form data format' },
        { status: 400 }
      )
    }

    // Create a submission document in Sanity
    const submission = await client.create({
      _type: 'formSubmission',
      submittedAt: new Date().toISOString(),
      formData: formData.map(({ fieldName, fieldValue }) => ({
        _key: randomUUID(),
        fieldName,
        fieldValue
      })),
      status: 'new'
    })

    return NextResponse.json({
      success: true,
      submissionId: submission._id
    })
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Failed to process form submission' },
      { status: 500 }
    )
  }
} 