/**
 * app.js - Single Page Application Router
 */

const routes = {
  "/": "/pages/home.html",
  "/case-studies": "/pages/case-studies.html",
  "/about": "/pages/about.html",
  "/blog": "/pages/blog.html",
  "/photos": "/pages/gallery.html",
  "/contact": "/pages/contact.html"
};

async function router() {
  const appContainer = document.getElementById("app");
  
  // 1. Handle GitHub Pages 404 redirect (?p=path)
  const urlParams = new URLSearchParams(window.location.search);
  let path = urlParams.get('p');

  if (path) {
    path = '/' + path;
    window.history.replaceState(null, null, path);
  } else {
    path = window.location.pathname;
  }

  // 2. Resolve route and fetch content
  const route = routes[path] || routes["/"];
  
  try {
    const response = await fetch(route);
    if (!response.ok) throw new Error("Page not found");
    const html = await response.text();
    
    // Inject HTML into the app container
    appContainer.innerHTML = html;

    // 3. Re-initialize interactions defined in main.js
    window.scrollTo(0, 0);
    if (typeof initScrollSpy === 'function') initScrollSpy();
    if (typeof setupTiles === 'function') setupTiles();
    if (typeof setupScrollAnimations === 'function') setupScrollAnimations();

  } catch (error) {
    console.error("Routing error:", error);
    appContainer.innerHTML = "<section><h1>404</h1><p>Page not found.</p></section>";
  }
}

async function navigateTo(url) {
  history.pushState(null, null, url);
  await router();
}

// Unified click listener for navigation and scroll-to-top
document.addEventListener("click", e => {
  const link = e.target.closest("[data-link]");
  if (!link) return;

  e.preventDefault();
  const url = new URL(link.href, window.location.origin);

  if (window.location.pathname === url.pathname) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo(url.pathname);
  }
});

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", router);