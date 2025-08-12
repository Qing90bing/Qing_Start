import { themeButton, themeMenu, searchEngineLogo, searchEngineListWrapper } from '../dom.js';

export function initGlobalClickListeners(toggleThemeMenu, toggleEngineList) {
    document.addEventListener('click', (e) => {
        if (!searchEngineLogo.contains(e.target) && !searchEngineListWrapper.contains(e.target)) {
            toggleEngineList(false);
        }
        if (!themeButton.contains(e.target) && !themeMenu.contains(e.target)) {
            toggleThemeMenu(false);
        }
    });

    searchEngineLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = searchEngineListWrapper.classList.contains('scale-y-0');
        toggleEngineList(isHidden);
    });
}
