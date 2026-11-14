/**
 * animations.js — YOUR animations live here.
 *
 *   Stage.on("c1s03", (t, el, ctx) => { ... });
 *
 *   t    progress through the scene. 0 = just arrived, 1 = about to leave.
 *        It can sit slightly outside 0–1 while scenes crossfade.
 *   el   the scene's parts:
 *          el.root     the whole scene
 *          el.bg       background layer (may be undefined on text-only scenes)
 *          el.fg       foreground layer (if the scene has one)
 *          el.pieces   array of the cut-out pieces, in the order listed in story-data.js
 *          el.caption  the text block
 *          el.spare    an empty div for anything you want to add yourself
 *   ctx  { g, i, w }: global scroll position, scene index, and how visible the scene is.
 *
 * The function runs on every scroll frame while the scene is on screen, so
 * keep it light: change transform and opacity, nothing else.
 *
 * TEMPLATE (copy, rename the id, and fill in):
 *
 *   Stage.on("c1s12", (t, el) => {
 *     const [dress, apron] = el.pieces;               // your two cut-outs
 *     dress.style.filter = `brightness(${0.7 + 0.5 * ramp(t, 0.1, 0.4)})`;
 *     apron.style.transform += ` rotate(${lerp(-3, 3, t)}deg)`;
 *   });
 */
(() => {
  const { clamp, ramp, lerp } = Stage.helpers;

  /* ---- DEMO 1 + 2: rings of sound across the hills ---------------------
   * c1s06: the execution's echo spreads outward and stays.
   * c3s18: the same rings come back in reverse as the hills lean in.
   * Pure CSS circles: no artwork needed, so you can see an animation
   * working before you've drawn anything.                                 */
  function rings(id, reverse) {
    let box = null;
    Stage.on(id, (t, el) => {
      if (!box) {
        box = document.createElement("div");
        box.className = "rings";
        for (let k = 0; k < 5; k++) box.append(document.createElement("i"));
        el.spare.append(box);
      }
      const p = clamp(reverse ? 1 - t : t);
      [...box.children].forEach((ring, k) => {
        const phase = clamp(p * 1.25 - k * 0.13);
        ring.style.transform = `scale(${0.1 + phase * 2.4})`;
        ring.style.opacity = phase > 0 ? 0.6 - k * 0.09 : 0;
      });
    });
  }
  rings("c1s06", false);
  rings("c3s18", true);

  /* ---- your animations go below this line ---- */
})();
