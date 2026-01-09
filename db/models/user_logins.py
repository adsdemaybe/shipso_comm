from pydantic import BaseModel, Field
from typing import Optional


class UserLogin(BaseModel):
    username: str = Field(..., description="Unique username for login")
    name: str = Field(..., description="Full name of the user")
    email: str = Field(..., description="User email address")
    password: str = Field(..., description="User password")
    user_id: str = Field(..., description="Associated user ID (foreign key)")
    id: str = Field(..., description="Unique identifier for this login record")
    role_id: Optional[str] = Field(None, description="Role identifier for authorization")

    def get_username(self):
        return self.username

    def get_name(self):
        return self.name

    def get_email(self):
        return self.email

    def get_user_id(self):
        return self.user_id

    def get_id(self):
        return self.id

    def get_role_id(self):
        return self.role_id
