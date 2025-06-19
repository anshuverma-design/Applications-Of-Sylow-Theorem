/**
 * Math Blog Animations and Enhancements
 * Adds interactive math-themed animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations and enhancements
  initMathSymbols();
  wrapContent();
  enhanceEquations();
  addScrollEffects();
  addHoverEffects();
  initParticleBackground();
  addSmoothScrolling();
});

/**
 * Creates floating math symbols in the background
 */
function initMathSymbols() {
  const symbols = ['∫', '∑', '∂', '∞', 'π', '√', '∆', 'θ', 'λ', 'Ω', '∇', '∀', '∃', '∈', '⊂', '⊆'];
  const container = document.body;
  
  for (let i = 0; i < 20; i++) {
    const symbol = document.createElement('div');
    symbol.className = 'math-symbol';
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.left = `${Math.random() * 100}vw`;
    symbol.style.top = `${Math.random() * 100}vh`;
    symbol.style.animationDelay = `${Math.random() * 20}s`;
    symbol.style.animationDuration = `${20 + Math.random() * 40}s`;
    symbol.style.opacity = `${0.2 + Math.random() * 0.15}`;
    symbol.style.fontSize = `${1 + Math.random() * 2}rem`;
    container.appendChild(symbol);
  }
}

/**
 * Wraps the content in a container for styling
 */
function wrapContent() {
  // Check if content is already wrapped
  if (!document.querySelector('.content-container')) {
    const content = document.body.innerHTML;
    document.body.innerHTML = `<div class="content-container">${content}</div>`;
  }
}

/**
 * Enhances math equations with hover effects
 */
function enhanceEquations() {
  // Add hover effects to MathJax equations
  setTimeout(() => {
    const mathElements = document.querySelectorAll('.mathjax-inline, .MathJax');
    mathElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
      });
      el.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }, 1000); // Wait for MathJax to render
}

/**
 * Adds scroll-based animations to elements
 */
function addScrollEffects() {
  // Reveal elements on scroll
  const sections = document.querySelectorAll('h3, h4, .tableofcontents, div.maketitle');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
  });
}

/**
 * Adds hover effects to various elements
 */
function addHoverEffects() {
  // Add hover effect to links
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = 'var(--accent-color)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  });
  
  // Add hover effect to headings
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
  headings.forEach(heading => {
    heading.addEventListener('mouseenter', function() {
      this.style.transform = 'translateX(5px)';
    });
    heading.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/**
 * Creates an animated particle background with math-themed shapes
 */
function initParticleBackground() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-2';
  canvas.style.opacity = '0.4';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Resize canvas when window is resized
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  // Create particles
  const particles = [];
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      color: 'rgba(58, 95, 140, 0.2)',
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      type: Math.floor(Math.random() * 4) // 0: circle, 1: square, 2: triangle, 3: plus
    });
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      
      // Draw particle based on type
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      
      switch(particle.type) {
        case 0: // Circle
          ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
          break;
        case 1: // Square
          ctx.rect(particle.x - particle.radius, particle.y - particle.radius, 
                  particle.radius * 4, particle.radius * 4);
          break;
        case 2: // Triangle
          ctx.moveTo(particle.x, particle.y - particle.radius * 2);
          ctx.lineTo(particle.x + particle.radius * 2, particle.y + particle.radius * 2);
          ctx.lineTo(particle.x - particle.radius * 2, particle.y + particle.radius * 2);
          break;
        case 3: // Plus
          ctx.moveTo(particle.x - particle.radius * 2, particle.y);
          ctx.lineTo(particle.x + particle.radius * 2, particle.y);
          ctx.moveTo(particle.x, particle.y - particle.radius * 2);
          ctx.lineTo(particle.x, particle.y + particle.radius * 2);
          ctx.lineWidth = particle.radius;
          ctx.strokeStyle = particle.color;
          ctx.stroke();
          return; // Skip the fill for plus signs
      }
      
      ctx.fill();
    });
  }
  
  animate();
}

/**
 * Adds smooth scrolling to anchor links
 */
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    });
  });
}