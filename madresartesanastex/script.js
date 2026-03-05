// ============================================
// 1. SLIDER AUTOMÁTICO con transiciones suaves
// ============================================
const sliderWrapper = document.getElementById('sliderWrapper');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = document.querySelectorAll('.slide').length;

// Función para mover el slider
function moveToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
    
    // Actualizar dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    currentSlide = index;
}

// Event listeners para los dots
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        moveToSlide(i);
        // Reiniciar intervalo cuando el usuario interactúa
        resetInterval();
    });
});

// Auto-play cada 4 segundos
let slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);
}

// Pausar al hacer hover en el slider (opcional, UX amable)
sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
sliderWrapper.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => moveToSlide(currentSlide + 1), 4000);
});

// ============================================
// 2. LÍNEA DORADA QUE CRECE CON EL SCROLL
// ============================================
const goldLine = document.getElementById('connectorLine');
const hero = document.getElementById('hero');
const aboutSection = document.getElementById('about');

function updateGoldLine() {
    if (!goldLine) return;
    
    // Calculamos cuánto hemos scrolleado desde el hero hasta el about
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const aboutTop = aboutSection.offsetTop;
    const scrollY = window.scrollY;
    
    // La línea empieza a crecer cuando pasamos el hero y hasta llegar a about
    let newHeight = 80; // altura base
    
    if (scrollY > heroBottom - 200) {
        // Progreso entre hero y about
        const maxScroll = aboutTop - heroBottom + 200;
        const progress = Math.min(1, (scrollY - (heroBottom - 200)) / maxScroll);
        newHeight = 80 + progress * 200; // crece hasta 280px
    }
    
    goldLine.style.height = newHeight + 'px';
}

// ============================================
// 3. ANIMACIÓN DE APARICIÓN DE SECCIONES (SCROLL REVEAL)
// ============================================
const sections = document.querySelectorAll('section');

function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85; // 85% del viewport
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
}

// ============================================
// 4. EFECTO NAVBAR MÁS SÓLIDO AL SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.3)';
    }
}

// ============================================
// 5. LISTENERS (SCROLL Y RESIZE)
// ============================================
window.addEventListener('scroll', () => {
    updateGoldLine();
    checkVisibility();
    updateNavbar();
});

window.addEventListener('resize', () => {
    updateGoldLine(); // por si cambia el tamaño de las secciones
});

// Ejecutar al cargar para establecer estados iniciales
window.addEventListener('load', () => {
    updateGoldLine();
    checkVisibility();
    updateNavbar();
});

// También ejecutar al inicio si ya hay scroll (por si se recarga en mitad de la página)
setTimeout(() => {
    updateGoldLine();
    checkVisibility();
}, 100);
