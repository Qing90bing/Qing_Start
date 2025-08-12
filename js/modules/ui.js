import { themeButton, themeMenu, searchEngineLogo, searchEngineListWrapper } from '../dom.js';

export function initGlobalClickListeners(toggleThemeMenu, toggleEngineList) {
    document.addEventListener('click', (e) => {
        // 如果点击发生在搜索图标和引擎列表之外，则隐藏列表
        if (!searchEngineLogo.contains(e.target) && !searchEngineListWrapper.contains(e.target)) {
            toggleEngineList(false);
        }
        
        // 如果点击发生在主题按钮和主题菜单之外，则隐藏菜单
        if (!themeButton.contains(e.target) && !themeMenu.contains(e.target)) {
            toggleThemeMenu(false);
        }
    });

    // searchEngineLogo 的特定点击监听器已在 js/modules/search.js 中定义。
    // 从此处移除以避免代码冗余和潜在冲突。
}
