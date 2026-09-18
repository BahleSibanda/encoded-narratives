/**
 * story-data.js
 * -----------------------------------------------------------------------
 * One object per door / story. This is PLACEHOLDER content so the site
 * has something real to click through — swap in your own research,
 * words and sources before this goes live.
 *
 * accent   -> must match a --accent-* colour defined in css/style.css
 * paragraphs -> each one becomes a scroll "chapter" on the story page and
 *               is paired 1-to-1 with the illustration at the same index
 *               (illustrations array). Keep the two arrays the same length.
 * illustration -> a short label used to build a simple generative beadwork
 *               motif on the left panel. See js/story.js -> buildMotif()
 * -----------------------------------------------------------------------
 */

const STORIES = [
  {
    id: "mkabayi",
    slug: "mkabayi-kajama",
    accent: "red",
    figure: "Mkabayi kaJama",
    title: "The Regent Who Never Married the Throne",
    blurb: "Strategist, kingmaker, and the woman who held the Zulu regency twice.",
    paragraphs: [
      "Mkabayi kaJama was born into the Zulu royal house at a moment when the kingdom's borders were still being drawn in spear-lines and cattle tracks. She chose, deliberately and against custom, never to marry — a decision that freed her to remain inside the politics of the royal homestead for the whole of her long life.",
      "When her brother Senzangakhona died, it was Mkabayi's judgement that shaped who would rule. Later, after the assassination of Shaka, she was regent again — twice trusted with the kingdom in its most unstable hours, twice handing it back.",
      "Zulu oral history remembers her as iqhikiza, an unmarried woman elder, but the beadwork made in her honour uses the language of a much older motif: the upward triangle, the symbol for a woman standing in her own right, unpaired, undiminished."
    ],
    illustrations: ["triangle-lattice", "twin-chevron", "standing-triangle"]
  },
  {
    id: "nandi",
    slug: "nandi-kabhebhe",
    accent: "blue",
    figure: "Queen Nandi kaBhebhe",
    title: "The Mother Who Was Never Meant to Be Queen",
    blurb: "An outcast pregnancy, a hidden son, and the woman who raised a kingdom's founder.",
    paragraphs: [
      "Nandi's pregnancy was, by the account of her own clan, an inconvenience — the story goes that the elders called it iShaka, an intestinal parasite, refusing to believe it was a child at all. That dismissed pregnancy became Shaka kaSenzangakhona.",
      "Exiled from her husband's homestead, Nandi raised her son in hardship among the Qwabe and then the Mthethwa, on the edges of protection rather than inside it. Every account of Shaka's discipline and his hunger for legitimacy traces back to those years.",
      "Blue beads in Nguni symbolism speak of faithfulness kept under pressure, and sometimes of hope worn like armour. Nandi's story is remembered less for the throne she never held than for the one she built, patiently, inside her son."
    ],
    illustrations: ["wave-band", "sheltering-arc", "root-lattice"]
  },
  {
    id: "esther",
    slug: "esther-mahlangu",
    accent: "gold",
    figure: "Esther Mahlangu",
    title: "The Wall Became a Signature",
    blurb: "An Ndebele artist who carried mural geometry off the homestead wall and onto the world stage.",
    paragraphs: [
      "Esther Mahlangu learned to paint the way most Ndebele girls did — from her mother and grandmother, freehand, using a chicken feather and pigments mixed by eye, decorating the walls of the family homestead as an act of everyday belonging.",
      "What set Mahlangu apart was scale and refusal: she kept the geometry exact — the hard-edged triangles, the stepped chevrons, the saturated primaries — and moved it, unapologetically, onto canvas, BMW bonnets, aircraft fuselages, gallery walls.",
      "Every beaded apron and every painted wall in this tradition shares one grammar with the beadwork elsewhere in this project: colour and shape as a spoken language, not decoration. Mahlangu simply made sure the world had to learn to read it."
    ],
    illustrations: ["stepped-chevron", "grid-quilt", "sun-diamond"]
  },
  {
    id: "lozikeyi",
    slug: "lozikeyi-dlodlo",
    accent: "green",
    figure: "Queen Lozikeyi Dlodlo",
    title: "The Regent Who Would Not Settle",
    blurb: "Senior queen of the Ndebele, and the strategist behind an uprising the British never expected.",
    paragraphs: [
      "Lozikeyi Dlodlo was the senior and most outspoken of King Lobengula's wives, known even before her husband's death for a bluntness that unsettled the missionaries and settlers passing through Bulawayo. She had no sons, but her influence in the royal house never depended on that.",
      "When Lobengula vanished during the war of 1893, Lozikeyi stepped into the role of de facto regent. Three years later, when the Ndebele rose against colonial rule in what became known as the War of the Red Axe, she was widely credited as the strategist rallying the warriors — even as the fighting itself was led by men in the field.",
      "The uprising ended in negotiated peace in the Matobo hills, not victory, and Lozikeyi spent her remaining years defiant under colonial rule until her death in 1919. Generations later, Zimbabwean liberation fighters still named her their foremother. Green, in Nguni beadwork, speaks of ground that will bear again — a fitting colour for a queen remembered less for the war she lost than for what she kept alive after it."
    ],
    illustrations: ["shield-triangle", "war-chevron", "council-arc"]
  }
];
