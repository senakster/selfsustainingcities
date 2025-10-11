import type { StructureResolver } from 'sanity/structure'
import { DocumentsIcon, HomeIcon, CogIcon } from '@sanity/icons'

import pageReferenceTree from './pageReferenceTreei18Lang'
import { supportedLanguages } from '@/lib/i18n/locales'
import { singletonIds, LanguageIcons } from '@/lib/i18n/settings'

export const structure: StructureResolver = (S, { documentStore }) =>
  S.list()
    .title('Base')
    .items([
      ...supportedLanguages.map(
        (lang: typeof supportedLanguages[number]) =>
          S.listItem()
            .title(lang.title)
            .icon(LanguageIcons[lang.id as keyof typeof LanguageIcons])
            .child(
              S.list()
                .title(`Content ${lang.title}`)
                .items([
                  S.documentListItem()
                    .title('Frontpage')
                    .schemaType('page')
                    .icon(HomeIcon)
                    .id(singletonIds[lang.id as keyof typeof singletonIds].frontpage),

                  pageReferenceTree(S, documentStore, lang.id),
                  // S.listItem()
                  //   .title('Pages')
                  //   .child(
                  //     S.documentList()
                  //       .title(`All Pages`)
                  //       .apiVersion(`v${apiVersion}`)
                  //       .filter(groq`_type in ["page"] && language == $lang && (!defined(parent))`)
                  //       .params({ lang: lang.id }),
                  //   ),
                  // S.documentListItem()
                  //   .title('Settings')
                  //   .schemaType('settings')
                  //   .icon(CogIcon)
                  //   .id(singletonIds[lang.id].settings),
                ]),
            ),
        /** Mixed documents view */
        // S.documentList()
        // .title(`All Pages`)
        // .apiVersion(`v${apiVersion}`)
        // .filter('_type in ["frontpage", "landingpage", "settings"] && language == $lang')
        // .params({ lang: lang.id }),
        /** Frontpage view */
        //   S.list()
        //     .title('Frontpage')
        //     .items([
        //       S.listItem()
        //         .title('Frontpage')
        //         .schemaType('frontpage')
        //         .icon(HomeIcon)
        //         .id('656da6b1-0df8-42b4-b6d2-90418a9bbcbf'),
        //     ]),
        // ),
      ),
      // S.divider(),
      // // Settings
      // S.documentListItem()
      //   .title('Settings')
      //   .icon(CogIcon)
      //   .schemaType('settings')
      //   .id('63a6d7d5-94d9-4488-83b0-1714b395b961'),
    ])
