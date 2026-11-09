/**
 * Portfolio Filter & Project Details Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('#portfolioFilterBar .filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
          item.style.opacity = '0';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});

const projectsData = {
  'mileym3dia': {
    title: 'MILEYM3DIA Studio Brand System',
    category: 'Branding & Identity',
    date: 'Spring 2026',
    desc: 'The complete brand evolution of MILEYM3DIA. Designed to reflect raw authenticity, street culture, and high-impact digital art. Built with modular monograms, responsive typography, and neon high-visibility cues.',
    deliverables: ['Custom Monogram & Typography', 'Full Vector Stylebook', 'Social Rollout Assets', 'Motion Bumper']
  },
  'concrete-owl': {
    title: 'Concrete Owl — Audio-Reactive Visuals',
    category: 'Motion & Music Visuals',
    date: 'Winter 2025',
    desc: 'A futuristic 4K concert visual package and 3D stage presentation for bass music festival appearances. Integrated real-time frequency reaction to synths and 808 sub-bass.',
    deliverables: ['12 Looping Stage Visuals (4K)', 'Audio-Reactive TouchDesigner Setup', 'Social Teaser Clips']
  },
  'the-journey': {
    title: 'The Journey — Short Film & Music Video',
    category: 'Video Production & Direction',
    date: 'Fall 2025',
    desc: 'Cinematic visual story tracking the grind of independent artists navigating modern creative spaces. Directed, shot on anamorphic cinema glass, and color graded in DaVinci Resolve.',
    deliverables: ['Director’s Cut (7:30 min)', 'Official Music Video (3:45 min)', 'Behind The Scenes Reel', 'Custom Poster Art']
  },
  'm3-brand': {
    title: 'M3 Brand Identity & Apparel Lookbook',
    category: 'Streetwear & Apparel Direction',
    date: 'Autumn 2025',
    desc: 'Physical merchandise and clothing collection art direction. Includes heavy custom embroidery specs, screen-print color separations, and dynamic studio photoshoot lighting.',
    deliverables: ['Full Tech Packs & Vector Artwork', 'Lookbook Editorial Shoot', 'E-Commerce Mockups']
  },
  'neon-nights': {
    title: 'Neon Nights — Social Campaign',
    category: 'Social Media & Motion Graphics',
    date: 'Summer 2025',
    desc: 'A month-long campaign generating over 2.4 million organic impressions across Instagram and TikTok. Focused on cyberpunk neon aesthetics and hypnotic motion hooks.',
    deliverables: ['30 Motion Post Assets', 'Interactive Story Templates', 'Audio Mashup Soundtrack']
  },
  'audio-spectrum': {
    title: 'Audio Spectrum — Sonic Branding & EP Master',
    category: 'Audio Production & Engineering',
    date: 'Summer 2025',
    desc: 'Engineered at AMM Sounz: hybrid analog/digital audio mastering, sonic branding tags, and custom sub-bass sculpting engineered for club sound systems.',
    deliverables: ['5-Track EP Master (WAV / FLAC)', 'Dolby Atmos Spatial Mix', 'Sonic Brand Audio Logo']
  },
  'apex-cyberwear': {
    title: 'Apex Cyberwear — Headless Web Store',
    category: 'Web Design & Development',
    date: 'Spring 2025',
    desc: 'High performance headless shopping experience with 99+ Google Lighthouse score, dark aesthetic UI, custom 3D garment previews, and frictionless checkout flow.',
    deliverables: ['Custom Frontend Architecture', 'Figma Design System', 'Stripe & Inventory Automation']
  },
  'creator-os': {
    title: 'Creator OS Toolkit — Automation System',
    category: 'Digital Tools & Workflows',
    date: 'Spring 2025',
    desc: 'An automated Notion workspace and Figma pipeline engineered to handle multi-client onboarding, revision tracking, contract generation, and automated file deliveries.',
    deliverables: ['Master Notion Dashboard', 'Client Intake Webhook', 'Automated Invoicing Engine']
  }
};

window.openProjectModal = function(id) {
  const data = projectsData[id];
  if (!data) return;

  const modalContent = document.getElementById('modalContent');
  modalContent.innerHTML = `
    <span class="card-tag">${data.category}</span>
    <h2 class="section-title" style="font-size: 1.8rem; margin: 0.5rem 0 1rem 0;">${data.title}</h2>
    <div style="font-size: 0.85rem; color: var(--neon-lime); font-weight: 600; margin-bottom: 1.25rem;">Timeline: ${data.date}</div>
    <p style="color: #c4c6d4; line-height: 1.6; margin-bottom: 1.5rem; font-size: 0.95rem;">${data.desc}</p>
    
    <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem; margin-bottom: 1.5rem;">
      <div style="font-weight: 700; font-size: 0.85rem; color: #fff; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Key Deliverables:</div>
      <ul style="list-style: none; color: #a1a1aa; font-size: 0.85rem; line-height: 1.7;">
        ${data.deliverables.map(d => `<li>⚡ ${d}</li>`).join('')}
      </ul>
    </div>

    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn btn-secondary btn-sm" onclick="closeModal('projectModal')">Close</button>
      <a href="contact.html?project=${encodeURIComponent(data.title)}" class="btn btn-primary btn-sm">Inquire Similar Project -></a>
    </div>
  `;

  openModal('projectModal');
};

window.triggerBriefDownload = function(e) {
  e.preventDefault();
  showToast('Downloading M3 Creative Brief Template (PDF)...');
  
  // Create simulated downloadable file
  const element = document.createElement('a');
  const briefText = `MILEYM3DIA CREATIVE BRIEF TEMPLATE
=======================================
Project Name:
Client / Artist:
Target Launch Date:
Estimated Budget:

1. OBJECTIVE & CORE MESSAGE
What is the single most important message or emotion this project must convey?

2. TARGET AUDIENCE
Who are the primary viewers/listeners/customers? What culture or aesthetics do they identify with?

3. DELIVERABLES REQUIRED
[ ] Vector Logo & Identity
[ ] Custom Website / Landing Page
[ ] Music Video / Cinematic Short
[ ] Social Rollout Package (Reels / TikToks)
[ ] Audio Production / Mix / Master
[ ] Other:

4. VISUAL INSPIRATION & REFERENCES
Links to 3-5 visual references or moodboards:

5. TIMELINE & MILESTONES
- Initial Concepts:
- First Draft Review:
- Final Delivery:

Transmit completed brief to: hello@mileym3dia.com
CREATE. CAPTURE. ELEVATE.
`;
  const file = new Blob([briefText], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'M3-Creative-Brief-Template.txt';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
