import { defineField, defineType } from "sanity";
import { CogIcon, DashboardIcon, SearchIcon } from '@sanity/icons'
import { toUrlSafe, isUniqueAcrossLanguage} from '../../lib/helpers'
import { groq } from 'next-sanity'


export default defineType({
  name: "page",
  type: "document",
  groups: [
    { name: 'settings', title: 'Settings', icon: CogIcon },
    { name: 'content', title: 'Content', icon: DashboardIcon, default: true },
    { name: 'seo', title: 'SEO', icon: SearchIcon },
  ],
  fields: [
    defineField({
      type: "string",
      name: "title",
      group: "settings",
    }),
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
      group: 'settings',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Must only contain url-safe characters and no spaces. Should preferably be generated. Frontpage should be empty',
      options: {
        source: 'title',
        slugify: toUrlSafe,
        isUnique: isUniqueAcrossLanguage,
      },
      validation: (SlugRule) =>
        SlugRule.custom((self) => {
          if (!self || !self?.current) return true
          const slug = self.current
          if (toUrlSafe(slug) != slug) return 'Slug is not URL-safe'
          return true
        }),
      group: 'settings',
    }),
    defineField({
      name: 'parent',
      title: 'Parent page',
      type: 'reference',
      description: 'Set parent page. Will place page at [parent slug]/slug',
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
      type: 'hero',
      name: 'hero',
      group: 'content',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      }
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
      options: {
        collapsible: true,
        collapsed: true, // Starts expanded
        columns: 1
      },
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
