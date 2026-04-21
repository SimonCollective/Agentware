"use client";

import { useState } from "react";

const PASSWORD = "gale-anchor-harbor-08";

type Transcript = {
  date: string;
  title: string;
  summary: string;
  highlights: string[];
  file: string;
};

const transcripts: Transcript[] = [
  {
    date: "2026-03-20",
    title: "Session 1: Foundations",
    summary:
      "First structured session. Covered Claude vs Gemini, folder-based AI systems, the 6-stage proposal pipeline, AI personification (decision: two separate identities), and memory architecture with Supabase.",
    highlights: [
      "Simon moved from Gemini to Claude; writing quality was 'night and day'",
      "Rob demoed his full proposal system: folders, agents, style guides, dashboards",
      "Decision: two separate AI identities, not one shared",
      "Supabase chosen for shared memory storage",
      "Kate wants operational visibility; Simon wants to scale without hiring",
    ],
    file: "/transcripts/2026-03-20-transcript.txt",
  },
  {
    date: "2026-03-27",
    title: "Session 2: Infrastructure",
    summary:
      "Set up GitHub repos (Agentware + MCP). Git fundamentals walkthrough. Live cloning demo (hit connector issues, fell back to terminal). Discussed GitHub for project management, skills vs flows, and proposal flow as first priority.",
    highlights: [
      "Both repos created: SimonCollective/Agentware and SimonCollective/MCP",
      "Git explained in plain terms: repos are folders, commits are save points",
      "GitHub connector was flaky; will build custom MCP replacement",
      "Skills (personal macros) vs Flows (shared processes in Agentware)",
      "Rob to build proposal flow over the weekend; sessions to be practical going forward",
    ],
    file: "/transcripts/2026-03-27-transcript.txt",
  },
  {
    date: "2026-04-10",
    title: "Session 3: Alexandria and Proposal Flow",
    summary:
      "Walkthrough of the transformationplan website, introduction to Alexandria (the structured knowledge graph), and a live demo of the proposal flow's startup wizard. Simon cloned the Agentware repo into Cowork. Captured via Omi — Fellow Notetaker was not in the call.",
    highlights: [
      "Alexandria introduced: shared knowledge graph (people, companies, projects, proposals, engagements) with private overlays per person",
      "Node types expanded live: proposal, engagement, and document added alongside person/company/project/location/interest/activity",
      "Corrections made live: location → Nottingham, Simon's brand → Collective Security",
      "GitHub repos hold only bare software; client data stays in OneDrive/local folders",
      "Proposal flow is reusable — copy folder, run STARTUP.md wizard, customise per business",
      "Next session extended to two hours: Cowork training + website/Kanban work",
    ],
    file: "/transcripts/2026-04-10-summary.md",
  },
  {
    date: "2026-04-21",
    title: "Session 4: AI Fundamentals and Client Knowledge",
    summary:
      "Two-hour extended session. Foundational AI training covering system instructions, model choice, dictation, markdown, artifacts, and Chat vs Cowork vs Code. Ended with Rob building a Client Knowledge agentware piece live in response to a real problem from Kate.",
    highlights: [
      "Waterfall beats agile for AI builds: spec fully first, then one-shot the build with full context",
      "System instructions (CLAUDE.md) are the single most important setting — treat the AI as a partner, not a tool",
      "Model choice: Haiku (quick, cheap), Sonnet (daily driver), Opus (strategy, planning, one-shot builds)",
      "Markdown is the working format for everything non-final — every AI reads it natively",
      "Chat vs Cowork vs Code: Chat memory lives in the thread, Cowork memory lives in a folder, Code is for big apps",
      "Kate's Claude ban is not a blocker — the work lives in files, portable across any AI provider",
      "New Client Knowledge flow built live for Kate's Trust engagement — to-process queue, per-client dashboards, scheduled nightly processing option",
    ],
    file: "/transcripts/2026-04-21-transcript.txt",
  },
];

export default function TranscriptsPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (password === PASSWORD) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto px-6 py-24">
        <h1 className="text-3xl font-bold mb-2">Transcripts</h1>
        <p className="text-muted mb-8">
          Session transcripts are password protected. Enter the password to
          access summaries and downloads.
        </p>
        <form onSubmit={handleUnlock} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Enter password"
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:border-accent"
          />
          {error && (
            <p className="text-danger text-sm">Incorrect password.</p>
          )}
          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-light text-white font-medium rounded-lg px-4 py-3 transition-colors"
          >
            Unlock Transcripts
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Transcripts</h1>
      <p className="text-muted mb-10">
        Session summaries and full transcript downloads.
      </p>

      <div className="space-y-6">
        {transcripts.map((t) => (
          <div
            key={t.date}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs font-mono text-muted bg-background border border-border rounded px-2 py-0.5 mr-3">
                  {t.date}
                </span>
                <h2 className="inline text-xl font-semibold">{t.title}</h2>
              </div>
              <a
                href={t.file}
                download
                className="shrink-0 ml-4 bg-accent hover:bg-accent-light text-white text-sm font-medium rounded-lg px-4 py-2 transition-colors"
              >
                Download
              </a>
            </div>

            <p className="text-muted text-sm mb-4">{t.summary}</p>

            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">
              Key Highlights
            </h3>
            <ul className="space-y-1">
              {t.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
