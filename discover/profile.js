// profile.js
document.addEventListener('DOMContentLoaded', function () {

    // ====================
    // REFERENCIAS
    // ====================
    const animationContainer = document.getElementById('animationContainer');
    const whiteRectangle     = document.getElementById('whiteRectangle');
    const blackWord          = document.getElementById('blackWord');
    const typingCursor       = document.getElementById('typingCursor');
    const typingText         = document.getElementById('typingText');
    const letters            = document.querySelectorAll('.typing-text .letter');
    const skipBtn            = document.getElementById('skipBtn');
    const profileContainer   = document.querySelector('.profile-container');

    // ====================
    // CONFIGURACIÓN — duración total ~1.2s
    // ====================
    const config = {
        initialDelay:      100,
        rectangleTransform: 600,   // era 1200
        typingStartDelay:  200,    // era 500
        letterDelay:       100,    // era 250
        fadeOutDuration:   400,    // era 800
        startPosition:     80,
        textMoveAmount:    8
    };

    let animationDone = false;

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ====================
    // SKIP — salta directo al contenido
    // ====================
    function skipAnimation() {
        if (animationDone) return;
        animationDone = true;
        animationContainer.style.transition = 'opacity 0.3s ease';
        animationContainer.style.opacity = '0';
        setTimeout(() => {
            animationContainer.style.display = 'none';
            skipBtn.style.display = 'none';
            profileContainer.style.opacity = '1';
            initializePageFunctionality();
        }, 300);
    }

    skipBtn.addEventListener('click', skipAnimation);
    // También skip con cualquier tecla
    document.addEventListener('keydown', function onKey() {
        skipAnimation();
        document.removeEventListener('keydown', onKey);
    }, { once: true });

    // ====================
    // ANIMACIÓN PRINCIPAL
    // ====================
    async function startAnimation() {
        try {
            blackWord.style.opacity = '1';
            await wait(500);                         // show PROFILE black — era 1000

            blackWord.style.opacity = '0';
            whiteRectangle.style.transition = `all ${config.rectangleTransform}ms cubic-bezier(0.77, 0, 0.175, 1)`;
            whiteRectangle.style.width      = '6px';
            whiteRectangle.style.height     = '20vh';
            whiteRectangle.style.left       = `${config.startPosition}%`;
            whiteRectangle.style.top        = '50%';
            whiteRectangle.style.transform  = 'translate(-50%, -50%)';
            whiteRectangle.style.borderRadius = '3px';
            await wait(config.rectangleTransform);

            typingCursor.style.opacity = '1';
            typingCursor.style.left    = `${config.startPosition}%`;
            await wait(config.typingStartDelay);

            typingText.style.opacity = '1';
            typingText.style.left    = '80%';

            let currentTextPosition = 80;
            for (let i = 0; i < letters.length; i++) {
                letters[i].style.opacity   = '1';
                letters[i].style.transform = 'translateX(0)';
                if (i > 0) {
                    currentTextPosition -= config.textMoveAmount;
                    typingText.style.transition = 'left 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    typingText.style.left = `${currentTextPosition}%`;
                    letters[i].style.transform = 'translateX(10px)';
                    setTimeout(() => { letters[i].style.transform = 'translateX(0)'; }, 100);
                }
                if (i < letters.length - 1) {
                    typingCursor.style.opacity = '0.2';
                    setTimeout(() => { typingCursor.style.opacity = '1'; }, 60);
                    await wait(config.letterDelay);
                }
            }

            // Dos parpadeos finales rápidos
            for (let p = 0; p < 2; p++) {
                typingCursor.style.opacity = '0.3';
                await wait(120);
                typingCursor.style.opacity = '1';
                await wait(120);
            }

            // Fade out
            animationContainer.style.transition = `opacity ${config.fadeOutDuration}ms ease`;
            animationContainer.style.opacity    = '0';
            await wait(config.fadeOutDuration);

            animationContainer.style.display = 'none';
            skipBtn.style.display = 'none';
            animationDone = true;

            profileContainer.style.transition = 'opacity 0.5s ease';
            profileContainer.style.opacity    = '1';
            await wait(500);

            initializePageFunctionality();

        } catch (err) {
            console.error('Animation error:', err);
            skipAnimation();
        }
    }

    // ====================
    // FUNCIONALIDADES DE PÁGINA
    // ====================
    function initializePageFunctionality() {

        // --- ACORDEONES ---
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', function () {
                const accordion = this.parentElement;
                const content   = this.nextElementSibling;

                // Cerrar los demás
                document.querySelectorAll('.accordion').forEach(other => {
                    if (other !== accordion && other.classList.contains('active')) {
                        other.classList.remove('active');
                        other.querySelector('.accordion-content').style.maxHeight  = '0';
                        other.querySelector('.accordion-content').style.paddingBottom = '0';
                    }
                });

                accordion.classList.toggle('active');
                if (accordion.classList.contains('active')) {
                    content.style.maxHeight    = content.scrollHeight + 'px';
                    content.style.paddingBottom = '40px';
                } else {
                    content.style.maxHeight    = '0';
                    content.style.paddingBottom = '0';
                }
            });
        });

        // Abrir el primer acordeón por defecto
        setTimeout(() => {
            const first = document.querySelector('.accordion');
            if (first) {
                first.classList.add('active');
                const fc = first.querySelector('.accordion-content');
                fc.style.maxHeight    = fc.scrollHeight + 'px';
                fc.style.paddingBottom = '40px';
            }
        }, 300);

        // --- TOGGLE DETALLES (IDs únicos: 1,2,3,4 / edu-1,edu-2,edu-3,edu-4) ---
        document.querySelectorAll('.toggle-details-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const target    = this.getAttribute('data-target');
                const isEdu     = target.startsWith('edu');
                const num       = isEdu ? target.split('-')[1] : target;

                const summaryEl = document.getElementById(isEdu ? `edu-summary-${num}` : `summary-${num}`);
                const detailsEl = document.getElementById(isEdu ? `edu-details-${num}` : `details-${num}`);

                if (!summaryEl || !detailsEl) return;

                const isOpen = detailsEl.classList.contains('open');

                if (!isOpen) {
                    summaryEl.style.display = 'none';
                    detailsEl.classList.add('open');
                    detailsEl.style.opacity   = '0';
                    detailsEl.style.transform = 'translateY(8px)';
                    requestAnimationFrame(() => {
                        detailsEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        detailsEl.style.opacity    = '1';
                        detailsEl.style.transform  = 'translateY(0)';
                    });
                    this.textContent = 'Show Summary';
                    this.classList.add('active');

                    // Recalcular max-height del acordeón padre
                    const parentContent = detailsEl.closest('.accordion-content');
                    if (parentContent) {
                        setTimeout(() => {
                            parentContent.style.maxHeight = parentContent.scrollHeight + 'px';
                        }, 50);
                    }
                } else {
                    summaryEl.style.display = 'block';
                    detailsEl.classList.remove('open');
                    detailsEl.style.opacity = '0';
                    setTimeout(() => { detailsEl.style.opacity = '1'; }, 350);
                    this.textContent = 'View Full Details';
                    this.classList.remove('active');

                    const parentContent = detailsEl.closest('.accordion-content');
                    if (parentContent) {
                        setTimeout(() => {
                            parentContent.style.maxHeight = parentContent.scrollHeight + 'px';
                        }, 50);
                    }
                }
            });
        });

        // --- CERTIFICADOS DE IDIOMAS ---
        document.querySelectorAll('.certificate-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const card    = this.closest('.language-card');
                const info    = card.querySelector('.certificate-info');
                const isOpen  = card.classList.contains('cert-open');

                // Cerrar otros
                document.querySelectorAll('.language-card.cert-open').forEach(c => {
                    if (c !== card) {
                        c.classList.remove('cert-open');
                        c.querySelector('.certificate-btn').textContent =
                            c.querySelector('.certificate-btn').textContent.replace('Hide', 'View').replace('↑', '↓');
                    }
                });

                card.classList.toggle('cert-open');
                this.textContent = isOpen
                    ? this.textContent.replace('Hide', 'View').replace('↑', '↓')
                    : this.textContent.replace('View', 'Hide').replace('↓', '↑');
            });
        });

        // --- BOTONES VER CERTIFICACIÓN (modal placeholder) ---
        document.querySelectorAll('.view-cert-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const cert = this.getAttribute('data-cert');
                const names = {
                    siemens: 'Siemens PLC Programming Professional',
                    fanuc:   'Fanuc Robot Programming',
                    iot:     'Industrial IoT Specialist',
                    dele:    'DELE C2 Spanish Certificate',
                    ielts:   'IELTS Academic Certificate',
                    delf:    'DELF French Certificate',
                    cils:    'CILS Italian Certificate'
                };
                alert(`Certificate: ${names[cert] || cert}\n\nReplace this alert with a modal showing the certificate image or PDF.`);
            });
        });

        // --- SCROLL SUAVE PARA LINKS INTERNOS ---
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                }
            });
        });

        // --- INTERSECTION OBSERVER: animar al hacer scroll ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.timeline-item, .certification-card, .language-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ====================
    // ARRANCAR
    // ====================
    setTimeout(() => startAnimation(), config.initialDelay);
});
