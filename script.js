// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Basic validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      // Simulate form submission (frontend only)
      showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
      contactForm.reset();
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = 
      'position: fixed;' +
      'bottom: 24px;' +
      'right: 24px;' +
      'padding: 16px 24px;' +
      'border-radius: 8px;' +
      'font-size: 14px;' +
      'font-weight: 500;' +
      'z-index: 9999;' +
      'animation: slideIn 0.3s ease;' +
      'max-width: 90%;' +
      'box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);';

    if (type === 'success') {
      notification.style.backgroundColor = '#059669';
      notification.style.color = '#ffffff';
    } else {
      notification.style.backgroundColor = '#dc2626';
      notification.style.color = '#ffffff';
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(function() {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(function() {
        notification.remove();
      }, 300);
    }, 4000);
  }

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = 
    '@keyframes slideIn {' +
    '  from { transform: translateX(100%); opacity: 0; }' +
    '  to { transform: translateX(0); opacity: 1; }' +
    '}' +
    '@keyframes slideOut {' +
    '  from { transform: translateX(0); opacity: 1; }' +
    '  to { transform: translateX(100%); opacity: 0; }' +
    '}';
  document.head.appendChild(style);

  // Smooth scroll for anchor links (fallback for browsers that don't support CSS scroll-behavior)
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
