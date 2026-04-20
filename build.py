#!/usr/bin/env python3
"""Pre-render Jinja2 templates to static HTML for Cloudflare Pages deployment."""

import jinja2
from markupsafe import Markup
import os

TEMPLATE_DIR = "templates"
OUTPUT_DIR = "dist"

# Create output directory
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Set up Jinja2 environment
env = jinja2.Environment(
    loader=jinja2.FileSystemLoader(TEMPLATE_DIR),
    autoescape=True,
)

# Page configurations with accent colors
pages = {
    "index.html": {
        "accent": Markup("#5eead4"),
        "accent_rgb": Markup("94,234,212"),
        "accent_secondary": Markup("#a78bfa"),
        "accent_glow": Markup("rgba(94,234,212,.3)"),
        "accent_card": Markup("rgba(94,234,212,.06)"),
    },
    "rjai.html": {
        "accent": Markup("#f97316"),
        "accent_rgb": Markup("249,115,22"),
        "accent_secondary": Markup("#fb923c"),
        "accent_glow": Markup("rgba(249,115,22,.3)"),
        "accent_card": Markup("rgba(249,115,22,.06)"),
    },
}

# Render each page
for template_name, context in pages.items():
    print(f"Rendering {template_name}...")
    template = env.get_template(template_name)
    html = template.render(**context)

    output_path = os.path.join(OUTPUT_DIR, template_name)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"  → {output_path}")

# Copy static assets (images, etc.)
print("\nCopying static assets...")
for item in os.listdir("."):
    if item.endswith((".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp")):
        import shutil
        dest = os.path.join(OUTPUT_DIR, item)
        shutil.copy2(item, dest)
        print(f"  → {item}")

print(f"\n✅ Done! Static files ready in '{OUTPUT_DIR}/' directory")
print(f"\nNext steps:")
print(f"1. Run: git init")
print(f"2. Run: git add .")
print(f"3. Run: git commit -m 'Initial commit'")
print(f"4. Push to GitHub/GitLab")
print(f"5. Connect repo to Cloudflare Pages")
