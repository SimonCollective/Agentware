# Proposal Flow: Setup Guide for Your Business

Welcome! This folder contains a complete AI-powered proposal generation system. It was built for SoftHouse Advisory and now needs to be adapted for your business.

This guide is designed to be read by your AI (in Cowork or Claude Code). Point your AI at this file and it will walk you through every step, asking you the right questions and creating the files you need.

## How to Use This Guide

Open this folder in Claude Cowork, then say:

> Read STARTUP.md and guide me through the setup process. Ask me the questions one section at a time, then create or update the files based on my answers.

The AI will work through each section below, ask you the questions, and then update the relevant files. You do not need to edit any files manually.

---

## What This System Does

This is a 6-stage proposal pipeline:

1. **Ingest** a discovery call transcript and extract a client brief
2. **Research** the client company, contacts, and industry
3. **Match** the writing style to your brand and past examples
4. **Interview** you to fill in gaps (pricing, team, scope decisions)
5. **Draft** a full proposal in your voice and style
6. **Export** to a formatted Word document

Each stage has its own AI agent (a text file with instructions). The agents are in `system/agents/`. The outputs flow from one stage to the next automatically.

---

## Setup Sections

Work through these in order. Each section tells the AI what questions to ask and what file to create or update.

---

### 1. Company Identity

**File to update:** `system/team.md`

The AI should ask:

- What is your company name? (If you operate under multiple brands, list them all)
- What does your company do? One or two sentences.
- What is your company website?
- Do you have separate business units or brands? (e.g., Collective Intelligence and Collective Inspiration)
- For each brand/unit: what does it focus on?

Then for each team member who might appear on proposals:

- Full name
- Role/title
- Email address
- What they do on engagements (e.g., "leads workshops", "does technical delivery", "manages client relationships")
- A 2-3 sentence bio suitable for a proposal

Also ask:

- Do you have a broader team or partner network to reference? (e.g., "supported by a team of 20 associates")
- Is there a specific person who signs off proposals or writes the opening letter?

**Action:** Replace the contents of `system/team.md` with the new team information, following the same structure.

---

### 2. Brand and Style

**File to update:** `system/style/style-guide.md`

The AI should ask:

**Voice and Tone:**
- How would you describe your writing style? (e.g., formal, friendly, technical, conversational)
- Are you more "partner" or "vendor" in how you position yourselves?
- Any words or phrases you always use? (e.g., "we partner with", "hands-on", "practical")
- Any words or phrases you never use or want to avoid?
- Do you write in first person ("I'm excited to...") or third person ("The team will...")?

**Visual Design:**
- What are your brand colours? (hex codes if you have them, or describe them)
- What font do you use in documents? (e.g., Calibri, Arial, your brand font)
- Do you have a logo file? If so, place it in `system/templates/media/`

**Document Format:**
- Paper size: A4 or US Letter?
- Do you have existing proposal templates or documents you like the look of?
- Any specific formatting preferences? (e.g., "always include a cover page", "no tables", "use our branded header")

**Confidentiality:**
- Do you include a confidentiality notice on proposals? If so, what does it say?
- What is your document ID format? (e.g., "CI_ClientName_Date" or just "Proposal-ClientName")

**Action:** Rewrite `system/style/style-guide.md` with the new brand guidelines. Keep the same structure (Voice & Tone, Formatting, Visuals, Typography, Brand Colors, Page Setup, etc.) but replace all SoftHouse-specific content.

---

### 3. Products and Services

**File to update:** Create new files in `system/products/`, replacing the existing ones.

The AI should ask:

- What services or products do you offer that would go into a proposal?
- For each service/product:
  - What is it called?
  - One paragraph description: what does the client get?
  - Who is it for?
  - How long does it typically take?
  - What are the deliverables?
  - What does it cost? (fixed price, day rate, range, "depends on scope"?)
  - Who delivers it? (which team members)
  - Is this a standalone offering or does it bundle with others?
  - Any discount when bundled?

If you are not sure about all your products yet, start with the one or two you propose most often. You can add more later by creating additional files in `system/products/`.

**Action:** For each product, create a new markdown file in `system/products/` (e.g., `cyber-assessment.md`, `awareness-training.md`). Delete the existing SoftHouse product files (`realtime-discovery.md` and `familiarization-day.md`).

---

### 4. Proposal Template and Framework

**File to update:** `system/templates/framework.md`

The AI should ask:

- What sections do you typically include in a proposal? (e.g., cover page, introduction, scope, pricing, terms)
- Do you start with a personal letter or note? Or straight into the content?
- How do you present pricing? (per phase, flat fee, table, options/tiers?)
- Do you include terms and conditions in the proposal or reference a separate document?
- Do you include a signature page?
- Is there anything unique about how you structure proposals compared to a standard format?
- Do you have any existing proposals you are happy with? If so, place them in `system/examples/` (as .txt or .docx files). These help the style matcher learn your actual writing.

**Action:** Rewrite `system/templates/framework.md` to match your preferred proposal structure. Keep it as a skeleton/outline that the AI writer follows.

---

### 5. Example Proposals

**Folder:** `system/examples/`

The AI should ask:

- Do you have 2-3 past proposals you are happy with? These are the most important input for getting the tone and style right.
- Can you drop them into `system/examples/`? (Word docs or text files both work)

If you have examples, the AI should also ask:

- For each example: what did you like about it? What would you change?
- Is there one that best represents how you want future proposals to sound?

**Action:** Remove the existing SoftHouse example files from `system/examples/` and replace with your own. If you do not have examples yet, that is fine; the system will rely more heavily on the style guide.

---

### 6. Export Template

**Files to update:** `system/templates/SOFTHOUSE-ClientName-Proposal.md` and `system/scripts/generate-docx.js`

The AI should ask:

- Do you want the exported Word document to match your brand exactly? (If so, we need your colours, fonts, and logo from Section 2)
- What should appear in the document header? (e.g., your company name, the proposal title)
- What should appear in the footer? (e.g., "Confidential", page numbers, your website)
- Should the cover page have your logo? If so, confirm it is in `system/templates/media/`

**Action:** 
- Rename `SOFTHOUSE-ClientName-Proposal.md` to match your naming convention (e.g., `CI-ClientName-Proposal.md`)
- Update `generate-docx.js` to use your brand colours, fonts, and layout
- Update the document header/footer text

---

### 7. Agent Customisation

**Files in:** `system/agents/`

The agents are mostly generic and will work for any business. However, the AI should check each one and ask:

- The interview agent (`04-interview-agent.md`) references specific product names. These need to match your products from Section 3.
- The proposal writer (`05-proposal-writer.md`) references "SoftHouse" in several places. These need to be your company name.
- The export agent (`06-export-agent.md`) references SoftHouse branding. This needs your branding.
- The style matcher (`03-style-matcher.md`) references the SoftHouse style guide. This will automatically pick up your new style guide.

**Action:** Search all agent files for "SoftHouse", "Softhouse", "SHS", "rob.w@", and "shsadvisory" and replace with your company details. Do not change the structure or logic of the agents; only update the company-specific references.

---

### 8. Cleanup

Once all sections are complete, the AI should:

1. Remove the existing SoftHouse example proposals from `system/examples/` (unless you want to keep them as structural references)
2. Remove or archive the existing proposals in `proposals/` (aiim, nylas, nofence, theproductivityteam) as these are SoftHouse client data
3. Verify all files are consistent: company name, team members, products, and branding all match across every file
4. Run a test: ask the AI to read the full system and confirm it understands the pipeline for your business

---

## Testing Your Setup

Once setup is complete, test it with a real or mock transcript:

1. Create a folder in `proposals/` for a test client (e.g., `proposals/test-client/`)
2. Drop a transcript file in as `transcript.md` (even a short fake one works)
3. In Cowork, open the `proposalflow` folder and say:

> Run the proposal pipeline for the test-client folder. Work through each stage and show me the output before moving to the next.

This will run through all 6 stages and produce a proposal. Review it for tone, accuracy, and formatting.

---

## Adding More Later

- **New products:** Create a new `.md` file in `system/products/`
- **New team members:** Add them to `system/team.md`
- **New examples:** Drop `.txt` or `.docx` files into `system/examples/`
- **Style changes:** Update `system/style/style-guide.md`
- **New proposals:** Create a folder in `proposals/` and run the pipeline

The system is designed to grow with you. Every change you make improves future proposals.

---

## Quick Reference: Files You Will Change

| File | What It Contains | Section |
|------|-----------------|---------|
| `system/team.md` | Your team bios and roles | 1 |
| `system/style/style-guide.md` | Brand voice, colours, formatting | 2 |
| `system/products/*.md` | Your service/product descriptions | 3 |
| `system/templates/framework.md` | Proposal section structure | 4 |
| `system/examples/*.txt` | Past proposals for style matching | 5 |
| `system/templates/SOFTHOUSE-ClientName-Proposal.md` | Export template | 6 |
| `system/scripts/generate-docx.js` | Word doc generation script | 6 |
| `system/agents/*.md` | Agent instructions (minor edits) | 7 |

## Files You Should NOT Change

| File | Why |
|------|-----|
| `system/PIPELINE.md` | The pipeline logic is generic; it works for any business |
| `system/LIFECYCLE.md` | Proposal lifecycle tracking is generic |
| `system/commands/*.md` | The command definitions are generic |
| `system/sources/README.md` | Source resolution pattern is generic |
| `README.md` | Update this last once everything else is done |
