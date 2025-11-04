import { defineType, defineField } from "sanity";

export default defineType({
    name: 'textimage',
    title: 'Text Image',
    type: 'object',
    fields: [
        defineField(    {
            name: 'text',
            title: 'Text',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'baseImage',
        }   ),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'flexiblelink',
        } )  ,
        defineField({
            name: 'imageAlignment',
            title: 'Image Alignment',
            type: 'string',
            options: {
                list: ['left', 'right'],
            },
        }   ),
    ]   ,
    preview: {
        select: {
            title: 'text',
            image: 'image',
            link: 'link',
            imageAlignment: 'imageAlignment',
        },
        prepare(selection) {
            return { title: selection.title, media: selection.image, subtitle: selection.imageAlignment };
        },
    }
})