#!/usr/bin/env bash
# init-proposal.sh
# Scaffolds a new proposal folder with the required structure.
#
# Usage: bash system/scripts/init-proposal.sh <client-slug>
# Example: bash system/scripts/init-proposal.sh acme-corp
#
# This creates: proposals/<client-slug>/ with:
#   - metadata.json (initialized pipeline state)
#   - transcript.md (placeholder for input)

set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <client-slug>"
  echo "Example: $0 acme-corp"
  exit 1
fi

CLIENT_SLUG="$1"
PROPOSALS_DIR="$(cd "$(dirname "$0")/../.." && pwd)/proposals"
PROPOSAL_DIR="${PROPOSALS_DIR}/${CLIENT_SLUG}"

if [ -d "$PROPOSAL_DIR" ]; then
  echo "Error: Proposal folder already exists: ${PROPOSAL_DIR}"
  echo "Use the existing folder or choose a different name."
  exit 1
fi

mkdir -p "$PROPOSAL_DIR"

# Create metadata.json
TODAY=$(date +%Y-%m-%d)
cat > "${PROPOSAL_DIR}/metadata.json" << METADATA
{
  "client": "${CLIENT_SLUG}",
  "created": "${TODAY}",
  "pipeline_version": "1.0",
  "stages": {
    "1_ingest": { "status": "pending" },
    "2_research": { "status": "pending" },
    "3_style": { "status": "pending" },
    "4_interview": { "status": "pending" },
    "5_draft": { "status": "pending" },
    "6_export": { "status": "pending" }
  },
  "sources_used": {}
}
METADATA

# Create transcript placeholder
cat > "${PROPOSAL_DIR}/transcript.md" << TRANSCRIPT
# Discovery Call Transcript

**Client:** ${CLIENT_SLUG}
**Date:** ${TODAY}

---

> Paste or type the discovery call transcript below.
> If you have a recording, you can also place the Fellow transcript here.
>
> The transcript analyst agent will extract the client brief from this content.

---

TRANSCRIPT

echo "Proposal folder created: ${PROPOSAL_DIR}"
echo ""
echo "Next steps:"
echo "  1. Add the discovery call transcript to: ${PROPOSAL_DIR}/transcript.md"
echo "  2. Run: /proposal ingest ${CLIENT_SLUG}"
echo "     or:  /proposal go ${CLIENT_SLUG}  (to run the full pipeline)"
