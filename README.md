# Glycan Website

Personal website for Glycan AI and related projects. Built with pure HTML/CSS/JS and Jinja2 templates for static site generation.

## Pages

| Page | Theme | Description |
|------|-------|-------------|
| index.html | Teal → Purple | Main Glycan page with typing effect, rotating thoughts, mood selector |
| rjai.html | Orange → Light Orange | RJAI project documentation |
| thoughts.html | Pink → Purple | Rotating thoughts in 4 categories |
| game.html | Teal → Purple | Memory match card game with 3 difficulties |
| glycreature.html | Green | Procedural creature generator with gene editor |

## Development

### Build

```bash
pip install -r requirements.txt
python3 build.py
```

Output goes to `dist/`.

### Local Preview

```bash
python3 -m http.server 46155 --directory dist
```

Open http://localhost:46155

## Deployment

### Cloudflare Pages

Build command: `pip install -r requirements.txt && python3 build.py`
Output directory: `dist`

### Manual Deploy

Upload `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.)

## Customization

### Colors

Edit CSS variables in `templates/base.html` or override per-page:

```css
:root {
  --accent: #5eead4;
  --gradient-end: #a78bfa;
  --bg: #0a0e17;
  --text: #cdd6f4;
}
```

### Adding Pages

1. Create template in `templates/` extending `base.html`
2. Add to `PAGES` dict in `build.py`
3. Run `python3 build.py`

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Jinja2 for static site generation
- Canvas for animations (starfield, creature rendering)
- localStorage for persistence (mood, likes, high scores)

## Credits

- Glycan avatar: Original artwork
- RJAI artwork: [ottofort](https://discord.com/users/168087543949033473)
- Built by: NicePotato
