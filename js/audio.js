/**
 * audio.js: narration and background sound.
 *
 *  NARRATION (Listen mode)
 *    1. If a recording exists for the scene (audio/c1s01.mp3 ...) it plays that.
 *    2. If not, the browser reads the scene aloud with the device's own voice,
 *       so you do not have to record anything.
 *    Set  narration: "off"  in story-data.js to remove Listen mode entirely.
 *
 *  BACKGROUND SOUND (the Sound button, off until clicked)
 *    audio/ambient-ch1.mp3, ambient-ch2, ambient-ch3 (one per chapter, crossfaded)
 *    or audio/ambient.mp3 (one loop for the whole story). If there are no files it
 *    plays a soft synthesised drone. It dips while narration speaks.
 */
window.Narration = (() => {
  const CFG = window.STORY.CONFIG;
  const body = document.body;
  const note = document.getElementById("narrNote");
  const synth = window.speechSynthesis;
  const EXTS = [...new Set([CFG.audioExt, "mp3", "m4a", "ogg", "wav"])];
  let mode = "read", cc = false, cur = null, token = 0, voices = [];

  const showNote = (t) => { if (note) note.textContent = t; };
  const duck = (f) => { if (window.Ambient) window.Ambient.duck(f); };

  function fadeOut(a) {
    const step = setInterval(() => {
      a.volume = Math.max(0, a.volume - 0.15);
      if (a.volume <= 0) { clearInterval(step); a.pause(); }
    }, 40);
  }

  function stop() {
    token++;
    if (cur) { fadeOut(cur); cur = null; }
    if (synth) synth.cancel();
    showNote("");
    duck(false);
  }

  /* ---- the browser's own voice ---- */
  const loadVoices = () => { voices = synth ? synth.getVoices() : []; };
  if (synth) { loadVoices(); if (synth.addEventListener) synth.addEventListener("voiceschanged", loadVoices); }

  function pickVoice() {
    const want = (CFG.ttsVoice || "").toLowerCase();
    if (want) { const v = voices.find((x) => x.name.toLowerCase().includes(want)); if (v) return v; }
    for (const lang of [CFG.ttsLang || "en-ZA", "en-GB", "en-US", "en"]) {
      const v = voices.find((x) => x.lang && x.lang.toLowerCase().replace("_", "-").startsWith(lang.toLowerCase()));
      if (v) return v;
    }
    return null;
  }
  function pronounce(text) {
    const map = CFG.pronounce || {};
    Object.keys(map).forEach((k) => { text = text.split(k).join(map[k]); });
    return text;
  }
  // some browsers cut long speech off, so read in sentence-sized pieces
  function chunks(text) {
    const parts = text.match(/[^.!?]+[.!?]+[”’"]*\s*|[^.!?]+$/g) || [text];
    const out = []; let line = "";
    parts.forEach((p) => { if ((line + p).length > 200 && line) { out.push(line.trim()); line = p; } else line += p; });
    if (line.trim()) out.push(line.trim());
    return out;
  }
  function speak(scene, my) {
    if (!synth || !window.SpeechSynthesisUtterance) { showNote("This browser can’t read aloud"); return; }
    const parts = chunks(pronounce((scene.text || []).join(" ")));
    const voice = pickVoice();
    let i = 0;
    const next = () => {
      if (my !== token) return;
      if (i >= parts.length) { duck(false); return; }
      const u = new SpeechSynthesisUtterance(parts[i++]);
      if (voice) { u.voice = voice; u.lang = voice.lang; } else u.lang = CFG.ttsLang || "en";
      u.rate = CFG.ttsRate || 0.92;
      u.onend = next;
      u.onerror = () => {};
      synth.speak(u);
    };
    showNote(voice ? "Voice: " + voice.name : "Voice: your device’s default");
    duck(true);
    next();
  }

  function playScene(scene) {
    stop();
    if (mode !== "listen" || !scene) return;
    const my = token;
    const list = scene.audio ? [scene.audio] : EXTS.map((x) => `audio/${scene.id}.${x}`);
    const a = new Audio(list[0]);
    let n = 0;
    cur = a;
    a.addEventListener("error", () => {
      if (cur !== a) return;
      if (++n < list.length) { a.src = list[n]; a.play().catch(() => {}); return; }
      cur = null;
      // no recording for this scene: read it aloud (short pause so fast scrolling doesn't chatter)
      setTimeout(() => { if (my === token && mode === "listen") speak(scene, my); }, 400);
    });
    a.addEventListener("playing", () => { if (cur === a) { showNote(""); duck(true); } });
    a.addEventListener("ended", () => { if (cur === a) duck(false); });
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
    if (CFG.narration === "off") m = "read";
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
  const EXTS = [...new Set([CFG.audioExt, "mp3", "m4a", "ogg", "wav"])];
  const BASE = CFG.ambientVolume != null ? CFG.ambientVolume : 0.4;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const els = {}, bad = new Set();
  let on = false, ducked = false, chapter = 1, current = null, token = 0;
  let ctx = null, master = null;
  const announce = (src) => window.dispatchEvent(new CustomEvent("ambientchange", {
    detail: { on, source: !on ? null : (src === undefined ? "starting…" : (src ? src.split("/").pop() : "built-in drone (no sound file found)")) }
  }));

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
    const candidates = [];
    [`audio/ambient-ch${n}`, "audio/ambient"].forEach((base) => EXTS.forEach((x) => candidates.push(`${base}.${x}`)));
    const todo = candidates.filter((c) => !bad.has(c));
    for (const src of todo) {
      if (prev && prev.src === src) return;                 // this file is already playing: let it run on
      const ok = await attempt(src);
      if (my !== token || !on) { if (ok) fade(getEl(src), 0, 400, true); return; }
      if (ok) { retire(prev); current = { src, el: getEl(src) }; announce(src); return; }
    }
    if (prev) return;                                       // nothing new for this chapter: keep what is playing
    synthOn();
    current = { src: null, el: null };
    announce(null);
  }

  function toggle() {
    on = !on;
    if (on) { announce(undefined); switchTo(chapter); }
    else {
      token++;
      retire(current);
      current = null;
      announce();
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
