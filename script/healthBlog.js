document.addEventListener('DOMContentLoaded', () => {
const openArticle = document.getElementById('open-article');
const closeArticle = document.getElementById('close-article');
const overlay = document.getElementById('article-overlay');

openArticle.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'flex';
});

closeArticle.addEventListener('click', () => {
    overlay.style.display = 'none';
});

  // Optional: close overlay when user clicks outside the article
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.style.display = 'none';
});
});


document.addEventListener('DOMContentLoaded', () => {
  const blogLinks = document.querySelectorAll('.read-more');
  const blogOverlays = document.querySelectorAll('.blog-article-overlay');

  // Open the corresponding blog overlay
  blogLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const blogId = link.getAttribute('data-blog');
      const overlay = document.getElementById(blogId);
      if (overlay) overlay.classList.add('visible');
    });
  });

  // Close overlay when clicking close button or outside
  blogOverlays.forEach(overlay => {
    const closeBtn = overlay.querySelector('.close-blog-article');

    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('visible');
    });

    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('visible');
    });
  });
});