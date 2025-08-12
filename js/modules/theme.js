import { htmlEl, themeButton, themeMenu } from '../dom.js';
import { themeConfig } from '../config.js';

function applyTheme(theme) {
    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlEl.classList.toggle('dark', prefersDark);
    } else {
        htmlEl.classList.toggle('dark', theme === 'dark');
    }
    localStorage.setItem('theme', theme);
    themeButton.innerHTML = `<div class="icon-color">${themeConfig[theme].icon}</div>`;

    document.querySelectorAll('.theme-menu-item').forEach(el => {
        el.classList.toggle('theme-item-active', el.dataset.theme === theme);
    });
}

export function toggleThemeMenu(show) {
    if (show) {
        themeMenu.classList.remove('scale-y-0', 'opacity-0');
    } else {
        themeMenu.classList.add('scale-y-0', 'opacity-0');
    }
}

function populateThemeMenu() {
    themeMenu.innerHTML = '';
    Object.keys(themeConfig).forEach(key => {
        const item = document.createElement('div');
        item.className = 'theme-menu-item flex items-center p-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-lg';
        item.dataset.theme = key;
        item.innerHTML = `
            <span class="w-6 h-6 icon-color">${themeConfig[key].icon}</span>
            <span class="ml-3 text-sm font-medium">${themeConfig[key].name}</span>
        `;
        item.addEventListener('click', () => {
            applyTheme(key);
            toggleThemeMenu(false);
        });
        themeMenu.appendChild(item);
    });
}

export function initTheme() {
    populateThemeMenu();
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);

    themeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = themeMenu.classList.contains('scale-y-0');
        toggleThemeMenu(isHidden);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('theme') === 'auto') {
            htmlEl.classList.toggle('dark', e.matches);
        }
    });

    return { toggleThemeMenu };
}
