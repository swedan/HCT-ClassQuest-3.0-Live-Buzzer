# HCT ClassQuest 3.0 — Live Buzzer Edition

A working teacher + student web application with **Classic Mode** preserved from ClassQuest 2.1 and a new **Live Buzzer Mode**.

## Quick start

1. Install **Node.js 20+** on the computer that will host the game.
2. In this directory, run `npm start` (or `node server.js`). **No `npm install` is required**.
3. Open `http://localhost:3000` on the teacher computer.
4. Upload the existing Excel/CSV question bank and select **⚡ Start Live Buzzer Game** (or **Start Classic Game** for the original experience).
5. Students scan the QR code or open `http://HOST:3000/student.html` and enter the displayed six-digit PIN.
6. Students choose a display name and avatar; the teacher sees the live lobby.
7. Teacher clicks **Continue to Game Setup**, selects course/category/topic/keyword, and opens a question. The buzzer window opens automatically for **15 seconds**.
8. The first accepted buzz locks the round. Teacher asks that student to answer verbally. **Correct** awards points and displays the leaderboard; **Incorrect** excludes that student and reopens buzzers for another 15 seconds. **Skip** closes the round.
9. The teacher can reveal the answer using the existing ClassQuest answer reveal. Students see only the keyword, points, buzzer, and leaderboard—not the answer key.

## Important network note

**`localhost` works only on the host computer.** To connect students on the same Wi-Fi, use the teacher computer's **LAN IP address** in the browser, for example `http://192.168.1.10:3000`. The generated QR code uses the **address from the teacher browser**, so open the teacher app using that LAN address before creating the live session. Make sure port 3000 is reachable from student devices. Some campus Wi-Fi networks block device-to-device connections; if so, deploy to an HTTPS-enabled host with an accessible domain. Do not use public HTTP for real student sessions.

## Architecture

- **Teacher:** `public/index.html`, existing `app.js` + `ai-generator.js`, and additive `live.js`.
- **Student:** `public/student.html`, `student.js`, `student.css` (mobile-friendly).
- **Server:** `server.js` — Node.js built-in HTTP server, JSON API, and **Server-Sent Events (SSE)** for live updates; no external npm dependencies.
- **QR code:** bundled MIT-licensed Kazuhiko Arase QRCode implementation in `lib/QRCode`.
- **Buzzer:** atomic, single-process first-arrival lock. The server authoritatively validates the current 15-second window and excludes students who already answered incorrectly.
- **Session:** teacher secret token, student reconnect tokens, unpredictable session ID and six-digit PIN. Session data is held in memory for up to four hours since last API activity.

## Tests

Run `npm test` for an end-to-end API test covering creation, joins, duplicate names, first-buzz locking, incorrect/reopen, correct scoring, leaderboard, ending, QR generation, and static page delivery.

## Limits and deployment considerations

- This is a **single-process pilot implementation**. Active sessions and scores are lost if the server restarts. Multiple server instances would need a shared atomic datastore (e.g. Redis).
- The teacher's token is held in browser memory; refreshing the teacher page will lose teacher control of the current session. Finish or end the session before refreshing.
- The student's reconnect token is stored in **sessionStorage** for same-tab refreshes.
- No user accounts or student IDs are required; display names and avatars are temporary.
- Students must have network access to the same server. The app does not use peer-to-peer connections.
- Buzz winner is decided by **server arrival order**, not exact physical tap time. Wi-Fi latency can affect results.
- Excel files are parsed in the teacher's browser using the SheetJS CDN (internet required for `.xlsx` unless you supply the library locally). CSV requires no external library.
- The existing 2.1 Classic Mode uses its original teacher timer. Live Mode uses the **server's 15-second buzzer window** and the teacher controls answer reveal; it intentionally disables the Classic question timer during Live Mode.
- For production use, deploy behind HTTPS with an authenticated teacher login, persistent state, monitoring, reverse-proxy configuration supporting SSE, stronger abuse controls, and institution-approved privacy/security review.

## Version 3.0.1 teacher improvements
- After loading Excel/CSV, select **Manage / Delete Questions** to search and remove unwanted questions. This edits the in-browser question bank only; the original spreadsheet remains unchanged.
- Live student results display the top five first; expand **Show remaining students** for the full ranking. The leaderboard is shown after each question, with results also available directly below the question when visible.
- The teacher can select **Remove** next to a joined student in the lobby. The removal is confirmed and immediately revokes the student's ability to buzz; their score is removed.


## ClassQuest 3.0.2 question manager
The **Manage Questions · View / Delete** control now appears separately below the uploaded question-bank panel. Each question displays its type, difficulty and points, with separate **View** (full question details and answer) and **Delete** (confirmation) actions. Changes affect only the browser-loaded question bank, not the source Excel/CSV file.
