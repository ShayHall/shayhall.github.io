// This function handles the clicking of links
async function navigateTo(url) {
  // Update the URL in the browser bar
  history.pushState(null, null, url);
  // Run the router to swap the content
  await router();
}

async function router() {
  const routes = {
    "/": "/pages/home.html",
    "/case-studies": "/pages/case-studies.html",
    "/about": "/pages/about.html",
    "/blog": "/pages/blog.html",
    "/photos": "/pages/gallery.html",
    "/contact": "/pages/contact.html"
  };

  // 1. Check if we just arrived via the 404.html redirect (?p=...)
  const urlParams = new URLSearchParams(window.location.search);
  let path = urlParams.get('p');

  if (path) {
    // If we have a redirect param, clean the URL (remove the ?p=)
    path = '/' + path;
    window.history.replaceState(null, null, path);
  } else {
    // Otherwise, just use the normal path
    path = window.location.pathname;
  }

  // 2. Resolve the route
  const route = routes[path] || routes["/"];

  // 3. Fetch and inject the HTML
  try {
    const response = await fetch(route);
    const html = await response.text();
    document.getElementById("app").innerHTML = html;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// 4. Handle back/forward browser buttons
window.addEventListener("popstate", router);

// 5. Initial load
document.addEventListener("DOMContentLoaded", () => {
  // This listener catches all clicks on the page
  document.body.addEventListener("click", e => {
    // If the clicked element is a link with a 'data-link' attribute
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});


  // -------------------------------
  // 🚀 RE-INITIALIZE INTERACTIONS
  // -------------------------------
  
  // 1. Initialize ScrollSpy
  initScrollSpy();

  // 2. Re-attach click listeners to new tiles (from main.js)
  if (typeof setupTiles === 'function') {
    setupTiles();
  }

  // 3. Re-attach scroll animations (from main.js)
  if (typeof setupScrollAnimations === 'function') {
    setupScrollAnimations();
  }
}

// Intercept link clicks
document.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

// Back/refresh
window.addEventListener("popstate", router);

// First load
router();


// Home scroll-to-top behavior
document.addEventListener("click", e => {
  const brand = e.target.closest("#home");
  if (!brand) return;

  e.preventDefault();

  if (window.location.pathname === "/home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/home");
  }
});

// About me scroll-to-top behavior
document.addEventListener("click", e => {
  const aboutme = e.target.closest("#about");
  if (!aboutme) return;

  e.preventDefault();

  if (window.location.pathname === "/about") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/about");
  }
});

// Case studies scroll-to-top behavior
document.addEventListener("click", e => {
  const aboutme = e.target.closest("#case-studies-nav");
  if (!aboutme) return;

  e.preventDefault();

  if (window.location.pathname === "/case-studies") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/case-studies");
  }
});

// Case studies scroll-to-top behavior
document.addEventListener("click", e => {
  const aboutme = e.target.closest("#blog-nav");
  if (!aboutme) return;

  e.preventDefault();

  if (window.location.pathname === "/blog") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/blog");
  }
});

// Case studies scroll-to-top behavior
document.addEventListener("click", e => {
  const aboutme = e.target.closest("#photos-nav");
  if (!aboutme) return;

  e.preventDefault();

  if (window.location.pathname === "/photos") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/photos");
  }
});

// Case studies scroll-to-top behavior
document.addEventListener("click", e => {
  const aboutme = e.target.closest("#contact-nav");
  if (!aboutme) return;

  e.preventDefault();

  if (window.location.pathname === "/contact") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    navigateTo("/contact");
  }
});

// ======================
// ScrollSpy initializer
// ======================


let scrollSpyObserver;

function initScrollSpy() {
  // Disconnect previous observer (important for SPA navigation)
  if (scrollSpyObserver) {
    scrollSpyObserver.disconnect();
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".secondary-nav a");

  scrollSpyObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute("id");
        
        if (entry.isIntersecting) {
          
          // remove active from all
          navLinks.forEach(link => link.classList.remove("active"));

          // highlight the one that matches
          const activeLink = document.querySelector(
            `.secondary-nav a[href="#${id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    {
      threshold: .5, // more than half of section in view (was 0.6)
    }
  );

  sections.forEach(section => scrollSpyObserver.observe(section));
}