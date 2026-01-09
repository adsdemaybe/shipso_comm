from sqlalchemy import create_engine, text
from fastapi import FastAPI, HTTPException
import os
import json
from pathlib import Path
from dotenv import load_dotenv

from db.models.api_schemas import (
    DocumentCreate,
    DocumentOut,
    HealthOut,
    MessageCreate,
    MessageOut,
    RoleCreate,
    RoleOut,
    UserCreate,
    UserOut,
)

my_app = FastAPI(title = "Shipso Comms - DB Module",
                description="Database module for Shipso Comms application",
                version="1.0.0")

# Load DATABASE_URL from db/.env using python-dotenv
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

DB_URL = os.getenv("DATABASE_URL")
if not DB_URL:
    raise RuntimeError("DATABASE_URL is not set. Please define it in db/.env")

engine = create_engine(DB_URL, echo=True)

# --- API Endpoints ---
# Create Role
@my_app.post("/roles", response_model=RoleOut)
def create_role(role: RoleCreate) -> RoleOut:
    try:
        with engine.begin() as conn:
            res = conn.execute(
                text("""
                    INSERT INTO roles (role_name, description)
                    VALUES (:role_name, :description)
                    RETURNING role_id
                """),
                {"role_name": role.role_name, "description": role.description}
            )
            role_id = res.scalar()
        return RoleOut(role_id=str(role_id))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create User Login
@my_app.post("/users", response_model=UserOut)
def create_user_login(user: UserCreate) -> UserOut:
    params = {
        "username": user.username,
        "name": user.name,
        "email": user.email,
        "password_hash": user.password_hash,
        "role_id": user.role_id,
    }
    try:
        with engine.begin() as conn:
            if user.user_id is None:
                res = conn.execute(
                    text("""
                        INSERT INTO user_login (username, name, email, password_hash, role_id)
                        VALUES (:username, :name, :email, :password_hash, :role_id)
                        RETURNING id
                    """),
                    params
                )
            else:
                params["user_id"] = user.user_id
                res = conn.execute(
                    text("""
                        INSERT INTO user_login (username, name, email, password_hash, user_id, role_id)
                        VALUES (:username, :name, :email, :password_hash, :user_id, :role_id)
                        RETURNING id
                    """),
                    params
                )
            new_id = res.scalar()
        return UserOut(id=str(new_id))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create Document
@my_app.post("/documents", response_model=DocumentOut)
def create_document(doc: DocumentCreate) -> DocumentOut:
    fields_json = json.dumps(doc.fields) if doc.fields is not None else None
    try:
        with engine.begin() as conn:
            res = conn.execute(
                text("""
                    INSERT INTO documents (name, text, fields)
                    VALUES (:name, :text, CAST(:fields AS JSONB))
                    RETURNING id
                """),
                {"name": doc.name, "text": doc.text, "fields": fields_json}
            )
            doc_id = res.scalar()
        return DocumentOut(id=str(doc_id))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create Message
@my_app.post("/messages", response_model=MessageOut)
def create_message(msg: MessageCreate) -> MessageOut:
    try:
        with engine.begin() as conn:
            res = conn.execute(
                text("""
                    INSERT INTO messages (text, document_id, name_id)
                    VALUES (:text, :document_id, :name_id)
                    RETURNING message_id
                """),
                {
                    "text": msg.text,
                    "document_id": msg.document_id,
                    "name_id": msg.name_id,
                }
            )
            message_id = res.scalar()
        return MessageOut(message_id=str(message_id))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Health
@my_app.get("/health", response_model=HealthOut)
def health() -> HealthOut:
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return HealthOut(status="ok")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from sqlalchemy.orm import Session  # Optional: kept if needed elsewhere