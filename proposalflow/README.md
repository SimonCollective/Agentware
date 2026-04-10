# SoftHouse Advisory: Proposal Generation

This folder is the centralized workspace for creating, managing, and refining client proposals for SoftHouse Advisory's AI Enablement and Implementation services.

## What We Do Here

Every new client engagement starts with a discovery call. That call produces a transcript. From that transcript, combined with company research, example proposals, and Rob's input, we generate a tailored, professional proposal in the SoftHouse style.

## Folder Structure

```
Proposals/
  README.md                   # You are here
  system/                     # The proposal generation engine
    README.md                 # Architecture and pipeline overview
    PIPELINE.md               # Detailed 6-stage pipeline specification
    agents/                   # Agent definitions (one per pipeline stage)
    commands/                 # Orchestration commands (go, ingest, research, etc.)
    scripts/                  # Automation (docx generation, validation, init)
    products/                 # Product briefs (Familiarization Day, Real-Time Discovery)
    templates/                # Proposal framework and .docx template
    style/                    # SoftHouse voice and tone guide
    sources/                  # Data source registry and EngageOps MCP spec
    examples/                 # Past proposals for style matching (.txt and .docx)
  proposals/                  # Active client proposals (one folder per client)
    aiim/                     # Aiim engagement
    nylas/                    # Nylas engagement
    nofence/                  # Nofence engagement
    theproductivityteam/      # The Productivity Team engagement
```

### Legacy Folders (To Be Removed)

The following folders contain the original files before restructuring. Once you've confirmed everything moved correctly, these can be deleted:

- `Example proposals/` (moved to `system/examples/`)
- `ProposalFlow/` (assets moved into `system/`)
- `Aiim/` (moved to `proposals/aiim/`)
- `Nylas/` (moved to `proposals/nylas/`)
- `nofence/` (moved to `proposals/nofence/`)
- `theproductivityteam/` (moved to `proposals/theproductivityteam/`)
- `PROCESS.md` (superseded by `system/PIPELINE.md`)

## Active Proposals

| Client | Folder | Lifecycle Stage | Key Contact | Next Action |
|--------|--------|----------------|-------------|-------------|
| Aiim | `proposals/aiim/` | First Draft Sent | Patrick Masset (CEO) | Follow up next week |
| Nylas | `proposals/nylas/` | First Draft Sent | Jeff Koets (CEO) | Follow up on V2 review |
| Nofence | `proposals/nofence/` | In Development | TBD | Send final proposal (overdue) |
| The Productivity Team | `proposals/theproductivityteam/` | In Development | Shawn Lennon | Review and send |

See `system/LIFECYCLE.md` for stage definitions and tracking details.

## How to Create a New Proposal

### Quick Start

```bash
bash system/scripts/init-proposal.sh <client-slug>
```

This scaffolds a new folder in `proposals/` with `metadata.json` and `transcript.md`.

### Full Pipeline

The system runs a 6-stage pipeline. See `system/README.md` for full architecture, or `system/PIPELINE.md` for stage-by-stage details.

1. **Ingest**: Parse the transcript, extract the client brief
2. **Research**: Company, people, and industry research
3. **Style Match**: Analyze examples, calibrate tone and structure
4. **Interview**: Ask Rob clarifying questions about pricing, team, approach
5. **Draft**: Generate the full proposal in markdown
6. **Export**: Convert to branded .docx, validate, present

Run the full pipeline with `/proposal go` or run individual stages independently.

## Key Principles

These come from Rob and are non-negotiable:

- **Partner, not vendor.** Every proposal positions SoftHouse as a collaborative partner invested in the client's success.
- **Outcomes over tools.** Focus on business value, ROI, and sustainability. Never sell stickiness through custom software.
- **Sustainability.** Everything we build should be the client's. Teach them to maintain it. Don't create dependency.
- **Honesty.** Be transparent about what's fixed vs. estimated. If something is uncertain, say so.
- **The tech changes.** Don't anchor to specific platforms. What matters is the approach and the capability transfer.

## Data Source Modularity

The system is designed so product data, pricing, team info, and client history can be pulled from either static files or live connectors. When the EngageOps MCP becomes available, agents will automatically prefer live data over static files. See `system/sources/README.md` for the full source registry and integration spec.
