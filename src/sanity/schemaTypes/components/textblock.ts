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
});
