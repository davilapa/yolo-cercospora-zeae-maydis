FROM python:3.13-slim

RUN pip install --no-cache-dir uv && \
    apt-get update && apt-get install -y curl && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv pip install --system --no-deps

ARG GITLAB_TOKEN
ARG MODEL_URL

RUN mkdir -p /app/models

COPY ./app ./app
COPY ./models ./models

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
