# Qing Start - 现代化浏览器起始页
## ℹ️ 作者说明
- 本项目主要在 AI 工具Jules的帮助下完成。我是一名编程新手，并不是很了解计算机语言，希望通过这个项目进行学习和实践。如果代码中有任何可以改进的地方，欢迎随时指教，谢谢。
- **Qing Start** 是一款设计优雅、简单的浏览器起始页。它采用原生 JavaScript、HTML 和 Tailwind CSS 构建，实现了轻量、高效整洁的用户体验。

![Qing Start 演示](https://s21.ax1x.com/2025/08/12/pVwCzCt.jpg)

## ✨ 核心特性

- **动态背景**: 根据时间自动从 Unsplash 获取高质量背景，支持平滑过渡效果。
- **毛玻璃质感 UI**: 核心交互元素采用流行的毛玻璃设计风格，美观且易读。
- **多引擎搜索**: 支持在多个预设搜索引擎间无缝切换，并能记住用户的选择。
- **个性化主题**: 提供“日间”、“夜间”和“跟随系统”三种主题模式。
- **实时信息**: 显示实时时间、日期以及一句随机的“一言”。
- **模块化代码**: 功能分离到独立文件，代码逻辑清晰，易于维护和扩展。

## 🚀 技术栈

- **前端**: 原生 HTML / CSS / JavaScript (ESM)
- **CSS 框架**: Tailwind CSS
- **API**: Unsplash (背景), Hitokoto (一言)

## 🔧 使用与定制

该项目无需构建，直接在浏览器中打开 `index.html` 文件即可运行。定制主要通过修改 `js/config.js` 文件来完成。

### 1. 修改或添加搜索引擎

在 `js/config.js` 的 `searchEngines` 对象中添加或修改条目。

```javascript
// js/config.js
export const searchEngines = {
    google: { name: 'Google', url: '[https://www.google.com/search?q=](https://www.google.com/search?q=)', logo: `<svg>...</svg>` },
    // 在此处添加新的搜索引擎
};
```

### 2. 调整搜索引擎顺序

修改 `js/config.js` 中的 `engineOrder` 数组即可调整下拉列表中的顺序。

```javascript
// js/config.js
export const engineOrder = ['baidu', 'google', 'bing', ...];
```

## 📜 许可

本项目采用 [MIT License](LICENSE) 开源。
