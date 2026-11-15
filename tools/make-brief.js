// Run:  node tools/make-brief.js
// Reads js/story-data.js and writes ART-BRIEF.md: every illustration and
// animation to make, scene by scene, with the exact file names to use.
const fs = require("fs");
const vm = require("vm");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(__dirname + "/../js/story-data.js", "utf8"), ctx);
const { CONFIG, CHAPTERS, SCENES } = ctx.window.STORY;
const ext = CONFIG.artExt, bgExt = CONFIG.bgExt || CONFIG.artExt;
const LEVEL = { A: "Hero illustration", B: "Cut-outs on a plain colour", R: "Reuses another background", C: "Text only" };

let out = `# Art & animation brief

Generated from js/story-data.js. Put drawings in art/ with the file names shown. Backgrounds are .${bgExt}; pieces and foregrounds are .${ext} with a transparent background.

## Sizes for a sharp, HD result

| Layer | Export at | Notes |
|---|---|---|
| Background (-bg) | **2560 x 1440 px** (16:9), at least 1920 x 1080 | Fills the whole screen and slowly zooms in, so give it spare resolution. Use .jpg (quality ~85) if you want much smaller files. |
| Foreground (-fg) | **2560 px wide**, transparent | Moves faster than the background. |
| Pieces (-p1, -p2) | **1600 px on the longest side**, transparent | Shown at roughly 25-35% of the screen width. |

The site trims empty transparent borders off pieces automatically, but trimming them yourself keeps files smaller. Do not scale small drawings up: draw or export big in the first place.

`;
const count = { A: 0, B: 0, R: 0, C: 0 };
SCENES.forEach((s) => count[s.art]++);
out += `**Totals:** ${count.A} hero illustrations (A), ${count.B} cut-out scenes (B), ${count.R} reuse scenes (R), ${count.C} text-only scenes (C), ${SCENES.length} scenes in all.\n\n`;
out += `**Draw in this order:** all A scenes first (they carry the story), then the B cut-outs, then R extras. C scenes need nothing.\n`;

CHAPTERS.forEach((c) => {
  out += `\n---\n\n## Chapter ${c.n}: ${c.title}\n`;
  SCENES.filter((s) => s.ch === c.n).forEach((s) => {
    out += `\n### ${s.id} · ${s.h}  \`${s.art}\` ${LEVEL[s.art]}\n`;
    if (s.art === "A") out += `- **Background** \`art/${s.id}-bg.${bgExt}\`: ${s.bg}\n`;
    if (s.art === "R" && s.bgRef) out += `- Background: reuses \`art/${s.bgRef}-bg.${bgExt}\`\n`;
    if (s.fg) out += `- **Foreground** \`art/${s.id}-fg.${ext}\`: ${s.fg}\n`;
    (s.p || []).forEach((p, k) => { out += `- **Piece ${k + 1}** \`art/${s.id}-p${k + 1}.${ext}\`: ${p[0]}\n`; });
    if (s.route) out += `- **Route** on the map: ${s.route.pts.map((p) => p[2]).join(" → ")} (adjust the points in story-data.js)\n`;
    out += `- **Animation:** ${s.anim}\n`;
  });
});
fs.writeFileSync(__dirname + "/../ART-BRIEF.md", out);
console.log("wrote ART-BRIEF.md", count);
