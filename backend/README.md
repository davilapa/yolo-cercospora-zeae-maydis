# 🌽 Corn Leaf Disease Classification API (Cercospora zeae-maydis)

This project provides a high-performance API for the automatic classification of *Cercospora zeae-maydis* (Gray Leaf Spot) disease on corn leaves. It leverages a YOLOv8 classification model served via a robust FastAPI application.

---

## ✨ Features

- **Accurate Classification**: Distinguishes between `healthy_leaf` and `gray_leaf_spot`.
- **High-Performance API**: Built with FastAPI for speed and scalability.
- **Interactive Documentation**: Automatic API docs available via Swagger UI and ReDoc.
- **GPU Acceleration**: Automatically uses a CUDA-enabled GPU if available to speed up inference.
- **Containerized**: Ready for production deployment with Docker and Docker Compose.

---

## 📦 Requirements

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) (recommended package manager)
- Git
- (Optional) NVIDIA GPU with CUDA for accelerated performance.

---

## 🛠️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone http://server.datumtecnologia.com:81/Marco/cercospora-zeae-maydis-detection.git
    cd cercospora-zeae-maydis-detection
    ```

2.  **Create a virtual environment and install dependencies:**
    ```bash
    # Create virtual environment
    uv venv
    source .venv/bin/activate

    uv pip install -r requirements.txt
    ```

---

## 🚀 Running the API Locally

To start the development server, run:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The `--reload` flag enables auto-reloading for development.

Once started, the interactive API documentation will be available at:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 📁 Project Structure

The project follows a modular and scalable structure:

```
cercospora-zeae-maydis-detection/
├── Dockerfile                  # Defines the container for production
├── app/
│   ├── main.py                 # FastAPI app entry point and lifespan manager
│   ├── api/
│   │   └── endpoints.py        # Defines the /predict API endpoint
│   ├── core/
│   │   ├── model_manager.py    # Manages the ML model's lifecycle (load/unload)
│   │   └── predictor.py        # Core logic for model inference (YOLOv8)
│   └── schemas.py              # Pydantic models for data validation and serialization
├── models/
│   └── best.pt                 # Trained YOLOv8 classification model
├── requirements.txt            # Project dependencies
├── docker-compose.yml          # Orchestrates Docker deployment
└── README.md                   # This file
```

---

## 🧪 API Usage

Send a `POST` request to the `/predict` endpoint with an image file to get a classification.

### Example Request (`curl`)

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@/path/to/your/image.jpg'
```

### Example Responses

#### Healthy Leaf

```json
{
  "image_shape": [256, 256],
  "inference_time_ms": {
    "preprocess": 12.54,
    "inference": 108.14,
    "postprocess": 0.05
  },
  "detections": [
    {
      "name": "healthy_leaf",
      "class_id": 1,
      "confidence": 1.0
    }
  ]
}
```

#### Gray Leaf Spot (Diseased)

```json
{
  "image_shape": [640, 640],
  "inference_time_ms": {
    "preprocess": 32.20,
    "inference": 120.59,
    "postprocess": 0.06
  },
  "detections": [
    {
      "name": "gray_leaf_spot",
      "class_id": 0,
      "confidence": 0.999965
    }
  ]
}
```

---

## 🐳 Deployment with Docker

The project is configured for easy deployment using Docker.

To build and run the application as a containerized service:

```bash
docker-compose up --build
```

The API will be available at [http://localhost:8000](http://localhost:8000). To stop the service, press `Ctrl+C`.
