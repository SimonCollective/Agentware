# Proposal Lifecycle Stages

This document defines the lifecycle stages that track a proposal from creation through to a signed engagement.

## Stages

| Stage | Key | Description |
|-------|-----|-------------|
| In Development | `in_development` | Proposal is being drafted. Pipeline stages (ingest through export) are in progress. |
| First Draft Sent | `first_draft_sent` | An initial or unpapered draft has been sent to the client for review and discussion. |
| Final Proposal Sent | `final_proposal_sent` | The finalized, branded proposal has been sent to the client. May include DocuSign. |
| Signed | `signed` | Client has signed the proposal (DocuSign completed or equivalent). Engagement is active. |

## Stage Transitions

```
in_development  -->  first_draft_sent  -->  final_proposal_sent  -->  signed
       ^                    |                        |
       |                    v                        v
       +--- (revision needed, back to development) --+
```

A proposal can move backward if significant revisions are needed after client feedback. The `stage_history` array in metadata.json tracks all transitions.

## Tracking in metadata.json

Each proposal's `metadata.json` includes a `lifecycle` block:

```json
{
  "lifecycle": {
    "stage": "first_draft_sent",
    "stage_history": [
      { "stage": "in_development", "entered": "2026-02-26" },
      { "stage": "first_draft_sent", "entered": "2026-03-01", "note": "V2 sent to client." }
    ],
    "last_checked": "2026-03-06",
    "next_action": "Follow up with client next week",
    "docusign_status": null
  }
}
```

### Fields

- **stage**: Current lifecycle stage (one of the four keys above)
- **stage_history**: Ordered array of all stage transitions with dates and optional notes
- **last_checked**: Date when the proposal status was last verified (via email, conversation, etc.)
- **next_action**: The next concrete step needed to move the proposal forward
- **docusign_status**: null, "sent", "viewed", "completed", or "declined"

## How Status is Determined

Kai checks the following sources to determine and update proposal status:

1. **Outlook email** (rob.w@shsadvisory.com): Search for client name, contact names, and "proposal" or "docusign"
2. **Microsoft Planner tasks**: Check for overdue or upcoming proposal tasks
3. **Rob's direct input**: Rob may update status during conversation
4. **DocuSign notifications**: Completed DocuSign emails confirm the "signed" stage

When running `/proposal go` or during a briefing, Kai will scan email for each active proposal and update the lifecycle stage and last_checked date automatically.

## Current Pipeline Status

Updated: 2026-03-06

| Client | Stage | Last Checked | Next Action |
|--------|-------|-------------|-------------|
| Aiim | First Draft Sent | 2026-03-06 | Follow up with Patrick next week |
| Nylas | First Draft Sent | 2026-03-06 | Follow up with Jeff on V2 review |
| Nofence | In Development | 2026-03-06 | Send final proposal (overdue since Feb 6) |
| The Productivity Team | In Development | 2026-03-06 | Review and send to Shawn Lennon |
