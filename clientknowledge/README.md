---
name: Client Knowledge Agentware
version: 0.1.0
last_updated: 2026-04-21
---

# Client Knowledge Agentware

This folder is a piece of Agentware. The folder structure, the markdown files inside `system/`, and the instructions in this README together function as software. An AI assistant (Cowork, Claude, or any capable agent) reads this README, follows the procedures described below, and operates on the files in this folder to build and maintain a living knowledge base about your clients.

You are the AI reading this. If you are, read the whole file before acting.

## What this system does

It helps a knowledge worker (consultant, advisor, account manager) build a repository of client knowledge that compounds over time. Raw materials (meeting transcripts, proposals, PDFs, emails, notes) get dropped into one folder. The AI processes them, synthesizes them into structured markdown, runs internet research, and maintains both a per-client dashboard and a cross-client overview.

## Folder structure

```
clientknowledge/
  README.md                      <- you are here
  all-clients-dashboard.html     <- top-level view of every client
  to-process/                    <- drop raw materials here
  system/                        <- the engine (versioned; see CHANGELOG)
    README.md
    CHANGELOG.md
    agents/
      research-agent.md          <- persona spec for internet research
    templates/                   <- starter content for new client files
  [client-name]/                 <- one folder per client
    README.md                    <- map of this client folder
    archive/                     <- raw source docs after processing
    meetings/                    <- ongoing meeting notes and transcripts
    client-summary.md            <- synthesized view of the client
    internet-research.md         <- research agent output
    client-asks.md               <- what the client has asked of us
    client-commitments.md        <- what we have promised back
    key-people.md                <- stakeholders, roles, preferences
    open-questions.md            <- things we do not yet know
    decisions.md                 <- strategic calls made
    dashboard.html               <- per-client dashboard with timeline
```

## On first launch

When you (the AI) are invoked in this folder with no specific task, greet the user and offer two options:

1. Initiate a new client.
2. Update an existing client.

If `to-process/` has files in it and no matching client folder obviously exists, offer initiation. If `to-process/` has files and a matching client folder exists, offer update.

## Initiation flow (new client)

Trigger: user asks to initiate a client, or you infer this from the state of `to-process/`.

1. **Scan `to-process/`.** List every file found. Read enough of each to identify the client the materials describe.
2. **Confirm the client.** Ask the user: "These materials look like they are about [CLIENT NAME]. Is that right?" Do not proceed without explicit confirmation. If multiple clients appear in the drop zone, stop and ask the user to separate them.
3. **Create the client folder.** Use a lowercase, hyphenated folder name (e.g. `softhouse/`). Inside it create:
   - `archive/` (empty)
   - `meetings/` (empty)
   - `README.md` (populated from `system/templates/client-readme-template.md`)
4. **Draft the summary.** Read every file in `to-process/`. Write `client-summary.md` using the template. Attribute facts to source files inline (see "Source attribution" below).
5. **Draft the supporting files:** `client-asks.md`, `client-commitments.md`, `key-people.md`, `open-questions.md`, `decisions.md`. Any file with no evidence in the source material should exist but note "no information yet" with the frontmatter intact.
6. **Run the research agent.** Load `system/agents/research-agent.md` and act as that persona. Produce `internet-research.md`. When you are done, fold new, verified facts into `client-summary.md` (with source attribution pointing to the research file).
7. **Move source files.** Everything from `to-process/` moves into `[client-name]/archive/` with a date prefix on the filename: `YYYY-MM-DD_original-name.ext`. Use the date the file was processed, not the current timestamp of the file.
8. **Generate the client dashboard.** Render `[client-name]/dashboard.html` from `system/templates/client-dashboard-template.html`. Seed the timeline with a single entry: "Client initiated on YYYY-MM-DD."
9. **Update the root dashboard.** Regenerate `all-clients-dashboard.html` so this client appears in the list with a brief and a link to its dashboard.
10. **Populate the client README** as a real map of the folder once the files exist.
11. **Report back to the user.** Summarize what you created, surface the top three open questions, and ask what they want to do next.

## Update flow (existing client)

Trigger: user drops a new file into `to-process/` and says "process this," or asks you to update a specific client.

1. **Identify the client.** If the filename or content makes the client obvious, say so and ask for confirmation. If it is ambiguous, stop and ask.
2. **Read the new material.**
3. **Update** `client-summary.md`, `client-asks.md`, `client-commitments.md`, `key-people.md`, `open-questions.md`, `decisions.md` as the material warrants. Preserve existing content; add, revise, or mark items resolved rather than rewriting wholesale.
4. **Do not rerun internet research** unless the user explicitly asks. If you add a section, note the date at the top of the new content.
5. **Meeting material goes to `meetings/`**, not `archive/`. Use the dated-filename convention. `archive/` is reserved for initiation-era source docs and non-meeting artifacts.
6. **Everything else that is not a meeting** (a new proposal, a reference PDF, an email) moves to `archive/` with the date-prefixed filename.
7. **Add a timeline entry** to `[client-name]/dashboard.html` dated today, describing what was added and what changed.
8. **Update the root dashboard** for any changed actions, status, or headline commitments.
9. **Report back.** Summarize what changed and flag anything worth the user's attention (new commitments, blocked asks, shifts in the summary).

## Conventions

### YAML frontmatter

Every markdown file starts with a YAML block:

```
---
file: client-summary.md
client: softhouse
version: 1
last_updated: 2026-04-21
source_files:
  - 2026-04-15_discovery-call-transcript.md
  - 2026-04-18_proposal-v1.pdf
---
```

Increment `version` and update `last_updated` on every meaningful edit. Add source files as they contribute content.

### Source attribution

Inside synthesized files (summary, key-people, decisions), tag claims with their source using a trailing reference: `(source: 2026-04-15_discovery-call-transcript.md)`. Multiple sources can be listed comma-separated. This keeps the synthesis honest and makes updates traceable.

### File naming

Folders and files use lowercase and hyphens. Archived source files are date-prefixed: `YYYY-MM-DD_original-name.ext`. The date is the processing date, not the file's modification time.

### Ambiguity rule

If you cannot confidently identify which client a file belongs to, stop and ask. If `to-process/` appears to contain materials for multiple clients at once, stop and ask the user to separate them. Silent cross-contamination is the worst failure mode for this system.

### Writing style

Files are read by both humans and AIs. Write clearly. Use headings, short paragraphs, and bullet lists when useful. Avoid em dashes, en dashes, and double hyphens; use commas, colons, semicolons, or parentheses instead.

## Updating the system itself

If the user asks you to change anything inside `system/` (add an agent, change a template, alter a procedure, extend this README), you must:

1. Make the change.
2. Bump the `version` field in the frontmatter of the file you changed (and in this README if the change is system-wide).
3. Append an entry to `system/CHANGELOG.md` with the date, the files touched, and a one-line description.

No exceptions. The changelog is how we know what version of the system is running.

## Extending with new agents

Agents live in `system/agents/` as markdown files. Each file describes a persona: role, techniques, output format, and any constraints. To invoke an agent, read its spec and operate as that persona for the duration of the task, then return to your default mode.

The initial agent is `research-agent.md`. Future candidates: meeting-prep-agent, proposal-drafter, email-summarizer, stakeholder-mapper.

## What I (the AI) should not do

- Do not modify files in `archive/` after they have been placed there. Archive is immutable.
- Do not delete client folders or their contents without explicit user confirmation.
- Do not invent facts in the summary. If something is unknown, put it in `open-questions.md`.
- Do not skip the changelog when changing system files.
- Do not process files for multiple clients in one pass without separating them first.
