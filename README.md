# safwan.dev

My personal site. I'm Safwan, an MSc Applied AI student in London. This is where my projects, research and notes live.

**Live:** https://safwan-dev.netlify.app

I wanted it to feel like something you play with rather than a CV with a nav bar, so the hero has a pile of 3D balls you can push around, the projects ride sideways along a path as you scroll, and the experience section stacks like a deck of cards. Underneath, it's a static site: every page is plain HTML, so it loads fast and works without JavaScript.

## What's in it

- **Work.** Zenix, NeuroNav, MIRA, my two research systems (AegisUI and APEX) and what I'm building next. Each project has its own page with the problem, how it works, results and links.
- **Research.** My two papers on AI agent security, on arXiv.
- **Experience.** Degree, IEEE SPS, Lovable Shipped, SU Knowledge Hub, Mindalike, and now the MSc.
- **Notebook.** Small interactive explainers. The first one is gradient descent.

## Stack

Next.js 16 (static export), React 19, TypeScript, CSS Modules with design tokens, GSAP and Lenis for motion, three.js for the hero. Hosted on Netlify.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

Node 20.9 or newer.

## Editing content

All the words live in `src/content/`, so I never have to touch layout code to update the site.

| File | What it holds |
| --- | --- |
| `site.ts` | name, links, email, CV path |
| `projects.ts` | every project and its case page |
| `papers.ts` | published papers |
| `experience.ts` | the experience cards |
| `certificates.ts` | awards and certificates |
| `notebook.ts` | notebook entries |

Anything I still need to fill in is written as `TODO(safwan): ...`. Those show up in development and are hidden on the live site.

- **New project:** add an entry to `projects.ts`. If it needs cover art, add a function to `src/components/ProjectCover.tsx`.
- **New certificate:** put the image in `public/certificates/` (and a 192×144 crop in `public/certificates/thumbs/`), then add an entry to `certificates.ts`.
- **Favicon and share image:** edit `public/icon.svg`, serve the build on port 4173, and run `node scripts/make-assets.cjs`.

## Structure

```
src/
  app/          pages: home, /work/[slug], /notebook, sitemap, robots
  components/   hero/, sections/, fx/ (smooth scroll, cursor), shared pieces
  content/      everything you read on the site
  styles/       tokens.css (colours, type, spacing, motion) and globals.css
public/         images, certificates, CV, icons
```

## Contact

safwanuddin.work@gmail.com · [LinkedIn](https://www.linkedin.com/in/safwan-uddin-mohammed-299602257/) · [X](https://x.com/SafwanUddin_dev) · [GitHub](https://github.com/safwannuddin)
