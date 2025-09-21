import { Image, defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "baseImage",
  title: "Base image",
  type: "image",
  icon: ImageIcon,
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Vigtigt for tilgængelighed og SEO",
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: "alt",
      image: "asset",
    },

    prepare({ title, image }) {
      return {
        title,
        subtitle: "Image",
        media: image,
      };
    },
  },
});

export type TBaseImage = {
  _key: string;
  _type: "baseImage";
  image?: Image;
  alt?: string;
  // caption?: string
};
