# User Management Dashboard

A React + Vite admin dashboard for user management with search, filtering, sorting, pagination, and CRUD operations.

## Features

- Fetches user data from a backend REST API
- Search users by name, email, website, or company name
- Filter users by name, email, company, and website
- Sort users by name or email
- Add new users using a modal form
- Edit existing users inline via modal
- Delete users with confirmation
- Client-side pagination for easy browsing

## Project Structure

- `src/App.jsx` — route layout and dashboard route
- `src/components/Dashboard/index.jsx` — main dashboard UI and state management
- `src/components/UserTable/index.jsx` — table display of users
- `src/components/UserForm/index.jsx` — add and edit user modals
- `src/components/SearchBar/index.jsx` — global search input
- `src/components/Pagination/index.jsx` — page navigation controls
- `src/components/ConfirmDelete/index.jsx` — delete confirmation modal
- `src/api/userService.js` — API service for user CRUD requests

## Requirements

- Node.js 18+ recommended
- A backend REST API with support for:
  - `GET /` to fetch all users
  - `POST /` to create a user
  - `PUT /:id` to update a user
  - `DELETE /:id` to delete a user

## Environment Variables

Create a `.env` file at the project root with the following variable:

```env
VITE_BACKEND_API_URL=http://localhost:4000
```

Adjust the URL to your backend API base address.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Build

Build the app for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Scripts

- `npm run dev` — launch development server
- `npm run build` — create production build
- `npm run preview` — preview built app locally
- `npm run lint` — run ESLint

## Dependencies

- `react` — UI library
- `react-dom` — React DOM rendering
- `react-router-dom` — route handling
- `axios` — HTTP client
- `react-icons` — icon set
- `vite` — frontend build tool

## Notes

- API requests are configured in `src/api/userService.js` using `axios`.
- The dashboard reads and updates user data through the configured backend URL in `VITE_BACKEND_API_URL`.
- If the backend is not running or the URL is incorrect, the dashboard will fail to load users.
