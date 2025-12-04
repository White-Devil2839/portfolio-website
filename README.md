## Portfolio Website

Full-stack MERN portfolio application with an Express + MongoDB API and a React frontend.

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB running locally or a hosted cluster

### Environment Variables
Copy the provided examples into `.env` files and adjust the values:

```
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env
```

`backend/.env` stores the API port, Mongo connection string, allowed frontend origins (`CLIENT_URL`, comma-separated), and optional Gmail credentials for contact form notifications. `frontend/.env` configures the API base URL used by Axios.

### Install Dependencies
```
cd backend && npm install
cd ../frontend && npm install
```

### Seed MongoDB
Populate the database with sample projects, skills, and resume data:
```
cd backend
npm run seed        # clears + inserts sample data
npm run seed:clear  # clears collections only
```

### Run the Stack
1. Start the backend API (from `backend/`):
   ```
   npm run dev
   ```

2. Start the frontend (from `frontend/`):
   ```
   npm start
   ```

The React app defaults to `http://localhost:3000` and will call the API at `http://localhost:5000/api` unless overridden via `REACT_APP_API_URL`.

### Available API Routes
- `GET/POST /api/messages` – contact form storage + notifications
- `GET/POST/PUT/DELETE /api/projects` – project management
- `GET/POST/PUT/DELETE /api/skills` – skills management
- `GET/PUT /api/resume` – resume content (single document)

### Testing & Verification
- Use `npm run seed` to ensure MongoDB contains sample content for the UI.
- Hit `http://localhost:5000/api/health` to verify the API is online.
- Submit the contact form in the UI to ensure the message persists; Gmail credentials are optional (email send falls back to console logging if absent).

