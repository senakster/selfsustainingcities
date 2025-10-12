import { NextRequest } from "next/server";
import { revalidateAllPages, revalidatePage } from "@/serverfunctions";

const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  // Parse the request body
  const body = await request.json();
  if (!body.secret) {
    return new Response(JSON.stringify({ error: "Secret is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (body.secret !== secret) {
    return new Response(JSON.stringify({ error: "Invalid secret" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  // e.g. Insert new user into your DB
  if (body.slug) {
    revalidatePage(body.slug);
  }
  revalidateAllPages();

  return new Response(JSON.stringify(body), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET() {
  revalidateAllPages();
  return new Response(JSON.stringify({ message: "Revalidated all pages" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}