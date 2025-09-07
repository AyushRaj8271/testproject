from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, auth, database
from datetime import datetime, timedelta
# Create tables if not exist
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()
ACCESS_TOKEN_EXPIRE_MINUTES = 30
# Allow CORS (so React frontend can call backend)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


@app.post("/register")
def register(username: str, password: str, db: Session = Depends(database.get_db)):
    """Register a new user with hashed password"""
    existing = db.query(models.User).filter(models.User.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed = auth.get_password_hash(password)
    user = models.User(username=username, password=hashed)
    db.add(user)
    db.commit()
    return {"message": "User registered successfully"}


# @app.post("/login")
# def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
#     """Authenticate user and return JWT token"""
#     user = db.query(models.User).filter(models.User.username == form_data.username).first()
#     if not user or not auth.verify_password(form_data.password, user.password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     access_token = auth.create_access_token(data={"sub": user.username})
#     return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(database.get_db)
):
    """Authenticate user and return JWT token"""
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Create token with expiration
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username},
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/main")
def main_section(token: str = Depends(oauth2_scheme)):
    """Protected endpoint that requires JWT"""
    payload = auth.decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"message": f"Welcome {payload.get('sub')}!"}
