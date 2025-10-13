import { defineField, defineType, defineArrayMember } from "sanity";
import { EarthGlobeIcon, LinkIcon } from "@sanity/icons";

export default defineType({
  name: "portabletext",
  title: "Portable text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Strike", value: "strike-through" },
        ],
        annotations: [
          defineField({
            name: 'link',
            type: 'object',
            title: 'Link',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'flexiblelink',
              }),
            ],
          })
        ],
      }
    }),
    {
      type: 'baseImage',
    },
  ],
});
