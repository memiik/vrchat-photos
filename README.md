# VR//ARCHIVE

A personal VRChat photo journal for preserving the people, worlds, and beautifully strange moments that felt real enough to keep.

**[Open the live gallery](https://main.d2rjbz93athrus.amplifyapp.com/)**

## About

VR//ARCHIVE presents VRChat photography as a sequence of curated memory reels. The site combines an editorial gallery layout with a compact digital-archive visual system built around the Signal Frame logo, cyan and magenta accents, and quiet photographic metadata.

The gallery is intentionally read-only. Original captures are optimized separately, uploaded to Amazon S3, and delivered to the site without storing the photo collection in this repository.

## Features

- Rotating hero image with frame and capture metadata
- Responsive memory reels with one lead image and supporting frames
- All Memories, Worlds, and Archive filters
- Text search across photo metadata
- Full-screen image viewer with previous and next navigation
- Keyboard navigation with arrow keys and `Escape`
- Responsive layouts for desktop, tablet, and phone screens
- Custom Signal Frame favicon and Apple touch icon
- Images delivered from an Amazon S3 bucket
- Continuous deployment through AWS Amplify Hosting

## Technology

- React 18
- TypeScript
- Vite 7
- CSS
- AWS Amplify Hosting
- Amazon S3 image delivery

## How it works

```text
Visitor
   │
   ▼
AWS Amplify Hosting ── serves the Vite application
   │
   ▼
Amazon S3 ──────────── serves the optimized WebP photographs
```

The frontend reads the image base URL from `VITE_PHOTO_BASE_URL`. If it is not provided, the application uses the production S3 path configured in `src/App.tsx`.

## Local development

### Requirements

- Node.js 20.20 or newer
- npm 10.8 or newer

### Setup

```bash
git clone https://github.com/memiik/vrchat-photos.git
cd vrchat-photos
npm install
npm run dev
```

Vite will print the local address, normally `http://localhost:5173`.

### Optional image URL override

Create a `.env.local` file when you need to load photographs from a different location:

```env
VITE_PHOTO_BASE_URL=https://example-bucket.s3.amazonaws.com/images
```

Do not include a trailing slash.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

The generated production site is written to `dist/`.

## Managing photographs

The gallery does not keep the original photo collection under `public/`.

To add a photograph:

1. Optimize the capture as WebP.
2. Upload it to the configured S3 image path.
3. Add its filename, title, world, date, and internal category to the photo data in `src/App.tsx`.
4. Run `npm run build` before committing the update.

The application converts each listed filename into a URL using `VITE_PHOTO_BASE_URL`.

## Brand icons

The favicon and Apple touch icon are generated from the same Signal Frame geometry used by the website branding.

To regenerate them, install Pillow and run:

```bash
python scripts/generate_brand_icons.py
```

This updates:

- `public/favicon.png`
- `public/apple-touch-icon.png`

## Deployment

The production site is deployed from the `main` branch with AWS Amplify Hosting:

**[https://main.d2rjbz93athrus.amplifyapp.com/](https://main.d2rjbz93athrus.amplifyapp.com/)**

Amplify uses `amplify.yml` to install dependencies, run `npm run build`, and publish the contents of `dist/`. Pushing a commit to `main` triggers the connected deployment workflow.

## Project structure

```text
src/
  App.tsx             Gallery data, filtering, reels, and image viewer
  App.css             Layout, visual identity, and responsive styles
  index.css           Global styles and design tokens
public/
  favicon.png
  apple-touch-icon.png
scripts/
  generate_brand_icons.py
amplify.yml           Amplify Hosting build configuration
```

## License

This project is available under the [MIT No Attribution License](LICENSE).
