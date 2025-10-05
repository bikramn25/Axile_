// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .project-card, .hero-content, .about-content');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.btn-primary');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    // Set colors based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
        notification.style.color = 'white';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#3b82f6';
        notification.style.color = 'white';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #000000 !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.data-visualization');
    
    if (parallaxElement) {
        const speed = scrolled * 0.5;
        parallaxElement.style.transform = `translateY(${speed}px)`;
    }
});

// Chart animation on scroll
const chartObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartBars = entry.target.querySelectorAll('.chart-bar');
            chartBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animation = 'growUp 1.5s ease-out forwards';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        chartObserver.observe(chartContainer);
    }
});

// Typing effect for hero title
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('[data-target]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Circular Progress Animation
function animateCircularProgress() {
    const progressElements = document.querySelectorAll('.circular-progress');
    
    progressElements.forEach(element => {
        const percentage = element.getAttribute('data-percentage');
        const circle = element.querySelector('.progress-circle');
        const degrees = (percentage / 100) * 360;
        
        setTimeout(() => {
            circle.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, #e2e8f0 ${degrees}deg)`;
        }, 500);
    });
}

// Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// FAQ Toggle Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Enhanced Contact Form Handling
function initializeEnhancedContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS (you'll need to replace these with your actual EmailJS credentials)
        // For now, we'll use a fallback method
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation before submission
            const firstName = contactForm.querySelector('#firstName').value;
            const lastName = contactForm.querySelector('#lastName').value;
            const email = contactForm.querySelector('#email').value;
            const company = contactForm.querySelector('#company').value;
            const message = contactForm.querySelector('#message').value;
            const phone = contactForm.querySelector('#phone').value;
            const industry = contactForm.querySelector('#industry').value;
            const budget = contactForm.querySelector('#budget').value;
            
            // Basic validation
            if (!firstName || !lastName || !email || !company || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('.form-submit');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitButton.disabled = true;
            
            // Get selected services
            const selectedServices = [];
            const serviceCheckboxes = contactForm.querySelectorAll('input[name="services"]:checked');
            serviceCheckboxes.forEach(checkbox => {
                selectedServices.push(checkbox.value);
            });
            const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'None specified';
            
            // Create email content
            const emailContent = `
New contact form submission from Axile website:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company: ${company}
Industry: ${industry || 'Not specified'}
Budget: ${budget || 'Not specified'}
Services Interested In: ${servicesText}

Message:
${message}

---
Submitted on: ${new Date().toLocaleString()}
            `.trim();
            
            // For demonstration, we'll create mailto links for each recipient
            const recipients = [
                'admin@axile.net',
                'nepaliamar1998@gmail.com',
                'bikramn25@gmail.com'
            ];
            
            // Create mailto link with all recipients
            const subject = encodeURIComponent('New Contact Form Submission - Axile Website');
            const body = encodeURIComponent(emailContent);
            const mailtoLink = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
            
            // Try to open default email client
            try {
                window.location.href = mailtoLink;
                
                // Show success message after a short delay
                setTimeout(() => {
                    showNotification('Email client opened! Please send the email to complete your submission. We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                }, 1000);
                
            } catch (error) {
                console.error('Error opening email client:', error);
                
                // Fallback: Show the email content to copy
                const emailWindow = window.open('', '_blank');
                emailWindow.document.write(`
                    <html>
                        <head>
                            <title>Contact Form Submission</title>
                            <style>
                                body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
                                .email-content { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
                                .recipients { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0; }
                                button { background: #1e3a8a; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
                            </style>
                        </head>
                        <body>
                            <h2>Contact Form Submission</h2>
                            <p>Please copy the following information and send it to the recipients listed below:</p>
                            
                            <div class="recipients">
                                <strong>Send to:</strong><br>
                                ${recipients.join('<br>')}
                            </div>
                            
                            <div class="email-content">
                                <strong>Subject:</strong> New Contact Form Submission - Axile Website<br><br>
                                <pre>${emailContent}</pre>
                            </div>
                            
                            <button onclick="navigator.clipboard.writeText('${emailContent.replace(/'/g, "\\'")}')">Copy Email Content</button>
                            <button onclick="window.close()">Close</button>
                        </body>
                    </html>
                `);
                
                showNotification('Please copy the email content from the new window and send it manually.', 'info');
            }
            
            // Restore button state
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific animations based on element type
                if (entry.target.classList.contains('benefit-card') || 
                    entry.target.classList.contains('ai-stat-card')) {
                    animateCounters();
                }
                
                if (entry.target.classList.contains('ai-benefits')) {
                    animateCircularProgress();
                }
                
                if (entry.target.classList.contains('expertise-section')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .service-card, .project-card, .hero-content, .about-content,
        .benefit-card, .ai-stat-card, .industry-card, .team-member,
        .mv-card, .cert-item, .contact-method, .office-card,
        .ai-benefits, .expertise-section
    `);
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Custom Checkbox Styling
function initializeCustomCheckboxes() {
    const checkboxItems = document.querySelectorAll('.checkbox-item');
    
    checkboxItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const checkmark = item.querySelector('.checkmark');
        
        if (checkbox && checkmark) {
            checkbox.style.display = 'none'; // Hide default checkbox
            
            item.addEventListener('click', (e) => {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
    });
}

// Floating Elements Animation
function initializeFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            element.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 1000);
    });
}

// Neural Network Animation
function initializeNeuralNetwork() {
    const nodes = document.querySelectorAll('.neural-nodes .node');
    
    nodes.forEach((node, index) => {
        setInterval(() => {
            node.classList.toggle('active');
        }, 1000 + index * 200);
    });
}

// Page-specific initializations
function initializePageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'contact.html':
            initializeFAQ();
            initializeEnhancedContactForm();
            break;
        case 'about.html':
            animateSkillBars();
            break;
        case 'services.html':
            initializeNeuralNetwork();
            break;
        default:
            // Homepage specific animations
            animateCounters();
            animateCircularProgress();
            initializeFloatingElements();
            break;
    }
}

// Enhanced form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e2e8f0';
        }
    });
    
    return isValid;
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-in');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initializeScrollAnimations();
    initializeCustomCheckboxes();
    initializePageSpecificFeatures();
    
    // Add scroll listener for reveal animations
    window.addEventListener('scroll', debounce(revealOnScroll, 10));
    
    // Initialize counters on page load if visible
    setTimeout(() => {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && isElementInViewport(heroStats)) {
            animateCounters();
        }
    }, 1000);
});

// Utility function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced notification system with better styling
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set icon based on type
    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="${icon}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-family: 'Inter', sans-serif;
        backdrop-filter: blur(10px);
    `;
    
    // Set colors based on type
    const colors = {
        success: { bg: '#10b981', text: 'white' },
        error: { bg: '#ef4444', text: 'white' },
        warning: { bg: '#f59e0b', text: 'white' },
        info: { bg: '#3b82f6', text: 'white' }
    };
    
    const color = colors[type] || colors.info;
    notification.style.backgroundColor = color.bg;
    notification.style.color = color.text;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        margin-left: 10px;
        padding: 0;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', () => closeButton.style.opacity = '1');
    closeButton.addEventListener('mouseleave', () => closeButton.style.opacity = '0.8');
    
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification content styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 18px;
        opacity: 0.9;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
        line-height: 1.4;
    }
`;
document.head.appendChild(notificationStyles);

// Meeting Scheduler Functionality
let currentStep = 1;
let selectedMeetingType = null;
let selectedDate = null;
let selectedTime = null;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const meetingTypes = {
    consultation: { name: 'Free Consultation', duration: '30 minutes' },
    demo: { name: 'Product Demo', duration: '45 minutes' },
    strategy: { name: 'Strategy Session', duration: '60 minutes' }
};

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

function openScheduler() {
    document.getElementById('schedulerModal').style.display = 'block';
    currentStep = 1;
    showStep(1);
    generateCalendar();
}

function closeScheduler() {
    document.getElementById('schedulerModal').style.display = 'none';
    resetScheduler();
}

function resetScheduler() {
    currentStep = 1;
    selectedMeetingType = null;
    selectedDate = null;
    selectedTime = null;
    
    // Reset UI
    document.querySelectorAll('.meeting-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Reset form
    document.getElementById('meetingForm').reset();
    
    showStep(1);
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.scheduler-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    
    prevBtn.style.display = step > 1 ? 'block' : 'none';
    nextBtn.style.display = step < 4 ? 'block' : 'none';
    confirmBtn.style.display = step === 4 ? 'block' : 'none';
    
    // Update button text
    if (step === 2) {
        nextBtn.textContent = 'Continue';
    } else if (step === 3) {
        nextBtn.textContent = 'Review';
    } else {
        nextBtn.textContent = 'Next';
    }
}

function selectMeetingType(type) {
    selectedMeetingType = type;
    
    // Update UI
    document.querySelectorAll('.meeting-type-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.meeting-type-card').classList.add('selected');
}

function nextStep() {
    if (currentStep === 1 && !selectedMeetingType) {
        showNotification('Please select a meeting type.', 'error');
        return;
    }
    
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
        showNotification('Please select both date and time.', 'error');
        return;
    }
    
    if (currentStep === 3) {
        const form = document.getElementById('meetingForm');
        const name = form.querySelector('#meetingName').value;
        const email = form.querySelector('#meetingEmail').value;
        
        if (!name || !email) {
            showNotification('Please fill in your name and email.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        updateSummary();
    }
    
    currentStep++;
    showStep(currentStep);
}

function previousStep() {
    currentStep--;
    showStep(currentStep);
}

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthEl = document.getElementById('currentMonth');
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    currentMonthEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '0.5rem';
        dayHeader.style.color = 'var(--text-light)';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        
        const dayDate = new Date(currentYear, currentMonth, day);
        
        // Disable past dates
        if (dayDate < today.setHours(0, 0, 0, 0)) {
            dayEl.classList.add('disabled');
        } else {
            dayEl.addEventListener('click', () => selectDate(day));
        }
        
        calendarGrid.appendChild(dayEl);
    }
    
    generateTimeSlots();
}

function selectDate(day) {
    selectedDate = new Date(currentYear, currentMonth, day);
    
    // Update UI
    document.querySelectorAll('.calendar-day').forEach(dayEl => {
        dayEl.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    generateTimeSlots();
}

function generateTimeSlots() {
    const timeSlotsEl = document.getElementById('timeSlots');
    timeSlotsEl.innerHTML = '';
    
    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        
        // Randomly make some slots unavailable for demo
        if (Math.random() > 0.7) {
            timeSlot.classList.add('unavailable');
        } else {
            timeSlot.addEventListener('click', () => selectTime(time));
        }
        
        timeSlotsEl.appendChild(timeSlot);
    });
}

function selectTime(time) {
    selectedTime = time;
    
    // Update UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar();
}

function updateSummary() {
    const form = document.getElementById('meetingForm');
    const name = form.querySelector('#meetingName').value;
    const email = form.querySelector('#meetingEmail').value;
    
    document.getElementById('summaryDate').textContent = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('summaryTime').textContent = selectedTime;
    document.getElementById('summaryType').textContent = `${meetingTypes[selectedMeetingType].name} (${meetingTypes[selectedMeetingType].duration})`;
    document.getElementById('summaryEmail').textContent = email;
}

function confirmMeeting() {
    const form = document.getElementById('meetingForm');
    const formData = new FormData(form);
    
    // Create meeting details
    const meetingDetails = `
Meeting Request - Axile Consultation

Meeting Type: ${meetingTypes[selectedMeetingType].name} (${meetingTypes[selectedMeetingType].duration})
Date: ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${selectedTime}

Client Details:
Name: ${formData.get('name')}
Email: ${formData.get('email')}
Phone: ${formData.get('phone') || 'Not provided'}
Company: ${formData.get('company') || 'Not provided'}

Notes: ${formData.get('notes') || 'None'}

---
Requested on: ${new Date().toLocaleString()}
    `.trim();
    
    // Create mailto link
    const recipients = ['admin@axile.net', 'nepaliamar1998@gmail.com', 'bikramn25@gmail.com'];
    const subject = encodeURIComponent('Meeting Request - Axile Consultation');
    const body = encodeURIComponent(meetingDetails);
    const mailtoLink = `mailto:${recipients.join(',')}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message and close modal
    setTimeout(() => {
        showNotification('Meeting request sent! We\'ll confirm your appointment via email within 24 hours.', 'success');
        closeScheduler();
    }, 1000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('schedulerModal');
    if (event.target === modal) {
        closeScheduler();
    }
});