import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const key = `paste:${params.id}`;
  const paste = await redis.get<any>(key);

  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (paste.max_views !== null && paste.views >= paste.max_views) {
    await redis.del(key);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await redis.incr(`${key}:views`);
  paste.views += 1;

  if (paste.max_views !== null && paste.views > paste.max_views) {
    await redis.del(key);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const expires_at =
    paste.ttl_seconds !== null
      ? new Date(paste.created_at + paste.ttl_seconds * 1000).toISOString()
      : null;

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.max_views === null ? null : paste.max_views - paste.views,
    expires_at,
  });
}
