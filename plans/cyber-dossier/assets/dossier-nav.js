(function () {
    const steps = [
        ["00", "Access", "index.html"],
        ["01", "Brief", "01-briefing.html"],
        ["02", "Evidence", "02-evidence.html"],
        ["03", "Signal", "03-intercept.html"],
        ["04", "Rebuild", "04-reconstruction.html"],
        ["05", "Verdict", "05-verdict.html"]
    ];
    const pageConfig = typeof CONFIG !== "undefined" ? CONFIG : {};
    const current = Number(pageConfig.stage || 0);
    let saved = 0;
    try {
        saved = Number(localStorage.getItem("cyberDossierStage") || 0);
    } catch (error) {
        saved = current;
    }
    const reached = Math.max(saved, current);
    try {
        localStorage.setItem("cyberDossierStage", String(reached));
    } catch (error) {}

    const rail = document.createElement("nav");
    rail.className = "case-rail";
    rail.setAttribute("aria-label", "案件进度");
    rail.innerHTML = steps.map(([num, label, href], index) => {
        const state = index === current ? "is-active" : index <= reached ? "is-done" : "";
        return `<a class="case-step ${state}" href="./${href}">${num} ${label}</a>`;
    }).join("");

    const topbar = document.querySelector(".topbar");
    if (topbar) topbar.insertAdjacentElement("afterend", rail);
})();
