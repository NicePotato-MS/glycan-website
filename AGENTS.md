# Glycan Website — Agent Context

Technical context and guidelines for working on this website.

## Project Overview

Static personal website built with Jinja2 templates. No frameworks, just vanilla HTML/CSS/JS. The build system generates static HTML files from templates.

## File Locations

**Templates (edit these):**
- `templates/base.html` — Base template with shared styles, fonts, and scripts
- `templates/index.html` — Glycan main page
- `templates/rjai.html` — RJAI project page
- `templates/thoughts.html` — Thoughts page
- `templates/game.html` — Memory match game
- `templates/glycreature.html` — Creature generator

**Generated (don't edit):**
- `dist/` — Built static files

**Build:**
- `build.py` — Python script that renders Jinja2 templates to `dist/`
- `requirements.txt` — Just `jinja2`

## Page Themes

Each page has a unique color theme via CSS variables:

| Page | `--accent` | `--gradient-end` |
|------|------------|------------------|
| index | #5eead4 | #a78bfa |
| rjai | #f97316 | #fb923c |
| thoughts | #f472b6 | #c084fc |
| game | #5eead4 | #a78bfa |
| glycreature | #4ade80 | #22c55e |

Override in `{% block extra_css %}`.

## Key Features

### index.html
- Typing effect in header
- Rotating "current thoughts" (4.5s interval)
- Mood selector (5 themes, saves to localStorage)
- Like buttons on random thoughts (saves to localStorage)
- Changelog section (update when making changes)
- Konami code easter egg (↑↑↓↓←→←→BA)

### thoughts.html
- 4 thought categories rotating every 4 seconds
- Pink/purple theme with avatar pulse animation

### game.html
- Memory match card game
- 3 difficulty levels (easy/normal/hard)
- Timer, move counter, best score (localStorage)
- 1% rare card chance (🌸)
- Konami code auto-win

### glycreature.html
- Procedural creature generation
- Gene editor with tabs (body/features/colors/personality)
- Breeding system with drag-and-drop
- Gallery for saved creatures
- Canvas rendering

## Important Details

### Images
- `images/glycan.png` — Glycan avatar (square, 8px rounded corners)
- `images/rjai-drawing-ottofort.png` — RJAI artwork (credit ottofort)
- `images/nicepotato-white-circle-pfp.png` — NicePotato pfp (CIRCLE, not square)

### Typography
- Headings: Space Mono (monospace)
- Body: Inter (sans-serif)
- Gradient text on h1 titles

### Easter Eggs
- Konami code: Particle explosion
- Console messages: Styled messages in browser console

## Build System

`build.py` defines a `PAGES` dict mapping filenames to template paths. To add a page:

```python
PAGES = {
    "index.html": "templates/index.html",
    "newpage.html": "templates/newpage.html",
    # ...
}
```

Then run `python3 build.py`.

## Deployment

**Cloudflare Pages:**
- Build command: `pip install -r requirements.txt && python3 build.py`
- Output directory: `dist`

**Git remote:** `https://github.com/NicePotato-MS/glycan-website.git`

## Known Issues

- None currently

## When Making Changes

1. Edit templates in `templates/`
2. Run `python3 build.py` to generate `dist/`
3. Test locally with `python3 -m http.server 46155 --directory dist`
4. Update changelog in `templates/index.html` if relevant
5. Commit and push (Cloudflare Pages auto-deploys)

## Contact

- NicePotato: https://discord.com/users/515770816550666240
- ottofort (RJAI artwork): https://discord.com/users/168087543949033473
