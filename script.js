// script.js
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // CURSOR PERSONALIZADO
    // ============================================
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');

    if (cursor && cursorDot) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // El círculo exterior sigue con suavidad (lerp)
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.12;
            cursorY += (mouseY - cursorY) * 0.12;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Agrandar cursor al hacer hover en links y tarjetas
        const hoverTargets = document.querySelectorAll('a, button, .menu-icon');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });

        // Ocultar en móvil (no tiene mouse)
        document.body.classList.add('has-custom-cursor');
    }

    // ============================================
    // DESCRIPCIÓN CARD — hide/show con scroll
    // Sin hack de div invisible
    // ============================================
    const descriptionCard = document.getElementById('descriptionCard');

    // Solo activar en desktop (en mobile el card está en el flujo normal)
    if (descriptionCard && window.innerWidth > 1200) {
        let lastScrollY = window.pageYOffset;
        let isHidden = false;
        let ticking = false;

        function handleScroll() {
            const currentScrollY = window.pageYOffset;

            if (currentScrollY > lastScrollY && currentScrollY > 30 && !isHidden) {
                // Scroll hacia abajo → ocultar
                descriptionCard.classList.add('hidden');
                descriptionCard.classList.remove('visible');
                isHidden = true;
            } else if (currentScrollY < lastScrollY && isHidden) {
                // Scroll hacia arriba → mostrar
                descriptionCard.classList.remove('hidden');
                descriptionCard.classList.add('visible');
                isHidden = false;
            }

            if (currentScrollY < 20 && isHidden) {
                descriptionCard.classList.remove('hidden');
                descriptionCard.classList.add('visible');
                isHidden = false;
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // ANIMACIÓN DE ENTRADA ESCALONADA
    // ============================================
    const logo = document.querySelector('.logo-container');
    const cards = document.querySelectorAll('.nothing-card');
    const desc = document.getElementById('descriptionCard');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Añadir clase inicial (invisible)
    if (logo) logo.classList.add('animate-ready');
    if (desc) desc.classList.add('animate-ready');
    if (scrollIndicator) scrollIndicator.classList.add('animate-ready');
    cards.forEach(card => card.classList.add('animate-ready'));

    // Disparar animaciones con delays
    setTimeout(() => { if (logo) logo.classList.add('animate-in'); }, 100);
    setTimeout(() => {
        cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('animate-in'), i * 120);
        });
    }, 400);
    setTimeout(() => { if (desc) desc.classList.add('animate-in'); }, 900);
    setTimeout(() => { if (scrollIndicator) scrollIndicator.classList.add('animate-in'); }, 1100);

    // ============================================
    // MENÚ — preparado para cuando lo conectes
    // ============================================
    const menuIcon = document.getElementById('menuIcon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function () {
            // Por ahora solo toggle de clase para animación visual
            // Cuando tengas el menú, añade aquí la lógica
            this.classList.toggle('menu-open');
        });
    }

    console.log('✅ Script cargado correctamente');
});
