---
file: to-process/README.md
version: 1
last_updated: 2026-04-21
---

# To-process drop zone

Drop raw client materials in this folder. Anything the AI should read and fold into a client's knowledge base goes here first.

## What to drop

- Meeting transcripts (txt, md, docx)
- Proposals, SOWs, briefs (docx, pdf)
- Reference documents the client has shared (pdf, xlsx, md)
- Emails exported or pasted as text
- Your own notes (md, txt)

## What happens to the files

When you ask the AI to process this folder, it will:

1. Identify which client the materials are for, and confirm with you.
2. Read them.
3. Update (or create) the client's folder with synthesized markdown.
4. Move the original files into the client's `archive/` (for non-meeting artifacts) or `meetings/` (for meeting notes and transcripts) folder, renamed with a date prefix.

This folder should be empty when there is nothing to process. Anything sitting here is waiting for the AI.

## Rules for humans

- One client's materials at a time, ideally. If you drop materials for multiple clients, tell the AI which files go where.
- If a file is meeting-related (a transcript, notes from a call), mention that when you ask the AI to process. It will end up in `meetings/` rather than `archive/`.
- Do not edit the files once the AI has moved them. The archive is the audit trail.
