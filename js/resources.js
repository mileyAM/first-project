/**
 * Resources Filtering & Instant Download Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('#resourcesFilterBar .filter-btn');
  const cards = document.querySelectorAll('.resource-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter').toLowerCase();

      cards.forEach(card => {
        const cat = (card.getAttribute('data-category') || '').toLowerCase();
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

window.downloadResource = function(title) {
  showToast(`Preparing download: ${title}...`);

  setTimeout(() => {
    const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.txt';
    const content = `MILEYM3DIA CREATOR RESOURCE: ${title}
==================================================
Official release from MILEYM3DIA Studio Labs.
Website: https://mileym3dia.com | Contact: hello@mileym3dia.com

Thank you for downloading our ${title}.
Inside this package:
- Complete production-tested configurations
- High-performance presets and guidelines
- Direct Notion / Studio workspace integration keys

To join the community and get weekly updates, visit:
https://mileym3dia.com/hub.html

CREATE. CAPTURE. ELEVATE.
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded ${filename} successfully!`);
  }, 350);
};
