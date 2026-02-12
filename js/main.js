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

  const modal = modalRoot.querySelector('.modal');
  if(modal) modal.remove();
}

/* Open modal with URL content */
async function openModal(url){
  if(!modalRoot) return;
  modalRoot.classList.add('open');
  modalRoot.setAttribute('aria-hidden','false');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `<div class="loading">Loading…</div>`;
  modalRoot.appendChild(modal);

  try{
    const res = await fetch(url);
    if(!res.ok) throw new Error('Failed to load');
    const html = await res.text();

    modal.innerHTML = html;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerText = '✕';
    closeBtn.addEventListener('click', closeModal);
    
    const contentArea = modal.querySelector('article, section');
    if(contentArea) {
      contentArea.style.position = 'relative';
      contentArea.prepend(closeBtn);
    } else {
      modal.prepend(closeBtn);
    }
  } catch(error){
    console.error('Modal fetch failed:', error);
    modal.innerHTML = `<div class="error">Error loading content.</div>`;
  }
}

/* Attaches click handler to tiles */
function setupTiles(){
  $$('.tile').forEach(tile => {
    tile.addEventListener('click', function(e){
      let url = this.getAttribute('data-case') || this.getAttribute('data-post');
      if(url){
        e.preventDefault();
        openModal(url);
      }
    });

    tile.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') this.click();
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

/* ScrollSpy for secondary navigation */
let scrollSpyObserver;
function initScrollSpy() {
  if (scrollSpyObserver) scrollSpyObserver.disconnect();

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".secondary-nav a");

  if (sections.length === 0) return;

  scrollSpyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.secondary-nav a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => scrollSpyObserver.observe(section));
}

/* Global Listeners */
if(modalRoot) {
  modalRoot.addEventListener('click', (e) => {
    if(e.target === modalRoot) closeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeModal();
});