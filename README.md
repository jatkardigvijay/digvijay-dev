# digvijay-dev

A personal "About Me" site with a Spring Boot REST backend and a React frontend.

## Tech stack

- **Backend:** Java 21, Spring Boot 3.5, Maven
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4

## Project structure

```
backend/    Spring Boot API (profile data served from src/main/resources/profile.json)
frontend/   React + Vite single-page app
```

## Getting started

### Backend

```bash
cd backend
mvn spring-boot:run
```

Runs on http://localhost:8080. Run tests with `mvn test`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173 and proxies `/api` requests to the backend.

## API

| Endpoint          | Description                |
| ----------------- | -------------------------- |
| `GET /api/profile`    | Full profile           |
| `GET /api/skills`     | Skill groups           |
| `GET /api/experience` | Work experience        |
| `GET /api/projects`   | Projects               |

## Configuration

Allowed CORS origins are set in `backend/src/main/resources/application.properties`
(`app.cors.allowed-origins`). To update the content shown on the site, edit `profile.json`.
