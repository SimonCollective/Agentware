import Link from "next/link";

const infrastructure = [
  { name: "Claude Pro (Simon)", status: "active" as const },
  { name: "GitHub: Agentware", status: "active" as const },
  { name: "GitHub: MCP", status: "active" as const },
  { name: "Vercel", status: "active" as const },
  { name: "Claude Pro (Kate)", status: "pending" as const },
  { name: "Supabase", status: "active" as const },
  { name: "Memory Palace", status: "pending" as const },
  { name: "Proposal Flow", status: "active" as const },
  { name: "Custom GitHub MCP", status: "pending" as const },
  { name: "AI Identities", status: "pending" as const },
];

function StatusDot({ status }: { status: "active" | "pending" }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${
        status === "active" ? "bg-success" : "bg-warning"
      }`}
    />
  );
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl font-bold mb-4">
          AI Transformation Journey
        </h1>
        <p className="text-muted text-lg max-w-2xl mb-2">
          A structured mentoring engagement between Rob Williams (SoftHouse
          Advisory) and Simon & Kate Plummer (Collective Intelligence /
          Collective Inspiration).
        </p>
        <p className="text-muted max-w-2xl">
          Building AI-powered business operations using Claude, GitHub, and
          plain-text workflow systems. Weekly Thursday sessions focused on
          practical, hands-on implementation.
        </p>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        <Link
          href="/tasks"
          className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
        >
          <h3 className="font-semibold mb-2 group-hover:text-accent-light">
            Task Board
          </h3>
          <p className="text-muted text-sm">
            Track outstanding actions across all sessions in a kanban view.
          </p>
        </Link>
        <Link
          href="/training"
          className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
        >
          <h3 className="font-semibold mb-2 group-hover:text-accent-light">
            Training Notes
          </h3>
          <p className="text-muted text-sm">
            Key concepts and learnings from each mentoring session.
          </p>
        </Link>
        <Link
          href="/transcripts"
          className="bg-card border border-border rounded-lg p-6 hover:border-accent transition-colors group"
        >
          <h3 className="font-semibold mb-2 group-hover:text-accent-light">
            Transcripts
          </h3>
          <p className="text-muted text-sm">
            Session summaries and full transcript downloads (password protected).
          </p>
        </Link>
      </section>

      {/* Infrastructure status */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Infrastructure Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {infrastructure.map((item) => (
            <div
              key={item.name}
              className="bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <StatusDot status={item.status} />
              <span className="text-sm">{item.name}</span>
              <span className="ml-auto text-xs text-muted capitalize">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Key decisions */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Key Decisions</h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Decision</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  date: "2026-03-20",
                  text: "Two separate AI identities (one per person), not one shared AI",
                },
                {
                  date: "2026-03-20",
                  text: "Folder-based plain text systems, platform-agnostic",
                },
                {
                  date: "2026-03-20",
                  text: "Supabase for shared memory storage",
                },
                {
                  date: "2026-03-27",
                  text: "One Claude Pro subscription initially (Simon's)",
                },
                {
                  date: "2026-03-27",
                  text: "Shared flows in Agentware repo, personal shortcuts in Claude skills",
                },
                {
                  date: "2026-03-27",
                  text: "Proposal flow is first priority process",
                },
                {
                  date: "2026-03-27",
                  text: "Sessions will be practical 'build together' from now on",
                },
              ].map((d, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 text-muted whitespace-nowrap font-mono text-xs">
                    {d.date}
                  </td>
                  <td className="px-4 py-3">{d.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
