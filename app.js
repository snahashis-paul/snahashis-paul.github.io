'use strict';
const filters = [...document.querySelectorAll('[data-filter]')];
const projects = [...document.querySelectorAll('[data-category]')];
const counter = document.querySelector('.result-count');
filters.forEach(button => button.addEventListener('click', () => {
  const chosen = button.dataset.filter;
  filters.forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  projects.forEach(project => {
    const visible = chosen === 'all' || project.dataset.category === chosen;
    project.hidden = !visible;
    if (visible) count += 1;
  });
  counter.textContent = `${count} case ${count === 1 ? 'study' : 'studies'}`;
}));
const email = 'S.PAUL3-2024@hull.ac.uk';
const copyButton = document.getElementById('copy-email');
const copyStatus = document.querySelector('.copy-status');
if (navigator.clipboard?.writeText) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = `Please copy the address above, or use Get in touch.`;
    }
  });
}
// Keep an incoming case-study link visible, even after filtering.
function revealLinkedCaseStudy() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); }
  catch { return; }
  const project = projects.find(item => item.id === id);
  if (!project) return;
  filters.find(item => item.dataset.filter === 'all').click();
  project.querySelector('details').open = true;
}
window.addEventListener('hashchange', revealLinkedCaseStudy);
revealLinkedCaseStudy();
