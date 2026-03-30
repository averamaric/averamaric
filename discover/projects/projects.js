document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // DATOS DE PROYECTOS CON MÚLTIPLES MEDIOS
    // ============================================
    const projectsData = {
        1: {
            title: 'AI Tic-tac-toe Robot',
            category: 'Robotics',
            year: '2022',
            accent: '#D4FF5E',
            icon: '⟳',
            description: 'Developed as a final degree project at CEIT Research Center, this project involved programming the TM5 Omron collaborative robot to play tic-tac-toe against human users. The robot uses an integrated camera and a minimax AI algorithm to ensure it never loses — while also being able to sketch user portraits from camera captures.',
            highlights: [
                'Mastered the TMFlow programming language for complex robotic task sequencing.',
                'Implemented a minimax AI algorithm ensuring optimal play in every game state.',
                'Integrated camera system for real-time board recognition and move validation.',
                'Project defended with a grade of 10/10 with honours at University of Navarra.',
            ],
            tags: ['TMFlow', 'TM5 Omron', 'Computer Vision', 'Python', 'AI Algorithms', 'CEIT'],
            // Array de medios para el carrusel
            media: [
                { type: 'video', src: 'assets/video/29_3_2026, 14_34_10 - Screen - Proyecto de vídeo 1.webm', poster: null },
                { type: 'image', src: 'assets/images/robot-sketch.jpg', alt: 'Robot sketching' },
                { type: 'image', src: 'assets/images/tic-tac-toe-board.jpg', alt: 'Game board' }
            ]
        },
        2: {
            title: 'Batch Mixing Plant Automation',
            category: 'PLC / SCADA',
            year: '2023',
            accent: 'rgba(212,255,94,0.5)',
            icon: '⚙',
            description: 'Designed and implemented a fully automated batch mixing plant control system as part of the MSc programme. The system integrates PLC control, SCADA supervision, and computer vision for product sorting and quality inspection across the production line.',
            highlights: [
                'Designed ladder logic for sequential batch control with interlocking safety conditions.',
                'Configured SCADA interface for real-time process monitoring and alarm management.',
                'Integrated computer vision module for automated product classification and rejection.',
                'Implemented HMI screens for operator interaction and process parameter adjustment.',
            ],
            tags: ['Siemens TIA Portal', 'SCADA', 'HMI Design', 'Computer Vision', 'PLC Ladder Logic'],
            media: [
                { type: 'image', src: 'assets/images/Captura de pantalla 2026-03-29 173405.png', alt: 'Batch mixing plant' },
                { type: 'image', src: 'assets/images/plc-interface.jpg', alt: 'PLC Interface' },
                { type: 'video', src: 'assets/video/batch-plant-demo.mp4', poster: 'assets/images/batch-poster.jpg' }
            ]
        },
        3: {
            title: 'Virtual Commissioning',
            category: 'IoT',
            year: '2025',
            accent: 'rgba(212,255,94,0.3)',
            icon: '◎',
            description: 'Configured the digital twin of a Pick&Place station in Siemens NX, programmed the PLC control and HMI design of the system and setup the virtual commisioning environment for the validation of the project.',
            highlights: [
                'Configured digital twin in Siemens NX for Pick&Place station',
                'Programmed PLC control using TIA Portal (FBD and SCT)',
                'Designed HMI interface for operator interaction',
                'Validated system behavior through virtual commissioning',
            ],
            tags: ['TIA Portal', 'PLC Programming (FBD and SCT)', 'NX Siemens', 'HMI Design'],
            media: [
                { type: 'image', src: 'assets/images/Screenshot 2025-12-06 221243.png', alt: 'Virtual Commissioning' },
                { type: 'video', src: 'assets/virtual-commissioning-demo.mp4', poster: 'assets/images/virtual-poster.jpg' }
            ]
        },
        4: {
            title: 'Experimental validation connectivity for controls',
            category: 'Research',
            year: '2025 – Present',
            accent: 'rgba(212,255,94,0.7)',
            icon: '⬡',
            description: 'working on integrating a real-time automation controller, a PLC and the OPAL-RT simulator, to enable bidirectional communication and demonstrate hierarchical control of microgrids.',
            highlights: [
                'Integrating real-time automation controller with OPAL-RT simulator',
                'Implementing bidirectional communication protocols',
                'Demonstrating hierarchical control of microgrids',
                'Testing DNP3/Modbus TCP/IEC-61850 protocols',
            ],
            tags: ['OPAL-RT', 'SEL-3555', 'NodeRed', 'SCADA', 'DNP3/Modbus TCP/IEC-61850'],
            media: [
                { type: 'image', src: 'assets/images/research-lab.jpg', alt: 'Research Lab Setup' },
                { type: 'image', src: 'assets/images/opal-rt-setup.jpg', alt: 'OPAL-RT Simulator' }
            ]
        },
        5: {
            title: 'Designing and simulating a robotic solution',
            category: 'Robotics',
            year: '2026 – on going',
            accent: 'rgba(212,255,94,0.4)',
            icon: '✦',
            description: 'Designed, programmed and validated a robotic solution using LUA in Coppeliasim following the production line\'s requirements',
            highlights: [
                'Designed robotic cell layout in Coppeliasim',
                'Programmed robot movements using LUA scripting',
                'Validated cycle times and collision detection',
                'Integrated with MATLAB for data analysis',
            ],
            tags: ['LUA', 'Coppeliasim', 'MATLAB'],
            media: [
                { type: 'image', src: 'assets/images/Captura de pantalla 2026-03-29 173311.png', alt: 'Robotic Simulation' },
                { type: 'video', src: 'assets/robotic-simulation.mp4', poster: 'assets/images/simulation-poster.jpg' }
            ]
        },
        6: {
            title: 'Industrial A-frame for order fulfillment',
            category: 'PLC',
            year: '2026 – on going',
            accent: 'rgba(212,255,94,0.2)',
            icon: '⊕',
            description: 'Desgined, built, programmed and validated an automation solution for order fulfilment based on client\'s requirements.',
            highlights: [
                'Designed complete A-frame system architecture',
                'Programmed WAGO PLC for order fulfillment logic',
                'Designed HMI interface for operator control',
                'Created CAD models and electronic schematics',
            ],
            tags: ['WAGO PLC', 'HMI design', 'CAD design', 'Schematic design', 'Electronic circuitry'],
            media: [
                { type: 'image', src: 'assets/images/Captura de pantalla 2026-03-29 172456.png', alt: 'A-frame Design' },
                { type: 'image', src: 'assets/images/a-frame-cad.jpg', alt: 'CAD Model' }
            ]
        },
    };

    // ============================================
    // REFERENCIAS
    // ============================================
    const animationContainer = document.getElementById('animationContainer');
    const scrambleChars      = document.querySelectorAll('.scramble-char');
    const scrambleLabel      = document.getElementById('scrambleLabel');
    const scrambleBarFill    = document.getElementById('scrambleBarFill');
    const scrambleStatus     = document.getElementById('scrambleStatus');
    const matrixCanvas       = document.getElementById('matrixRain');
    const skipBtn            = document.getElementById('skipBtn');
    const projectsContainer  = document.querySelector('.projects-container');

    // ============================================
    // CONFIGURACIÓN
    // ============================================
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*<>[]{}!/\\|^~';
    const WORD  = 'PROJECTS';

    let animationDone   = false;
    let rainAnimId      = null;
    let scrambleTimers  = [];
    
    // Almacenar instancias de carruseles
    const carousels = new Map();
    const detailCarousels = new Map();

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function randChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    // ============================================
    // CLASE CARRUSEL
    // ============================================
    class MediaCarousel {
        constructor(container, mediaItems, options = {}) {
            this.container = container;
            this.mediaItems = mediaItems;
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.autoPlayDelay = options.autoPlayDelay || 4000;
            this.enableAutoPlay = options.enableAutoPlay !== false;
            
            this.init();
        }
        
        init() {
            if (!this.mediaItems || this.mediaItems.length === 0) return;
            
            // Crear estructura del carrusel
            this.slidesContainer = this.container.querySelector('.carousel-slides, .detail-carousel-slides');
            this.prevBtn = this.container.querySelector('.carousel-btn-prev, .detail-carousel-btn-prev');
            this.nextBtn = this.container.querySelector('.carousel-btn-next, .detail-carousel-btn-next');
            this.dotsContainer = this.container.querySelector('.carousel-dots, .detail-carousel-dots');
            
            // Renderizar slides
            this.renderSlides();
            
            // Configurar eventos
            if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
            if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
            
            // Iniciar auto-reproducción si hay más de 1 slide
            if (this.enableAutoPlay && this.mediaItems.length > 1) {
                this.startAutoPlay();
                
                // Pausar auto-reproducción al hover
                this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        }
        
        renderSlides() {
            if (!this.slidesContainer) return;
            
            // Limpiar y crear nuevos slides
            this.slidesContainer.innerHTML = '';
            this.mediaItems.forEach((item, idx) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                if (this.container.classList.contains('detail-carousel-container')) {
                    slide.className = 'detail-carousel-slide';
                }
                
                if (item.type === 'video') {
                    const video = document.createElement('video');
                    video.src = item.src;
                    if (item.poster) video.poster = item.poster;
                    video.loop = true;
                    video.muted = true;
                    video.playsInline = true;
                    
                    // Autoplay solo si es el slide activo
                    if (idx === this.currentIndex) {
                        video.autoplay = true;
                        setTimeout(() => video.play().catch(e => console.log('Autoplay prevented:', e)), 100);
                    }
                    
                    slide.appendChild(video);
                } else {
                    const img = document.createElement('img');
                    img.src = item.src;
                    img.alt = item.alt || 'Project media';
                    slide.appendChild(img);
                }
                
                this.slidesContainer.appendChild(slide);
            });
            
            // Actualizar dots
            this.updateDots();
            this.updateSlidePosition();
        }
        
        updateSlidePosition() {
            if (!this.slidesContainer) return;
            const offset = -this.currentIndex * 100;
            this.slidesContainer.style.transform = `translateX(${offset}%)`;
            
            // Controlar reproducción de videos
            const slides = this.slidesContainer.children;
            for (let i = 0; i < slides.length; i++) {
                const video = slides[i].querySelector('video');
                if (video) {
                    if (i === this.currentIndex) {
                        video.play().catch(e => console.log('Video play error:', e));
                    } else {
                        video.pause();
                    }
                }
            }
            
            this.updateDots();
        }
        
        updateDots() {
            if (!this.dotsContainer) return;
            
            const dots = this.dotsContainer.querySelectorAll('.carousel-dot, .detail-carousel-dot');
            dots.forEach((dot, idx) => {
                if (idx === this.currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        goTo(index) {
            if (index < 0) index = this.mediaItems.length - 1;
            if (index >= this.mediaItems.length) index = 0;
            this.currentIndex = index;
            this.updateSlidePosition();
        }
        
        next() {
            this.goTo(this.currentIndex + 1);
            this.resetAutoPlay();
        }
        
        prev() {
            this.goTo(this.currentIndex - 1);
            this.resetAutoPlay();
        }
        
        startAutoPlay() {
            if (!this.enableAutoPlay || this.mediaItems.length <= 1) return;
            if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
        }
        
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }
        
        resetAutoPlay() {
            if (!this.enableAutoPlay) return;
            this.stopAutoPlay();
            this.startAutoPlay();
        }
        
        destroy() {
            this.stopAutoPlay();
        }
    }

    // ============================================
    // LLUVIA DE FONDO (canvas)
    // ============================================
    function startMatrixRain() {
        if (!matrixCanvas) return;
        
        const ctx = matrixCanvas.getContext('2d');
        
        function resizeCanvas() {
            matrixCanvas.width  = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const cols    = Math.floor(matrixCanvas.width / 20);
        const drops   = Array(cols).fill(1);
        const rainChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'.split('');

        function drawRain() {
            if (!animationContainer || animationContainer.style.display === 'none') return;
            
            ctx.fillStyle = 'rgba(10, 10, 10, 0.07)';
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            ctx.fillStyle = 'rgba(212, 255, 94, 0.85)';
            ctx.font = '14px "Courier New", monospace';

            for (let i = 0; i < drops.length; i++) {
                const char = rainChars[Math.floor(Math.random() * rainChars.length)];
                const x = i * 20;
                const y = drops[i] * 20;
                ctx.fillText(char, x, y);
                if (y > matrixCanvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            rainAnimId = requestAnimationFrame(drawRain);
        }
        
        drawRain();
    }

    function stopMatrixRain() {
        if (rainAnimId) {
            cancelAnimationFrame(rainAnimId);
            rainAnimId = null;
        }
    }

    // ============================================
    // SCRAMBLE DE UN CARÁCTER
    // ============================================
    function scrambleChar(el, finalChar, duration) {
        return new Promise(resolve => {
            const start    = performance.now();
            const interval = 40;
            
            el.classList.add('scrambling');
            el.classList.remove('resolved');

            function tick() {
                const elapsed = performance.now() - start;
                if (elapsed >= duration) {
                    el.textContent = finalChar;
                    el.classList.remove('scrambling');
                    el.classList.add('resolved');
                    resolve();
                    return;
                }
                el.textContent = randChar();
                const timer = setTimeout(tick, interval);
                scrambleTimers.push(timer);
            }
            tick();
        });
    }

    // ============================================
    // ANIMACIÓN PRINCIPAL
    // ============================================
    async function startAnimation() {
        try {
            if (!scrambleChars.length) {
                skipAnimation();
                return;
            }
            
            if (animationContainer) {
                animationContainer.style.display = 'flex';
                animationContainer.style.opacity = '1';
            }
            
            startMatrixRain();
            
            scrambleChars.forEach((ch, idx) => {
                ch.textContent = randChar();
                ch.classList.add('scrambling');
                ch.classList.remove('resolved');
            });
            
            await wait(600);
            
            const labels = ['INITIALIZING', 'LOADING DATA', 'DECODING...', 'RESOLVING', 'ACCESS GRANTED'];
            
            for (let i = 0; i < scrambleChars.length; i++) {
                const ch = scrambleChars[i];
                
                const labelIdx = Math.min(Math.floor((i / scrambleChars.length) * labels.length), labels.length - 1);
                if (scrambleLabel) scrambleLabel.textContent = labels[labelIdx];
                
                const pct = Math.round(((i + 1) / scrambleChars.length) * 100);
                if (scrambleBarFill) scrambleBarFill.style.width = pct + '%';
                if (scrambleStatus) scrambleStatus.textContent = `${pct}% COMPLETE`;
                
                await scrambleChar(ch, WORD[i], 280);
                await wait(50);
            }
            
            if (scrambleLabel) scrambleLabel.textContent = 'ACCESS GRANTED';
            if (scrambleBarFill) scrambleBarFill.style.width = '100%';
            if (scrambleStatus) scrambleStatus.textContent = '100% COMPLETE';
            
            await wait(600);
            
            stopMatrixRain();
            
            if (animationContainer) {
                animationContainer.style.transition = 'opacity 0.5s ease';
                animationContainer.style.opacity = '0';
                await wait(500);
                animationContainer.style.display = 'none';
            }
            
            if (skipBtn) skipBtn.style.display = 'none';
            animationDone = true;
            
            if (projectsContainer) {
                projectsContainer.style.transition = 'opacity 0.6s ease';
                projectsContainer.style.opacity = '1';
            }
            
            await wait(400);
            initPage();
            
        } catch (err) {
            console.error('Animation error:', err);
            skipAnimation();
        }
    }

    // ============================================
    // SKIP ANIMATION
    // ============================================
    function skipAnimation() {
        if (animationDone) return;
        animationDone = true;
        
        scrambleTimers.forEach(timer => clearTimeout(timer));
        scrambleTimers = [];
        
        stopMatrixRain();
        
        if (animationContainer) {
            animationContainer.style.transition = 'opacity 0.3s ease';
            animationContainer.style.opacity = '0';
            setTimeout(() => {
                if (animationContainer) animationContainer.style.display = 'none';
            }, 300);
        }
        
        if (skipBtn) skipBtn.style.display = 'none';
        
        if (projectsContainer) {
            projectsContainer.style.opacity = '1';
            projectsContainer.style.transition = 'opacity 0.3s ease';
        }
        
        setTimeout(() => {
            initPage();
        }, 300);
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', skipAnimation);
    }
    
    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            skipAnimation();
            document.removeEventListener('keydown', onKey);
        }
    }, { once: true });

    // ============================================
    // FUNCIÓN PARA CREAR CARRUSEL EN TARJETA
    // ============================================
    function createCardCarousel(cardElement, mediaItems, cardId) {
        // Encontrar o crear el contenedor de medios
        let mediaContainer = cardElement.querySelector('.project-media');
        if (!mediaContainer) return null;
        
        // Guardar el badge de año si existe
        const yearBadge = mediaContainer.querySelector('.project-year-badge');
        const badgeHTML = yearBadge ? yearBadge.outerHTML : '';
        
        // Crear estructura del carrusel
        const carouselHTML = `
            <div class="carousel-container">
                <div class="carousel-slides"></div>
                ${mediaItems.length > 1 ? `
                    <button class="carousel-btn carousel-btn-prev">‹</button>
                    <button class="carousel-btn carousel-btn-next">›</button>
                    <div class="carousel-dots"></div>
                ` : ''}
            </div>
        `;
        
        mediaContainer.innerHTML = carouselHTML + (yearBadge ? yearBadge : '');
        
        const carouselContainer = mediaContainer.querySelector('.carousel-container');
        
        // Crear instancia del carrusel
        const carousel = new MediaCarousel(carouselContainer, mediaItems, {
            autoPlayDelay: 4000,
            enableAutoPlay: mediaItems.length > 1
        });
        
        return carousel;
    }

    // ============================================
    // REFERENCIAS DEL PANEL DE DETALLE
    // ============================================
    const detailOverlay = document.getElementById('detailOverlay');
    const detailPanel   = document.getElementById('detailPanel');
    const detailClose   = document.getElementById('detailClose');

    // ============================================
    // FUNCIÓN PARA ACTUALIZAR MEDIA EN DETAIL
    // ============================================
    function updateDetailMedia(projectId) {
        const data = projectsData[projectId];
        if (!data || !data.media) return null;
        
        const mediaContainer = document.querySelector('.detail-media');
        if (!mediaContainer) return null;
        
        // Guardar el carrusel anterior si existe
        if (detailCarousels.has(projectId)) {
            const oldCarousel = detailCarousels.get(projectId);
            if (oldCarousel) oldCarousel.destroy();
            detailCarousels.delete(projectId);
        }
        
        // Crear estructura del carrusel
        const carouselHTML = `
            <div class="detail-carousel-container">
                <div class="detail-carousel-slides"></div>
                ${data.media.length > 1 ? `
                    <button class="detail-carousel-btn detail-carousel-btn-prev">‹</button>
                    <button class="detail-carousel-btn detail-carousel-btn-next">›</button>
                    <div class="detail-carousel-dots"></div>
                ` : ''}
            </div>
        `;
        
        mediaContainer.innerHTML = carouselHTML;
        
        const carouselContainer = mediaContainer.querySelector('.detail-carousel-container');
        
        // Crear instancia del carrusel
        const carousel = new MediaCarousel(carouselContainer, data.media, {
            autoPlayDelay: 5000,
            enableAutoPlay: data.media.length > 1
        });
        
        detailCarousels.set(projectId, carousel);
        
        return carousel;
    }

    // ============================================
    // INIT — filtros, cards, detalle
    // ============================================
    function initPage() {
        if (!projectsContainer) return;
        
        // --- Crear carruseles para todas las tarjetas ---
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const id = card.getAttribute('data-id');
            const data = projectsData[id];
            if (data && data.media && data.media.length > 0) {
                const carousel = createCardCarousel(card, data.media, id);
                if (carousel) carousels.set(id, carousel);
            }
        });
        
        // --- Intersection observer: animar tarjetas al entrar ---
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('animated'), i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cards.forEach(card => observer.observe(card));

        // --- FILTROS ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    cards.forEach(card => {
                        const match = filter === 'all' || card.getAttribute('data-category') === filter;
                        if (match) {
                            card.classList.remove('hidden-card');
                            card.classList.remove('animated');
                            setTimeout(() => card.classList.add('animated'), 50);
                        } else {
                            card.classList.add('hidden-card');
                        }
                    });
                });
            });
        }

        // --- ABRIR DETALLE ---
        cards.forEach(card => {
            card.addEventListener('click', function (e) {
                if (e.target.classList.contains('expand-btn') || 
                    e.target.classList.contains('carousel-btn') ||
                    e.target.classList.contains('carousel-dot')) {
                    return;
                }
                const id = this.getAttribute('data-id');
                if (id) openDetail(id);
            });
        });
        
        // Botones expand dentro de las tarjetas
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const card = this.closest('.project-card');
                const id = card ? card.getAttribute('data-id') : null;
                if (id) openDetail(id);
            });
        });

        // --- CERRAR DETALLE ---
        if (detailClose) {
            detailClose.addEventListener('click', closeDetail);
        }
        if (detailOverlay) {
            detailOverlay.addEventListener('click', function (e) {
                if (e.target === detailOverlay) closeDetail();
            });
        }
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeDetail();
        });
    }

    // ============================================
    // ABRIR / CERRAR PANEL DE DETALLE
    // ============================================
    function openDetail(id) {
        const data = projectsData[id];
        if (!data) return;

        // Actualizar el carrusel de medios
        updateDetailMedia(id);

        const detailMeta = document.getElementById('detailMeta');
        if (detailMeta) {
            detailMeta.innerHTML = `
                <span class="detail-category">${data.category}</span>
                <span class="detail-year">${data.year}</span>
            `;
        }

        const detailTitle = document.getElementById('detailTitle');
        if (detailTitle) detailTitle.textContent = data.title;
        
        const detailDescription = document.getElementById('detailDescription');
        if (detailDescription) detailDescription.textContent = data.description;

        const detailHighlights = document.getElementById('detailHighlights');
        if (detailHighlights) {
            detailHighlights.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');
        }

        const detailTags = document.getElementById('detailTags');
        if (detailTags) {
            detailTags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
        }

        if (detailPanel) detailPanel.scrollTop = 0;
        if (detailOverlay) detailOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        if (detailOverlay) detailOverlay.classList.remove('open');
        document.body.style.overflow = '';
        
        // Limpiar carruseles del detalle
        detailCarousels.forEach(carousel => {
            if (carousel) carousel.destroy();
        });
        detailCarousels.clear();
    }

    // ============================================
    // INICIAR ANIMACIÓN
    // ============================================
    setTimeout(() => {
        startAnimation();
    }, 100);
});
