from io import BytesIO

from PIL import Image


def validate_image(img_bytes: bytes) -> Image:
    try:
        return Image.open(BytesIO(img_bytes))
    except Exception as e:
        raise ValueError("Invalid image") from e
