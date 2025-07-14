from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import todos

app = FastAPI(
    title="Todo API",
    description="Modern Todo API with FastAPI",
    version="1.0.0"
)

# CORS設定（React開発サーバー用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite開発サーバー
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターを追加
app.include_router(todos.router)

@app.get("/")
def root():
    return {"message": "Todo API is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}