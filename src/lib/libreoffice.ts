import { execa } from "execa";
import path from "path";
import fs from "fs";

export async function convertWithLibreOffice(
  inputPath: string,
  format: string
): Promise<string> {
  const extMap: Record<string, string> = {
    docx: "docx",
    pdf: "pdf",
    txt: "txt",
  };
  const targetFormat = extMap[format];
  if (!targetFormat) throw new Error(`Unsupported target format: ${format}`);

  const ext = path.extname(inputPath).toLowerCase();

  if (ext === ".pdf" && ["docx", "txt"].includes(targetFormat)) {
    throw new Error(
      "LibreOffice cannot convert PDF → DOCX/TXT reliably; use PDF reader instead."
    );
  }

  const outputDir = path.dirname(inputPath);

  await execa("docker", [
    "run",
    "--rm",
    "-v",
    `${outputDir}:/data`,
    "libreoffice-headless",
    "--headless",
    "--convert-to",
    targetFormat,
    "--outdir",
    "/data",
    `/data/${path.basename(inputPath)}`,
  ]);

  const outputFile = path.join(
    outputDir,
    path.basename(inputPath, path.extname(inputPath)) + `.${targetFormat}`
  );

  if (!fs.existsSync(outputFile)) throw new Error("Conversion failed");

  return outputFile;
}
