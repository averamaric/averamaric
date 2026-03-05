// Slider simple
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Aquí podrías añadir una transición de opacidad
    console.log("Cambiando a slide: " + index);
}

// Animación de la línea al hacer scroll
window.addEventListener('scroll', () => {
    const lines = document.querySelectorAll('.scroll-line');
    lines.forEach(line => {
        let value = window.scrollY;
        // La línea puede crecer o moverse ligeramente
        line.style.height = (100 + value * 0.1) + 'px';
    });
});
