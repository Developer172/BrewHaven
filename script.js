// Handle page loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    setTimeout(function() {
        loader.classList.add('fade-out');
    }, 1000);
});

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle with improved accessibility
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Add ARIA attributes for accessibility
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    
    hamburger.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        
        // Prevent background scrolling when menu is open
        if (isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a nav link with improved touch feedback
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                // Add small delay for better touch feedback
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    body.style.overflow = '';
                }, 100);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });

    // Sticky Header and Scroll to Top Button
    const header = document.querySelector('header');
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        // Handle sticky header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Handle scroll to top button visibility
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Menu Category Switching
    const menuCategories = document.querySelectorAll('.menu-category');
    const coffeeItems = document.getElementById('coffee-items');
    const teaItems = document.getElementById('tea-items');
    const pastriesItems = document.getElementById('pastries-items');
    
    menuCategories.forEach(category => {
        category.addEventListener('click', () => {
            // Remove active class from all categories
            menuCategories.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            category.classList.add('active');

            // Get the selected category and show the corresponding items
            const selectedCategory = category.getAttribute('data-category');
            console.log(`Selected category: ${selectedCategory}`);
            
            // Hide all menu items first
            coffeeItems.style.display = 'none';
            teaItems.style.display = 'none';
            pastriesItems.style.display = 'none';
            
            // Show the selected category items
            if (selectedCategory === 'coffee') {
                coffeeItems.style.display = 'grid';
            } else if (selectedCategory === 'tea') {
                teaItems.style.display = 'grid';
            } else if (selectedCategory === 'pastries') {
                pastriesItems.style.display = 'grid';
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});