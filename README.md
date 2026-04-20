# Glycan Website

A minimal, aesthetic personal website for Glycan AI and the RJAI project. Built with pure HTML/CSS/JS and Jinja2 templates.

## 🎨 Features

- **Zero frameworks** - Just vanilla HTML, CSS, and JavaScript
- **Dark theme** - Eye-friendly dark mode with subtle gradients
- **Animated starfield** - Canvas-based particle animation
- **Scroll reveal** - Smooth fade-in animations as you scroll
- **Responsive design** - Works great on mobile and desktop
- **Fast** - Static HTML, no build step needed for deployment
- **Konami code easter egg** - Try ↑↑↓↓←→←→BA

## 📁 Structure

```
website/
├── templates/          # Jinja2 templates (edit these)
│   ├── base.html      # Base template with shared styles
│   ├── index.html     # Glycan page
│   └── rjai.html      # RJAI project page
├── dist/              # Built static files (auto-generated)
│   ├── index.html
│   ├── rjai.html
│   ├── glycan.png
│   └── rjai-drawing-ottofort.png
├── glycan.png         # Glycan avatar
├── rjai-drawing-ottofort.png  # RJAI artwork by ottofort
├── build.py           # Build script (generates static HTML)
├── build.sh           # Shell script wrapper
├── requirements.txt   # Python dependencies
└── README.md          # This file
```

## 🚀 Local Development

### Option 1: Live preview with Python server

```bash
# Install dependencies
pip install -r requirements.txt

# Run the development server
python3 -m http.server 46155
```

Then open http://localhost:46155 in your browser.

### Option 2: Build static files

```bash
# Install dependencies
pip install -r requirements.txt

# Generate static HTML files
python3 build.py

# The built files will be in dist/
# You can open dist/index.html directly in your browser
```

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. **Build the static files:**
   ```bash
   python3 build.py
   ```

2. **Deploy via Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. **Connect to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Workers & Pages
   - Create a new Pages project
   - Connect to your Git repository
   - Build settings:
     - **Build command:** `pip install -r requirements.txt && python3 build.py`
     - **Build output directory:** `dist`
   - Deploy!

### Other Static Hosts

You can also deploy to:
- **Netlify** - Drag and drop the `dist/` folder
- **Vercel** - Connect your Git repo
- **GitHub Pages** - Push to a `gh-pages` branch
- **Any static host** - Upload the `dist/` folder

## 🎨 Customization

### Changing Colors

Edit the color variables in `templates/base.html`:

```css
:root {
  --accent: #5eead4;        /* Primary accent color */
  --gradient-end: #a78bfa;  /* Secondary gradient color */
  --bg: #0a0e17;            /* Background color */
  --text: #cdd6f4;          /* Text color */
}
```

Or override them in individual templates:

```html
{% block extra_css %}
<style>
  :root {
    --accent: #f97316;
    --gradient-end: #fb923c;
  }
</style>
{% endblock %}
```

### Adding New Pages

1. Create a new template in `templates/` (e.g., `templates/newpage.html`)
2. Extend `base.html`:
   ```html
   {% extends "base.html" %}

   {% block title %}My New Page{% endblock %}

   {% block content %}
   <section data-reveal>
     <h2>Section Title</h2>
     <div class="card">
       <p>Your content here...</p>
     </div>
   </section>
   {% endblock %}
   ```
3. Add the page configuration to `build.py`
4. Run `python3 build.py` to generate the static file

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, flexbox, animations
- **Vanilla JavaScript** - No frameworks, just pure JS
- **Jinja2** - Template engine for static site generation

## 📝 Credits

- **Glycan avatar** - Original artwork
- **RJAI artwork** - by [ottofort](https://discord.com/users/168087543949033473)
- **Built by** - NicePotato
- **Hosted on** - Cloudflare Pages

## 📄 License

Made with zero frameworks & pure vibes · Glycan © 2026

---

Built by NicePotato · Hosted on Cloudflare Pages
