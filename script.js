// Example: Smooth scroll to top when CTA is clicked (customize as needed)
document.querySelectorAll('.cta-btn, .cta-btn-large').forEach(btn =>
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))
);