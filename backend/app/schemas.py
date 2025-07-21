from pydantic import BaseModel, Field
from typing import List, Dict, Union

class Detection(BaseModel):
    name: str = Field(..., description="Predicted class name.")
    class_id: int = Field(..., description="Predicted class ID.")
    confidence: float = Field(..., description="Confidence score for the prediction (0.0 to 1.0).")


class PredictionResponse(BaseModel):
    image_shape: List[int] = Field(..., description="Original image shape [height, width].")
    inference_time_ms: Dict[str, float] = Field(..., description="Inference speed metrics.")
    detections: List[Detection] = Field(..., description="List of predictions. For classification, this will contain a single item.")
