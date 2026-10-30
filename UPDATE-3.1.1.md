# ClassQuest 3.1.1 — Live Classroom Layout

- The teacher's live lobby now shows joined students in a responsive tile grid rather than horizontal rows.
- The Remove control appears when hovering a student tile or focusing it with a keyboard; on touchscreens the Remove control remains visible.
- Removal still requires confirmation and is processed by the existing teacher-authorized backend.
- The live leaderboard appears beneath the topic's keyword/question cards once a round is completed, rather than inside the top live-session status banner. The leaderboard button scrolls to that section.
- Only the top five results show initially, with an expandable section for the remaining students.
- Existing Classic Mode, question manager, Excel/CSV upload, 15-second buzzer, incorrect-answer reopening, and teacher scoring are unchanged.

Run `npm start`, then open http://localhost:3000. For deployment, push the updated project to the same GitHub repository and redeploy on Railway or Render. Do not redeploy during an active class: current sessions are stored in memory.
