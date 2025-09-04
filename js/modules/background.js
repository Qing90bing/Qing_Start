// 导入所需的 DOM 元素
import { backgroundContainer, pseudoStyleContainer, refreshIcon, preloader, mainContent } from '../dom.js';

// 标志位，防止在刷新过程中重复触发
let isRefreshing = false;
// 预加载器超时定时器的 ID
let preloaderTimeoutId = null;

/**
 * 完成页面加载过程，隐藏预加载器并显示主要内容。
 */
function completeLoading() {
    // 如果预加载器已经隐藏，则直接返回
    if (preloader.classList.contains('preloader-hidden')) return;

    // 如果是通过正常加载（而非超时）调用的，清除超时定时器
    if (preloaderTimeoutId) {
        clearTimeout(preloaderTimeoutId);
        preloaderTimeoutId = null;
    }

    console.log("正在隐藏预加载器...");
    preloader.classList.add('preloader-hidden');
    mainContent.classList.add('visible');
}

/**
 * 根据当前时间（白天/黑夜）获取随机的背景类别。
 * @returns {string} 背景类别字符串。
 */
function getBackgroundCategory() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) { // 白天 (6:00 - 17:59)
        const categories = ['nature', 'landscape', 'architecture', 'minimal'];
        return categories[Math.floor(Math.random() * categories.length)];
    } else { // 夜间
        const categories = ['night', 'dark', 'city', 'abstract'];
        return categories[Math.floor(Math.random() * categories.length)];
    }
}

/**
 * 获取并设置背景图片。
 * @param {boolean} isInitialLoad - 是否为初始加载。
 */
export function fetchAndSetBackground(isInitialLoad = false) {
    // 如果正在刷新且不是初始加载，则不执行任何操作
    if (isRefreshing && !isInitialLoad) return;
    isRefreshing = true;
    // 如果不是初始加载，则显示旋转动画并禁用按钮
    if (isInitialLoad) {
        // 如果是初始加载，设置12秒的超时定时器
        preloaderTimeoutId = setTimeout(() => {
            console.log("预加载超时，强制显示内容。");
            completeLoading();
        }, 12000);
    } else {
        // 如果不是初始加载，则显示旋转动画并禁用按钮
        refreshIcon.classList.add('is-spinning');
        refreshIcon.classList.add('is-disabled');
    }

    const category = getBackgroundCategory();
    const hour = new Date().getHours();

    // 根据时间和类别构建 Unsplash 图片 URL
    let imageUrl;
    if (hour >= 6 && hour < 18) {
        imageUrl = `https://source.unsplash.com/1920x1080/?${category},bright,clear&sig=${new Date().getTime()}`;
    } else {
        imageUrl = `https://source.unsplash.com/1920x1080/?${category},dark,moody&sig=${new Date().getTime()}`;
    }

    const img = new Image();
    img.src = imageUrl;

    // 停止刷新动画的辅助函数
    const stopRefreshing = () => {
        if (!isInitialLoad) {
            refreshIcon.classList.remove('is-spinning');
            refreshIcon.classList.remove('is-disabled');
        }
        isRefreshing = false;
    };

    // 应用图片的辅助函数
    const applyImage = (url) => {
         if (isInitialLoad) {
            // 初始加载时，直接设置背景
            if (url) {
                backgroundContainer.style.backgroundImage = `url(${url})`;
            } else {
                backgroundContainer.style.backgroundColor = '#333'; // 加载失败时的备用背景色
            }
            backgroundContainer.classList.add('loaded');
            completeLoading(); // 过渡到主要内容
        } else {
            // 非初始加载时，使用伪元素实现交叉淡入淡出效果
            const pseudoStyle = document.createElement('style');
            pseudoStyle.innerHTML = `#background-container::before { background-image: url(${url}); }`;
            pseudoStyleContainer.innerHTML = '';
            pseudoStyleContainer.appendChild(pseudoStyle);

            backgroundContainer.classList.add('is-fading');

            // 动画结束后，更新真实背景并移除 fading 类
            setTimeout(() => {
                backgroundContainer.style.backgroundImage = `url(${url})`;
                backgroundContainer.classList.remove('is-fading');
            }, 800);
        }
    };

    // 图片加载成功时的处理
    img.onload = () => {
        applyImage(imageUrl);
        stopRefreshing();
    };

    // 图片加载失败时的处理（尝试备用源）
    img.onerror = () => {
        console.error('Unsplash 加载失败，尝试从 Picsum 获取备用图片。');
        const fallbackUrl = `https://picsum.photos/1920/1080?random=${new Date().getTime()}`;
        const fallbackImg = new Image();
        fallbackImg.src = fallbackUrl;

        fallbackImg.onload = () => {
            applyImage(fallbackUrl);
            stopRefreshing();
        };

        fallbackImg.onerror = () => {
            console.error('从 Picsum 获取备用图片也失败了。');
            if (isInitialLoad) {
                 applyImage(null); // 初始加载失败时，不显示图片
            }
            stopRefreshing();
        };
    };
}
