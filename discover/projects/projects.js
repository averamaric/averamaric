document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // DATOS DE PROYECTOS
    // Edita aquí para cambiar el contenido del panel de detalle
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
        },
        3: {
            title: 'Industry 4.0 Device Integration',
            category: 'IoT',
            year: '2024',
            accent: 'rgba(212,255,94,0.3)',
            icon: '◎',
            description: 'As IoT Project Manager at Alhona, led the full connectivity deployment of industrial machines into IoT data platforms. Responsible for protocol selection, device onboarding, signal taxonomy design, and analytics rule development — delivering knowledge transfer documentation for both technical and non-technical stakeholders.',
            highlights: [
                'Identified and evaluated industrial devices for connectivity across multiple client sites.',
                'Researched and selected optimal communication protocols (OPC-UA, Modbus, MQTT) per device.',
                'Developed a standardized signal taxonomy used across all company projects.',
                'Deployed anomaly detection rules and conducted data-driven studies on acquired signals.',
                'Wrote technical and non-technical deliverables for client knowledge transfer.',
            ],
            tags: ['Node-RED', 'SQL', 'Allen-Bradley', 'Ignition SCADA', 'OPC-UA', 'MQTT', 'Modbus'],
        },
        4: {
            title: 'Cybersecurity in Smart Energy OT Networks',
            category: 'Research',
            year: '2025 – Present',
            accent: 'rgba(212,255,94,0.7)',
            icon: '⬡',
            description: 'Research project at Manchester Metropolitan University focused on protecting smart energy infrastructure from cyber threats. Working on deploying and testing AI-based security solutions within local operational technology (OT) networks, using real-time hardware-in-the-loop simulation.',
            highlights: [
                'Studying the OPAL-RT simulator to SEL-3555 controller communication architecture.',
                'Implementing and analysing SCADA network packet flows to identify threat patterns.',
                'Applying machine learning models for anomaly detection in critical energy infrastructure.',
                'Researching cybersecurity frameworks and architectures for OT environments.',
                'Proactively planning research activities to meet project objectives and publication deadlines.',
            ],
            tags: ['OPAL-RT', 'SEL-3555', 'SCADA', 'Machine Learning', 'Python', 'Cybersecurity', 'OT Networks'],
        },
        5: {
            title: 'Portrait Sketching Robot',
            category: 'Robotics',
            year: '2023',
            accent: 'rgba(212,255,94,0.4)',
            icon: '✦',
            description: 'An extension of the TM5 Omron robot system developed at CEIT, this project adds a portrait-sketching capability. The robot captures a user\'s face with its integrated camera, processes the image to extract key facial features, and translates them into a line sketch reproduced through robotic arm motion.',
            highlights: [
                'Designed image processing pipeline to detect and simplify facial contours.',
                'Performed precise camera-to-robot-frame calibration for accurate sketch reproduction.',
                'Implemented motion planning to translate pixel coordinates into robot tool-path trajectories.',
                'Integrated sketch generation with the existing TMFlow robot control programme.',
            ],
            tags: ['TMFlow', 'TM5 Omron', 'Image Processing', 'Camera Calibration', 'Python', 'Path Planning'],
        },
        6: {
            title: 'Predictive Maintenance Platform',
            category: 'IoT',
            year: '2024',
            accent: 'rgba(212,255,94,0.2)',
            icon: '⊕',
            description: 'Designed and deployed a data pipeline and rule engine for predictive maintenance across industrial equipment. The platform continuously acquires signals from machines, applies data-driven rules to detect early failure indicators, and generates alerts to enable proactive maintenance interventions.',
            highlights: [
                'Built a signal acquisition pipeline from industrial PLCs to a centralised SQL database.',
                'Defined and validated key performance indicators and health signals per machine type.',
                'Deployed anomaly detection and threshold-based rules to flag early degradation signs.',
                'Conducted data studies to correlate signal patterns with known failure modes.',
                'Delivered client-facing reports with actionable maintenance recommendations.',
            ],
            tags: ['SQL', 'Node-RED', 'Ignition SCADA', 'Data Analysis', 'Allen-Bradley', 'Predictive Analytics'],
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
    let activeRandomize = []; // Para controlar qué letras siguen randomizando

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    function randChar() {
        return CHARS[Math.floor(Math.random() * CHARS.length)];
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
            // Inicializar el estado
            if (!scrambleChars.length) {
                console.error('No scramble characters found');
                skipAnimation();
                return;
            }
            
            // Asegurar que el contenedor es visible
            if (animationContainer) {
                animationContainer.style.display = 'flex';
                animationContainer.style.opacity = '1';
            }
            
            startMatrixRain();
            
            // Configurar los caracteres iniciales
            scrambleChars.forEach((ch, idx) => {
                ch.textContent = randChar();
                ch.classList.add('scrambling');
                ch.classList.remove('resolved');
            });
            
            await wait(600);
            
            // Resolver letra por letra
            const labels = ['INITIALIZING', 'LOADING DATA', 'DECODING...', 'RESOLVING', 'ACCESS GRANTED'];
            
            for (let i = 0; i < scrambleChars.length; i++) {
                const ch = scrambleChars[i];
                
                // Actualizar label y barra de progreso
                const labelIdx = Math.min(Math.floor((i / scrambleChars.length) * labels.length), labels.length - 1);
                if (scrambleLabel) scrambleLabel.textContent = labels[labelIdx];
                
                const pct = Math.round(((i + 1) / scrambleChars.length) * 100);
                if (scrambleBarFill) scrambleBarFill.style.width = pct + '%';
                if (scrambleStatus) scrambleStatus.textContent = `${pct}% COMPLETE`;
                
                // Resolver este caracter
                await scrambleChar(ch, WORD[i], 280);
                await wait(50);
            }
            
            // Estado final
            if (scrambleLabel) scrambleLabel.textContent = 'ACCESS GRANTED';
            if (scrambleBarFill) scrambleBarFill.style.width = '100%';
            if (scrambleStatus) scrambleStatus.textContent = '100% COMPLETE';
            
            await wait(600);
            
            // Ocultar animación y mostrar contenido
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
        
        // Limpiar todos los timers
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

    // Configurar eventos de skip
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
    // REFERENCIAS DEL PANEL DE DETALLE
    // ============================================
    const detailOverlay = document.getElementById('detailOverlay');
    const detailPanel   = document.getElementById('detailPanel');
    const detailClose   = document.getElementById('detailClose');

    // ============================================
    // INIT — filtros, cards, detalle
    // ============================================
    function initPage() {
        if (!projectsContainer) return;
        
        // --- Intersection observer: animar tarjetas al entrar ---
        const cards = document.querySelectorAll('.project-card');
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
                if (e.target.classList.contains('expand-btn')) return;
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

        const mediaEl = document.getElementById('detailMedia');
        if (mediaEl) {
            mediaEl.innerHTML = `
                <div class="detail-media-placeholder" style="--accent: ${data.accent}">
                    <span class="detail-media-icon">${data.icon}</span>
                </div>
            `;
        }

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
    }

    // ============================================
    // INICIAR ANIMACIÓN (con pequeño delay)
    // ============================================
    // Pequeño delay para asegurar que todo está cargado
    setTimeout(() => {
        startAnimation();
    }, 100);
});
