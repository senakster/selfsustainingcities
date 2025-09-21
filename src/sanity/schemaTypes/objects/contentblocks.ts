import { defineType } from "sanity";

export default defineType({
  name: "contentblocks",
  type: "array",
  of: [
    {type: 'textblock'}
  ],
});