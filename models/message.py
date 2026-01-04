from pydantic import BaseModel, Field

class Message(BaseModel):
    text: str = Field(..., description="Message text content")
    message_id: str = Field(..., description="Unique identifier for the message")
    document_id: str = Field(..., description="Associated document ID")
    name_id: str = Field(..., description="Sender's user ID (NameID)")

    def get_text(self):
        return self.text

    def get_message_id(self):
        return self.message_id

    def get_document_id(self):
        return self.document_id

    def get_name_id(self):
        return self.name_id