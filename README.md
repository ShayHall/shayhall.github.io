# Shay Hall — Portfolio Site

Personal portfolio site for Shay Hall, Senior Design Manager & Product Leader. Showcases case studies, work history, teaching engagements, accolades, and writing.

**Live site:** https://shayhall.github.io/

## Overview

The site is a lightweight, client-rendered single-page app. Navigation between top-level pages (`/`, `/about`, `/case-studies`, `/blog`, `/contact`) is handled via `data-link` attributes intercepted by a client-side router, and individual case studies are loaded into a modal (`#modal-root`) from partial HTML files rather than full page reloads.

## Pages

| Page | File | Description |
|---|---|---|
| Home | `home.html` | Hero intro, featured project tiles, and tabbed sections for Experience, Teaching, and Accolades |
| Case Studies | `case-studies.html` | Grid of project tiles that open detailed case studies in a modal |
| About | `about.html` | Bio, tabbed sections for About Me / Philosophy / Skills |
| Blog | `blog.html` | Mix of external Medium posts and in-repo long-form posts |
| Gallery | `gallery.html` | Grid of examples of personal photography projects |
| Contact | `contact.html` | Email, phone, and LinkedIn contact cards |

## Case studies

Case study content lives in `pages/case-studies/` as standalone HTML fragments designed to be injected into the modal container:

- `sevone-saas.html` — SevOne SaaS: Day 1 Experience
- `lejit.html` — Jumpstart Innovation Team
- `databand-instana.html` — Databand + Instana Integration Exploration

Each fragment follows a consistent structure (`Role`, `Objective`, `Personas`/`Overview`, `Process`, `Summary`) styled by shared classes (`.case-study`, `.two-col-grid`, `.hero-title`, etc.) defined in the site's global stylesheet.

## Blog posts

Long-form posts that live in-repo (rather than linking out to Medium) are stored in `pages/blog-posts/`. Several posts are marked "Coming soon" placeholders pending final content.

## Project structure

```
shayhall.github.io/
├── assets/
│   ├── illustrations/
│   ├── images/
│   │   ├── databand-instana_images/
│   │   ├── lejit_images/
│   │   ├── saas_images/
│   │   ├── photo_gallery/
│   │   ├── agile-design.jpeg
│   │   ├── learning-square.png
│   │   ├── shay-workshop-1.jpg
│   │   ├── shay-workshop-3.jpg
│   │   ├── shay-workshop-4.jpg
│   │   └── shay-workshop-5.jpg
│   ├── favicon.svg
│   ├── Resume-SHall.pdf
│   └── SH-logo-1.svg
├── css/
├── js/
│   ├── app.js
│   └── main.js
├── pages/
│   ├── blog-posts/
│   └── case-studies/
├── about.html
├── blog.html
├── case-studies.html
├── contact.html
├── gallery.html
├── home.html
├── index.html
├── 404.html
├── .gitignore
└── README.md
```


## Content notes

- Case study fragments are meant to be opened as modals, not viewed as standalone pages — some styling assumes a modal container context.
- Image alt text and `aria-label` values should stay in sync with visible headings; a few are currently placeholder/legacy values left over from earlier project codenames.
- The résumé PDF is linked from both the Home and About hero sections (`assets/Resume-SHall.pdf`) — replace this file to update the downloadable résumé sitewide.


## Contact

- Email: hallshay@gmail.com
- LinkedIn: [linkedin.com/in/shay-hall](https://www.linkedin.com/in/shay-hall)
