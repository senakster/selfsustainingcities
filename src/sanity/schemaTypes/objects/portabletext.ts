import { defineField, defineType } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'
// const HighlightDecorator = (props: any) => {
//     return (
//         <span style= {{ color: '#197d6f', fontWeight: 700 }
// } className = {`__highlight`}>
//     { props.children }
//     </span>
//   )
// }
// const NoBreakDecorator = (props: any) => {
//     return (
//         <span style= {{ whiteSpace: 'nowrap', textDecoration: 'underline' }
// } className = {`__noBreak`}>
//     { props.children }
//     </span>
//   )
// }

export const portableBaseText = defineType({
    name: 'portableBaseText',
    title: 'Tekst',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Strike', value: 'strike-through' },
                    // {
                    //     title: 'Highlight Color',
                    //     value: 'highlight',
                    //     icon: () => 'H',
                    //     component: HighlightDecorator,
                    // },
                    // {
                    //     title: 'Prevent wordbreak',
                    //     value: 'noBreak',
                    //     icon: () => 'b',
                    //     component: NoBreakDecorator,
                    // },
                ],
                annotations: [
                    {
                        name: 'externalLink',
                        type: 'object',
                        title: 'External link',
                        icon: EarthGlobeIcon,
                        fields: [
                            {
                                name: 'href',
                                type: 'string',
                                title: 'URL',
                                // validation: (Rule: any) => Rule.custom(urlValidator),
                            },
                        ],
                    },

                    defineField({
                        name: 'internalLink',
                        type: 'linkInternal',
                        title: 'Internal link',
                    }),
                ],
            },
        },
    ],
})

export const portableH1Text = defineType({
    name: 'portableH1Text',
    title: 'H1 Tekst',
    type: 'array',
    of: [
        {
            type: 'block',
            marks: {
                decorators: [
                    // {
                    //     title: 'Highligt Color',
                    //     value: 'highlight',
                    //     icon: () => 'H',
                    //     component: HighlightDecorator,
                    // },
                    // {
                    //     title: 'Prevent wordbreak',
                    //     value: 'noBreak',
                    //     icon: () => 'b',
                    //     component: NoBreakDecorator,
                    // },
                ],
                annotations: [],
            },
            lists: [],
        },
    ],
})

export default defineType({
    name: 'portabletext',
    title: 'Portable text',
    type: 'array',
    of: [
        {
            type: 'block',
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            marks: {
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Strike', value: 'strike-through' },
                    // {
                    //     title: 'Highligt Color',
                    //     value: 'highlight',
                    //     icon: () => 'H',
                    //     component: HighlightDecorator,
                    // },
                ],
                annotations: [
                    {
                        name: 'link',
                        type: 'flexiblelink',
                        title: 'Link',
                        icon: EarthGlobeIcon,
                    },
                ],
            },
        },
        // defineArrayMember({
        //     type: 'baseImage',
        // }),
        // defineArrayMember({
        //     type: 'video',
        // }),
    ],
})