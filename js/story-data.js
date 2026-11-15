/**
 * story-data.js — the whole story, one object per scene.
 * Matches your EDITED draft (3 chapters, 54 scenes).
 *
 * HOW A SCENE WORKS
 *  id      c1s01 = chapter 1, scene 1. Art files are found by this id (see README).
 *  art     A = hero illustration (full background, maybe cut-outs)
 *          B = cut-out pieces on a plain mood colour (the cheap, quiet scenes)
 *          R = reuses another scene's background (bgRef), optional cut-outs
 *          C = text only on a mood colour (no art needed)
 *  mood    background colour: ink | dusk | bruise | ember | river | green |
 *          gold | sepia | paper
 *  brk     true = your ↠↠↠ section break is shown above the headline
 *  bg / fg short briefs for the background and foreground illustrations
 *  p       cut-out pieces: [brief, x%, y%, width%, appearsAt(0-1), motion]
 *          motions: fade rise fall grow slideL slideR cross float
 *  tint    [from, to] darkness overlay across the scene (0-1)
 *  flash   moment (0-1) of a lightning flash
 *  reveal  'sentences' = text appears one sentence at a time
 *  counter number that counts up as you scroll
 *  route   a line that draws itself across a map background
 *  anim    the animation idea (shown in ART-BRIEF.md, not on the site)
 *
 * CHECK BEFORE PUBLISHING (your text, copied as written):
 *  - Spelling still varies: Mncengence / Mcengence, Lobengula / Lobhengula.
 *  - c3s14 opens "What do you say I should say?", which reads oddly.
 *  - c3s09 uses a straight apostrophe ("I'll").
 *  - The years on the date marker (1893, 1894) are suggestions: verify them.
 */
window.STORY = {

  CONFIG: {
    title: "Lozikeyi",
    subtitle: "Queen in the city of kings",
    artExt: "png",      // format of pieces and foregrounds (needs transparency). "png" or "webp"
    bgExt: "png",       // format of the full backgrounds. Set to "jpg" for much smaller files (no transparency needed)
    pieceScale: 1.35,   // makes every cut-out piece this many times bigger. 1 = as listed, 1.6 = much bigger
    audioExt: "mp3",    // narration lives in audio/<sceneId>.mp3
    vhPerScene: 120,    // how much scrolling one scene takes
    showPlaceholders: true
  },

  MOODS: {
    ink:    { bg: "#1b1712", tone: "dark"  },
    dusk:   { bg: "#3a2a26", tone: "dark"  },
    bruise: { bg: "#2e2536", tone: "dark"  },
    ember:  { bg: "#5a1d1b", tone: "dark"  },
    river:  { bg: "#1d2f4a", tone: "dark"  },
    green:  { bg: "#1f3a2a", tone: "dark"  },
    gold:   { bg: "#d8b26a", tone: "light" },
    sepia:  { bg: "#d9c7a8", tone: "light" },
    paper:  { bg: "#f1ede4", tone: "light" }
  },

  CHAPTERS: [
    { n: 1, title: "The Fulfillment",                     place: "Lobengula’s homestead", blurb: "A princess is named a witch, and a healer is called to the king." },
    { n: 2, title: "The Queen’s Dance",                   place: "New Bulawayo",          blurb: "A borrowed child, the Maxim guns, and a king who ends at the Kana River." },
    { n: 3, title: "Lozikeyi and the Recovering Nation",  place: "Siganda",               blurb: "A queen rules in silence while the cattle, the princes and the king are taken." }
  ],

  SCENES: [

  /* ============================ CHAPTER 1 ============================ */

  { id: "c1s01", ch: 1, h: "Listen", mood: "ink", art: "B", reveal: "sentences",
    text: [`Listen, and I will tell it as it was told to me.`,
           `Mncengence was a woman of importance. Then unfortunate times befell Lobengula’s kingdom. Rumours floated, and her name was folded small and passed from mouth to mouth in whispers. When it was spoken at all, it wore a second word like a cloak: umthakathi. Witch.`],
    p: [["Her name, folded small: a strip of cloth passed from hand to hand", 70, 40, 22, 0.15, "rise"]],
    anim: "Opens alone on black. Sentences appear one by one; the cloth fades in last." },

  { id: "c1s02", ch: 1, h: "What they said", mood: "ink", art: "C", reveal: "sentences",
    text: [`They said she had reached into the king’s food. They said she scooped up the dust, twisted her mouth around old words, and sent them down his throat to sicken him. That is what they said.`],
    anim: "Text only. Sentences appear one by one; hold on the last line." },

  { id: "c1s03", ch: 1, h: "The girl who noticed", mood: "dusk", art: "A", bgMotion: "pushIn",
    text: [`Now, there was a girl who noticed this. Lozikeyi, an inyanga’s daughter, had been raised in the ways of the gods and the ancestors, but she was not sure whether she believed what she heard.`],
    bg: "Dusk at the mouth of a hut. Lozikeyi seated, listening, unsure what to believe.",
    fg: "Thorn branches framing the left edge",
    anim: "Slow push-in toward her face. This background is reused in scene 8." },

  { id: "c1s04", ch: 1, h: "The Princess Royal", mood: "gold", art: "B",
    text: [`Hear first who Mncengence, the Princess Royal, was.`,
           `She was her brother’s closest and, for most of their lives, most trusted companion. Boisterous, outgoing, full of vitality, she was the sunshine. Everything around her only shone because she stood in it. Lobengula knew this and was proud. He rewarded her with gifts and signs of rank, and on one occasion, with a wagon, a privilege kept only for the noblest of men.`],
    p: [["Mncengence in full sunlight, laughing, one hand raised", 70, 48, 32, 0.1, "rise"],
        ["The wagon, her privilege", 28, 70, 26, 0.35, "slideR"]],
    anim: "Warm light grows. The wagon rolls in from the left." },

  { id: "c1s05", ch: 1, h: "Her reach", mood: "sepia", art: "B",
    text: [`Her reach did not end at the edge of the village. The law of the Ndebele said that the king’s women-kin must remain untouched until the king found his Royal Wife. She took that vow, but it did not stop her. She befriended every Englishman who wandered into her brother’s kingdom and hoped that one day she would form a union with one of them.`],
    p: [["Card: an Englishman’s hat", 66, 26, 20, 0.1, "fall"],
        ["Card: a handshake", 80, 50, 22, 0.3, "fall"],
        ["Card: the wagon", 64, 72, 22, 0.5, "fall"]],
    anim: "Collage: three paper cards drop in at slight angles, like Zendetta’s photo stack." },

  { id: "c1s06", ch: 1, h: "All fingers pointed", mood: "dusk", art: "B",
    text: [`Mcengence was a woman of utmost importance, and she knew it. It was said that she meant to keep ruling beside him until he fathered a son, which meant that as long as Lobhengula had no heir, Mcengence maintained her position. Perhaps this is why all fingers pointed to her when the king struggled to plant his seed.`],
    p: [["A row of pointing hands, outline only, all aimed at one figure", 74, 50, 48, 0.2, "rise"]],
    anim: "The pointing hands rise one after another, all aimed at the left of the screen." },

  { id: "c1s07", ch: 1, h: "What Lozikeyi knew", mood: "dusk", art: "C",
    text: [`But as the daughter of an inyanga, Lozikeyi knew the king was protected and that if the river and plant concoctions did not work, then the ancestors had other plans. However, being just one of many wives, and a healer who had not yet assumed her role, she had no say in how matters would proceed.`],
    anim: "Text only." },

  { id: "c1s08", ch: 1, h: "A woman sang and lamented", mood: "dusk", art: "R", bgRef: "c1s03", bgMotion: "pullOut", tint: [0, 0.3],
    text: [`Somewhere in the distance, a woman sang and lamented. Lozikeyi sat at the mouth of the hut, listening. She had been taught how to master the herbs, the arts of war, and the ways of Mwali and the Zulu spirits since she was small, so that when her time came, she would not be found empty-handed.`,
           `The ancestors had spoken. She had heard them. However, she felt sorrowful at the tragedy that had befallen Mncengence.`],
    anim: "CUSTOM (already built in js/animations.js): the lament spreads across the hills as rings of sound." },

  { id: "c1s09", ch: 1, h: "Makhalima", mood: "dusk", art: "C",
    text: [`A shadow fell across her feet. Lost in thought, she paid it no mind.`,
           `“You look troubled, my queen.” It was Makhalima, her trusted servant.`,
           `“We are all troubled,” she responded solemnly.`,
           `Makhalima wanted to push further, but she stopped herself. However close she believed herself to be to Lozikeyi, her tongue had to stay behind her teeth. Mncengence’s fate had taught her that. Lozikeyi felt the hesitation and answered it with an offering of trust.`],
    anim: "Text only. Optional: a shadow shape slides across the bottom edge on the first line." },

  { id: "c1s10", ch: 1, h: "She held my hand", mood: "paper", art: "B",
    text: [`“I was close to her. When I came to Lobengula’s homestead, young and lost, she was the one who told me not to fear what I was inheriting. She held my hand through that season and carried me from girl to woman.”`,
           `A long silence settled between them, the kind that carries the weight of how things have been and might always be.`],
    p: [["Two hands clasped", 72, 46, 24, 0.15, "rise"]],
    anim: "A quiet beat: one drawing on blank paper." },

  { id: "c1s11", ch: 1, h: "Banished", mood: "paper", art: "B",
    text: [`In the weeks that followed, many saw it, and Lozikeyi saw it most of all: the death, the murder, of her friend had brought nothing. The king’s first wife, his Great Wife, Queen Xwalile, saw her luck change very little. A doctor from England, a pale man with a black bag, said it was malaria that made her struggle to carry a child, while another placed the blame on Lobengula himself. Regardless, Xwalile’s failure to fulfil her purpose as Great Wife meant that she was banished from Bulawayo and sent back to her homeland.`],
    p: [["Queen Xwalile leaving on the road, small and alone", 74, 62, 34, 0.2, "slideL"],
        ["The doctor with his black bag", 60, 36, 18, 0.1, "fade"]],
    anim: "Xwalile walks slowly out of frame as you scroll." },

  { id: "c1s12", ch: 1, h: "What came after", mood: "ember", art: "A", brk: true, bgMotion: "pushIn",
    text: [`Now that it has been so, let me tell you what came after.`,
           `The sun was melting into an ocean of reds, purples, and amber. The umelusi were driving the cattle home to the kraal, and the children were gathering up the last of the day’s frolicking. The royal women went to their evening meal, but Lozikeyi did not go with them. Lozikeyi was preparing to meet the king.`],
    bg: "Sunset over the kraal in reds, purples and amber",
    p: [["Cattle driven home by the umelusi", 30, 74, 44, 0.1, "cross"]],
    anim: "The cattle cross the screen slowly as you scroll." },

  { id: "c1s13", ch: 1, h: "The dress and the apron", mood: "sepia", art: "B",
    text: [`She had not yet spoken to him in any personal manner. She rubbed a thick coat of shea butter on her skin while, in the corner, Makhalima waited with the neck dress and the apron of cow hide.`,
           `“Are you afraid to be alone with him?”`,
           `Makhalima watched her closely. She was a small girl, sixteen at most, with rich copper skin and a quiet curiosity that never quite left her face.`],
    p: [["The beaded neck dress", 62, 40, 28, 0.1, "rise"],
        ["The apron of cow hide", 82, 62, 26, 0.35, "rise"]],
    anim: "Your beadwork moment: the neck dress, then the apron, fade in. Place your physical piece here." },

  { id: "c1s14", ch: 1, h: "Afraid", mood: "dusk", art: "C",
    text: [`‘Afraid.’ Lozikeyi turned the word over. She had never been a woman who feared many things. She descended from kings in Zululand, and from Mpangazitha Hadebe, the inyanga who healed for Mzilikazi. The ancestors had been shaping her for this room since before she could learn to walk. The marriage had been agreed upon by the Dlodlo and Khumalo elders before Lobengula ever won his claim to the throne. The ancestors had cleared the path long before the king arrived at it. And now her ascension to Senior Queen had arrived just as her foremothers and fathers had wanted.`,
           `She shook her head. No. She wasn’t afraid, but she kept Mncengence at the back of her mind.`,
           `“I’m ready.”`],
    anim: "Text only." },

  { id: "c1s15", ch: 1, h: "The king’s sanctuary", mood: "ink", art: "B",
    text: [`Makhalima stepped aside, and Lozikeyi made her way, for the first time, from the inyanga’s secret quarters to the king’s sanctuary. Around her, the spirits of her ancestors manifested as a soft breeze, chaperoning her in the busy dusk.`,
           `There he sat, waiting. He was six foot two and broad, with a belly that pressed forward like a man leading with his appetite, and he put her in mind of an elephant. She knelt and recited his totems.`],
    p: [["Her ancestors as a soft breeze: pale wind-shapes curling around her", 72, 50, 56, 0.15, "fade"]],
    anim: "The wind-shapes drift slowly past as you scroll." },

  { id: "c1s16", ch: 1, h: "I have been waiting for you", mood: "ink", art: "A", bgMotion: "pushIn",
    text: [`“I have been waiting for you,” he said. “I told the elders I would make haste with this meeting.”`,
           `He took his chair. She followed and sat beside him, which was rarely done by the women. This was her own way of making it known that she was coming to him as more than just a wife.`,
           `“I am glad you summoned me,” she said.`],
    bg: "The king’s sanctuary: two chairs, one oil lamp, deep shadow",
    p: [["Lobengula, broad as an elephant, seated", 76, 52, 30, 0.1, "fade"],
        ["Lozikeyi seated beside him", 52, 54, 24, 0.25, "fade"]],
    anim: "Lamp glow breathes slowly. This room is reused for scenes 17, 19 and 21." },

  { id: "c1s17", ch: 1, h: "A great tragedy", mood: "ink", art: "R", bgRef: "c1s16", tint: [0, 0.5],
    text: [`“You know what a great tragedy it has been, this trying to conceive.”`,
           `A dark shadow crossed his face, and for a moment the lamp seemed to shrink from it. “I took the best steps I could, with the advice of izinyanga and the elders. I made great sacrifices.” He paused, seeming to be in conflict with himself.`,
           `“And Mcengence… what was I to believe? I wept to the gods, and the gods did not answer. As for Xwalile, I left her behind in Mzinyathi. She has failed in her role, and I could not bring myself to carry her with me to New Bulawayo. The kingdom needs a new beginning.” His lips were pursed, and his brow furrowed as if he was in deep pain.`],
    anim: "The room darkens as he speaks: the lamp shrinking from his shadow." },

  { id: "c1s18", ch: 1, h: "A thousand crickets", mood: "ink", art: "C",
    text: [`Lozikeyi knew where he was headed. Unexpectedly, she became lightheaded, and her belly was filled with a thousand crickets. She had been groomed for an important role in the kingdom, but she was not sure it would look the way she had envisioned. What if he didn’t care for her expertise and expected a mere replacement for Xwalile? Would she have to bear him children? Would she face the same fate as Mncengence? Would he let her keep her medicines, her herbs, her position as a healer?`,
           `The king looked at her closely, and almost as though he had read her mind, he went on.`,
           `“As the sun labours with the moon to cast light and bring harvest to our plains, so I want you beside me.”`],
    anim: "Text only. Optional: tiny dots swarm and scatter (the crickets) in animations.js." },

  { id: "c1s19", ch: 1, h: "What do you expect of me", mood: "ink", art: "R", bgRef: "c1s16", tint: [0.5, 0.1],
    text: [`She unclenched her jaw. “Then what do you expect of me? Will I not carry and nestle your young?”`,
           `“You will work with me as a healer and as a bond between us and the spirit world. I will heed your counsel in politics and in war.” He paused, and the lamp steadied. “We are moving into a new era. The British boots are kissing the feet of our kraals, and a fear is taking root in the otherwise strong amaNdebele. A woman who advises and heals would help me restore what is normal. I will take you as my wife, because a king needs a wife, and I will treat you as a man. I will not lie with you because that would be a desecration. We will find someone else to carry my heir.”`],
    anim: "The lamp steadies: the darkness lifts again." },

  { id: "c1s20", ch: 1, h: "At your service", mood: "ink", art: "C",
    text: [`The crickets scattered. She was going to be all right.`,
           `“You offer me what I was never raised to refuse,” she said. “I am at your service.”`],
    anim: "Text only, short." },

  { id: "c1s21", ch: 1, h: "The weight of the kingdom", mood: "ink", art: "R", bgRef: "c1s16",
    text: [`Then something strange happened. Lobengula’s great frame folded into the royal chair. His shoulders rolled inward, and his head sank into his hands, as though the weight of the whole kingdom had finally found a place to rest.`,
           `“Is it because I am now one of your men that I see this side of you?” she asked.`,
           `Lozikeyi had never heard of a king who let himself be seen this way. She stretched like a wild cat, loose and unafraid, and settled deeper into the chair beside him.`,
           `He gave her a small nod. “I suppose it is so.”`],
    p: [["The king folded into the chair, head in his hands", 76, 56, 32, 0.2, "rise"]],
    anim: "The king’s figure sinks a few pixels as you scroll." },

  { id: "c1s22", ch: 1, h: "Her name", mood: "green", art: "B",
    text: [`And just like that, Lozikeyi’s name wrote itself into the history of the Ndebele nation.`],
    p: [["Her name written out in beads", 70, 44, 42, 0.2, "fade"]],
    anim: "Chapter ending. The name draws on in beads." },

  /* ============================ CHAPTER 2 ============================ */

  { id: "c2s01", ch: 2, h: "Twelve thousand men", mood: "gold", art: "A", bgMotion: "pushIn",
    text: [`Twelve thousand men stood in a half-moon, and in front of them, what appeared to be an ocean of flowers answered in big and small waves. Twenty queens, led by Lozikeyi, were adorned in beaded aprons, with coils of golden beads encircling their arms, legs, necks, and heads. Their loins and shoulders were respectfully covered in bright cotton cloth, and striking feathers sat over their heads like crowns. They moved in strong, steady movements that held their audience. Lozikeyi waved a long wooden wand, and the other queens followed suit. This went on for hours, and still they kept going, committed to the ceremony of iNxwala. The king’s dance was a testament to Lozikeyi’s induction.`],
    bg: "The iNxwala: twelve thousand men in a half-moon facing twenty queens in beaded aprons and feather crowns",
    fg: "Beaded aprons and golden bead coils swaying in the foreground",
    anim: "Your biggest beadwork scene. Slow push-in; the foreground beads sway sideways." },

  { id: "c2s02", ch: 2, h: "A nation wants an heir", mood: "dusk", art: "C",
    text: [`As Senior Queen, she was expected to bear the king’s offspring. That is what the subjects of the kingdom wanted, and they said so under trees in the valley and quiet ravines, the way people say what they do not mean to be heard saying. However, a great storm was heading for New Bulawayo, and she had been preoccupied with the matters of the sky, which were also the matters of the king’s life.`],
    anim: "Text only. Storm clouds could creep in from the top edge." },

  { id: "c2s03", ch: 2, h: "Hear what she was", mood: "bruise", art: "A", flash: 0.75, tint: [0, 0.3],
    text: [`Hear what she was.`,
           `The Dlodlos were rainmakers, keepers of thunder and of the Red Axe shrine at Dula, where her brother Muntuwani tended the old fire. The elders said that when the lightning walked on the hills, Lozikeyi would step into the yard and cup her hands upward like a woman carrying water to a dry mouth, and the rain would fall. The heavens obeyed her.`],
    bg: "Lozikeyi in the yard, hands cupped upward, lightning walking on the hills",
    p: [["Beads falling like rain", 50, 30, 50, 0.2, "fall"]],
    anim: "Rain as beads, falling slowly; a flash at the cupped hands." },

  { id: "c2s04", ch: 2, h: "His inyanga", mood: "sepia", art: "B",
    text: [`She was now Lobengula’s inyanga, so at night she did not go to him as wives go. She went with roots and bark and powders ground fine as ash, and she washed him in the medicines and spoke the old words over his shoulders until he was sanctified and protected.`],
    p: [["Roots and bark", 62, 36, 20, 0.1, "rise"],
        ["A bowl of powder ground fine as ash", 82, 50, 20, 0.25, "rise"],
        ["Her hands, outline only, washing a shoulder", 66, 70, 26, 0.4, "rise"]],
    anim: "Three small cut-outs arrive one after another." },

  { id: "c2s05", ch: 2, h: "A nation reads bellies", mood: "paper", art: "C",
    text: [`But a nation does not read medicine. A nation reads bellies.`,
           `“A queen with an empty hut,” they whispered. And in that country, a woman who dies without a child dies in disgrace, her name going into the ground with no one to carry it up again.`,
           `The Dlodlos heard, and they did what great families do. They looked for the answer inside the family.`],
    anim: "Text only. Let “A nation reads bellies” stand alone first." },

  { id: "c2s06", ch: 2, h: "Mamfimfi", mood: "dusk", art: "B",
    text: [`Her father’s brother had a daughter named Mamfimfi.`,
           `Lozikeyi sat with her cousin at the back of the hut, where the floor shone from years of spit and river stones. “You know what is wanted,” she said.`,
           `“I know.”`,
           `“I will not take it from you. I will only ask.”`],
    p: [["Two women sitting face to face at the back of a hut", 72, 52, 44, 0.15, "fade"]],
    anim: "One quiet drawing." },

  { id: "c2s07", ch: 2, h: "For the name", mood: "ember", art: "C",
    text: [`Mamfimfi looked at her for a long time. She was not a girl made for being given. “Then it is asked, and I am answering,” she said. “Not for the king. For the name. Ours is a long name, and I would not see it disgraced.”`],
    anim: "Text on deep red. Add a slow firelight flicker in CSS." },

  { id: "c2s08", ch: 2, h: "A child is not a bargain", mood: "paper", art: "C",
    text: [`So Mamfimfi went to the king, and Lozikeyi stayed where she was and waited in anticipation.`,
           `But a child is not a bargain. A child comes when it comes. The Khumalos, who were used to being obeyed by everything on earth, had to wait. A herbalist was sent for, a small woman with a sack of roots, and she gave Mamfimfi bitter tea and sang at her belly in a tongue the court did not know. Lozikeyi could call a storm and strengthen a regiment, but she could not open one woman’s body. For the first time, she understood that her gift had edges.`],
    anim: "Text only." },

  { id: "c2s09", ch: 2, h: "Sidambe", mood: "green", art: "B",
    text: [`Then one evening, from Mamfimfi’s hut came the sound every woman in that country knows, the sound that has no name because it needs none.`,
           `A girl with a voice like the storms was born.`,
           `They named her Sidambe: nature has been stirred. It was a good name because it was true. In law, she belonged to Lozikeyi. Mamfimfi was given a hut close by and a place at the fire, and the nation was told what the nation needed to be told.`,
           `“I owe you,” she told her cousin.`,
           `“Yes,” said Mamfimfi, and closed her eyes. “Remember it.”`],
    p: [["A newborn girl, held", 72, 58, 28, 0.2, "rise"],
        ["A small storm cloud gathered above her", 72, 28, 36, 0.35, "fade"]],
    anim: "The baby fades in, then the little storm cloud above her." },

  { id: "c2s10", ch: 2, h: "The chameleon and the fly", mood: "sepia", art: "B", brk: true,
    text: [`Now the years turned, as years do, and the white men came with their rifles and their papers. They came to dig gold, they said, and then to take themselves away. The king was told that one signature would buy a hundred pounds each moon and a thousand rifles besides, and he signed. Then he learned what he had signed.`,
           `“Did you ever see a chameleon catch a fly?” he asked the missionary who had carried the words across. “England is the chameleon, and I am that fly.”`],
    p: [["A chameleon", 64, 54, 26, 0.15, "fade"],
        ["A small fly", 88, 36, 6, 0.4, "slideL"]],
    anim: "The fly drifts toward the chameleon and is gone at the end." },

  { id: "c2s11", ch: 2, h: "Council nights", mood: "ink", art: "C",
    text: [`Lozikeyi was there for the long council nights. She watched the strangers, fed and measured them, and listened, and she told the king what she thought and what her guides told her. The young soldiers of Imbizo, her own regiment, wanted blood. The old men wanted peace. The doctors made war medicines, and she made them with her own hands, knowing that all the medicine in the world is a shield of ox-hide against a thing that fires without a man behind it.`],
    anim: "Text only." },

  { id: "c2s12", ch: 2, h: "The Maxim guns", mood: "ember", art: "A", date: "1893",
    text: [`The Maxim guns came, and at Gadade, Imbizo went in wearing black ostrich plumes and leopard-skin kilts, against the king’s own warning. The guns rattled, and the plumes fell. Muntuwani was there, they say. He fought, and he came home. Many did not.`],
    bg: "A ridge with Maxim guns; the Imbizo regiment in black plumes and leopard-skin kilts",
    p: [["Black ostrich plumes falling", 50, 24, 60, 0.3, "fall"]],
    anim: "The plumes drift down as the guns rattle. Keep the violence abstract." },

  { id: "c2s13", ch: 2, h: "Bulawayo burns", mood: "sepia", art: "A", date: "1893", place: "Bulawayo to the Tshangani",
    text: [`It was the end of the year before the end came. The rains broke over the Tshangane. Bulawayo burned by the king’s own order, and the cartridges in the fire went off all night like a battle. The king went north in an oxcart, and then on horseback, and the queens followed a longer road in wagons. The oxen died of the tsetse fly. The people carried their own food and water, and many died of a sickness that Sidambe, grown tall, would later call mysterious. The rain that had once been Lozikeyi’s gift now came down on the wrong side of the war.`],
    bg: "Hand-drawn map: Bulawayo in flames, the Tshangani, the Kana River. Reused in c3s05.",
    route: { at: 0.1, pts: [[26, 68, "Bulawayo"], [46, 46, "Tshangani"], [68, 30, "Kana River"]] },
    anim: "The route line draws itself across your map. Move the points to match your drawing." },

  { id: "c2s14", ch: 2, h: "The Kana River", mood: "river", art: "A", bgMotion: "pullOut", place: "The Kana River",
    text: [`At the Kana River, twenty miles beyond the Tshangane, the king stopped.`,
           `He called his senior queen and his daughter by law to him, and he did not speak for a while. The river ran loud behind him.`],
    bg: "The Kana River, loud and wide, with the king at its edge",
    p: [["Lobengula at the river’s edge", 74, 56, 22, 0.2, "fade"]],
    anim: "Slow pull-out. Reused for scenes 15 and 16." },

  { id: "c2s15", ch: 2, h: "Two clay pots", mood: "river", art: "R", bgRef: "c2s14", place: "The Kana River",
    text: [`“You are the only one I have told what I carry,” he said. He gave her two clay pots, so heavy that two men had to set them in her hands, and each was filled with money and gold. “Keep them. Keep this.” He did not say this house or this nation, but she knew that was what he meant.`],
    p: [["Two heavy clay pots", 74, 66, 32, 0.15, "fall"]],
    anim: "The pots descend slowly, with weight. Reused in c3s11." },

  { id: "c2s16", ch: 2, h: "And you?", mood: "river", art: "R", bgRef: "c2s14", tint: [0.1, 0.45], place: "The Kana River",
    text: [`“And you?” said Lozikeyi. He had no answer for her.`],
    anim: "The light dims. A short beat before the three endings." },

  { id: "c2s17", ch: 2, h: "Three endings", mood: "paper", art: "B", date: "1894",
    text: [`Lobengula went to his ancestors through a river portal. Lobengula was pulled into frothy waters by a mermaid. Lobengula traded his crown for a name no one knew. Take whichever you like, for the old ones tell many tales. That is where his story came to an end at the Kana River.`],
    p: [["A figure stepping into a river that opens like a doorway", 62, 28, 22, 0.1, "fade"],
        ["A mermaid pulling a king under the water", 80, 52, 22, 0.35, "fade"],
        ["A crown set down", 62, 74, 20, 0.6, "fade"]],
    anim: "Triptych: the three endings appear one after another." },

  { id: "c2s18", ch: 2, h: "Toward Siganda", mood: "gold", art: "R", bgRef: "c2s14", place: "The road south",
    text: [`The light of the Ndebele nation had gone out. But the Senior Queen, with the Dlodlo power, was still there, and she turned south towards Siganda, where one of her brothers, Mazha, waited.`],
    p: [["Lozikeyi walking south, small, a long road ahead", 78, 64, 30, 0.1, "slideL"]],
    anim: "She walks left as the light warms. Chapter ending." },

  /* ============================ CHAPTER 3 ============================ */

  { id: "c3s01", ch: 3, h: "Ruling in silence", mood: "ink", art: "C",
    text: [`Now sit and hear how Lozikeyi held the nation of the amaNdebele while war made itself comfortable in the foothills.`,
           `She knew the ins and outs of the king’s affairs, and she knew one thing above all else: the British were never to learn that she was a ruler in her husband’s absence, which guaranteed that she would be left alone to strategise without the interference of the British settlers. So, she became a formidable force in silence, and people came to her from near and far for counsel and leadership. That is how loved she was, and how afraid they were for her.`],
    anim: "Text only." },

  { id: "c3s02", ch: 3, h: "A deep gorge", mood: "paper", art: "C",
    text: [`But the nation had been shattered. The war had taken its dead and driven out many of the living. She felt a deep gorge open inside her, the spirit’s kind of sadness, for her king and for her people. At Siganda, she was left with few to attend her: the ever-loyal Makhalima, MaTshuma, the daughter of a captive whom she had made her personal assistant, and her brother.`],
    anim: "Text only. Optional: a thin crack opens across the paper." },

  { id: "c3s03", ch: 3, h: "The large rock", mood: "sepia", art: "A", place: "Siganda",
    text: [`Lozikeyi sat on a large rock, watching her herds go in search of water. She was naturally a large and full woman, and she had lost so much weight that she looked frail. This frightened the people near her. Makhalima and MaTshuma were never far; they sat on the ground beside her.`,
           `“I wish to hear news of Sidojiwe’s whereabouts,” she said to no one in particular.`,
           `“Word was sent out again this morning, my queen,” said MaTshuma. She was a little younger than Makhalima, but she had taken on the managing of Lozikeyi’s affairs, while Makhalima had become the companion of her heart.`],
    bg: "Lozikeyi on a large rock watching her herds; Makhalima and MaTshuma on the ground beside her",
    fg: "Dry grass in the foreground",
    p: [["The herd moving toward water", 30, 76, 40, 0.1, "cross"]],
    anim: "The herd drifts slowly across the far plain. Reused in scene 4." },

  { id: "c3s04", ch: 3, h: "I curse them again", mood: "sepia", art: "R", bgRef: "c3s03", tint: [0, 0.35], place: "Siganda",
    text: [`Lozikeyi sucked her teeth and slashed a line in the sand with the whip she always carried. “When will I hear something useful?” Her voice rose. “What would Lobhengula say if he knew I let his son disappear into the mists of the mountains?”`,
           `“Wherever he is, he will be found,” said Makhalima softly, trying to quiet the anger brewing in her. For as sad as the queen was, she had grown angrier. She had left her home and the king’s ranches and all her possessions behind. Even the dull cloth draped over her frame was a far cry from the bright, patterned linens she once wore.`,
           `“I curse the British, and I curse them again!”`],
    anim: "The scene darkens as her anger rises." },

  { id: "c3s05", ch: 3, h: "Two seasons", mood: "sepia", art: "R", bgRef: "c2s13", brk: true, place: "The Mbembesi",
    text: [`For two seasons after Siganda, she searched for a home that could be hers, and she kept her herds moving. Her cattle led her where her own eyes would not have gone, until they found the river Mbembesi. Along the way, she was advised by Mfulana Khumalo, an inyanga who had served the king, a man who knew the royal cattle, the amambowe, as a herdsman knows his own children.`,
           `He lived at Majiji across the river, and he said, “Here. This is a place the plateau holds up like an open hand.” It was high and healthy, thirty miles northwest of Inyathi and sixty miles from the white men’s new capital. Far enough to be forgotten, and near enough to watch.`],
    route: { at: 0.1, pts: [[34, 62, "Siganda"], [54, 46, "Mbembesi"], [70, 32, "Queen’s Kraal"]] },
    anim: "A second route on the same map. Move the points to match your drawing." },

  { id: "c3s06", ch: 3, h: "Queen’s Kraal", mood: "paper", art: "B", place: "Queen’s Kraal",
    text: [`They called it Queen’s Kraal. KoNkosikazi. The whites would say what they liked; the people said it by its name. And in February, two rainy seasons after the king vanished, the High Commissioner, in his wisdom, gave her title to twelve thousand acres on the Mbembesi, “to serve merely as a residence and grazing ground for the cattle required for domestic use.” Merely, he said. As if a queen could be merely anything.`],
    p: [["The title deed: twelve thousand acres, “merely”", 74, 50, 34, 0.15, "rise"]],
    anim: "Draw a line through “merely” as you scroll (custom text effect)." },

  { id: "c3s07", ch: 3, h: "The cornerstone of wealth", mood: "ink", art: "B",
    text: [`The cattle were a cornerstone of Ndebele society’s wealth, and the white men knew it.`,
           `Even before the king was gone, they had started to take. A patrol here, a patrol there, then riders in every direction, until the settlers said that the right of conquest made every cow in the land the Company’s. They made the izinduna into little officials of the Native Department, men who had once held the nation’s cattle and now were told to carry them to the loot kraals themselves. By the end, the loot committee had counted three hundred and sixty-two thousand heads. And when four women refused to say where their animals were hidden, the tax collectors shot them. Those Brits were cruel, and everyone felt it.`],
    counter: { to: 362000, label: "heads of cattle counted", at: 0.3 },
    p: [["Black cattle standing in a kraal", 74, 66, 60, 0.1, "fade"]],
    anim: "The counter climbs to 362,000 as you scroll." },

  { id: "c3s08", ch: 3, h: "Knobkerrie Eyes", mood: "ember", art: "C",
    text: [`At Inyathi, a young Native Commissioner took up his post. The people called him Knobkerrie Eyes, uMehlwenduku, for the way he looked at them. When the induna Maphungo Mabhena, who was too loyal to his king, was told to give up his cattle, he refused. He was tied to horses and dragged at speed through hilly country. When they stopped, his head had been crushed. The Native Police, who were Ndebele men drilled with Winchesters, grew fat on bullying their elders. They collected taxes at the point of the assegai. And they killed the sacred black cattle in which the king’s ancestors lived. Lozikeyi saw her own young men mentally captured and pulled underneath the white man’s boot.`],
    anim: "Text only. Don’t illustrate the violence; black cattle silhouettes at most." },

  { id: "c3s09", ch: 3, h: "Many faces", mood: "ink", art: "B",
    text: [`I'll tell you! That was the day that Lozikeyi’s anger and temper brewed in a new form.`,
           `Now she was a woman who had to keep many faces. She could not let the white men know what she was, so she gave them the face of a harmless old queen with a ranch and a few cattle and a sad heart. And it nearly worked.`],
    p: [["The harmless old queen’s face", 60, 48, 26, 0.1, "fade"],
        ["Her true face, the Dlodlo power", 84, 48, 26, 0.45, "fade"]],
    anim: "The faces swap: the first fades as the second rises." },

  { id: "c3s10", ch: 3, h: "Colenbrander", mood: "sepia", art: "C",
    text: [`One day, a British settler by the name of Johan Colenbrander found his way to the queen’s ranch. Colenbrander, who had been trusted by the king and paid by Rhodes, was the one white man she had ever found easy to talk to. He could speak her language, and that was exactly why he was dangerous. He said that “the government” had sent him to fetch the king’s treasure.`],
    anim: "Text only." },

  { id: "c3s11", ch: 3, h: "Is that all of it?", mood: "sepia", art: "B",
    text: [`She did not weep. She did not argue. She just watched in disdain as Makhalima carried out two clay pots filled with gold and money, the very pots the king had put in her hands at the Kana River, and set them at the white man’s feet like a woman handing over her own children. Colenbrander lifted them into his vehicle and drove away.`,
           `MaTshuma, watching, asked quietly, “Is that all of it?”`,
           `“Would Lobhengula’s queen put the whole of the king’s trust in one place?” asked Lozikeyi.`],
    p: [["Two clay pots at a stranger’s feet", 74, 64, 34, 0.15, "rise"]],
    anim: "An echo of the Kana River pots. Reuse the same drawing." },

  { id: "c3s12", ch: 3, h: "Seeds taken from a field", mood: "green", art: "B",
    text: [`Lobhengula’s son Sidojiwe eventually found his way back, but they were losing hope for the others. Lozikeyi and her monarchy were still suffering from the loss. In June, the princes Njube, Nguboyenja and Mphezeni were sent to Cape Town to be educated, so Rhodes said.`,
           `As if that wasn’t enough, the British still wanted to cull away any possible strong leaders and men. A nation without its heir is a body without its spine. Lozikeyi, knowing when to pick her battles, let it happen. They were boys, and they were the nation’s rallying points, and they went away like seeds taken from a field. Had the whites known what Lozikeyi truly was, she too would have been similarly dealt with.`],
    p: [["Three seeds lifted from a field", 74, 46, 40, 0.15, "rise"]],
    anim: "The three seeds rise and drift off the page." },

  { id: "c3s13", ch: 3, h: "What is left to take?", mood: "ink", art: "C", reveal: "sentences",
    text: [`They took the cattle, they took the land, they took the king!`,
           `“What is left to take?” Lozikeyi asked herself.`],
    anim: "Each line appears alone. Hold on the last question." },

  { id: "c3s14", ch: 3, h: "The war of the Red Axe", mood: "ember", art: "A", bgMotion: "pushIn",
    text: [`What do you say I should say? I will leave it here for now, but Lozikeyi didn’t go without a fight! This is when we speak of the war of the Red Axe.`,
           `The story of Ndlovukazi Lozikeyi Dlodlo, the formidable, the fierce and the unshakeable, continues.`],
    bg: "A single red axe standing upright against a stormy red sky",
    p: [["The Red Axe, glowing at its edge", 74, 50, 30, 0.2, "rise"]],
    anim: "End card. The axe rises and glows; slow push-in. Consider a “Continue” link to Learn more." }

  ]
};
