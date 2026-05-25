# Deploying This App on Render

This project is a static Vite React app. The recommended Render deployment path is **Static Site** because the app builds to static files in `dist/` and does not require a backend server.

Official Render docs:

- [Static Sites](https://render.com/docs/static-sites/)
- [Static Site Redirects and Rewrites](https://render.com/docs/redirects-rewrites/)
- [Deploying on Render](https://render.com/docs/deploys/)
- [Docker on Render](https://render.com/docs/docker/)

## Recommended Option: Static Site from GitHub

Use this when you push this project to GitHub and want Render to build and deploy it automatically.

### 1. Push the Project to GitHub

From your local project folder:

```bash
git init
git add .
git commit -m "initial ai automation learning app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

If your repository already exists locally, only commit and push the latest changes.

### 2. Create a Render Static Site

1. Log in to Render.
2. Click **New**.
3. Select **Static Site**.
4. Connect your GitHub account if you have not already.
5. Select this repository.
6. Choose the branch you want to deploy, usually `main`.

### 3. Configure Build Settings

Use these settings:

| Setting | Value |
|---|---|
| Root Directory | Leave blank unless this app is inside a subfolder of your repo |
| Build Command | `npm ci && npm run build` |
| Publish Directory | `dist` |
| Auto-Deploy | Yes, if you want every push to deploy |

No environment variables are required for the current version.

Because this repository includes `package-lock.json`, `npm ci` gives Render a reproducible install. If Render reports that the lockfile is out of sync, run `npm install` locally, commit the updated `package-lock.json`, and redeploy.

If Render ever uses an older Node version for the Static Site build, add this environment variable:

| Key | Value |
|---|---|
| `NODE_VERSION` | `22` |

### 4. Add React Router Rewrite Rule

This app uses React Router. Direct URLs like `/parts/part-1` or `/progress` must resolve to `index.html`.

In Render's Static Site settings, add this rewrite rule:

| Source | Destination | Action |
|---|---|---|
| `/*` | `/index.html` | Rewrite |

This lets the browser load the React app first, then React Router decides which page to show.

### 5. Deploy

Click **Create Static Site**.

Render will:

1. Pull the project from GitHub.
2. Install dependencies.
3. Run the build command.
4. Publish the `dist/` folder.
5. Give you an `onrender.com` URL.

After deployment, test these routes:

```text
/
/paths
/labs
/labs/part-3-premium-lab
/quizzes
/quizzes/part-3-quiz
/skill-checks
/projects
/projects/nigeria-macroeconomic-intelligence-pipeline
/progress
/notes
/parts/part-1
/parts/part-1/lessons/part-1-ai-automation-engineer-role
```

## Alternative Option: Docker Web Service

Use this only if you specifically want to deploy the Dockerized version.

### Render Settings

1. Click **New**.
2. Select **Web Service**.
3. Connect your GitHub repository.
4. Set **Language** to `Docker`.
5. Set **Dockerfile Path** to `Dockerfile` if Render asks for it.
6. Leave **Docker Command** blank so Render uses the `CMD` from the Dockerfile.
7. Set **Health Check Path** to `/` if you want Render to check the app homepage.

The Dockerfile in this project:

- Builds the Vite app with Node.
- Serves the production files with Nginx.
- Uses Render's `PORT` environment variable through `nginx.conf.template`.
- Falls back to `index.html` for React Router paths.

### Docker Notes

For a Docker Web Service, Render runs the `CMD` from the Dockerfile by default.

You should not need a custom Docker command for this project.

## Which Render Option Should You Use?

Use **Static Site** for this app unless you have a specific reason to use Docker.

Static Site is better here because:

- The app is frontend-only.
- There is no backend process.
- The output is static `dist/` files.
- Render serves static sites through its CDN.
- It is simpler to configure and maintain.

Use **Docker Web Service** if:

- You want to test the Dockerfile as your production artifact.
- You plan to add backend behavior to the same container later.
- You need custom server-level behavior beyond static hosting.

## Troubleshooting

### Blank Page After Deploy

Check:

- Build command is `npm ci && npm run build`.
- Publish directory is `dist`.
- The build logs show a successful Vite build.

### Direct Lesson URLs Return 404

Add the React Router rewrite:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

### Progress Does Not Transfer Between Devices

This version stores progress in browser `localStorage`.

That means:

- Progress persists on the same browser/device.
- Progress does not sync across devices.
- Clearing browser storage resets progress.

Account sync would require a backend, which is intentionally not part of this first version.

### Build Fails on Render

Check:

- `package-lock.json` is committed.
- Render is using a modern Node version.
- The build command is exactly `npm ci && npm run build`.
- The failing log line is from TypeScript, Vite, or dependency installation.

Run locally before pushing:

```bash
npm ci
npm run lint
npm run build
```
