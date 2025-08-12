import { initTheme, toggleThemeMenu } from './modules/theme.js';
import { initTime } from './modules/time.js';
import { initHitokoto } from './modules/hitokoto.js';
import { initSearch, toggleEngineList } from './modules/search.js';
import { fetchAndSetBackground } from './modules/background.js';
import { initGlobalClickListeners } from './modules/ui.js';
import { refreshButton } from './dom.js';

function initialize() {
    // Initialize all modules
    initTheme();
    initTime();
    initHitokoto();
    initSearch();

    // Initialize background fetch
    fetchAndSetBackground(true);
    refreshButton.addEventListener('click', () => fetchAndSetBackground(false));

    // Initialize global listeners and pass toggle functions
    initGlobalClickListeners(toggleThemeMenu, toggleEngineList);
}

// Run initialization
initialize();
