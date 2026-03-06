// ============================================
// 0. ESPERAR A QUE LA IMAGEN DEL HERO CARGUE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todo cuando el DOM esté listo
    initHeroImage();
    initAOS();
    initSlider();
    initEventListeners();
});

function initHeroImage() {
    const heroImg = document.querySelector('.parallax-img');
    
    if (heroImg) {
        // Si la imagen ya está cargada
        if (heroImg.complete) {
            heroImg.classList.add('loaded');
            console.log('Hero image already loaded');
        } else {
            // Esperar a que cargue
            heroImg.addEventListener('load', function() {
                this.classList.add('loaded');
                console.log('Hero image loaded successfully');
            });
            
            // Si hay error al cargar
            heroImg.addEventListener('error', function() {
                console.error('Error loading hero image');
                // Opcional: poner una imagen de respaldo
                this.src = 'https://via.placeholder.com/1920x1080/1a1a1a/c5a044?text=Madres+%26+Artesanas';
            });
        }
    }
}

// ============================================
// 1. INICIALIZACIÓN DE AOS (ANIMACIONES)
// ============================================
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
    }
}

// ============================================
// 2. SLIDER AUTOMÁTICO
// ============================================
function initSlider() {
    const sliderWrapper = document.getElementById('sliderWrapper');
    const dots = document.querySelectorAll('.dot');
    
    if (!sliderWrapper || dots.length === 0) return;
    
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
        if (slideInterval) clearInterval(slideInterval);
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
}

// ============================================
// 3. PARALLAX MEJORADO Y CORREGIDO
// ============================================
const parallaxImg = document.querySelector('.parallax-img');
const heroSection = document.getElementById('hero');

function updateParallax() {
    if (!parallaxImg || !heroSection) return;
    
    // Asegurar que la imagen sea visible
    parallaxImg.style.opacity = '1';
    parallaxImg.style.visibility = 'visible';
    
    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    
    // Solo aplicar parallax dentro del hero
    if (scrollPosition <= heroHeight) {
        // Movimiento más sutil: 0.3 en lugar de 0.4
        const translateY = scrollPosition * 0.3;
        
        // Mantener el scale base y aplicar translateY
        parallaxImg.style.transform = `scale(1.1) translateY(${translateY}px)`;
        parallaxImg.style.willChange = 'transform';
    } else {
        // Cuando pasamos el hero, mantener la posición final
        parallaxImg.style.transform = `scale(1.1) translateY(${heroHeight * 0.3}px)`;
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
    
    let newHeight = 180;
    
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
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============================================
// 7. SUAVE SCROLL PARA ENLACES
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 8. INICIALIZAR EVENT LISTENERS
// ============================================
function initEventListeners() {
    // Smooth scroll
    initSmoothScroll();
    
    // Función optimizada para scroll con requestAnimationFrame
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                updateGoldLine();
                checkVisibility();
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    window.addEventListener('resize', () => {
        updateGoldLine();
    });
    
    window.addEventListener('load', () => {
        updateParallax();
        updateGoldLine();
        checkVisibility();
        updateNavbar();
        
        // Forzar visibilidad del hero image
        if (parallaxImg) {
            parallaxImg.style.opacity = '1';
            parallaxImg.style.visibility = 'visible';
        }
    });
    
    // También actualizar cuando termina de cargar la imagen
    if (parallaxImg) {
        parallaxImg.addEventListener('load', () => {
            updateParallax();
        });
    }
}

// ============================================
// 9. FALLA DE SEGURIDAD: FORZAR VISIBILIDAD
// ============================================
// Esto asegura que la imagen sea visible pase lo que pase
setTimeout(() => {
    const heroImg = document.querySelector('.parallax-img');
    if (heroImg) {
        heroImg.style.opacity = '1';
        heroImg.style.visibility = 'visible';
        console.log('Forced hero image visibility');
    }
}, 500);
