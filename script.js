/*
   Script.js for Kaleem-Ullah Sandhu's Portfolio
   Author: Manus AI
   Date: June 1, 2025
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations and interactive elements
    initAnimations();
    initNavigation();
    initSkillBars();
    initCertificationsSlider();
    initContactForm();
    initBackToTop();
    
    // Update the download link for the resume
    updateResumeDownloadLink();
});

// Initialize animations for elements that should animate on page load
function initAnimations() {
    // Animate elements with the 'animate-on-load' class
    const animateOnLoadElements = document.querySelectorAll('.animate-on-load');
    
    setTimeout(() => {
        animateOnLoadElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }, index * 200); // Stagger the animations
        });
    }, 500);
    
    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    
    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
}

// Initialize navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Smooth scroll to section when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize skill bars animation
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = `${level}%`;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillLevels.forEach(skill => {
        observer.observe(skill);
    });
}

// Initialize certifications slider
function initCertificationsSlider() {
    const certContainer = document.querySelector('.cert-container');
    const prevBtn = document.querySelector('.cert-prev');
    const nextBtn = document.querySelector('.cert-next');
    const certItems = document.querySelectorAll('.cert-item');
    
    if (!certContainer || !prevBtn || !nextBtn || certItems.length === 0) return;
    
    let currentIndex = 0;
    let itemWidth = certItems[0].offsetWidth + parseInt(window.getComputedStyle(certItems[0]).marginRight);
    let itemsPerView = Math.floor(certContainer.offsetWidth / itemWidth);
    let maxIndex = certItems.length - itemsPerView;
    
    // Update values on window resize
    window.addEventListener('resize', () => {
        itemWidth = certItems[0].offsetWidth + parseInt(window.getComputedStyle(certItems[0]).marginRight);
        itemsPerView = Math.floor(certContainer.offsetWidth / itemWidth);
        maxIndex = Math.max(0, certItems.length - itemsPerView);
        
        // Reset position if current index is out of bounds
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
            updateSliderPosition();
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });
    
    // Update slider position
    function updateSliderPosition() {
        certContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Initialize slider position
    updateSliderPosition();
}

// Initialize contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you for your message, ${name}! Kaleem-Ullah will get back to you soon.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Initialize back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Update the resume download link to use the correct path
function updateResumeDownloadLink() {
    const downloadBtn = document.getElementById('download-resume');
    
    if (downloadBtn) {
        // Set the correct filename for download attribute
        downloadBtn.setAttribute('download', 'Resume-Kaleem-Ullah-Sandhu.pdf');
    }
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrollPosition = window.scrollY;
    
    if (hero && scrollPosition < hero.offsetHeight) {
        hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
});
