'use strict';
document.body.classList.add('js');
const researchControls = document.querySelector('.research-selectors');
if (researchControls) {
  const researchCards = [...document.querySelectorAll('[data-research-area]')];
  const areaButtons = [...researchControls.querySelectorAll('button[data-area]')];
  const announcement = document.querySelector('#research-announcement');
  function showResearch(area, announce) {
    researchCards.forEach(card => { card.hidden = area !== 'all' && card.dataset.researchArea !== area; });
    areaButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.area === area)));
    if (announce && announcement) {
      const current = researchCards.find(card => card.dataset.researchArea === area);
      announcement.textContent = area === 'all' ? 'All four research areas shown' : `${current.querySelector('h3').textContent} shown`;
    }
  }
  researchControls.hidden = false;
  showResearch('0', false);
  researchControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-area]');
    if (button) showResearch(button.dataset.area, true);
  });
}
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
toggle.hidden = false;
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); }
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); }
});
const filters = document.querySelector('.filters');
const publications = [...document.querySelectorAll('.publication')];
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  let count = 0;
  publications.forEach(item => { item.hidden = button.dataset.filter !== 'All' && item.dataset.status !== button.dataset.filter; if (!item.hidden) count++; });
  document.querySelector('#publication-count').textContent = `${count} publications shown`;
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
