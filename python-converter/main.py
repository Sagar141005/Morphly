from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from pdf2docx import Converter
import tempfile
import os

app = FastAPI()

@app.post("/convert/pdf2docx")
async def convert_pdf_to_docx(file: UploadFile = File(...)):
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_pdf:
            temp_pdf.write(await file.read())
            temp_pdf.flush()
            pdf_path = temp_pdf.name

        docx_path = pdf_path.replace(".pdf", ".docx")

        # Perform conversion
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
