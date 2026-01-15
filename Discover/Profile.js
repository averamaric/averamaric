// profile.js
document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // ANIMACIÓN INICIAL
    // ====================
    
  const animationContainer = document.getElementById('animationContainer');
    const whiteRectangle = document.getElementById('whiteRectangle');
    const blackWord = document.getElementById('blackWord');
    const typingCursor = document.getElementById('typingCursor');
    const typingText = document.getElementById('typingText'); // ← CRUCIAL: referencia al texto
    const pageContent = document.getElementById('pageContent');
    const letters = document.querySelectorAll('.typing-text .letter');
  const finalTitleContainer = document.getElementById('finalTitleContainer'); // ← NUEVO
const finalTitle = document.getElementById('finalTitle'); // ← NUEVO
    
// ====================
    // CONFIGURACIÓN
    // ====================
    const config = {
        initialDelay: 300,
        rectangleTransform: 1200,
        typingStartDelay: 500,
        letterDelay: 250, // Aumentado para dar tiempo al movimiento
        finalCursorBlinks: 100,
        fadeOutDuration: 800,
        startPosition: 80, // Posición del cursor (fijo)
        textMoveAmount: 8  // Cuántos % se mueve el texto por cada letra nueva
      
      
    };
 
    
    // ====================
    // FUNCIONES AUXILIARES
    // ====================
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function playTypingSound() {
        // Opcional: sonido de typing
        // const audio = new Audio('assets/sounds/typewriter-key.mp3');
        // audio.volume = 0.2;
        // audio.play().catch(e => console.log('Audio no disponible'));
    }
    
    // ====================
    // FUNCIÓN PRINCIPAL DE ANIMACIÓN
    // ====================
    async function startAnimation() {
        console.log('🎬 Comenzando animación...');
        
        // 1. Mostrar palabra negra
        console.log('📝 Mostrando "PROFILE" en negro...');
        blackWord.style.opacity = '1';
        
        await wait(1000);
        
        // 2. Transformar rectángulo en cursor
        console.log('⬜ Transformando rectángulo en cursor...');
        blackWord.style.opacity = '0';
        
        whiteRectangle.style.transition = `all ${config.rectangleTransform}ms cubic-bezier(0.77, 0, 0.175, 1)`;
        whiteRectangle.style.width = '6px';
        whiteRectangle.style.height = '20vh';
        whiteRectangle.style.left = `${config.startPosition}%`;
        whiteRectangle.style.top = '50%';
        whiteRectangle.style.transform = 'translate(-50%, -50%)';
        whiteRectangle.style.borderRadius = '3px';
        
        await wait(config.rectangleTransform);
        
        // 3. Mostrar cursor parpadeante (FIJO en 80%)
        console.log('🔦 Mostrando cursor parpadeante...');
        typingCursor.style.opacity = '1';
        typingCursor.style.left = `${config.startPosition}%`; // Fijo en 80%
        
        await wait(config.typingStartDelay);
        
        // 4. Mostrar texto typing (empieza en 60%)
        console.log('⌨️ Mostrando texto typing...');
        typingText.style.opacity = '1';
        typingText.style.left = '80%'; // Empieza en 60% (más a la izquierda)
        
        // ====================
        // 5. ANIMACIÓN DE TYPING LETRA POR LETRA CON MOVIMIENTO
        // ====================
        console.log('🔤 Animando typing letra por letra con movimiento...');
        
        // Variable para controlar la posición del texto
        let currentTextPosition = 80; // Empieza en 60%
        
        // Mostrar cada letra una por una
        for (let i = 0; i < letters.length; i++) {
      
            // A. Mostrar la letra actual con animación
            letters[i].style.opacity = '1';
            letters[i].style.transform = 'translateX(0)';
            
            // B. Si NO es la primera letra, mover TODO el texto a la izquierda
            if (i > 0) {
                // Calcular nueva posición (mover a la izquierda)
                currentTextPosition -= config.textMoveAmount;
                
                // Aplicar movimiento suave al contenedor de texto
                typingText.style.transition = 'left 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                typingText.style.left = `${currentTextPosition}%`;
                
                // Efecto de "rebote" para la letra nueva
                letters[i].style.transform = 'translateX(15px)';
                setTimeout(() => {
                    letters[i].style.transform = 'translateX(0)';
                }, 150);
            }
            
            // C. Sonido opcional de typing
            playTypingSound();
            
            // D. Parpadeo del cursor entre letras
            if (i < letters.length - 1) {
                // Parpadeo rápido
                typingCursor.style.opacity = '0.2';
                setTimeout(() => {
                    typingCursor.style.opacity = '1';
                }, 100);
                
                // Esperar para siguiente letra
                await wait(config.letterDelay);
            }
        }
        
        console.log('✅ Typing completado');
        
        // ====================
        // 6. PARPADEOS FINALES DEL CURSOR
        // ====================
        console.log('✨ Parpadeos finales del cursor...');
        
        // Primer parpadeo
        typingCursor.style.opacity = '0.3';
        await wait(200);
        typingCursor.style.opacity = '1';
        await wait(200);
        
        // Segundo parpadeo
        typingCursor.style.opacity = '0.3';
        await wait(200);
        typingCursor.style.opacity = '1';
        await wait(200);
        
        // ====================
        // 7. FADE OUT DE ANIMACIÓN
        // ====================
        console.log('🌙 Haciendo fade out de animación...');
        animationContainer.style.transition = `opacity ${config.fadeOutDuration}ms ease`;
        animationContainer.style.opacity = '0';
        
        await wait(config.fadeOutDuration);
        
        // ====================
        // 8. MOSTRAR CONTENIDO PRINCIPAL
        // ====================
        console.log('🏠 Mostrando contenido principal...');
        animationContainer.style.display = 'none';
        pageContent.style.display = 'block';
        
        await wait(100);
        
        pageContent.style.opacity = '0';
        pageContent.style.transition = 'opacity 0.8s ease';
        void pageContent.offsetWidth; // Forzar reflow
        pageContent.style.opacity = '1';
        
        await wait(800);
        
        console.log('🎉 Animación completada!');
        
        // ====================
        // 9. INICIALIZAR FUNCIONALIDADES DE LA PÁGINA
        // ====================
        initializePageFunctionality();
    }
    
    // ====================
    // FUNCIONALIDADES DE PÁGINA
    // ====================
    function initializePageFunctionality() {
        console.log('🔧 Inicializando funcionalidades de página...');
        
        // ACORDEONES
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordion = this.parentElement;
                const content = this.nextElementSibling;
                
                // Cerrar otros acordeones
                document.querySelectorAll('.accordion').forEach(otherAccordion => {
                    if (otherAccordion !== accordion && otherAccordion.classList.contains('active')) {
                        otherAccordion.classList.remove('active');
                        otherAccordion.querySelector('.accordion-content').style.maxHeight = '0';
                        otherAccordion.querySelector('.accordion-content').style.paddingBottom = '0';
                    }
                });
                
                // Alternar acordeón actual
                accordion.classList.toggle('active');
                
                if (accordion.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.paddingBottom = '40px';
                } else {
                    content.style.maxHeight = '0';
                    content.style.paddingBottom = '0';
                }
            });
        });
        
        // SCROLL ANIMATION PARA TARJETA
        const introCard = document.getElementById('introCard');
        if (introCard) {
            function handleScroll() {
                const introCardRect = introCard.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (introCardRect.top < windowHeight && introCardRect.bottom > 0) {
                    const scrollPercent = Math.max(0, (windowHeight - introCardRect.top) / (windowHeight + introCardRect.height));
                    
                    if (scrollPercent < 0.3) {
                        introCard.style.opacity = 1 - (scrollPercent * 2);
                        introCard.style.transform = `translateY(${scrollPercent * 20}px)`;
                    } else if (scrollPercent < 0.7) {
                        introCard.style.opacity = 1 - (scrollPercent * 1.5);
                        introCard.style.transform = `translateY(${scrollPercent * 40}px)`;
                    } else {
                        introCard.style.opacity = 0.1;
                        introCard.style.transform = `translateY(${scrollPercent * 60}px)`;
                        introCard.classList.add('hidden');
                    }
                }
            }
            
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }
        
        // Inicializar primer acordeón
        setTimeout(() => {
            const firstAccordion = document.querySelector('.accordion');
            if (firstAccordion) {
                firstAccordion.classList.add('active');
                const firstContent = firstAccordion.querySelector('.accordion-content');
                firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
                firstContent.style.paddingBottom = '40px';
            }
        }, 500);
    }
    
    // ====================
    // INICIAR ANIMACIÓN
    // ====================
    setTimeout(() => {
        startAnimation().catch(error => {
            console.error('❌ Error en animación:', error);
            
            // Fallback: mostrar contenido si la animación falla
            animationContainer.style.display = 'none';
            pageContent.style.display = 'block';
            pageContent.style.opacity = '1';
            initializePageFunctionality();
        });
    }, config.initialDelay);
    
  
  
  /*const titleAnimation = document.getElementById('titleAnimation');
    const navbar = document.querySelector('.navbar');
    
    // Ocultar navbar durante la animación inicial
    navbar.style.opacity = '0';
    
    // Mostrar navbar después de la animación
    setTimeout(() => {
        navbar.style.transition = 'opacity 0.5s ease';
        navbar.style.opacity = '1';
    }, 1500);
    */
  
  
    // ====================
    // ACORDEONES
    // ====================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const content = this.nextElementSibling;
            
            // Cerrar otros acordeones (opcional)
            document.querySelectorAll('.accordion').forEach(otherAccordion => {
                if (otherAccordion !== accordion && otherAccordion.classList.contains('active')) {
                    otherAccordion.classList.remove('active');
                    otherAccordion.querySelector('.accordion-content').style.maxHeight = '0';
                    otherAccordion.querySelector('.accordion-content').style.paddingBottom = '0';
                }
            });
            
            // Alternar acordeón actual
            accordion.classList.toggle('active');
            
            if (accordion.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.paddingBottom = '40px';
            } else {
                content.style.maxHeight = '0';
                content.style.paddingBottom = '0';
            }
        });
    });
    
    // ====================
    // TOGGLE DETALLES EXPERIENCIA/EDUCACIÓN
    // ====================
    const toggleButtons = document.querySelectorAll('.toggle-details-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const isEducation = target.startsWith('edu');
            
            const summaryId = isEducation ? `edu-summary-${target.split('-')[1]}` : `summary-${target}`;
            const detailsId = isEducation ? `edu-details-${target.split('-')[1]}` : `details-${target}`;
            
            const summary = document.getElementById(summaryId);
            const details = document.getElementById(detailsId);
            
            if (details.style.display === 'none') {
                // Mostrar detalles
                summary.style.display = 'none';
                details.style.display = 'block';
                this.textContent = 'Show Summary';
                this.classList.add('active');
                
                // Animación de aparición
                details.style.opacity = '0';
                details.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    details.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    details.style.opacity = '1';
                    details.style.transform = 'translateY(0)';
                }, 10);
            } else {
                // Mostrar resumen
                summary.style.display = 'block';
                details.style.display = 'none';
                this.textContent = 'View Full Details';
                this.classList.remove('active');
            }
        });
    });
    
    // ====================
    // BOTONES DE CERTIFICADOS (IDIOMAS)
    // ====================
    const certButtons = document.querySelectorAll('.certificate-btn');
    
    certButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const languageItem = this.closest('.language-item');
            
            // Cerrar otros certificados
            document.querySelectorAll('.language-item').forEach(item => {
                if (item !== languageItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // Alternar certificado actual
            languageItem.classList.toggle('active');
            
            // Cambiar texto del botón
            if (languageItem.classList.contains('active')) {
                this.textContent = 'Hide Certificate';
            } else {
                this.textContent = 'View Certificate';
            }
        });
    });
    
    // ====================
    // BOTONES DE VER CERTIFICADOS (CERTIFICACIONES)
    // ====================
    const viewCertButtons = document.querySelectorAll('.view-cert-btn');
    
    viewCertButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certType = this.getAttribute('data-cert');
            
            // Aquí podrías abrir un modal o redirigir a la imagen del certificado
            // Por ahora solo mostramos un alert
            const certNames = {
                'siemens': 'Siemens PLC Programming Professional Certificate',
                'fanuc': 'Fanuc Robot Programming Certificate', 
                'iot': 'Industrial IoT Specialist Certificate',
                'dele': 'DELE C2 Spanish Certificate',
                'ielts': 'IELTS Academic Certificate',
                'goethe': 'Goethe-Zertifikat B1 German Certificate',
                'delf': 'DELF A2 French Certificate'
            };
            
            alert(`Certificate: ${certNames[certType]}\n\nThis would typically open a modal with the certificate image or redirect to a PDF.`);
        });
    });
    
    // ====================
    // EFECTO HOVER EN SKILL BARS
    // ====================
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress');
            const currentWidth = progressBar.style.width;
            progressBar.style.transition = 'width 0.3s ease';
            progressBar.style.width = '100%';
            
            setTimeout(() => {
                progressBar.style.width = currentWidth;
            }, 300);
        });
    });
    
    // ====================
    // SCROLL SMOOTH PARA LINKS
    // ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ====================
    // ANIMACIÓN AL SCROLL
    // ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    document.querySelectorAll('.experience-item, .education-item, .certification-card, .language-item').forEach(el => {
        observer.observe(el);
    });
    
    // ====================
    // INICIALIZAR PRIMER ACORDEÓN ABIERTO
    // ====================
    
});


