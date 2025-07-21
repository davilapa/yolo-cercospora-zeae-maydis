from .predictor import YOLOPredictor
from typing import Optional

class ModelManager:
    def __init__(self):
        self.model: Optional[YOLOPredictor] = None

    def load_model(self, model_path: str):
        if self.model is None:
            self.model = YOLOPredictor(model_path)

    def unload_model(self):
        self.model = None

    def get_model(self) -> YOLOPredictor:
        if self.model is None:
            raise RuntimeError("Model not loaded")
        return self.model

model_manager = ModelManager()

def load_model():
    model_manager.load_model("models/best.pt")

def unload_model():
    model_manager.unload_model()

def get_model() -> YOLOPredictor:
    return model_manager.get_model()