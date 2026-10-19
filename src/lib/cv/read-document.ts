export type ReadResult = {
  text: string;
  method: string;
};

export async function readDocument(file: File, onProgress?: (message: string) => void): Promise<ReadResult> {
  if (file.size > 12 * 1024 * 1024) {
    throw new Error("That file is over 12 MB. Export a smaller PDF or a single page image.");
  }
  const name = file.name.toLowerCase();
  if (file.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|tiff?)$/.test(name)) {
    onProgress?.("Preparing the reader…");
    const text = await readImage(file, onProgress);
    if (text.replace(/\s/g, "").length < 8) {
      throw new Error("The reader could not find words in that image. Try a sharper photo or a text PDF.");
    }
    return { text, method: "On-device OCR" };
  }
  if (file.type === "application/pdf" || name.endsWith(".pdf")) {
    onProgress?.("Reading the PDF text layer…");
    const result = await readPdf(file, onProgress);
    if (result.text.replace(/\s/g, "").length < 20) {
      throw new Error(
        "This PDF still has no readable words after a scan pass. Photograph the page as a PNG or JPG and try that.",
      );
    }
    return { text: result.text, method: result.scanned ? "Scanned PDF" : "PDF text" };
  }
  if (
    file.type.startsWith("text/") ||
    name.endsWith(".txt") ||
    name.endsWith(".md") ||
    name.endsWith(".csv") ||
    file.type === ""
  ) {
    return { text: await file.text(), method: "Plain text" };
  }
  throw new Error("Use a PDF, a PNG or JPG, or a plain text file.");
}

async function readPdf(file: File, onProgress?: (message: string) => void): Promise<{ text: string; scanned: boolean }> {
  const { extractText, getDocumentProxy, renderPageAsImage } = await import("unpdf");
  const original = new Uint8Array(await file.arrayBuffer());
  const pdf = await getDocumentProxy(original.slice());
  const { text } = await extractText(pdf, { mergePages: true });
  const joined = Array.isArray(text) ? text.join("\n") : String(text ?? "");
  if (joined.replace(/\s/g, "").length >= 20) return { text: joined, scanned: false };

  const pages = Math.min(pdf.numPages || 1, 2);
  onProgress?.("This PDF is a scan. Reading the page as an image…");
  const chunks: string[] = [];
  for (let page = 1; page <= pages; page += 1) {
    onProgress?.(`Reading scanned page ${page} of ${pages}…`);
    const png = await renderPageAsImage(original.slice(), page, { scale: 2 });
    const image = new File([png], `page-${page}.png`, { type: "image/png" });
    chunks.push(await readImage(image, onProgress));
  }
  return { text: chunks.join("\n"), scanned: true };
}

async function readImage(file: File, onProgress?: (message: string) => void): Promise<string> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker("eng", 1, {
    logger: (message) => {
      if (message.status === "recognizing text") {
        onProgress?.(`Reading the image… ${Math.round((message.progress ?? 0) * 100)}%`);
      } else {
        onProgress?.("Preparing the reader…");
      }
    },
  });
  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const image = typeof Buffer === "undefined" ? file : Buffer.from(bytes);
    const result = await worker.recognize(image);
    return result.data.text ?? "";
  } finally {
    await worker.terminate();
  }
}
