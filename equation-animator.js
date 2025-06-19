/**
 * Equation Animator
 * Adds visual effects and animations to mathematical equations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Wait for MathJax to render equations
  setTimeout(initEquationAnimations, 1500);
});

/**
 * Initialize animations for equations
 */
function initEquationAnimations() {
  // Add highlight effect to inline math
  enhanceInlineMath();
  
  // Add special effects to display math
  enhanceDisplayMath();
  
  // Add interactive hover effects
  addEquationInteractivity();
}

/**
 * Enhances inline math elements with subtle animations
 */
function enhanceInlineMath() {
  const inlineMath = document.querySelectorAll('.mathjax-inline, .MathJax');
  
  inlineMath.forEach((math, index) => {
    // Add custom class for styling
    math.classList.add('enhanced-math');
    
    // Add subtle entrance animation with delay based on position
    math.style.opacity = '0';
    math.style.transform = 'translateY(10px)';
    math.style.transition = 'opacity 0.5s ease, transform 0.5s ease, color 0.3s ease';
    
    // Improve visibility in dark mode
    math.style.textShadow = '0 0 1px rgba(255, 255, 255, 0.3)';
    
    // Stagger the animations
    setTimeout(() => {
      math.style.opacity = '1';
      math.style.transform = 'translateY(0)';
    }, 100 + (index % 5) * 100);
    
    // Add data attribute for potential use in other effects
    math.setAttribute('data-math-id', `math-${index}`);
  });
}

/**
 * Enhances display math (equations) with more pronounced animations
 */
function enhanceDisplayMath() {
  const displayMath = document.querySelectorAll('.math-display, .MathJax_Display');
  
  displayMath.forEach((math, index) => {
    // Add custom class and styling
    math.classList.add('enhanced-display-math');
    math.style.position = 'relative';
    
    // Create a background element for the equation
    const background = document.createElement('div');
    background.classList.add('equation-background');
    background.style.position = 'absolute';
    background.style.top = '0';
    background.style.left = '0';
    background.style.width = '100%';
    background.style.height = '100%';
    background.style.backgroundColor = 'rgba(93, 169, 233, 0.15)';
    background.style.borderRadius = '4px';
    background.style.transform = 'scaleX(0)';
    background.style.transformOrigin = 'left';
    background.style.transition = 'transform 0.8s ease';
    background.style.zIndex = '-1';
    background.style.boxShadow = '0 0 10px rgba(93, 169, 233, 0.1)';
    
    // Insert the background before the math content
    if (math.firstChild) {
      math.insertBefore(background, math.firstChild);
    } else {
      math.appendChild(background);
    }
    
    // Create an observer to animate when the equation comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate the background
          setTimeout(() => {
            background.style.transform = 'scaleX(1)';
          }, 200);
          
          // Animate the equation parts if possible
          const mathElements = math.querySelectorAll('.MathJax_SVG_Display g');
          mathElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transition = `opacity 0.5s ease ${i * 0.1}s`;
            setTimeout(() => {
              el.style.opacity = '1';
            }, 500 + i * 100);
          });
          
          // Stop observing after animation
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(math);
  });
}

/**
 * Adds interactive hover effects to equations
 */
function addEquationInteractivity() {
  // Add hover effect to all math elements
  const allMath = document.querySelectorAll('.enhanced-math, .enhanced-display-math');
  
  allMath.forEach(math => {
    math.addEventListener('mouseenter', function() {
      // Add a more visible glow effect
      this.style.boxShadow = '0 0 15px rgba(93, 169, 233, 0.5)';
      this.style.color = 'var(--math-accent)';
      this.style.textShadow = '0 0 3px rgba(255, 255, 255, 0.3)';
    });
    
    math.addEventListener('mouseleave', function() {
      this.style.boxShadow = '';
      this.style.color = '';
      this.style.textShadow = '0 0 1px rgba(255, 255, 255, 0.3)';
    });
    
    // Add click effect for display math
    if (math.classList.contains('enhanced-display-math')) {
      math.addEventListener('click', function() {
        // Create a ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('math-ripple');
        ripple.style.position = 'absolute';
        ripple.style.top = '50%';
        ripple.style.left = '50%';
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'var(--accent-color)';
        ripple.style.opacity = '0.6';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        
        this.appendChild(ripple);
        
        // Animate the ripple
        setTimeout(() => {
          ripple.style.transform = 'translate(-50%, -50%) scale(20)';
          ripple.style.opacity = '0';
        }, 10);
        
        // Remove the ripple after animation
        setTimeout(() => {
          ripple.remove();
        }, 800);
      });
    }
  });
}

// Add CSS variables for RGB versions of colors for opacity control
document.addEventListener('DOMContentLoaded', function() {
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --primary-color-rgb: 58, 95, 140;
      --accent-color-rgb: 231, 76, 60;
      --math-accent-rgb: 41, 128, 185;
    }
    
    @media (prefers-color-scheme: dark) {
      :root {
        --primary-color-rgb: 74, 111, 165;
        --math-accent-rgb: 52, 152, 219;
      }
    }
    
    .enhanced-math {
      position: relative;
      padding: 0 2px;
      border-radius: 2px;
      transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    }
    
    .enhanced-math:hover {
      transform: scale(1.05);
    }
    
    .enhanced-display-math {
      padding: 1em;
      margin: 1.5em 0;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .enhanced-display-math:hover {
      transform: scale(1.02);
    }
  `;
  
  document.head.appendChild(style);
});