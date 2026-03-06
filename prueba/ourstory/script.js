// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Cambiar estado del navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Ejecutar al cargar la página
    updateNavbar();
    
    // Escuchar el evento scroll con optimización (requestAnimationFrame)
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Smooth scroll para los enlaces internos (si los hay)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Verificar que las imágenes carguen correctamente
    const images = document.querySelectorAll('.story-image img, .portrait-item img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.error('Error loading image:', this.src);
            // Opcional: poner una imagen de respaldo
            // this.src = 'assets/images/placeholder.jpg';
        });
    });
});

// También ejecutar cuando la página se haya cargado completamente
window.addEventListener('load', function() {
    // Actualizar AOS después de que todo esté cargado
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Actualizar navbar por si acaso
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});
