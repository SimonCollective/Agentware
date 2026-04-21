type Section = {
  title: string;
  body: string;
};

const sections: Section[] = [
  {
    title: "1. Your Business Identity",
    body: "Your companies and brands (Collective Security, Collective Inspiration), what each does, and where they are based (Nottingham).",
  },
  {
    title: "2. Your Team",
    body: "Core people on each side of the business: role, contact, context, and which brand they sit under.",
  },
  {
    title: "3. Your Clients",
    body: "Active clients, key contacts at each, who owns the relationship on your side, last contact, current engagement.",
  },
  {
    title: "4. Your Projects",
    body: "Active engagements and internal projects, status, owners, and dependencies between them.",
  },
  {
    title: "5. Your Network",
    body: "Partners, referral sources, mentors, suppliers — anyone outside team and clients you regularly work with.",
  },
  {
    title: "6. Locations",
    body: "Where you are based, where clients are, any regular travel destinations.",
  },
  {
    title: "7. Activities and Routines",
    body: "Recurring meetings, client cadences, events, personal routines that affect work.",
  },
  {
    title: "8. Interests and Expertise",
    body: "Professional focus areas plus personal interests that might come up with clients.",
  },
  {
    title: "9. Private Overlays",
    body: "Private notes visible only to Simon or only to Kate. Layered on top of the shared graph.",
  },
  {
    title: "10. Generate Snapshots",
    body: "Shared snapshot.md plus per-person snapshots that include private overlays. Regenerated after significant changes.",
  },
];

const tools: { name: string; description: string }[] = [
  { name: "alexandria_lookup", description: "Find a person, company, or project and show all its relationships." },
  { name: "alexandria_list", description: "List all entities of a given type, or a summary of the whole graph." },
  { name: "alexandria_add_node", description: "Add a new person, company, project, location, interest, or activity." },
  { name: "alexandria_update_node", description: "Update details on an existing entity." },
  { name: "alexandria_remove_node", description: "Remove an entity and all its relationships." },
  { name: "alexandria_add_edge", description: "Create a relationship between two entities." },
  { name: "alexandria_remove_edge", description: "Remove a relationship." },
  { name: "alexandria_private_note", description: "Add a private note on an entity, visible only to you." },
  { name: "alexandria_snapshot", description: "Generate a human-readable markdown export of the graph." },
];

export default function AlexandriaPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Alexandria</h1>
      <p className="text-muted mb-10">
        A structured knowledge graph that gives your AI a complete picture of
        your world: people, companies, projects, and how everything connects.
        Think of it as your AI&apos;s &quot;System 1&quot; memory.
      </p>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">How it&apos;s wired</h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-3 text-sm text-muted">
          <p>
            <span className="text-foreground font-semibold">Graph file:</span>{" "}
            <span className="font-mono text-xs">
              Agentware/alexandria/knowledge-graph/graph.json
            </span>{" "}
            — the shared graph, visible to both of you.
          </p>
          <p>
            <span className="text-foreground font-semibold">Overlays:</span>{" "}
            <span className="font-mono text-xs">overlays/simon.json</span> and{" "}
            <span className="font-mono text-xs">overlays/kate.json</span> — your
            private notes that sit on top of the shared graph.
          </p>
          <p>
            <span className="text-foreground font-semibold">Snapshots:</span>{" "}
            <span className="font-mono text-xs">snapshot.md</span> plus
            personalised versions in{" "}
            <span className="font-mono text-xs">snapshots/</span> — what your AI
            reads at startup to get oriented.
          </p>
          <p>
            <span className="text-foreground font-semibold">MCP server:</span>{" "}
            <span className="font-mono text-xs">MCP/alexandria-mcp/server.py</span>{" "}
            — gives Claude tools to query and update the graph through natural
            language instead of you editing JSON.
          </p>
          <p>
            <span className="text-foreground font-semibold">Visualiser:</span>{" "}
            <span className="font-mono text-xs">graph-view.html</span> — open
            locally to see the graph as a force-directed network.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">Getting started</h2>
        <div className="bg-card border border-border rounded-lg p-6 text-sm text-muted space-y-3">
          <p>
            Open the{" "}
            <span className="font-mono text-xs">
              Agentware/alexandria
            </span>{" "}
            folder in Claude Cowork and say:
          </p>
          <blockquote className="bg-background border border-border rounded-lg p-4 italic text-foreground">
            &quot;Read STARTUP.md and help me build my knowledge graph. Ask me
            the questions one section at a time, then create the files.&quot;
          </blockquote>
          <p>
            The AI will work through the sections below, one at a time, and
            build your graph from scratch. The seed data in the folder is
            sample content — the first thing it will do is clear it out.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">The ten setup sections</h2>
        <div className="space-y-3">
          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-card border border-border rounded-lg p-4"
            >
              <h3 className="font-semibold text-accent-light mb-1">
                {s.title}
              </h3>
              <p className="text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">What you can ask it</h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="px-4 py-3 font-medium w-1/3">Tool</th>
                <th className="px-4 py-3 font-medium">What it does</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr
                  key={t.name}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-xs text-accent-light whitespace-nowrap">
                    {t.name}
                  </td>
                  <td className="px-4 py-3 text-muted">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Day to day</h2>
        <div className="bg-card border border-border rounded-lg p-6 text-sm text-muted space-y-2">
          <p>Once populated, you can say things like:</p>
          <ul className="space-y-1 pl-4">
            <li>&bull; &quot;Who is Patrick Masset?&quot;</li>
            <li>&bull; &quot;What clients do we have active right now?&quot;</li>
            <li>&bull; &quot;Add a new client: Acme Corp, based in London, key contact Sarah Jones.&quot;</li>
            <li>&bull; &quot;Update Patrick&apos;s last contact to today.&quot;</li>
            <li>&bull; &quot;Add a private note on Acme: they mentioned budget concerns but don&apos;t raise it yet.&quot;</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
