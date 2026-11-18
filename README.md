# CSLounge

CSLounge is a full-stack developer discussion platform built around focused technical communities called **lounges**.

Users can create accounts, publish posts, comment on discussions, vote on posts and comments, create topic-based lounges, and manage their own activity through an account page.

The application is built with a Next.js frontend, Spring Boot backend, and PostgreSQL database.

## Live Deployment

Frontend:

```text
https://cslounge.vercel.app
```

Backend:

```text
https://cslounge.onrender.com
```

Backend health check:

```text
https://cslounge.onrender.com/hello
```

Production infrastructure:

```text
Vercel   → Next.js frontend
Render   → Spring Boot backend
Supabase → PostgreSQL database
```

## Features

### Authentication

- User registration
- Username/password login
- BCrypt password hashing
- Persistent server-side sessions
- `JSESSIONID` cookie-based authentication
- Session-aware route protection
- Logout support

### Discussions

- Create posts
- Browse the latest discussions
- View individual post pages
- Browse posts by lounge
- Upvote and downvote posts
- Withdraw or switch votes
- Comment on posts
- Upvote and downvote comments
- Withdraw or switch comment votes

### Lounges

- Topic-based developer communities
- Browse all lounges
- Create new lounges
- Automatic URL slug generation
- Case-insensitive duplicate lounge prevention
- Dynamic lounge routes such as `/lounges/distributed-systems`

### Account Activity

Authenticated users can view and manage their own activity.

The account page includes:

- personal post history
- personal comment history
- links back to discussions
- delete own posts
- delete own comments
- ownership protection enforced by the backend

### UI

- Light and dark themes
- Responsive layouts
- Warm off-white / dark ink visual system
- Burnt-orange accent color
- Semantic vote interaction colors
- Responsive discussion cards
- Dynamic lounge navigation

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend

- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- Maven
- Docker

### Database

Development:

- PostgreSQL 17
- Docker

Production:

- PostgreSQL hosted on Supabase

### Deployment

- Vercel — Next.js frontend
- Render — Dockerized Spring Boot backend
- Supabase — PostgreSQL

## Architecture

```text
Browser
   |
   v
Next.js Frontend (Vercel)
   |
   | browser actions via /api/*
   | server components can call Spring directly
   v
Spring Boot REST API (Render)
   |
   v
PostgreSQL (Supabase)
```

Next.js handles the user-facing application and proxies authenticated browser actions to Spring Boot.

Spring Boot owns:

- authentication
- sessions
- business logic
- authorization and ownership checks
- lounge creation
- posts
- comments
- voting
- persistence

PostgreSQL stores all persistent application data.

## Core Data Model

CSLounge currently uses:

```text
users
lounges
posts
comments
post_votes
comment_votes
```

Relationships:

```text
User
 ├── Posts
 ├── Comments
 ├── Post Votes
 └── Comment Votes

Lounge
 └── Posts

Post
 ├── Comments
 └── Post Votes

Comment
 └── Comment Votes
```

A user can cast at most one vote per post or comment.

Vote values are stored as:

```text
 1 = upvote
-1 = downvote
```

Voting supports switching and withdrawing votes.

## Authentication Flow

CSLounge uses server-side Spring sessions.

```text
Login form
    ↓
Next.js API route
    ↓
Spring Boot
    ↓
Credentials validated
    ↓
HttpSession created
    ↓
JSESSIONID returned
    ↓
Browser stores session cookie
    ↓
Authenticated requests forward the session
```

Posts and comments do not trust an `authorId` supplied by the frontend.

Instead, Spring Boot determines the authenticated user from the session.

Ownership is also enforced on the backend when deleting posts or comments.

## Lounge Slugs

Users provide only a lounge name.

For example:

```text
High Frequency Trading
```

Spring Boot generates:

```text
high-frequency-trading
```

Lounge names are checked case-insensitively so capitalization variants cannot create duplicate communities.

## Project Structure

```text
cslounge/
│
├── app/
│   ├── account/
│   ├── api/
│   ├── login/
│   ├── register/
│   ├── lounges/
│   ├── posts/
│   └── page.tsx
│
├── components/
│   ├── account/
│   ├── layout/
│   ├── lounges/
│   └── posts/
│
├── lib/
│   └── backend.ts
│
├── types/
│
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│
├── database/
│   └── migrations/
│
├── public/
│
└── README.md
```

## Running Locally

### Requirements

Install:

- Node.js
- Java 21
- Docker
- Git

### 1. Clone the repository

```bash
git clone https://github.com/cjiscoderprime/cslounge.git
cd cslounge
```

### 2. Start PostgreSQL

The development database runs in Docker.

Example configuration:

```text
Database: cslounge
User: cslounge
Port: 5432
```

### 3. Apply database migrations

Migration files are stored in:

```text
database/migrations/
```

Apply them in numerical order.

Example on Windows:

```powershell
Get-Content database/migrations/003_comments_and_votes.sql |
docker exec -i cslounge-postgres psql -U cslounge -d cslounge
```

`001_initial.sql` also contains development seed data. For a clean production database, only the required schema should be applied rather than the development sample rows.

### 4. Configure Spring Boot

Create:

```text
backend/src/main/resources/application.properties
```

Example:

```properties
spring.application.name=backend

spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/cslounge}
spring.datasource.username=${DB_USER:cslounge}
spring.datasource.password=${DB_PASSWORD:your-password}

spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
```

`application.properties` is intentionally ignored by Git so local database credentials are not committed.

### 5. Start the backend

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The Spring Boot API runs at:

```text
http://localhost:8080
```

### 6. Start the frontend

From the repository root:

```bash
npm install
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

`lib/backend.ts` uses the local Spring backend by default and reads `BACKEND_URL` in deployed environments.

## API Overview

### Users

```text
POST /users/register
POST /users/login
POST /users/logout
GET  /users/me
```

### Posts

```text
GET    /posts
GET    /posts/{id}
GET    /posts/by-lounge
GET    /posts/mine
POST   /posts
DELETE /posts/{id}
```

### Post Voting

```text
PUT /posts/{postId}/vote
```

Submitting the same vote again withdraws it. Submitting the opposite vote switches it.

### Comments

```text
GET    /posts/{postId}/comments
POST   /posts/{postId}/comments
GET    /comments/mine
DELETE /comments/{commentId}
```

### Comment Voting

```text
PUT /comments/{commentId}/vote
```

### Lounges

```text
GET  /lounges
GET  /lounges/{slug}
POST /lounges
```

## Production Deployment

### Frontend — Vercel

The repository root is deployed as a Next.js application.

Required environment variable:

```text
BACKEND_URL=https://cslounge.onrender.com
```

### Backend — Render

The Spring Boot backend is deployed as a Docker web service.

Render configuration:

```text
Root Directory: backend
Dockerfile Path: ./Dockerfile
Health Check Path: /hello
```

Required environment variables:

```text
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://<database-host>:<port>/<database>?sslmode=require
DB_USER=<database-user>
DB_PASSWORD=<database-password>
```

Production Spring configuration uses Render's provided `PORT` environment variable.

### Database — Supabase

Supabase hosts the production PostgreSQL database.

Spring Boot connects directly using JDBC.

Supabase Auth, Supabase client libraries, and the Supabase Data API are not used by CSLounge.

The database remains behind the Spring Boot application layer.

## Docker Deployment

The backend contains:

```text
backend/Dockerfile
```

The image uses a multi-stage build:

```text
Java 21 JDK
    ↓
Maven package
    ↓
Spring Boot JAR
    ↓
Java 21 JRE
    ↓
Render web service
```

## Current Status

The MVP is deployed and supports the complete core discussion flow:

```text
Register
   ↓
Log in
   ↓
Create / browse lounges
   ↓
Create posts
   ↓
Comment
   ↓
Vote
   ↓
Manage personal activity
   ↓
Delete owned content
```

## Future Work

Future development may include:

- real trending-lounge ranking
- public user profiles
- following
- friend requests
- notifications
- personalized feeds
- search
- recommendations
- Redis caching
- WebSockets
- real-time updates

## Design Goal

CSLounge is intended to combine focused technical communities with social-network functionality for developers while keeping conversations organized around meaningful computer science and software engineering topics.

## Author

Built by Chandragupta Jejurkar.
