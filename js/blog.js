/**
 * Blog Live Search & Category Filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blogSearchInput');
  const articles = document.querySelectorAll('.article-item');
  const noResults = document.getElementById('noResults');
  const categoryLinks = document.querySelectorAll('.category-filter-link');

  let currentCategory = 'all';

  function filterArticles() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    let visibleCount = 0;

    articles.forEach(article => {
      const title = (article.getAttribute('data-title') || '').toLowerCase();
      const cat = (article.getAttribute('data-category') || '').toLowerCase();
      const desc = (article.querySelector('.card-desc')?.textContent || '').toLowerCase();

      const matchesCat = currentCategory === 'all' || cat.includes(currentCategory.toLowerCase());
      const matchesQuery = !query || title.includes(query) || desc.includes(query) || cat.includes(query);

      if (matchesCat && matchesQuery) {
        article.style.display = 'block';
        visibleCount++;
      } else {
        article.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
  }

  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      categoryLinks.forEach(l => {
        l.style.color = 'var(--text-muted)';
        l.style.fontWeight = '500';
      });
      link.style.color = 'var(--neon-lime)';
      link.style.fontWeight = '700';

      currentCategory = link.getAttribute('data-cat');
      filterArticles();
    });
  });

  window.resetBlogSearch = function() {
    if (searchInput) searchInput.value = '';
    currentCategory = 'all';
    filterArticles();
  };
});
