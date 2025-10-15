"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { CogIcon, DocumentIcon } from '@sanity/icons'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/plugins/structure";
import {media} from 'sanity-plugin-media'
// import { structure } from "./src/sanity/structure";
import { defaultDocumentNode } from "./src/sanity/plugins/structure/defaultDocumentNode";
import { supportedLanguages } from "./src/lib/i18n/locales";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    ...schema, 
    templates: (templates) => [
      ...templates
        .map((template) => ({ ...template })),
      ...supportedLanguages
        .map((lang) => [
          {
            icon: DocumentIcon,
            id: `page-${lang.id}-parent`,
            title: `Page parent (${lang.title})`,
            schemaType: 'page',
            parameters: [{ name: 'parentId', type: 'string' }],
            value: (params: { parentId: string }) => ({
              parent: {
                _type: 'reference',
                _ref: params.parentId,
              },
              language: lang.id,
            }),
          },
        ])
        .flat(),
    ],
  },
  plugins: [
    documentInternationalization({
      // Required configuration
      supportedLanguages: supportedLanguages,
      schemaTypes: ["page"],
    }),
    structureTool({ defaultDocumentNode, structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    media(),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
