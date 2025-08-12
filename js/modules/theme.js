// 导入所需的 DOM 元素和配置
import { htmlEl, themeButton, themeMenu } from '../dom.js';
import { themeConfig } from '../config.js';

/**
 * 应用选定的主题。
 * @param {string} theme - 主题名称 ('auto', 'light', 'dark')。
 */
function applyTheme(theme) {
    if (theme === 'auto') {
        // 跟随系统主题
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlEl.classList.toggle('dark', prefersDark);
    } else {
        // 应用亮色或暗色主题
        htmlEl.classList.toggle('dark', theme === 'dark');
    }
    localStorage.setItem('theme', theme); // 保存主题选择到本地存储
    themeButton.innerHTML = `<div class="icon-color">${themeConfig[theme].icon}</div>`; // 更新主题按钮图标

    // 更新主题菜单中的活动状态
    document.querySelectorAll('.theme-menu-item').forEach(el => {
        el.classList.toggle('theme-item-active', el.dataset.theme === theme);
    });
}

/**
 * 切换主题菜单的显示/隐藏状态。
 * @param {boolean} show - true 为显示, false 为隐藏。
 */
export function toggleThemeMenu(show) {
    if (show) {
        themeMenu.classList.remove('scale-y-0', 'opacity-0');
    } else {
        themeMenu.classList.add('scale-y-0', 'opacity-0');
    }
}

/**
 * 动态填充主题选择菜单。
 */
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
        // 为菜单项添加点击事件，用于应用主题
        item.addEventListener('click', () => {
            applyTheme(key);
            toggleThemeMenu(false); // 选择后关闭菜单
        });
        themeMenu.appendChild(item);
    });
}

/**
 * 初始化主题功能。
 */
export function initTheme() {
    populateThemeMenu();
    // 从本地存储或默认值加载主题
    const savedTheme = localStorage.getItem('theme') || 'auto';
    applyTheme(savedTheme);

    // 为主题按钮添加点击事件，用于切换菜单显示
    themeButton.addEventListener('click', (e) => {
        e.stopPropagation(); // 防止事件冒泡到 document
        const isHidden = themeMenu.classList.contains('scale-y-0');
        toggleThemeMenu(isHidden);
    });

    // 监听系统颜色方案的变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // 如果当前是“跟随系统”模式，则更新主题
        if (localStorage.getItem('theme') === 'auto') {
            htmlEl.classList.toggle('dark', e.matches);
        }
    });

    return { toggleThemeMenu };
}
