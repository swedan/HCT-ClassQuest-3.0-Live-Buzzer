# HCT ClassQuest 3.1 — Professional Arcade Edition

This release is based on ClassQuest 3.0.2 and retains its existing gameplay, Excel/CSV upload, AI question-bank prompt builder, question viewing/deletion, Classic Mode, Live Buzzer Mode, student removal, and top-five expandable student results.

## New presentation theme
- Academic navy and teal blended with arcade gold, game-style borders, dark panels, and an original vector fantasy landscape.
- The theme is CSS-only over the original application logic; no new frontend or backend dependencies.
- Teacher interface: `public/arcade.css`, `public/arcade-landscape.svg`.
- Student interface: `public/student-arcade.css`.
- Accessibility: respects reduced-motion preferences; layouts remain responsive.

## Run
Requires Node.js 20 or later. Run `npm start`, then open http://localhost:3000. For phones, deploy to an HTTPS host (Render or Railway) or use a reachable LAN address.

## Deployment
Use the included `render.yaml` for Render, or connect the repository to Railway using `npm start`. Sessions are stored in server memory; server restarts end active sessions. Do not deploy mid-class. Teacher access controls and institutional data/privacy review are required before large-scale rollout.

## Note
This is a visual edition of the 3.0.2 codebase. It does not implement a new XP system or change grading rules. The pixel landscape is an original SVG illustration, not an asset copied from the reference image.
