import { defineType, defineField } from "sanity";

export default defineType({
  name: "flexiblerefs",
  type: "object",
  options: { collapsible: false },
  validation: (Rule) => Rule.required(),

  fields: [
    defineField({
      name: "internal",
      type: "reference",
      to: { type: "page" },
      options: {
        disableNew: true,
      },
      // hidden: ({ parent }) => {
      //   return parent?.external ? true : false;
      // },
    }),

    defineField({
      name: "external",
      type: "flexibleurl",
      // hidden: ({ parent }) => {
      //   return parent?.internal ? true : false;
      // },
    }),
  ],
});
