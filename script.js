/**
 * Broker VPN - JavaScript
 * Developer: Yeasin Ali
 * All counters start from 5000
 */

// ========================================
// Configuration
// ========================================
const BASE_COUNT = 5000; // শুরু 5000 থেকে

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking nav link
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========================================
    // Download Button - শুধু tracking, block না
    // ========================================
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Install count বাড়াও
            incrementInstallCount();
            
            // Button animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i><span>Downloading...</span>';
            this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // 3 সেকেন্ড পর আগের মত
            setTimeout(function() {
                downloadBtn.innerHTML = originalHTML;
                downloadBtn.style.background = 'linear-gradient(135deg, #4A90E2, #9B59B6)';
            }, 3000);
        });
    }

    // ========================================
    // Scroll Animation
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .stat-card, .screenshot-item').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ========================================
    // Image Error Handling
    // ========================================
    document.querySelectorAll('img').forEach(function(img) {
        img.onerror = function() {
            this.style.display = 'none';
        };
    });

});

// ========================================
// Particle Background
// ========================================
function createParticles() {
    const container = document.getElementById('particleCanvas');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// ========================================
// Counter Animation - 5000 থেকে শুরু
// ========================================
function animateCounter(element, startValue, endValue) {
    if (!element) return;
    
    let current = startValue;
    const increment = (endValue - startValue) / 80;
    const stepTime = 25;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= endValue) {
            current = endValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + '+';
    }, stepTime);
}

// ========================================
// Visitor Count - 5000 থেকে শুরু
// ========================================
function getVisitorCount() {
    let count = localStorage.getItem('brokerVpnVisitors');
    if (!count) {
        count = BASE_COUNT;
    } else {
        count = parseInt(count);
    }
    return count;
}

function incrementVisitorCount() {
    let count = getVisitorCount();
    count++;
    localStorage.setItem('brokerVpnVisitors', count);
    return count;
}

function displayVisitorCount() {
    const element = document.getElementById('visitorCount');
    if (!element) return;
    
    const count = incrementVisitorCount();
    // 5000 থেকে animate শুরু হবে
    animateCounter(element, BASE_COUNT, count);
    
    console.log('Visitors:', count);
}

// ========================================
// Install Count - 5000 থেকে শুরু
// ========================================
function getInstallCount() {
    let count = localStorage.getItem('brokerVpnInstalls');
    if (!count) {
        count = BASE_COUNT;
    } else {
        count = parseInt(count);
    }
    return count;
}

function incrementInstallCount() {
    let count = getInstallCount();
    count++;
    localStorage.setItem('brokerVpnInstalls', count);
    
    // Real-time update
    const element = document.getElementById('installCount');
    if (element) {
        element.textContent = count.toLocaleString() + '+';
    }
    
    console.log('Installs:', count);
    return count;
}

function displayInstallCount() {
    const element = document.getElementById('installCount');
    if (!element) return;
    
    const count = getInstallCount();
    // 5000 থেকে animate শুরু হবে
    animateCounter(element, BASE_COUNT, count);
}

// ========================================
// Initialize on Page Load
// ========================================
window.addEventListener('load', function() {
    // Particles তৈরি
    createParticles();
    
    // Visitor count দেখাও (5000 থেকে শুরু)
    displayVisitorCount();
    
    // Install count দেখাও (5000 থেকে শুরু)
    displayInstallCount();
    
    console.log('✅ Broker VPN Website Loaded!');
    console.log('Base Count:', BASE_COUNT);
});
