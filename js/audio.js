/**
 * audio.js — two separate things:
 *   Narration: one recording per scene, played in Listen mode.
 *              Files go in audio/<sceneId>.mp3 (e.g. audio/c1s01.mp3).
 *              A missing file is fine: that scene is just silent.
 *   Ambient:   an optional soft drone, synthesised in the browser (no file).
 *              Off by default; it starts only when the visitor clicks Sound.
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
  }

  function playScene(scene) {
    stop();
    if (mode !== "listen" || !scene) return;
    const src = scene.audio || `audio/${scene.id}.${window.STORY.CONFIG.audioExt}`;
    const a = new Audio(src);
    cur = a;
    a.addEventListener("error", () => { if (cur === a) showNote("No recording for this scene yet"); });
    a.addEventListener("playing", () => { if (cur === a) showNote(""); });
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
  let ctx = null, master = null, on = false;

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
      o.type = "sine";
      o.frequency.value = f;
      o.connect(filter);
      o.start();
    });
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lg = ctx.createGain();
    lg.gain.value = 0.012;
    lfo.connect(lg);
    lg.connect(master.gain);
    lfo.start();
  }

  function toggle() {
    on = !on;
    if (on && !ctx) build();
    if (!ctx) return on;
    if (ctx.state === "suspended") ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(on ? 0.045 : 0, ctx.currentTime + 1);
    return on;
  }
  window.addEventListener("pagehide", () => { if (ctx) ctx.close(); });
  return { toggle };
})();
