# Email Drafting from Proposals

This document describes how to create draft emails in Rob's Outlook inbox directly from Cowork, including attaching proposal documents. This is a key part of the proposal delivery workflow.

## Microsoft Account

Rob's work Outlook account ID (required for all email operations):

```
52f5f8b8-994f-49ec-9a36-af398c3425ee.3cf9b1e9-8402-4020-b49b-f9d6d27c23f4
```

Rob's email: `rob.w@shsadvisory.com`

## Creating a Draft Email

Use the `mcp__microsoft__create_email_draft` tool:

```
account_id: "52f5f8b8-994f-49ec-9a36-af398c3425ee.3cf9b1e9-8402-4020-b49b-f9d6d27c23f4"
to: "recipient@example.com"
subject: "Subject line"
body: "Email body text"
cc: "optional-cc@example.com"  (optional)
```

The draft appears in Rob's Outlook Drafts folder. He reviews, tweaks if needed, and sends manually.

### Multiple Recipients: IMPORTANT

The `to` field does NOT reliably support comma-separated addresses in a single string. Passing `"alice@co.com, bob@co.com"` may merge them into a single malformed recipient instead of creating two separate entries.

**Workaround for multiple recipients:** Create the draft with one recipient in the `to` field and additional recipients in the `cc` field. Rob can then adjust To/CC in Outlook before sending. Alternatively, create the draft with one recipient and note the others in the email body for Rob to add manually.

Example for two recipients:
```
to: "estoelzel@risebroadband.com"
cc: "bwestwood@risebroadband.com"
subject: "Proposal for Rise Broadband"
```

Rob can easily move CC recipients to the To line in Outlook before sending.

## Attaching Files

To attach a proposal PDF (or any file), pass the file path to the `attachments` parameter:

```
attachments: "/path/to/file.pdf"
```

The path should be the VM path (e.g., `/sessions/.../mnt/Proposals/proposals/rise/SOFTHOUSE-Rise-Retainer-Proposal.pdf`). The system resolves this to the actual filesystem path on Rob's machine automatically.

**Note:** The API response for drafts with attachments is very large (the attachment is base64-encoded in the response). This is normal. You can verify success by extracting `isDraft: true` and `hasAttachments: true` from the response without reading the full payload.

## Typical Proposal Delivery Workflow

1. Build the proposal (docx, then convert to PDF)
2. Look up recipient email addresses from `metadata.json` in the proposal folder, or search Outlook emails if not stored
3. Draft a cover email with the PDF attached
4. Rob reviews the draft in Outlook and sends when ready

## Finding Contact Emails

Contact emails are stored in each proposal's `metadata.json` under `client.key_contacts`. If an email is null or missing:

1. Search Outlook: `mcp__microsoft__search_emails` with the person's name
2. Check the `sender.emailAddress.address` or `from.emailAddress.address` fields in results
3. Update `metadata.json` with any newly discovered emails for future use

## Other Useful Email Operations

All use the same `account_id` above.

- **Search emails:** `mcp__microsoft__search_emails` with query like `"from:person@company.com"` or `"subject:keyword"`
- **Read a specific email:** `mcp__microsoft__get_email` with the email ID
- **List inbox:** `mcp__microsoft__list_emails`
- **Reply to email:** `mcp__microsoft__reply_to_email` (creates and sends immediately)
- **Create reply draft:** `mcp__microsoft__create_reply_draft` (saves draft for review)
- **Send email directly:** `mcp__microsoft__send_email` (sends immediately, use with caution, always confirm with Rob first)

## Important Notes

- Always create **drafts** rather than sending directly, unless Rob explicitly asks to send
- Rob reviews and sends all outbound emails himself
- The draft workflow is the safest approach: Rob gets full control over the final send
- When composing email body text, match Rob's natural tone (professional but warm, not overly formal)
- Never use em dashes, en dashes, or double hyphens in email content (use commas, semicolons, or restructure instead)
