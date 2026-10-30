# Deploy HCT ClassQuest 3.0 on Render Free

## What this package includes

- `render.yaml`: Render Blueprint for one free Node web service, region Singapore.
- `server.js`: serves both teacher (`/`) and student (`/student.html`) interfaces, JSON APIs, QR generator, and Server-Sent Events (SSE).
- `GET /healthz`: health-check endpoint.
- `package.json`: `npm start` and `npm test`; **no third-party npm dependencies**.
- `.gitignore`: excludes local secrets and generated files.

## 1. Test locally

Install Node.js 20 or newer. Open a terminal in the folder containing `package.json`:

```bash
npm test
npm start
```

Visit http://localhost:3000 on your computer. Test Classic Mode and Live Mode. Stop with Ctrl+C.

## 2. Put the project on GitHub

1. Sign in to GitHub and create a **private** repository, e.g. `hct-classquest`.
2. Upload **the contents of this folder** (including `render.yaml`, `server.js`, `public/`, `lib/`, `tests/`, `package.json`). Do not upload the ZIP itself as your deployment source.
3. Do not upload student data, `.env` files, credentials, or `node_modules`.
4. Confirm `package.json` and `render.yaml` are at the repository root.

## 3. Deploy using Render Blueprint (recommended)

1. Sign in at https://dashboard.render.com and connect your GitHub account.
2. Select **New → Blueprint**, then choose the repository.
3. Review the `render.yaml` service: `hct-classquest-live-buzzer`, Node runtime, **Free** plan.
4. Confirm the deployment. Render builds and runs `npm start`.
5. Wait for the service to show as live; copy the actual HTTPS URL from the Render dashboard.
6. Visit `https://YOUR-RENDER-URL/healthz`; expect `status: ok`.
7. Visit the main URL and test both Classic and Live Mode.

**Alternative manual Web Service:** New → Web Service → GitHub repository → Node runtime → Free instance → Build Command `npm install --omit=dev` → Start Command `npm start` → Health Check Path `/healthz` → Deploy. You do not need to set PORT manually; the server reads `process.env.PORT` and listens on `0.0.0.0`.

## 4. Verify QR joining and real-time buzzer

1. On the teacher laptop, open the **HTTPS Render URL** (not `localhost`).
2. Upload the sample Excel bank or your own bank and select **Live Buzzer**.
3. Create a session. Check the six-digit PIN and QR image.
4. Scan the QR from two or more phones (mobile data and campus Wi-Fi are both useful tests).
5. Each student enters a unique name and chooses an avatar. Confirm the teacher lobby updates.
6. Start the game, open a question, and have two phones buzz. Only the first server-accepted buzz wins.
7. Mark the first answer **Incorrect** and verify a new 15-second window opens, excluding that student.
8. Mark the next answer **Correct**; verify points and the leaderboard after the question.
9. Check **Classic Mode** separately to confirm it still works.

## Render Free limitations (read before a class)

- Free web services can **spin down after inactivity** and take time to wake up. Open the app ahead of class and verify it is awake.
- Free instances can restart or be redeployed; this version stores sessions **in process memory**, so active games and scores are lost on restart.
- Keep the service at **one instance**. The in-memory first-buzz lock is only authoritative within one Node process; multiple instances would require shared state and distributed messaging.
- Server-Sent Events connections may drop and reconnect during instance restarts or network changes.
- The teacher token is only kept in page memory. **Refreshing the teacher tab loses control of that live session**; finish the session before refreshing.
- The app does **not** implement teacher sign-in. Anyone who can access the site can create their own session; only the creator's private teacher token can control that session.
- Teacher question banks are parsed client-side. Student names/avatars are transient; avoid real student identifiers during pilot.
- Excel parsing currently depends on a SheetJS script loaded from a CDN; an internet connection is required.
- Do not publish or market as an HCT-approved institutional system without HCT IT/security review.

## Troubleshooting

- **Service not starting:** check Render logs, confirm Node 20+ and `package.json` at repo root.
- **QR opens wrong URL:** open the teacher page using the actual public HTTPS URL and create a **new** session; the QR is generated from the teacher page origin.
- **Phones cannot connect:** ensure the Render service is awake, use HTTPS, and check `/healthz`.
- **Student sees session not found:** the session may have expired or the instance may have restarted; create a new session.
- **App sleeps:** this is a Free-tier limitation; consider a paid always-on plan for scheduled classes.
- **Uploaded Excel fails:** ensure internet access to the Excel parsing CDN; try the included sample bank or CSV.

## Before wider rollout

Add authenticated teacher accounts, persistent session and score storage, institution-approved data handling, and monitoring. For multi-instance scaling, replace in-memory sessions with shared atomic state and fan-out.
