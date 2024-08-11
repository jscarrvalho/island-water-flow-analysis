FROM python:3.11
ENV PYTHONUNBUFFERED=1

RUN apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y gcc libc-dev

WORKDIR /backend

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "backend_service.py"]

EXPOSE 5000