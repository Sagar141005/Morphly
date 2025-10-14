import sharp from "sharp";

export async function convertFile(
  buffer: Buffer,
  format: string
): Promise<Buffer> {
  const image = sharp(buffer);

  switch (format.toLowerCase()) {
    case "png":
      return image.png().toBuffer();
    case "jpg":
    case "jpeg":
      return image.jpeg().toBuffer();
    case "webp":
      return image.webp().toBuffer();
    default:
      throw new Error(`Unsupported image format: ${format}`);
  }
}
