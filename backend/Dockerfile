FROM python:3.9-slim-buster

RUN apt-get update && \
    apt-get -qq -y install tesseract-ocr && \
    apt-get -qq -y install libtesseract-dev

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 10000


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "10000"]