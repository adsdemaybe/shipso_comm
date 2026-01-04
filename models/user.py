from pydantic import BaseModel, Field
from typing import Optional

class User(BaseModel):
    name: str = Field(..., description="Name of the user")
    id: str = Field(..., description="Username ID Referred to in the other tables")
    
    def get_name(self):
        return self.name
    def get_id(self):
        return self.id
