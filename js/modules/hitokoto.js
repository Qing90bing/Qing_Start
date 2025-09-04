// 导入“一言”容器的 DOM 元素
import { hitokotoContainer } from '../dom.js';

// 标志位，防止在获取数据时重复触发
let isFetchingHitokoto = false;

/**
 * 从 API 获取“一言”并显示。
 */
function fetchHitokoto() {
    // 如果正在获取，则不执行任何操作
    if (isFetchingHitokoto) return;
    isFetchingHitokoto = true;

    // 添加 fading 类以触发淡出动画
    hitokotoContainer.classList.add('is-fading');

    // 从国际版“一言” API 获取数据
    fetch('https://international.v1.hitokoto.cn')
        .then(response => response.json())
        .then(data => {
            // 等待淡出动画完成
            setTimeout(() => {
                // 更新内容，将文本包裹在 span 中
                hitokotoContainer.innerHTML = `<span>${data.hitokoto}</span>`;
                // 强制浏览器重绘，以确保淡入动画能够触发
                void hitokotoContainer.offsetHeight;
                // 移除 fading 类以触发淡入动画
                hitokotoContainer.classList.remove('is-fading');
                // 动画完成后允许再次获取
                setTimeout(() => {
                    isFetchingHitokoto = false;
                }, 300);
            }, 300);
        })
        .catch(error => {
            console.error('获取“一言”时出错:', error);
            // 发生错误时的处理
            setTimeout(() => {
                hitokotoContainer.innerHTML = '<span>句子迷路了...</span>';
                // 强制浏览器重绘
                void hitokotoContainer.offsetHeight;
                hitokotoContainer.classList.remove('is-fading');
                isFetchingHitokoto = false;
            }, 300);
        });
}

/**
 * 初始化“一言”功能。
 */
export function initHitokoto() {
    // 初始加载时获取一次“一言”
    fetchHitokoto();
    // 为“一言”容器添加点击事件监听器，点击时重新获取
    hitokotoContainer.addEventListener('click', fetchHitokoto);
}
