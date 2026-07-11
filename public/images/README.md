# 图片资源存放目录 / Image Assets Directory

你好！这是一个为你创建的本地图片资源目录。当你将高分辨率图片压缩成 `.webp` 格式后，请直接将它们上传或放入对应的子目录中。

所有的图片路径已经在 `src/data.ts` 中完成了配置。一旦你把同名图片放到对应位置，网站就会自动显示你替换后的真实图片！

## 目录结构与文件名对照表 / Directory Structure & File Map

### 1. 建筑系列 / Silent Monoliths (Architecture)
*   **文件夹路径**: `/public/images/silent-monoliths/`
*   **需要放进的文件**:
    *   `cover.webp` (封面图)
    *   `sm-1.webp` (Concrete Angle I)
    *   `sm-2.webp` (Lines of Silence)
    *   `sm-3.webp` (Glass Reflectance)
    *   `sm-4.webp` (Raw Grain)

### 2. 街道系列 / Paris Spleen (Street)
*   **文件夹路径**: `/public/images/paris-spleen/`
*   **需要放进的文件**:
    *   `cover.webp` (封面图)
    *   `ps-1.webp` (Saint-Germain Amber)
    *   `ps-2.webp` (Midnight Silhouette)
    *   `ps-3.webp` (Seine reflections)
    *   `ps-4.webp` (Brasserie Glow)

### 3. 风景系列 / Ethereal Shores (Landscape)
*   **文件夹路径**: `/public/images/ethereal-shores/`
*   **需要放进的文件**:
    *   `cover.webp` (封面图)
    *   `es-1.webp` (Sea Mist Whispers)
    *   `es-2.webp` (Stretched Horizon)
    *   `es-3.webp` (Solitary Rock)
    *   `es-4.webp` (Oceanic Stillness)

### 4. 人像系列 / Human Landscapes (Portrait)
*   **文件夹路径**: `/public/images/human-landscapes/`
*   **需要放进的文件**:
    *   `cover.webp` (封面图)
    *   `hl-1.webp` (Aura of Grace)
    *   `hl-2.webp` (Quiet Contemplation)
    *   `hl-3.webp` (Telling Lines)
    *   `hl-4.webp` (Subtle Glow)

### 5. 电影感系列 / Interstate Chronicles (Cinematic)
*   **文件夹路径**: `/public/images/interstate-chronicles/`
*   **需要放进的文件**:
    *   `cover.webp` (封面图)
    *   `ic-1.webp` (The Long Highway)
    *   `ic-2.webp` (San Francisco Breeze)
    *   `ic-3.webp` (Valleys of Gold)

---

## 💡 最佳实践建议 / Best Practices

1. **图片格式**: 确保所有图片都是 `.webp` 格式（全小写后缀）。
2. **尺寸建议**: 
   *   横向图 (landscape)：宽度建议 `1600px` - `2000px`
   *   纵向图 (portrait)：高度建议 `1200px` - `1600px`
   *   封面图：宽度建议 `1200px` 即可，可进行适当压缩
3. **压缩控制**: 6MB+ 的原始图片压缩成 WebP 后，推荐保持质量在 80-85% 左右，单张大小可以控制在 `200KB` - `600KB` 之间，这样加载速度极快且肉眼无损。
