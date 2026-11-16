/**
 * audio.js — two separate things (this file was updated for background sound):
 *   Narration: one recording per scene, played in Listen mode.
 *              Files go in audio/<sceneId>.mp3 (e.g. audio/c1s01.mp3).
 *              A missing file is fine: that scene is just silent.
 *   Ambient:   background sound, off until the visitor clicks Sound. It looks for
 *              audio/ambient-ch1.mp3, ambient-ch2, ambient-ch3 (one per chapter,
 *              crossfaded when the chapter changes) and then audio/ambient.mp3 (one
 *              loop for the whole story). If none exist it plays a soft synthesised drone.
 *              While narration speaks, the background sound is lowered.
 */
window.Narration = (() => {
  const body = document.body;
  const note = document.getElementById("narrNote");
  let mode = "read", cc = false, cur = null;

  const showNote = (t) => { if (note) note.textContent = t; };

  function fadeOut(a) {
    const step = setInterval(() => {
      a.volume = Math.max(0, a.volume - 0.15);
      if (a.volume <= 0) { clearInterval(step); a.pause(); }
    }, 40);
  }

  function stop() {
    if (cur) { fadeOut(cur); cur = null; }
    showNote("");
    if (window.Ambient) window.Ambient.duck(false);
  }

  function playScene(scene) {
    stop();
    if (mode !== "listen" || !scene) return;
    const src = scene.audio || `audio/${scene.id}.${window.STORY.CONFIG.audioExt}`;
    const a = new Audio(src);
    cur = a;
    a.addEventListener("error", () => { if (cur === a) showNote("No recording for this scene yet"); });
    a.addEventListener("playing", () => { if (cur === a) { showNote(""); if (window.Ambient) window.Ambient.duck(true); } });
    a.addEventListener("ended", () => { if (cur === a && window.Ambient) window.Ambient.duck(false); });
    a.play().catch(() => {});
  }

  function render() {
    body.dataset.mode = mode;
    document.querySelectorAll("button[data-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    const ccBtn = document.getElementById("ccBtn");
    if (ccBtn) { ccBtn.hidden = mode !== "listen"; ccBtn.setAttribute("aria-pressed", String(cc)); }
    body.classList.toggle("listen-cc-off", mode === "listen" && !cc);
  }

  function setMode(m) {
    mode = m;
    render();
    if (m === "listen" && window.Stage) playScene(window.Stage.scene());
    else stop();
  }
  function setCC(v) { cc = v; render(); }

  window.addEventListener("scenechange", (e) => playScene(e.detail.scene));
  window.addEventListener("pagehide", stop);
  render();

  return { setMode, setCC, toggleCC: () => setCC(!cc), mode: () => mode, playScene, stop };
})();

window.Ambient = (() => {
  const CFG = window.STORY.CONFIG;
  const EXT = CFG.audioExt;
  const BASE = CFG.ambientVolume != null ? CFG.ambientVolume : 0.4;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const els = {}, bad = new Set();
  let on = false, ducked = false, chapter = 1, current = null, token = 0;
  let ctx = null, master = null;

  const level = () => BASE * (ducked ? 0.35 : 1);

  /* ---- files ---- */
  function getEl(src) {
    if (!els[src]) { const el = new Audio(src); el.loop = true; el.preload = "auto"; el.volume = 0; els[src] = el; }
    return els[src];
  }
  function fade(el, to, ms, pause) {
    clearInterval(el._fade);
    const from = el.volume, steps = Math.max(1, Math.round(ms / 40));
    let i = 0;
    el._fade = setInterval(() => {
      i++;
      try { el.volume = clamp01(from + (to - from) * i / steps); } catch (e) { /* some phones ignore volume */ }
      if (i >= steps) { clearInterval(el._fade); if (pause) el.pause(); }
    }, 40);
  }
  // try to play a file; a missing file is remembered so we move on to the next choice
  function attempt(src) {
    if (bad.has(src)) return Promise.resolve(false);
    const el = getEl(src);
    const p = el.play();
    if (!p || !p.then) return Promise.resolve(true);
    return p.then(() => { fade(el, level(), 1500); return true; })
            .catch((err) => { if (err && err.name === "NotSupportedError") bad.add(src); return false; });
  }

  /* ---- fallback drone (no file needed) ---- */
  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.connect(master);
    [110, 165].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = "sine"; o.frequency.value = f;
      o.connect(filter); o.start();
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lg = ctx.createGain();
    lg.gain.value = 0.012;
    lfo.connect(lg); lg.connect(master.gain); lfo.start();
  }
  const synthLevel = () => 0.045 * (ducked ? 0.35 : 1);
  function synthTo(v, secs) {
    if (!ctx) return;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(v, ctx.currentTime + secs);
  }
  function synthOn() { if (!ctx) build(); if (ctx.state === "suspended") ctx.resume(); synthTo(synthLevel(), 1.2); }

  function retire(prev) {
    if (!prev) return;
    if (prev.el) fade(prev.el, 0, 1500, true); else synthTo(0, 1);
  }

  async function switchTo(n) {
    const my = ++token;
    const prev = current;
    const candidates = [`audio/ambient-ch${n}.${EXT}`, `audio/ambient.${EXT}`].filter((c) => !bad.has(c));
    for (const src of candidates) {
      if (prev && prev.src === src) return;                 // this file is already playing: let it run on
      const ok = await attempt(src);
      if (my !== token || !on) { if (ok) fade(getEl(src), 0, 400, true); return; }
      if (ok) { retire(prev); current = { src, el: getEl(src) }; return; }
    }
    if (prev && !prev.src) return;                          // drone already playing
    retire(prev);
    synthOn();
    current = { src: null, el: null };
  }

  function toggle() {
    on = !on;
    if (on) switchTo(chapter);
    else {
      token++;
      retire(current);
      current = null;
    }
    return on;
  }

  function duck(flag) {
    ducked = flag;
    if (!on || !current) return;
    if (current.el) fade(current.el, level(), 500); else synthTo(synthLevel(), 0.5);
  }

  window.addEventListener("scenechange", (e) => {
    const n = e.detail.scene.ch;
    if (n !== chapter) { chapter = n; if (on) switchTo(n); }
  });
  window.addEventListener("pagehide", () => {
    Object.values(els).forEach((el) => el.pause());
    if (ctx) ctx.close();
  });

  return { toggle, duck, isOn: () => on };
})();
