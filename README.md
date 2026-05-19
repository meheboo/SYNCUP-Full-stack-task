# SYNCUP Realtime Coaching Feed

Small assessment app with a Node.js/Express backend, PostgreSQL through Prisma, Redis caching, Socket.IO realtime updates, and a Next.js frontend.

## Backend

```bash
cd backend
npm install
npm run prisma:migrate
npm run dev
```

Backend runs on `http://localhost:5000`.

APIs:

- `GET /feed` returns `{ source, feeds }`, where `source` is `cache` or `database`.
- `POST /feed` accepts `{ "title": "...", "message": "..." }`, stores it in PostgreSQL, clears Redis cache, and emits `feed:created`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

Pages:

- `/` shows feeds and listens for realtime updates.
- `/admin` creates a new feed item.

## Environment

Backend needs PostgreSQL and Redis running locally. Copy `backend/.env.example` to `backend/.env` and update values if your local services use different credentials.

Frontend can use these defaults, or set them in `frontend/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```
