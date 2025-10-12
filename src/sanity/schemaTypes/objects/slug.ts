import { defineType } from 'sanity'
import { toUrlSafe, isUniqueAcrossLanguage} from '../../lib/helpers'

export default defineType({
    name: 'slug',
    type: 'slug',
    description: 'Unique page identifier. Should preferably be generated.',
    options: {
      source: 'title',
      slugify: toUrlSafe,
      isUnique: isUniqueAcrossLanguage,
    },
    validation: (SlugRule) =>
      SlugRule.custom((self) => {
        if (!self || !self?.current) return 'Slug is required'
        const slug = self.current
        if (toUrlSafe(slug) != slug) return 'Slug is not URL-safe'
        return true
      }),
  })