import { defineField, defineType } from "sanity";
import { CogIcon, DashboardIcon, SearchIcon } from '@sanity/icons'
import { groq } from 'next-sanity'


export default defineType({
  name: "page",
  type: "document",
  groups: [
    { name: 'settings', icon: CogIcon },
    { name: 'content', icon: DashboardIcon },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    defineField({
      type: "string",
      name: "title",
      group: "settings",
    }),
    defineField({
      type: 'hero',
      name: 'hero',
      group: 'content',
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'settings',
    }),
    defineField({
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      group: 'settings',
      to: [{ type: 'page' }],
      options: {
        // Filter out the page itself + unpublished pages + 3 level deep pages + pages that, added up, dont count 3 levels
        filter: ({ document }) => {
          return {
            filter: groq`
            language == $lang &&
            !(_id in $ids) &&
            !(_id in path("drafts.**")) &&
            !defined(parent->.parent._ref) && 
            !(parent._ref in $ids) &&
            count(*[_type in ['page'] && parent->parent._ref == $id]) == 0 &&
            (
              count(*[_type in ['page'] && parent._ref == $id]) > 0 && 
              !defined(parent._ref) || 
              count(*[_type in ['page'] && parent._ref == $id]) == 0
            )
            `,
            params: {
              lang: document.language,
              ids: [document._id, document._id.replace('drafts.', '')],
              id: document._id.replace('drafts.', ''),
            },
          }
        },
      },
    }),
    defineField({
      title: "Content",
      name: "content",
      type: "contentblocks",
      group: 'content',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
    })
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      parent: 'parent.slug.current',
      grandParent: 'parent.parent.slug.current',
      media: 'hero.image',
    },

    prepare({ title, slug, parent, grandParent, media }) {
      const path = `/${[grandParent, parent, slug].filter(Boolean).join('/')}`
      return {
        title,
        subtitle: `${path}`,
        media,
      }
    },
  },
});
