# shipso_comms

## Frontend (Vite + React)

- `cd frontend`
- `npm install`
- `npm run dev`

To verify the production build:

- `npm run build`

## Backend (FastAPI)

### Install

- Create/activate a Python venv
- `pip install -r requirements.txt`

### Configure

- Create `db/.env` with `DATABASE_URL=...`

### Run

From the repo root:

- `uvicorn db.api:my_app --reload --port 8000`

### Example requests

- Health:
	- `curl -s http://127.0.0.1:8000/health`

- Create role:
	- `curl -s -X POST http://127.0.0.1:8000/roles -H 'Content-Type: application/json' -d '{"role_name":"admin","description":"Admin role"}'`

- Create user (accepts `password` or `password_hash`):
	- `curl -s -X POST http://127.0.0.1:8000/users -H 'Content-Type: application/json' -d '{"username":"test1","name":"Test User","email":"test@example.com","password":"test123","role_id":1}'`

- Create document (stores `fields` as JSONB):
	- `curl -s -X POST http://127.0.0.1:8000/documents -H 'Content-Type: application/json' -d '{"name":"Shipment Doc","text":"example","fields":{"shipment":{"container_number":"ABCD1234567"},"cargo":[{"sku":"SKU-001","qty":120}]}}'`

- Create message:
	- `curl -s -X POST http://127.0.0.1:8000/messages -H 'Content-Type: application/json' -d '{"text":"hi","document_id":1,"name_id":1}'`

## Git hygiene

This repo ignores local-only/generated artifacts (e.g. `node_modules/`, `.venv/`, `__pycache__/`, `.env` files). See `.gitignore`.
