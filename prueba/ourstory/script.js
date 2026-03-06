    // Inicialización específica para esta página
        document.addEventListener('DOMContentLoaded', function() {
            // AOS
            AOS.init({
                duration: 1200,
                once: true,
                offset: 100,
                easing: 'ease-out-cubic'
            });

            // Opcional: Cambiar estado del navbar al hacer scroll (reutilizando lógica de tu script.js)
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        });
