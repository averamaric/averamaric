// ============================================
// 1. INICIALIZACIÓN DE AOS (ANIMACIONES)
// ============================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ============================================
// 2. SLIDER AUTOMÁTICO
// ============================================
const sliderWrapper = document.getElementById('sliderWrapper');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;
let slideInterval;

function moveToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

function startSlider() {
    slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 5000);
}

function resetInterval() {
    clearInterval(slideInterval);
    startSlider();
}

// Event listeners para los dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        moveToSlide(i);
        resetInterval();
    });
});

// Pausar slider al hacer hover
sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderWrapper.addEventListener('mouseleave', startSlider);

// Iniciar slider
startSlider();

// ============================================
// 3. PARALLAX MEJORADO
// ============================================
const parallaxImg = document.querySelector('.parallax-img');
const heroSection = document.getElementById('hero');

function updateParallax() {
    if (!parallaxImg || !heroSection) return;
    
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    if (scrollPosition <= heroHeight) {
        const translateY = scrollPosition * 0.4;
        parallaxImg.style.transform = `scale(1.1) translateY(${translateY}px)`;
    }
}

// ============================================
// 4. LÍNEA DORADA
// ============================================
const goldLine = document.getElementById('connectorLine');
const aboutSection = document.getElementById('about');

function updateGoldLine() {
    if (!goldLine || !heroSection || !aboutSection) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const aboutTop = aboutSection.offsetTop;
    const scrollY = window.scrollY;
    
    let newHeight = 80;
    
    if (scrollY > heroBottom - 200) {
        const maxScroll = aboutTop - heroBottom + 200;
        const progress = Math.min(1, (scrollY - (heroBottom - 200)) / maxScroll);
        newHeight = 80 + progress * 200;
    }
    
    goldLine.style.height = newHeight + 'px';
}

// ============================================
// 5. ANIMACIÓN DE APARICIÓN DE SECCIONES
// ============================================
const sections = document.querySelectorAll('section:not(.hero)');

function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

// ============================================
// 6. NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// 7. SUAVE SCROLL PARA ENLACES
// ============================================
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

// ============================================
// 8. LISTENERS
// ============================================
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        updateParallax();
        updateGoldLine();
        checkVisibility();
        updateNavbar();
    });
});

window.addEventListener('resize', () => {
    updateGoldLine();
});

window.addEventListener('load', () => {
    updateParallax();
    updateGoldLine();
    checkVisibility();
    updateNavbar();
});
