# /proposal amend

## Re-enter Pipeline at Any Stage

## Arguments
- `$ARGUMENTS`: Path to the proposal folder
- `--from-stage N`: Stage number to restart from (1-6)

## Process
1. Read `metadata.json` to understand current pipeline state
2. Summarize the current proposal for the user
3. Ask what changes are needed
4. Determine which stage to restart from:
   - Pricing/structure changes -> restart from Stage 4 (interview)
   - Tone/style changes -> restart from Stage 3 (style)
   - New information -> restart from Stage 2 (research)
   - Different transcript -> restart from Stage 1 (ingest)
5. Run the pipeline from that stage forward
6. Each subsequent stage picks up the updated artifacts

## Notes
Stages before the restart point are preserved. Only the restarted stage
and everything after it are regenerated.
