from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:postgres@localhost:5440/taskdb"
DATABASE_URL_PROD_INTERNAL ="postgresql://taskdb_hh6i_user:k6yU4yagatIbQPaBCS7mPZds5fWs4j5J@dpg-d2ukt9nfte5s73b8vc00-a/taskdb_hh6i"

engine = create_engine(DATABASE_URL_PROD_INTERNAL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
