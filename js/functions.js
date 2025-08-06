// Animation au scroll avec Intersection Observer
function createScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.timeline-item, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Gestion du formulaire RSVP avec validation améliorée
document.getElementById('rsvpForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validation basique
    if (!data.name || !data.email || !data.guests || !data.attendance) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    // Simulation d'envoi avec feedback personnalisé
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Envoi en cours...';
    submitBtn.style.background = 'linear-gradient(135deg, #a1887f, #8d6e63)';

    setTimeout(() => {
        console.log('Données du formulaire:', data);

        let confirmationMessage = `Merci ${data.name} pour votre réponse ! `;

        if (data.attendance === 'oui') {
            confirmationMessage += `Nous sommes ravis de savoir que vous serez parmi nous pour cette journée spéciale. `;
            if (data.guests && data.guests !== '1') {
                confirmationMessage += `Nous avons bien noté que vous viendrez à ${data.guests}. `;
            }
        } else {
            confirmationMessage += `Nous sommes déçus que vous ne puissiez pas être présents, mais nous comprenons. `;
        }

        confirmationMessage += `Un email de confirmation vous sera envoyé sous peu à ${data.email}.`;

        alert(confirmationMessage);

        // Reset du formulaire et du bouton
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(135deg, #d4af37, #f4e08a)';
    }, 1500);
});

// Animation des pétales flottantes plus réaliste
function enhancePetalAnimation() {
    const petals = document.querySelectorAll('.petal');
    petals.forEach((petal, index) => {
        const randomDelay = Math.random() * 6;
        const randomDuration = 6 + Math.random() * 4;
        const randomHorizontalMovement = -20 + Math.random() * 40;

        petal.style.animationDelay = randomDelay + 's';
        petal.style.animationDuration = randomDuration + 's';
        petal.style.setProperty('--horizontal-movement', randomHorizontalMovement + 'px');
    });
}

// Smooth scroll pour navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Effet parallax léger sur le hero
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        const floralBorders = document.querySelectorAll('.floral-border');

        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        floralBorders.forEach(border => {
            if (scrolled < window.innerHeight) {
                border.style.transform = `translateY(${scrolled * 0.1}px)`;
            } else {
                border.style.transform = '';
            }
        });
    });
}

// Ajout de styles pour l'effet typing
const style = document.createElement('style');
style.textContent = `
    @keyframes blink-caret {
        from, to { border-color: transparent; }
        50% { border-color: #3e2723; }
    }
`;
document.head.appendChild(style);

// Initialisation de toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', function () {
    enhancePetalAnimation();
    createScrollObserver();
    initSmoothScroll();
    initParallax();

    // Message de bienvenue dans la console pour les curieux
    console.log(`🌸 Bienvenue sur le site de mariage de Fanny & Julien ! 🌸\n\nMerci de visiter notre site. \
    Si vous êtes développeur et que vous regardez le code, nous espérons qu'il vous plaît !\
    \n\nAvec amour,\nFanny & Julien 💕`);
});

// Gestion des erreurs de chargement des images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        console.log('Image non chargée:', this.src);
        this.style.display = 'none';
    });
});

// Optimisation des performances pour mobile
if (window.innerWidth <= 768) {
    // Réduire les animations sur mobile pour les performances
    const petals = document.querySelectorAll('.petal');
    petals.forEach(petal => {
        petal.style.animationDuration = '10s';
    });
}