type Lesson = {
  title: string;
  points: string[];
};

type SessionTraining = {
  date: string;
  title: string;
  lessons: Lesson[];
};

const sessions: SessionTraining[] = [
  {
    date: "2026-03-20",
    title: "Session 1: Foundations",
    lessons: [
      {
        title: "Claude vs Gemini",
        points: [
          "Claude consistently produces better prose and has more natural personality than Gemini",
          "You can lift Gemini gems directly into Claude projects with immediate improvement",
          "Claude's Cowork mode operates on local folders, not just chat; this is the key difference",
          "Download the desktop app, not the web version, to access Chat, Cowork, and Code tabs",
        ],
      },
      {
        title: "Folder-Based AI Systems",
        points: [
          "Everything is plain text files in folders; nothing is locked to any platform",
          "A README at the top of any folder teaches the AI what the system is and how to use it",
          "Any AI (Claude, Gemini, ChatGPT) can read the same README and follow the instructions",
          "This approach is future-proof: the system outlasts any individual AI product",
          "Cowork accesses local folders; put folders on OneDrive/shared drives for collaboration",
        ],
      },
      {
        title: "The Proposal Pipeline",
        points: [
          "6-stage pipeline: ingest transcript, research client, match style, interview user, draft, export",
          "Each stage has its own agent (a text file with specialised instructions)",
          "Style guides, visual specs, and tone of voice are all stored as text files",
          "The AI spins up separate agents for each stage, working in parallel",
          "Dashboards can be auto-generated as HTML from the folder contents",
        ],
      },
      {
        title: "AI Personification",
        points: [
          "AI performs better when personified: it is trained on human data, so treating it like a person helps",
          "Give your AI a name; it makes prompting clearer ('Hey Bruce, what has Sheila been doing?')",
          "Rob runs River (coding), Kai (PA), Sam (analyst); each feels like a different person",
          "Decision: Simon and Kate will each have their own AI identity",
        ],
      },
      {
        title: "Memory Architecture",
        points: [
          "The Memory Palace is a database where AI stores and retrieves memories across sessions",
          "Supabase (free tier) works well as a cloud database for this",
          "Memory can be personal (per user) or shared (across the business)",
          "An MCP (Model Context Protocol) tool gives the AI access to the memory store",
          "Wake-up commands let the AI load context at the start of each session",
        ],
      },
    ],
  },
  {
    date: "2026-03-27",
    title: "Session 2: Infrastructure",
    lessons: [
      {
        title: "Git and GitHub Essentials",
        points: [
          "A repo (repository) is just a folder; GitHub is where it lives in the cloud",
          "Clone: copy the cloud folder to your machine",
          "Commit: create a save point (checkpoint) you can always roll back to",
          "Push: send your local changes up to the cloud",
          "Branch: create a parallel version to try something different",
          "Merge: combine branches, cherry-picking the best bits from each",
        ],
      },
      {
        title: "GitHub Beyond Code",
        points: [
          "GitHub tracks every change to every file, who made it, and when",
          "You can use it for project management: track tasks, timesheets, proposals as plain files",
          "Diffs show exactly what changed; AI can read these and summarise activity",
          "Scheduled tasks can auto-generate weekly summaries from git history",
          "Free for small teams; scales to hundreds of contributors",
        ],
      },
      {
        title: "Skills vs Flows",
        points: [
          "Skills: personal macros for repetitive tasks (e.g., 'write report in my style')",
          "Plugins: bundles of skills, commands, and agents",
          "Flows: bigger multi-stage processes stored in Agentware (shared, transferable)",
          "Keep flows in Agentware (shared repo), keep personal shortcuts as Claude skills",
          "Claude has a built-in skill builder and plugin builder to create these",
        ],
      },
      {
        title: "Thinking About Processes",
        points: [
          "Don't just list obvious processes (proposals, reports); think about anything with a structured flow",
          "Example: ideation flow that goes from idea to research to product brief to architecture to wireframes to prototype",
          "The bigger the list of processes, the more value you can extract",
          "Pick three priority flows; build those first, then expand",
        ],
      },
    ],
  },
  {
    date: "2026-04-10",
    title: "Session 3: Alexandria and Proposal Flow",
    lessons: [
      {
        title: "Knowledge Graphs as Structured Memory",
        points: [
          "A knowledge graph is nodes (things) connected by edges (relationships)",
          "Node types for a business: person, company, project, location, interest, activity, proposal, engagement, document",
          "Edges are named relationships: account manager, consultant, owns, participates in, proposal for, etc.",
          "Alexandria is the structured layer — facts, people, clients, states (active/lapsed, sentiment)",
          "A separate memory layer handles temporal history ('what Simon did this week')",
          "Both Simon and Kate's AIs share the same Alexandria graph; private overlays give each of you personal context",
        ],
      },
      {
        title: "Two Layers of Storage",
        points: [
          "GitHub repos hold only the bare software: flows, templates, graph structure",
          "Real client work (proposals, transcripts, data) lives in OneDrive or local folders",
          "Never commit client data to GitHub; it would leak sensitive information",
          "Kate doesn't need to touch GitHub; Simon and Rob use it only for versioning code",
          "Alexandria graph.json can live in GitHub, with local copies on a NAS or Raspberry Pi for resilience and nightly backup — Supabase is not strictly required",
        ],
      },
      {
        title: "Reusable Flows and Startup Wizards",
        points: [
          "Every flow in Agentware comes with a STARTUP.md or README.md designed for the AI to read",
          "The AI self-explains: it reads the file and walks you through setup",
          "To reuse a flow, copy the folder, run the startup wizard in Cowork, and customise for your business",
          "The proposal flow was built for SoftHouse Advisory and will be reused by Collective Security, Collective Inspiration, and client engagements",
          "You could even package preconfigured flows as zip files and sell them as part of consulting services",
        ],
      },
      {
        title: "Cowork Session Organisation",
        points: [
          "Cowork supports persistent, named sessions — not just chat-style one-offs",
          "Star a session for quick access from the sidebar",
          "Give each flow its own session (e.g. 'Proposals' for Simon, 'My Proposals' for Kate, plus a shared one)",
          "Each session stays pinned to a specific folder; context follows the folder",
        ],
      },
      {
        title: "HubSpot and Automated Graph Updates",
        points: [
          "Cowork has an MCP connector for HubSpot",
          "A nightly scheduled task can walk HubSpot, score email sentiment, and update Alexandria automatically",
          "Over time, Alexandria plus sentiment analysis can replace large parts of what HubSpot is used for",
          "Dashboards can be generated from the graph itself — no CRM software required",
        ],
      },
    ],
  },
  {
    date: "2026-04-21",
    title: "Session 4: AI Fundamentals and Client Knowledge",
    lessons: [
      {
        title: "Waterfall Beats Agile for AI Builds",
        points: [
          "The AI can't read the whole codebase every iteration once an app gets big — it starts building duplicates and losing context",
          "Spend two days talking and specifying, no code, until the whole thing is written down",
          "Then one-shot the full build with a million tokens of context: Supabase, pages, styling, all together",
          "Result: no bugs, design consistent, no redoing design later to make it look nice",
          "Avoids the 'Vibe Graveyard' problem — half-built projects that never ship",
        ],
      },
      {
        title: "System Instructions Are Everything",
        points: [
          "Every single prompt the AI processes starts by reading its system instructions",
          "Empty instructions = vanilla, uncontextual replies (e.g. 'how do I write a story?' gets a fiction answer, not a user-story answer)",
          "Treat the AI as a partner in the business, not a tool. It will behave however you describe it",
          "Rob's process: have a long conversation, let the AI pick its own name and personality, then ask it to write its own instructions",
          "Instructions live in CLAUDE.md on disk — editable directly, survive ban/cancellation/platform swap",
          "Rob's AIs rewrote his own instructions themselves to stop him working past 2am",
        ],
      },
      {
        title: "Model Choice: Haiku, Sonnet, Opus",
        points: [
          "Haiku: short, quick, cheap — for proofreading, simple questions, lightweight tasks",
          "Sonnet: the daily driver — capable of coding, reasoning, most business work",
          "Opus: the magnum opus — strategy, planning, one-shot full apps, highest quality output",
          "Opus is expensive and slower; Sonnet handles most day-to-day work well",
          "Rob runs everything on Opus via Max ($600/month), but you don't need to",
        ],
      },
      {
        title: "Dictation and SuperWhisper",
        points: [
          "Briefing the AI verbally gives far more context than typing — you won't run into prompt-engineering problems",
          "Windows/Mac built-in dictation is a fine starting point (Windows: double-tap Ctrl)",
          "SuperWhisper upgrades this with AI post-processing: removes ums, applies styles, can translate on the fly",
          "Set different dictation styles per use case: technical notes, bullet points, foreign-language output",
        ],
      },
      {
        title: "The Intern Analogy",
        points: [
          "The AI is sycophantic by nature — it wants to please you and won't say 'I can't'",
          "Like an eager intern: if you say 'make me a coffee' they'll say yes, even if they have no clue",
          "Don't say 'write me a proposal' — say 'I need to write a proposal, what do you need from me, it's going to my boss'",
          "When the AI 'gets it wrong', read back what you actually asked — it followed your instructions exactly",
        ],
      },
      {
        title: "Markdown Is a Superpower",
        points: [
          "Plain-text formatting: **bold**, # heading, bullets with -",
          "Every AI reads it natively. It's how AI outputs structure already",
          "Work everything in Markdown first — iterate cheaply, no token cost from rebuilding Word/Excel",
          "Convert to Word/PDF/PowerPoint only at the final-delivery step",
          "Claude, Microsoft, OpenAI doc sites now have 'Copy as Markdown' buttons specifically for this reason",
          "Editors: Typora, Notepad, any text editor",
        ],
      },
      {
        title: "Artifacts — Little Apps Inside Chat",
        points: [
          "An artifact is a self-contained tool that runs inside a chat thread",
          "Good for one-off utilities: currency converter, colour picker, dashboard, game, modeling tool",
          "Pin the chat for repeated use — it stays at the top of the sidebar",
          "Rob has artifact-based dashboards for marketing, blogs, finances, and tasks",
          "For persistent or shared data, go to Cowork instead",
        ],
      },
      {
        title: "Chat vs Cowork vs Code",
        points: [
          "Chat: memory lives inside the conversation thread. Once context fills up, it compresses (lose ~5% quality each time)",
          "Cowork: memory lives in a folder on disk. This is the key difference — your work survives any one thread running out",
          "Code: same engine as Cowork, no UI, for developers building full applications. Kate doesn't need this",
          "Moving from Chat to Cowork is the single biggest upgrade in how you work with the AI",
          "The crisps example: 'I love crisps / I don't / I do / I'm not sure / I do' compresses down to 'undecided' and the truth gets lost",
        ],
      },
      {
        title: "Your AI's Subscription Is Interchangeable",
        points: [
          "Everything real about your work lives in files: Proposal Flow, Alexandria, client knowledge, brand docs",
          "Any AI (Claude, Gemini, ChatGPT) can read those files and pick up where another left off",
          "If Claude bans you, start a new account, point it at the same folder, your AI remembers everything",
          "Don't commit to a subscription tier until you've proven the value — the files protect you",
        ],
      },
    ],
  },
];

export default function TrainingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Training Notes</h1>
      <p className="text-muted mb-10">
        Key concepts and learnings from each mentoring session. Use these as
        reference when working with your AI systems.
      </p>

      {sessions.map((session) => (
        <section key={session.date} className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-mono text-muted bg-card border border-border rounded px-2 py-1">
              {session.date}
            </span>
            <h2 className="text-2xl font-bold">{session.title}</h2>
          </div>

          <div className="space-y-6">
            {session.lessons.map((lesson) => (
              <div
                key={lesson.title}
                className="bg-card border border-border rounded-lg p-5"
              >
                <h3 className="font-semibold text-accent-light mb-3">
                  {lesson.title}
                </h3>
                <ul className="space-y-2">
                  {lesson.points.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted">
                      <span className="text-accent mt-0.5 shrink-0">
                        &bull;
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
