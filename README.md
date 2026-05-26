# TeamBoard - Multi-Tenant Project Management SaaS

A full-stack project management platform inspired by Jira, Trello, and Linear.

TeamBoard enables organizations to manage projects, tasks, team members, and workflows through a modern Kanban-based interface with secure authentication, role-based access control, analytics, and real-time collaboration.

---

## Features

### Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt
- Role-Based Access Control (RBAC)

### Organization Management

- Create Organizations
- Invite Team Members
- Manage Organization Members
- Assign Member Roles
- Multi-Tenant Architecture

### Project Management

- Create Projects
- View Projects
- Project Organization Mapping
- Project Ownership Tracking

### Task Management

- Create Tasks
- Assign Tasks
- Task Priorities
- Task Status Tracking
- Task Attachments
- Task Activity History

### Kanban Board

- TODO
- IN_PROGRESS
- REVIEW
- DONE

- Drag & Drop Workflow
- Real-Time Status Updates

### Dashboard

- Organization Statistics
- Project Statistics
- Task Statistics
- Completed Task Metrics

### Collaboration

- Activity Timeline
- Team Member Management
- Real-Time Updates using Socket.IO

### Engineering Features

- REST API Architecture
- TypeScript Backend
- MongoDB Data Modeling
- React Component Architecture
- Axios API Layer
- Error Handling
- Validation Layer
- Docker Ready
- CI/CD Ready

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- React DnD / Drag & Drop

### Backend

- Node.js
- Express.js
- TypeScript
- JWT
- bcrypt
- Multer
- Socket.IO

### Database

- MongoDB
- Mongoose

### Infrastructure

- Docker
- GitHub Actions
- Redis (Caching)
- MongoDB Atlas

---

## Architecture

```

User
│
├── Authentication
│
└── Organization
│
├── Members
│
├── Projects
│
└── Tasks
│
├── Kanban Workflow
│
├── Activity Tracking
│
└── Attachments

```

---

## Folder Structure

```

teamboard
│
├── client
│ ├── src
│ │ ├── api
│ │ ├── components
│ │ ├── context
│ │ ├── hooks
│ │ ├── pages
│ │ ├── routes
│ │ └── types
│
├── server
│ ├── src
│ │ ├── config
│ │ ├── controllers
│ │ ├── middleware
│ │ ├── models
│ │ ├── routes
│ │ ├── services
│ │ ├── validators
│ │ └── utils

```

---

## API Modules

### Authentication

```

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

```

### Organizations

```

POST /api/organizations
GET /api/organizations

```

### Projects

```

POST /api/projects
GET /api/projects

```

### Tasks

```

POST /api/tasks
GET /api/tasks/project/:projectId
PATCH /api/tasks/:taskId/status

```

### Dashboard

```

GET /api/dashboard/stats

```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/yourusername/teamboard.git
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Create `.env` inside server:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret
```

---

--


## Author

Sanchit Bajpai
