// --- 1. GESTIONE LIGHTBOX (Ingrandimento immagini) ---
function openLightbox(cardElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const img = cardElement.querySelector('img');
    
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}


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


// --- 3. MOSTRA/NASCONDI LABORATORI EXTRA ---
function toggleExtraLabs() {
    const extraLabs = document.querySelectorAll('.extra-lab');
    const btn = document.getElementById('toggleLabBtn');
    
    let isHidden = extraLabs[0].classList.contains('hidden');

    extraLabs.forEach(card => {
        if (isHidden) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    if (isHidden) {
        btn.innerHTML = "Nascondi Esercitazioni &larr;";
    } else {
        btn.innerHTML = "Vedi Altre 6 Esercitazioni &rarr;";
    }
}