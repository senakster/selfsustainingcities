import { defineType, defineField } from "sanity";
import { LinkIcon } from "@sanity/icons";

export default defineType({
  name: "flexiblelink",
  type: "object",
  options: { collapsible: false },
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      type: "flexiblerefs",
      // hidden: ({ parent }) => !parent?.title,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
