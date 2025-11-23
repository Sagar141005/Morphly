from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from pdf2docx import Converter
import tempfile
import os
import subprocess
import uuid

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}

# PDF → DOCX (existing)
@app.post("/convert/pdf2docx")
async def convert_pdf_to_docx(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf.write(await file.read())
            temp_pdf.flush()
            pdf_path = temp_pdf.name

        docx_path = pdf_path.replace(".pdf", ".docx")
        cv = Converter(pdf_path)
        cv.convert(docx_path, start=0, end=None)
        cv.close()

        if not os.path.exists(docx_path):
            return JSONResponse({"error": "Conversion failed"}, status_code=500)

        return FileResponse(
            docx_path,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename="converted.docx",
        )
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)

# Generic LibreOffice conversion (DOCX → PDF, XLS → PDF, etc.)
@app.post("/convert/libreoffice/")
async def convert_libreoffice(file: UploadFile = File(...), target_format: str = "pdf"):
    try:
        filename = f"/tmp/{uuid.uuid4()}_{file.filename}"
        with open(filename, "wb") as f:
            f.write(await file.read())

        base, _ = os.path.splitext(filename)
        output_file = f"{base}.{target_format}"

        # Run LibreOffice conversion
        cmd = ["libreoffice", "--headless", "--convert-to", target_format, filename, "--outdir", "/tmp"]
        subprocess.run(cmd, check=True)

        if not os.path.exists(output_file):
            return JSONResponse({"error": "Conversion failed"}, status_code=500)

        return FileResponse(output_file, filename=os.path.basename(output_file))
    except subprocess.CalledProcessError as e:
        return JSONResponse({"error": f"LibreOffice error: {str(e)}"}, status_code=500)
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)