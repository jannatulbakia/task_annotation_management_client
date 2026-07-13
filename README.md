# Kanvas

A task management and radiology image annotation tool built with Next.js.

# Live Link: 

https://task-annotation-management-client-coral.vercel.app/

## Overview

Kanvas combines a Kanban task board with an image annotation tool. Users can create and manage tasks via a drag-and-drop Kanban interface, and upload radiology images to draw polygon annotations. JWT-based authentication secures all features.

## Features

### Task Management

- **Kanban board** — drag tasks between To Do, In Progress, and Done
- **CRUD** — create, edit, and delete tasks with a modal form
- **Search & filter** — filter tasks by name, priority, and status
- **Date picker** — switch between weeks to view tasks by their due date
- **Priorities** — color-coded low/medium/high priority badges

### Image Annotation

- **Image upload** — upload PNG/JPG images for annotation
- **Polygon drawing** — click-to-place polygon points; double-click or click on the first point to close the polygon
- **Label assignment** — enter a label when saving a polygon
- **Existing annotations** — view saved polygons as a list with the ability to delete them

### Auth & Security

- JWT-based authentication with access/refresh token pair
- Auto token refresh on 401 errors
- Token expiry checked for ProtectedRoute and login state
- Server-side media proxy handles Authorization header

## Architecture

### Tech stack

| Aspect | Technology |
|---|---|
| Framework | Next.js 16.2, App Router |
| Language | TypeScript (strict) |
| Bundler | Turbopack, Webpack |
| Styling | Tailwind CSS 4, tw-animate-css |
| UI | shadcn/ui (base-nova), lucide-react |
| State | Zustand 5 |
| Forms | React Hook Form + Zod |
| HTTP | Axios (auto token refresh) |
| Drag & drop | @dnd-kit |
| Syntax | class-variance-authority, clsx |

### Project structure

```
app/
├── annotate/          # Image annotation pages
├── annotate/annotation/
├── api/media/[...path]/route.ts  # Server media proxy
├── dashboard/         # Protected workspace hub
├── login/             # Login route
├── tasks/             # Kanban task board route
├── page.tsx           # Public landing page
└── layout.tsx         # Root layout

components/
├── auth/
│   └── ProtectedRoute.tsx   # Client-side auth guard
├── annotation/        # Annotation canvas, image upload/view, toolbar, polygon list
├── layout/            # AppLayout, Navbar, Sidebar
├── tasks/             # Task board, card, column, modal, delete, priority, date selector
└── ui/                # shadcn/ui components (avatar, badge, button, calendar, card, dialog, etc.)

services/              # Axios config, auth, task CRUD, annotation/image CRUD
store/                 # Zustand stores: authStore, taskStore, annotationStore
types/                 # TypeScript interfaces: auth, task, annotation
schemas/               # Zod validation schemas: login, task
lib/                   # Tailwind utils, local date helpers
utils/                 # Media URL resolution
```

### Routes

| Route | Type | Description |
|---|---|---|
| `/` | Public | Landing page with API status indicator |
| `/login` | Public | Login form |
| `/dashboard` | Protected | Workspace hub |
| `/tasks` | Protected | Kanban task board |
| `/annotate` | Protected | Full annotation page with canvas |
| `/annotate/annotation` | Protected | Simplified upload + viewer |
| `/api/media/[...path]` | Server | Media proxy with auth forwarding |

### State stores

- **authStore**: access/refresh tokens, login, logout, isLoggedIn
- **taskStore**: tasks array, selectedDate, CRUD actions, status move
- **annotationStore**: images, current image, polygons, draw mode, draft points

## Setup

### 1. Clone the repo

```bash
git clone <repo-url>
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Copy or edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.com/api
```

The backend must be a Django Rest Framework API with JWT auth endpoints at:
- `POST /accounts/login/`
- `POST /accounts/refresh/`
- `GET/POST/PUT/PATCH/DELETE /tasks/`
- `GET/POST/DELETE /images/`
- `GET/POST/DELETE /polygons/`

### 4. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000.


### 5. Demo login credentials

demo user: jack@gmail.com
password: jack1234


### Build for production

```bash
npm run build
npm start
```

## License

This is a private project.
