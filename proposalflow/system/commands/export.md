# /proposal export

## Stage 6: Export to .docx

## Arguments
- `$ARGUMENTS`: Path to the proposal folder

## Process
1. Read `system/agents/06-export-agent.md`
2. Verify `proposal.md` exists
3. Load the docx generation template from `system/scripts/generate-docx.js`
4. Parse markdown into structured sections
5. Generate .docx with SoftHouse branding
6. Validate the .docx
7. Convert to PDF for visual check
8. Present to user with download link
9. Update `metadata.json`
