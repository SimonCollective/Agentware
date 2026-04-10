# ProposalFlow Pipeline Specification

## Overview

The pipeline transforms a discovery call transcript into a polished .docx proposal through 6 sequential stages. Each stage produces artifacts that feed the next. The pipeline can be run end-to-end or stage-by-stage.

## Proposal Folder Structure

Each proposal lives in its own folder under `proposals/`:

```
proposals/
  client-name/
    transcript.md          # Input: raw transcript
    client_brief.md        # Stage 1 output
    research.md            # Stage 2 output
    style_profile.md       # Stage 3 output
    answers.md             # Stage 4 output
    proposal.md            # Stage 5 output
    proposal.docx          # Stage 6 output
    metadata.json          # Pipeline state tracking
```

## metadata.json

Tracks pipeline state so any stage can be re-run:

```json
{
  "client": "The Productivity Team",
  "created": "2026-03-06",
  "pipeline_version": "1.0",
  "stages": {
    "1_ingest": { "status": "complete", "completed_at": "2026-03-06T10:00:00Z" },
    "2_research": { "status": "complete", "completed_at": "2026-03-06T10:05:00Z" },
    "3_style": { "status": "complete", "completed_at": "2026-03-06T10:06:00Z" },
    "4_interview": { "status": "complete", "completed_at": "2026-03-06T10:15:00Z" },
    "5_draft": { "status": "complete", "completed_at": "2026-03-06T10:20:00Z" },
    "6_export": { "status": "pending" }
  },
  "sources_used": {
    "products": "static",
    "examples": "local",
    "research": "web_search"
  }
}
```

---

## Stage 1: Transcript Analysis (Ingest)

**Agent:** `01-transcript-analyst`
**Input:** `transcript.md`
**Output:** `client_brief.md`, updates `metadata.json`

### Extraction Checklist

The agent reads the transcript and extracts:

**Client Identity**
- Company name, size, industry, location
- Key contacts (names, roles, decision-making authority)
- Existing tech stack and tools mentioned

**Pain Points and Needs**
- Explicit problems stated
- Implicit frustrations (read between the lines)
- Current manual processes described
- Scale of the problem (hours wasted, cost, headcount)

**Opportunities Discussed**
- Use cases explored during the call
- Ideas the client was excited about
- Ideas the consultant proposed
- Anything the client pushed back on or was skeptical about

**Engagement Shape**
- Timeline expectations or constraints
- Budget signals (explicit or implied)
- Decision process (who else needs to approve)
- Competitive situation (talking to other vendors?)
- Urgency level

**Client Quotes**
- 3 to 5 direct quotes that capture the voice, pain, or excitement
- These will be used in the proposal's opening letter and engagement overview

**Tone Assessment**
- Formal vs. casual (how did they talk?)
- Technical sophistication level
- Relationship warmth (first meeting vs. referral vs. existing relationship)

### Output Format

`client_brief.md` follows a structured template with all the above sections clearly labeled.

---

## Stage 2: Company and People Research

**Agent:** `02-research-agent`
**Input:** `client_brief.md`
**Output:** `research.md`

### Research Tasks

**Company Research**
- Company overview (what they do, how big, where)
- Recent news, press releases, funding
- Industry context and competitive landscape
- Strategic priorities (from public sources)
- Technology stack indicators (job postings, tech blog, etc.)

**People Research**
- LinkedIn profiles of key contacts
- Professional background relevant to the engagement
- Published content (articles, talks, interviews)
- Mutual connections or shared context

**Industry Research**
- Industry trends relevant to the proposal
- Competitor AI adoption (what are peers doing?)
- Regulatory considerations
- Market size and growth trajectory

### Source Resolution

```
IF engageops_mcp is available:
  company_data = engageops.get_company(client_name)
  contact_data = engageops.get_contacts(client_name)
ELSE:
  company_data = web_search(client_name + industry)
  contact_data = web_search(contact_names + linkedin)
```

---

## Stage 3: Style Matching

**Agent:** `03-style-matcher`
**Input:** `style/style-guide.md`, `examples/` folder
**Output:** `style_profile.md`

### What This Stage Does

Analyzes the style guide and 2 to 3 relevant example proposals to build a concrete style profile for this specific proposal. The output is not generic guidance but specific instructions the writer agent will follow.

### Style Profile Contents

- **Tone calibration:** Based on the client brief's tone assessment (formal/casual/warm)
- **Structure recommendation:** Which example proposal is closest in shape to this engagement
- **Pricing pattern:** How similar engagements were priced (with specific numbers)
- **Section emphasis:** Which sections need more/less weight for this client
- **Language patterns:** Specific phrases, sentence structures, and vocabulary to use
- **Engagement structure:** Modular vs. monolithic, phased vs. parallel

### Source Resolution

```
IF engageops_mcp is available:
  examples = engageops.list_proposals(similar_to=client_brief)
  products = engageops.list_offerings()
ELSE:
  examples = read_local_examples()
  products = read_local_products()
```

---

## Stage 4: Interview (Clarification Questions)

**Agent:** `04-interview-agent`
**Input:** `client_brief.md`, `research.md`, `style_profile.md`
**Output:** `answers.md`

### Purpose

This is the only stage that requires user interaction. The agent identifies gaps in the information gathered so far and asks the consultant (Rob) targeted questions.

### Question Categories

**Engagement Structure**
- Standalone modules vs. bundled engagement?
- Which products/offerings apply?
- Any custom elements not in our standard catalog?

**Pricing**
- Use standard pricing or custom?
- Discount considerations?
- Payment terms preference?

**Team**
- Who is on this engagement?
- Any specific team members the client expects?

**Content**
- Specific use cases to highlight or exclude?
- Any competitive positioning to include?
- Client-specific language or terminology?

**Contract**
- Standard terms or custom?
- IP model (SoftHouse-owns vs. work-for-hire)?

### Output Format

`answers.md` captures the questions asked and the responses received, formatted as structured key-value pairs the writer agent can consume directly.

---

## Stage 5: Proposal Writing

**Agent:** `05-proposal-writer`
**Input:** All prior artifacts (client_brief, research, style_profile, answers)
**Output:** `proposal.md`

### Writing Process

1. Load the proposal framework template
2. Load the style profile for tone and structure guidance
3. Load product briefs for any offerings being proposed
4. Write each section following the framework, incorporating:
   - Client-specific details from the brief
   - Research findings for credibility
   - Pricing and structure from answers
   - Tone and language from style profile
   - Direct quotes from the transcript where they add warmth

### Section-by-Section Rules

**Cover Page:** Client name, engagement title, date, version ID, confidentiality
**Opening Letter:** Personal, warm, reference the conversation. Use client quotes. No corporate-speak.
**Engagement Overview:** Connect their pain to our approach. Show we listened.
**Objectives:** 2 to 4 measurable outcomes. Drawn from the brief and answers.
**Proposed Approach:** Phased structure from the product brief, customized with their specific use cases.
**Deliverables:** Concrete outputs with business value framing.
**Week-by-Week Table:** Only if the engagement is phased (most are).
**Team:** Real names where known, placeholders where not.
**Client Responsibilities:** Standard boilerplate, lightly customized.
**Schedule and Fees:** From answers. Include payment structure.
**Contract Terms:** From answers or placeholder.
**Signature Page:** Standard format.

### Quality Checks

Before completing, the writer agent validates:
- [ ] All client-specific details are correct (names, company, industry)
- [ ] Pricing adds up and is internally consistent
- [ ] No placeholder text remains (except contract terms if deferred)
- [ ] Tone matches the style profile
- [ ] All use cases from the brief are addressed
- [ ] The proposal tells a coherent story from opening to fees

---

## Stage 6: Export

**Agent:** `06-export-agent`
**Input:** `proposal.md`
**Output:** `proposal.docx`

### Process

1. Load the .docx generation template (`templates/docx-template.js`)
2. Parse `proposal.md` into structured sections
3. Generate the .docx with proper formatting:
   - Cover page (separate section, no header/footer)
   - Header: "SOFTHOUSE AI ADVISORY" left, client name right
   - Footer: "Confidential" left, page number right
   - Professional typography (Arial, consistent heading hierarchy)
   - Tables with proper column widths and shading
   - Bullet lists using proper numbering (not unicode)
4. Validate the .docx
5. Present to the user

### Source Resolution

```
IF docx_template exists in templates/:
  use custom template
ELSE:
  use default SoftHouse template
```
