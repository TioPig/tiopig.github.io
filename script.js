// Configuración de particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 2000  // Aumentado para mejor distribución
            }
        },
        color: {
            value: '#00ff88'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff88',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'bounce',  // Cambiado a 'bounce' para mantener partículas dentro
            bounce: true
        }
    },
    interactivity: {
        detect_on: 'window',  // Cambiado de 'canvas' a 'window'
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 150,  // Ajustado para mejor respuesta
                duration: 0.4
            }
        }
    },
    retina_detect: true
});


// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.tech-item, .feature-item, .glass-card').forEach(element => {
    observer.observe(element);
});

// Manejo del formulario de contacto
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animación del botón
    const button = this.querySelector('button');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;

    // Simulación de envío (aquí puedes agregar tu lógica de envío real)
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        button.classList.add('btn-success');
        
        // Resetear el formulario después de 2 segundos
        setTimeout(() => {
            this.reset();
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            button.classList.remove('btn-success');
            button.disabled = false;
        }, 2000);
    }, 1500);
});

// Activar tooltips de Bootstrap
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Efecto hover para los items tecnológicos
document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animación de typing para textos
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Animación del título principal
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriter(mainTitle, originalText, 50);
    }
    
    // Mostrar elementos con fade in
    document.querySelectorAll('.animate__animated').forEach(element => {
        element.style.opacity = '1';
    });
});

// Detectar cuando un elemento entra en el viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Añadir animaciones cuando los elementos entran en el viewport
document.addEventListener('scroll', () => {
    document.querySelectorAll('.tech-item, .feature-item').forEach(item => {
        if (isInViewport(item)) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar los elementos con opacidad 0
document.querySelectorAll('.tech-item, .feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
});

