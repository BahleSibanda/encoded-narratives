/**
 * stage.js — the engine. You shouldn't need to edit this to add animations.
 *
 * One fixed stage. A tall invisible spacer makes the page scrollable, and the
 * scroll position `g` (0 → number of scenes) decides which scene is showing and
 * how far through it you are (`t`, 0 → 1). Scenes crossfade into each other.
 *
 * Add your own animation for any scene in js/animations.js:
 *     Stage.on("c1s03", (t, el, ctx) => { ... });
 */
(() => {
  const { CONFIG, MOODS, CHAPTERS, SCENES } = window.STORY;
  const N = SCENES.length;
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  const ramp = (t, a, b) => clamp((t - a) / (b - a));
  const $ = (s) => document.querySelector(s);
  const mk = (tag, cls, parent) => { const n = document.createElement(tag); if (cls) n.className = cls; if (parent) parent.append(n); return n; };

  const body = document.body, stage = $("#stage"), spacer = $("#spacer");
  const custom = {};
  const SHOW_PH = !!CONFIG.showPlaceholders || /[?&]briefs\b/.test(location.search);
  let perScene = 0, g = 0, active = -1, raf = 0;

  /* ---------- build the scenes ---------- */
  const artPath = (id, layer) => `art/${id}-${layer}.${layer === "bg" ? (CONFIG.bgExt || CONFIG.artExt) : CONFIG.artExt}`;

  /* Pieces: find the drawing inside the PNG and ignore the empty transparent
     border, so "width" means the size of the DRAWING, not of the canvas. */
  function contentBox(img) {
    const MAX = 240;
    const k = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight));
    const cw = Math.max(1, Math.round(img.naturalWidth * k)), ch = Math.max(1, Math.round(img.naturalHeight * k));
    const cv = document.createElement("canvas");
    cv.width = cw; cv.height = ch;
    const cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(img, 0, 0, cw, ch);
    const a = cx.getImageData(0, 0, cw, ch).data;
    let x0 = cw, y0 = ch, x1 = -1, y1 = -1;
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      if (a[(y * cw + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
    if (x1 < 0) return null;
    const pad = 2;
    return { x0: Math.max(0, x0 - pad) / cw, y0: Math.max(0, y0 - pad) / ch, x1: Math.min(cw, x1 + 1 + pad) / cw, y1: Math.min(ch, y1 + 1 + pad) / ch };
  }
  function applyTrim(img, inner, b) {
    const bw = b.x1 - b.x0, bh = b.y1 - b.y0;
    if (bw > 0.97 && bh > 0.97) return; // nothing worth trimming
    inner.style.position = "relative";
    inner.style.overflow = "hidden";
    inner.style.aspectRatio = `${bw * img.naturalWidth} / ${bh * img.naturalHeight}`;
    img.style.position = "absolute";
    img.style.width = 100 / bw + "%";
    img.style.height = "auto";
    img.style.left = -(b.x0 / bw) * 100 + "%";
    img.style.top = -(b.y0 / bh) * 100 + "%";
  }

  function makeImg(path, brief, parent, phClass, onLoad) {
    const img = new Image();
    img.alt = ""; img.decoding = "async"; img.hidden = true; img.dataset.src = path;
    parent.append(img);
    let ph = null;
    if (SHOW_PH && brief) {
      ph = mk("div", "ph " + (phClass || ""), parent);
      mk("span", "", ph).textContent = brief;
      mk("b", "fname", ph).textContent = path;   // the exact file name this box is waiting for
    }
    img.addEventListener("load", () => { img.hidden = false; if (ph) ph.remove(); if (onLoad) onLoad(img); });
    img.addEventListener("error", () => img.remove());
    return img;
  }

  const chRange = {};
  CHAPTERS.forEach((c) => {
    const first = SCENES.findIndex((x) => x.ch === c.n);
    let last = first;
    SCENES.forEach((x, i) => { if (x.ch === c.n) last = i; });
    chRange[c.n] = { start: first, end: last + 1 };
  });
  const chHasPlaceholder = new Set();

  const sentences = (t) => t.match(/[^.!?]+[.!?]+[”’"]*\s*|[^.!?]+$/g) || [t];

  const built = SCENES.map((s, i) => {
    const root = mk("section", "scene", stage);
    root.dataset.id = s.id; root.dataset.art = s.art;
    root.dataset.tone = MOODS[s.mood].tone;
    root.style.setProperty("--mood", MOODS[s.mood].bg);
    root.setAttribute("aria-hidden", "true");
    mk("div", "mood-bg", root);

    const e = { s, i, root, imgs: [], pieces: [], sents: [] };

    {   // chapter backdrop: sits under everything, so a scene with no picture of its own is never empty
      const info = CHAPTERS.find((c) => c.n === s.ch);
      const wrap = mk("div", "layer bg chbg", root);
      const showBrief = !chHasPlaceholder.has(s.ch);   // one placeholder per chapter, not one per scene
      chHasPlaceholder.add(s.ch);
      e.imgs.push(makeImg(artPath("ch" + s.ch, "bg"), showBrief ? (info.bg || "Chapter background") : null, wrap));
      const wash = mk("div", "chwash", root);
      wash.style.opacity = CONFIG.chapterBgWash != null ? CONFIG.chapterBgWash : 0.6;
      e.chbg = wrap;
    }

    const bgSource = s.bgRef ? SCENES.find((x) => x.id === s.bgRef) : s;
    if (s.art === "A" || (s.art === "R" && s.bgRef)) {
      const wrap = mk("div", "layer bg", root);
      const brief = s.art === "A" ? s.bg : `Background from ${s.bgRef}` ;
      e.imgs.push(makeImg(artPath(bgSource.id, "bg"), brief, wrap));
      e.bg = wrap;
    }

    if (s.route) {
      e.routeSvg = document.createElementNS(NS, "svg");
      e.routeSvg.setAttribute("class", "route");
      e.routePath = document.createElementNS(NS, "path");
      e.routePath.setAttribute("pathLength", "1");
      e.routeSvg.append(e.routePath);
      root.append(e.routeSvg);
      e.dots = s.route.pts.map(([x, y, label]) => {
        const d = mk("div", "route-dot", root);
        d.style.left = x + "%"; d.style.top = y + "%";
        mk("span", "", d).textContent = label;
        return d;
      });
    }

    (s.p || []).forEach((def, k) => {
      const [brief, x, y, w, at, motion] = def;
      const el = mk("div", "piece" + (motion === "float" ? " float" : ""), root);
      el.style.left = x + "%"; el.style.top = y + "%"; el.style.width = Math.min(92, w * (CONFIG.pieceScale || 1)) + "%";
      const inner = mk("div", "inner", el);
      e.imgs.push(makeImg(artPath(s.id, "p" + (k + 1)), brief, inner, "", (img) => {
        try { const b = contentBox(img); if (b) applyTrim(img, inner, b); } catch (err) { /* canvas blocked (e.g. file://): show the image untrimmed */ }
      }));
      e.pieces.push({ el, at, motion });
    });

    if (s.fg) {
      const wrap = mk("div", "layer fg", root);
      e.imgs.push(makeImg(artPath(s.id, "fg"), s.fg, wrap));
      e.fg = wrap;
    }

    mk("div", "scrim", root);
    e.tint = mk("div", "tint", root);
    e.rest = mk("div", "", root); // spare slot for your own elements

    const cap = mk("div", "caption", root);
    const ch = CHAPTERS.find((c) => c.n === s.ch);
    if (s.brk) mk("div", "cap-brk", cap).textContent = "↠↠↠↠↠↠↠↠↠↠";
    mk("div", "cap-eyebrow", cap).textContent = `Chapter ${ch.n} · ${ch.title}`;
    mk("h2", "", cap).textContent = s.h;
    const txt = mk("div", "cap-text", cap);
    s.text.forEach((para) => {
      const p = mk("p", "", txt);
      if (s.reveal === "sentences") sentences(para).forEach((st) => { const sp = mk("span", "sent", p); sp.textContent = st; e.sents.push(sp); });
      else p.textContent = para;
    });
    if (s.counter) {
      e.counter = mk("div", "counter", cap);
      e.counterNum = mk("span", "", e.counter);
      mk("small", "", e.counter).textContent = s.counter.label;
    }
    e.cap = cap;
    if (s.flash != null) e.flash = mk("div", "flash", root);
    return e;
  });

  /* ---------- layout ---------- */
  function layout() {
    const keep = perScene ? target : 0;
    perScene = innerHeight * CONFIG.vhPerScene / 100;
    spacer.style.height = N * perScene + innerHeight + "px";
    built.forEach((e) => {
      if (!e.routePath) return;
      const W = innerWidth, H = innerHeight;
      e.routeSvg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      e.routePath.setAttribute("d", "M " + e.s.route.pts.map(([x, y]) => `${x / 100 * W} ${y / 100 * H}`).join(" L "));
    });
    if (keep) scrollTo(0, keep * perScene);
  }

  /* ---------- loading: only fetch art for scenes near the visitor ---------- */
  function ensure(i) {
    for (let j = Math.max(0, i - 1); j <= Math.min(N - 1, i + 2); j++)
      built[j].imgs.forEach((img) => { if (img.dataset.src && !img.src) img.src = img.dataset.src; });
  }

  /* ---------- motion presets ---------- */
  const BG = {
    none: () => "scale(1.02)",
    pushIn: (t) => `scale(${1.02 + 0.14 * t})`,
    pullOut: (t) => `scale(${1.16 - 0.14 * t})`,
    panL: (t) => `scale(1.1) translateX(${lerp(2, -2, t)}%)`,
    panR: (t) => `scale(1.1) translateX(${lerp(-2, 2, t)}%)`
  };

  function piece(p, t) {
    const k = ramp(t, p.at, p.at + 0.18);
    const m = RM ? 0 : 1;
    let op = k, tx = 0, ty = 0, sc = 1;
    switch (p.motion) {
      case "rise":   ty = (1 - k) * 30 * m; break;
      case "fall":   ty = -(1 - k) * 60 * m; break;
      case "grow":   sc = 0.7 + 0.3 * k; break;
      case "slideL": tx = (1 - k) * 14 * m; break;
      case "slideR": tx = -(1 - k) * 14 * m; break;
      case "cross":  op = ramp(t, 0, 0.1) * (1 - ramp(t, 0.9, 1)); tx = lerp(-30, 30, t) * m; break;
    }
    p.el.style.opacity = op;
    p.el.style.transform = `translate(-50%,-50%) translate(${tx}vw,${ty}px) scale(${sc})`;
  }

  function animate(e, tt, w) {
    const s = e.s, t = clamp(tt);
    if (e.bg) {
      const m = RM ? "none" : (s.bgMotion || (s.art === "A" ? "pushIn" : "none"));
      e.bg.style.transform = BG[m](t);
    }
    if (e.chbg) {
      const r = chRange[s.ch];
      e.chbg.style.transform = RM ? "none" : BG.panL(clamp((g - r.start) / (r.end - r.start)));
    }
    if (e.fg) e.fg.style.transform = RM ? "none" : `translateX(${lerp(2, -4, t)}vw) scale(${1.04 + 0.06 * t})`;
    e.pieces.forEach((p) => piece(p, t));
    e.cap.style.transform = RM ? "none" : `translateY(${(1 - ramp(t, 0, 0.25)) * 14}px)`;

    if (e.sents.length) {
      const step = 0.7 / e.sents.length;
      e.sents.forEach((sp, k) => { sp.style.opacity = 0.14 + 0.86 * ramp(t, 0.08 + k * step, 0.08 + k * step + 0.1); });
    }
    if (s.tint) e.tint.style.opacity = lerp(s.tint[0], s.tint[1], t);
    if (e.flash) e.flash.style.opacity = clamp(1 - Math.abs(t - s.flash) / 0.05) * 0.85;
    if (e.counter) e.counterNum.textContent = Math.round(lerp(0, s.counter.to, smooth(ramp(t, s.counter.at, s.counter.at + 0.5)))).toLocaleString("en-US");
    if (e.routePath) {
      const pr = ramp(t, s.route.at, s.route.at + 0.6);
      e.routePath.style.strokeDashoffset = 1 - pr;
      e.dots.forEach((d, k) => d.classList.toggle("on", pr >= k / (e.dots.length - 1) - 0.001));
    }
    if (custom[s.id]) custom[s.id](tt, { root: e.root, bg: e.bg, fg: e.fg, pieces: e.pieces.map((p) => p.el), caption: e.cap, spare: e.rest, scene: s }, { g, i: e.i, w });
  }

  /* ---------- the frame loop ---------- */
  // `target` follows the real scroll position; `g` chases it. That makes the
  // animation glide instead of lurching with every notch of the mouse wheel.
  const FADE = 0.18;
  let target = 0, last = 0, snapTimer = 0, dragging = false;

  function render() {
    const ai = Math.min(N - 1, Math.floor(g));
    built.forEach((e, i) => {
      const tt = g - i;
      let w = 1, cw = 1; // w: artwork crossfades; cw: text never overlaps the next scene's text
      if (i > 0) { w *= smooth(clamp((tt + FADE) / (2 * FADE))); cw *= smooth(ramp(tt, 0.04, 0.2)); }
      if (i < N - 1) { w *= smooth(clamp((1 + FADE - tt) / (2 * FADE))); cw *= smooth(1 - ramp(tt, 0.8, 0.96)); }
      const show = w > 0.002 && Math.abs(i - ai) <= 1;
      e.root.style.visibility = show ? "visible" : "hidden";
      if (show) { e.root.style.opacity = w; e.cap.style.opacity = cw; animate(e, tt, w); }
    });
    if (ai !== active) setActive(ai);
    const prog = g / N;
    $("#mFill").style.height = prog * 100 + "%";
    $("#mBead").style.top = prog * 100 + "%";
  }

  function tick(now) {
    raf = 0;
    const dt = Math.min(0.1, (now - (last || now)) / 1000);
    last = now;
    const diff = target - g;
    if (RM || Math.abs(diff) < 0.0004) g = target;
    else g += diff * (1 - Math.exp(-dt / 0.11));
    render();
    if (g !== target) raf = requestAnimationFrame(tick); else last = 0;
  }
  const request = () => { target = clamp(scrollY / perScene, 0, N); if (!raf) raf = requestAnimationFrame(tick); };

  // When the visitor stops scrolling in the middle of a crossfade, ease to the
  // nearest moment where one scene is fully readable.
  function snapSoon() {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(() => {
      if (dragging || body.classList.contains("intro-open") || g !== target) return snapSoon();
      const i = Math.min(N - 1, Math.floor(target));
      const local = target - i;
      const lo = i === 0 ? 0 : 0.25, hi = i === N - 1 ? 1 : 0.75;
      if (local < lo || local > hi) scrollTo({ top: (i + clamp(local, lo, hi)) * perScene, behavior: RM ? "auto" : "smooth" });
    }, 160);
  }

  function setActive(i) {
    active = i;
    const s = SCENES[i], ch = CHAPTERS.find((c) => c.n === s.ch);
    body.dataset.tone = MOODS[s.mood].tone;
    $("#mLabel").textContent = [s.place || ch.place, s.date].filter(Boolean).join(" · ");
    $("#sceneCount").textContent = `${i + 1} / ${N}`;
    built.forEach((e, k) => e.root.setAttribute("aria-hidden", String(k !== i)));
    ensure(i);
    try { history.replaceState(null, "", "#" + s.id); } catch (err) { /* some browsers block this on file:// */ }
    window.dispatchEvent(new CustomEvent("scenechange", { detail: { scene: s, index: i } }));
  }

  /* ---------- navigation ---------- */
  function goTo(i) {
    i = clamp(i, 0, N - 1);
    scrollTo({ top: (i + 0.4) * perScene, behavior: RM ? "auto" : "smooth" });
  }
  const firstOf = (n) => SCENES.findIndex((s) => s.ch === n);

  function buildChapters() {
    const list = $("#chList");
    CHAPTERS.forEach((c) => {
      const b = mk("button", "ch-item", list);
      b.innerHTML = `<div class="n">CHAPTER ${c.n}</div><div class="t"></div><div class="p"></div><div class="b"></div>`;
      b.querySelector(".t").textContent = c.title;
      b.querySelector(".p").textContent = c.place;
      b.querySelector(".b").textContent = c.blurb;
      b.addEventListener("click", () => { $("#chapters").hidden = true; goTo(firstOf(c.n)); });
    });
    const track = $("#mTrack");
    CHAPTERS.forEach((c) => { const t = mk("b", "", track); t.style.top = firstOf(c.n) / N * 100 + "%"; });
    $("#chaptersBtn").addEventListener("click", () => { $("#chapters").hidden = false; });
    $("#chaptersClose").addEventListener("click", () => { $("#chapters").hidden = true; });
  }

  /* ---------- controls ---------- */
  function controls() {
    if (CONFIG.narration === "off") {   // no Listen mode: remove every trace of it
      document.querySelectorAll('[data-start="listen"], .seg, #ccBtn').forEach((n) => n.remove());
      const ch = document.querySelector(".choices"); if (ch) ch.style.gridTemplateColumns = "minmax(0, 16rem)";
    }
    document.querySelectorAll("[data-start]").forEach((b) => b.addEventListener("click", () => {
      window.Narration.setMode(b.dataset.start);
      $("#intro").classList.add("gone");
      body.classList.remove("intro-open");
      setTimeout(() => $("#intro").remove(), 800);
    }));
    document.querySelectorAll("button[data-mode]").forEach((b) => b.addEventListener("click", () => window.Narration.setMode(b.dataset.mode)));
    const ccBtn = $("#ccBtn");
    if (ccBtn) ccBtn.addEventListener("click", () => window.Narration.toggleCC());
    const soundBtn = $("#soundBtn");
    soundBtn.addEventListener("click", () => { window.Ambient.toggle(); });
    window.addEventListener("ambientchange", (ev) => {
      const { on, source } = ev.detail;
      soundBtn.setAttribute("aria-pressed", String(on));
      soundBtn.textContent = on ? "Sound: on" + (source ? " · " + source : "") : "Sound: off";
    });

    addEventListener("keydown", (e) => {
      if (body.classList.contains("intro-open")) return;
      if (e.key === "Escape") { $("#chapters").hidden = true; return; }
      if (e.key === " " && e.target.closest("button,a")) return;
      const next = ["ArrowDown", "PageDown", " "], prev = ["ArrowUp", "PageUp"];
      if (next.includes(e.key)) { e.preventDefault(); goTo(active + 1); }
      else if (prev.includes(e.key)) { e.preventDefault(); goTo(active - 1); }
      else if (e.key === "Home") { e.preventDefault(); goTo(0); }
      else if (e.key === "End") { e.preventDefault(); goTo(N - 1); }
    });

    // click and drag down to explore (mouse only; touch already scrolls)
    let drag = null;
    stage.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      drag = { y: e.clientY, top: scrollY };
      dragging = true;
      stage.setPointerCapture(e.pointerId);
      body.classList.add("dragging");
    });
    stage.addEventListener("pointermove", (e) => { if (drag) scrollTo(0, drag.top + (e.clientY - drag.y) * 1.6); });
    const end = () => { drag = null; dragging = false; body.classList.remove("dragging"); snapSoon(); };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
  }

  /* ---------- cursor: a ring with a short trail of beads ---------- */
  function cursor() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    body.classList.add("has-cursor");
    const ring = mk("div", "cursor-ring", body);
    const beads = [...Array(5)].map((_, k) => { const b = mk("div", "cursor-bead", body); b.style.setProperty("--k", k); if (RM) b.hidden = true; return b; });
    const items = [ring, ...beads];
    let mx = innerWidth / 2, my = innerHeight / 2;
    const pos = items.map(() => ({ x: mx, y: my }));
    addEventListener("pointermove", (e) => { mx = e.clientX; my = e.clientY; });
    document.addEventListener("pointerover", (e) => ring.classList.toggle("hot", !!e.target.closest("button,a,[role=button]")));
    (function loop() {
      pos.forEach((p, k) => {
        const tx = k === 0 ? mx : pos[k - 1].x, ty = k === 0 ? my : pos[k - 1].y;
        const f = RM ? 1 : (k === 0 ? 0.3 : 0.38);
        p.x += (tx - p.x) * f; p.y += (ty - p.y) * f;
        items[k].style.transform = `translate3d(${p.x}px,${p.y}px,0)`;
      });
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- go ---------- */
  buildChapters(); controls(); cursor(); layout();
  addEventListener("scroll", () => { request(); snapSoon(); }, { passive: true });
  let lastW = innerWidth, lastH = innerHeight;
  addEventListener("resize", () => {
    // phone address bars grow and shrink while you scroll: ignore small height-only changes
    if (Math.abs(innerWidth - lastW) < 1 && Math.abs(innerHeight - lastH) < 150) return;
    lastW = innerWidth; lastH = innerHeight;
    layout(); request();
  });

  const hashIndex = SCENES.findIndex((s) => "#" + s.id === location.hash);
  if (hashIndex > 0) scrollTo(0, (hashIndex + 0.4) * perScene);
  g = target = clamp(scrollY / perScene, 0, N);
  render();

  window.Stage = {
    on: (id, fn) => { custom[id] = fn; },
    goTo, scenes: SCENES,
    active: () => active,
    scene: () => SCENES[Math.max(active, 0)],
    helpers: { clamp, lerp, smooth, ramp }
  };
})();
