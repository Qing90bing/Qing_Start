// 导入所需的 DOM 元素和配置
import { searchInput, iconContainerA, iconContainerB, searchEngineList, searchEngineListWrapper, searchForm, searchEngineLogo } from '../dom.js';
import { engineOrder, searchEngines } from '../config.js';

let currentEngine = ''; // 当前选中的搜索引擎
let activeIconContainerId = 'a'; // 当前活动的图标容器 ID
let isInitialLogoLoad = true; // 是否为首次加载 Logo

/**
 * 更新搜索引擎的显示和行为。
 * @param {string} engineKey - 搜索引擎的键名。
 */
function updateSearchEngine(engineKey) {
    // 如果选择的引擎未改变且不是首次加载，则不执行操作
    if (currentEngine === engineKey && !isInitialLogoLoad) return;

    currentEngine = engineKey;
    const engine = searchEngines[engineKey];
    const newLogoHtml = `<div class="w-full h-full search-engine-icon">${engine.logo}</div>`;

    // 使用两个容器交替实现 Logo 的淡入淡出效果
    if (isInitialLogoLoad) {
        // 首次加载，直接显示
        iconContainerA.innerHTML = newLogoHtml;
        iconContainerA.style.opacity = 1;
        iconContainerB.style.opacity = 0;
        activeIconContainerId = 'a';
    } else {
        // 非首次加载，使用交叉淡入淡出
        const inactiveContainer = (activeIconContainerId === 'a') ? iconContainerB : iconContainerA;
        const activeContainer = (activeIconContainerId === 'a') ? iconContainerA : iconContainerB;
        inactiveContainer.innerHTML = newLogoHtml;
        activeContainer.style.opacity = 0;
        inactiveContainer.style.opacity = 1;
        activeIconContainerId = (activeIconContainerId === 'a') ? 'b' : 'a';
    }

    searchInput.placeholder = `在 ${engine.name} 中搜索...`;
    localStorage.setItem('searchEngine', engineKey); // 保存用户选择到本地存储
}

/**
 * 动态填充搜索引擎列表。
 */
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
        // 为列表项添加点击事件，用于切换搜索引擎
        item.addEventListener('click', () => {
            updateSearchEngine(key);
            toggleEngineList(false); // 选择后关闭列表
        });
        searchEngineList.appendChild(item);
    });
}

/**
 * 切换搜索引擎列表的显示/隐藏状态。
 * @param {boolean} show - true 为显示, false 为隐藏。
 */
export function toggleEngineList(show) {
    if (show) {
        searchEngineListWrapper.classList.remove('scale-y-0', 'opacity-0');
    } else {
        searchEngineListWrapper.classList.add('scale-y-0', 'opacity-0');
    }
}

/**
 * 初始化搜索功能。
 */
export function initSearch() {
    // 从本地存储或默认值加载搜索引擎
    const savedEngine = localStorage.getItem('searchEngine') || 'baidu';
    populateEngineList();
    updateSearchEngine(savedEngine);
    isInitialLogoLoad = false; // 完成首次加载

    // 为搜索引擎 Logo 添加点击事件，用于切换列表显示
    searchEngineLogo.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止事件冒泡到 document
        const isHidden = searchEngineListWrapper.classList.contains('scale-y-0');
        toggleEngineList(isHidden);
    });

    // 为搜索表单添加提交事件
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 阻止表单默认提交行为
        const query = searchInput.value.trim();
        if (query) {
            const url = searchEngines[currentEngine].url + encodeURIComponent(query);
            window.open(url, '_blank'); // 在新标签页打开搜索结果
            searchInput.value = ''; // 清空输入框
        }
    });

    // 监听输入框的聚焦和失焦事件，以切换表单的高亮状态
    searchInput.addEventListener('focus', () => {
        searchForm.classList.add('is-focused');
    });

    searchInput.addEventListener('blur', () => {
        searchForm.classList.remove('is-focused');
    });
}
