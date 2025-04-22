import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'formSubmission',
  title: 'Form Submissions',
  type: 'document',
  fields: [
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
    }),
    defineField({
      name: 'formData',
      title: 'Form Data',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'fieldName',
              title: 'Field Name',
              type: 'string'
            },
            {
              name: 'fieldValue',
              title: 'Field Value',
              type: 'string'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' }
        ]
      },
      initialValue: 'new'
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text'
    })
  ],
  preview: {
    select: {
      submittedAt: 'submittedAt',
      name: 'formData.0.fieldValue',
      email: 'formData.1.fieldValue',
      message: 'formData.2.fieldValue'
    },
    prepare({ submittedAt, name, email, message }) {
      return {
        title: `Submitted at ${new Date(submittedAt).toLocaleString()}`,
        subtitle: `${name || ''}${email ? ` | ${email}` : ''}${message ? ` | ${message}` : ''}`
      };
    }
  }
}) 