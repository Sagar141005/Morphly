FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    libreoffice \
    libreoffice-writer \
    libreoffice-calc \
    libreoffice-common \
    libreoffice-core \
    fonts-dejavu \
    poppler-utils \
    unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /data

ENTRYPOINT ["libreoffice", "--headless", "--convert-to"]