# CourseHub Frontend

React frontend for CourseHub.

## Current stack

- React
- Vite
- Tailwind CSS
- Spring Boot backend integration
- MySQL-backed authentication and course APIs

## Run locally

```bash
npm install
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## Demo accounts

- `student@demo.com` / `password123`
- `educator@demo.com` / `password123`
- `admin@demo.com` / `password123`

## Notes

- Firebase has been removed from the active frontend flow.
- Email/password login, registration, and profile update now use the Spring Boot backend.
- Some modules like cart, checkout, and parts of the dashboard still use local mock data and can be migrated next.
