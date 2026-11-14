# ClassQuest 3.2 — Recent Question Banks & Feedback

- Recent Question Banks on home screen: last five uploaded banks; View All with search; Preview, Load and Remove.
- Banks are stored as normalized question data in the teacher browser IndexedDB. Original Excel/CSV files are not modified or uploaded by this feature.
- Saved banks are device/browser-profile specific, may be lost when browser data is cleared, and may fail if storage is blocked or full.
- Deleting a question from the loaded bank updates its saved copy. Removing a recent bank does not remove the currently loaded bank or original file.
- Loading a saved bank clears current game progress; confirmation is shown when progress exists.
- Footer on teacher and student pages: “Made with ♥ by Mousa Sweidan” and email feedback link to msweidan@hct.ac.ae. The link opens the user's email application; it does not send feedback directly or access an inbox.
- No backend or deployment configuration changes.

## Checks

Run `npm test` and `node --check public/recent-banks.js`. Browser verification recommended: upload, reload page, load saved bank, preview, remove, View All, student/teacher footer, and storage-disabled case.
