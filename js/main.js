// 导入各个模块的初始化函数和切换函数
import { initTheme, toggleThemeMenu } from './modules/theme.js';
import { initTime } from './modules/time.js';
import { initHitokoto } from './modules/hitokoto.js';
import { initSearch, toggleEngineList } from './modules/search.js';
import { fetchAndSetBackground } from './modules/background.js';
import { initGlobalClickListeners } from './modules/ui.js';
import { refreshButton } from './dom.js'; // 导入刷新按钮元素

// 主初始化函数
function initialize() {
    // 初始化所有功能模块
    initTheme(); // 初始化主题
    initTime(); // 初始化时间显示
    initHitokoto(); // 初始化一言
    initSearch(); // 初始化搜索功能

    // 初始化背景图片获取
    fetchAndSetBackground(true); // 初始加载时获取背景
    // 为刷新按钮添加点击事件监听器，点击时重新获取背景（非初始加载）
    refreshButton.addEventListener('click', () => fetchAndSetBackground(false));

    // 初始化全局点击事件监听器，并传入菜单切换函数
    // 用于处理点击页面其他区域时关闭已打开的菜单
    initGlobalClickListeners(toggleThemeMenu, toggleEngineList);
}

// 执行初始化
initialize();
