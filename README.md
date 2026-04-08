# CourseHub

CourseHub is now separated into two applications:

- `frontend/` -> React + Vite + Tailwind frontend
- `backend/` -> Java Spring Boot + MySQL backend

## Project structure

```text
CourseHub-main/
|-- frontend/
|-- backend/
|-- .gitignore
`-- README.md
```

## Frontend

The existing UI app has been moved into [`frontend/`](c:/Users/MUKESH/Downloads/CourseHub-main/CourseHub-main/frontend).

Run it with:

```bash
cd frontend
npm install
npm run dev
```

## Backend

The new Spring Boot app lives in [`backend/`](c:/Users/MUKESH/Downloads/CourseHub-main/CourseHub-main/backend).

Run it with:

```bash
cd backend
mvn spring-boot:run
```

Default backend target:

- API base URL: `http://localhost:8080`
- Health check: `http://localhost:8080/api/health`

## Suggested next steps

1. Add JWT authentication in the backend.
2. Create user, course, enrollment, and progress APIs.
3. Replace frontend `mockData` usage with backend API calls.
4. Decide whether Firebase auth should be removed completely or kept temporarily during migration.
