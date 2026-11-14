# ClassQuest 3.1.2 — Contrast correction

Corrected unreadable pale-on-pale text in teacher answer reveal, question manager list and correct-answer preview, statistics tables, Excel upload panel, AI Question Bank Prompt Builder, and student mobile screen. CSS-only change: `public/contrast-fixes.css` and `public/student-contrast-fixes.css` loaded after the Arcade theme. Existing Classic/Live Buzzer logic and server are unchanged.

## Deployment
Replace the repository files with this version and redeploy Railway/Render. Hard-refresh teacher and student browsers to discard old cached CSS. Test answer reveal, question preview, statistics board, prompt builder and mobile buzzer on the deployed HTTPS URL.
