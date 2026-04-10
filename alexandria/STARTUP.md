# Alexandria Knowledge Graph: Setup Guide

Welcome! Alexandria is a structured knowledge graph that gives your AI a complete picture of your world: the people you know, the companies you work with, the projects you are running, and how everything connects.

Think of it as your AI's "System 1 memory". Instead of having to re-explain who someone is every time, your AI can look it up instantly. When you say "What's happening with Acme Corp?", it already knows who Acme is, who the key contact is, what project you are running with them, and when you last spoke.

## How to Use This Guide

Open this folder in Claude Cowork, then say:

> Read STARTUP.md and help me build my knowledge graph. Ask me the questions one section at a time, then create the files.

The AI will work through each section, ask you questions, and build your `graph.json` from scratch. You do not need to edit any files manually.

---

## What Gets Created

```
alexandria/
  knowledge-graph/
    graph.json            # The main knowledge graph (shared)
    snapshot.md           # Human-readable export
    overlays/
      simon.json          # Simon's private context
      kate.json           # Kate's private context
    snapshots/
      simon-snapshot.md   # Simon's personalised snapshot
      kate-snapshot.md    # Kate's personalised snapshot
```

---

## How the Graph Works

The graph has three building blocks:

**Nodes** are things: people, companies, projects, locations, interests, activities. Each node has:
- An `id` (short, lowercase, hyphenated, e.g., `acme-corp`)
- A `type` (person, company, project, location, interest, activity)
- A `name` (human readable)
- Optional fields: `role`, `org`, `relationship`, `context`, `tags`, `contact_channel`, `last_contact`, `aliases`

**Edges** are relationships between nodes:
- `from` and `to` (node IDs)
- A `type` (e.g., `works_at`, `advises`, `assigned_to`, `client_of`, `located_in`, `interested_in`)
- Optional `detail` for extra context

**Overlays** are private per-person layers. Simon might have private context about a client that Kate does not need to see day-to-day, and vice versa. The overlay adds private notes, private nodes, and private edges on top of the shared graph.

---

## Setup Sections

Work through these in order.

---

### 1. Your Business Identity

The AI should ask:

- What are your company names and brands? (e.g., Collective Intelligence, Collective Inspiration, or a parent name)
- For each: what does it do? Where is it based?
- Are there any other companies or entities you own or are involved with?
- What is your company website(s)?

**Creates:** Company nodes with type, name, context, location, and tags.

---

### 2. Your Team

The AI should ask:

- Who are the core people in your business? For each person:
  - Full name
  - Role/title
  - Which company/brand are they in?
  - Email or primary contact method
  - A sentence or two of context (what they do, what they are good at, anything notable)
  - Any nicknames or aliases?

- Do you have regular contractors, associates, or partners who should be tracked?

**Creates:** Person nodes for each team member, plus `works_at` edges linking them to companies.

---

### 3. Your Clients

The AI should ask:

- Who are your current clients? For each:
  - Company name
  - What do they do? (one sentence)
  - Where are they based?
  - Who is the key contact? (name, role, email)
  - Who manages this client on your side? (Simon, Kate, both?)
  - What is the current engagement or project?
  - When did you last speak to them?
  - What channel do you use? (email, Teams, phone, in-person)
  - Any important context? (budget, timeline, relationship status)

**Creates:** Company nodes for each client, person nodes for key contacts, `client_of` edges, `advises` edges, `works_at` edges for contacts.

---

### 4. Your Projects

The AI should ask:

- What active projects or engagements are you running? For each:
  - Project name
  - Which client is it for? (or is it internal?)
  - One sentence description
  - Current status (active, paused, completed, planned)
  - Who is assigned to it? (Simon, Kate, both, a team member?)
  - Any dependencies on other projects?
  - Any important tags? (e.g., "security", "inspiration", "recurring")

**Creates:** Project nodes, `assigned_to` edges, `client_of` or `owned_by` edges, `depends_on` edges.

---

### 5. Your Network

The AI should ask:

- Beyond clients and team, who are the important people in your professional network? Think about:
  - Partners or referral sources
  - Mentors or coaches
  - Industry contacts
  - Suppliers or vendors
  - Anyone you regularly interact with for business

For each:
  - Name and role
  - How do you know them?
  - How often do you interact?
  - Any important context?

**Creates:** Person nodes with relationship types (friend, partner, mentor, vendor, etc.) and relevant edges.

---

### 6. Locations

The AI should ask:

- Where are you based?
- Do you have an office, or work from home?
- Are there other locations relevant to your business? (client offices, regular travel destinations, event venues)

**Creates:** Location nodes, `located_in` edges.

---

### 7. Activities and Routines

The AI should ask:

- Do you have regular recurring activities? Think about:
  - Team meetings (e.g., weekly planning, daily standups)
  - Client cadences (e.g., monthly reviews)
  - Networking events
  - Training or learning
  - Personal routines that affect work (e.g., morning planning)

For each:
  - What is it?
  - Who participates?
  - How often?
  - Any important context?

**Creates:** Activity nodes, `participates_in` edges.

---

### 8. Interests and Expertise

The AI should ask:

- What are your professional interests and areas of expertise?
- What about personal interests that might come up in conversation with clients?
- Are there differences between Simon and Kate here? (e.g., Simon focuses on security, Kate on creative/brand)

**Creates:** Interest nodes, `interested_in` edges.

---

### 9. Private Overlays

The AI should explain and then ask:

- The shared graph is visible to both of you. Overlays let you each store private notes.
- Simon: is there anything you want to note privately about any person or company? (e.g., "Patrick mentioned budget pressure but don't raise it with Kate yet")
- Kate: same question.
- These are optional and can be added anytime.

**Creates:** `overlays/simon.json` and `overlays/kate.json` with any private context.

---

### 10. Generate Snapshots

Once the graph is built, the AI should:

1. Create `snapshot.md` in the knowledge-graph folder: a full human-readable export of all nodes and relationships, grouped by type
2. Create `snapshots/simon-snapshot.md`: the shared snapshot plus Simon's overlay context
3. Create `snapshots/kate-snapshot.md`: the shared snapshot plus Kate's overlay context

These snapshots are what your AI reads at startup to get oriented. They should be regenerated whenever the graph changes significantly.

---

## Using the Knowledge Graph Day-to-Day

Once set up, your AI can:

- **Look up anyone:** "Who is Patrick Masset?" "When did we last speak to Acme Corp?"
- **See the big picture:** "What clients are we actively working with?" "What projects does Simon have?"
- **Track relationships:** "Who at Doxim do we know?" "What's our connection to Node 4?"
- **Stay current:** Tell your AI "Update the graph: we had a call with Sarah at Acme today, she mentioned they're expanding to Leeds." It updates the node and edges.

### Updating the Graph

To add or change information, just tell your AI:

- "Add a new client: [details]"
- "Update Patrick's contact: we spoke today via Teams"
- "Add a new project under Acme Corp"
- "Remove the old Nofence project, it's completed"

The AI reads graph.json, makes the change, and saves it. If it is a significant change, ask it to regenerate the snapshots.

### The MCP

An MCP (Model Context Protocol) server is available in the `MCP` repo. This gives your AI tools to query and update the knowledge graph programmatically rather than reading the raw JSON file. See the MCP repo README for setup instructions.

---

## Cleanup: Removing the Example Data

The current `knowledge-graph/` folder contains Rob's personal data (SoftHouse team, clients, projects). Before you start:

1. The AI should **delete** the existing `graph.json`, `graph.json.bak`, `snapshot.md`, all overlay files, and all snapshot files
2. Start fresh with an empty graph structure
3. Work through the sections above to build your own

The AI should create a fresh `graph.json` with this skeleton:

```json
{
  "version": 1,
  "updated_at": "",
  "updated_by": "",
  "nodes": {},
  "edges": []
}
```

Then populate it as you work through each section.

---

## Quick Reference: Node Types

| Type | Examples |
|------|----------|
| `person` | Team members, clients, contacts, partners |
| `company` | Your companies, client companies, partners |
| `project` | Active engagements, internal projects, products |
| `location` | Offices, cities, client sites |
| `interest` | Professional expertise, personal interests |
| `activity` | Recurring meetings, routines, events |

## Quick Reference: Edge Types

| Type | Meaning | Example |
|------|---------|---------|
| `works_at` | Person works at company | simon works_at collective-intelligence |
| `owns` | Person/company owns company | simon owns collective-intelligence |
| `client_of` | Company is a client | acme client_of collective-intelligence |
| `advises` | Person advises company | simon advises acme |
| `assigned_to` | Person assigned to project | kate assigned_to acme-proposal |
| `depends_on` | Project depends on project | acme-build depends_on acme-discovery |
| `located_in` | Entity is in a location | collective-intelligence located_in derby |
| `interested_in` | Person interested in topic | simon interested_in cybersecurity |
| `participates_in` | Person participates in activity | kate participates_in weekly-planning |
| `mother_of` | Person is parent of person | - |
| `manages` | Person manages person/project | kate manages brand-projects |
| `contacts_at` | Person is key contact at company | patrick contacts_at acme |
