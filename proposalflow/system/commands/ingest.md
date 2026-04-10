# /proposal ingest

## Stage 1: Transcript Analysis

Run Stage 1 of the pipeline independently.

## Arguments
- `$ARGUMENTS`: Path to the transcript file

## Process
1. Read the agent instructions from `system/agents/01-transcript-analyst.md`
2. If the proposal folder doesn't exist, create it using `system/scripts/init-proposal.sh`
3. Copy or move the transcript to the proposal folder as `transcript.md`
4. Execute the transcript analysis
5. Save output as `client_brief.md`
6. Update `metadata.json`
7. Report completion and suggest running `/proposal research <folder>`
