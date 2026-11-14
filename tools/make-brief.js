// Run:  node tools/make-brief.js
// Reads js/story-data.js and writes ART-BRIEF.md: every illustration and
// animation to make, scene by scene, with the exact file names to use.
const fs = require("fs");
const vm = require("vm");
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(__dirname + "/../js/story-data.js", "utf8"), ctx);
const { CONFIG, CHAPTERS, SCENES } = ctx.window.STORY;
const ext = CONFIG.artExt;
const LEVEL = { A: "Hero illustration", B: "Cut-outs on a plain colour", R: "Reuses another background", C: "Text only" };

let out = `# Art & animation brief\n\nGenerated from js/story-data.js. Put drawings in art/ with the file names shown (${ext}, transparent background for pieces and foregrounds).\n\n`;
const count = { A: 0, B: 0, R: 0, C: 0 };
SCENES.forEach((s) => count[s.art]++);
out += `**Totals:** ${count.A} hero illustrations (A), ${count.B} cut-out scenes (B), ${count.R} reuse scenes (R), ${count.C} text-only scenes (C), ${SCENES.length} scenes in all.\n\n`;
out += `**Draw in this order:** all A scenes first (they carry the story), then the B cut-outs, then R extras. C scenes need nothing.\n`;

CHAPTERS.forEach((c) => {
  out += `\n---\n\n## Chapter ${c.n}: ${c.title}\n`;
  SCENES.filter((s) => s.ch === c.n).forEach((s) => {
    out += `\n### ${s.id} · ${s.h}  \`${s.art}\` ${LEVEL[s.art]}\n`;
    if (s.art === "A") out += `- **Background** \`art/${s.id}-bg.${ext}\`: ${s.bg}\n`;
    if (s.art === "R" && s.bgRef) out += `- Background: reuses \`art/${s.bgRef}-bg.${ext}\`\n`;
    if (s.fg) out += `- **Foreground** \`art/${s.id}-fg.${ext}\`: ${s.fg}\n`;
    (s.p || []).forEach((p, k) => { out += `- **Piece ${k + 1}** \`art/${s.id}-p${k + 1}.${ext}\`: ${p[0]}\n`; });
    if (s.route) out += `- **Route** on the map: ${s.route.pts.map((p) => p[2]).join(" → ")} (adjust the points in story-data.js)\n`;
    out += `- **Animation:** ${s.anim}\n`;
  });
});
fs.writeFileSync(__dirname + "/../ART-BRIEF.md", out);
console.log("wrote ART-BRIEF.md", count);
