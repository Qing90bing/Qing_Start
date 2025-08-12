// 导入所需的 DOM 元素
import { themeButton, themeMenu, searchEngineLogo, searchEngineListWrapper } from '../dom.js';

/**
 * 初始化全局点击事件监听器，用于处理菜单的关闭逻辑。
 * @param {function} toggleThemeMenu - 切换主题菜单显示状态的函数。
 * @param {function} toggleEngineList - 切换搜索引擎列表显示状态的函数。
 */
export function initGlobalClickListeners(toggleThemeMenu, toggleEngineList) {
    document.addEventListener('click', (e) => {
        // 如果点击事件的目标不在搜索引擎图标或其列表内，则隐藏列表
        if (!searchEngineLogo.contains(e.target) && !searchEngineListWrapper.contains(e.target)) {
            toggleEngineList(false);
        }
        
        // 如果点击事件的目标不在主题按钮或其菜单内，则隐藏菜单
        if (!themeButton.contains(e.target) && !themeMenu.contains(e.target)) {
            toggleThemeMenu(false);
        }
    });

    // 注意: searchEngineLogo 和 themeButton 的特定点击监听器（用于打开菜单）
    // 分别在 search.js 和 theme.js 中定义。
    // 这样做可以保持模块化，将打开和关闭逻辑分离。
}
