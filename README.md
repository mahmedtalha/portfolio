# Muhammad Ahmed Talha — Portfolio

A responsive static portfolio for a cybersecurity and IT infrastructure professional. The site is designed for GitHub Pages and uses plain HTML, CSS, and JavaScript.

## Highlights

- Recruiter-focused professional summary and measurable experience
- Featured and filterable cybersecurity projects
- Clearly labeled education, certificates, and training
- Accessible dark/light theme and mobile navigation
- JARVIS portfolio assistant with local knowledge fallback
- Real contact flow through Google Forms and direct email
- Open Graph, X/Twitter, JSON-LD, sitemap, and robots metadata
- Optimized WebP hero portrait with PNG fallback

## Local preview

Serve the directory over HTTP so the JARVIS HTML fragment can load correctly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

The included GitHub Actions workflow publishes the static files to GitHub Pages.

## Important content maintenance

Keep employment dates and role wording synchronized between `index.html` and `jarvis-aichatbot.js`. Only label a course as a professional certification when the credential has been formally earned and can be verified.
