from typing import Any

from PIL.Image import Image
from ultralytics.models import YOLO
import torch


class YOLOPredictor:
    def __init__(self, model_path: str):
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.model = YOLO(model_path)
        self.model.to(self.device)

    def predict(self, image: Image) -> dict[str, Any]:
        """
        Performs classification on an image.

        Args:
            image (Image): The input image in PIL format.

        Returns:
            dict: A dictionary with the prediction results.
        """
        results = self.model(image, verbose=False)[0]

        top1_index = results.probs.top1
        top1_confidence = results.probs.top1conf.item()
        top1_classname = self.model.names[top1_index]

        classification_result = [{
            "name": top1_classname,
            "class_id": top1_index,
            "confidence": top1_confidence
        }]

        response = {
            "image_shape": list(results.orig_shape),
            "inference_time_ms": results.speed,
            "detections": classification_result
        }

        return response
