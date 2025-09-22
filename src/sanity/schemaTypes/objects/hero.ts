import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
        name: 'leadText',
        title: 'Lead text',
        type: 'textblock',
      }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'baseImage',
    }),
  ],
})
