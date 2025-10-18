# Svelte Kanban Board — English README

Description
-----------

This is a lightweight, local-first Kanban board built with Svelte and SvelteKit. It provides a clean, responsive interface to create, organize and track tasks across multiple lanes (To Do, Doing, Done, Archived). The app stores data in the browser (localStorage) so your board persists across reloads and works offline.

The project focuses on being small and approachable while still providing useful features: drag & drop, task metadata (priority, story points, due date), export/share utilities, and optional browser notifications when tasks are completed.

Features
--------

- Multi-lane board: To Do, Doing, Done and Archived
- Drag & drop to move tasks between lanes
- Persistent local storage: board data is saved to `localStorage`
- Task details: title, description, priority, story points, created at and due date
- Notifications: optional browser notifications when tasks are moved to Done (requires permission)
- Share & export: Web Share API integration and ICS export for single tasks
- CSV export: export the full board as a CSV file
- Tailwind CSS for responsive styling and Lucide icons for UI elements

Setup & Installation
----------------------

Prerequisites
- Node.js (v16+ recommended, v18+ preferred)
- npm (or yarn / pnpm)

Install and run locally

1. Clone the repository:

```bash
git clone <repo-url>
cd kanban
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app in your browser at the address printed by Vite (commonly `http://localhost:5173`).

Build for production

```bash
npm run build
npm run preview
```

PWA and service worker notes
- The app includes a manifest and a service worker to support installability and offline app shell. For local testing of PWA features, use `npm run build` and `npm run preview` (or serve the built `dist` over HTTPS). Browsers only allow service workers and push APIs over secure origins (localhost is allowed during development).
- Browser notifications require explicit user permission. The app will ask for permission when a task is moved to the Done lane (during a user gesture).

Customization and development tips
- Tailwind configuration is available in `tailwind.config.cjs` — dark mode is class-based (`dark` class on `<html>`).
- Theme selection is stored in `localStorage` under the key `theme`.
- To change or add features, focus on `src/routes/+page.svelte` (board logic) and `src/lib/components/` (UI components).

Troubleshooting
- If a service worker path returns 404 (for example `/sw.js`), check browser DevTools → Application → Service Workers and unregister stale registrations. The project uses a SvelteKit-built `service-worker.js`.
