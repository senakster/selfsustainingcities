import { DocumentStore } from 'sanity'
import { StructureBuilder, ListItemBuilder, ListItem, Divider } from 'sanity/structure'
import { groq } from 'next-sanity'
import { map, tap } from 'rxjs/operators'
import { apiVersion } from '../../env'
import { DocumentIcon, SchemaIcon } from '@sanity/icons'
import { supportedLanguages } from '@/lib/i18n/locales'

type TPageReferenceTree = Array<{
  _id: string
  title: string
  _type: string
  children?: Array<{
    _id: string
    title: string
    _type: string
    children?: Array<{
      _id: string
      title: string
      _type: string
    }>
  }>
}>

export default function pageReferenceTree(
  S: StructureBuilder,
  documentStore: DocumentStore,
  lang: typeof supportedLanguages[number]['id'] = 'en',
) {
  const query = groq`
  *[_type in ["page"] && language == $lang && !(_id in path("drafts.**")) && !defined(parent)] | order(lower(title) asc) [] {
    _id,
    title,
    _type,
    'children': *[_type in ["page"] && !(_id in path("drafts.**")) && parent._ref == ^._id] | order(lower(title) asc) [] {
      _id,
      title,
      _type,
      'children': *[_type in ["page"] && !(_id in path("drafts.**")) && parent._ref == ^._id] | order(lower(title) asc) [] {
        _id,
        title,
        _type,
      }
    }
  }`
  const options = { apiVersion }

  return S.listItem()
    .title('Pages')
    .icon(SchemaIcon)
    .child(() =>
      documentStore.listenQuery(query, { lang }, options).pipe(
        map((parents: TPageReferenceTree) =>
          S.list()
            .id('pages')
            .title('Pages')
            .menuItems([
              S.menuItem()
                .title('Add Page')
                .intent({
                  type: 'create',
                  params: { type: 'page', template: `page-${lang}` },
                }),
            ])
            .items(buildTree(parents, S, lang)),
        ),
      ),
    )
}

function buildTree(
  parents: TPageReferenceTree,
  S: StructureBuilder,
  lang: typeof supportedLanguages[number]['id'],
): (ListItemBuilder | ListItem | Divider)[] {
  return parents.sort().map((parent) => {
    const { _id, _type, title, children } = parent
    if (!children || children.length === 0) {
      return S.documentListItem().title(title).icon(DocumentIcon).schemaType(_type).id(_id)
    }

    return S.listItem()
      .title(title)
      .id(`pages-${_id}`)
      .child(
        S.list()
          .title(title)
          .menuItems([
            S.menuItem()
              .title('Add Page')
              .intent({
                type: 'create',
                params: [{ type: 'page', template: `page-${lang}-parent` }, { parentId: _id }],
              }),
          ])
          .items([
            S.documentListItem().schemaType(_type).title(title).id(_id),
            S.divider(),
            ...buildTree(children, S, lang),
          ]),
      )
  })
}
