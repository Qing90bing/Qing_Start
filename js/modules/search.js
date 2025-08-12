import { searchInput, iconContainerA, iconContainerB, searchEngineList, searchEngineListWrapper, searchForm, searchEngineLogo } from '../dom.js';
import { engineOrder, searchEngines } from '../config.js';

let currentEngine = '';
let activeIconContainerId = 'a';
let isInitialLogoLoad = true;

function updateSearchEngine(engineKey) {
    if (currentEngine === engineKey && !isInitialLogoLoad) return;

    currentEngine = engineKey;
    const engine = searchEngines[engineKey];
    const newLogoHtml = `<div class="w-full h-full search-engine-icon">${engine.logo}</div>`;

    if (isInitialLogoLoad) {
        iconContainerA.innerHTML = newLogoHtml;
        iconContainerA.style.opacity = 1;
        iconContainerB.style.opacity = 0;
        activeIconContainerId = 'a';
    } else {
        const inactiveContainer = (activeIconContainerId === 'a') ? iconContainerB : iconContainerA;
        const activeContainer = (activeIconContainerId === 'a') ? iconContainerA : iconContainerB;
        inactiveContainer.innerHTML = newLogoHtml;
        activeContainer.style.opacity = 0;
        inactiveContainer.style.opacity = 1;
        activeIconContainerId = (activeIconContainerId === 'a') ? 'b' : 'a';
    }

    searchInput.placeholder = `在 ${engine.name} 中搜索...`;
    localStorage.setItem('searchEngine', engineKey);
}

function populateEngineList() {
    searchEngineList.innerHTML = '';
    engineOrder.forEach(key => {
        const engine = searchEngines[key];
        const item = document.createElement('div');
        item.className = 'flex items-center p-3 cursor-pointer hover:bg-black/10 dark:hover:bg-white/20 transition-colors rounded-lg';
        item.dataset.engine = key;
        item.innerHTML = `
            <div class="w-6 h-6 flex-shrink-0 flex items-center justify-center search-engine-icon text-white">${engine.logo}</div>
            <span class="ml-4 font-medium text-white">${engine.name}</span>
        `;
        item.addEventListener('click', () => {
            updateSearchEngine(key);
            toggleEngineList(false);
        });
        searchEngineList.appendChild(item);
    });
}

export function toggleEngineList(show) {
    if (show) {
        searchEngineListWrapper.classList.remove('scale-y-0', 'opacity-0');
    } else {
        searchEngineListWrapper.classList.add('scale-y-0', 'opacity-0');
    }
}

export function initSearch() {
    const savedEngine = localStorage.getItem('searchEngine') || 'baidu';
    populateEngineList();
    updateSearchEngine(savedEngine);
    isInitialLogoLoad = false;

    searchEngineLogo.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = searchEngineListWrapper.classList.contains('scale-y-0');
        toggleEngineList(isHidden);
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            const url = searchEngines[currentEngine].url + encodeURIComponent(query);
            window.open(url, '_blank');
            searchInput.value = '';
        }
    });
}
