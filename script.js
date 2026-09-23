/* ==========================================================================
   LUMINA CLEANING SERVICES - SINGLE-PAGE SCROLLING SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile nav when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // ScrollSpy: Update active nav link indicator as user scrolls vertically
  const sections = document.querySelectorAll('section[id], footer[id]');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 250;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.classList.remove('active');
          if (href === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        }
      });
    }
  });

  // Booking Modal Dialog Logic
  const bookingModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (modalCloseBtn && bookingModal) {
    modalCloseBtn.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // FAQ Accordion Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optionally close other active FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        item.classList.toggle('active', !isActive);
      });
    }
  });

  // Blog Search & Category Live Filter
  const blogSearchInput = document.getElementById('blog-search-input');
  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      filterBlogContent(query);
    });
  }

  // Interactive Foam Bubble Mouse Physics
  const heroSection = document.querySelector('.hero');
  const foamBubbles = document.querySelectorAll('.foam-bubble');

  if (heroSection && foamBubbles.length > 0) {
    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const moveX = (clientX / windowWidth - 0.5) * 12;
      const moveY = (clientY / windowHeight - 0.5) * 8;

      foamBubbles.forEach((bubble, index) => {
        const factor = (index % 3 + 1) * 0.5;
        bubble.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      foamBubbles.forEach((bubble) => {
        bubble.style.transform = 'translate(0px, 0px)';
      });
    });
  }
});

// Helper to open booking modal dialog
function openBookingModal(serviceName) {
  const bookingModal = document.getElementById('booking-modal');
  const modalTitle = document.getElementById('modal-title-text');
  const serviceSelect = document.getElementById('service-type');

  if (serviceName && modalTitle) {
    modalTitle.textContent = `Book ${serviceName}`;
  } else if (modalTitle) {
    modalTitle.textContent = 'Book Lumina Service';
  }

  if (serviceName && serviceSelect) {
    const options = Array.from(serviceSelect.options);
    const matchingOpt = options.find(opt => opt.text.toLowerCase().includes(serviceName.toLowerCase()));
    if (matchingOpt) {
      serviceSelect.value = matchingOpt.value;
    }
  }

  if (bookingModal) {
    bookingModal.classList.add('active');
  }
}

// Booking Form Handler
function handleBookingSubmit() {
  const nameInput = document.getElementById('client-name');
  const modalCard = document.querySelector('.modal-card');
  const clientName = nameInput ? nameInput.value : 'Valued Client';

  if (modalCard) {
    modalCard.innerHTML = `
      <div style="text-align: center; padding: 2rem 1rem;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #374728; color: #FFF; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.75rem; color: #20241D; margin-bottom: 0.5rem;">Reservation Received</h3>
        <p style="font-size: 0.9375rem; color: #6B7265; line-height: 1.6;">Thank you, ${clientName}! Our concierge team will contact you shortly to confirm your cleaning appointment.</p>
        <button onclick="document.getElementById('booking-modal').classList.remove('active'); location.reload();" style="margin-top: 2rem; padding: 0.85rem 2rem; background: #374728; color: #FFF; border-radius: 50px; font-weight: 700; text-transform: uppercase; font-size: 0.8125rem; letter-spacing: 0.1em; border: none; cursor: pointer;">DONE</button>
      </div>
    `;
  }
}

// Share Article Toast / Feedback Helper
function shareArticle(platform) {
  const currentUrl = window.location.href;
  const title = encodeURIComponent("10 Essential Tips for a Cleaner, Healthier Home | Lumina Cleaning Services");
  
  if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${title}`, '_blank');
  } else if (platform === 'pinterest') {
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${title}`, '_blank');
  } else if (platform === 'linkedin') {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  } else {
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('Article link copied to clipboard!');
    }).catch(() => {
      alert('Sharing Lumina Blog Article: ' + window.location.href);
    });
  }
}

// Filter blog posts by category
function filterBlogCategory(categoryName) {
  const categoryLinks = document.querySelectorAll('.category-link');
  categoryLinks.forEach(link => {
    if (link.textContent.includes(categoryName)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  const cards = document.querySelectorAll('.blog-card, .recent-post-item');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!categoryName || categoryName === 'All' || text.includes(categoryName.toLowerCase())) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Filter blog content by live query search
function filterBlogContent(query) {
  const cards = document.querySelectorAll('.blog-card, .recent-post-item, .blog-point-item');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// Read Full Blog Post Toggle Expand
function toggleFullBlogPost() {
  const expandedDiv = document.getElementById('full-blog-article-content');
  const btn = document.getElementById('btn-read-full-post');
  
  if (expandedDiv) {
    if (expandedDiv.style.display === 'none' || !expandedDiv.style.display) {
      expandedDiv.style.display = 'block';
      if (btn) btn.innerHTML = '<span>SHOW LESS</span> ↑';
      expandedDiv.scrollIntoView({ behavior: 'smooth' });
    } else {
      expandedDiv.style.display = 'none';
      if (btn) btn.innerHTML = '<span>READ THE FULL BLOG POST</span>';
    }
  }
}

// Open Direct WhatsApp Chat
function openWhatsAppChat(customText) {
  const phone = '971586477660';
  const message = customText ? encodeURIComponent(customText) : encodeURIComponent("Hello Lumina Cleaning Services! I would like to inquire about booking a cleaning service.");
  const waUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(waUrl, '_blank');
}

// Handle Contact Page 30-Second WhatsApp Form Submission
function handleWhatsAppEnquirySubmit() {
  const name = document.getElementById('wa-name') ? document.getElementById('wa-name').value.trim() : '';
  const phone = document.getElementById('wa-phone') ? document.getElementById('wa-phone').value.trim() : '';
  const location = document.getElementById('wa-location') ? document.getElementById('wa-location').value : 'Dubai, UAE';
  const service = document.getElementById('wa-service') ? document.getElementById('wa-service').value : 'Deep Cleaning';

  let msg = `Hello Lumina Cleaning Services! I'd like to book a cleaning on WhatsApp.`;
  if (name) msg += `\nName: ${name}`;
  if (phone) msg += `\nPhone: ${phone}`;
  if (location) msg += `\nLocation: ${location}`;
  if (service) msg += `\nService Required: ${service}`;

  openWhatsAppChat(msg);
}


