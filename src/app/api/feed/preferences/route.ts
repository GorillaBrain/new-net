import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState, rankFeedPosts } from "@/lib/store";

const FeedPreferencesSchema = z.object({
  mode: z
    .enum([
      "CHRONOLOGICAL",
      "RELEVANCE",
      "COMMUNITY_CURATED",
      "USER_DEFINED",
      "ENGAGEMENT_SURVEILLANCE_SIMULATION",
    ])
    .optional(),
  weights: z
    .object({
      recency: z.number().min(0).max(100),
      citationsAndProvenance: z.number().min(0).max(100),
      communityTrust: z.number().min(0).max(100),
      topicAffinity: z.number().min(0).max(100),
      sensationalismPenalty: z.number().min(0).max(100),
    })
    .optional(),
  hideUnverifiedAi: z.boolean().optional(),
  hideRageBaitClusters: z.boolean().optional(),
  preferredTopics: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FeedPreferencesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const state = getSystemState();
    const update = parsed.data;

    state.feedPreferences = {
      ...state.feedPreferences,
      ...(update.mode ? { mode: update.mode } : {}),
      ...(update.weights ? { weights: update.weights } : {}),
      ...(typeof update.hideUnverifiedAi === "boolean"
        ? { hideUnverifiedAi: update.hideUnverifiedAi }
        : {}),
      ...(typeof update.hideRageBaitClusters === "boolean"
        ? { hideRageBaitClusters: update.hideRageBaitClusters }
        : {}),
      ...(update.preferredTopics ? { preferredTopics: update.preferredTopics } : {}),
    };

    const ranked = rankFeedPosts(state.posts, state.feedPreferences);

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      preferences: state.feedPreferences,
      feed: ranked,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "PREFERENCES_ERROR", message: err instanceof Error ? err.message : "Failed to update feed preferences" },
      { status: 500 }
    );
  }
}
