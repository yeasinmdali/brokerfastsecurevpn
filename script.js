/**
 * Broker VPN - JavaScript with Firebase
 * Developer: Yeasin Ali
 * Real-time global counter
 */

// ========================================
// Configuration
// ========================================
const BASE_COUNT = 5000;

// ========================================
// Wait for Firebase to load
// ========================================
function waitForFirebase(callback) {
    const checkFirebase = setInterval(function() {
        if (window.firebaseDB) {
            clearInterval(checkFirebase);
            callback();
        }
    }, 100);
}

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
    // Download Button Handler
    // ========================================
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Install count বাড়াও
            incrementInstalls();
            
            // Button animation
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i><span>Downloading...</span>';
            this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
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
// Counter Animation
// ========================================
function animateCounter(element, endValue) {
    if (!element) return;
    
    let current = 0;
    const increment = endValue / 80;
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
// Firebase: Visitor Count
// ========================================
function initVisitorCount() {
    const visitorRef = window.firebaseRef(window.firebaseDB, 'stats/visitors');
    
    // Real-time listener
    window.firebaseOnValue(visitorRef, function(snapshot) {
        let count = snapshot.val();
        
        if (count === null) {
            window.firebaseSet(visitorRef, BASE_COUNT);
            count = BASE_COUNT;
        }
        
        const element = document.getElementById('visitorCount');
        if (element) {
            animateCounter(element, count);
        }
        
        console.log('👥 Visitors:', count);
    });
    
    // Increment once per session
    if (!sessionStorage.getItem('hasVisited')) {
        window.firebaseTransaction(visitorRef, function(currentCount) {
            return (currentCount || BASE_COUNT) + 1;
        });
        sessionStorage.setItem('hasVisited', 'true');
    }
}

// ========================================
// Firebase: Install Count
// ========================================
function initInstallCount() {
    const installRef = window.firebaseRef(window.firebaseDB, 'stats/installs');
    
    // Real-time listener
    window.firebaseOnValue(installRef, function(snapshot) {
        let count = snapshot.val();
        
        if (count === null) {
            window.firebaseSet(installRef, BASE_COUNT);
            count = BASE_COUNT;
        }
        
        const element = document.getElementById('installCount');
        if (element) {
            animateCounter(element, count);
        }
        
        console.log('📥 Installs:', count);
    });
}

function incrementInstalls() {
    const installRef = window.firebaseRef(window.firebaseDB, 'stats/installs');
    
    window.firebaseTransaction(installRef, function(currentCount) {
        return (currentCount || BASE_COUNT) + 1;
    });
    
    console.log('✅ Install count increased!');
}

// ========================================
// Initialize Everything
// ========================================
window.addEventListener('load', function() {
    createParticles();
    
    // Wait for Firebase then start counters
    waitForFirebase(function() {
        initVisitorCount();
        initInstallCount();
        console.log('✅ Broker VPN Website Loaded!');
        console.log('🔥 Firebase Real-time counters active!');
    });
});
