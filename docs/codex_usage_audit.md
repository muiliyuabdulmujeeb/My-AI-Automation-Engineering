# Codex Usage Audit

## Project Information

- Project name: AI Automation
- Repository: Not initialized as a Git repository in the current workspace
- Main technology stack: Planned React, TypeScript, Vite, CSS modules/global CSS, localStorage persistence
- Start date: 2026-05-25
- Codex environment: Codex desktop app, Windows PowerShell, workspace-write sandbox
- Notes: This audit file tracks Codex work sessions, implementation phases, token usage availability, tests, results, and follow-up items. Exact token telemetry is not exposed in the current Codex environment unless explicitly provided by tooling.

## Usage Summary

This section should be updated as the project progresses.

| Metric | Value |
|---|---|
| Total sessions/tasks recorded | 13 |
| Total input tokens | Not available in current Codex environment |
| Total cached input tokens | Not available in current Codex environment |
| Total output tokens | Not available in current Codex environment |
| Total reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |
| Estimated total cost/credits | Not available in current Codex environment |

## Session Log

---

### Session 001: Create Codex Usage Audit

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Create `docs/codex_usage_audit.md` before any other implementation work and establish a chronological audit format for tracking future Codex sessions, files changed, tests run, results, token usage, estimated costs, and project progress.

**Work completed:**

- Created the initial audit file with the requested project information, usage summary, session log format, update rules, missing-token guidance, and final project summary placeholder.
- Recorded this setup work as the first session so future work starts from a clean baseline.
- Checked the workspace status and noted that the current folder is not initialized as a Git repository.
- Assumed the project name is `AI Automation` based on the workspace folder name.

**Files changed:**

- `docs/codex_usage_audit.md` - created the Codex usage audit ledger and initial session entry.

**Tests run:**

```bash
git status --short
```

**Test result:**

No automated tests were run because this task only created a documentation/audit file and no test suite or project code was present at the workspace root. `git status --short` reported that the current workspace is not a Git repository.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment

**Result:** Success

**Follow-up needed:**

- Continue adding a new session entry after every meaningful task, phase, implementation, investigation, test update, documentation update, or project session.

---

### Session 002: Phase 1 Inspect and Plan

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Inspect the existing project structure before writing application code, identify the framework and files present, and produce a concise implementation plan for the AI Automation Engineer learning platform.

**Work completed:**

- Inspected the workspace root and confirmed that only the `docs` folder and Codex audit file exist.
- Confirmed the folder is not currently initialized as a Git repository.
- Confirmed Node.js is installed.
- Found that PowerShell blocks the `npm` shim, so future package commands should use `npm.cmd`.
- Planned to scaffold a Vite React TypeScript app with localStorage-backed progress tracking, curriculum data in TypeScript, reusable components, responsive dark UI, and deployable README instructions.

**Files changed:**

- `docs/codex_usage_audit.md` - updated project technology notes and added the Phase 1 session record.

**Tests run:**

```bash
Get-ChildItem -Force
Get-ChildItem -Recurse -Force -File
node --version
npm.cmd --version
git status --short
```

**Test result:**

Inspection commands succeeded except `git status --short`, which reported that the workspace is not a Git repository. No automated app tests were available yet because the React app had not been scaffolded.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this inspection/planning phase: small session, likely 2k-8k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Scaffold the React/Vite application structure.
- Add curriculum data, progress persistence, responsive UI, and deployment documentation in later phases.

---

### Session 003: Phase 2 Core App Structure

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Create the core React/Vite application structure for the AI Automation Engineer learning platform, including routing, layout, page shells, shared UI components, and initial styling.

**Work completed:**

- Added a Vite React TypeScript scaffold with package scripts for development, build, preview, and type-check linting.
- Created the main React entry point, router setup, and app shell.
- Added desktop/mobile navigation, dashboard, part detail, lesson, projects, progress, and notes page components.
- Added reusable progress bar, status badge, and copyable code block UI components.
- Added a responsive dark theme with cards, panels, progress bars, lesson sections, mobile drawer navigation, and accessible spacing.
- Added an empty curriculum export so the core app can be wired before the data model is populated in Phase 3.

**Files changed:**

- `package.json` - added Vite, React, TypeScript, React Router, and Lucide dependencies and scripts.
- `index.html` - added Vite app shell.
- `tsconfig.json` - added TypeScript compiler settings.
- `tsconfig.node.json` - added Vite config TypeScript settings.
- `vite.config.ts` - configured Vite React plugin.
- `src/main.tsx` - mounted React app with router and progress provider.
- `src/App.tsx` - added route definitions.
- `src/types/curriculum.ts` - added curriculum and progress TypeScript models.
- `src/data/curriculum.ts` - added initial curriculum export.
- `src/hooks/useLocalStorage.ts` - added localStorage persistence helper.
- `src/hooks/useProgress.ts` - added initial progress provider API.
- `src/utils/progress.ts` - added progress calculation utilities.
- `src/components/Layout/AppLayout.tsx` - added app layout shell.
- `src/components/Navigation/Sidebar.tsx` - added desktop sidebar and mobile drawer navigation.
- `src/components/UI/ProgressBar.tsx` - added reusable progress bar.
- `src/components/UI/StatusBadge.tsx` - added reusable status badge.
- `src/components/UI/CodeBlock.tsx` - added copyable code snippet component.
- `src/pages/DashboardPage.tsx` - added dashboard page shell.
- `src/pages/PartDetailPage.tsx` - added part detail page shell.
- `src/pages/LessonPage.tsx` - added lesson rendering page shell.
- `src/pages/ProjectsPage.tsx` - added portfolio projects page shell.
- `src/pages/ProgressPage.tsx` - added progress analytics page shell.
- `src/pages/NotesPage.tsx` - added lesson notes page shell.
- `src/styles.css` - added responsive dark theme and component styling.
- `docs/codex_usage_audit.md` - added Phase 2 audit entry.

**Tests run:**

```bash
No automated tests run in this phase.
```

**Test result:**

No automated tests were run because dependencies have not been installed yet and the curriculum data is intentionally empty until Phase 3. Build and type-checking are scheduled for the quality pass after implementation.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: medium session, likely 20k-50k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Partial success

**Follow-up needed:**

- Populate the full 27-part curriculum data.
- Complete progress tracking behavior and run TypeScript/build checks after dependencies are installed.

---

### Session 004: Phase 3 Curriculum Data Model

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Create a scalable TypeScript curriculum data model and populate the AI Automation Engineer roadmap with all 27 requested parts, including meaningful lessons, exercises, mini-projects, and deeper lesson content for the early curriculum.

**Work completed:**

- Replaced the temporary empty curriculum export with a full structured curriculum data file.
- Added all 27 curriculum parts with difficulty, estimated time, outcomes, skills, build targets, business use cases, beginner traps, lessons, exercises, and mini-projects.
- Added deeper multi-lesson content for Parts 1-3 covering foundations, workflow vs agent thinking, consultant thinking, Python, JavaScript, backend services, APIs, HTTP, JSON, webhooks, retries, and reading API documentation.
- Added meaningful structured lessons for Parts 4-27 using a reusable generation pattern that keeps content scalable without duplicating rendering logic.
- Added the eight full real-world portfolio projects in Part 26 with business problems, required skills, descriptions, and deliverables.

**Files changed:**

- `src/data/curriculum.ts` - added the full 27-part curriculum data set and project definitions.
- `docs/codex_usage_audit.md` - added Phase 3 audit entry.

**Tests run:**

```bash
Select-String -Path src\data\curriculum.ts -Pattern "partNumber:" | Measure-Object
Select-String -Path src\data\curriculum.ts -Pattern "id: \"project-" | Measure-Object
```

**Test result:**

The first inspection command confirmed `partNumber` entries exist in the curriculum file, though the count includes non-data references. The second inspection command failed due to PowerShell quote escaping, not an application issue. Full TypeScript validation is still pending dependency installation and the quality pass.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: medium-to-large session, likely 35k-70k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Tighten progress tracking behavior and localStorage persistence.
- Add search and filters to the learning experience.
- Run TypeScript/build checks once dependencies are installed.

---

### Session 005: Phase 4 Progress Tracking

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Implement localStorage-backed learning progress for active lesson state, completed lessons, completed exercises, completed mini-projects, completed parts, notes, reset behavior, and simple learning activity tracking.

**Work completed:**

- Stabilized progress provider actions with React callbacks to prevent unnecessary state rewrites while viewing lessons.
- Added localStorage persistence for the progress model.
- Added completed-part derivation based on all lessons, exercises, and mini-projects in each part.
- Added activity date tracking and a simple current-streak helper.
- Displayed the learning streak on the dashboard and progress page.
- Preserved reset progress functionality.

**Files changed:**

- `src/hooks/useProgress.ts` - improved progress action stability and persistence behavior.
- `src/utils/progress.ts` - added activity streak calculation.
- `src/pages/DashboardPage.tsx` - displayed current learning streak.
- `src/pages/ProgressPage.tsx` - displayed current learning streak in progress analytics.
- `docs/codex_usage_audit.md` - added Phase 4 audit entry.

**Tests run:**

```bash
No automated tests run in this phase.
```

**Test result:**

No automated tests were run because dependencies are still not installed. Behavior will be validated through TypeScript/build checks and browser testing after the implementation phases are complete.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small-to-medium session, likely 8k-20k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Add search, difficulty/status filters, and lesson/project experience refinements.
- Install dependencies and validate with build/type checks.

---

### Session 006: Phase 5 Learning Experience

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Improve the learning experience with curriculum search, filters, current-position indicators, project tracking visuals, part completion messaging, and clearer progress context.

**Work completed:**

- Added dashboard search across part titles, descriptions, difficulty, skills, lesson titles, and lesson summaries.
- Added dashboard filters for completion status and difficulty.
- Added current-stage highlighting on curriculum cards.
- Added a part completion celebration panel when every lesson, exercise, and mini-project in a part is complete.
- Added real business use case and common beginner trap panels on part detail pages.
- Added last-opened lesson and activity details on the progress page.
- Added completed-state styling for portfolio project cards.

**Files changed:**

- `src/pages/DashboardPage.tsx` - added search, status filter, difficulty filter, and current-stage indicator.
- `src/pages/PartDetailPage.tsx` - added completion panel and practical context panels.
- `src/pages/ProgressPage.tsx` - added last-opened lesson and activity summary.
- `src/pages/ProjectsPage.tsx` - added completed project card styling hook.
- `src/styles.css` - added filter panel, current card, completion, and celebration styles.
- `docs/codex_usage_audit.md` - added Phase 5 audit entry.

**Tests run:**

```bash
No automated tests run in this phase.
```

**Test result:**

No automated tests were run because dependencies are still not installed. These UI and state changes will be checked during the build and browser verification pass.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small-to-medium session, likely 10k-25k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Run responsive/browser checks after dependencies are installed.
- Fix TypeScript/build issues discovered in the quality pass.

---

### Session 007: Phase 6 Responsive Dark UI

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Polish the responsive dark interface for mobile and desktop usability, accessibility, layout stability, and long-form learning comfort.

**Work completed:**

- Added visible focus states for links, buttons, inputs, selects, and textareas.
- Improved responsive statistics grids using auto-fit sizing.
- Added mobile-safe control sizing and stable curriculum card dimensions.
- Added reduced-motion support for users who prefer less animation.
- Preserved the clean dark navy/slate theme with teal and indigo accents.

**Files changed:**

- `src/styles.css` - refined responsive layout, focus visibility, mobile sizing, and motion preferences.
- `docs/codex_usage_audit.md` - added Phase 6 audit entry.

**Tests run:**

```bash
No automated tests run in this phase.
```

**Test result:**

No automated tests were run because this phase changed CSS only. Visual validation is planned after dependency installation and local app launch.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small session, likely 4k-12k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Install dependencies.
- Run build/type checks.
- Launch and inspect the app locally.
- Add deployment-ready README instructions.

---

### Session 008: Phase 8 and 9 Quality Pass and Deployment Readiness

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Install dependencies, run quality checks, verify the app locally, fix build/type issues, and add deployment-ready documentation for the React learning platform.

**Work completed:**

- Installed project dependencies with `npm.cmd install`.
- Fixed TypeScript/Vite module resolution by switching to `moduleResolution: "Bundler"`.
- Renamed the progress provider from `useProgress.ts` to `useProgress.tsx` because it renders JSX.
- Updated the build script to use no-emit type-checking before Vite build.
- Removed unnecessary TypeScript project references that caused no-emit conflicts.
- Added `.gitignore` for generated folders and temporary files.
- Added `README.md` with setup, run, build, preview, deployment, project structure, and future improvement notes.
- Ran production build successfully.
- Ran TypeScript lint/type-check successfully.
- Started the Vite dev server, verified the dashboard in the browser, opened a lesson, marked it complete, reloaded, and confirmed completion persisted.
- Stopped background Vite processes and removed temporary Vite log files created during diagnosis.

**Files changed:**

- `.gitignore` - added ignores for dependencies, build output, logs, and generated TypeScript artifacts.
- `README.md` - added setup, usage, deployment, and project structure documentation.
- `package.json` - added scripts and dependencies, then updated build/lint scripts for clean no-emit type-checking.
- `package-lock.json` - generated dependency lockfile.
- `tsconfig.json` - updated module resolution and removed unnecessary project reference.
- `tsconfig.node.json` - updated module resolution and no-emit settings.
- `src/hooks/useProgress.tsx` - renamed from `.ts` to `.tsx` to support JSX provider output.
- `docs/codex_usage_audit.md` - added Phase 8/9 audit entry.

**Tests run:**

```bash
npm.cmd install
npm.cmd run build
npm.cmd run lint
```

Browser verification:

```text
Opened http://127.0.0.1:5175/
Confirmed dashboard rendered.
Confirmed Part 27 appeared in the curriculum.
Opened Part 1 lesson.
Clicked Mark Lesson Complete.
Reloaded the lesson page.
Confirmed the completed state persisted.
```

**Test result:**

All final checks passed. `npm.cmd run build` completed successfully, and `npm.cmd run lint` completed successfully. No `npm test` command was run because no test script or test runner is configured in this first version.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: medium session, likely 20k-45k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Add automated component or end-to-end tests if a test runner is selected.
- Continue expanding deeper lesson content for Parts 4-27 over controlled content phases.

---

### Session 009: Containerize React Learning App

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Containerize the React learning app and add Docker run instructions to the README.

**Work completed:**

- Added a multi-stage Dockerfile that builds the Vite app with Node and serves the compiled static files with Nginx.
- Added an Nginx template that supports the `PORT` environment variable and React Router fallback to `index.html`.
- Added `.dockerignore` to keep dependency folders, build output, docs, logs, and generated artifacts out of the Docker build context.
- Updated the README with Docker build and run commands.

**Files changed:**

- `Dockerfile` - added production container build.
- `nginx.conf.template` - added Nginx static hosting and SPA fallback configuration.
- `.dockerignore` - added Docker build-context exclusions.
- `README.md` - added Docker build/run instructions.
- `docs/codex_usage_audit.md` - added this containerization audit entry.

**Tests run:**

```bash
npm.cmd run build
npm.cmd run lint
docker --version
docker build -t ai-automation-learning-app .
```

**Test result:**

`npm.cmd run build` passed. `npm.cmd run lint` passed. `docker --version` confirmed Docker is installed. Docker image build could not be completed because Docker Desktop's Linux engine was not running: `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.`

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small-to-medium session, likely 8k-18k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Partial success

**Follow-up needed:**

- Start Docker Desktop and rerun `docker build -t ai-automation-learning-app .`.
- Optionally run `docker run --rm -p 8080:8080 -e PORT=8080 ai-automation-learning-app` and open `http://localhost:8080`.

---

### Session 010: Add Render Deployment Guide

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Create a `render.md` file explaining how to deploy the app on Render from GitHub.

**Work completed:**

- Added a Render deployment guide focused on the recommended Static Site deployment path for a Vite React app.
- Included GitHub push steps, Render build settings, publish directory, React Router rewrite rule, deployment checks, and troubleshooting.
- Included an alternative Docker Web Service path for users who want to deploy the containerized version.
- Linked to official Render documentation for static sites, deploys, and Docker.

**Files changed:**

- `render.md` - added Render deployment instructions.
- `docs/codex_usage_audit.md` - added this Render deployment documentation audit entry.

**Tests run:**

```bash
npm.cmd run build
npm.cmd run lint
```

**Test result:**

Both checks passed. The Render guide is documentation-only, but the app was rebuilt and type-checked to confirm the repository remains deployable.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small-to-medium session, likely 6k-15k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- After pushing to GitHub, use the Render Static Site settings from `render.md`.

---

### Session 011: Deepen Curriculum Lesson Content

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Improve the curriculum content depth because the app is intended to support a real career path in AI Automation Engineering, not just shallow notes.

**Work completed:**

- Reworked the reusable curriculum lesson generator so each non-handwritten curriculum part now gets a three-lesson learning arc instead of a single generic lesson.
- Added richer lesson structure for each generated part:
  - Concepts and business value
  - Implementation workflow
  - Production, safety, and portfolio readiness
- Expanded lesson sections with business outcomes, analogies, workflow examples, implementation checklists, test cases, beginner mistakes, debugging tips, mental models, and portfolio framing.
- Preserved the deeper custom lessons for Parts 1-3 while improving Parts 4-27 through the generator.
- Updated README future improvement notes to reflect that the next content step should be hands-on labs, quizzes, and real-world walkthroughs rather than merely adding basic lesson depth.

**Files changed:**

- `src/data/curriculum.ts` - expanded generated lesson content across the roadmap.
- `README.md` - updated future improvement wording.
- `docs/codex_usage_audit.md` - added this curriculum depth audit entry.

**Tests run:**

```bash
npm.cmd run build
npm.cmd run lint
```

**Test result:**

Both checks passed after the curriculum expansion.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: medium session, likely 18k-40k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Continue controlled content expansion with dedicated hands-on labs, quizzes, and full walkthroughs for each part.
- Add project-specific code labs for portfolio projects in Part 26.

---

### Session 012: Verify Docker Container Runtime

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Docker is now ready. Build and run the project with Docker for completeness and verify the project instructions are satisfied.

**Work completed:**

- Confirmed Docker is installed.
- Re-ran the React production build and TypeScript check.
- Built the Docker image `ai-automation-learning-app:latest`.
- Started the container as `ai-automation-learning-app-test` on `http://localhost:8080`.
- Verified the Docker image exists locally.
- Verified the running container status and port mapping.
- Verified the root route returns HTTP 200.
- Verified `/projects` returns HTTP 200.
- Verified a direct lesson route returns HTTP 200, confirming the Nginx React Router fallback works.
- Checked container logs and confirmed Nginx generated its config from `nginx.conf.template` using the `PORT` environment variable.

**Files changed:**

- `docs/codex_usage_audit.md` - added this Docker runtime verification audit entry.

**Tests run:**

```bash
npm.cmd run build
npm.cmd run lint
docker --version
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker build -t ai-automation-learning-app .
docker run --rm -d --name ai-automation-learning-app-test -p 8080:8080 -e PORT=8080 ai-automation-learning-app
docker ps --filter "name=ai-automation-learning-app-test" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
Invoke-WebRequest -UseBasicParsing http://localhost:8080/
Invoke-WebRequest -UseBasicParsing http://localhost:8080/projects
Invoke-WebRequest -UseBasicParsing http://localhost:8080/parts/part-1/lessons/part-1-ai-automation-engineer-role
docker image ls ai-automation-learning-app
docker logs --tail 30 ai-automation-learning-app-test
```

**Test result:**

All checks passed. The Docker image built successfully, the container is running on port `8080`, the root route and direct React Router routes return HTTP 200, and container logs show Nginx started successfully with the templated port configuration.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: small-to-medium session, likely 8k-18k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- The container is currently running at `http://localhost:8080`.
- Stop it when finished with `docker stop ai-automation-learning-app-test`.

---

### Session 013: Deepen Plain-English Curriculum Content Across Parts

**Date/time:** 2026-05-25, Africa/Lagos timezone

**Project/repo:** AI Automation / local workspace at `C:\Users\Kangchie\Documents\projects\AI Automation`

**Codex model used:** GPT-5 based Codex coding agent

**Prompt/task summary:**

Improve the educational quality of each curriculum part so the app teaches AI Automation Engineering in simple enough English, with deeper explanations suitable for career learning rather than rushed summaries.

**Work completed:**

- Added a `DeepDiveGuide` content model for richer, part-specific lesson guidance.
- Added plain-English deep-dive content for Parts 4-27, while preserving the custom deep lessons already written for Parts 1-3.
- Expanded each generated part's lessons with:
  - Plain-English explanation
  - Why the topic matters in business automation
  - Key ideas the learner must understand
  - Implementation steps before coding
  - Concrete workflow examples
  - Practice plan
  - Beginner mistakes
  - Debugging guidance
  - Portfolio/career framing
- Rebuilt the app locally.
- Rebuilt the Docker image so the container includes the updated curriculum content.
- Restarted the Docker container and verified representative deep lesson routes through Nginx.

**Files changed:**

- `src/data/curriculum.ts` - added `DeepDiveGuide`, deep-dive guide lookup, richer generated lesson content, and part-specific deep content for Parts 4-27.
- `docs/codex_usage_audit.md` - added this curriculum depth audit entry.

**Tests run:**

```bash
npm.cmd run build
npm.cmd run lint
docker stop ai-automation-learning-app-test
docker build -t ai-automation-learning-app .
docker run --rm -d --name ai-automation-learning-app-test -p 8080:8080 -e PORT=8080 ai-automation-learning-app
Invoke-WebRequest -UseBasicParsing http://localhost:8080/parts/part-4/lessons/part-4-databases-for-ai-automation-concepts
Invoke-WebRequest -UseBasicParsing http://localhost:8080/parts/part-9/lessons/part-9-ai-agents-and-tool-calling-implementation
Invoke-WebRequest -UseBasicParsing http://localhost:8080/parts/part-27/lessons/part-27-portfolio-and-client-readiness-production-career
rg "A database is the memory|An AI agent is an AI system|Portfolio and client readiness means" src\data\curriculum.ts
docker logs --tail 20 ai-automation-learning-app-test
```

**Test result:**

All checks passed. The app builds and type-checks successfully. The Docker image rebuilt successfully, the updated container is running on `http://localhost:8080`, and representative direct lesson routes for Parts 4, 9, and 27 return HTTP 200. Source inspection confirmed the new plain-English deep-dive content is present.

**Token usage:**

| Token type | Value |
|---|---|
| Input tokens | Not available in current Codex environment |
| Cached input tokens | Not available in current Codex environment |
| Output tokens | Not available in current Codex environment |
| Reasoning tokens | Not available in current Codex environment |
| Total tokens | Not available in current Codex environment |

**Estimated cost/credits:**

Not available in current Codex environment. Estimated total usage for this phase: medium-to-large session, likely 30k-70k tokens. This is an estimate only because exact token telemetry was not available.

**Result:** Success

**Follow-up needed:**

- Continue turning the richest topics into full hands-on labs with step-by-step code walkthroughs.
- Add quizzes/checkpoints to test understanding after each major part.
- Add project rubrics for Part 26 portfolio builds.

---

## How to Update the Audit File

For every new task:

1. Add a new session entry.
2. Increment the session number.
3. Update the `Usage Summary` table if token/cost data is available.
4. Keep entries in chronological order.
5. Do not delete previous session records.
6. Do not rewrite history unless correcting a clear mistake.
7. Be honest about failures, skipped tests, missing token data, or incomplete work.

## When Exact Token Data Is Missing

If exact token usage is not exposed by Codex, do not guess precise values.

Instead, write:

```text
Token usage was not available in the current Codex environment.
```

If you provide an estimate, use a clear range, for example:

```text
Estimated total usage: medium session, likely 20k-50k tokens.
This is an estimate only because exact token telemetry was not available.
```

# Final Project Summary

To be completed at the end of the full project.

Include:

- Total number of sessions/tasks
- Major features implemented
- Major files/modules created or modified
- Tests added
- Final test status
- Unresolved issues
- Token/cost summary if available
- Lessons learned
- Recommended next steps
