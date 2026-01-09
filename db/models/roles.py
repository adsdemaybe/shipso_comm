from pydantic import BaseModel, Field


class Role(BaseModel):
	role_id: str = Field(..., description="Role identifier")
	role_name: str = Field(..., description="Name of the role")
	description: str = Field(..., description="Description of the role")

	def get_role_id(self):
		return self.role_id

	def get_role_name(self):
		return self.role_name

	def get_description(self):
		return self.description
