/**
 * story.js — renders one story from STORIES (story-data.js) based on the
 * ?story= slug in the URL, wires up scroll-reveal for the text chapters,
 * and crossfades a simple generative beadwork motif on the left panel to
 * match whichever chapter is currently in view.
 */
(() => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("story");

  let idx = STORIES.findIndex(s => s.slug === slug);
  if (idx === -1) idx = 0; // fall back to first story rather than a dead page

  const story = STORIES[idx];
  const ACCENT_VAR = { red: "var(--accent-red)", blue: "var(--accent-blue)", gold: "var(--accent-gold)", green: "var(--accent-green)" };

  const body       = document.getElementById("storyPage");
  const titleEl    = document.getElementById("storyTitle");
  const textEl     = document.getElementById("storyText");
  const motifFrame = document.getElementById("motifFrame");
  const prevLink   = document.getElementById("prevStoryLink");
  const nextLink   = document.getElementById("nextStoryLink");

  body.style.setProperty("--accent", ACCENT_VAR[story.accent] || ACCENT_VAR.red);
  titleEl.textContent = `${story.figure} — ${story.title}`;
  document.title = `${story.figure} · Encoded Narratives`;

  const prevStory = STORIES[(idx - 1 + STORIES.length) % STORIES.length];
  const nextStory = STORIES[(idx + 1) % STORIES.length];
  prevLink.href = `story.html?story=${prevStory.slug}`;
  prevLink.textContent = `← ${prevStory.figure}`;
  nextLink.href = `story.html?story=${nextStory.slug}`;
  nextLink.textContent = `${nextStory.figure} →`;

  /* ---- build the text chapters ---- */
  story.paragraphs.forEach((para, i) => {
    const chapter = document.createElement("section");
    chapter.className = "story-chapter";
    chapter.dataset.chapter = i;
    chapter.innerHTML = `
      <span class="chapter-index">${String(i + 1).padStart(2, "0")} / ${String(story.paragraphs.length).padStart(2, "0")}</span>
      <p>${para}</p>
    `;
    textEl.appendChild(chapter);
  });

  /* ---- build one motif svg per chapter, stacked for crossfade ---- */
  story.illustrations.forEach((motif, i) => {
    const svg = buildMotif(motif);
    svg.dataset.chapter = i;
    motifFrame.appendChild(svg);
  });

  /* ---- scroll reveal: fade chapters in, swap the visible motif ---- */
  const chapters = Array.from(document.querySelectorAll(".story-chapter"));
  const motifs   = Array.from(motifFrame.querySelectorAll("svg"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.35 });
  chapters.forEach(c => revealObserver.observe(c));

  const motifObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const n = entry.target.dataset.chapter;
        motifs.forEach(m => m.classList.toggle("is-visible", m.dataset.chapter === n));
      }
    });
  }, { threshold: 0.5 });
  chapters.forEach(c => motifObserver.observe(c));

  /* show the first motif immediately so the panel isn't empty on load */
  if (motifs[0]) motifs[0].classList.add("is-visible");

  /* ------------------------------------------------------------------ */
  function buildMotif(name){
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");

    const g = document.createElementNS(ns, "g");
    g.setAttribute("fill", "none");
    g.setAttribute("stroke", "currentColor");
    g.setAttribute("stroke-width", "2");
    svg.appendChild(g);

    const add = (el, attrs) => {
      const node = document.createElementNS(ns, el);
      Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
      g.appendChild(node);
      return node;
    };

    if (/chevron|stepped/.test(name)){
      for (let row = 0; row < 5; row++){
        const y = 20 + row * 32;
        add("polyline", { points: `20,${y + 16} 100,${y} 180,${y + 16}`, "stroke-width": row % 2 === 0 ? 4 : 2 });
      }
    } else if (/triangle|lattice(?!-)/.test(name) || name === "triangle-lattice" || name === "standing-triangle"){
      const rows = 4, cols = 4;
      for (let r = 0; r < rows; r++){
        for (let c = 0; c < cols; c++){
          const x = 20 + c * 42, y = 20 + r * 42;
          const up = (r + c) % 2 === 0;
          const pts = up ? `${x},${y + 34} ${x + 34},${y + 34} ${x + 17},${y}` : `${x},${y} ${x + 34},${y} ${x + 17},${y + 34}`;
          add("polygon", { points: pts, fill: (r + c) % 3 === 0 ? "currentColor" : "none", "stroke-width": "1.5" });
        }
      }
    } else if (/wave|root/.test(name)){
      for (let i = 0; i < 4; i++){
        const y = 40 + i * 40;
        add("path", { d: `M 10 ${y} Q 55 ${y - 26} 100 ${y} T 190 ${y}`, "stroke-width": i === 1 ? 4 : 2 });
      }
    } else if (/arc|sheltering/.test(name)){
      for (let r = 20; r <= 90; r += 18){
        add("path", { d: `M ${100 - r} 100 A ${r} ${r} 0 0 1 ${100 + r} 100`, "stroke-width": "2.5" });
      }
    } else if (/grid|quilt/.test(name)){
      for (let i = 0; i <= 4; i++){
        const p = 20 + i * 40;
        add("line", { x1: p, y1: 20, x2: p, y2: 180 });
        add("line", { x1: 20, y1: p, x2: 180, y2: p });
      }
      for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
          if ((r + c) % 2 === 0) add("rect", { x: 20 + c * 40, y: 20 + r * 40, width: 40, height: 40, fill: "currentColor", opacity: "0.18", stroke: "none" });
        }
      }
    } else if (/diamond|sun/.test(name)){
      add("polygon", { points: "100,20 180,100 100,180 20,100", "stroke-width": "3" });
      for (let r = 1; r <= 3; r++){
        const o = r * 22;
        add("polygon", { points: `100,${100 - o} ${100 + o},100 100,${100 + o} ${100 - o},100`, "stroke-width": "1.4" });
      }
    } else if (/seed|branch|field|row/.test(name)){
      add("line", { x1: 100, y1: 170, x2: 100, y2: 60 });
      add("line", { x1: 100, y1: 110, x2: 60, y2: 75 });
      add("line", { x1: 100, y1: 110, x2: 140, y2: 75 });
      add("line", { x1: 100, y1: 145, x2: 65, y2: 120 });
      add("line", { x1: 100, y1: 145, x2: 135, y2: 120 });
      [ [100,55], [60,75], [140,75], [65,120], [135,120] ].forEach(([cx, cy]) => {
        add("circle", { cx, cy, r: 7, fill: "currentColor", stroke: "none" });
      });
    } else {
      /* default: a simple twin-triangle mark, echoes the female / male
         symbolism referenced in Southern Nguni beadwork */
      add("polygon", { points: "60,140 140,140 100,70", "stroke-width": "3" });
      add("polygon", { points: "60,60 140,60 100,130", "stroke-width": "1.4", opacity: "0.5" });
    }

    return svg;
  }
})();
