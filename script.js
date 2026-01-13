// En tu script.js - MODIFICADO para el efecto de scroll descendente
document.addEventListener('DOMContentLoaded', function() {
    const descriptionCard = document.getElementById('descriptionCard');
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isScrolling = false;
    
    // Asegurarnos de que hay suficiente altura para scroll
    function ensureScrollHeight() {
        const body = document.body;
        const html = document.documentElement;
        
        const height = Math.max(
            body.scrollHeight, 
            body.offsetHeight,
            html.clientHeight, 
            html.scrollHeight, 
            html.offsetHeight
        );
        
        // Si la altura es menor que la ventana + 800px, agregar espacio
        if (height < window.innerHeight + 800) {
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
        }
    }
    
    function handleScroll() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // 1. PRIMERA FASE: Scroll entre 0-100px - Tarjeta baja gradualmente
        if (currentScrollY > 0 && currentScrollY <= 100) {
            // Calcular porcentaje de desplazamiento (0% a 100%)
            const scrollPercent = currentScrollY / 100;
            
            // Mover la tarjeta hacia abajo gradualmente (de 0px a 50px)
            const translateY = scrollPercent * 50;
            
            // Aplicar transformación
            descriptionCard.style.transform = `translateX(-50%) translateY(${translateY}px)`;
            descriptionCard.style.opacity = 1 - (scrollPercent * 0.3); // Ligera desaparición
            descriptionCard.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
            
            // Asegurar que esté visible
            descriptionCard.classList.remove('hidden');
            descriptionCard.classList.add('visible');
        }
        
        // 2. SEGUNDA FASE: Scroll entre 100-200px - Tarjeta desaparece gradualmente
        else if (currentScrollY > 100 && currentScrollY <= 200) {
            // Calcular porcentaje de desplazamiento (0% a 100%)
            const scrollPercent = (currentScrollY - 100) / 100;
            
            // Continuar moviendo hacia abajo (de 50px a 100px)
            const translateY = 50 + (scrollPercent * 50);
            
            // Desaparecer gradualmente
            const opacity = 0.7 - (scrollPercent * 0.7);
            
            descriptionCard.style.transform = `translateX(-50%) translateY(${translateY}px)`;
            descriptionCard.style.opacity = opacity;
            descriptionCard.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
            
            // Si la opacidad es muy baja, añadir clase hidden
            if (opacity < 0.1) {
                descriptionCard.classList.add('hidden');
                descriptionCard.classList.remove('visible');
            } else {
                descriptionCard.classList.remove('hidden');
                descriptionCard.classList.add('visible');
            }
        }
        
        // 3. TERCERA FASE: Scroll mayor a 200px - Tarjeta completamente oculta
        else if (currentScrollY > 200) {
            descriptionCard.classList.add('hidden');
            descriptionCard.classList.remove('visible');
            descriptionCard.style.opacity = '0';
            descriptionCard.style.transform = 'translateX(-50%) translateY(100px)';
        }
        
        // 4. SCROLL HACIA ARRIBA - Mostrar gradualmente
        else if (scrollDelta < 0 && currentScrollY < 200) {
            // Si estamos subiendo, mostrar la tarjeta
            descriptionCard.classList.remove('hidden');
            descriptionCard.classList.add('visible');
            
            // Calcular posición basada en el scroll actual
            if (currentScrollY <= 100) {
                const scrollPercent = currentScrollY / 100;
                const translateY = scrollPercent * 50;
                descriptionCard.style.transform = `translateX(-50%) translateY(${translateY}px)`;
                descriptionCard.style.opacity = 1 - (scrollPercent * 0.3);
            } else if (currentScrollY <= 200) {
                const scrollPercent = (currentScrollY - 100) / 100;
                const translateY = 50 + (scrollPercent * 50);
                const opacity = 0.7 - (scrollPercent * 0.7);
                descriptionCard.style.transform = `translateX(-50%) translateY(${translateY}px)`;
                descriptionCard.style.opacity = opacity;
            }
        }
        
        // 5. EN EL TOP (scrollY = 0) - Posición original
        if (currentScrollY === 0) {
            descriptionCard.style.transform = 'translateX(-50%) translateY(0px)';
            descriptionCard.style.opacity = '1';
            descriptionCard.classList.remove('hidden');
            descriptionCard.classList.add('visible');
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Inicializar
    ensureScrollHeight();
    
    // Activar el listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Para debugging
    console.log('✅ Scroll detector mejorado activado');
});
