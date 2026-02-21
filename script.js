 * Broker VPN - JavaScript
 * Developer: Yeasin Ali
 * Description: All interactive features for Broker VPN website
 */

// ========================================
// Mobile Menu Toggle
// ========================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========================================
// Particle Background Animation
// ========================================
function createParticles() {
    const container = document.getElementById('particleCanvas');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
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
function animateCounter(element, target) {
    let current = 5000;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString() + '+';
    }, 20);
}

// ========================================
// APK Information Detection
// ========================================
async function getAPKInfo() {
    try {
        // Replace these with your actual APK details
        const appSize = '12.5 MB';
        const appVersion = 'v1.2.0';
        
        // Update UI
        document.getElementById('appSize').textContent = appSize;
        document.getElementById('appVersion').textContent = appVersion;
        
        // Store APK filename globally
        window.APK_FILENAME = 'broker-vpn.apk';
        
    } catch (error) {
        console.error('Error loading APK info:', error);
        document.getElementById('appSize').textContent = '12.5 MB';
        document.getElementById('appVersion').textContent = 'v1.2.0';
    }
}

// ========================================
// Visitor Tracking
// ========================================
function trackVisitor() {
    let visitors = localStorage.getItem('brokerVpnVisitors');
    
    if (!visitors) {
        visitors = 5000;
    } else {
        visitors = parseInt(visitors) + 1;
    }
    
    localStorage.setItem('brokerVpnVisitors', visitors);
    animateCounter(document.getElementById('visitorCount'), visitors);
}

// ========================================
// Install Tracking
// ========================================
function trackInstall() {
    let installs = localStorage.getItem('brokerVpnInstalls');
    
    if (!installs) {
        installs = 5000;
    } else {
        installs = parseInt(installs) + 1;
    }
    
    localStorage.setItem('brokerVpnInstalls', installs);
    
    // Update counter display
    const installElement = document.getElementById('installCount');
    installElement.textContent = parseInt(installs).toLocaleString() + '+';
}

// ========================================
// Download Button Handler
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Track install
        trackInstall();
        
        // APK file path
        const apkFileName = window.APK_FILENAME || 'broker-vpn.apk';
        const apkPath = 'apk/' + apkFileName;
        
        // Create temporary download link
        const link = document.createElement('a');
        link.href = apkPath;
        link.download = apkFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Update button text
        const originalHTML = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i><span>Downloading...</span>';
        this.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            this.innerHTML = originalHTML;
            this.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--primary-purple))';
        }, 3000);
    });
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Scroll Animation Observer
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .screenshot-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// Image Error Handling
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.onerror = function() {
            console.warn('Image failed to load:', this.src);
            this.style.display = 'none';
        };
    });
});

// ========================================
// Initialize on Page Load
// ========================================
window.addEventListener('load', function() {
    // Create animated particles
    createParticles();
    
    // Track visitor
    trackVisitor();
    
    // Get APK information
    getAPKInfo();
    
    // Initialize install counter (don't increment on page load)
    const installs = parseInt(localStorage.getItem('brokerVpnInstalls')) || 5000;
    animateCounter(document.getElementById('installCount'), installs);
    
    console.log('Broker VPN Website Loaded Successfully! 🚀');

});
