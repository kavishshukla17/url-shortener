# URL Shortener

A full-stack URL shortener built with **Express**, **PostgreSQL** (Supabase), and a vanilla HTML/JS frontend. Paste a long URL, get a short link, and redirect with click tracking.

**Live demo:** [https://url-shortener-delta-liart.vercel.app](https://url-shortener-delta-liart.vercel.app)

## Features

- Shorten long URLs via `POST /api/shorten`
- Redirect short codes with `GET /:code` (302)
- Track click counts in the database
- Simple web UI in `public/`
- PostgreSQL hosted on Supabase

## Tech stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Supabase)
- **Frontend:** HTML, CSS, JavaScript (`fetch`)
- **Deploy:** Vercel

## Project structure

```
url-shortener/
├── api/
│   └── index.js          # Vercel serverless entry
├── db/
│   └── schema.sql        # Database table definition
├── public/
│   ├── index.html        # Frontend UI
│   ├── css/style.css
│   └── js/app.js
├── src/
│   ├── config/db.js      # PostgreSQL connection pool
│   ├── routes/
│   │   ├── api.js        # POST /api/shorten
│   │   └── redirect.js   # GET /:code
│   ├── app.js            # Express app setup
│   └── server.js         # Local dev server
├── .env.example
└── vercel.json
```

## Local setup

1. **Clone and install**

```bash
git clone https://github.com/kavishshukla17/url-shortener.git
cd url-shortener
npm install
```

2. **Environment variables**

Copy `.env.example` to `.env` and fill in your values:

```bash
PORT=3000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jujqjmplbyrcrfjmczsv.supabase.co:5432/postgres
BASE_URL=http://localhost:3000
```

3. **Create the database table**

Run the schema against your Supabase/Postgres database (once):

```bash
psql "$DATABASE_URL" -f db/schema.sql
```

Or start the local server — it runs `initSchema()` on boot and creates the table if missing.

4. **Run locally**

```bash
npm run dev
# or
npx nodemon src/server.js
```

Open [http://localhost:3000](http://localhost:3000)

## API

### `POST /api/shorten`

**Request body:**

```json
{ "url": "https://example.com" }
```

**Response (201):**

```json
{
  "short_url": "https://url-shortener-delta-liart.vercel.app/abc1234",
  "short_code": "abc1234",
  "long_url": "https://example.com"
}
```

### `GET /:code`

Redirects to the original URL and increments the hit counter.

## Deployment (Vercel)

The app is configured for Vercel via `vercel.json` and `api/index.js`.

Set these environment variables in the Vercel project:

| Variable       | Description                                      |
|----------------|--------------------------------------------------|
| `DATABASE_URL` | Supabase pooler URL (port `6543` for serverless) |
| `BASE_URL`     | Optional — defaults to the Vercel deployment URL |

**Note:** Use Supabase’s **connection pooler** (port `6543`) for serverless deployments, not the direct `5432` connection.

## License

ISC
