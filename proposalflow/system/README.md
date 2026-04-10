# ProposalFlow System

A modular, agent-driven proposal generation system for SoftHouse Advisory.

## Lifecycle Tracking

Beyond the build pipeline, proposals are tracked through a **lifecycle** from development to signed engagement. See `LIFECYCLE.md` for stage definitions, metadata schema, and current pipeline status.

## Architecture

The system is built around a **6-stage pipeline** where each stage is handled by a dedicated agent. Stages are independent and composable: you can run the full pipeline end-to-end, run individual stages, or swap out the data source behind any stage without touching the others.

```
                          +------------------+
                          |   ORCHESTRATOR   |
                          |   /proposal go   |
                          +--------+---------+
                                   |
         +-------+-------+--------+--------+-------+-------+
         |       |       |        |        |       |       |
         v       v       v        v        v       v       v
      STAGE 1  STAGE 2  STAGE 3  STAGE 4  STAGE 5  STAGE 6
      Ingest   Research  Style   Interview Draft   Export
```

## Stages

| Stage | Agent | Purpose | Input | Output |
|-------|-------|---------|-------|--------|
| 1 | transcript-analyst | Parse transcript, extract client brief | transcript.md | client_brief.md |
| 2 | research-agent | Research company, people, industry | client_brief.md | research.md |
| 3 | style-matcher | Analyze examples, match tone and structure | examples/ | style_profile.md |
| 4 | interview-agent | Ask clarifying questions, get user input | client_brief.md + research.md | answers.md |
| 5 | proposal-writer | Generate the full proposal | all prior artifacts | proposal.md |
| 6 | export-agent | Convert to .docx, validate, present | proposal.md | proposal.docx |

## Directory Structure

```
system/
  README.md              # This file
  PIPELINE.md            # Detailed pipeline specification
  LIFECYCLE.md           # Proposal lifecycle stages and tracking
  agents/                # Agent definitions (one per stage)
    01-transcript-analyst.md
    02-research-agent.md
    03-style-matcher.md
    04-interview-agent.md
    05-proposal-writer.md
    06-export-agent.md
  commands/              # Slash commands for Claude Code / Cowork
    go.md                # Full pipeline orchestrator
    ingest.md            # Stage 1 only
    research.md          # Stage 2 only
    style.md             # Stage 3 only
    interview.md         # Stage 4 only
    draft.md             # Stage 5 only
    export.md            # Stage 6 only
    amend.md             # Re-enter at any stage with changes
  scripts/               # Automation scripts
    generate-docx.js     # .docx generation template (reusable module + CLI)
    validate-proposal.js # Structure and content validation
    init-proposal.sh     # Scaffold a new proposal folder
  sources/               # Data source documentation
    README.md            # Source registry, resolution pattern, EngageOps spec
  templates/             # Proposal templates
    framework.md         # Master proposal framework
  style/                 # Style and tone references
    style-guide.md       # SoftHouse voice and tone guide
  products/              # Product briefs (static, replaceable by EngageOps)
    realtime-discovery.md
    familiarization-day.md
  examples/              # Symlinks or copies of example proposals
```

## Data Sources (Modular)

Each stage pulls data from a **source**. Sources are defined in `sources/` and can be swapped without changing agent logic.

| Source | Current Implementation | Future (EngageOps MCP) |
|--------|----------------------|----------------------|
| Products/Offerings | Static files in `products/` | `engageops.list_offerings()` |
| Example Proposals | Local `.txt` files in `examples/` | `engageops.list_proposals()` |
| Company Research | Web search via agent | `engageops.get_company()` or web search |
| Client History | Manual (transcript) | `engageops.get_client_history()` |
| Pricing | Benchmarked from examples | `engageops.get_pricing_guide()` |
| Team Members | Static in template | `engageops.get_team()` |

When a source adapter is available (e.g., EngageOps MCP is connected), the agent checks for it first and falls back to the static version. This is handled by the source resolution pattern described in `sources/README.md`.

## Commands

### Full Pipeline
```
/proposal go <transcript-path>
```
Runs all 6 stages in sequence with handoffs between agents.

### Individual Stages
```
/proposal ingest <transcript-path>
/proposal research <proposal-folder>
/proposal style <proposal-folder>
/proposal interview <proposal-folder>
/proposal draft <proposal-folder>
/proposal export <proposal-folder>
```

### Amend
```
/proposal amend <proposal-folder> [--from-stage N]
```
Re-enters the pipeline at a specific stage (e.g., after pricing changes).

## Plugin Conversion

This system is designed to be packaged as a Cowork plugin. The conversion involves:

1. Wrapping `agents/` as skill definitions
2. Wrapping `commands/` as plugin commands
3. Packaging `sources/`, `templates/`, `style/`, `products/` as plugin assets
4. Registering the EngageOps MCP as an optional connector
5. Adding `plugin.json` manifest

The directory structure already mirrors the plugin format intentionally.
