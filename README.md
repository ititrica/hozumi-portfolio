# HOZUMI Photography Portfolio

> 个人摄影作品集网站 | Personal Photography Portfolio Website

## 简介 | Introduction

本项目为个人摄影作品集网站，展示在日本、中国等地拍摄的系列摄影作品。网站采用沉浸式轮盘交互设计，支持桌面端和移动端访问。

This is a personal photography portfolio website showcasing series taken across Japan and China. It features an immersive wheel-based interaction design, supporting both desktop and mobile access.

**在线访问 | Visit:** [https://hozumipfol.cc.cd](https://hozumi-portfolio.pages.dev)

---

## 技术架构 | Tech Stack

| 层级 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 6 |
| 样式 | Tailwind CSS 4 |
| 动画 | Framer Motion |
| 图标 | Lucide React |
| 部署 | Cloudflare Pages |
| 图片处理 | Sharp (批处理脚本) |

### 项目结构 | Project Structure

```
src/
├── components/
│   ├── HomeWheelView.tsx   # 主页轮盘交互
│   ├── SeriesView.tsx      # 系列详情页
│   ├── Lightbox.tsx        # 全屏图片浏览
│   ├── Header.tsx          # 导航栏
│   ├── CustomCursor.tsx    # 自定义光标
│   └── AboutContact.tsx    # 关于页
├── data.ts                 # 摄影数据 (13个系列)
├── types.ts                # TypeScript 类型定义
└── App.tsx                 # 根组件
```

### 关键特性 | Features

- **L 形轮盘导航** — 卡片沿左下角 L 型曲线排列，滚动切换
- **GPU 加速动画** — 使用 CSS transform 替代 Layout 触发属性，确保 30fps+ 流畅度
- **移动端优化** — 触摸滑动支持，响应式布局
- **渐进式加载** — 启动动画完成后加载首屏内容
- **离线单文件** — 支持构建为自包含 HTML（详见构建说明）

---

## 本地运行 | Run Locally

### 前置条件 | Prerequisites

- Node.js 18+
- npm 9+

### 安装与启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 构建离线单文件

```bash
# 使用 vite-plugin-singlefile 构建为单 HTML 文件
npm run build
# 会自动生成 dist/index.html（含图片 base64 内嵌）
```

---

## 摄影系列 | Photography Series

| # | 系列名 | 地点 | 年份 |
|---|--------|------|------|
| 01 | Solitary Drift | 北海道 | 2025 |
| 02 | Monochrome Studies | 千叶 | 2025 |
| 03 | Expressions | 上海 | 2026 |
| 04 | Urban Connection | 上海 | 2026 |
| 05 | Winter Illusion | 北海道 | 2025 |
| 06 | Northern Fragments | 北海道 | 2025 |
| 07 | Tracks and Tides | 神户 | 2025 |
| 08 | Xiao Yuanhang | 北海道 | 2025 |
| 09 | Okinawa Breeze | 冲绳 | 2025 |
| 10 | Transient States | 东京 | 2025 |
| 11 | Diptych of Her | 大阪 | 2023 |
| 12 | Analog Hokkaido | 北海道 | — |
| 13 | Transient Geographies | — | — |

---

## 联系方式 | Contact

欢迎交流与合作（摄影约拍、网站建设等）：

Feel free to reach out for collaboration (photography, web development, etc.):

- **微信 WeChat:** 扫描下方二维码 | Scan the QR code

  ![WeChat QR](/wechat-qr.webp)

- **邮箱 Email:** [ititrica@outlook.com](mailto:ititrica@outlook.com)

---

## 许可 | License

© 2026 HOZUMI. All rights reserved.
