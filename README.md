# AI Automation Engineer Learning App

A deployable React + TypeScript learning platform for becoming an AI Automation Engineer focused on full-stack systems, AI integrations, workflow automation, CRM automation, agents, dashboards, testing, deployment, and portfolio readiness.

## What It Includes

- 27-part AI Automation Engineer roadmap
- Dashboard with overall progress and continue-learning flow
- Part detail pages with lessons, exercises, mini-projects, skills, build targets, business use cases, and beginner traps
- Lesson pages with practical sections, code snippets, exercises, mini-projects, notes, and previous/next navigation
- Progress page with completed lessons, exercises, mini-projects, parts, streak, last opened lesson, and reset option
- Projects page for the eight portfolio projects in Part 26
- Notes page grouped by lesson
- localStorage persistence with no backend required
- Responsive dark UI for mobile and desktop

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Lucide React icons
- CSS dark theme
- localStorage persistence

## Project Structure

```text
src/
  components/
    Layout/
    Navigation/
    UI/
  data/
    curriculum.ts
  hooks/
    useLocalStorage.ts
    useProgress.tsx
  pages/
    DashboardPage.tsx
    LessonPage.tsx
    NotesPage.tsx
    PartDetailPage.tsx
    ProgressPage.tsx
    ProjectsPage.tsx
  types/
    curriculum.ts
  utils/
    progress.ts
  App.tsx
  main.tsx
  styles.css
```

## Local Setup

Install dependencies:

```bash
npm install
```

On Windows PowerShell, if script execution blocks `npm`, use:

```bash
npm.cmd install
```

Start the development server:

```bash
npm run dev
```

Windows PowerShell alternative:

```bash
npm.cmd run dev
```

Build for production:

```bash
npm run build
```

Type-check:

```bash
npm run lint
```

Preview the production build:

```bash
npm run preview
```

## Docker

Build the production image:

```bash
docker build -t ai-automation-learning-app .
```

Run the container locally:

```bash
docker run --rm -p 8080:8080 -e PORT=8080 ai-automation-learning-app
```

Open:

```text
http://localhost:8080
```

The container uses a multi-stage build:

1. `node:22-alpine` installs dependencies and runs the Vite production build.
2. `nginx:1.27-alpine` serves the static `dist/` files.
3. `nginx.conf.template` includes a React Router fallback so direct lesson URLs load correctly.

## Deployment

This app is a static Vite app and can be deployed to Vercel, Netlify, Cloudflare Pages, or any static host.

Recommended settings:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

No environment variables are required for the current version because curriculum content is bundled into the app and progress is stored in the browser.

## Content Expansion

The curriculum is stored in `src/data/curriculum.ts`.

To deepen a part:

1. Add more `Lesson` objects to the part.
2. Link lessons to exercises and mini-projects using `exerciseId` and `miniProjectId`.
3. Keep business logic out of page components.
4. Keep progress changes inside `src/hooks/useProgress.tsx` and `src/utils/progress.ts`.

## Future Improvements

- Add richer quiz/checkpoint question support
- Add import/export for local progress backups
- Add optional account sync if a backend is introduced later
- Add more hands-on code labs, quizzes, and real-world walkthroughs for each curriculum part
- Add automated component tests once a test runner is selected
