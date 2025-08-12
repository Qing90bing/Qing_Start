import { timeEl, dateEl } from '../dom.js';

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;

    const month = now.getMonth() + 1;
    const day = now.getDate();
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
    dateEl.textContent = `${month}月${day}日, ${weekday}`;
}

export function initTime() {
    updateTime();
    setInterval(updateTime, 1000);
}
