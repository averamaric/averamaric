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

    // Variable para evitar múltiples inicializaciones
    let isInitialized = false;
    let animationDone = false;

    // ====================
    // FUNCIÓN DE INICIALIZACIÓN - AHORA MÁS ROBUSTA
    // ====================
    function initializePageFunctionality() {
        // Evitar inicializar múltiples veces
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('Inicializando funcionalidades de la página...');

        // --- ACORDEONES ---
        const accordions = document.querySelectorAll('.accordion');
        accordions.forEach(accordion => {
            const header = accordion.querySelector('.accordion-header');
            const content = accordion.querySelector('.accordion-content');
            
            if (header && content) {
                // Remover event listeners anteriores para evitar duplicados
                const newHeader = header.cloneNode(true);
                header.parentNode.replaceChild(newHeader, header);
                
                newHeader.addEventListener('click', function (e) {
                    e.stopPropagation();
                    
                    // Cerrar los demás acordeones
                    accordions.forEach(other => {
                        if (other !== accordion && other.classList.contains('active')) {
                            other.classList.remove('active');
                            const otherContent = other.querySelector('.accordion-content');
                            if (otherContent) {
                                otherContent.style.maxHeight = '0';
                                otherContent.style.paddingBottom = '0';
                            }
                        }
                    });
                    
                    // Toggle el actual
                    accordion.classList.toggle('active');
                    if (accordion.classList.contains('active')) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        content.style.paddingBottom = '40px';
                    } else {
                        content.style.maxHeight = '0';
                        content.style.paddingBottom = '0';
                    }
                });
            }
        });

        // Abrir el primer acordeón por defecto (con un pequeño retraso)
        setTimeout(() => {
            const firstAccordion = document.querySelector('.accordion');
            if (firstAccordion && !firstAccordion.classList.contains('active')) {
                firstAccordion.classList.add('active');
                const firstContent = firstAccordion.querySelector('.accordion-content');
                if (firstContent) {
                    firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
                    firstContent.style.paddingBottom = '40px';
                }
            }
        }, 100);

        // --- TOGGLE DETALLES (Experiencia y Educación) ---
        const toggleButtons = document.querySelectorAll('.toggle-details-btn');
        toggleButtons.forEach(btn => {
            // Clonar para evitar duplicados
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const target = this.getAttribute('data-target');
                if (!target) return;
                
                const isEdu = target.startsWith('edu');
                const num = isEdu ? target.split('-')[1] : target;
                
                const summaryId = isEdu ? `edu-summary-${num}` : `summary-${num}`;
                const detailsId = isEdu ? `edu-details-${num}` : `details-${num}`;
                
                const summaryEl = document.getElementById(summaryId);
                const detailsEl = document.getElementById(detailsId);
                
                if (!summaryEl || !detailsEl) return;
                
                const isOpen = detailsEl.classList.contains('open');
                
                if (!isOpen) {
                    // Abrir detalles
                    summaryEl.style.display = 'none';
                    detailsEl.classList.add('open');
                    detailsEl.style.opacity = '0';
                    detailsEl.style.transform = 'translateY(8px)';
                    requestAnimationFrame(() => {
                        detailsEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                        detailsEl.style.opacity = '1';
                        detailsEl.style.transform = 'translateY(0)';
                    });
                    this.textContent = 'Show Summary';
                    this.classList.add('active');
                    
                    // Actualizar altura del acordeón padre
                    const parentContent = detailsEl.closest('.accordion-content');
                    if (parentContent) {
                        setTimeout(() => {
                            parentContent.style.maxHeight = parentContent.scrollHeight + 'px';
                        }, 50);
                    }
                } else {
                    // Cerrar detalles
                    summaryEl.style.display = 'block';
                    detailsEl.classList.remove('open');
                    detailsEl.style.opacity = '0';
                    setTimeout(() => {
                        detailsEl.style.opacity = '1';
                    }, 350);
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
        const certBtns = document.querySelectorAll('.certificate-btn');
        certBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const card = this.closest('.language-card');
                if (!card) return;
                
                const info = card.querySelector('.certificate-info');
                const isOpen = card.classList.contains('cert-open');
                
                // Cerrar otros certificados abiertos
                document.querySelectorAll('.language-card.cert-open').forEach(c => {
                    if (c !== card) {
                        c.classList.remove('cert-open');
                        const otherBtn = c.querySelector('.certificate-btn');
                        if (otherBtn) {
                            otherBtn.textContent = otherBtn.textContent.replace('Hide', 'View').replace('↑', '↓');
                        }
                    }
                });
                
                card.classList.toggle('cert-open');
                this.textContent = isOpen
                    ? this.textContent.replace('Hide', 'View').replace('↑', '↓')
                    : this.textContent.replace('View', 'Hide').replace('↓', '↑');
            });
        });

        // --- BOTONES VER CERTIFICACIÓN ---
        const viewCertBtns = document.querySelectorAll('.view-cert-btn');
        viewCertBtns.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function () {
                const cert = this.getAttribute('data-cert');
                const certNames = {
                    siemens: 'Siemens PLC Programming Professional',
                    fanuc: 'Fanuc Robot Programming',
                    iot: 'Industrial IoT Specialist',
                    dele: 'DELE C2 Spanish Certificate',
                    ielts: 'IELTS Academic Certificate',
                    delf: 'DELF French Certificate',
                    cils: 'CILS Italian Certificate'
                };
                const certName = certNames[cert] || cert;
                alert(`Certificate: ${certName}\n\n(Replace this alert with a modal showing the certificate image or PDF.)`);
            });
        });

        // --- SCROLL SUAVE PARA LINKS INTERNOS ---
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
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
        
        const elementsToObserve = document.querySelectorAll('.timeline-item, .certification-card, .language-card');
        elementsToObserve.forEach(el => observer.observe(el));
        
        console.log('✅ Funcionalidades inicializadas correctamente');
    }

    // ====================
    // SKIP — salta directo al contenido
    // ====================
    function skipAnimation() {
        if (animationDone) return;
        animationDone = true;
        
        console.log('Skip button pressed - skipping animation');
        
        // Ocultar animación
        if (animationContainer) {
            animationContainer.style.transition = 'opacity 0.3s ease';
            animationContainer.style.opacity = '0';
            setTimeout(() => {
                if (animationContainer) {
                    animationContainer.style.display = 'none';
                }
                if (skipBtn) {
                    skipBtn.style.display = 'none';
                }
                if (profileContainer) {
                    profileContainer.style.opacity = '1';
                }
                // Inicializar funcionalidades después de mostrar el contenido
                setTimeout(() => {
                    initializePageFunctionality();
                }, 100);
            }, 300);
        } else {
            // Si no hay contenedor de animación, inicializar directamente
            if (profileContainer) {
                profileContainer.style.opacity = '1';
            }
            if (skipBtn) {
                skipBtn.style.display = 'none';
            }
            initializePageFunctionality();
        }
    }

    // ====================
    // ANIMACIÓN PRINCIPAL
    // ====================
    async function startAnimation() {
        // Si la página ya está inicializada, no hacer nada
        if (isInitialized) return;
        
        try {
            if (!animationContainer) {
                // Si no hay contenedor de animación, mostrar contenido directamente
                if (profileContainer) profileContainer.style.opacity = '1';
                initializePageFunctionality();
                return;
            }
            
            if (blackWord) blackWord.style.opacity = '1';
            await wait(500);
            
            if (blackWord) blackWord.style.opacity = '0';
            if (whiteRectangle) {
                whiteRectangle.style.transition = `all ${config.rectangleTransform}ms cubic-bezier(0.77, 0, 0.175, 1)`;
                whiteRectangle.style.width = '6px';
                whiteRectangle.style.height = '20vh';
                whiteRectangle.style.left = `${config.startPosition}%`;
                whiteRectangle.style.top = '50%';
                whiteRectangle.style.transform = 'translate(-50%, -50%)';
                whiteRectangle.style.borderRadius = '3px';
            }
            await wait(config.rectangleTransform);
            
            if (typingCursor) {
                typingCursor.style.opacity = '1';
                typingCursor.style.left = `${config.startPosition}%`;
            }
            await wait(config.typingStartDelay);
            
            if (typingText) {
                typingText.style.opacity = '1';
                typingText.style.left = '80%';
            }
            
            let currentTextPosition = 80;
            for (let i = 0; i < letters.length; i++) {
                if (letters[i]) {
                    letters[i].style.opacity = '1';
                    letters[i].style.transform = 'translateX(0)';
                }
                if (i > 0) {
                    currentTextPosition -= config.textMoveAmount;
                    if (typingText) {
                        typingText.style.transition = 'left 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                        typingText.style.left = `${currentTextPosition}%`;
                    }
                    if (letters[i]) {
                        letters[i].style.transform = 'translateX(10px)';
                        setTimeout(() => {
                            if (letters[i]) letters[i].style.transform = 'translateX(0)';
                        }, 100);
                    }
                }
                if (i < letters.length - 1) {
                    if (typingCursor) typingCursor.style.opacity = '0.2';
                    setTimeout(() => {
                        if (typingCursor) typingCursor.style.opacity = '1';
                    }, 60);
                    await wait(config.letterDelay);
                }
            }
            
            // Parpadeos finales
            for (let p = 0; p < 2; p++) {
                if (typingCursor) typingCursor.style.opacity = '0.3';
                await wait(120);
                if (typingCursor) typingCursor.style.opacity = '1';
                await wait(120);
            }
            
            // Fade out de la animación
            if (animationContainer) {
                animationContainer.style.transition = `opacity ${config.fadeOutDuration}ms ease`;
                animationContainer.style.opacity = '0';
                await wait(config.fadeOutDuration);
                animationContainer.style.display = 'none';
            }
            
            if (skipBtn) skipBtn.style.display = 'none';
            animationDone = true;
            
            if (profileContainer) {
                profileContainer.style.transition = 'opacity 0.5s ease';
                profileContainer.style.opacity = '1';
            }
            await wait(500);
            
            initializePageFunctionality();
            
        } catch (err) {
            console.error('Animation error:', err);
            skipAnimation();
        }
    }
    
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const config = {
        initialDelay: 100,
        rectangleTransform: 600,
        typingStartDelay: 200,
        letterDelay: 100,
        fadeOutDuration: 400,
        startPosition: 80,
        textMoveAmount: 8
    };
    
    // Asegurar que el contenedor principal esté oculto al inicio
    if (profileContainer) {
        profileContainer.style.opacity = '0';
    }
    
    // Escuchar el evento skip
    if (skipBtn) {
        skipBtn.addEventListener('click', skipAnimation);
    }
    
    // También skip con cualquier tecla (solo una vez)
    document.addEventListener('keydown', function onKey(e) {
        // No saltar si es la tecla ESC (para no interferir)
        if (e.key === 'Escape') return;
        skipAnimation();
        document.removeEventListener('keydown', onKey);
    }, { once: true });
    
    // Iniciar la animación
    setTimeout(() => startAnimation(), config.initialDelay);
});
