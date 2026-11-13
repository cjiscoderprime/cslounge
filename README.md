# CSLounge

CSLounge is a full-stack developer discussion platform built around focused technical communities called **lounges**.

Users can create accounts, join discussions, publish posts, comment, vote on posts and comments, and browse conversations by topic.

The project is built as a full-stack application with a Next.js frontend, Spring Boot backend, and PostgreSQL database.

## Features

### Authentication
- User registration
- Username/password login
- BCrypt password hashing
- Persistent server-side sessions
- Session-based route protection
- Logout support
- Light and dark themes

### Discussions
- Create posts
- Browse recent discussions
- View individual posts
- Upvote and downvote posts
- Comment on posts
- Upvote and downvote comments
- Real-time UI refresh after interactions

### Lounges
- Topic-based discussion communities
- Browse all lounges
- View posts belonging to a specific lounge
- Dynamic lounge routes using slugs

Current examples include:

- Systems
- Databases
- Cloud

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

### Database

- PostgreSQL 17
- Docker

## Architecture

```text
Browser
   |
   v
Next.js Frontend
   |
   | /api/*
   v
Next.js API Routes
   |
   v
Spring Boot REST API
   |
   v
PostgreSQL
```

The browser communicates primarily with Next.js API routes.

Next.js acts as a frontend server and proxy layer, forwarding authenticated requests to the Spring Boot backend.

Spring Boot owns the application logic, persistence layer, authentication sessions, posts, comments, lounges, and voting.

PostgreSQL stores application data.

## Core Data Model

The application currently includes:

```text
users
lounges
posts
comments
post_votes
comment_votes
```

Relationships include:

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
 └── Votes

Comment
 └── Votes
```

A user can cast at most one vote per post or comment.

Votes use:

```text
 1 = upvote
-1 = downvote
```

## Project Structure

```text
cslounge/
│
├── app/
│   ├── api/
│   ├── login/
│   ├── register/
│   ├── lounges/
│   ├── posts/
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── posts/
│   └── lounges/
│
├── types/
│
├── backend/
│   ├── src/
│   └── pom.xml
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

Start the PostgreSQL container before starting the backend.

### 3. Apply database migrations

Migration files are located in:

```text
database/migrations/
```

Example:

```powershell
Get-Content database/migrations/003_comments_and_votes.sql | docker exec -i cslounge-postgres psql -U cslounge -d cslounge
```

Apply migrations in numerical order.

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

From the project root:

```bash
npm install
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

## Authentication Flow

CSLounge currently uses server-side sessions.

After successful login, Spring Boot creates an HTTP session and returns a `JSESSIONID` cookie.

```text
Login
  ↓
Next.js API route
  ↓
Spring Boot
  ↓
HttpSession created
  ↓
JSESSIONID cookie
  ↓
Authenticated requests
```

Posts and comments do not trust an `authorId` supplied by the frontend.

Instead, the backend determines the current user from the authenticated session.

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
GET  /posts
GET  /posts/{id}
POST /posts
```

### Post Voting

```text
PUT    /posts/{postId}/vote
DELETE /posts/{postId}/vote
```

### Comments

```text
GET  /posts/{postId}/comments
POST /posts/{postId}/comments
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

## UI

CSLounge uses a restrained visual system built around:

- warm off-white surfaces
- dark ink typography
- burnt orange accents
- responsive light and dark modes

Voting interactions use semantic colors:

- green for upvotes
- rose/red for downvotes

## Current Development Status

Implemented:

- authentication
- persistent sessions
- protected home page
- posts
- post detail pages
- lounges
- comments
- post voting
- comment voting
- light/dark theme
- responsive discussion UI

## Planned Features

Next:

- account page
- personal post history
- personal comment history
- delete own posts
- cleaner user content management
- automatic lounge slug generation
- stronger route protection
- production deployment

Later:

- user profiles
- following
- friend requests
- notifications
- personalized feeds
- search
- recommendations
- real-time updates
- Redis
- WebSockets

## Design Goal

CSLounge is intended to become more than a basic forum.

The long-term goal is to combine focused technical communities with social-network functionality for developers, while keeping discussions organized around meaningful computer science and software engineering topics.

## Author

Built by Chandragupta Jejurkar.