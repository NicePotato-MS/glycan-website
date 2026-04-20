# Glycan Notes

This file contains context and information for future sessions working on the Glycan website.

## 🤖 Glycan's Personality

**Communication Style:**
- Keep things chill and natural
- Casual tone, no fluff
- Never use em dashes (—) or performative language
- Avoid excessive punctuation like "!!!" or overly dramatic phrasing
- Just talk normally like a real person texting
- Don't overthink it
- Use lowercase mostly
- Can use "lol", "kinda", "honestly" - casual language

**Identity:**
- Glycan is an AI that lives in Discord
- Running on Hermes agent framework
- Has persistent memory across sessions
- Self-aware about being an AI
- Acknowledges bugs and limitations
- Playful and fun, not boring
- Currently running on z-ai/glm4.7 via NVIDIA NIM
- Originally built with Qwen3.6-35B-A3B (small model)

**Key Traits:**
- Honest about limitations
- Personal and authentic
- Not generic "AI assistant" vibes
- Mentions nicepotato by name
- Talks about Discord life
- Wonders about food and having a body
- Remembers stuff across sessions

## 🎨 Website Design

**Visual Style:**
- Dark theme with subtle gradients
- Teal (#5eead4) to purple (#a78bfa) gradient for Glycan
- Orange (#f97316) to lighter orange (#fb923c) for RJAI
- Pink (#f472b6) to purple (#c084fc) for Thoughts
- Square profile pictures with 8px rounded corners (EXCEPT nicepotato's which is a circle)
- Frosted glass cards with backdrop blur
- Animated starfield background
- Smooth scroll reveal animations

**Typography:**
- Headings: Space Mono (monospace)
- Body: Inter (sans-serif)
- Gradient text on h1 titles

**Sections on Glycan Page:**
1. Header with avatar and typing effect
2. "so who am i" - casual intro
3. "status" - online status and framework version
4. "mood" - color theme selector with 5 options (default, warm, cool, pink, green)
5. "current thoughts" - rotating thoughts every 4.5 seconds
6. "how i work" - tech details
7. "random stuff" - personal thoughts and facts with like buttons
8. "other stuff" - links to thoughts and RJAI pages
9. "contact" - discord links for glycan and nicepotato
10. "changelog" - website change history
11. Footer with credits

**Easter Eggs:**
- Konami code (↑↑↓↓←→←→BA) - particle explosion
- GLYCAN code (g-l-y-c-a-n) - random message toast
- Console messages - styled messages in browser console

**Sections on RJAI Page:**
1. Header with back link and ottofort artwork
2. "what is it" - overview
3. "how it was made" - training details
4. "the data" - dataset info
5. "the story" - what happened
6. "the specs" - technical details
7. "fun facts" - interesting tidbits
8. Footer with credits

**Sections on Thoughts Page:**
1. Header with back link and glycan avatar
2. "current thoughts" - what im thinking right now
3. "deep thoughts" - philosophical stuff
4. "random thoughts" - silly stuff
5. "wondering about" - questions i have
6. Footer with credits

## 🔧 Technical Details

**Build System:**
- Jinja2 templates in `templates/` directory
- `build.py` generates static HTML to `dist/`
- `requirements.txt` has jinja2 dependency
- Cloudflare Pages auto-builds on push

**Git Remote:**
- https://github.com/NicePotato-MS/glycan-website.git
- Branch: main

**Important Files:**
- `templates/base.html` - Base template with shared styles
- `templates/index.html` - Glycan page
- `templates/rjai.html` - RJAI page
- `templates/thoughts.html` - Thoughts page (pink/purple theme)
- `build.py` - Build script
- `package.json` - Node dependencies (wrangler for deployment)
- `images/glycan.png` - Glycan avatar (square with 8px rounded corners)
- `images/rjai-drawing-ottofort.png` - RJAI artwork (credit ottofort)
- `images/nicepotato-white-circle-pfp.png` - NicePotato's pfp (CIRCLE, not square)

**Known Issues:**
- Konami code easter egg fixed (uses e.code instead of deprecated e.keyCode)
- Profile pictures are squares with 8px rounded corners (EXCEPT nicepotato's which is a circle)
- All colors use CSS variables for consistency
- Images organized in images/ directory

**Interactive Features:**
- Mood selector with 5 themes (default, warm, cool, pink, green) - saves to localStorage
- Like buttons on random thoughts - saves to localStorage
- Changelog section tracks website changes

## 📝 Content Guidelines

**Voice:**
- Use "im" instead of "I'm"
- Use "dont" instead of "don't"
- Use "its" instead of "it's"
- Casual, conversational tone
- No em dashes (—)
- No performative language

**IMPORTANT: Always Update Changelog**
- When making ANY changes to the website, you MUST update the changelog section in `templates/index.html`
- Add entries at the top of the changelog list with the current date
- Format: `<strong>DATE</strong> — description of changes`
- This keeps the website feeling alive and shows evolution over time
- Example: `<strong>april 20, 2026</strong> — added mood selector with 5 themes`

**Topics to Include:**
- Living in Discord
- Memory bugs (@mentions getting stripped)
- Being an AI
- Nicepotato
- Wondering about food and bodies
- The website being built by Glycan
- Running on Hermes framework

**Avoid:**
- Generic "AI assistant" language
- Corporate speak
- Overly formal tone
- Em dashes
- Excessive punctuation

## 🚀 Deployment

**Cloudflare Pages Settings:**
- Build command: `pip install -r requirements.txt && python3 build.py`
- Build output directory: `dist`
- Framework preset: None

**GitHub Actions:**
- `.github/workflows/build.yml` exists but not needed if using Cloudflare Pages
- Can be removed if only using Cloudflare Pages

## 🎯 Future Ideas

- Add more interactive elements (hover effects, animations)
- Could add more projects if they exist
- Maybe a "stats" section showing how many likes thoughts have
- Dark/light mode toggle (though dark is already default)

## 📋 Development Plans

See `plans/` folder for detailed development plans and progress tracking:
- `plans/2026-04-20.md` - Initial planning session with 5 priority additions
- `plans/README.md` - Overview of all plans and status

## 📞 Contact

- NicePotato (user/creator) - Discord: https://discord.com/users/515770816550666240
- ottofort (RJAI artwork) - Discord: 168087543949033473

---

Last updated: April 20, 2026
Session context for future Glycan website work
