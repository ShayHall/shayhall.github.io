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

/* Attaches click handler to tiles */
function setupTiles(){
  // $$('.tile').forEach(tile => {
  //   const clone = tile.cloneNode(true);
  //   tile.parentNode.replaceChild(clone, tile);
  // });
  
  // Re-select and attach new listeners
  $$('.tile').forEach(tile => {
    tile.addEventListener('click', function(e){
      // 1. Check for data-case (used for case studies)
      let url = this.getAttribute('data-case');
      
      // 2. Check for data-post (used for blog posts)
      if(!url) {
        url = this.getAttribute('data-post');
      }
      
      // If either attribute is present, open the modal
      if(url){
        e.preventDefault();
        openModal(url);
      } else {
        // Fallback: if no data-case/data-post, check for an internal link
        const link = this.querySelector('a');
        if (link && !link.matches('[data-link]') && !link.getAttribute('target')) {
             // If it's a regular anchor, do nothing and let the browser handle it.
        }
      }
    });

    // Handle keyboard interaction (Enter key)
    tile.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            this.click();
        }
    });
  });
}

// Add the modal close behavior to the modal root itself
if(modalRoot) {
  modalRoot.addEventListener('click', (e)=>{
    // Only close if the click is directly on the overlay (modalRoot)
    if(e.target === modalRoot) {
      closeModal();
    }
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
const currentPath = window.location.pathname;

if (currentPath === "/") {
  setTimeout(() => {

    function tabNav(){
      const nav_items = document.getElementsByClassName("tab-nav-item");

      for(let i=0; i < nav_items.length; i++) {
        nav_items[i].addEventListener("click", function() {
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
          

        });// end of click event listener
      } // end of for loop
    };// end of tabNav function


    tabNav();
  }, 1000); // end of setTimeout
} //end of if statement looking for homepage

    
      
        
          

          
        



