/**
 * Theme Switcher for Math Blog
 * Allows users to toggle between light and dark mode
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create theme switcher button
  createThemeSwitcher();
  
  // Check for saved theme preference or respect OS preference
  initTheme();
});

/**
 * Creates the theme switcher button and adds it to the page
 */
function createThemeSwitcher() {
  const switcher = document.createElement('button');
  switcher.id = 'theme-switcher';
  switcher.innerHTML = '<span>🌓</span>';
  switcher.setAttribute('aria-label', 'Toggle dark/light mode');
  switcher.setAttribute('title', 'Toggle dark/light mode');
  
  // Style the button
  switcher.style.position = 'fixed';
  switcher.style.bottom = '20px';
  switcher.style.right = '20px';
  switcher.style.width = '50px';
  switcher.style.height = '50px';
  switcher.style.borderRadius = '50%';
  switcher.style.backgroundColor = 'var(--primary-color)';
  switcher.style.color = 'white';
  switcher.style.border = 'none';
  switcher.style.fontSize = '1.5rem';
  switcher.style.cursor = 'pointer';
  switcher.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  switcher.style.zIndex = '1000';
  switcher.style.display = 'flex';
  switcher.style.alignItems = 'center';
  switcher.style.justifyContent = 'center';
  switcher.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
  
  // Add hover effect
  switcher.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
  });
  
  switcher.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
  
  // Add click event to toggle theme
  switcher.addEventListener('click', function() {
    toggleTheme();
  });
  
  // Add to document
  document.body.appendChild(switcher);
}

/**
 * Initializes the theme based on saved preference or OS preference
 */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeColors('dark');
  } else if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeColors('light');
  } else {
    // If no saved preference, check OS preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    updateThemeColors(prefersDark ? 'dark' : 'light');
  }
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Save preference
  localStorage.setItem('theme', newTheme);
  
  // Apply theme
  document.documentElement.setAttribute('data-theme', newTheme);
  updateThemeColors(newTheme);
  
  // Add transition effect to body
  document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  
  // Animate theme change
  const switcher = document.getElementById('theme-switcher');
  switcher.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    switcher.style.transform = 'rotate(0)';
  }, 500);
}

/**
 * Updates the CSS variables for the selected theme
 */
function updateThemeColors(theme) {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.style.setProperty('--text-color', '#e0e0e0');
    root.style.setProperty('--bg-color', '#1a1a2e');
    root.style.setProperty('--secondary-color', '#16213e');
    root.style.setProperty('--primary-color', '#4a6fa5');
  } else {
    root.style.setProperty('--text-color', '#333');
    root.style.setProperty('--bg-color', '#f9f9f9');
    root.style.setProperty('--secondary-color', '#2c3e50');
    root.style.setProperty('--primary-color', '#3a5f8c');
  }
}