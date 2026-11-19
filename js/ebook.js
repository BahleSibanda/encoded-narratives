/**
 * ebook.js: shows a "Download the ebook" link wherever the pages have one,
 * but only when CONFIG.ebook (in js/story-data.js) points to a file.
 */
(() => {
  const C = window.STORY && window.STORY.CONFIG;
  if (!C || !C.ebook) return;
  document.querySelectorAll("[data-ebook]").forEach((a) => {
    a.href = C.ebook;
    a.setAttribute("download", "");
    a.textContent = C.ebookLabel || "Download the ebook";
    a.hidden = false;
  });
})();
