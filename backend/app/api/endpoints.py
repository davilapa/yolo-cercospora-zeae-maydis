from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from PIL import Image
from io import BytesIO

from app.schemas import PredictionResponse
from app.core.predictor import YOLOPredictor
from app.core.model_manager import get_model


router = APIRouter()


@router.post("/predict", response_model=PredictionResponse)
async def predict(
    file: UploadFile = File(..., description="Image file of a corn leaf to analyze."),
    predictor: YOLOPredictor = Depends(get_model)
):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="File provided is not an image."
        )

    try:
        contents = await file.read()
        image = Image.open(BytesIO(contents))
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Invalid or corrupted image file."
        )

    result = predictor.predict(image)

    return result