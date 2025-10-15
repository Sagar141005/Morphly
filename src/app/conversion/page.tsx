import DragAndDropUploader from "@/components/DragAndDropUploader";
import type { UploadFile } from "@/types/type";

const getAvailableFormats = (type: string, name: string) => {
  const lowerName = name.toLocaleLowerCase();

  if (
    type === "application/pdf" ||
    [".pdf", ".docx", ".txt"].some((ext) => lowerName.endsWith(ext))
  )
    return ["PDF", "DOCX", "TXT"];

  if (type.startsWith("image/") || /\.(png|jpg|jpeg|webp|gif)$/.test(lowerName))
    return ["JPG", "PNG", "WEBP"];

  if (type.startsWith("text/") || /\.(txt|csv|md|json)$/.test(lowerName))
    return ["PDF", "TXT"];

  return ["PDF", "TXT"];
};

export default function ConversionPage() {
  const handleConvert = async (files: UploadFile[]) => {
    for (const item of files) {
      const formData = new FormData();
      formData.append("file", item.file);
      if (item.format) {
        formData.append("format", item.format);
      }

      try {
        const res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          alert(`Error: ${errorData.error}`);
          continue;
        }

        const contentDisposition = res.headers.get("Content-Disposition");

        if (contentDisposition?.includes("attachment")) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `converted.${(item.format ?? "txt").toLowerCase()}`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          const data = await res.json();
          window.open(data.url, "_blank");
        }
      } catch (err) {
        console.error("Conversion failed:", err);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <DragAndDropUploader
      showFormatSelect
      onSubmit={handleConvert}
      getFormatsForFile={getAvailableFormats}
      buttonLabel="Convert Files"
    />
  );
}
