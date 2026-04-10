/**
 * generate-docx.js
 *
 * Generalized .docx generation template for SoftHouse proposals.
 * Matches the SoftHouse Visual Design Specification exactly.
 *
 * Brand: Calibri font, Brand Red (#CF2E2E) accents, black text,
 * black table headers, no alternating row shading.
 *
 * Usage:
 *   const template = require("./generate-docx.js");
 *   const doc = template.buildDocument({ clientName, coverContent, mainContent });
 *   template.generateDocx(doc, outputPath);
 *
 * Dependencies: npm install docx
 */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageBreak, PageNumber,
  TabStopType, TabStopPosition, ImageRun
} = require("docx");

// ═══════════════════════════════════════════════════════════════
// BRAND CONSTANTS (matches style-guide.md Visual Design Spec)
// ═══════════════════════════════════════════════════════════════

const BRAND = {
  RED: "CF2E2E",          // Cover divider, header border, section dividers
  BLACK: "000000",        // Body text, headings, table header BG
  MEDIUM_GRAY: "6B7280",  // Subtitle, cover metadata, header/footer text, H3
  DEEP_BLUE: "1B4F72",    // Pricing amounts
  GREEN: "27AE60",        // Comparison table "Y" / "Included" values
  WHITE: "FFFFFF",        // Table header text
  FOOTER_BORDER: "CCCCCC", // Thin line above footer
  // Legacy aliases (for backward compat)
  BLUE: "1B4F72",
  DARK: "000000",
  ACCENT: "CF2E2E",
  TEXT: "000000",
  MUTED: "6B7280",
  BORDER: "CCCCCC",
  LIGHT_GRAY: "F5F5F5",
  LIGHT: "D5E8F0",
};

const FONT = "Calibri";

// ═══════════════════════════════════════════════════════════════
// PAGE SETUP (US Letter, 1-inch margins)
// ═══════════════════════════════════════════════════════════════

const PAGE = {
  WIDTH: 12240,       // US Letter width in DXA
  HEIGHT: 15840,      // US Letter height in DXA
  MARGIN: 1440,       // 1 inch in DXA
};
PAGE.CONTENT_WIDTH = PAGE.WIDTH - 2 * PAGE.MARGIN; // 9360 DXA

// ═══════════════════════════════════════════════════════════════
// TABLE HELPERS
// ═══════════════════════════════════════════════════════════════

const border = { style: BorderStyle.SINGLE, size: 4, color: "auto" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

// ═══════════════════════════════════════════════════════════════
// PARAGRAPH HELPERS
// ═══════════════════════════════════════════════════════════════

function spacer(size = 200) {
  return new Paragraph({ spacing: { before: size, after: 0 }, children: [] });
}

// H1: 18pt bold black. Space before 12pt (240 twips), after 9pt (180 twips)
function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 36, font: FONT, color: BRAND.BLACK })],
    spacing: { before: 240, after: 180 },
  });
}

// H2: 14pt bold black. Space before 10pt (200 twips), after 6pt (120 twips)
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 28, font: FONT, color: BRAND.BLACK })],
    spacing: { before: 200, after: 120 },
  });
}

// H3: 12pt bold #6B7280 (medium gray). Space before 8pt (160), after 5pt (100)
function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    children: [new TextRun({ text, bold: true, size: 24, font: FONT, color: BRAND.MEDIUM_GRAY })],
    spacing: { before: 160, after: 100 },
  });
}

// Body: 11pt Calibri regular black. Space after 6pt (120 twips)
function para(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text, size: 22, font: FONT, color: BRAND.BLACK, ...opts })],
  });
}

function boldPara(label, text) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [
      new TextRun({ text: label, bold: true, size: 22, font: FONT, color: BRAND.BLACK }),
      new TextRun({ text, size: 22, font: FONT, color: BRAND.BLACK }),
    ],
  });
}

function italicPara(text) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text, italics: true, size: 22, font: FONT, color: BRAND.BLACK })],
  });
}

// Pricing: 12pt bold #1B4F72 (deep blue). Space after ~3pt (60 twips)
function pricePara(text) {
  return new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text, size: 24, bold: true, font: FONT, color: BRAND.DEEP_BLUE })],
  });
}

function bullet(text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: FONT, color: BRAND.BLACK })],
  });
}

function boldBullet(label, text, ref = "bullets") {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { before: 40, after: 40 },
    children: [
      new TextRun({ text: label, bold: true, size: 22, font: FONT, color: BRAND.BLACK }),
      new TextRun({ text, size: 22, font: FONT, color: BRAND.BLACK }),
    ],
  });
}

function notePara(label, text) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [
      new TextRun({ text: label, bold: true, italics: true, size: 22, font: FONT, color: BRAND.BLACK }),
      new TextRun({ text, italics: true, size: 22, font: FONT, color: BRAND.BLACK }),
    ],
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND.RED, space: 1 } },
    children: [],
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ═══════════════════════════════════════════════════════════════
// TABLE BUILDERS
// ═══════════════════════════════════════════════════════════════

/**
 * Creates a formatted table matching the style guide:
 * - Black header row with white bold text
 * - No alternating row shading
 * - First column bold
 * - Green (#27AE60) for "Y", "Included", or "Yes" values
 *
 * @param {string[]} headers - Column header labels
 * @param {string[][]} rows - Array of row data
 * @param {number[]} colWidths - Column widths in DXA (must sum to PAGE.CONTENT_WIDTH)
 * @returns {Table}
 */
function dataTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((text, i) =>
      new TableCell({
        borders,
        width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: BRAND.BLACK, type: ShadingType.CLEAR },
        margins: cellMargins,
        verticalAlign: "center",
        children: [new Paragraph({
          children: [new TextRun({ text, bold: true, size: 20, font: FONT, color: BRAND.WHITE })],
        })],
      })
    ),
  });

  const greenValues = ["y", "yes", "included"];

  const dataRows = rows.map((cells) =>
    new TableRow({
      children: cells.map((text, i) => {
        const isFirstCol = i === 0;
        const isGreen = !isFirstCol && greenValues.includes(text.toLowerCase().trim());
        return new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          margins: cellMargins,
          children: [new Paragraph({
            spacing: { before: 40, after: 40 },
            children: [new TextRun({
              text,
              size: 20,
              font: FONT,
              bold: isFirstCol,
              color: isGreen ? BRAND.GREEN : BRAND.BLACK,
            })],
          })],
        });
      }),
    })
  );

  return new Table({
    width: { size: PAGE.CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

/**
 * Signature table: borderless with label column and two party columns.
 */
function signatureTable(leftParty, rightParty, labels) {
  const defaultLabels = ["PRINT NAME:", "TITLE:", "DATE:", "SIGNATURE:"];
  const rowLabels = labels || defaultLabels;

  return new Table({
    width: { size: PAGE.CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [1560, 3900, 3900],
    rows: [
      new TableRow({
        children: [
          new TableCell({ borders: noBorders, width: { size: 1560, type: WidthType.DXA }, margins: cellMargins, children: [new Paragraph({ children: [] })] }),
          new TableCell({ borders: noBorders, width: { size: 3900, type: WidthType.DXA }, margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: leftParty, bold: true, size: 20, font: FONT, color: BRAND.BLACK })] })] }),
          new TableCell({ borders: noBorders, width: { size: 3900, type: WidthType.DXA }, margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: rightParty, bold: true, size: 20, font: FONT, color: BRAND.BLACK })] })] }),
        ],
      }),
      ...rowLabels.map(label =>
        new TableRow({
          children: [
            new TableCell({
              borders: noBorders, width: { size: 1560, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ spacing: { before: 200, after: 200 }, children: [new TextRun({ text: label, bold: true, size: 20, font: FONT, color: BRAND.BLACK })] })],
            }),
            new TableCell({
              borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 1, color: BRAND.FOOTER_BORDER } },
              width: { size: 3900, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ spacing: { before: 200, after: 200 }, children: [] })],
            }),
            new TableCell({
              borders: { ...noBorders, bottom: { style: BorderStyle.SINGLE, size: 1, color: BRAND.FOOTER_BORDER } },
              width: { size: 3900, type: WidthType.DXA }, margins: cellMargins,
              children: [new Paragraph({ spacing: { before: 200, after: 200 }, children: [] })],
            }),
          ],
        })
      ),
    ],
  });
}

// ═══════════════════════════════════════════════════════════════
// COVER PAGE
// Matches style guide: logo, letter-spaced subtitle, red divider,
// title 26pt bold black, client 14pt gray, date, ID, confidentiality
// ═══════════════════════════════════════════════════════════════

/**
 * @param {Object} opts
 * @param {string} opts.title - Engagement title
 * @param {string} opts.subtitle - "For [Client Name]"
 * @param {string} opts.date - Date string (e.g. "March 2026")
 * @param {string} opts.versionId - Doc ID (e.g. "SHS_CMI_20260308-1.0")
 * @param {string} [opts.logoPath] - Path to logo PNG (auto-detected if not provided)
 * @returns {Paragraph[]}
 */
function coverPage({ title, subtitle, date, versionId, logoPath }) {
  const children = [];

  // 1. Top spacing (~30pt)
  children.push(spacer(600));

  // 2. Logo (if available)
  const defaultLogoPath = path.join(__dirname, "..", "templates", "media", "0eec1014aeeb7d74de7241fc4a7b23d4.png");
  const resolvedLogo = logoPath || defaultLogoPath;

  if (fs.existsSync(resolvedLogo)) {
    const logoData = fs.readFileSync(resolvedLogo);
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [
        new ImageRun({
          data: logoData,
          transformation: { width: 288, height: 96 }, // ~3" wide at 96dpi
          type: "png",
        }),
      ],
    }));
  }

  // 3. Spacing after logo (~10pt)
  children.push(spacer(200));

  // 4. Subtitle: letter-spaced "S O F T H O U S E   A I   A D V I S O R Y" in 10pt #6B7280
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({
      text: "S O F T H O U S E   A I   A D V I S O R Y",
      size: 20,
      font: FONT,
      color: BRAND.MEDIUM_GRAY,
    })],
  }));

  // 5. Red divider: centered paragraph with bottom border (#CF2E2E, size 6)
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BRAND.RED, space: 1 } },
    children: [],
  }));

  // 6. Spacing (~10pt)
  children.push(spacer(200));

  // 7. Title: 26pt bold black centered
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: title, size: 52, bold: true, font: FONT, color: BRAND.BLACK })],
  }));

  // 8. Client name: "For [Client Name]" 14pt #6B7280 centered
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: subtitle, size: 28, font: FONT, color: BRAND.MEDIUM_GRAY })],
  }));

  // 9. Spacing (~10pt)
  children.push(spacer(200));

  // 10. Date: 11pt #6B7280 centered
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: date, size: 22, font: FONT, color: BRAND.MEDIUM_GRAY })],
  }));

  // 11. Doc ID: 9pt #6B7280 centered
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: `ID: ${versionId}`, size: 18, font: FONT, color: BRAND.MEDIUM_GRAY })],
  }));

  // 12. Spacing (~20pt)
  children.push(spacer(400));

  // 13. Confidentiality notice: 8pt italic #6B7280 centered (exact text from style guide)
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({
      text: "This document contains proprietary and confidential material of Softhouse Advisory Systems Inc.",
      size: 16, font: FONT, color: BRAND.MEDIUM_GRAY, italics: true,
    })],
  }));
  children.push(new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 0 },
    children: [new TextRun({
      text: "Any unauthorized reproduction, use, or disclosure of this material is strictly prohibited.",
      size: 16, font: FONT, color: BRAND.MEDIUM_GRAY, italics: true,
    })],
  }));

  children.push(pageBreak());
  return children;
}

// ═══════════════════════════════════════════════════════════════
// DOCUMENT BUILDER
// ═══════════════════════════════════════════════════════════════

/**
 * Creates a complete Document with SoftHouse branding.
 *
 * @param {Object} opts
 * @param {string} opts.clientName - Short proposal name for header right side (italic)
 * @param {Paragraph[]} opts.coverContent - Cover page paragraphs
 * @param {Paragraph[]} opts.mainContent - Main content paragraphs
 * @returns {Document}
 */
function buildDocument({ clientName, coverContent, mainContent }) {
  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: 22, color: BRAND.BLACK } } },
      paragraphStyles: [
        {
          id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 36, bold: true, font: FONT, color: BRAND.BLACK },
          paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 0 },
        },
        {
          id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 28, bold: true, font: FONT, color: BRAND.BLACK },
          paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 },
        },
        {
          id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 24, bold: true, font: FONT, color: BRAND.MEDIUM_GRAY },
          paragraph: { spacing: { before: 160, after: 100 }, outlineLevel: 2 },
        },
      ],
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [{
            level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
        {
          reference: "numbered",
          levels: [{
            level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          }],
        },
      ],
    },
    sections: [
      // Section 1: Cover page (no header/footer)
      {
        properties: {
          page: {
            size: { width: PAGE.WIDTH, height: PAGE.HEIGHT },
            margin: { top: PAGE.MARGIN, right: PAGE.MARGIN, bottom: PAGE.MARGIN, left: PAGE.MARGIN },
          },
        },
        children: coverContent,
      },
      // Section 2: Main content (with header/footer per style guide)
      {
        properties: {
          page: {
            size: { width: PAGE.WIDTH, height: PAGE.HEIGHT },
            margin: { top: PAGE.MARGIN, right: PAGE.MARGIN, bottom: PAGE.MARGIN, left: PAGE.MARGIN },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                // Red bottom border (#CF2E2E), size 4, 4pt space below
                border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: BRAND.RED, space: 4 } },
                spacing: { after: 120 },
                children: [
                  // Left: "SOFTHOUSE AI ADVISORY" 8pt regular #6B7280
                  new TextRun({ text: "SOFTHOUSE AI ADVISORY", size: 16, font: FONT, color: BRAND.MEDIUM_GRAY }),
                  // Right: italic proposal short name 8pt #6B7280
                  new TextRun({ text: `\t${clientName}`, size: 16, font: FONT, color: BRAND.MEDIUM_GRAY, italics: true }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                // Gray top border (#CCCCCC), size 2, 4pt space above
                border: { top: { style: BorderStyle.SINGLE, size: 2, color: BRAND.FOOTER_BORDER, space: 4 } },
                children: [
                  // Left: "Confidential" 8pt regular #6B7280
                  new TextRun({ text: "Confidential", size: 16, font: FONT, color: BRAND.MEDIUM_GRAY }),
                  // Right: "Page X" 8pt regular #6B7280
                  new TextRun({ text: "\tPage ", size: 16, font: FONT, color: BRAND.MEDIUM_GRAY }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 16, font: FONT, color: BRAND.MEDIUM_GRAY }),
                ],
                tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
              }),
            ],
          }),
        },
        children: mainContent,
      },
    ],
  });
}

/**
 * Generates and saves the .docx file.
 */
async function generateDocx(doc, outputPath) {
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Proposal generated: ${outputPath}`);
  console.log(`Size: ${(buffer.length / 1024).toFixed(1)} KB`);
  return buffer;
}

// ═══════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════

module.exports = {
  BRAND, FONT, PAGE, borders, noBorders, cellMargins,
  spacer, heading1, heading2, heading3, para, boldPara, italicPara, pricePara,
  bullet, boldBullet, notePara, divider, pageBreak,
  dataTable, signatureTable,
  coverPage,
  buildDocument, generateDocx,
};

// ═══════════════════════════════════════════════════════════════
// CLI MODE
// ═══════════════════════════════════════════════════════════════

if (require.main === module) {
  console.log("SoftHouse Proposal .docx Generator");
  console.log("");
  console.log("This script is used as a module by proposal generators.");
  console.log("");
  console.log("Usage:");
  console.log('  const template = require("./generate-docx.js");');
  console.log("  const doc = template.buildDocument({ clientName, coverContent, mainContent });");
  console.log("  template.generateDocx(doc, outputPath);");
}
