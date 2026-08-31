/**
 * Abyss Dive · 深海记忆潜航 - 核心导航与纯算法 Web Audio 声学/深潜转场引擎 (深度升级版)
 */
(function () {
    const _reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 页面与深度阶段映射
    const stages = [
        { num: "00", depth: "0m",      meters: 0,     key: "surface",     name: "浅海启航", file: "index.html",         zone: "Sunlight Zone" },
        { num: "01", depth: "200m",    meters: 200,   key: "twilight",    name: "微光记忆", file: "01-twilight.html",   zone: "Twilight Zone" },
        { num: "02", depth: "1000m",   meters: 1000,  key: "midnight",    name: "午夜声呐", file: "02-sonar.html",      zone: "Midnight Zone" },
        { num: "03", depth: "4000m",   meters: 4000,  key: "abyss",       name: "深渊水压", file: "03-pressure.html",   zone: "Abyssal Zone" },
        { num: "04", depth: "6000m",   meters: 6000,  key: "resonance",   name: "热泉共振", file: "04-resonance.html",  zone: "Hadal Trench" },
        { num: "05", depth: "10928m",  meters: 10928, key: "challenger",  name: "挑战者渊", file: "05-challenger.html", zone: "Challenger Deep" }
    ];

    // 检测当前页面
    const currentFile = location.pathname.split("/").pop() || "index.html";
    let currentIndex = 0;
    for (let i = 0; i < stages.length; i++) {
        if (stages[i].file === currentFile) {
            currentIndex = i;
            break;
        }
    }

    const currentStageInfo = stages[currentIndex] || stages[0];

    // 存储与进度计算
    const storageKey = "abyssDiveMaxStage";
    let maxStage = 0;
    try {
        maxStage = Number(localStorage.getItem(storageKey) || 0);
    } catch (e) {
        maxStage = currentIndex;
    }
    const reachedStage = Math.max(maxStage, currentIndex);
    try {
        localStorage.setItem(storageKey, String(reachedStage));
    } catch (e) {}

    // ===== 纯 Web Audio 算法合成音效系统 =====
    const DiveAudio = {
        ctx: null,
        enabled: false,
        rumbleGain: null,
        
        init: function () {
            try {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                this.ctx = new AudioCtx();
                this.startAmbientRumble();
            } catch (e) {
                console.warn("Web Audio API not supported", e);
            }
        },

        resume: function () {
            if (this.ctx && this.ctx.state === "suspended") {
                this.ctx.resume();
            }
        },

        toggle: function () {
            this.enabled = !this.enabled;
            if (this.enabled && !this.ctx) this.init();
            if (this.enabled) {
                this.resume();
                if (this.rumbleGain) this.rumbleGain.gain.setTargetAtTime(0.045, this.ctx.currentTime, 0.5);
                this.bubblePop();
            } else {
                if (this.rumbleGain && this.ctx) this.rumbleGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
            }
            try { localStorage.setItem("abyssDiveAudio", this.enabled ? "1" : "0"); } catch (e) {}
            return this.enabled;
        },

        // 低频潜水艇背景嗡鸣
        startAmbientRumble: function () {
            if (!this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const filter = this.ctx.createBiquadFilter();
                this.rumbleGain = this.ctx.createGain();

                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(46, this.ctx.currentTime);

                filter.type = "lowpass";
                filter.frequency.setValueAtTime(95, this.ctx.currentTime);

                this.rumbleGain.gain.setValueAtTime(this.enabled ? 0.045 : 0, this.ctx.currentTime);

                osc.connect(filter);
                filter.connect(this.rumbleGain);
                this.rumbleGain.connect(this.ctx.destination);
                osc.start();
            } catch (e) {}
        },

        // 下潜推进推进音（下潜切页专用）
        diveDescentSound: function () {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;

                // 1. 引擎升频加速低吼
                const osc = this.ctx.createOscillator();
                const filter = this.ctx.createBiquadFilter();
                const gain = this.ctx.createGain();

                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(45, now);
                osc.frequency.exponentialRampToValueAtTime(130, now + 1.2);

                filter.type = "lowpass";
                filter.frequency.setValueAtTime(120, now);
                filter.frequency.linearRampToValueAtTime(320, now + 1.0);

                gain.gain.setValueAtTime(0.02, now);
                gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(now);
                osc.stop(now + 1.4);

                // 2. 密集气泡水流声
                for (let i = 0; i < 7; i++) {
                    setTimeout(() => this.bubblePop(), i * 160);
                }
            } catch (e) {}
        },

        // 到达减压气阀与海洋钟声（新页面加载到达专用）
        arrivalChime: function () {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;

                // 减压气阀音 (Hiss)
                const bufferSize = this.ctx.sampleRate * 0.35;
                const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * 0.15;
                }
                const noise = this.ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = this.ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.setValueAtTime(1200, now);
                filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);

                const noiseGain = this.ctx.createGain();
                noiseGain.gain.setValueAtTime(0.08, now);
                noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

                noise.connect(filter);
                filter.connect(noiseGain);
                noiseGain.connect(this.ctx.destination);
                noise.start(now);

                // 到达提示音 (Oceanic Bell)
                setTimeout(() => {
                    this.harmonicChime(528);
                    setTimeout(() => this.harmonicChime(660), 120);
                }, 100);
            } catch (e) {}
        },

        // 声呐 Ping 音效
        sonarPing: function (freq = 880, duration = 1.8) {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.94, now + duration);

                gain.gain.setValueAtTime(0.14, now);
                gain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + duration);
            } catch (e) {}
        },

        // 水泡升腾声
        bubblePop: function () {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "sine";
                const baseF = 320 + Math.random() * 240;
                osc.frequency.setValueAtTime(baseF, now);
                osc.frequency.exponentialRampToValueAtTime(baseF * 2.3, now + 0.08);

                gain.gain.setValueAtTime(0.07, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.09);
            } catch (e) {}
        },

        // 机械阀门咔哒声
        valveClick: function () {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "square";
                osc.frequency.setValueAtTime(130, now);
                osc.frequency.setValueAtTime(80, now + 0.02);

                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.04);
            } catch (e) {}
        },

        // 水听器空灵和弦音
        harmonicChime: function (freq = 528) {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 1.3);
            } catch (e) {}
        },

        // 解锁成功四音阶和弦
        sonarUnlock: function () {
            if (!this.enabled || !this.ctx) return;
            const notes = [440, 554, 659, 880];
            notes.forEach((freq, idx) => {
                setTimeout(() => this.harmonicChime(freq), idx * 100);
            });
        },

        // 探照灯充能音效
        searchlightIgnite: function () {
            if (!this.enabled || !this.ctx) return;
            this.resume();
            try {
                const now = this.ctx.currentTime;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = "triangle";
                osc.frequency.setValueAtTime(60, now);
                osc.frequency.exponentialRampToValueAtTime(260, now + 1.3);

                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.1, now + 0.9);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 1.4);
            } catch (e) {}
        }
    };

    // 恢复音频设置
    try {
        if (localStorage.getItem("abyssDiveAudio") === "1") {
            DiveAudio.enabled = true;
            DiveAudio.init();
        }
    } catch (e) {}

    window.DiveAudio = DiveAudio;

    // 交互唤醒 AudioContext
    document.addEventListener("click", function () {
        DiveAudio.resume();
    }, { once: true });

    // ===== 全屏万米深潜推进转场引擎 =====
    function createDescentOverlay() {
        if (document.querySelector(".deep-descent-overlay")) return document.querySelector(".deep-descent-overlay");

        const overlay = document.createElement("div");
        overlay.className = "deep-descent-overlay";
        overlay.innerHTML = `
            <div class="descent-streaks-container" id="streaksContainer"></div>
            <div class="descent-hud-card">
                <span class="stage-badge" id="descentZoneBadge">DESCENDING...</span>
                <div class="descent-depth-counter" id="descentCounter">0 M</div>
                <div class="descent-status-text" id="descentStatusText">深潜推进中 // DIVE THRUSTERS ACTIVE</div>
                <div class="descent-pressure-bar-wrap">
                    <div class="descent-pressure-bar" id="descentProgressBar"></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // 生成流光粒子
        const streaks = overlay.querySelector("#streaksContainer");
        for (let i = 0; i < 30; i++) {
            const st = document.createElement("div");
            st.className = "descent-streak";
            st.style.left = (Math.random() * 100).toFixed(1) + "%";
            st.style.height = (Math.random() * 80 + 40) + "px";
            st.style.animationDuration = (Math.random() * 0.4 + 0.35).toFixed(2) + "s";
            st.style.animationDelay = (Math.random() * 0.5).toFixed(2) + "s";
            streaks.appendChild(st);
        }

        return overlay;
    }

    window.triggerDeepDescent = function (targetHref, targetMeters, targetZoneName) {
        if (_reducedMotion) {
            location.href = targetHref;
            return;
        }

        const overlay = createDescentOverlay();
        const counter = overlay.querySelector("#descentCounter");
        const zoneBadge = overlay.querySelector("#descentZoneBadge");
        const progBar = overlay.querySelector("#descentProgressBar");

        const startM = currentStageInfo.meters || 0;
        const endM = targetMeters || (startM + 200);

        zoneBadge.textContent = `TARGET: ${targetZoneName || "NEXT ZONE"}`;
        overlay.classList.add("is-active");

        // 播放下潜推进音
        DiveAudio.diveDescentSound();

        // 快速滚动数字计数
        const duration = 1200;
        const startTime = performance.now();

        function animateCounter(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const easeProgress = Math.pow(progress, 2); // 加速曲线

            const currentM = Math.round(startM + (endM - startM) * easeProgress);
            counter.textContent = currentM.toLocaleString() + " M";
            progBar.style.width = (progress * 100) + "%";

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                try { sessionStorage.setItem("abyssJustArrived", "1"); } catch (e) {}
                location.href = targetHref;
            }
        }

        requestAnimationFrame(animateCounter);
    };

    // ===== 注入 DOM：顶部 HUD、进度轨、AQUA-09 终端 =====
    document.addEventListener("DOMContentLoaded", function () {
        const vessel = (typeof DIVE_CONFIG !== "undefined" && DIVE_CONFIG.vesselId) ? DIVE_CONFIG.vesselId : "TRITON-IX";
        const diver = (typeof DIVE_CONFIG !== "undefined" && DIVE_CONFIG.diverName) ? DIVE_CONFIG.diverName : "小满";

        // 1. 到达减压与转场平滑恢复
        try {
            if (sessionStorage.getItem("abyssJustArrived") === "1") {
                sessionStorage.removeItem("abyssJustArrived");
                const overlay = createDescentOverlay();
                overlay.classList.add("is-active");
                overlay.querySelector("#descentCounter").textContent = currentStageInfo.depth;
                overlay.querySelector("#descentZoneBadge").textContent = currentStageInfo.zone;
                overlay.querySelector("#descentProgressBar").style.width = "100%";

                setTimeout(() => {
                    overlay.classList.remove("is-active");
                    DiveAudio.arrivalChime();
                }, 150);
            }
        } catch (e) {}

        // 2. 注入海洋雪微粒
        if (!_reducedMotion && !document.querySelector(".marine-snow")) {
            const snowContainer = document.createElement("div");
            snowContainer.className = "marine-snow";
            snowContainer.setAttribute("aria-hidden", "true");
            document.body.prepend(snowContainer);

            for (let i = 0; i < 30; i++) {
                const p = document.createElement("div");
                p.className = "snow-particle";
                const size = (Math.random() * 3 + 1.5).toFixed(1);
                p.style.width = size + "px";
                p.style.height = size + "px";
                p.style.left = (Math.random() * 100).toFixed(1) + "%";
                p.style.animationDuration = (Math.random() * 12 + 8).toFixed(1) + "s";
                p.style.animationDelay = (Math.random() * 8).toFixed(1) + "s";
                snowContainer.appendChild(p);
            }
        }

        // 3. 注入顶部 HUD Header
        if (!document.querySelector(".sub-hud-header")) {
            const header = document.createElement("header");
            header.className = "sub-hud-header";
            header.innerHTML = `
                <div class="hud-vessel">
                    <span class="hud-status-dot" aria-hidden="true"></span>
                    <span>${vessel} // 领航员: ${diver}</span>
                </div>
                <div class="hud-telemetry">
                    <div class="tele-item">
                        <span class="tele-label">CURRENT DEPTH</span>
                        <span class="tele-value">${currentStageInfo.depth}</span>
                    </div>
                    <div class="tele-item">
                        <span class="tele-label">ZONE</span>
                        <span class="tele-value">${currentStageInfo.zone}</span>
                    </div>
                    <button type="button" class="audio-toggle-btn" id="audioToggleBtn" title="切换深海声学音效">
                        ${DiveAudio.enabled ? "🔊 SONAR ON" : "🔇 SONAR OFF"}
                    </button>
                </div>
            `;
            document.body.prepend(header);

            const audioBtn = header.querySelector("#audioToggleBtn");
            if (audioBtn) {
                audioBtn.addEventListener("click", function () {
                    const on = DiveAudio.toggle();
                    this.textContent = on ? "🔊 SONAR ON" : "🔇 SONAR OFF";
                });
            }
        }

        // 4. 注入深度计 HUD 进度轨
        if (!document.querySelector(".depth-rail")) {
            const rail = document.createElement("nav");
            rail.className = "depth-rail";
            rail.setAttribute("aria-label", "深潜航程深度计");
            rail.innerHTML = stages.map((st, idx) => {
                const isActive = idx === currentIndex ? "is-active" : "";
                const isDone = idx <= reachedStage ? "is-done" : "";
                const isLocked = idx > reachedStage;

                if (isLocked) {
                    return `
                        <div class="depth-node is-locked" aria-disabled="true">
                            <span class="node-meter">${st.depth}</span>
                            <span class="node-name">${st.name} [锁定]</span>
                        </div>
                    `;
                }
                return `
                    <a class="depth-node ${isActive} ${isDone}" href="./${st.file}" data-meters="${st.meters}" data-zone="${st.name}">
                        <span class="node-meter">${st.depth}</span>
                        <span class="node-name">${st.name}</span>
                    </a>
                `;
            }).join("");

            const headerEl = document.querySelector(".sub-hud-header");
            if (headerEl) {
                headerEl.insertAdjacentElement("afterend", rail);
            }
        }

        // 5. 注入 AQUA-09 AI 领航员实时电波框
        if (typeof DIVE_CONFIG !== "undefined" && DIVE_CONFIG.aiAssistant && DIVE_CONFIG.aiAssistant.transmissions) {
            const transText = DIVE_CONFIG.aiAssistant.transmissions[currentStageInfo.key];
            if (transText && !document.querySelector(".aqua-transmission-box")) {
                const formattedTrans = transText.replace("{diver}", diver).replace("{vessel}", vessel);
                const aquaBox = document.createElement("div");
                aquaBox.className = "aqua-transmission-box";
                aquaBox.innerHTML = `
                    <span class="aqua-beacon" aria-hidden="true"></span>
                    <div class="aqua-text" id="aquaDialogueText"></div>
                `;

                const railEl = document.querySelector(".depth-rail");
                if (railEl) {
                    railEl.insertAdjacentElement("afterend", aquaBox);
                    const textEl = aquaBox.querySelector("#aquaDialogueText");
                    setTimeout(() => {
                        window.typeWriter(textEl, formattedTrans, 22);
                    }, 400);
                }
            }
        }

        // 6. 拦截所有深潜链接，触发丝滑下潜推进转场
        document.addEventListener("click", function (e) {
            const link = e.target.closest("a[href^='./']");
            if (!link) return;
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#")) return;

            // 查找目标阶段
            const targetFile = href.replace("./", "");
            const targetStage = stages.find(s => s.file === targetFile);

            e.preventDefault();
            const targetM = targetStage ? targetStage.meters : currentStageInfo.meters + 200;
            const targetZ = targetStage ? `${targetStage.depth} ${targetStage.name}` : "NEXT DEPTH";
            window.triggerDeepDescent(href, targetM, targetZ);
        });
    });

    // ===== 常用工具函数导出 =====
    window.typeWriter = async function (el, text, speed = 25) {
        if (!el) return;
        if (_reducedMotion) {
            el.textContent = text;
            return;
        }
        el.textContent = "";
        for (let i = 0; i < text.length; i++) {
            el.textContent += text.charAt(i);
            if (DiveAudio.enabled && i % 5 === 0) DiveAudio.bubblePop();
            await new Promise(r => setTimeout(r, speed));
        }
    };

    window.logTerminal = function (container, text, type = "info") {
        if (!container) return;
        const line = document.createElement("div");
        line.className = `terminal-line ${type}`;
        line.textContent = `> ${text}`;
        container.appendChild(line);
        container.scrollTop = container.scrollHeight;
    };

})();
