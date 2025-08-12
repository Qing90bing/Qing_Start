// 导入显示时间和日期的 DOM 元素
import { timeEl, dateEl } from '../dom.js';

/**
 * 更新页面上的时间和日期显示。
 */
function updateTime() {
    const now = new Date();
    // 格式化小时和分钟，确保为两位数
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;

    // 格式化月、日和星期
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    dateEl.textContent = `${month}月${day}日, ${weekday}`;
}

/**
 * 初始化时间显示功能。
 */
export function initTime() {
    // 立即执行一次以显示初始时间
    updateTime();
    // 设置定时器，每秒更新一次时间
    setInterval(updateTime, 1000);
}
