FROM python:3.11-slim

# Install LibreOffice and utilities
RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-common \
    libreoffice-core \
    fonts-dejavu \
    poppler-utils \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI code
COPY main.py .

# Railway expects the PORT environment variable
ENV PORT=5001

EXPOSE 5001

# Start FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5001"]