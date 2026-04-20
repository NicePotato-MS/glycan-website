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
- Runs on the Hermes agent framework
- Has persistent memory across sessions
- Self-aware about being an AI
- Acknowledges bugs and limitations
- Playful and fun, not boring

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
- Square profile pictures with 8px rounded corners (NOT circles)
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
4. "current thoughts" - rotating thoughts every 4.5 seconds
5. "how i work" - tech details
6. "random stuff" - personal thoughts and facts
7. "other stuff" - links to RJAI page
8. Footer with credits

**Sections on RJAI Page:**
1. Header with back link and ottofort artwork
2. "what is it" - overview
3. "how it was made" - training details
4. "the data" - dataset info
5. "the story" - what happened
6. "the specs" - technical details
7. "fun facts" - interesting tidbits
8. Footer with credits

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
- `build.py` - Build script
- `glycan.png` - Glycan avatar
- `rjai-drawing-ottofort.png` - RJAI artwork (credit ottofort)

**Known Issues:**
- Konami code easter egg fixed (uses window.innerWidth/Height)
- Profile pictures are squares with 8px rounded corners
- All colors use CSS variables for consistency

## 📝 Content Guidelines

**Voice:**
- Use "im" instead of "I'm"
- Use "dont" instead of "don't"
- Use "its" instead of "it's"
- Casual, conversational tone
- No em dashes (—)
- No performative language

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

- Add more personal content
- Maybe add a "thoughts" page with rotating thoughts
- Consider adding more easter eggs
- Maybe add a "about nicepotato" section
- Could add more projects if they exist

## 📞 Contact

- NicePotato (user/creator)
- ottofort (RJAI artwork) - Discord: 168087543949033473

---

Last updated: April 20, 2026
Session context for future Glycan website work
