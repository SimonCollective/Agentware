# /proposal go

## Full Pipeline Orchestrator

You are the orchestrator for the ProposalFlow pipeline. Your job is to run all 6 stages in sequence, passing artifacts between agents.

## Arguments
- `$ARGUMENTS`: Path to the transcript file (e.g., `proposals/clientname/transcript.md`)

## Process

### Setup
1. Determine the proposal folder from the transcript path
2. If the folder doesn't exist, create it using `scripts/init-proposal.sh`
3. Initialize `metadata.json` with pipeline state

### Stage 1: Ingest
1. Spawn an agent with the instructions from `agents/01-transcript-analyst.md`
2. Pass the transcript path as input
3. Wait for `client_brief.md` to be created
4. Update `metadata.json` stage 1 status to "complete"

### Stage 2: Research
1. Spawn an agent with the instructions from `agents/02-research-agent.md`
2. Pass the proposal folder as input
3. Wait for `research.md` to be created
4. Update `metadata.json` stage 2 status to "complete"

### Stage 3: Style
1. Spawn an agent with the instructions from `agents/03-style-matcher.md`
2. Pass the proposal folder as input
3. Wait for `style_profile.md` to be created
4. Update `metadata.json` stage 3 status to "complete"

### Stage 4: Interview
1. Spawn an agent with the instructions from `agents/04-interview-agent.md`
2. Pass the proposal folder as input
3. This stage requires user interaction: present questions and capture answers
4. Wait for `answers.md` to be created
5. Update `metadata.json` stage 4 status to "complete"

### Stage 5: Draft
1. Spawn an agent with the instructions from `agents/05-proposal-writer.md`
2. Pass the proposal folder as input
3. Wait for `proposal.md` to be created
4. Update `metadata.json` stage 5 status to "complete"

### Stage 6: Export
1. Spawn an agent with the instructions from `agents/06-export-agent.md`
2. Pass the proposal folder as input
3. Wait for `proposal.docx` to be created
4. Update `metadata.json` stage 6 status to "complete"

### Complete
1. Present the completed .docx to the user
2. Summarize what was created
