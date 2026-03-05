// ============================================
// 1. SLIDER AUTOMÁTICO
// ============================================
const sliderWrapper = document.getElementById('sliderWrapper');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

function moveToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        moveToSlide(i);
        resetInterval();
    });
});

let slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);
}

sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderWrapper.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);
});

// ============================================
// 2. PARALLAX MEJORADO (EFECTO MULTICAPA)
// ============================================
// ============================================
// 2. PARALLAX MEJORADO (con imagen desde HTML)
// ============================================
const parallaxImg = document.querySelector('.parallax-img');
const heroSection = document.getElementById('hero');

function updateParallax() {
    if (!parallaxImg || !heroSection) return;
    
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Efecto parallax: la imagen se mueve más lento que el scroll
    if (scrollPosition <= heroHeight) {
        const translateY = scrollPosition * 0.4; // 0.4 = velocidad del efecto
        parallaxImg.style.transform = `scale(1.1) translateY(${translateY}px)`;
    
    }
}

// ============================================
// 3. LÍNEA DORADA
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
// 4. ANIMACIÓN DE APARICIÓN DE SECCIONES
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
// 5. NAVBAR
// ============================================
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.3)';
    }
}

// ============================================
// 6. LISTENERS
// ============================================
window.addEventListener('scroll', () => {
    updateParallax();
    updateGoldLine();
    checkVisibility();
    updateNavbar();
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
