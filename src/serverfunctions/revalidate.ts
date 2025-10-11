'use server'

import { revalidatePath } from "next/cache";

export async function revalidatePage(slug: string) {
  revalidatePath(slug, "page");
}

export async function revalidateAllPages() {
  revalidatePath("/", "layout");
}
