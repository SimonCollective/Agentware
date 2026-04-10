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
