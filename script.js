// --- 1. GESTIONE LIGHTBOX (Ingrandimento immagini) ---

let currentGallery = [];
let currentIndex = -1;

function getVisibleCards(cardElement) {
    // Prende tutte le card visibili (non nascoste) all'interno della stessa griglia
    const grid = cardElement.closest('.gallery-grid');
    if (!grid) return [cardElement];
    return Array.from(grid.querySelectorAll('.card')).filter(card => !card.classList.contains('hidden'));
}

function openLightbox(cardElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    currentGallery = getVisibleCards(cardElement);
    currentIndex = currentGallery.indexOf(cardElement);

    showImageAt(currentIndex);

    lightbox.style.display = 'flex';
    // Piccolo timeout per permettere la transizione CSS (opacity/scale)
    requestAnimationFrame(() => {
        lightbox.classList.add('visible');
    });

    document.addEventListener('keydown', handleLightboxKeydown);
}

function showImageAt(index) {
    if (index < 0 || index >= currentGallery.length) return;
    currentIndex = index;
    const img = currentGallery[currentIndex].querySelector('img');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function showNextImage() {
    if (currentGallery.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentGallery.length;
    showImageAt(nextIndex);
}

function showPrevImage() {
    if (currentGallery.length === 0) return;
    const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    showImageAt(prevIndex);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('visible');

    // Aspetta la fine della transizione prima di nascondere del tutto
    setTimeout(() => {
        lightbox.style.display = 'none';
    }, 250);

    document.removeEventListener('keydown', handleLightboxKeydown);
}

function handleLightboxKeydown(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
}

// Evita che il click sull'immagine ingrandita chiuda la lightbox
document.addEventListener('DOMContentLoaded', function () {
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightboxImg) {
        lightboxImg.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // Supporto tastiera (Invio / Spazio) per aprire le card, per accessibilità
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(card);
            }
        });
    });
});


// --- 2. MOSTRA/NASCONDI RENDER EXTRA ---
function toggleExtraRenders() {
    const extraRenders = document.querySelectorAll('.extra-render');
    const btn = document.getElementById('toggleRenderBtn');

    // Controlla lo stato attuale basandosi sul primo elemento extra
    let isHidden = extraRenders[0].classList.contains('hidden');

    extraRenders.forEach(card => {
        if (isHidden) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    if (isHidden) {
        btn.innerHTML = "Nascondi Render &larr;";
    } else {
        btn.innerHTML = "Vedi Altri 7 Render &rarr;";
    }
}


// --- 3. MENU MOBILE (hamburger nella barra di navigazione) ---
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Chiude il menu quando si sceglie una voce (utile su mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
