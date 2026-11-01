import { NextRequest, NextResponse } from "next/server";
import { getSystemState } from "@/lib/store";

export async function GET(req: NextRequest) {
  const state = getSystemState();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const targetPost = postId
    ? state.posts.find((p) => p.id === postId || p.cid === postId) || state.posts[0]
    : state.posts[0];

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    postId: targetPost.id,
    currentCid: targetPost.cid,
    title: targetPost.title,
    authorDid: targetPost.authorDid,
    authorName: targetPost.authorName,
    provenance: targetPost.provenance,
    versionHistory: targetPost.versionHistory,
    replicas: targetPost.replicas,
    allPostsLineage: state.posts.map((p) => ({
      id: p.id,
      title: p.title,
      cid: p.cid,
      versionsCount: p.versionHistory.length,
      replicasCount: p.replicas.length,
    })),
  });
}
