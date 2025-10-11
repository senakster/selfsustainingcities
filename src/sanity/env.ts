export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-09-15";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const previewToken = assertValue(process.env.NEXT_PUBLIC_PREVIEW_TOKEN, "Missing environment variable: NEXT_PUBLIC_PREVIEW_TOKEN") ;

// export const editorToken = assertValue(process.env.SANITY_STUDIO_EDITOR_TOKEN, "Missing environment variable: SANITY_STUDIO_EDITOR_TOKEN")
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
