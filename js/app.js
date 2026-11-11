/**
 * Playwright HTML Report Theme - Portfolio Interactions for Mikiyas Sisay
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccordion();
  initFilterTabs();
  initSearchFilter();
  initEmailAction();
});

/* ==========================================================================
   Accordion Trace Toggles
   ========================================================================== */
function initAccordion() {
  const testButtons = document.querySelectorAll('.test-button');

  testButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.test-item');
      if (!item) return;

      const isExpanded = item.classList.contains('expanded');
      item.classList.toggle('expanded');
      button.setAttribute('aria-expanded', !isExpanded);
    });
  });
}

/* ==========================================================================
   Category Filter Tabs
   ========================================================================== */
function initFilterTabs() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const testItems = document.querySelectorAll('.test-item');
  const specSuites = document.querySelectorAll('.spec-suite');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-filter');

      // Update active tab state
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter items
      testItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      // Hide empty suites
      specSuites.forEach(suite => {
        const visibleItems = suite.querySelectorAll('.test-item:not([style*="display: none"])');
        if (visibleItems.length === 0) {
          suite.style.display = 'none';
        } else {
          suite.style.display = '';
          const passBadge = suite.querySelector('.suite-pass-status');
          if (passBadge) {
            passBadge.textContent = `${visibleItems.length} passed`;
          }
        }
      });
    });
  });
}

/* ==========================================================================
   Live Search Filter
   ========================================================================== */
function initSearchFilter() {
  const searchInput = document.getElementById('filterInput');
  const testItems = document.querySelectorAll('.test-item');
  const specSuites = document.querySelectorAll('.spec-suite');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    testItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });

    // Toggle suite visibility
    specSuites.forEach(suite => {
      const visibleItems = suite.querySelectorAll('.test-item:not([style*="display: none"])');
      if (visibleItems.length === 0) {
        suite.style.display = 'none';
      } else {
        suite.style.display = '';
        const passBadge = suite.querySelector('.suite-pass-status');
        if (passBadge) {
          passBadge.textContent = `${visibleItems.length} passed`;
        }
      }
    });
  });
}

/* ==========================================================================
   Email Action & Toast
   ========================================================================== */
function initEmailAction() {
  const emailBtns = document.querySelectorAll('.btn-email-action');
  const email = 'mikiyassisay009@gmail.com';

  emailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast(`Copied ${email} to clipboard!`);
        }).catch(() => {
          window.location.href = `mailto:${email}`;
        });
      } else {
        window.location.href = `mailto:${email}`;
      }
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2ead33" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
