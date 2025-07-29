document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

let mobileMenuInitialized = false;

// Function to open the mobile menu
function openMenu() {
  navLinks.classList.add('active');
  mobileMenuBtn.classList.add('active');
  mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
  document.body.style.overflow = 'hidden';
}

// Function to close the mobile menu
function closeMenu() {
  navLinks.classList.remove('active');
  mobileMenuBtn.classList.remove('active');
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  document.body.style.overflow = '';
}

// Setup mobile menu functionality (only once)
function setupMobileMenu() {
  if (mobileMenuInitialized) return;
  mobileMenuInitialized = true;

  // Toggle menu on button click
  mobileMenuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    navLinks.classList.contains('active') ? closeMenu() : openMenu();
  });

  // Close menu when clicking on nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside the nav
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Initial check on page load
if (window.innerWidth <= 768) {
  setupMobileMenu();
}

// Handle window resizing
window.addEventListener('resize', function () {
  if (window.innerWidth <= 768) {
    setupMobileMenu();
  } else {
    // Reset styles on larger screens
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';

    navItems.forEach(item => {
      item.style.opacity = '';
      item.style.transform = '';
      item.style.transitionDelay = '';
    });

    mobileMenuInitialized = false;
  }
});

  
  // Sticky Navbar on Scroll
  const navbar = document.querySelector('.navbar');
  const logo = document.querySelector('.logo');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animate Elements on Scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .service-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };
  
  // Set initial state
  document.querySelectorAll('.feature-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run on load and scroll
  animateOnScroll();
  window.addEventListener('scroll', animateOnScroll);
  
  // Service Filtering (for services page)
  if (document.querySelector('.service-filter')) {
    const filterButtons = document.querySelectorAll('.service-filter button');
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Initialize - show all services by default
    serviceCards.forEach(card => {
      card.style.display = 'block';
    });
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => {
          btn.classList.remove('active');
          // Reset all category buttons to secondary state
          if (btn.classList.contains('btn-secondary')) {
            btn.classList.add('btn-secondary');
          }
        });
        
        // Set clicked button as active
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter services
        serviceCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
          }
        });
      });
    });
  }
  
  // Interactive Map (placeholder for future implementation)
  if (document.getElementById('rnr-map')) {
    console.log('Map would be initialized here with a library like Leaflet or Google Maps');
  }
  
  // Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const nameInput = this.querySelector('input[name="name"]');
      const emailInput = this.querySelector('input[name="email"]');
      const messageInput = this.querySelector('textarea[name="message"]');
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Please enter your name');
        isValid = false;
      }
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      }
      
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Please enter your message');
        isValid = false;
      }
      
      if (isValid) {
        // Form is valid - would typically send to server here
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
      }
    });
    
    function showError(input, message) {
      const formGroup = input.closest('.form-group');
      const errorElement = formGroup.querySelector('.error-message') || 
        document.createElement('div');
      
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      
      if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
      }
      
      input.classList.add('error');
    }
    
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
  // Tracking Page Functionality
if (document.getElementById('trackingForm')) {
  const trackingForm = document.getElementById('trackingForm');
  const trackingResult = document.getElementById('trackingResult');
  const noResults = document.getElementById('noResults');
  
  trackingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const trackingNumber = document.getElementById('trackingNumber').value.trim();
    
    // Hide both result sections initially
    trackingResult.classList.add('hidden');
    noResults.classList.add('hidden');
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (trackingNumber.toUpperCase().startsWith('RNR')) {
        // Display tracking info
        document.getElementById('displayTrackingNumber').textContent = trackingNumber;
        trackingResult.classList.remove('hidden');
        
        // Animate progress bar
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.width = '50%';
      } else {
        // Show no results message
        noResults.classList.remove('hidden');
      }
    }, 800);
  });
    // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          contactForm.classList.add('hidden');
          formSuccess.classList.remove('hidden');
          contactForm.reset();
          
          // Scroll to success message
          formSuccess.scrollIntoView({ behavior: 'smooth' });
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        alert('There was a problem sending your message. Please try again or contact us directly.');
        console.error('Error:', error);
      }
    });
  }
}
});