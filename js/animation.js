// Variables globales
let isPlaying = false;
let audioPlayer;
let playBtn;
let surpriseBtn;
let hiddenMessage;

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    startAnimations();
});

// Inicializar elementos del DOM
function initializeElements() {
    audioPlayer = document.getElementById('audioPlayer');
    playBtn = document.getElementById('playBtn');
    surpriseBtn = document.getElementById('surpriseBtn');
    hiddenMessage = document.getElementById('hiddenMessage');
    
    // Debug: verificar que los elementos se encontraron
    console.log('Elementos encontrados:');
    console.log('audioPlayer:', audioPlayer);
    console.log('playBtn:', playBtn);
    console.log('surpriseBtn:', surpriseBtn);
    console.log('hiddenMessage:', hiddenMessage);
}

// Configurar event listeners
function setupEventListeners() {
    // Reproductor de música
    if (playBtn) {
        playBtn.addEventListener('click', toggleMusic);
        console.log('Event listener de música agregado');
    }
    
    // Botón de sorpresa
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botón de sorpresa clickeado');
            showSurprise();
        });
        console.log('Event listener de sorpresa agregado');
    } else {
        console.error('surpriseBtn no encontrado');
    }
    
    
    // Cerrar mensaje oculto al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (hiddenMessage && hiddenMessage.classList.contains('show') && !hiddenMessage.contains(e.target)) {
            hideSurprise();
        }
    });
    
    // Efectos de hover para móviles
    if (window.innerWidth <= 768) {
        addTouchEffects();
    }
}

// Controlar reproducción de música
function toggleMusic() {
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = '🎵';
        playBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        audioPlayer.play().then(() => {
            playBtn.textContent = '⏸️';
            playBtn.classList.add('playing');
            isPlaying = true;
        }).catch(error => {
            console.log('Error al reproducir música:', error);
            // Mostrar mensaje de que necesita interacción del usuario
            showMusicPermissionMessage();
        });
    }
}

// Mostrar mensaje sobre permisos de música
function showMusicPermissionMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        z-index: 10000;
        font-size: 14px;
    `;
    message.innerHTML = '🎵 Toca cualquier parte de la pantalla para activar la música';
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

// Mostrar sorpresa
function showSurprise() {
    console.log('Mostrando sorpresa...');
    
    // Crear la sorpresa directamente en el DOM
    const surpriseDiv = document.createElement('div');
    surpriseDiv.id = 'surpriseOverlay';
    surpriseDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.5s ease;
    `;
    
    // Contenido del girasol
    surpriseDiv.innerHTML = `
        <div style="position: relative; width: 500px; height: 500px; transform: scale(0.8); transition: transform 0.8s ease; margin-top: -50px;">
            <!-- Pétalos del girasol -->
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(0deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(22.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(45deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(67.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(90deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(112.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(135deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(157.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(180deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(202.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(225deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(247.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(270deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(292.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(315deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
                <div style="position: absolute; width: 80px; height: 150px; background: linear-gradient(45deg, #FFD700, #FFA500); border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; transform-origin: center bottom; top: 50%; left: 50%; margin-left: -40px; margin-top: -75px; transform: rotate(337.5deg) translateY(-150px); box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);"></div>
            </div>
            
            <!-- Centro del girasol con la foto -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 220px; height: 220px; background: radial-gradient(circle, #8B4513 0%, #654321 50%, #4A2C2A 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(139, 69, 19, 0.5);">
                <img src="media/Allison.jpg" alt="Allison" style="width: 170px; height: 170px; border-radius: 50%; object-fit: cover; border: 4px solid #FFD700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);">
            </div>
            
            <!-- Texto debajo del círculo de la foto -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top: 120px;">
                <div id="ovalText" style="font-family: 'Dancing Script', cursive; font-size: 1.8rem; color: #FFD700; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); font-weight: 600; animation: typewriter 3s ease-in-out forwards; opacity: 0; text-align: center;">¡Feliz Cumpleaños Allison! 🌟</div>
            </div>
            
            <!-- Mensaje flotante abajo -->
            <div style="position: absolute; bottom: -120px; left: 50%; transform: translateX(-50%); text-align: center; color: white; background: rgba(0, 0, 0, 0.8); padding: 15px 20px; border-radius: 15px; backdrop-filter: blur(10px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
                <p style="font-size: 1rem; margin-bottom: 15px; font-weight: 500; color: #FFD700;">¡Que brilles como el sol! ✨</p>
                <div style="font-size: 1.5rem; margin-bottom: 15px;">💖💖💖</div>
                <button id="moreBalloonsBtn" style="background: linear-gradient(45deg, #FF69B4, #FF1493, #FF69B4); color: white; border: none; padding: 10px 15px; border-radius: 20px; font-size: 1.2rem; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4); transition: all 0.3s ease; animation: balloonBounce 1.5s infinite;">🎈</button>
            </div>
            
            <!-- Botón cerrar en esquina superior derecha -->
            <button id="closeSunflowerBtn" style="position: absolute; top: 20px; right: 20px; background: linear-gradient(45deg, #FF4444, #CC0000); color: white; border: none; padding: 10px 15px; border-radius: 50%; font-size: 1.2rem; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 68, 68, 0.4); transition: all 0.3s ease; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">❌</button>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(surpriseDiv);
    
    // Animar entrada
    setTimeout(() => {
        surpriseDiv.style.opacity = '1';
        const sunflower = surpriseDiv.querySelector('div');
        sunflower.style.transform = 'scale(1)';
        
        // Agregar event listener al botón de más globos
        const moreBalloonsBtn = document.getElementById('moreBalloonsBtn');
        if (moreBalloonsBtn) {
            moreBalloonsBtn.addEventListener('click', function() {
                createExtraBalloons();
                // Efecto visual en el botón
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
            
            // Efecto hover para el botón de globos
            moreBalloonsBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 8px 25px rgba(255, 105, 180, 0.6)';
            });
            
            moreBalloonsBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(255, 105, 180, 0.4)';
            });
        }
        
        // Agregar event listener al botón de cerrar
        const closeBtn = document.getElementById('closeSunflowerBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                hideSurprise();
            });
            
            // Efecto hover para el botón de cerrar
            closeBtn.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 6px 20px rgba(255, 68, 68, 0.6)';
            });
            
            closeBtn.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(255, 68, 68, 0.4)';
            });
        }
    }, 100);
    
    // Reproducir música automáticamente
    if (!isPlaying && audioPlayer) {
        audioPlayer.play().then(() => {
            playBtn.textContent = '⏸️';
            playBtn.classList.add('playing');
            isPlaying = true;
            console.log('Música iniciada');
        }).catch(error => {
            console.log('Error al reproducir música:', error);
        });
    }
    
    // Crear confetti adicional
    createExtraConfetti();
    
    // Vibrar si es móvil
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }
    
    // Cambiar el texto del botón
    surpriseBtn.textContent = '¡Increíble! 🌟';
    surpriseBtn.style.background = 'linear-gradient(45deg, #FFD700, #FFA500)';
}

// Ocultar sorpresa
function hideSurprise() {
    const surpriseOverlay = document.getElementById('surpriseOverlay');
    if (surpriseOverlay) {
        surpriseOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(surpriseOverlay);
        }, 500);
    }
    
    // Reanudar animaciones de girasoles
    const sunflowers = document.querySelector('.sunflowers');
    if (sunflowers) {
        sunflowers.classList.remove('paused');
    }
    
    surpriseBtn.textContent = '¡Toca para una sorpresa! 🎉';
    surpriseBtn.style.background = 'linear-gradient(45deg, #FF6347, #FF8C00)';
}

// Crear confetti adicional
function createExtraConfetti() {
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#FF8C00', '#FFE5B4'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                z-index: 1000;
                animation: confettiFall 3s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 3000);
        }, i * 100);
    }
}

// Crear globos adicionales (solo cuando se hace clic en el botón)
function createExtraBalloons() {
    const balloonEmojis = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const surpriseOverlay = document.getElementById('surpriseOverlay');
    
    if (!surpriseOverlay) {
        console.log('No hay girasol abierto');
        return;
    }
    
    // Crear globos dentro del modal del girasol
    const sunflowerContainer = surpriseOverlay.querySelector('div');
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.innerHTML = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
            balloon.style.cssText = `
                position: absolute;
                font-size: 25px;
                bottom: -50px;
                left: ${Math.random() * 100}%;
                z-index: 1001;
                animation: balloonRiseInModal 3s ease-out forwards;
                pointer-events: none;
            `;
            
            sunflowerContainer.appendChild(balloon);
            
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.parentNode.removeChild(balloon);
                }
            }, 3000);
        }, i * 150);
    }
}

// Iniciar animaciones automáticas
function startAnimations() {
    // Animación de entrada de elementos
    const elements = document.querySelectorAll('.sunflower, .birthday-title, .birthday-message, .surprise-btn');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Efecto de parpadeo en el título
    setTimeout(() => {
        const title = document.querySelector('.birthday-title');
        setInterval(() => {
            title.style.transform = 'scale(1.05)';
            setTimeout(() => {
                title.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }, 2000);
}

// Efectos táctiles para móviles
function addTouchEffects() {
    const touchElements = document.querySelectorAll('.surprise-btn, .play-btn');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Detectar orientación del dispositivo
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Reajustar elementos si es necesario
        if (window.innerWidth <= 768) {
            addTouchEffects();
        }
    }, 100);
});

// Efecto de parallax suave en scroll (si hay scroll)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.sunflowers');
    if (parallax) {
        parallax.style.transform = `translateX(-50%) translateY(${scrolled * 0.1}px)`;
    }
});

// Función para crear corazones flotantes
function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.cssText = `
        position: fixed;
        font-size: 20px;
        top: 100vh;
        left: ${Math.random() * 100}%;
        z-index: 1000;
        animation: heartFloat 4s linear forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 4000);
}

// CSS para corazones flotantes y globos
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes balloonRise {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes balloonRiseInModal {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-200px) rotate(360deg);
            opacity: 0;
        }
    }
    @keyframes typewriter {
        0% {
            opacity: 0;
            transform: scale(0.8);
        }
        50% {
            opacity: 0.7;
            transform: scale(1.1);
        }
        100% {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    /* Responsive adjustments for mobile */
    @media (max-width: 768px) {
        #surpriseOverlay > div {
            margin-top: -100px !important;
            transform: scale(0.7) !important;
        }
    }
    
    @media (max-width: 480px) {
        #surpriseOverlay > div {
            margin-top: -120px !important;
            transform: scale(0.6) !important;
        }
    }
`;
document.head.appendChild(heartStyle);

// Crear corazones cada 3 segundos
setInterval(createFloatingHearts, 3000);

// Mensaje de bienvenida
setTimeout(() => {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 215, 0, 0.9);
        color: #333;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: 600;
        z-index: 1000;
        animation: slideDown 0.5s ease;
    `;
    welcomeMessage.textContent = '¡Bienvenida a tu tarjeta especial! 🌻';
    document.body.appendChild(welcomeMessage);
    
    setTimeout(() => {
        welcomeMessage.style.animation = 'slideUp 0.5s ease forwards';
        setTimeout(() => {
            document.body.removeChild(welcomeMessage);
        }, 500);
    }, 3000);
}, 1000);

// CSS para mensaje de bienvenida
const welcomeStyle = document.createElement('style');
welcomeStyle.textContent = `
    @keyframes slideDown {
        0% { transform: translateX(-50%) translateY(-100%); }
        100% { transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideUp {
        0% { transform: translateX(-50%) translateY(0); }
        100% { transform: translateX(-50%) translateY(-100%); }
    }
`;
document.head.appendChild(welcomeStyle);
