/**
 * 独立加载动画时间轴与渲染脚本
 */

// 与 React 版本完全一致的时间轴序列 (步进持续时间以毫秒为单位)
const STEPS = [
    // 第一组："ホズミ＃" 逐个出现
    { grid: ["ホ", "", "", ""], duration: 350 },
    { grid: ["ホ", "ズ", "", ""], duration: 350 },
    { grid: ["ホ", "ズ", "ミ", ""], duration: 350 },
    { grid: ["ホ", "ズ", "ミ", "＃"], duration: 650 }, // 整体完全显示时停留的节奏时间

    // 第一组：迅速逐字消失
    { grid: ["", "ズ", "ミ", "＃"], duration: 110 },
    { grid: ["", "", "ミ", "＃"], duration: 110 },
    { grid: ["", "", "", "＃"], duration: 110 },
    { grid: ["", "", "", ""], duration: 180 }, // 进入第二组前的干净过渡顿挫

    // 第二组："PFOL" 逐个出现
    { grid: ["P", "", "", ""], duration: 350 },
    { grid: ["P", "F", "", ""], duration: 350 },
    { grid: ["P", "F", "O", ""], duration: 350 },
    { grid: ["P", "F", "O", "L"], duration: 750 } // 整体显示后短暂停留并直接退出
];

// 保存当前单元格渲染出来的字符
let activeChars = ["", "", "", ""];

document.addEventListener("DOMContentLoaded", () => {
    runStep(0);
});

/**
 * 核心时间步进递归器
 */
function runStep(index) {
    if (index >= STEPS.length) {
        // 时间轴播放完毕，开始淡出遮罩
        finishPreloader();
        return;
    }

    const currentStep = STEPS[index];
    const nextGrid = currentStep.grid;

    // 对比状态并高仿真地操作 DOM 元素淡入、淡出
    for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
        const nextChar = nextGrid[cellIndex];
        const prevChar = activeChars[cellIndex];

        if (nextChar !== prevChar) {
            updateCellDOM(cellIndex, nextChar);
        }
    }

    // 更新当前字符状态记录
    activeChars = [...nextGrid];

    // 按设定时延进行下一步
    setTimeout(() => {
        runStep(index + 1);
    }, currentStep.duration);
}

/**
 * 精细的细胞 DOM 更新器：模拟 React <AnimatePresence> 的退出与进入流
 */
function updateCellDOM(cellIndex, nextChar) {
    const cellEl = document.getElementById(`cell-${cellIndex}`);
    if (!cellEl) return;

    // 1. 如果新字符为空，代表需要把当前的字符执行退出淡出效果并从 DOM 中销毁
    if (nextChar === "") {
        const existingSpan = cellEl.querySelector(".grid-char");
        if (existingSpan) {
            existingSpan.classList.add("exit");
            // 待淡出过渡动画结束后从 DOM 节点中彻底删除
            setTimeout(() => {
                existingSpan.remove();
            }, 500); // 对应 style.css 中 charExit 500ms 持续时间
        }
    } 
    // 2. 如果要显示全新字符
    else {
        // 若当前有旧字直接在内部，先淡出旧字
        const existingSpan = cellEl.querySelector(".grid-char");
        if (existingSpan) {
            existingSpan.classList.add("exit");
            setTimeout(() => {
                existingSpan.remove();
            }, 500);
        }

        // 创建全新白色的网格字符元素并向 DOM 挂载，默认执行 entry 淡入
        const newSpan = document.createElement("span");
        newSpan.className = "grid-char";
        newSpan.textContent = nextChar;
        cellEl.appendChild(newSpan);
    }
}

/**
 * 整体遮罩淡出，展示主内容页面
 */
function finishPreloader() {
    const overlay = document.getElementById("preloader-overlay");
    const container = overlay ? overlay.querySelector(".preloader-container") : null;
    
    if (container) {
        // 微调遮罩内部元素微缩比例以丰富退出质感
        container.style.transform = "scale(1.05)";
    }

    if (overlay) {
        overlay.classList.add("fade-out");
        
        // 动画完全结束后向 body 写入加载完毕标记，并彻底清理 z-index 树
        setTimeout(() => {
            document.body.classList.add("loaded");
            overlay.remove(); // 直接删除 DOM 结构以节省硬件资源
        }, 800); // 对应 overlay fade-out 的 800ms 持续时间
    }
}
