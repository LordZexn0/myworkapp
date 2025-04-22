import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'whyHeading',
      title: 'Why Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'whyDescription',
      title: 'Why Section Description',
      type: 'text',
    }),
    defineField({
      name: 'whyBullets',
      title: 'Why Section Bullets',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'whyImage',
      title: 'Why Section Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Section Description',
      type: 'text',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
    }),
  ],
}) 