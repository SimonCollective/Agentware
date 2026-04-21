---
file: system/README.md
version: 1
last_updated: 2026-04-21
---

# System folder

This folder is the engine of the Client Knowledge Agentware. Everything here is versioned. Every change must be logged in `CHANGELOG.md`.

## Contents

- `CHANGELOG.md`. Dated log of every change made to anything inside `system/` (and to the root `README.md` when the change is system-wide).
- `agents/`. Agent persona specs. One markdown file per agent. Each file describes the agent's role, techniques, output format, and constraints. To invoke, read the spec and operate as that persona.
- `templates/`. Starter content for files created during client initiation. These are not live files; they are skeletons the AI copies and fills in.

## Rule for modifying this folder

If you (the AI) change anything in here, even a single line:

1. Make the change.
2. Bump the `version` field in the frontmatter of the file you touched.
3. Append an entry to `CHANGELOG.md` with the date, the files changed, and a one-line description.

If the change alters the behavior of the system (new agent, new template, changed procedure), also bump the `version` in the root `README.md` and mention the change there.
