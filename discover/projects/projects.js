// projects.js
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
    const animationContainer  = document.getElementById('animationContainer');
    const whiteRectangle      = document.getElementById('whiteRectangle');
    const blackWord           = document.getElementById('blackWord');
    const typingCursor        = document.getElementById('typingCursor');
    const typingText          = document.getElementById('typingText');
    const letters             = document.querySelectorAll('.typing-text .letter');
    const skipBtn             = document.getElementById('skipBtn');
    const projectsContainer   = document.querySelector('.projects-container');
    const detailOverlay       = document.getElementById('detailOverlay');
    const detailPanel         = document.getElementById('detailPanel');
    const detailClose         = document.getElementById('detailClose');

    // ============================================
    // CONFIGURACIÓN ANIMACIÓN
    // ============================================
    const config = {
        initialDelay:       100,
        rectangleTransform: 550,
        typingStartDelay:   180,
        letterDelay:        90,
        fadeOutDuration:    380,
        startPosition:      80,
        textMoveAmount:     7,
    };

    let animationDone = false;

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ============================================
    // SKIP
    // ============================================
    function skipAnimation() {
        if (animationDone) return;
        animationDone = true;
        animationContainer.style.transition = 'opacity 0.3s ease';
        animationContainer.style.opacity = '0';
        setTimeout(() => {
            animationContainer.style.display = 'none';
            skipBtn.style.display = 'none';
            projectsContainer.style.opacity = '1';
            initPage();
        }, 300);
    }

    skipBtn.addEventListener('click', skipAnimation);
    document.addEventListener('keydown', function onKey() {
        skipAnimation();
        document.removeEventListener('keydown', onKey);
    }, { once: true });

    // ============================================
    // ANIMACIÓN PRINCIPAL
    // ============================================
    async function startAnimation() {
        try {
            blackWord.style.opacity = '1';
            await wait(450);

            blackWord.style.opacity = '0';
            whiteRectangle.style.transition = `all ${config.rectangleTransform}ms cubic-bezier(0.77, 0, 0.175, 1)`;
            whiteRectangle.style.width       = '6px';
            whiteRectangle.style.height      = '18vh';
            whiteRectangle.style.left        = `${config.startPosition}%`;
            whiteRectangle.style.top         = '50%';
            whiteRectangle.style.transform   = 'translate(-50%, -50%)';
            whiteRectangle.style.borderRadius = '3px';
            await wait(config.rectangleTransform);

            typingCursor.style.opacity = '1';
            typingCursor.style.left    = `${config.startPosition}%`;
            await wait(config.typingStartDelay);

            typingText.style.opacity = '1';
            typingText.style.left    = '80%';

            let pos = 80;
            for (let i = 0; i < letters.length; i++) {
                letters[i].style.opacity   = '1';
                letters[i].style.transform = 'translateX(0)';
                if (i > 0) {
                    pos -= config.textMoveAmount;
                    typingText.style.transition = 'left 0.18s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    typingText.style.left = `${pos}%`;
                    letters[i].style.transform = 'translateX(10px)';
                    setTimeout(() => { letters[i].style.transform = 'translateX(0)'; }, 90);
                }
                if (i < letters.length - 1) {
                    typingCursor.style.opacity = '0.2';
                    setTimeout(() => { typingCursor.style.opacity = '1'; }, 55);
                    await wait(config.letterDelay);
                }
            }

            for (let p = 0; p < 2; p++) {
                typingCursor.style.opacity = '0.3';
                await wait(110);
                typingCursor.style.opacity = '1';
                await wait(110);
            }

            animationContainer.style.transition = `opacity ${config.fadeOutDuration}ms ease`;
            animationContainer.style.opacity    = '0';
            await wait(config.fadeOutDuration);

            animationContainer.style.display = 'none';
            skipBtn.style.display = 'none';
            animationDone = true;

            projectsContainer.style.transition = 'opacity 0.5s ease';
            projectsContainer.style.opacity    = '1';
            await wait(400);

            initPage();

        } catch (err) {
            console.error('Animation error:', err);
            skipAnimation();
        }
    }

    // ============================================
    // INIT — filtros, cards, detalle
    // ============================================
    function initPage() {

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
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                document.querySelectorAll('.project-card').forEach(card => {
                    const match = filter === 'all' || card.getAttribute('data-category') === filter;
                    if (match) {
                        card.classList.remove('hidden-card');
                        // Reanimar al aparecer
                        card.classList.remove('animated');
                        setTimeout(() => card.classList.add('animated'), 50);
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            });
        });

        // --- ABRIR DETALLE ---
        document.querySelectorAll('.project-card, .expand-btn').forEach(el => {
            el.addEventListener('click', function (e) {
                // Evitar doble disparo si click en el botón dentro de la tarjeta
                if (e.target.classList.contains('expand-btn') && el.classList.contains('project-card')) return;

                const card = el.classList.contains('project-card') ? el : el.closest('.project-card');
                const id   = card.getAttribute('data-id');
                openDetail(id);
            });
        });

        // --- CERRAR DETALLE ---
        detailClose.addEventListener('click', closeDetail);
        detailOverlay.addEventListener('click', function (e) {
            if (e.target === detailOverlay) closeDetail();
        });
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

        // Media
        const mediaEl = document.getElementById('detailMedia');
        mediaEl.innerHTML = `
            <div class="detail-media-placeholder" style="--accent: ${data.accent}">
                <span class="detail-media-icon">${data.icon}</span>
            </div>
        `;
        // Si en el futuro tienes imagen: mediaEl.innerHTML = `<img src="..." alt="${data.title}">`

        // Meta
        document.getElementById('detailMeta').innerHTML = `
            <span class="detail-category">${data.category}</span>
            <span class="detail-year">${data.year}</span>
        `;

        // Título y descripción
        document.getElementById('detailTitle').textContent       = data.title;
        document.getElementById('detailDescription').textContent = data.description;

        // Highlights
        const hl = document.getElementById('detailHighlights');
        hl.innerHTML = data.highlights.map(h => `<li>${h}</li>`).join('');

        // Tags
        const tags = document.getElementById('detailTags');
        tags.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');

        // Abrir
        detailPanel.scrollTop = 0;
        detailOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDetail() {
        detailOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    // ============================================
    // ARRANCAR
    // ============================================
    setTimeout(() => startAnimation(), config.initialDelay);
});
