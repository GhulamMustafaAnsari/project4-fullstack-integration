# Project 4 — Full Stack Integration

DecodeLabs Full Stack Industrial Training Kit (Batch 2026)

## Goal
Bridge the gap from isolated scripts to a full-stack system: connect the
frontend (Project 1) to the backend + database (Projects 2 & 3) into one
working application, using the IPO model (Input &rarr; Process &rarr; Output),
async/await, REST principles, and proper HTTP status-code handling.

## Structure
- `backend/` — Express + MongoDB (Mongoose) REST API for interns (full CRUD)
- `frontend/` — HTML/CSS/JS client that talks to the backend via `fetch`

## Run

**Backend**
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```
Runs on `http://localhost:5000`.

**Frontend**
Open `frontend/index.html` in a browser (or serve it with `npx serve frontend`).
It calls the API at `http://localhost:5000/api/interns` — make sure the backend
is running first.

## What this project demonstrates
- Async requests (`fetch` + `await`) instead of blocking the UI
- Checking `response.ok` before parsing JSON
- Full CRUD (GET, POST, PUT, DELETE) wired end-to-end
- Centralized error handling on both client (toast messages) and server
  (error-handling middleware)
