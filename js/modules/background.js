import { backgroundContainer, pseudoStyleContainer, refreshIcon, preloader, mainContent } from '../dom.js';

let isRefreshing = false;

function completeLoading() {
    if (preloader.classList.contains('preloader-hidden')) return;

    console.log("Hiding preloader now...");
    preloader.classList.add('preloader-hidden');
    // For debugging, force the element to be hidden
    preloader.style.display = 'none';
    mainContent.classList.add('visible');
}

function getBackgroundCategory() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
        const categories = ['nature', 'landscape', 'architecture', 'minimal'];
        return categories[Math.floor(Math.random() * categories.length)];
    } else {
        const categories = ['night', 'dark', 'city', 'abstract'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
}

export function fetchAndSetBackground(isInitialLoad = false) {
    if (isRefreshing && !isInitialLoad) return;
    isRefreshing = true;
    if (!isInitialLoad) {
        refreshIcon.classList.add('is-spinning');
    }

    const category = getBackgroundCategory();
    const hour = new Date().getHours();

    let imageUrl;
    if (hour >= 6 && hour < 18) {
        imageUrl = `https://source.unsplash.com/1920x1080/?${category},bright,clear&sig=${new Date().getTime()}`;
    } else {
        imageUrl = `https://source.unsplash.com/1920x1080/?${category},dark,moody&sig=${new Date().getTime()}`;
    }

    const img = new Image();
    img.src = imageUrl;

    const stopRefreshing = () => {
        if (!isInitialLoad) {
            refreshIcon.classList.remove('is-spinning');
        }
        isRefreshing = false;
    };

    const applyImage = (url) => {
         if (isInitialLoad) {
            if (url) {
                backgroundContainer.style.backgroundImage = `url(${url})`;
            } else {
                backgroundContainer.style.backgroundColor = '#333';
            }
            backgroundContainer.classList.add('loaded');
            completeLoading(); // Transition to main content
        } else {
            const pseudoStyle = document.createElement('style');
            pseudoStyle.innerHTML = `#background-container::before { background-image: url(${url}); }`;
            pseudoStyleContainer.innerHTML = '';
            pseudoStyleContainer.appendChild(pseudoStyle);

            backgroundContainer.classList.add('is-fading');

            setTimeout(() => {
                backgroundContainer.style.backgroundImage = `url(${url})`;
                backgroundContainer.classList.remove('is-fading');
            }, 800);
        }
    };

    img.onload = () => {
        applyImage(imageUrl);
        stopRefreshing();
    };

    img.onerror = () => {
        console.error('Unsplash failed, trying fallback from Picsum.');
        const fallbackUrl = `https://picsum.photos/1920/1080?random=${new Date().getTime()}`;
        const fallbackImg = new Image();
        fallbackImg.src = fallbackUrl;

        fallbackImg.onload = () => {
            applyImage(fallbackUrl);
            stopRefreshing();
        };

        fallbackImg.onerror = () => {
            console.error('Fallback from Picsum also failed.');
            if (isInitialLoad) {
                 applyImage(null);
            }
            stopRefreshing();
        };
    };
}
