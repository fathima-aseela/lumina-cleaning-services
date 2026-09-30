/* ==========================================================================
   LUMINA CLEANING SERVICES - MULTI-PAGE WEBSITE SCRIPT
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

  // Optional intra-page hash scrollspy for section hash links
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

  // Service Details Modal Backdrop Click Listener
  const serviceDetailsModal = document.getElementById('service-details-modal');
  if (serviceDetailsModal) {
    serviceDetailsModal.addEventListener('click', (e) => {
      if (e.target === serviceDetailsModal) {
        closeServiceDetailsModal();
      }
    });
  }

  // Corner Details Modal Backdrop Click Listener
  const cornerDetailsModal = document.getElementById('corner-details-modal');
  if (cornerDetailsModal) {
    cornerDetailsModal.addEventListener('click', (e) => {
      if (e.target === cornerDetailsModal) {
        closeCornerDetailModal();
      }
    });
  }

  // Keyboard escape key listener for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCornerDetailModal();
      closeServiceDetailsModal();
      const bookingModal = document.getElementById('booking-modal');
      if (bookingModal) bookingModal.classList.remove('active');
    }
  });

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

// Function to open Service Details Modal (Popular Services on Home Page)
function openServiceDetailsModal(serviceType) {
  const modal = document.getElementById('service-details-modal');
  const titleElem = document.getElementById('details-modal-title');
  const eyebrowElem = document.getElementById('details-modal-eyebrow');
  const descElem = document.getElementById('details-modal-desc');
  const bodyElem = document.getElementById('details-modal-body');

  if (!modal || !titleElem || !descElem || !bodyElem) return;

  if (serviceType === 'deep-cleaning') {
    if (eyebrowElem) eyebrowElem.textContent = 'TOP-TO-BOTTOM RESTORATION';
    titleElem.textContent = 'Deep Cleaning Services';
    descElem.textContent = 'Thorough deep-extraction, sanitisation, polishing, and technical care for homes and offices. Deep cleaning targets hidden dust, grime, grease, and allergens in hard-to-reach areas using specialized equipment and eco-friendly products.';
    
    bodyElem.innerHTML = `
      <div style="margin-top: 1rem;">
        <span style="font-size: 0.8125rem; font-weight: 700; color: #374728; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.75rem;">11 Specialized Deep Cleaning Services:</span>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.6rem;">
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">1. Carpet & Rug Cleaning</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Deep-extraction that lifts stains and odours.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">2. Sofa & Upholstery</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Fabric-safe deep shampoo — like new again.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">3. Mattress Deep Clean</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Dust-mite and allergen treatment, both sides.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">4. Curtains & Drapery</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">On-site or off-site cleaning for all fabrics.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">5. Window & Glass</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Streak-free interior and reachable exterior glass.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">6. Floor & Marble Polishing</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Grinding, polishing and sealing for stone floors.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">7. AC Duct Cleaning</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Cleaner air and a healthier, fresher home.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">8. Water Tank Cleaning</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Drain, scrub, disinfect and certify.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">9. Disinfection & Sanitisation</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Hospital-grade fogging for homes and offices.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">10. Pest Control</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Safe, certified treatment for common pests.</span>
          </div>
          <div style="background: #F4F1EA; padding: 0.75rem 0.85rem; border-radius: 10px; border: 1px solid #E2DCCF;">
            <strong style="display: block; font-size: 0.875rem; color: #20241D; margin-bottom: 0.2rem;">11. Post-Construction Clean</strong>
            <span style="font-size: 0.8125rem; color: #646E5D; line-height: 1.4; display: block;">Fine-dust removal and detailing after a build.</span>
          </div>
        </div>
      </div>
    `;
  } else if (serviceType === 'home-cleaning') {
    if (eyebrowElem) eyebrowElem.textContent = 'REGULAR HOME MAINTENANCE';
    titleElem.textContent = 'Regular Home Cleaning';
    descElem.textContent = 'Regular Home Cleaning is suitable for ongoing regular home maintenance and can be scheduled according to your specific needs — weekly, fortnightly, or one-off.';
    
    bodyElem.innerHTML = `
      <div style="margin-top: 1rem;">
        <span style="font-size: 0.8125rem; font-weight: 700; color: #374728; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.75rem;">Available Property Sizes:</span>
        <div class="property-size-grid">
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">Studio</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">1 BHK</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">2 BHK</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">3 BHK</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">4 BHK</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.85rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.875rem;">Villa / Other</div>
        </div>
      </div>
    `;
  } else if (serviceType === 'sofa-upholstery') {
    if (eyebrowElem) eyebrowElem.textContent = 'FABRIC-SAFE SHAMPOO CARE';
    titleElem.textContent = 'Sofa & Upholstery Cleaning';
    descElem.textContent = 'Our Sofa & Upholstery cleaning service provides fabric-safe deep shampoo cleaning to lift stubborn stains, trapped dust, allergens, and odours while preserving upholstery texture.';
    
    bodyElem.innerHTML = `
      <div style="margin-top: 1rem;">
        <span style="font-size: 0.8125rem; font-weight: 700; color: #374728; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.75rem;">Available Sofa Types:</span>
        <div class="property-size-grid">
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">1 Seater</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">2 Seater</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">3 Seater</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">4 Seater</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">L-Shaped</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">U-Shaped</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">Recliner</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">Sofa Bed</div>
          <div style="background: #F4F1EA; border: 1px solid #E2DCCF; border-radius: 10px; padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; color: #20241D; font-size: 0.8125rem;">Other</div>
        </div>
      </div>
    `;
  } else if (serviceType === 'move-in-cleaning') {
    if (eyebrowElem) eyebrowElem.textContent = 'COMPLETE PROPERTY RESET';
    titleElem.textContent = 'Move-In / Move-Out Cleaning';
    descElem.textContent = 'Provides a thorough cleaning and complete reset of the property before moving in or after moving out. Deep cleans every room, inside cabinets, appliances, and fixtures to meet landlord and real estate agency handover standards.';
    
    bodyElem.innerHTML = `
      <div style="margin-top: 1rem; background: #F4F1EA; border-radius: 12px; padding: 1.25rem; border: 1px solid #E2DCCF;">
        <h4 style="font-size: 0.9375rem; font-weight: 700; color: #374728; margin-bottom: 0.4rem;">Agency & Landlord Handover Standard</h4>
        <p style="font-size: 0.875rem; color: #646E5D; margin: 0; line-height: 1.6;">
          Our move-in and move-out cleaning team handles top-to-bottom sanitisation, interior cabinet detailing, kitchen grease removal, bathroom descaling, window washing, and floor scrubbing so your property is pristine and ready for handover.
        </p>
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeServiceDetailsModal() {
  const modal = document.getElementById('service-details-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Function to open Every Corner Details Modal ("Every Corner Deserves Attention" section)
function openCornerDetailModal(cornerKey) {
  const modal = document.getElementById('corner-details-modal');
  const imgElem = document.getElementById('corner-modal-img');
  const eyebrowElem = document.getElementById('corner-modal-eyebrow');
  const titleElem = document.getElementById('corner-modal-title');
  const leadElem = document.getElementById('corner-modal-lead');
  const bodyElem = document.getElementById('corner-modal-body');
  const ctaLinkElem = document.getElementById('corner-modal-cta-link');

  if (!modal) return;

  const dataMap = {
    'fixtures': {
      image: 'assets/detail_fixtures.jpg',
      eyebrow: 'PRECISION HARDWARE DETAILING',
      title: 'Spotless Fixtures',
      lead: 'Technical precision detailing of taps, faucets, light fittings, handles, metallic hardware, and overhead lamps to remove lime scale, tarnish, and water spots, restoring original shine and brilliance.',
      cleanedList: [
        'Chrome & brass faucets, mixer spouts, and shower valves',
        'Overhead rain showerheads, hand sprayers, and aerators',
        'Cabinet knobs, drawer handles, & stainless steel door hardware',
        'Light switch plates, metal socket trims, and glass light fittings',
        'Stainless steel sink drains, stopper caps, and metal strainers'
      ],
      benefits: [
        'Restores long-lasting metallic shine, clarity, and reflection',
        'Eliminates mineral scale deposits and unsightly hard-water staining',
        'Protects delicate electroplated finishes from corrosion & oxidation',
        'Eradicates hidden bacteria and mold spores around joint seams'
      ],
      practical: 'Cleaned using non-abrasive, pH-balanced micro-polishes and dedicated soft microfibre towels to protect delicate electroplated surfaces.',
      ctaText: 'BOOK FIXTURE DETAILING NOW',
      ctaService: 'Residential Deep Clean'
    },
    'surfaces': {
      image: 'assets/detail_surfaces.jpg',
      eyebrow: 'MATERIAL-SAFE SURFACE CARE',
      title: 'Sparkling Surfaces',
      lead: 'Comprehensive deep cleaning, dusting, micro-wiping, and sanitisation of all horizontal and vertical architectural surfaces, stone counters, wooden desks, and glass trim.',
      cleanedList: [
        'Marble, quartz, granite, and timber countertops',
        'Solid wood desks, dining tables, sideboards, & shelving units',
        'Glass panels, mirror surrounds, and transparent room dividers',
        'Architectural baseboards, door frames, window sills, & high ledges',
        'High-touch light switches, door handles, & digital keypads'
      ],
      benefits: [
        'Removes micro-dust, allergen build-up, and ambient grease',
        'Protects premium stone & wooden surfaces from permanent staining',
        'Sanitizes high-touch residential areas to prevent cross-germs',
        'Delivers a smooth, streak-free, pristine finish across every room'
      ],
      practical: 'We utilize stone-safe pH-neutral cleaners and specialized microfiber cloths tailored specifically to natural stone, solid timber, or glass surfaces.',
      ctaText: 'BOOK SURFACE CLEANING NOW',
      ctaService: 'Regular Home Cleaning'
    },
    'floors': {
      image: 'assets/detail_floors.jpg',
      eyebrow: 'DEEP FLOOR SCRUB & POLISH',
      title: 'Impeccable Floors',
      lead: 'Intensive vacuuming, deep tile scrub, grout restoration, and specialist floor treatments designed to lift deep-seated dirt and revive floor brilliance.',
      cleanedList: [
        'Italian marble, travertine, and polished natural stone tiles',
        'Ceramic & porcelain floor tiles with deep grout line scrubbing',
        'Solid hardwood, engineered timber, & moisture-safe luxury laminate',
        'High-traffic vinyl planking, terrazzo, and entryway area rugs'
      ],
      benefits: [
        'Restores high-gloss reflection and vibrant natural color tone',
        'Whitens and deep-scrubs discolored, stained tile grout lines',
        'Eliminates 99.9% of floor dust, micro-particles, and allergens',
        'Extends floor lifespan by removing abrasive grit and dirt particles'
      ],
      practical: 'Customized floor techniques including HEPA vacuuming, low-moisture timber mopping, and specialized rotary tile scrubbers.',
      ctaText: 'BOOK FLOOR DEEP CLEAN NOW',
      ctaService: 'Residential Deep Clean'
    },
    'bathrooms': {
      image: 'assets/detail_bathrooms.jpg',
      eyebrow: 'ANTIBACTERIAL SANITISATION',
      title: 'Sanitized Bathrooms',
      lead: 'Deep antibacterial steam sanitisation, limescale descaling, mold removal, and glass polishing to transform your bathroom into a pristine, hygienic sanctuary.',
      cleanedList: [
        'Porcelain toilet bowls, bidets, seat hinges, & flush buttons',
        'Glass shower enclosures, bathtubs, & floor-to-ceiling tile walls',
        'Washbasins, marble vanity counters, & vanity cabinet exteriors',
        'Ventilation exhaust fans, mirror panels, and metal drain grates'
      ],
      benefits: [
        'Eradicates 99.9% of harmful bacteria, viruses, and mildew spores',
        'Removes stubborn limescale crusts, soap scum, and water rings',
        'Neutralizes unpleasant damp odours at their source',
        'Leaves glass shower doors crystal-clear and completely streak-free'
      ],
      practical: 'Executed using hospital-safe eco disinfectants, specialized steam jets, and color-coded microfibre cloths to ensure absolute hygiene.',
      ctaText: 'BOOK BATHROOM SANITISATION NOW',
      ctaService: 'Bathroom Deep Clean'
    }
  };

  const item = dataMap[cornerKey];
  if (!item) return;

  if (imgElem) imgElem.src = item.image;
  if (eyebrowElem) eyebrowElem.textContent = item.eyebrow;
  if (titleElem) titleElem.textContent = item.title;
  if (leadElem) leadElem.textContent = item.lead;

  if (bodyElem) {
    let listHTML = item.cleanedList.map(li => `<li style="margin-bottom: 0.35rem; display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.84rem; color: #333;"><span style="color: #374728; font-weight: bold;">✓</span> <span>${li}</span></li>`).join('');
    let benefitsHTML = item.benefits.map(b => `<li style="margin-bottom: 0.35rem; display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.84rem; color: #333;"><span style="color: #374728; font-weight: bold;">✦</span> <span>${b}</span></li>`).join('');

    bodyElem.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
        <div style="background: #F4F1EA; padding: 1rem; border-radius: 12px; border: 1px solid #E2DCCF;">
          <h4 style="font-size: 0.8125rem; font-weight: 700; color: #374728; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">What Is Covered</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${listHTML}
          </ul>
        </div>
        <div style="background: #F4F1EA; padding: 1rem; border-radius: 12px; border: 1px solid #E2DCCF;">
          <h4 style="font-size: 0.8125rem; font-weight: 700; color: #374728; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem;">Key Benefits</h4>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${benefitsHTML}
          </ul>
        </div>
      </div>
      <div style="background: #FAF6F0; padding: 0.85rem 1rem; border-radius: 10px; border-left: 3.5px solid #374728; font-size: 0.8125rem; color: #4A5243; line-height: 1.5; margin-bottom: 0.5rem;">
        <strong style="color: #20241D; display: block; margin-bottom: 0.2rem;">Practical Care Info:</strong>
        ${item.practical}
      </div>
    `;
  }

  if (ctaLinkElem) {
    ctaLinkElem.textContent = item.ctaText;
    ctaLinkElem.setAttribute('onclick', `closeCornerDetailModal(); openBookingModal('${item.ctaService}'); return false;`);
  }

  modal.classList.add('active');
}

function closeCornerDetailModal() {
  const modal = document.getElementById('corner-details-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Helper to open booking modal dialog
function openBookingModal(serviceName) {
  const bookingModal = document.getElementById('booking-modal');
  const modalTitle = document.getElementById('modal-title-text');
  const serviceSelect = document.getElementById('service-type');

  if (bookingModal) {
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

    bookingModal.classList.add('active');
  } else {
    bookServiceWhatsApp(serviceName);
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

// Blog Navigation & Article View Switcher
function showBlogOverview() {
  const overviewView = document.getElementById('blog-overview-view');
  const articleView = document.getElementById('blog-article-view');
  
  if (overviewView && articleView) {
    articleView.style.display = 'none';
    overviewView.style.display = 'block';
    if (window.location.hash.startsWith('#article-')) {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function openBlogArticle(articleId) {
  const overviewView = document.getElementById('blog-overview-view');
  const articleView = document.getElementById('blog-article-view');
  const allArticles = document.querySelectorAll('.article-detail-container');

  if (!articleView || !overviewView) return;

  overviewView.style.display = 'none';
  articleView.style.display = 'block';

  allArticles.forEach(art => {
    art.style.display = 'none';
  });

  const targetArticle = document.getElementById(articleId);
  if (targetArticle) {
    targetArticle.style.display = 'block';
    window.location.hash = `article-${articleId.replace('article-', '')}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function filterBlogCategoryTab(btn, categoryName) {
  const filterBtns = document.querySelectorAll('.category-filter-btn');
  filterBtns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('.blog-grid-card, .blog-top-featured-card, .blog-editorial-feature-row');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category') || '';
    if (categoryName === 'All' || cardCat.toLowerCase() === categoryName.toLowerCase()) {
      card.style.display = card.classList.contains('blog-grid-card') ? 'flex' : 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}

function handleBlogHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;
  if (hash.startsWith('#article-')) {
    const rawId = hash.replace('#article-', '');
    openBlogArticle(`article-${rawId}`);
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

  const cards = document.querySelectorAll('.blog-grid-card, .blog-top-featured-card, .blog-editorial-feature-row');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (!categoryName || categoryName === 'All' || text.includes(categoryName.toLowerCase())) {
      card.style.display = card.classList.contains('blog-grid-card') ? 'flex' : 'grid';
    } else {
      card.style.display = 'none';
    }
  });
}

// Filter blog content by live query search
function filterBlogContent(query) {
  const cards = document.querySelectorAll('.blog-grid-card, .blog-top-featured-card, .blog-editorial-feature-row');
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(query)) {
      card.style.display = card.classList.contains('blog-grid-card') ? 'flex' : 'grid';
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

/**
 * DYNAMIC LUMINA WHATSAPP MESSAGE GENERATOR
 * Formats clean, professional customer enquiry WhatsApp messages for Lumina Cleaning Services.
 *
 * Template:
 * Hello Lumina Cleaning Services,
 *
 * I would like to enquire about your [SELECTED SERVICE] service.
 *
 * Customer Details:
 * Name: [CUSTOMER NAME]
 * Phone: [PHONE NUMBER]
 * Location: [SELECTED LOCATION]
 *
 * Kindly share the available options and pricing.
 *
 * Thank you.
 */
function generateLuminaWhatsAppMessage(serviceName, options = {}) {
  let mainService = serviceName ? serviceName.trim() : 'Cleaning';

  if (typeof options === 'string') {
    options = { rawOption: options.trim() };
  }

  let name = options && options.name ? options.name.trim() : '';
  let phone = options && options.phone ? options.phone.trim() : '';
  let location = options && options.location ? options.location.trim() : '';

  // Fallback to DOM elements if not explicitly in options
  if (!name && typeof document !== 'undefined' && document.getElementById('wa-name')) {
    name = document.getElementById('wa-name').value.trim();
  }
  if (!phone && typeof document !== 'undefined' && document.getElementById('wa-phone')) {
    phone = document.getElementById('wa-phone').value.trim();
  }
  if (!location && typeof document !== 'undefined' && document.getElementById('wa-location')) {
    location = document.getElementById('wa-location').value.trim();
  }

  // Handle sub-options from quick service card selections if passed
  if (options && typeof options === 'object') {
    const extra = options.propertySize || options.sofaType || options.commercialType || options.addonName || options.rawOption;
    if (extra && typeof extra === 'string' && !mainService.toLowerCase().includes(extra.toLowerCase())) {
      const cleanExtra = extra.replace(/add-on/i, '').replace(/cleaning/i, '').trim();
      if (cleanExtra) {
        mainService = `${mainService} (${cleanExtra})`;
      }
    }
  }

  // Clean trailing "service" or "services" to prevent duplicate words (e.g. "Deep Cleaning service service")
  let cleanService = mainService.replace(/\s+services?$/i, '').trim();
  if (!cleanService) {
    cleanService = 'Cleaning';
  }

  let message = `Hello Lumina Cleaning Services,\n\nI would like to enquire about your ${cleanService} service.`;

  if (name || phone || location) {
    message += `\n\nCustomer Details:`;
    if (name) message += `\nName: ${name}`;
    if (phone) message += `\nPhone: ${phone}`;
    if (location) message += `\nLocation: ${location}`;
  }

  message += `\n\nKindly share the available options and pricing.\n\nThank you.`;

  return message;
}

// Open Direct WhatsApp Chat
function openWhatsAppChat(customText) {
  const phone = '971586477660';
  const defaultText = `Hello Lumina Cleaning Services,\n\nI would like to enquire about your cleaning services.\n\nKindly share the available options and pricing.\n\nThank you.`;
  const textToSend = customText ? customText : defaultText;
  const message = encodeURIComponent(textToSend);
  const waUrl = `https://wa.me/${phone}?text=${message}`;
  window.open(waUrl, '_blank');
}

// Handle Contact Page 30-Second WhatsApp Form Submission
function handleWhatsAppEnquirySubmit() {
  const name = document.getElementById('wa-name') ? document.getElementById('wa-name').value.trim() : '';
  const phone = document.getElementById('wa-phone') ? document.getElementById('wa-phone').value.trim() : '';
  const location = document.getElementById('wa-location') ? document.getElementById('wa-location').value : 'Dubai, UAE';
  const service = document.getElementById('wa-service') ? document.getElementById('wa-service').value : 'Deep Cleaning';

  const msg = generateLuminaWhatsAppMessage(service, { name, phone, location });
  openWhatsAppChat(msg);
}

// Property size selection state & helper for Regular Home Cleaning
let currentSelectedPropertySize = 'Studio';

function selectPropertySize(btn, size) {
  currentSelectedPropertySize = size;
  const container = btn.closest('.property-size-grid');
  if (container) {
    container.querySelectorAll('.prop-chip').forEach(chip => chip.classList.remove('active'));
    btn.classList.add('active');
  }
}

function toggleRegularCleaningOptions(event) {
  const optionsDiv = document.getElementById('regular-home-options');
  if (optionsDiv) {
    const isHidden = optionsDiv.style.display === 'none' || !optionsDiv.style.display;
    optionsDiv.style.display = isHidden ? 'block' : 'none';
  }
}

function bookRegularCleaningWhatsApp() {
  const msg = generateLuminaWhatsAppMessage('Regular Home Cleaning', { propertySize: currentSelectedPropertySize });
  openWhatsAppChat(msg);
}

// Sofa type selection state & helper for Sofa & Upholstery Cleaning
let currentSelectedSofaType = '1 Seater';

function selectSofaType(btn, sofaType) {
  currentSelectedSofaType = sofaType;
  const container = btn.closest('.property-size-grid');
  if (container) {
    container.querySelectorAll('.prop-chip').forEach(chip => chip.classList.remove('active'));
    btn.classList.add('active');
  }
}

function toggleSofaCleaningOptions(event) {
  const optionsDiv = document.getElementById('sofa-upholstery-options');
  if (optionsDiv) {
    const isHidden = optionsDiv.style.display === 'none' || !optionsDiv.style.display;
    optionsDiv.style.display = isHidden ? 'block' : 'none';
  }
}

function bookSofaCleaningWhatsApp() {
  const msg = generateLuminaWhatsAppMessage('Sofa & Upholstery Cleaning', { sofaType: currentSelectedSofaType });
  openWhatsAppChat(msg);
}

function bookDeepCleaningWhatsApp(propertySize) {
  const size = propertySize || currentSelectedPropertySize || '2 BHK';
  const msg = generateLuminaWhatsAppMessage('Residential Deep Cleaning', { propertySize: size });
  openWhatsAppChat(msg);
}

function bookCommercialCleaningWhatsApp(commercialType) {
  const comm = commercialType || 'Office Cleaning';
  const msg = generateLuminaWhatsAppMessage('Commercial Cleaning', { commercialType: comm });
  openWhatsAppChat(msg);
}

function bookAddonWhatsApp(addonName) {
  const msg = generateLuminaWhatsAppMessage(addonName, { addonName: addonName });
  openWhatsAppChat(msg);
}

function bookServiceWhatsApp(serviceName, options) {
  const msg = generateLuminaWhatsAppMessage(serviceName, options);
  openWhatsAppChat(msg);
}

function toggleDeepCleaningServices(event) {
  const deepSection = document.getElementById('deep-cleaning-list');
  if (deepSection) {
    const isHidden = deepSection.style.display === 'none' || !deepSection.style.display;
    deepSection.style.display = isHidden ? 'block' : 'none';
    if (isHidden) {
      deepSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function toggleCommercialServicesOptions(event) {
  const optionsDiv = document.getElementById('commercial-services-options');
  if (optionsDiv) {
    const isHidden = optionsDiv.style.display === 'none' || !optionsDiv.style.display;
    optionsDiv.style.display = isHidden ? 'block' : 'none';
  }
}

function toggleAddOnServicesOptions(event) {
  const optionsDiv = document.getElementById('addon-services-options');
  if (optionsDiv) {
    const isHidden = optionsDiv.style.display === 'none' || !optionsDiv.style.display;
    optionsDiv.style.display = isHidden ? 'block' : 'none';
  }
}

// Hash navigation handler for Service cards & auto-expansions
function handleServiceHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const targetId = decodeURIComponent(hash.replace('#', ''));

  // Expandable cards handling
  if (targetId === 'residential-deep-clean') {
    const deepSection = document.getElementById('deep-cleaning-list');
    if (deepSection) deepSection.style.display = 'block';
  } else if (targetId === 'sofa-upholstery') {
    const sofaOptions = document.getElementById('sofa-upholstery-options');
    if (sofaOptions) sofaOptions.style.display = 'block';
  } else if (targetId === 'commercial' || targetId === 'office-cleaning') {
    const commercialOptions = document.getElementById('commercial-services-options');
    if (commercialOptions) commercialOptions.style.display = 'block';
  } else if (targetId === 'add-ons') {
    const addonOptions = document.getElementById('addon-services-options');
    if (addonOptions) addonOptions.style.display = 'block';
  } else if (targetId === 'regular-home-cleaning') {
    const regularOptions = document.getElementById('regular-home-options');
    if (regularOptions) regularOptions.style.display = 'block';
  }

  // Smooth scroll to target element
  const targetElem = document.getElementById(targetId);
  if (targetElem) {
    setTimeout(() => {
      targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  handleServiceHashNavigation();
  handleBlogHashNavigation();

  // Handle same-page clicking of services.html#... links
  document.querySelectorAll('a[href*="services.html#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const hash = href.substring(hashIndex);
        if (window.location.pathname.endsWith('services.html') || window.location.pathname === '/' || window.location.pathname === '') {
          e.preventDefault();
          if (window.location.hash !== hash) {
            window.location.hash = hash;
          } else {
            handleServiceHashNavigation();
          }
        }
      }
    });
  });
});

window.addEventListener('load', () => {
  handleServiceHashNavigation();
  handleBlogHashNavigation();
});

window.addEventListener('hashchange', () => {
  handleServiceHashNavigation();
  handleBlogHashNavigation();
});




