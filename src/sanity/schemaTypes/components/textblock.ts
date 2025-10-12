import { defineField, defineType } from "sanity";

export default defineType({
  name: "textblock",
  type: "object",
  fields: [
    defineField({
      name: "text",
      type: "portabletext",
    }),
  ],
  preview: {
    select: {
      title: "text.0.children[0].text",
    },
    prepare(selection) {
      return { title: selection.title };
    },
  },
});
