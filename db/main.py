import psycopg2
from sqlalchemy import create_engine, text
import fastapi

my_app = 

DB_URL = "postgresql+psycopg2://advaithvecham:advaith@localhost:5432/mydb"
engine = create_engine(DB_URL, echo=True)
with engine.connect() as conn:
    result = conn.execute(text(
        """
        INSERT INTO person (id, name, age, gender)
        VALUES (1, 'Advaith', 18, 'm');
        """
        )
    )
    conn.commit()

from sqlalchemy.orm import Session

session = Session(engine)
session.execute