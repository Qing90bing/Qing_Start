import { hitokotoContainer } from '../dom.js';

let isFetchingHitokoto = false;

function fetchHitokoto() {
    if (isFetchingHitokoto) return;
    isFetchingHitokoto = true;

    hitokotoContainer.classList.add('is-fading');

    fetch('https://international.v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                hitokotoContainer.textContent = data.hitokoto;
                hitokotoContainer.classList.remove('is-fading');
                // Allow fetching again after the animation completes
                setTimeout(() => {
                    isFetchingHitokoto = false;
                }, 300);
            }, 300); // Wait for fade-out to complete
        })
        .catch(error => {
            console.error('Error fetching Hitokoto:', error);
            setTimeout(() => {
                hitokotoContainer.textContent = '句子迷路了...';
                hitokotoContainer.classList.remove('is-fading');
                isFetchingHitokoto = false;
            }, 300);
        });
}

export function initHitokoto() {
    fetchHitokoto();
    hitokotoContainer.addEventListener('click', fetchHitokoto);
}
