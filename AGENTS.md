# VR//ARCHIVE Agent Guide

## Project purpose

This repository contains **VR//ARCHIVE**, a personal VRChat photo journal built with React, TypeScript, and Vite and deployed through AWS Amplify Hosting.

- Live site: https://main.d2rjbz93athrus.amplifyapp.com/
- Git branch used for deployment: `main`
- The spelling **Memmories** is intentional and refers to the owner's VRChat name, `Memm_`. Do not "correct" it to Memories.
- Preserve the current dark editorial archive identity, cyan and magenta accents, and `VR◇ARCHIVE`-style brand language unless the user asks for a redesign.

## Start every task this way

1. Read this file and `README.md`.
2. Run `git status --short --branch` before editing.
3. Inspect the relevant implementation instead of assuming an older design is still present.
4. Preserve unrelated user changes in a dirty working tree.
5. State the result clearly and keep progress updates concise.

## Important files

- `src/App.tsx`: photo metadata, S3 URL construction, filters, reel grouping, hero rotation, and lightbox behavior.
- `src/App.css`: gallery layout, brand styling, hero, event reels, lightbox, and responsive rules.
- `src/index.css`: global styles and shared design tokens.
- `index.html`: document metadata and title.
- `public/favicon.png` and `public/apple-touch-icon.png`: generated Signal Frame brand icons.
- `scripts/generate_brand_icons.py`: regenerates the brand icons with Pillow.
- `amplify.yml`: AWS Amplify build configuration.
- `README.md`: public project and deployment documentation.

## Local commands

The project requires Node.js 20.20+ and npm 10.8+.

```powershell
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

- `npm run dev` starts the Vite development server.
- `npm run build` runs TypeScript and creates the production build in `dist/`.
- `npm run preview` serves the production build locally after a successful build.
- `npm run lint` runs ESLint with zero warnings allowed.

For code or layout changes, run the checks appropriate to the change. At minimum, run `npm run build`; also run `npm run lint` when TypeScript or JSX changes. Do not repeatedly run tests or builds after they have passed unless a later edit could affect the result. If the user explicitly asks to stop running tests, honor that request.

## Photograph workflow

Photographs are stored in Amazon S3, not in this Git repository.

- Default production base URL: `https://vrc-photography.s3.amazonaws.com/images`
- Optional override: `VITE_PHOTO_BASE_URL` in `.env.local`, without a trailing slash.
- Add gallery entries to `src/App.tsx` using normalized filenames such as `vrchat-YYYY-MM-DD-HH-MM-SS.webp`.
- The source values may use `/photos/<filename>`, but the application replaces that prefix with `PHOTO_BASE_URL` at runtime.
- Do not add VRChat photo binaries under `public/` or anywhere else in the repository.
- The user normally optimizes photographs separately and uploads them to S3 manually. Never upload, replace, or delete S3 objects unless the user explicitly requests it.
- When asked to optimize source captures, put the WebP outputs outside the Git repository, normally under `C:\Users\hdimi\Pictures\VRChat\ec2-upload\vrchat_web_optimized\images`.
- When network access is available, verify newly referenced S3 URLs return successfully before declaring the gallery update complete.

## Gallery and reel conventions

- The visible filters are `All memories`, `Worlds`, and `Archive`.
- Ordinary photographs are grouped into reels of up to five frames.
- Related event photographs use the same `eventId` and may form a larger event reel.
- Use `eventTitle` for an optional event heading and `highlight: true` for the lead photograph.
- Keep intentionally ordered story frames next to each other in the source array. Do not casually reorder event sequences.
- Keep the `FRAME_###` terminology consistent across the hero, reels, and lightbox. Do not reintroduce the older `SIGNAL` or `TRANSMISSION` labels.
- Do not add heart, like, favorite, or reaction controls; they were deliberately removed.
- Update the footer's `Last updated` date when the public gallery content materially changes.

## Visual and responsive expectations

- Treat desktop and phone layouts as equally important.
- Check layout changes at approximately 1440 px, 390 px, and 320 px widths.
- Event reels must not cause horizontal page overflow on phones.
- On mobile, preserve readable image proportions and tap targets without allowing controls to overlap captions or metadata.
- Hero frame metadata belongs in safe areas: `FRAME_###` near the top-left and capture/date information near the bottom-left, without obscuring the main subject or clipping at the viewport edge.
- Preserve keyboard navigation and accessible labels in the lightbox.
- Prefer CSS and existing brand geometry for interface graphics. Regenerate raster icons only when the logo geometry changes.

## Git and deployment rules

- Do not commit, push, tag, upload, deploy, or otherwise publish changes unless the user explicitly asks.
- When the user asks to commit and push, review the diff, create one concise commit for the requested work, and push `main` to `origin`.
- Create or push a Git tag only when explicitly requested. Use an annotated tag with a descriptive checkpoint name.
- A push to `main` triggers the connected AWS Amplify deployment, so treat pushing as a production release action.
- Never use destructive Git commands such as `git reset --hard` to discard user work.

## Definition of done

- The requested behavior or design is implemented without unrelated changes.
- Relevant build and lint checks pass, unless the user explicitly asked not to run them.
- New photo references follow the S3-only workflow and no photo binaries are staged in Git.
- Responsive changes have been checked for narrow phone layouts.
- Report changed files, verification performed, and whether the work remains uncommitted or was pushed.
