/**
 * Custom Header Component
 * Adds a responsive header with navigation to the math blog
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create and insert the header
  createHeader();
  
  // Handle scroll effects for the header
  handleHeaderScroll();
});

/**
 * Creates and inserts the custom header
 */
function createHeader() {
  // Create header element
  const header = document.createElement('header');
  header.id = 'main-header';
  header.className = 'site-header';
  
  // Create header content
  header.innerHTML = `
    <div class="header-container">
      <div class="logo">
        <a href="#" class="logo-link">
          <svg class="math-logo" width="40" height="40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="var(--primary-color)" />
            <text x="50" y="65" font-family="serif" font-size="50" fill="white" text-anchor="middle">∑</text>
          </svg>
          <span class="site-title">Math Explorations</span>
        </a>
      </div>
      <nav class="main-nav">
        <ul class="nav-list">
          <li><a href="#" class="nav-link">Home</a></li>
          <li><a href="#sylow-theorems" class="nav-link">Theorems</a></li>
          <li><a href="#applications" class="nav-link">Applications</a></li>
          <li><a href="#extras" class="nav-link">Extras</a></li>
        </ul>
      </nav>
      <button class="mobile-menu-toggle" aria-label="Toggle menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  `;
  
  // Add styles for the header
  const style = document.createElement('style');
  style.textContent = `
    .site-header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    @media (prefers-color-scheme: dark) {
      .site-header {
        background-color: rgba(26, 26, 46, 0.95);
      }
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--primary-color);
    }
    
    .logo-link:hover .math-logo circle {
      transform: scale(1.1);
    }
    
    .math-logo circle {
      transition: transform 0.3s ease;
      transform-origin: center;
    }
    
    .site-title {
      margin-left: 0.5rem;
      font-family: var(--header-font);
      font-weight: 600;
      font-size: 1.2rem;
    }
    
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .nav-list li {
      position: relative;
      margin-right: 20px;
    }
    
    .nav-link {
      display: block;
      padding: 0.5rem 1rem;
      color: var(--text-color);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease, transform 0.3s ease;
      position: relative;
    }
    
    .nav-list li::before {
      content: '•';
      position: absolute;
      top: 50%;
      right: -10px;
      transform: translateY(-50%);
      color: var(--accent-color);
      font-size: 1.2rem;
      opacity: 0.9;
      pointer-events: none;
      text-shadow: 0 0 3px rgba(231, 76, 60, 0.3);
    }
    
    .nav-list li:last-child::before {
      display: none;
    }
    
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      right: 1rem;
      height: 2px;
      background-color: var(--accent-color);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: center;
    }
    
    .nav-link:hover {
      color: var(--accent-color);
    }
    
    .nav-link:hover::after {
      transform: scaleX(1);
    }
    
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .bar {
      display: block;
      width: 25px;
      height: 3px;
      background-color: var(--text-color);
      margin: 5px 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
      .mobile-menu-toggle {
        display: block;
      }
      
      .main-nav {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        transition: clip-path 0.4s ease;
      }
      
      @media (prefers-color-scheme: dark) {
        .main-nav {
          background-color: rgba(26, 26, 46, 0.95);
        }
      }
      
      .main-nav.active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
      
      .nav-list {
        flex-direction: column;
        padding: 1rem 0;
      }
      
      .nav-list li::before {
        display: none;
      }
      
      .nav-link {
        padding: 1rem 2rem;
      }
      
      .mobile-menu-toggle.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      .mobile-menu-toggle.active .bar:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
    
    /* Header scroll effect */
    .site-header.scrolled {
      transform: translateY(-100%);
    }
    
    .site-header.visible {
      transform: translateY(0);
    }
    
    /* Add padding to body to account for fixed header */
    body {
      padding-top: 70px;
    }
    
    /* Adjust content container for header */
    .content-container {
      margin-top: 2rem;
    }
  `;
  
  // Add the style to the document head
  document.head.appendChild(style);
  
  // Insert the header at the beginning of the body
  document.body.insertBefore(header, document.body.firstChild);
  
  // Add event listener for mobile menu toggle
  const menuToggle = header.querySelector('.mobile-menu-toggle');
  const mainNav = header.querySelector('.main-nav');
  
  menuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // Add event listeners for nav links to close menu when clicked
  const navLinks = header.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

/**
 * Handles scroll effects for the header
 */
function handleHeaderScroll() {
  const header = document.getElementById('main-header');
  let lastScrollTop = 0;
  let scrollTimeout;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show/hide header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down and not at the top
      header.classList.add('scrolled');
      header.classList.remove('visible');
    } else {
      // Scrolling up or at the top
      header.classList.remove('scrolled');
      header.classList.add('visible');
    }
    
    lastScrollTop = scrollTop;
    
    // Add box shadow when not at the top
    if (scrollTop > 10) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    // Clear the timeout if it exists
    clearTimeout(scrollTimeout);
    
    // Set a timeout to show the header after scrolling stops
    scrollTimeout = setTimeout(function() {
      header.classList.remove('scrolled');
      header.classList.add('visible');
    }, 1000);
  });
}