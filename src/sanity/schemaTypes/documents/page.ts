import { defineField, defineType } from "sanity";

export default defineType({
    name: 'page',
    type: 'document',
    fields: [
        defineField({
            type: 'string',
            name: 'title',
        }),
        defineField({
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200, // will be ignored if slugify is set
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            },
        }),
        defineField({
            title: 'Parent',
            name: 'parent',
            type: 'reference',
            to: [{
                type: 'page'
            }],
            hidden: ({ document }) => {
                console.log(document?.slug)
                return document?.slug == '/'
            }
        })
    ]
})