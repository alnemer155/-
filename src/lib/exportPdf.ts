import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

async function capturePage(page: HTMLElement) {
  return html2canvas(page, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    logging: false,
    foreignObjectRendering: false,
    imageTimeout: 15000,
    removeContainer: true,
  });
}

export async function exportElementToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  // Prefer the offscreen export source; fall back to any visible A4 page.
  let pages = Array.from(element.querySelectorAll<HTMLElement>("[data-cv-page]"));
  if (!pages.length) {
    pages = Array.from(document.querySelectorAll<HTMLElement>("[data-cv-page]"));
  }
  const targets = pages.length > 0 ? pages : [element];

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  for (let i = 0; i < targets.length; i += 1) {
    const page = targets[i];
    const canvas = await Promise.race([
      capturePage(page),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("PDF_CAPTURE_TIMEOUT")), 45000)
      ),
    ]);

    const imgData = canvas.toDataURL("image/jpeg", 0.96);
    if (i > 0) pdf.addPage();
    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      A4_WIDTH_MM,
      A4_HEIGHT_MM,
      undefined,
      "FAST"
    );
  }

  pdf.save(filename);
}

export function printElement(element: HTMLElement): void {
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    throw new Error("POPUP_BLOCKED");
  }

  const styles = Array.from(document.styleSheets)
    .map((sheet) => {
      try {
        return Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join("\n");
      } catch {
        return "";
      }
    })
    .join("\n");

  printWindow.document.write(`<!DOCTYPE html>
<html lang="${document.documentElement.lang}" dir="${document.documentElement.dir}">
<head>
  <meta charset="utf-8" />
  <title>CV Studio Print</title>
  <style>
    ${styles}
    @page { size: A4; margin: 0; }
    body { margin: 0; background: white; }
    [data-cv-page] {
      box-shadow: none !important;
      margin: 0 !important;
      page-break-after: always;
      break-after: page;
    }
  </style>
</head>
<body>${element.outerHTML}</body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 400);
}
