import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const { content, ttl_seconds, max_views } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  if (ttl_seconds && (!Number.isInteger(ttl_seconds) || ttl_seconds < 1)) {
    return NextResponse.json({ error: "Invalid ttl_seconds" }, { status: 400 });
  }

  if (max_views && (!Number.isInteger(max_views) || max_views < 1)) {
    return NextResponse.json({ error: "Invalid max_views" }, { status: 400 });
  }

  const id = crypto.randomUUID();

  const paste = {
    content,
    max_views: max_views ?? null,
    created_at: Date.now(),
    ttl_seconds: ttl_seconds ?? null,
    views: 0,
  };

  await redis.set(`paste:${id}`, paste);

  if (ttl_seconds) {
    await redis.expire(`paste:${id}`, ttl_seconds);
  }

  return NextResponse.json({
    id,
    url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""}/p/${id}`,
  });
}
