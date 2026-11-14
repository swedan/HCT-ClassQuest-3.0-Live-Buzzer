# HCT ClassQuest 3.1.4 — Question Focus Mode

- Hides the decorative arcade landscape **only** while the question screen is open (Classic and Live Buzzer).
- Makes the question presentation use more of the viewport, with compact spacing, responsive text and choices.
- Preserves scrolling for unusually long questions, scenarios and images to avoid clipping content.
- The landscape remains visible on other screens; no question logic, timer, scoring or server code changed.
- Implemented as a dedicated CSS file, `public/question-focus.css`, loaded last in `public/index.html`.
- After deploying, hard-refresh the teacher browser to clear cached CSS.
