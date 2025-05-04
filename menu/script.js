function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `-${size}px`;
        
        const duration = Math.random() * 10 + 10;
        particle.style.animationDuration = `${duration}s`;
        
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        particlesContainer.appendChild(particle);
    }
}

function initModal() {
    const secretButton = document.getElementById('secretButton');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');
    
    const secretImageUrl = 'img/beni.jpg';
    
    secretButton.addEventListener('click', function() {
        modalImage.src = secretImageUrl;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeModal.addEventListener('click', function() {
        imageModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function animateCardsOnLoad() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        // Kis késleltetés minden kártyánál a fokozatos megjelenés érdekében
        setTimeout(() => {
            card.classList.add('animate__animated', 'animate__fadeInUp');
        }, index * 100); // 100ms eltérés minden kártya között
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    initModal();
    animateCardsOnLoad(); // Megváltoztattuk a függvénynevet és a működést
});