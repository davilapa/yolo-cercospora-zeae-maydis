from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.endpoints import router as prediction_router
from app.core.model_manager import load_model, unload_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield
    unload_model()


app = FastAPI(
    lifespan=lifespan,
    title="Corn Leaf Disease Detection API",
)

app.include_router(prediction_router, tags=["predictions"])
