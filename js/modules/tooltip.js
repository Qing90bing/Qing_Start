// 导入自定义提示框的 DOM 元素
import { customTooltip } from '../dom.js';

/**
 * 初始化自定义提示框功能。
 */
export function initTooltips() {
    // 查找所有具有 data-tooltip 属性的元素
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

    // 如果没有找到触发器或者不存在提示框元素，则直接返回
    if (!customTooltip) return;

    // 为每个触发器元素添加事件监听器
    tooltipTriggers.forEach(trigger => {
        // 鼠标进入事件：显示并定位提示框
        trigger.addEventListener('mouseenter', () => {
            const tooltipText = trigger.getAttribute('data-tooltip');
            if (tooltipText) {
                // 更新提示框内容并显示
                customTooltip.textContent = tooltipText;
                // 使用 visibility 代替 opacity，因为 getBoundingClientRect 需要元素在布局中
                customTooltip.style.visibility = 'visible';
                customTooltip.style.opacity = '1';
                // 根据触发元素定位
                positionTooltip(trigger);
            }
        });

        // 鼠标离开事件：隐藏提示框
        trigger.addEventListener('mouseleave', () => {
            customTooltip.style.visibility = 'hidden';
            customTooltip.style.opacity = '0';
        });
    });

    /**
     * 根据触发元素定位提示框。
     * @param {HTMLElement} trigger - 触发提示框的元素。
     */
    function positionTooltip(trigger) {
        const triggerRect = trigger.getBoundingClientRect();
        const tooltipRect = customTooltip.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const offset = 8; // 元素与提示框之间的间隙

        let top, left;

        // 默认位置：在元素下方居中
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

        // 如果下方空间不足，则移动到元素上方
        if (top + tooltipRect.height > windowHeight) {
            top = triggerRect.top - tooltipRect.height - offset;
        }

        // 确保提示框不会超出窗口左侧
        if (left < offset) {
            left = offset;
        }

        // 确保提示框不会超出窗口右侧
        if (left + tooltipRect.width > windowWidth - offset) {
            left = windowWidth - tooltipRect.width - offset;
        }

        // 应用最终计算出的位置
        customTooltip.style.top = `${top}px`;
        customTooltip.style.left = `${left}px`;
    }
}
