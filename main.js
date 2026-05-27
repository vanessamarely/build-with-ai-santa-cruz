// ── Slide 8: feature-detect anchor positioning ─────────
(function () {
    const supports = CSS.supports && CSS.supports("anchor-name", "--x");
    const fb = document.getElementById("anchor-fallback");
    if (!supports && fb) fb.classList.add("show");
})();

// ── Slide 9: live view transition demo ─────────────────
(function () {
    const btn = document.getElementById("vt-trigger");
    const card = document.getElementById("vt-card");
    const tag = document.getElementById("vt-tag");
    const body = document.getElementById("vt-body-wrap");
    if (!btn) return;

    const EMPTY = `
      <div class="vt-skel">
        <div class="vt-skel-bar w90"></div>
        <div class="vt-skel-bar w70"></div>
        <div class="vt-skel-bar w80"></div>
      </div>`;
    const FILLED = `
      <h5>// Resumen · key-points</h5>
      <ul>
        <li>Configura el runtime del cliente.</li>
        <li>Valida memoria y red por release.</li>
        <li>Anclado al párrafo activo, sin red.</li>
      </ul>`;

    let filled = false;
    const swap = () => {
        filled = !filled;
        if (filled) {
            card.classList.add("after");
            tag.textContent = "// HELP-PANEL · AI RESPONSE";
            body.innerHTML = FILLED;
        } else {
            card.classList.remove("after");
            tag.textContent = "// HELP-PANEL · EMPTY";
            body.innerHTML = EMPTY;
        }
    };

    btn.addEventListener("click", () => {
        if (document.startViewTransition) {
            document.startViewTransition(swap);
        } else {
            swap();
        }
    });
})();

// Slide — demo interactiva (LIVE DEMO slide)
(function () {
    const btn = document.getElementById("demo-btn");
    const empty = document.getElementById("ai-empty");
    const skeleton = document.getElementById("ai-skeleton");
    const result = document.getElementById("ai-result");
    if (!btn) return;

    btn.addEventListener("click", () => {
        empty.classList.add("hidden");
        result.classList.remove("visible");
        skeleton.classList.remove("hidden");

        const run = () => {
            skeleton.classList.add("hidden");
            result.classList.add("visible");
        };
        if (document.startViewTransition) {
            setTimeout(() => document.startViewTransition(run), 1800);
        } else {
            setTimeout(run, 1800);
        }
    });
})();

(function () {
    const stage = document.querySelector("deck-stage");
    const btnRail = document.getElementById("ctrl-rail");
    const lblRail = document.getElementById("ctrl-rail-label");
    const btnFs = document.getElementById("ctrl-fs");
    const lblFs = document.getElementById("ctrl-fs-label");
    if (!stage) return;

    // ── Rail toggle ────────────────────────────────────────
    const RAIL_KEY = "deck.userRailHidden";
    let railHidden = false;
    try {
        railHidden = localStorage.getItem(RAIL_KEY) === "1";
    } catch (e) { }

    const applyRail = () => {
        if (railHidden) {
            stage.setAttribute("no-rail", "");
            btnRail.setAttribute("data-active", "");
            lblRail.textContent = "Mostrar panel";
        } else {
            stage.removeAttribute("no-rail");
            btnRail.removeAttribute("data-active");
            lblRail.textContent = "Ocultar panel";
        }
    };
    applyRail();

    btnRail.addEventListener("click", () => {
        railHidden = !railHidden;
        try {
            localStorage.setItem(RAIL_KEY, railHidden ? "1" : "0");
        } catch (e) { }
        applyRail();
    });

    // ── Fullscreen toggle ──────────────────────────────────
    const isFs = () =>
        !!(document.fullscreenElement || document.webkitFullscreenElement);

    const updateFs = () => {
        if (isFs()) {
            btnFs.setAttribute("data-active", "");
            lblFs.textContent = "Salir";
        } else {
            btnFs.removeAttribute("data-active");
            lblFs.textContent = "Pantalla completa";
        }
    };

    btnFs.addEventListener("click", async () => {
        try {
            if (isFs()) {
                await (document.exitFullscreen?.() ||
                    document.webkitExitFullscreen?.());
            } else {
                const el = document.documentElement;
                await (el.requestFullscreen?.() ||
                    el.webkitRequestFullscreen?.());
            }
        } catch (e) {
            /* user gesture / iframe perms */
        }
    });

    document.addEventListener("fullscreenchange", updateFs);
    document.addEventListener("webkitfullscreenchange", updateFs);

    // ── Keyboard shortcuts ─────────────────────────────────
    document.addEventListener("keydown", (e) => {
        if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
            return;
        if (e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === "s" || e.key === "S") {
            btnRail.click();
        }
        if (e.key === "f" || e.key === "F") {
            btnFs.click();
        }
    });
})();