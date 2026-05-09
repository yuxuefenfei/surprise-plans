(function () {
    // ===== 缓存 matchMedia 结果（避免重复调用） =====
    const _prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ===== 自动检测当前页面 =====
    const steps = [
        ["00", "接入", "index.html"],
        ["01", "简报", "01-briefing.html"],
        ["02", "证据", "02-evidence.html"],
        ["03", "信号", "03-intercept.html"],
        ["04", "重构", "04-reconstruction.html"],
        ["05", "结案", "05-verdict.html"]
    ];

    // 从文件名推断当前页面 stage
    const currentFile = location.pathname.split("/").pop() || "index.html";
    let current = 0;
    for (let i = 0; i < steps.length; i++) {
        if (steps[i][2] === currentFile) { current = i; break; }
    }

    // 自动构造 CONFIG（如果页面没有内联定义）
    const pageNames = ["access", "briefing", "evidence", "intercept", "reconstruction", "verdict"];
    const pageName = pageNames[current] || "access";
    if (typeof CONFIG === "undefined" && typeof DOSSIER_CONFIG !== "undefined") {
        window.CONFIG = {
            ...DOSSIER_CONFIG,
            ...DOSSIER_CONFIG.pages[pageName],
            stage: current,
        };
    }
    const urlParams = new URLSearchParams(location.search);
    const isCase2 = urlParams.get("case") === "2";
    const caseParam = isCase2 ? "2" : "1";
    const stageKey = isCase2 ? "cyberDossierStage2" : "cyberDossierStage";
    const statsKey = isCase2 ? "dossierErrors2" : "dossierErrors";
    const startedAtKey = isCase2 ? "dossierStartedAt2" : "dossierStartedAt";

    if (isCase2 && typeof DOSSIER_CONFIG !== "undefined" && DOSSIER_CONFIG.case2) {
        const c2 = DOSSIER_CONFIG.case2;
        CONFIG.targetAlias = c2.targetAlias;
        CONFIG.passcode = c2.passcode || CONFIG.passcode;
        if (c2.rating) CONFIG.rating = c2.rating;
        if (c2.narrative) CONFIG.narrative = c2.narrative;
        if (c2.pages) {
            Object.keys(c2.pages).forEach(key => {
                if (CONFIG.pages[key]) CONFIG.pages[key] = { ...CONFIG.pages[key], ...c2.pages[key] };
            });
            if (c2.pages[pageName]) {
                Object.assign(CONFIG, c2.pages[pageName]);
            }
        }
        document.body.classList.add("case-2");
    }

    const targetParam = urlParams.get("target");
    if (targetParam && typeof CONFIG !== "undefined") {
        CONFIG.targetAlias = targetParam;
    }

    let saved = 0;
    try {
        saved = Number(localStorage.getItem(stageKey) || 0);
    } catch (error) {
        saved = current;
    }
    const reached = Math.max(saved, current);
    try {
        localStorage.setItem(stageKey, String(reached));
    } catch (error) {}

    // ===== 进度轨道 =====
    const rail = document.createElement("nav");
    rail.className = "case-rail";
    rail.setAttribute("aria-label", "案件进度");
    rail.innerHTML = steps.map(([num, label, href], index) => {
        const state = index === current ? "is-active" : index <= reached ? "is-done" : "";
        const status = index === current ? "，当前" : index <= reached ? "，已完成" : "，未解锁";
        const content = `<span class="sr-only">步骤 ${num}：${label}${status}</span><span aria-hidden="true">${num} ${label}</span>`;
        if (index <= reached) {
            return `<a class="case-step ${state}" href="./${href}">${content}</a>`;
        }
        return `<span class="case-step is-locked" aria-disabled="true">${content}</span>`;
    }).join("");

    const topbar = document.querySelector(".topbar");
    if (topbar) topbar.insertAdjacentElement("afterend", rail);

    // ===== 音效系统 =====
    const AudioSys = {
        ctx: null,
        enabled: false,
        init: function () {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) { /* Web Audio 不支持 */ }
        },
        toggle: function () {
            this.enabled = !this.enabled;
            if (this.enabled && !this.ctx) this.init();
            try { localStorage.setItem("dossierAudio", this.enabled ? "1" : "0"); } catch (e) {}
            return this.enabled;
        },
        resume: function () {
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
        },
        playTone: function (freq, type, duration, volume) {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type || "sine";
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(volume || 0.05, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) { /* 忽略 */ }
        },
        keyClick: function () { this.playTone(800 + Math.random() * 200, "square", 0.04, 0.02); },
        correct: function () {
            this.playTone(523, "sine", 0.12, 0.06);
            setTimeout(() => this.playTone(659, "sine", 0.12, 0.06), 80);
            setTimeout(() => this.playTone(784, "sine", 0.18, 0.06), 160);
        },
        wrong: function () {
            this.playTone(220, "sawtooth", 0.2, 0.04);
            setTimeout(() => this.playTone(185, "sawtooth", 0.25, 0.04), 120);
        },
        type: function () { this.playTone(1000 + Math.random() * 600, "square", 0.015, 0.008); },
        heartbeat: function () {
            this.playTone(60, "sine", 0.12, 0.1);
            setTimeout(() => this.playTone(60, "sine", 0.08, 0.07), 180);
        },
        unlock: function () {
            this.playTone(440, "sine", 0.1, 0.05);
            setTimeout(() => this.playTone(554, "sine", 0.1, 0.05), 100);
            setTimeout(() => this.playTone(659, "sine", 0.15, 0.05), 200);
            setTimeout(() => this.playTone(880, "sine", 0.3, 0.06), 300);
        },
        reveal: function () {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => this.playTone(400 + i * 120, "sine", 0.15, 0.04), i * 80);
            }
        }
    };

    // 恢复音效设置
    try {
        if (localStorage.getItem("dossierAudio") === "1") {
            AudioSys.enabled = true;
            AudioSys.init();
        }
    } catch (e) {}

    // ===== 音效开关按钮 =====
    const statusEl = document.querySelector(".topbar .status");
    if (statusEl) {
        const audioBtn = document.createElement("button");
        audioBtn.type = "button";
        audioBtn.className = "audio-toggle";
        audioBtn.setAttribute("aria-label", "切换音效");
        audioBtn.textContent = AudioSys.enabled ? "🔊" : "🔇";
        audioBtn.addEventListener("click", function () {
            const on = AudioSys.toggle();
            this.textContent = on ? "🔊" : "🔇";
            if (on) AudioSys.correct();
        });
        statusEl.parentElement.insertBefore(audioBtn, statusEl.nextSibling);
    }

    // 全局点击音效
    document.addEventListener("click", function () {
        AudioSys.resume();
    }, { once: true });

    // 导出到全局
    window.DossierAudio = AudioSys;

    // ===== 打字机效果 =====
    window.typeWriter = async function (element, text, speed) {
        speed = speed || 30;
        const prefersReduced = _prefersReduced;
        if (prefersReduced) {
            element.textContent = text;
            return;
        }
        element.textContent = "";
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            if (AudioSys.enabled && i % 3 === 0) AudioSys.type();
            await new Promise(r => setTimeout(r, speed));
        }
    };

    // ===== 叙事桥接 =====
    const narrative = (typeof CONFIG !== "undefined" && CONFIG.narrative)
        || (typeof DOSSIER_CONFIG !== "undefined" && DOSSIER_CONFIG.narrative)
        || {};
    const bridges = narrative.bridges || [];
    if (bridges[current]) {
        // 在 topbar 后面插入桥接终端
        const bridgeEl = document.createElement("div");
        bridgeEl.className = "terminal bridge-terminal";
        bridgeEl.style.marginBottom = "12px";
        bridgeEl.style.minHeight = "1.5em";
        bridgeEl.setAttribute("aria-live", "polite");
        rail.insertAdjacentElement("afterend", bridgeEl);

        // 延迟开始打字
        setTimeout(async () => {
            await typeWriter(bridgeEl, bridges[current], 25);
        }, 600 + current * 200);
    }

    // ===== 粒子效果 =====
    function createParticles() {
        const container = document.createElement("div");
        container.className = "particles";
        container.setAttribute("aria-hidden", "true");
        document.body.appendChild(container);
        for (let i = 0; i < 25; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            p.style.left = Math.random() * 100 + "%";
            p.style.animationDelay = Math.random() * 15 + "s";
            p.style.animationDuration = (10 + Math.random() * 15) + "s";
            container.appendChild(p);
        }
    }
    if (!_prefersReduced) {
        createParticles();
    }

    // ===== 页面进入动画 =====
    document.body.classList.add("page-enter");
    setTimeout(() => document.body.classList.remove("page-enter"), 500);

    // ===== 情感色温渐变 =====
    const bgShifts = [0, 0.05, 0.15, 0.35, 0.6, 0.85];
    const shift = bgShifts[current] || 0;
    if (shift > 0) {
        const warmR = Math.round(255 * shift * 0.12);
        const warmG = Math.round(209 * shift * 0.08);
        document.body.style.setProperty("--bg-warm", `rgba(${warmR}, ${warmG}, 0, ${shift * 0.15})`);
    }

    // ===== 页面专属视觉主题 =====
    const themes = (typeof DOSSIER_CONFIG !== "undefined" && DOSSIER_CONFIG.themes) || {};
    const themePageName = pageNames[current] || "access";
    const theme = themes[themePageName];
    if (theme) {
        document.documentElement.style.setProperty("--accent", theme.accent);
        const statusEl = document.querySelector(".topbar .status");
        if (statusEl && theme.termLabel) statusEl.textContent = theme.termLabel;
    }

    // ===== URL 参数：第二案 =====
    document.querySelectorAll('a[href^="./"]').forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        const url = new URL(href, location.href);
        const target = urlParams.get("target");
        if (isCase2) url.searchParams.set("case", "2");
        if (target && !url.searchParams.has("target")) url.searchParams.set("target", target);
        link.setAttribute("href", `./${url.pathname.split("/").pop()}${url.search}`);
    });

    let startedAt = Date.now();
    try {
        const savedStartedAt = Number(localStorage.getItem(startedAtKey) || 0);
        if (current === 0 || !savedStartedAt) {
            localStorage.setItem(startedAtKey, String(startedAt));
        } else {
            startedAt = savedStartedAt;
        }
    } catch (e) {}

    // ===== 错误追踪（用于完美通关判定） =====
    // 第二案使用独立的存储 key，避免与第一案数据互相污染
    let savedErrors = 0;
    try { savedErrors = Number(localStorage.getItem(statsKey) || 0); } catch (e) {}

    window.DossierStats = {
        errors: savedErrors,
        startTime: startedAt,
        case: caseParam,
        recordError: function () {
            this.errors++;
            try { localStorage.setItem(statsKey, String(this.errors)); } catch (e) {}
        },
        isPerfect: function () {
            return this.errors === 0;
        },
        reset: function () {
            this.errors = 0;
            this.startTime = Date.now();
            try {
                localStorage.removeItem(statsKey);
                localStorage.removeItem(stageKey);
                localStorage.setItem(startedAtKey, String(this.startTime));
            } catch (e) {}
        }
    };

    window.resetDossierProgress = function (nextCase) {
        if (nextCase === "1" || nextCase === "2") {
            const nextStatsKey = nextCase === "2" ? "dossierErrors2" : "dossierErrors";
            const nextStageKey = nextCase === "2" ? "cyberDossierStage2" : "cyberDossierStage";
            const nextStartedAtKey = nextCase === "2" ? "dossierStartedAt2" : "dossierStartedAt";
            try {
                localStorage.removeItem(nextStatsKey);
                localStorage.removeItem(nextStageKey);
                localStorage.setItem(nextStartedAtKey, String(Date.now()));
            } catch (e) {}
        } else if (window.DossierStats) {
            window.DossierStats.reset();
        }
    };

    // ===== 页面转场动画（防重复绑定） =====
    const _reducedMotion = _prefersReduced; // 使用前面缓存的结果
    let _isTransitioning = false;

    if (!_reducedMotion) {
        document.addEventListener("click", function (e) {
            if (_isTransitioning) return; // 防止重复触发
            const link = e.target.closest("a[href]");
            if (!link) return;
            const href = link.getAttribute("href");
            if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;
            const isSameOrigin = new URL(href, location.origin).origin === location.origin;
            if (!isSameOrigin) return;
            _isTransitioning = true;
            e.preventDefault();
            document.body.classList.add("page-leave");
            document.body.classList.remove("page-enter");
            setTimeout(function () {
                location.href = href;
            }, 300);
        });
    }

    // ===== 公共工具函数 =====

    // 终端反馈（所有页面共用）
    window.appendTerminalFeedback = function (container, text, type) {
        if (!container) return;
        const span = document.createElement("span");
        span.className = "terminal-line" + (type === "error" ? " error" : type === "success" ? " warn" : "");
        span.textContent = "> " + text;
        container.appendChild(span);
        // 保持终端内容不超过 20 行，避免无限增长
        const lines = container.querySelectorAll(".terminal-line");
        if (lines.length > 20) {
            lines[0].remove();
        }
    };

    // 页面初始化入口（各页面在 DOMContentLoaded 后调用）
    window.DossierPage = {
        // 记录页面开始时间
        startTime: Date.now(),
        // 记录页面错误数
        pageErrors: 0,
        // 工具：节流函数
        throttle: function (fn, delay) {
            let last = 0;
            return function (...args) {
                const now = Date.now();
                if (now - last >= delay) {
                    last = now;
                    fn.apply(this, args);
                }
            };
        },
        // 安全 localStorage 写入（节流版）
        saveStats: function () {
            const statsKey = urlParams.get("case") === "2" ? "dossierErrors2" : "dossierErrors";
            try { localStorage.setItem(statsKey, String(DossierStats.errors)); } catch (e) {}
        }
    };

    // 节流版错误记录（替代直接调用 DossierStats.recordError）
    window.DossierStats.recordError = window.DossierPage.throttle(window.DossierStats.recordError, 100);

})();
