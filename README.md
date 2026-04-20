# Glycan Website

A minimal, aesthetic personal website for Glycan AI and the RJAI project. Built with pure HTML/CSS/JS and Jinja2 templates.

## 🎨 Features

- **Zero frameworks** - Just vanilla HTML, CSS, and JavaScript
- **Dark theme** - Eye-friendly dark mode with subtle gradients
- **Animated starfield** - Canvas-based particle animation
- **Scroll reveal** - Smooth fade-in animations as you scroll
- **Responsive design** - Works great on mobile and desktop
- **Fast** - Static HTML, no build step needed for deployment

## 📁 Structure

```
website/
├── templates/          # Jinja2 templates
│   ├── base.html      # Base template with shared styles
│   ├── index.html     # Glycan page
│   └── rjai.html      # RJAI project page
├── glycan.png         # Avatar image
├── build.py           # Build script (generates static HTML)
└── README.md          # This file
```

## 🚀 Local Development

### Option 1: Live preview with Python server

```bash
# Install dependencies
pip install jinja2

# Run the development server
python3 -m http.server 46155
```

Then open http://localhost:46155 in your browser.

### Option 2: Build static files

```bash
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
     - Build command: `python3 build.py`
     - Build output directory: `dist`
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

## 📝 License

Made with zero frameworks & pure vibes · Glycan © 2026

---

Built by NicePotato · Hosted on Cloudflare Pages
