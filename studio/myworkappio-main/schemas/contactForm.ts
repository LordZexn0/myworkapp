import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form',
  type: 'document',
  fields: [
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text'
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Field Label',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'name',
              title: 'Field Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'type',
              title: 'Field Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                  { title: 'Textarea', value: 'textarea' },
                  { title: 'Select', value: 'select' }
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false
            },
            {
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string'
            },
            {
              name: 'options',
              title: 'Options (for select fields)',
              type: 'array',
              of: [{ type: 'string' }],
              hidden: ({ parent }) => parent?.type !== 'select'
            }
          ]
        }
      ],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message'
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      initialValue: 'Thank you for your message. We will get back to you soon!'
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'text',
      initialValue: 'Something went wrong. Please try again.'
    })
  ]
}) 