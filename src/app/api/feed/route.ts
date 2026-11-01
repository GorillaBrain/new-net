import { NextRequest, NextResponse } from "next/server";
import { getSystemState, rankFeedPosts } from "@/lib/store";
import { FeedPreferences } from "@/lib/types";

export async function GET(req: NextRequest) {
  const state = getSystemState();
  const { searchParams } = new URL(req.url);
  const modeOverride = searchParams.get("mode") as FeedPreferences["mode"] | null;

  const effectivePreferences: FeedPreferences = modeOverride
    ? { ...state.feedPreferences, mode: modeOverride }
    : state.feedPreferences;

  const ranked = rankFeedPosts(state.posts, effectivePreferences);

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    adapterMode: state.adapterMode,
    activePreferences: effectivePreferences,
    totalPosts: ranked.length,
    visiblePosts: ranked.filter((p) => !p.filteredOut).length,
    filteredPostsCount: ranked.filter((p) => p.filteredOut).length,
    feed: ranked,
  });
}
