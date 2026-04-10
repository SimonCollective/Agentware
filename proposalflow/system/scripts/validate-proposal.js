/**
 * validate-proposal.js
 *
 * Validates a proposal.md file before export, checking for:
 * - Required sections present
 * - No leftover placeholder text
 * - Pricing internal consistency
 * - Client name consistency
 * - Section completeness
 *
 * Usage: node system/scripts/validate-proposal.js <path-to-proposal.md>
 * Returns: JSON report with pass/fail and issues list
 */

const fs = require("fs");
const path = require("path");

const proposalPath = process.argv[2];

if (!proposalPath) {
  console.error("Usage: node validate-proposal.js <path-to-proposal.md>");
  process.exit(1);
}

if (!fs.existsSync(proposalPath)) {
  console.error(`File not found: ${proposalPath}`);
  process.exit(1);
}

const content = fs.readFileSync(proposalPath, "utf-8");
const lines = content.split("\n");

const issues = [];
const warnings = [];

// ── Required Sections ──
const requiredSections = [
  { pattern: /^#.*cover/i, name: "Cover Page" },
  { pattern: /^#.*(opening|letter|dear|hey)/i, name: "Opening Letter" },
  { pattern: /^#.*engagement.*overview/i, name: "Engagement Overview" },
  { pattern: /^#.*objective/i, name: "Objectives" },
  { pattern: /^#.*(approach|option|proposed)/i, name: "Proposed Approach" },
  { pattern: /^#.*(deliverable|what.*you.*get)/i, name: "Deliverables" },
  { pattern: /^#.*(team|who)/i, name: "Team" },
  { pattern: /^#.*(client.*responsibilit|your.*responsibilit)/i, name: "Client Responsibilities" },
  { pattern: /^#.*(investment|fee|pricing|schedule.*fee)/i, name: "Investment / Fees" },
  { pattern: /^#.*(contract|terms)/i, name: "Contract Terms" },
  { pattern: /^#.*(signature|sign)/i, name: "Signature Page" },
];

for (const section of requiredSections) {
  const found = lines.some(line => section.pattern.test(line));
  if (!found) {
    issues.push(`Missing section: ${section.name}`);
  }
}

// ── Placeholder Detection ──
const placeholderPatterns = [
  { pattern: /\[INSERT\b/i, label: "[INSERT ...]" },
  { pattern: /\[TBD\b/i, label: "[TBD]" },
  { pattern: /\[TODO\b/i, label: "[TODO]" },
  { pattern: /\[PLACEHOLDER\b/i, label: "[PLACEHOLDER]" },
  { pattern: /\[FILL\s*IN\b/i, label: "[FILL IN]" },
  { pattern: /XXX/i, label: "XXX marker" },
  { pattern: /Lorem ipsum/i, label: "Lorem ipsum text" },
];

// Contract terms placeholder is expected, so we track it separately
const contractPlaceholder = /\[CONTRACT.*TERMS.*INSERTED?\]/i;
let hasContractPlaceholder = false;

lines.forEach((line, i) => {
  if (contractPlaceholder.test(line)) {
    hasContractPlaceholder = true;
    warnings.push(`Line ${i + 1}: Contract terms placeholder present (expected if terms are deferred)`);
    return;
  }
  for (const pp of placeholderPatterns) {
    if (pp.test ? pp.pattern.test(line) : pp.pattern.test(line)) {
      issues.push(`Line ${i + 1}: Leftover placeholder text (${pp.label}): "${line.trim().substring(0, 80)}"`);
    }
  }
});

// ── Pricing Consistency ──
const dollarAmounts = [];
const dollarRegex = /\$[\d,]+(?:\.\d{2})?/g;
let match;
while ((match = dollarRegex.exec(content)) !== null) {
  dollarAmounts.push(match[0]);
}

if (dollarAmounts.length === 0) {
  warnings.push("No dollar amounts found in proposal. Is pricing missing?");
} else if (dollarAmounts.length < 2) {
  warnings.push("Only one dollar amount found. Pricing section may be incomplete.");
}

// ── Client Name Consistency ──
// Look for the first H1 that mentions a company name after "for" or "with"
const clientNameMatch = content.match(/(?:for|with)\s+([A-Z][A-Za-z\s&]+?)(?:\n|$|\.)/);
if (clientNameMatch) {
  const clientName = clientNameMatch[1].trim();
  // Check it appears more than once
  const occurrences = (content.match(new RegExp(clientName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
  if (occurrences < 2) {
    warnings.push(`Client name "${clientName}" appears only once. Check consistency.`);
  }
}

// ── Em Dash Check (SoftHouse style rule) ──
const emDashRegex = /[\u2013\u2014]|--/g;
lines.forEach((line, i) => {
  if (emDashRegex.test(line)) {
    warnings.push(`Line ${i + 1}: Contains em dash or double hyphen (style guide prefers commas/semicolons)`);
  }
});

// ── Length Check ──
const wordCount = content.split(/\s+/).length;
if (wordCount < 500) {
  warnings.push(`Proposal is quite short (${wordCount} words). Most proposals are 1500-3000 words.`);
} else if (wordCount > 5000) {
  warnings.push(`Proposal is quite long (${wordCount} words). Consider trimming for readability.`);
}

// ── Report ──
const passed = issues.length === 0;

const report = {
  file: proposalPath,
  passed,
  word_count: wordCount,
  dollar_amounts: dollarAmounts,
  issues,
  warnings,
  sections_found: requiredSections.filter(s => lines.some(l => s.pattern.test(l))).map(s => s.name),
  sections_missing: requiredSections.filter(s => !lines.some(l => s.pattern.test(l))).map(s => s.name),
};

console.log(JSON.stringify(report, null, 2));

if (!passed) {
  console.error(`\nVALIDATION FAILED: ${issues.length} issue(s) found.`);
  process.exit(1);
} else if (warnings.length > 0) {
  console.log(`\nVALIDATION PASSED with ${warnings.length} warning(s).`);
} else {
  console.log("\nVALIDATION PASSED. No issues or warnings.");
}
