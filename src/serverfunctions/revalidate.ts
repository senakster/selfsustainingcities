import { revalidatePath } from "next/cache";

export async function revalidatePage(slug: string) {
  return revalidatePath(slug, "page");
}

export async function revalidateAllPages() {
  return revalidatePath("/", "layout");
}
