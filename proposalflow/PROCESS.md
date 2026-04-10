# Proposal Generation Process

**This file has been superseded.** The process is now documented in the `system/` directory:

- **Pipeline overview**: `system/README.md`
- **Detailed stage specifications**: `system/PIPELINE.md`
- **Agent definitions**: `system/agents/`
- **Commands**: `system/commands/`

## Quick Reference

To create a new proposal:

```bash
bash system/scripts/init-proposal.sh <client-slug>
```

To run the full pipeline: use the `/proposal go` command.

To run a single stage: use `/proposal ingest`, `/proposal research`, etc.

To amend after changes: use `/proposal amend --from-stage N`.
