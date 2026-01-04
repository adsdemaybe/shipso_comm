from sqlalchemy import create_engine, text
from fastapi import FastAPI, HTTPException
import os
import json
from pathlib import Path
from typing import Optional, Dict
from dotenv import load_dotenv

from models.document import Document
from models.message import Message
from models.user_logins import UserLogin
from models.roles import Role

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
@my_app.post("/roles")
def create_role(role: Role):
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
        return {"role_id": role_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create User Login
@my_app.post("/users")
def create_user_login(user: UserLogin):
    params = {
        "username": user.username,
        "name": user.name,
        "email": user.email,
        # Expect hashed password per schema README
        "password_hash": getattr(user, "password_hash", None) or getattr(user, "password", None),
        "role_id": user.role_id,
    }
    try:
        with engine.begin() as conn:
            if getattr(user, "user_id", None) is None:
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
        return {"id": new_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create Document
@my_app.post("/documents")
def create_document(doc: Document):
    fields_json = json.dumps(getattr(doc, "fields", None)) if getattr(doc, "fields", None) is not None else None
    try:
        with engine.begin() as conn:
            res = conn.execute(
                text("""
                    INSERT INTO documents (name, text, fields)
                    VALUES (:name, :text, CAST(:fields AS JSONB))
                    RETURNING id
                """),
                {"name": doc.name, "text": getattr(doc, "text", None), "fields": fields_json}
            )
            doc_id = res.scalar()
        return {"id": doc_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Create Message
@my_app.post("/messages")
def create_message(msg: Message):
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
                    "document_id": getattr(msg, "document_id", None),
                    "name_id": getattr(msg, "name_id", None),
                }
            )
            message_id = res.scalar()
        return {"message_id": message_id}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Health
@my_app.get("/health")
def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

from sqlalchemy.orm import Session  # Optional: kept if needed elsewhere