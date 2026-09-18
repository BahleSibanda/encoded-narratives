# Encoded Narratives

A three-page site: a homepage where you pick a "door" to a story, a
story page with scroll-revealed illustrations, and a learn-more page.
No build step — plain HTML/CSS/JS, so it runs straight from disk.

```
encoded-narratives/
├── index.html          homepage — hut + door carousel
├── story.html           story template (reads ?story=<slug> from the URL)
├── learn-more.html       about / inspiration page
├── css/style.css         all styling + design tokens (see :root at the top)
└── js/
    ├── story-data.js     ← edit this to add/replace stories
    ├── doors.js          homepage carousel + door "enter" animation
    └── story.js          renders a story page + scroll reveal + motifs
```

## Running it in VS Code

1. Open the `encoded-narratives` folder in VS Code (`File → Open Folder…`).
2. Install the **Live Server** extension (by Ritwick Dey) from the
   Extensions panel, if you don't have it already.
3. Right-click `index.html` → **Open with Live Server**. It'll open in
   your browser and auto-refresh whenever you save a file.

(You can also just double-click `index.html` to open it directly in a
browser — everything works without a server, since there's no build
step or fetch() calls to local files.)

## How the pieces fit together

**Homepage (`index.html` + `js/doors.js`)**
The hut, roof, and door are plain divs shaped with CSS (`clip-path` for
the roof triangle, borders for the beaded door trim) — no image assets
to manage. `doors.js` holds an `index` into the `STORIES` array from
`story-data.js`; the arrows step that index and re-paint the door's
accent colour + the caption underneath the hut. Clicking the door adds
an `is-entering` class that scales the whole hut up and fades in a
full-screen colour overlay (see `.is-entering` rules in `style.css`),
then after 650ms it navigates to `story.html?story=<slug>`.

**Story page (`story.html` + `js/story.js`)**
Reads the `story` slug from the URL, looks it up in `STORIES`, and
builds one `<section class="story-chapter">` per paragraph on the
right, plus one generated SVG "beadwork motif" per illustration label
on the left (see `buildMotif()` — it pattern-matches on keywords like
`chevron`, `triangle`, `wave`, `diamond` to draw a simple geometric
mark; swap in real illustrations by replacing that function's output
with `<img>` tags if you'd rather hand-draw them). Two
`IntersectionObserver`s do the scroll work: one fades each chapter in
as it enters the viewport, the other crossfades the matching motif on
the left.

**Learn more page (`learn-more.html`)**
Static content, solid `--ink` background, centered text column. Edit
the copy directly in the HTML.

## Adding or editing a story

Everything content-wise lives in `js/story-data.js`. Each story is one
object:

```js
{
  id: "unique-id",
  slug: "url-friendly-slug",       // used in story.html?story=slug
  accent: "red",                    // red | blue | gold | green (see css/style.css)
  figure: "Name",
  title: "Story title",
  blurb: "One line, shown on the homepage under the hut.",
  paragraphs: [ "chapter 1 text…", "chapter 2 text…", … ],
  illustrations: [ "triangle-lattice", "wave-band", … ] // one per paragraph
}
```

`paragraphs` and `illustrations` must stay the same length — they're
paired by index. Add a new accent colour by adding a `--accent-*`
variable in `css/style.css` and a matching entry in the `ACCENT_VAR`
maps in `doors.js` and `story.js`.

## Notes

- All story text and the "On beads…" copy on the learn-more page are
  **placeholder content** — swap them for your own research and
  sources before publishing.
- Colour choices (red = passion, blue = faithfulness/hope, green =
  fertility/growth, gold/brass = status and ornament) are drawn from
  documented Nguni beadwork symbolism, not invented for this project —
  worth citing your own sources on the learn-more page.
- `prefers-reduced-motion` is respected globally (see the bottom of
  `style.css`).
