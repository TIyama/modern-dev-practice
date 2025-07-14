from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.todo import Base

# SQLite を使用（開発環境用）
SQLALCHEMY_DATABASE_URL = "sqlite:///./todos.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# テーブルを作成
Base.metadata.create_all(bind=engine)

# データベースセッションの取得
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()