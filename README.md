# digvijay-dev

A personal "About Me" site with a Spring Boot REST backend and a React frontend.

## Tech stack

- **Backend:** Java 25, Spring Boot 4.2, Maven
- **Frontend:** React 19, TypeScript 7, Vite 8, Tailwind CSS 4
- **Testing:** JUnit 5 and Mockito (backend), Vitest 5 and Testing Library (frontend)

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

Requires JDK 25 and Maven. Runs on http://localhost:8080. Run tests with `mvn test`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Requires a recent Node.js (20+) and npm. Runs on http://localhost:5173 and proxies `/api` requests to the backend.

Run the tests with `npm test` (single run) or `npm run test:watch`. On Windows, run them from PowerShell or your IDE terminal rather than Git Bash, which can break Vitest because of the lowercase drive letter in its working directory.

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
