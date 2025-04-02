document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    const animationContainer = document.getElementById('animation-container');
    const mainContent = document.querySelector('main');
    const solid = document.querySelector('.solid');
    const coreInner = document.querySelector('.core-inner');
    document.body.style.overflow = 'hidden';
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.visibility = 'hidden';
    }
    
    setTimeout(() => {
        if (solid && coreInner) {
            coreInner.style.animation = 'shrink-core 3s forwards';
            solid.classList.add('pre-explosion');
            
            setTimeout(() => {
                solid.classList.remove('pre-explosion');
                solid.classList.add('explosion');
                coreInner.style.animation = 'expand-core 1s forwards';
            }, 3000);

            setTimeout(() => {
                animationContainer.style.opacity = '0';
                animationContainer.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    animationContainer.remove();
                    initParticles();
                    initializeOtherAnimations();
                    document.body.style.overflow = 'auto';
                    setTimeout(() => {
                        if (mainContent) {
                            mainContent.style.visibility = 'visible';
                            mainContent.style.opacity = '1';
                            mainContent.style.transition = 'opacity 0.5s ease';
                        }
                    }, 500);
                },);
            }, 4000);
        }
    },);
});



function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 400,
                density: {
                    enable: true,
                    value_area: 1500
                }
            },
            color: {
                value: '#00ff88'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.6,
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
                out_mode: 'bounce',
                bounce: true
            }
        },
        interactivity: {
            detect_on: 'window',
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
                    distance: 150,
                    duration: 0.4
                }
            }
        },
        retina_detect: true
    });
}

function initializeOtherAnimations() {
    const mainTitle = document.querySelector('h1');
    if (mainTitle) {
        const text = "Italo Vicente Brignardello Salas";
        mainTitle.innerHTML = '<i class="fas fa-code"></i> <span></span> <i class="fas fa-code"></i>';
        const textSpan = mainTitle.querySelector('span');
        let i = 0;
        
        function type() {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        type();
    }
    
    document.querySelectorAll('.animate__animated').forEach(element => {
        element.style.opacity = '1';
    });
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('.navbar').offsetHeight;
        let offset = navHeight;

        // Añadir offset adicional solo para la sección de tecnologías
        if(this.getAttribute('href') === '#tecnologias') {
            offset += -90; // Puedes ajustar este valor según necesites
        }
        
        if(this.getAttribute('href') === '#contacto') {
            offset += -190; // Puedes ajustar este valor según necesites
        }

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});


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

document.querySelectorAll('.tech-item, .feature-item, .glass-card').forEach(element => {
    observer.observe(element);
});

document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const button = this.querySelector('button');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje Enviado!';
        button.classList.add('btn-success');
        
        setTimeout(() => {
            this.reset();
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            button.classList.remove('btn-success');
            button.disabled = false;
        }, 2000);
    }, 1500);
});

const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

document.querySelectorAll('.tech-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

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

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('scroll', () => {
    document.querySelectorAll('.tech-item, .feature-item').forEach(item => {
        if (isInViewport(item)) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.tech-item, .feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
});
