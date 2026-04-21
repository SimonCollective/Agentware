"use client";

import { useState } from "react";

type Task = {
  id: string;
  title: string;
  owner: string;
  session: string;
  status: "todo" | "in-progress" | "done";
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Build proposal flow in Agentware",
    owner: "Rob",
    session: "2026-03-27",
    status: "done",
  },
  {
    id: "2",
    title: "Set up memory palace on Supabase",
    owner: "Rob",
    session: "2026-03-20",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Put meeting transcripts in Agentware",
    owner: "Rob",
    session: "2026-03-27",
    status: "done",
  },
  {
    id: "4",
    title: "Create task tracking board in Agentware",
    owner: "Rob",
    session: "2026-03-27",
    status: "done",
  },
  {
    id: "5",
    title: "Build custom GitHub MCP",
    owner: "Rob",
    session: "2026-03-27",
    status: "todo",
  },
  {
    id: "6",
    title: "Send questions about memory system preferences",
    owner: "Rob",
    session: "2026-03-20",
    status: "todo",
  },
  {
    id: "7",
    title: "Set up free Supabase account",
    owner: "Simon/Kate",
    session: "2026-03-20",
    status: "done",
  },
  {
    id: "8",
    title: "Create prioritised list of workflows (pick top 3)",
    owner: "Simon/Kate",
    session: "2026-03-27",
    status: "todo",
  },
  {
    id: "9",
    title: "Think about AI names and personalities",
    owner: "Simon/Kate",
    session: "2026-03-20",
    status: "todo",
  },
  {
    id: "10",
    title: "Think about broader flows (ideation, design, research)",
    owner: "Simon/Kate",
    session: "2026-03-27",
    status: "todo",
  },
  {
    id: "11",
    title: "Review proposal flow once delivered",
    owner: "Simon",
    session: "2026-03-27",
    status: "todo",
  },
  {
    id: "12",
    title: "Share proposal flow folder",
    owner: "Rob",
    session: "2026-03-20",
    status: "done",
  },
  {
    id: "13",
    title: "Build Alexandria knowledge graph scaffolding in Agentware",
    owner: "Rob",
    session: "2026-04-10",
    status: "done",
  },
  {
    id: "14",
    title: "Create HTML visualiser for Alexandria graph",
    owner: "Rob",
    session: "2026-04-10",
    status: "done",
  },
  {
    id: "15",
    title: "Update Alexandria samples: Nottingham, Collective Security, new node types",
    owner: "Rob",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "16",
    title: "Add proposal, engagement, document node types to Alexandria schema",
    owner: "Rob",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "17",
    title: "Regenerate Alexandria HTML visualisation after schema updates",
    owner: "Rob",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "18",
    title: "Make untouched backup copy of original proposal flow in repo",
    owner: "Rob",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "19",
    title: "Update Kanban board to allow adding and moving items from the UI",
    owner: "Rob",
    session: "2026-04-10",
    status: "in-progress",
  },
  {
    id: "20",
    title: "Upload April 10 session transcript and update task board",
    owner: "Rob",
    session: "2026-04-10",
    status: "done",
  },
  {
    id: "21",
    title: "Create central guidelines folder for shared brand and style docs",
    owner: "Rob",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "22",
    title: "Clone Agentware repo into Cowork environment",
    owner: "Simon",
    session: "2026-04-10",
    status: "done",
  },
  {
    id: "23",
    title: "Run proposal flow startup wizard in local working copy",
    owner: "Simon/Kate",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "24",
    title: "Copy configured proposal flow into shared OneDrive location",
    owner: "Simon/Kate",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "25",
    title: "Play with proposal flow and Cowork this week",
    owner: "Simon/Kate",
    session: "2026-04-10",
    status: "in-progress",
  },
  {
    id: "26",
    title: "Populate Alexandria graph with real data for Simon and Kate",
    owner: "Simon/Kate",
    session: "2026-04-10",
    status: "todo",
  },
  {
    id: "27",
    title: "Schedule two-hour next session (Cowork training + Kanban work)",
    owner: "Rob",
    session: "2026-04-10",
    status: "done",
  },
  {
    id: "28",
    title: "Push Client Knowledge agentware to the repo",
    owner: "Rob",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "29",
    title: "Build Lead Gen flow in Agentware",
    owner: "Rob",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "30",
    title: "Randomise transcripts password and WhatsApp Simon",
    owner: "Rob",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "31",
    title: "Upload April 21 session transcript",
    owner: "Rob",
    session: "2026-04-21",
    status: "done",
  },
  {
    id: "32",
    title: "Open a fresh personal Claude account (while waiting on ban review)",
    owner: "Kate",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "33",
    title: "Play with Cowork on the new account",
    owner: "Kate",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "34",
    title: "Run Client Knowledge flow with Trust as first real client",
    owner: "Kate",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "35",
    title: "Consider Raspberry Pi as scheduled-task worker",
    owner: "Simon",
    session: "2026-04-21",
    status: "todo",
  },
  {
    id: "36",
    title: "Re-evaluate Teams account after playing with the systems",
    owner: "Simon/Kate",
    session: "2026-04-21",
    status: "todo",
  },
];

const columns: { key: Task["status"]; label: string; color: string }[] = [
  { key: "todo", label: "To Do", color: "border-warning" },
  { key: "in-progress", label: "In Progress", color: "border-accent" },
  { key: "done", label: "Done", color: "border-success" },
];

function ownerColor(owner: string) {
  if (owner === "Rob") return "bg-blue-500/20 text-blue-300";
  if (owner === "Simon") return "bg-purple-500/20 text-purple-300";
  if (owner === "Kate") return "bg-pink-500/20 text-pink-300";
  if (owner === "Simon/Kate") return "bg-emerald-500/20 text-emerald-300";
  return "bg-gray-500/20 text-gray-300";
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dragging, setDragging] = useState<string | null>(null);

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDrop(status: Task["status"]) {
    if (!dragging) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === dragging ? { ...t, status } : t))
    );
    setDragging(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Task Board</h1>
      <p className="text-muted mb-8">
        Drag tasks between columns to update status. All actions from mentoring
        sessions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <div
            key={col.key}
            className={`bg-card border-t-2 ${col.color} border border-border rounded-lg p-4 min-h-[400px]`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.key)}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted">
                {col.label}
              </h2>
              <span className="text-xs bg-card-hover rounded-full px-2 py-0.5 text-muted">
                {tasks.filter((t) => t.status === col.key).length}
              </span>
            </div>
            <div className="space-y-3">
              {tasks
                .filter((t) => t.status === col.key)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="bg-background border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors"
                  >
                    <p className="text-sm mb-2">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${ownerColor(task.owner)}`}
                      >
                        {task.owner}
                      </span>
                      <span className="text-xs text-muted font-mono">
                        {task.session}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
