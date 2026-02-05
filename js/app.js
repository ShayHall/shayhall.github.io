async function navigateTo(url) {
  history.pushState(null, null, url);
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

  const path = window.location.pathname;
  const route = routes[path] || routes["/"];

  const html = await fetch(route).then(r => r.text());
  document.getElementById("app").innerHTML = html;

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