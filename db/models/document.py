from pydantic import BaseModel, Field
from typing import Dict


class Document(BaseModel):
	name: str = Field(..., description="Name of the document/form")
	text: str = Field(..., description="Raw text/content of the document")
	fields: Dict[str, str] = Field(..., description="Key-Value pairs for structured fields")
	id: str = Field(..., description="Document ID referenced in other tables")

	def get_name(self):
		return self.name

	def get_text(self):
		return self.text

	def get_fields(self):
		return self.fields

	def get_id(self):
		return self.id
