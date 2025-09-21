import { type SchemaTypeDefinition } from "sanity";
import documents from "./documents";
import objects from "./objects";
import components from "./components";


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...objects, ...components, ...documents],
};
