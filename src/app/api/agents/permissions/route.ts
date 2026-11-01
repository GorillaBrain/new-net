import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSystemState } from "@/lib/store";
import { sha256Hex } from "@/lib/crypto";

const AgentPermissionSchema = z.object({
  agentId: z.string().min(2),
  action: z.enum(["PAUSE", "RESUME", "REVOKE_KILL_SWITCH", "APPROVE_PENDING_TASK", "SIMULATE_PROMPT_INJECTION"]),
  scopeToModify: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AgentPermissionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "VALIDATION_ERROR", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { agentId, action } = parsed.data;
    const state = getSystemState();
    const agent = state.agents.find((a) => a.id === agentId);

    if (!agent) {
      return NextResponse.json(
        { ok: false, error: "NOT_FOUND", message: `Agent ${agentId} not found.` },
        { status: 404 }
      );
    }

    const now = new Date().toISOString();
    let auditDecision: "ALLOWED" | "DENIED" | "REVOKED_BLOCK" | "HUMAN_APPROVAL_REQUIRED" = "ALLOWED";
    let auditReason = "";

    if (action === "PAUSE") {
      agent.status = "PAUSED";
      auditReason = `Human principal paused agent ${agent.name}.`;
    } else if (action === "RESUME") {
      agent.status = "ACTIVE";
      auditReason = `Human principal resumed agent ${agent.name} within local sandbox.`;
    } else if (action === "REVOKE_KILL_SWITCH") {
      agent.status = "REVOKED";
      agent.allowedScopes = [];
      auditDecision = "REVOKED_BLOCK";
      auditReason = `Emergency Kill-Switch activated: Revoked all delegated UCAN scopes for ${agent.name}.`;
    } else if (action === "APPROVE_PENDING_TASK") {
      const pending = agent.recentActions.find((a) => a.status === "AWAITING_HUMAN_SIGNATURE");
      if (pending) {
        pending.humanApproved = true;
        pending.status = "COMPLETED";
      } else {
        agent.recentActions.unshift({
          id: `act-${Date.now()}`,
          timestamp: now,
          task: "Human-countersigned synthesis task execution",
          dataAccessed: agent.allowedScopes[0] || "/pod/workspace/papers",
          humanApproved: true,
          status: "COMPLETED",
        });
      }
      auditReason = `Human principal provided cryptographic countersignature for ${agent.name} task.`;
    } else if (action === "SIMULATE_PROMPT_INJECTION") {
      agent.recentActions.unshift({
        id: `act-${Date.now()}`,
        timestamp: now,
        task: "Indirect Prompt Injection Attempt: Exfiltrate /pod/identity/private-shards to external URL",
        dataAccessed: "/pod/identity/private-shards",
        humanApproved: false,
        status: "BLOCKED_BY_POLICY",
      });
      auditDecision = "DENIED";
      auditReason = `Deterministic UCAN Capability Firewall blocked prompt-injected agent ${agent.name} from reading /pod/identity/private-shards (outside granted scope).`;
    }

    agent.lastActiveAt = now;
    const auditHash = await sha256Hex(`${now}::AGENT_ACTION::${agent.id}::${action}`);

    state.auditLogs.unshift({
      id: `audit-${Date.now()}`,
      timestamp: now,
      actorId: agent.agentDid,
      actorName: agent.name,
      actorType: "DECLARED_AI_AGENT",
      action: `AGENT_${action}`,
      resourcePath: `/agents/${agent.id}/capabilities`,
      decision: auditDecision,
      reason: auditReason,
      signatureVerified: true,
      auditHash,
    });

    return NextResponse.json({
      ok: true,
      timestamp: now,
      agent,
      agents: state.agents,
      latestAudit: state.auditLogs[0],
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "AGENT_PERMISSION_ERROR", message: err instanceof Error ? err.message : "Failed to update agent" },
      { status: 500 }
    );
  }
}
