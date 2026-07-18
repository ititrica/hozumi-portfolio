/**
 * Loading Animation Timeline & Render Script
 */

// Character to SVG image path mapping
const CHAR_IMAGES = {
    "ホ": "chars/ho.svg",
    "ズ": "chars/zu.svg",
    "ミ": "chars/mi.svg",
    "＃": "chars/hash.svg",
    "P": "chars/p.svg",
    "F": "chars/f.svg",
    "O": "chars/o.svg",
    "L": "chars/l.svg",
};

const STEPS = [
    // Phase 1: "ホズミ＃" appear one by one
    { grid: ["ホ", "", "", ""], duration: 350 },
    { grid: ["ホ", "ズ", "", ""], duration: 350 },
    { grid: ["ホ", "ズ", "ミ", ""], duration: 350 },
    { grid: ["ホ", "ズ", "ミ", "＃"], duration: 650 },

    // Phase 1: fade out one by one
    { grid: ["", "ズ", "ミ", "＃"], duration: 110 },
    { grid: ["", "", "ミ", "＃"], duration: 110 },
    { grid: ["", "", "", "＃"], duration: 110 },
    { grid: ["", "", "", ""], duration: 180 },

    // Phase 2: "PFOL" appear one by one
    { grid: ["P", "", "", ""], duration: 350 },
    { grid: ["P", "F", "", ""], duration: 350 },
    { grid: ["P", "F", "O", ""], duration: 350 },
    { grid: ["P", "F", "O", "L"], duration: 750 }
];

let activeChars = ["", "", "", ""];

document.addEventListener("DOMContentLoaded", () => {
    runStep(0);
});

function runStep(index) {
    if (index >= STEPS.length) {
        finishPreloader();
        return;
    }

    const currentStep = STEPS[index];
    const nextGrid = currentStep.grid;

    for (let cellIndex = 0; cellIndex < 4; cellIndex++) {
        const nextChar = nextGrid[cellIndex];
        const prevChar = activeChars[cellIndex];

        if (nextChar !== prevChar) {
            updateCellDOM(cellIndex, nextChar);
        }
    }

    activeChars = [...nextGrid];

    setTimeout(() => {
        runStep(index + 1);
    }, currentStep.duration);
}

function updateCellDOM(cellIndex, nextChar) {
    const cellEl = document.getElementById("cell-" + cellIndex);
    if (!cellEl) return;

    const isLatin = /^[A-Z]$/.test(nextChar);
    if (isLatin) {
        cellEl.classList.add("latin");
    } else {
        cellEl.classList.remove("latin");
    }

    if (nextChar === "") {
        const existingEl = cellEl.querySelector(".grid-char");
        if (existingEl) {
            existingEl.classList.add("exit");
            setTimeout(() => {
                existingEl.remove();
            }, 500);
        }
        return;
    }

    const existingEl = cellEl.querySelector(".grid-char");
    if (existingEl) {
        existingEl.classList.add("exit");
        setTimeout(() => {
            existingEl.remove();
        }, 500);
    }

    const newSpan = document.createElement("span");
    newSpan.className = "grid-char";
    newSpan.textContent = nextChar;
    cellEl.appendChild(newSpan);
}
function finishPreloader() {
    const overlay = document.getElementById("preloader-overlay");
    const container = overlay ? overlay.querySelector(".preloader-container") : null;

    if (container) {
        container.style.transform = "scale(1.05)";
    }

    if (overlay) {
        overlay.classList.add("fade-out");

        setTimeout(() => {
            document.body.classList.add("loaded");
            overlay.remove();
        }, 800);
    }
}
