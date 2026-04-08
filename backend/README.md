# CourseHub Backend

Spring Boot backend for CourseHub with MySQL as the primary database.

## Stack

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- MySQL

## Current scaffold

- Health endpoint: `GET /api/health`
- Course listing endpoint: `GET /api/courses`
- Initial entities:
  - `User`
  - `Course`
  - `CourseModule`
  - `Lesson`
  - `Enrollment`

## Run locally

1. Create MySQL database access or use the default local values in `application.yml`.
2. Update DB username/password if needed.
3. Start the app:

```bash
mvn spring-boot:run
```

The backend will run on `http://localhost:8080`.

## Next backend steps

- Add JWT authentication
- Build user registration/login APIs
- Add course create/update/delete APIs
- Add enrollment and progress APIs
- Replace frontend mock data calls with backend HTTP calls
