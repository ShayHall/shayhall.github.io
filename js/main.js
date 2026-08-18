/* main.js - simple, dependency-free interactions */
/* Utilities */
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* Modal root */
const modalRoot = document.getElementById('modal-root');


/* Close modal */
function closeModal(){
  if(!modalRoot) return;
  modalRoot.classList.remove('open');
  modalRoot.setAttribute('aria-hidden','true');

  // Remove dynamically added modal content
  const modal = modalRoot.querySelector('.modal');
  if(modal) modal.remove();

  // Return focus to the element that opened the modal (if possible, though this is tricky in a full SPA)
}





/* Open modal with URL content (fetch HTML fragment) */
async function openModal(url){
  if(!modalRoot) return;
  modalRoot.classList.add('open');
  modalRoot.setAttribute('aria-hidden','false');

  // Create container
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;

  // Loading UI
  modal.innerHTML = `<div class="loading">Loading…</div>`;
  modalRoot.appendChild(modal);

  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('Failed to load');
    const html = await res.text();

    // Insert content into modal (simple)
    modal.innerHTML = html;

    // add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerText = '✕';
    closeBtn.addEventListener('click', closeModal);
    
    // Find the primary content area (e.g., the first section or article) and prepend the close button
    const contentArea = modal.querySelector('article, section');
    if(contentArea) {
      contentArea.style.position = 'relative'; // Ensure button is positioned correctly relative to content
      contentArea.prepend(closeBtn);
    } else {
      modal.prepend(closeBtn);
    }

  } catch(error){
    console.error('Modal fetch failed:', error);
    modal.innerHTML = `<div class="error">Error loading content. Please try again later.</div>`;
    
    // Still add close button for error case
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerText = '✕';
    closeBtn.addEventListener('click', closeModal);
    modal.appendChild(closeBtn);
  }
}

/* Open modal with a single image */
function openImageModal(src, alt){
  if(!modalRoot) return;
  modalRoot.classList.add('open');
  modalRoot.setAttribute('aria-hidden','false');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.innerText = '✕';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.addEventListener('click', closeModal);

  const img = document.createElement('img');
  img.src = src;
  img.alt = alt || '';

  modal.appendChild(closeBtn);
  modal.appendChild(img);
  modalRoot.appendChild(modal);
  modal.focus();
}

/* Attaches click handler to gallery photo links */
function setupGallery(){
  $$('[data-model-image]').forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const img = this.querySelector('img');
      openImageModal(this.getAttribute('href'), img ? img.alt : '');
    });
  });
}


/* Intersection observer for fade-in on scroll */
function setupScrollAnimations(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('inview');
      else entry.target.classList.remove('inview');
    });
  }, { threshold: 0.12 });
  $$('.panel[data-animate], [data-animate]').forEach(el=>obs.observe(el));
}

/* Keyboard: ESC closes modal */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});


/* tabs */
function tabAction() {
  const id=this.getAttribute("data-id");
  const active_nav = document.getElementsByClassName("tab-nav-item_active");
  while (active_nav.length > 0) {
    active_nav[0].classList.remove("tab-nav-item_active");
  };

  this.classList.add("tab-nav-item_active");
  
  const active_content = document.getElementsByClassName("tab-content-item_active");
  while (active_content.length > 0) {
    active_content[0].classList.remove("tab-content-item_active");
  }
  document.getElementById(id).classList.add("tab-content-item_active");
}

if ('navigation' in window) {
  window.navigation.addEventListener('navigate', (event) => {
    handleLinkClick();
  });
}

const currentPath = window.location.pathname;

function handleLinkClick() {
  setTimeout(() => {

    function tabNav(){
      const nav_items = document.getElementsByClassName("tab-nav-item");

      for(let i=0; i < nav_items.length; i++) {
        nav_items[i].addEventListener("click", tabAction);
      } // end of for loop
    };// end of tabNav function

    tabNav();
  }, 1000); // end of setTimeout
};

handleLinkClick()

