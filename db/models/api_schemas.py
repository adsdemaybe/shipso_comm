from __future__ import annotations

from typing import Any, Dict, Optional

from pydantic import BaseModel, ConfigDict, Field


# These schemas are intentionally split into request (Create) and response (Out)
# models so clients don't need to send DB-generated IDs.


class RoleCreate(BaseModel):
    role_name: str = Field(..., description="Name of the role")
    description: Optional[str] = Field(None, description="Description of the role")


class RoleOut(BaseModel):
    role_id: str = Field(..., description="Role identifier")


class UserCreate(BaseModel):
    username: str = Field(..., description="Unique username for login")
    name: str = Field(..., description="Full name of the user")
    email: str = Field(..., description="User email address")

    # Prefer sending a hashed password (matches DB column name).
    # For backwards-compatibility, also accept "password" and map it here.
    password_hash: str = Field(..., alias="password", description="Password hash (or raw password for now)")

    user_id: Optional[str] = Field(None, description="Associated user ID (foreign key)")
    role_id: Optional[str] = Field(None, description="Role identifier for authorization")

    model_config = ConfigDict(populate_by_name=True)


class UserOut(BaseModel):
    id: str = Field(..., description="Unique identifier for this login record")


class DocumentCreate(BaseModel):
    name: str = Field(..., description="Name of the document/form")
    text: Optional[str] = Field(None, description="Raw text/content of the document")
    fields: Optional[Dict[str, Any]] = Field(None, description="Structured fields stored as JSON")


class DocumentOut(BaseModel):
    id: str = Field(..., description="Document ID referenced in other tables")


class MessageCreate(BaseModel):
    text: str = Field(..., description="Message text content")
    document_id: Optional[str] = Field(None, description="Associated document ID")
    name_id: Optional[str] = Field(None, description="Sender's user ID (NameID)")


class MessageOut(BaseModel):
    message_id: str = Field(..., description="Unique identifier for the message")


class HealthOut(BaseModel):
    status: str = Field(..., description="Health status")
