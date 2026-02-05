Blog post /blog-posts/post-01.html similar structure to case studies.

# Assets & placeholders

Place realistic placeholder images in /assets/images/ named:

hero.jpg

project-1.jpg ... project-6.jpg

project-1-thumb.jpg ... (thumbnails)

gallery-01.jpg ... gallery-12.jpg

favicon.png
Place resume.pdf in /assets/.

You can get royalty-free placeholder images from Unsplash and name them accordingly.

# Accessibility & performance notes

All interactive tiles are keyboard-focusable and respond to Enter/Space.

Use loading="lazy" on images to speed loads.

Semantic elements: nav, main, header, section, article, aside.

Colors meet moderate contrast for headings and white-on-dark; check text contrast for smaller body text against #1c1e26. If any body text is too low contrast, increase weight or color.

Minify css/styles.css and js/main.js for production. Use compressed images, and generate responsive image sizes if desired.

# Suggested additional subtle interactions (already included / optional)

Micro-copy reveal on hover (show metrics) — add a data-metric to tiles and reveal on hover.

Link underline grow animation on hover (use ::after width).

Soft background parallax on hero (move background-position on scroll).

Keyboard accessible carousel for gallery modal for left/right arrow navigation.

Small animated SVG underlines for headings.

# How to run & host

Put files with structure above into a repo (e.g., shay-hall-portfolio).

Commit and push to GitHub.

On repo settings, enable GitHub Pages to serve from main branch root (or gh-pages).

Site available at https://<username>.github.io/<repo>/.