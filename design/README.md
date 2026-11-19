# Design

Brand, UI and marketing files for FitVerse. Nothing in this folder is loaded by the apps. Images the apps use at runtime live with each app: `mobile/assets/` for the mobile app and `frontend/public/` for the web app.

```
design/
├── brand/                         # The identity: logo and app icon sources, colors, fonts
├── ui/                            # Screen designs and mockups, grouped by app
│   ├── mobile/
│   └── web/
└── marketing/                     # Grouped by channel, then by campaign
    ├── social/
    │   └── <yyyy-mm>-<campaign>/  # the images + the prompts.md that generated them
    ├── web/                       # Link-preview (og) images and landing-page art
    └── app-store/                 # App Store and Google Play screenshots and promo art
```

## What goes where

- **`brand/`**: the source files every other image is made from. Keep it small, and replace a file only when the brand itself changes. Keep versions side by side (`app-icon-v2.png`) instead of overwriting.
- **`ui/`**: designs of the app's screens. Once the screens are designed in Figma, Figma becomes the source of truth. Then this folder only holds exports that something needs, such as the README or a pull request, and the [Figma files](#figma) are linked below.
- **`marketing/`**: one folder per campaign, named `<yyyy-mm>-<campaign>` after the month it was made, so campaigns sort by date. Name posts in a scheduled calendar `dayNN-topic.png` so they sort in posting order.

The repository is public, so anything committed here is visible to everyone as soon as it's pushed. Keep unannounced drafts outside the repo until they're ready to be public.

## Prompts

Always commit the prompts that generated AI images, in a `prompts.md` in the same campaign folder. They're tiny, and they're the real source: any image can be regenerated, fixed or turned into a new variant from its prompt. The prompts for the July 2026 images weren't saved.

## When this gets big

Git keeps every version of every image forever, and each clone downloads all of them. For comparison, Applyze's 30-day social campaign is about 38 MB. Once posting campaigns becomes a regular habit, keep the images in Google Drive (`FitVerse/Marketing/<campaign>/`) and commit only the prompts and a link to the Drive folder.

## Naming

- Lowercase words separated by dashes (kebab-case), for both folders and files: `promo-square.png`, not `Fitverse_Instagram_Square.png`. macOS ignores letter case but Linux (CI, Docker) doesn't, so `Design/` and `design/` would be two different folders there.
- No `fitverse-` prefix. Everything in this repo is FitVerse.
- Describe what the image is, then its variant: `landing-screen-mockup.png`, `promo-landscape.png`, `app-icon-v2-glow.png`.

## Current files

| Path | What it is |
| --- | --- |
| `brand/app-icon-v2.png` | The FV icon, cut out on a transparent background |
| `brand/app-icon-v2-glow.png` | The same icon with a glow, 1024×1024 |
| `ui/mobile/landing-screen.png` | Design of the mobile landing screen |
| `ui/mobile/landing-screen-mockup.png` | The landing screen in an iPhone frame (concept art; its text has typos) |
| `marketing/social/2026-07-launch/promo-landscape.png` | Launch promo, 3:2 |
| `marketing/social/2026-07-launch/promo-square.png` | Launch promo, 1:1 |

The app icon the mobile app ships is `mobile/assets/fit-verse-logo.png` (set in `mobile/app.json`). A store-ready icon must be a full-bleed 1024×1024 square with no transparency or rounded corners, because iOS applies its own mask. There's no vector (SVG) version of the logo yet; the Figma pass should produce one.

## Figma

Not set up yet. The plan is to design every web and mobile screen in Figma, then link the files here.
