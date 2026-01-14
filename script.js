// script.js
document.addEventListener('DOMContentLoaded', function() {
    const descriptionCard = document.getElementById('descriptionCard');
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isHidden = false;
    
    // Asegurarnos de que hay suficiente altura para scroll
    function ensureScrollHeight() {
        const body = document.body;
        const html = document.documentElement;
        
        // Calcular la altura actual
        const height = Math.max(
            body.scrollHeight, 
            body.offsetHeight,
            html.clientHeight, 
            html.scrollHeight, 
            html.offsetHeight
        );
        
        // Si la altura es menor que la ventana + 500px, agregar espacio
        if (height < window.innerHeight + 500) {
            // Crear un div invisible para generar scroll
            const scrollSpacer = document.createElement('div');
            scrollSpacer.id = 'scrollSpacer';
            scrollSpacer.style.cssText = `
                position: absolute;
                top: 100vh;
                left: 0;
                width: 100%;
                height: 130px;
                pointer-events: none;
                z-index: -9999;
                opacity: 0;
            `;
            document.body.appendChild(scrollSpacer);
            console.log('📏 Espacio de scroll añadido');
        }
    }
    
    function handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scroll hacia ABAJO (más de 50px) → ocultar
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            if (!isHidden) {
                descriptionCard.style.transition = 'all 0.4s ease';
                descriptionCard.classList.add('hidden');
                descriptionCard.classList.remove('visible');
                isHidden = true;
            }
        } 
        // Scroll hacia ARRIBA → mostrar
        else if (currentScrollY < lastScrollY) {
            if (isHidden) {
                descriptionCard.style.transition = 'all 0.4s ease';
                descriptionCard.classList.remove('hidden');
                descriptionCard.classList.add('visible');
                isHidden = false;
            }
        }
        
        // Si estamos en la parte superior, mostrar siempre
        if (currentScrollY < 20) {
            descriptionCard.classList.remove('hidden');
            descriptionCard.classList.add('visible');
            isHidden = false;
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Inicializar
    ensureScrollHeight();
    
    // Activar el listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // También manejar rueda del mouse para mejor experiencia
    let wheelTimeout;
    let wheelDelta = 0;
    
    window.addEventListener('wheel', function(e) {
        clearTimeout(wheelTimeout);
        wheelDelta += e.deltaY;
        
        // Si la rueda va hacia abajo
        if (wheelDelta > 100 && !isHidden) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo(0, currentScroll + 100);
            
            descriptionCard.classList.add('hidden');
            descriptionCard.classList.remove('visible');
            isHidden = true;
            wheelDelta = 0;
        }
        
        // Resetear acumulación después de 500ms
        wheelTimeout = setTimeout(() => {
            wheelDelta = 0;
        }, 500);
    });
    
    // Para debugging
    console.log('✅ Script de scroll cargado correctamente');
    console.log('Altura del documento:', document.documentElement.scrollHeight);
    console.log('Altura de la ventana:', window.innerHeight);
});
