/**
 * story-data.js — the whole story, one object per scene.
 *
 * HOW A SCENE WORKS
 *  id      c1s01 = chapter 1, scene 1. Art files are found by this id (see README).
 *  art     A = hero illustration (full background, maybe cut-outs)
 *          B = cut-out pieces on a plain mood colour (the cheap, quiet scenes)
 *          R = reuses another scene's background (bgRef), optional cut-outs
 *          C = text only on a mood colour (no art needed)
 *  mood    background colour: ink | dusk | bruise | ember | river | green |
 *          gold | sepia | paper
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
 * FIX BEFORE PUBLISHING (your text, copied as written):
 *  - c1s10 still contains "[first wife’s name]"
 *  - c1s12 has "while In the corner" (capital I)
 *  - c3s13 opens "Lobhengula’s son News came…" (looks like a heading pasted in)
 *  - c3s14 ends mid-sentence ("…and at the time")
 *  - Spelling varies: Mncengence/Mnengence, Lobengula/Lobhengula,
 *    Xwalile/Xhwalile, Mzinyathi/Mzinyathini — pick one of each.
 *  - Years shown on the date marker (1893) are suggestions — verify them.
 */
window.STORY = {

  CONFIG: {
    title: "Lozikeyi",
    subtitle: "Queen in the city of kings",
    artExt: "webp",     // change to "png" if you export PNGs
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
    { n: 1, title: "The Fulfillment",          place: "Lobengula’s homestead", blurb: "A princess is named a witch, and a girl who counts is called to the king." },
    { n: 2, title: "The Queen’s Dance",        place: "New Bulawayo",          blurb: "Rain, a borrowed child, the Maxim guns, and a king who vanishes at the Kana River." },
    { n: 3, title: "Lozikeyi and the Nation",  place: "Siganda",               blurb: "A queen rules in silence while the cattle, the princes and the king are taken." }
  ],

  SCENES: [

  /* ============================ CHAPTER 1 ============================ */

  { id: "c1s01", ch: 1, h: "Listen", mood: "ink", art: "B", reveal: "sentences",
    text: [`Listen, and I will tell it as it was told to me.`,
           `Three days before the hills began to sing, Mncengence was the king’s sister. Then night came, and her name was folded small and passed from mouth to mouth in whispers. When it was spoken at all, it wore a second word like a cloak: umthakathi. Witch.`],
    p: [["Her name, folded small: a strip of cloth passed from hand to hand", 70, 40, 22, 0.15, "rise"]],
    anim: "Opens alone on black. Sentences appear one by one; the cloth fades in last." },

  { id: "c1s02", ch: 1, h: "What they said", mood: "ink", art: "C", reveal: "sentences",
    text: [`They said she had reached into the king’s food. They said she scooped up the dust, twisted her mouth around old words, and sent them down his throat to sicken him. That is what they said. The dead said nothing, and the dead are not shy.`],
    anim: "Text only. Let the silence after “the dead are not shy” hold." },

  { id: "c1s03", ch: 1, h: "The girl who noticed", mood: "dusk", art: "A", bgMotion: "pushIn",
    text: [`Now, there was a girl who noticed this. Lozikeyi, an inyanga’s daughter, raised in the ways of the gods and the ancestors, was not sure she believed it. Twenty years younger than the princess, and already she had the eyes of one who counts.`],
    bg: "Dusk at the mouth of a hut. Lozikeyi seated, watching, with a counting look in her eyes.",
    fg: "Thorn branches framing the left edge",
    anim: "Slow push-in toward her eyes. This background is reused in scene 7." },

  { id: "c1s04", ch: 1, h: "The Princess Royal", mood: "gold", art: "B",
    text: [`Hear first who the princess was. Mncengence, the Princess Royal. Her brother’s closest companion, and often his voice in the dark when he did not know what to say. Boisterous, outgoing, full of vitality, she was the sunshine, and everything around her only shone because she stood in it. Lobengula knew this and was proud. He rewarded her with gifts and signs of rank, and once with a wagon, a privilege kept only for the noblest of men.`],
    p: [["Mncengence in full sunlight, laughing, one hand raised", 70, 48, 32, 0.1, "rise"],
        ["The wagon, her privilege", 28, 70, 26, 0.35, "slideR"]],
    anim: "Warm light grows. The wagon rolls in from the left." },

  { id: "c1s05", ch: 1, h: "Her reach", mood: "sepia", art: "B",
    text: [`Her reach did not end at the edge of the village. The law of the Ndebele said that the king’s women-kin must remain untouched until the king found his Royal Wife, and she took that vow, and the vow did not stop her. She befriended every Englishman who wandered into her brother’s kingdom. It was even whispered that she meant to keep ruling beside him until he fathered a son.`],
    p: [["Card: an Englishman’s hat", 66, 26, 20, 0.1, "fall"],
        ["Card: a handshake", 80, 50, 22, 0.3, "fall"],
        ["Card: the wagon", 64, 72, 22, 0.5, "fall"]],
    anim: "Collage: three paper cards drop in at slight angles, like Zendetta’s photo stack." },

  { id: "c1s06", ch: 1, h: "An execution has a sound", mood: "ink", art: "A", bgMotion: "pullOut",
    text: [`But here is what Lozikeyi knew, and what the others had not been told: an execution has a sound. It does not end when the breath ends. The hills took that sound and would not give it back, and they have been echoing it since, a warning pressed into stone.`],
    bg: "Night hills in layered ridgelines, like stone faces listening",
    anim: "CUSTOM (already built in js/animations.js): rings of sound spread across the hills and never fade." },

  { id: "c1s07", ch: 1, h: "At the mouth of the hut", mood: "dusk", art: "R", bgRef: "c1s03", bgMotion: "pullOut", tint: [0, 0.4],
    text: [`Somewhere in the distance, a woman sang and lamented. Lozikeyi sat at the mouth of the hut, listening. She had been taught since she was small to master the herbs, the arts of war, and the ways of Mwali and the Zulu spirits, so that when her time came she would not be found empty-handed. That day the sun hung lower than it had in three days, as if something beneath it were pulling. The ancestors had spoken. She had heard them, though she did not say so.`],
    anim: "Same hut-mouth scene as scene 3, getting darker as the sun sinks (the tint does this)." },

  { id: "c1s08", ch: 1, h: "Makhalima", mood: "dusk", art: "C",
    text: [`A shadow fell across her feet. For a breath she was not sure whose it was. Then it spoke, and it was Makhalima, her trusted servant.`,
           `“You look troubled, my queen.”`,
           `“We are all troubled,” she said.`,
           `Makhalima wanted to push further, and stopped herself. However close she believed herself to be to Lozikeyi, her tongue must stay behind her teeth. Mncengence’s fate had taught her that. Lozikeyi felt the hesitation and answered it with an offering of trust.`],
    anim: "Text only. Optional: a shadow shape slides across the bottom edge on the first line." },

  { id: "c1s09", ch: 1, h: "She held my hand", mood: "paper", art: "B",
    text: [`“I was close to her. When I came to Lobengula’s homestead, young and lost, she was the one who told me not to fear what I was inheriting. She held my hand through that season and carried me from girl to woman.”`,
           `A long silence settled between them, the kind that carries the weight of how things have been, and might always be.`],
    p: [["Two hands clasped", 72, 46, 24, 0.15, "rise"]],
    anim: "A quiet beat: one drawing on blank paper." },

  { id: "c1s10", ch: 1, h: "Nothing changed", mood: "paper", art: "C",
    text: [`In the weeks that followed, many saw it, and Lozikeyi saw it most of all: the death, the murder, of her friend had brought nothing. The king’s first wife, [first wife’s name], saw her luck change very little. A doctor from England, a pale man with a black bag, said it was the malaria that made her struggle to carry a child.`],
    anim: "Text only on blank paper." },

  { id: "c1s11", ch: 1, h: "What came after", mood: "ember", art: "A", bgMotion: "pushIn",
    text: [`Now that had been done, let me tell you of what came after.`,
           `The sun was melting into an ocean of reds, purples and amber. The umalusi were driving the cattle home to the kraal, and the children were gathering up the last of the day’s frolicking. The royal women went to their evening meal, but Lozikeyi did not go with them. Lozikeyi was preparing to meet the king.`],
    bg: "Sunset over the kraal in reds, purples and amber",
    p: [["Cattle driven home by the umalusi", 30, 74, 44, 0.1, "cross"]],
    anim: "The cattle cross the screen slowly as you scroll." },

  { id: "c1s12", ch: 1, h: "The dress and the apron", mood: "sepia", art: "B",
    text: [`She had not yet been alone with him, and she knew that something large was turning over in the dark, the way a great animal turns in its sleep. She rubbed a thick coat of shea on her skin while In the corner, Makhalima waited with the neck dress and the apron of beef hide.`,
           `“Are you afraid to be alone with him?”`,
           `Makhalima watched her closely. She was a small girl, sixteen at most, with rich copper skin and a quiet curiosity that never quite left her face.`],
    p: [["The beaded neck dress", 62, 40, 28, 0.1, "rise"],
        ["The apron of beef hide", 82, 62, 26, 0.35, "rise"]],
    anim: "Your beadwork moment: the neck dress, then the apron, fade in. Place your physical piece here." },

  { id: "c1s13", ch: 1, h: "Afraid", mood: "dusk", art: "B",
    text: [`Afraid. Lozikeyi turned the word over. She had never been a woman who feared many things. She was descended from kings in Zululand, and from Mpangazitha Hadebe, the inyanga who healed for Mzilikazi, and the ancestors had been shaping her for this room since before she could walk. The marriage had been agreed by the Dlodlo and Khumalo elders before Lobengula ever won his claim to the throne. The ancestors had cleared the path long before the king arrived at it.`,
           `She shook her head. No.`,
           `“I’m ready.”`],
    p: [["Faint ancestors standing behind her, ghost-pale", 74, 50, 44, 0.2, "fade"]],
    anim: "The ancestors fade in behind the text as she says “No.”" },

  { id: "c1s14", ch: 1, h: "The king’s sanctuary", mood: "ink", art: "C",
    text: [`Makhalima stepped aside, and Lozikeyi walked, for the first time in a long time, from the inyanga’s secret quarters to the king’s sanctuary. The air seemed to lean in as she passed, and she knew whose breath that was.`,
           `There he sat, waiting. He was six foot two, broad, with a belly that pressed forward like a man leading with his appetite, and he put her in mind of a bull. She knelt and recited his totem, and the words came out of her mouth warm, as if they had been waiting there.`],
    anim: "Text only. Optional: slow lamp-glow gradient." },

  { id: "c1s15", ch: 1, h: "I have been waiting for you", mood: "ink", art: "A", bgMotion: "pushIn",
    text: [`“I have been waiting for you,” he said. “I told the elders I would make haste with this meeting.”`,
           `He took his chair. She followed and sat beside him, which women rarely did.`,
           `“I am glad you summoned me,” she said.`],
    bg: "The king’s sanctuary: two chairs, one oil lamp, deep shadow",
    p: [["Lobengula, broad as a bull, seated", 76, 52, 30, 0.1, "fade"],
        ["Lozikeyi seated beside him", 52, 54, 24, 0.25, "fade"]],
    anim: "Lamp glow breathes slowly. This room is reused for scenes 16, 18 and 20." },

  { id: "c1s16", ch: 1, h: "A great tragedy", mood: "ink", art: "R", bgRef: "c1s15", tint: [0, 0.5],
    text: [`“You know what a great tragedy it has been, this trying to conceive.” A dark shadow crossed his face, and for a moment the lamp seemed to shrink from it. “I took the best steps I could, with the advice of the izinyanga and the elders. I made sacrifices. I wept to the gods, and the gods did not answer. Xwalile I have left behind in Mzinyathi. She has failed in her role, and I could not bring myself to carry her with me to New Bulawayo. The kingdom needs a new beginning.”`],
    anim: "The room darkens as he speaks: the lamp shrinking from his shadow." },

  { id: "c1s17", ch: 1, h: "A thousand crickets", mood: "ink", art: "C",
    text: [`Lozikeyi knew where he was heading. Her head went light, and her belly filled with a thousand crickets, each one singing a different warning. She had been groomed for an important role in the kingdom, but she was not sure this was the role she wanted. Would she have to bear him children? Would he let her keep her medicines, her herbs, her work as a healer? The thought sank a quiet sadness into the pit of her belly, and there, very faintly, something answered it.`,
           `The king looked at her closely, and almost as though he had read her mind, he went on.`,
           `“As the sun labours with the moon to cast light and bring harvest to our plains, so I want you beside me.”`],
    anim: "Text only. Optional: tiny dots swarm and scatter (the crickets) in animations.js." },

  { id: "c1s18", ch: 1, h: "What do you expect of me", mood: "ink", art: "R", bgRef: "c1s15", tint: [0.5, 0.1],
    text: [`Relief moved through her like water. “Then what do you expect of me, if I will not carry and nestle your young?”`,
           `“You will work with me. As a healer, and as a knot between us and the spirit world. I will heed your counsel in politics and in war.” He paused, and the lamp steadied. “We are moving into a new era. The British boots are kissing the feet of our kraals, and a fear is taking root in the otherwise strong amaNdebele. A woman who advises and heals would help me restore what is normal. I will take you as my wife, because a king needs a wife, and I will treat you as a man.”`],
    anim: "The lamp steadies: the darkness lifts again." },

  { id: "c1s19", ch: 1, h: "At your service", mood: "ink", art: "C",
    text: [`The crickets scattered. She was going to be all right.`,
           `“You offer me what I was never raised to refuse,” she said. “I am at your service.”`],
    anim: "Text only, short." },

  { id: "c1s20", ch: 1, h: "The weight of the kingdom", mood: "ink", art: "R", bgRef: "c1s15",
    text: [`Then something strange happened. Lobengula’s great frame folded into the royal chair. His shoulders rolled inward, and his head sank into his hands, as though the weight of the whole kingdom had finally found a place to rest.`,
           `“Is it because I am now one of your men that I see this side of you?” she asked.`,
           `Lozikeyi had never heard of a king who let himself be seen this way. She stretched like a wild cat, loose and unafraid, and settled deeper into the chair beside him.`,
           `He gave her a small nod. “I suppose it is so.”`],
    p: [["The king folded into the chair, head in his hands", 76, 56, 32, 0.2, "rise"]],
    anim: "The king’s figure sinks a few pixels as you scroll." },

  { id: "c1s21", ch: 1, h: "Her name", mood: "green", art: "B",
    text: [`And just like that, Lozikeyi’s name wrote itself into the history of the Ndebele nation. The thing in her belly, which had been listening, went quiet, the way the dead do when they are satisfied. Or when they are only waiting.`],
    p: [["Her name written out in beads", 70, 44, 42, 0.2, "fade"]],
    anim: "Chapter ending. The name draws on in beads, then a faint glow." },

  /* ============================ CHAPTER 2 ============================ */

  { id: "c2s01", ch: 2, h: "Twelve thousand men", mood: "gold", art: "A", bgMotion: "pushIn",
    text: [`Twelve thousand men stood in a half moon, and in front of them what appeared to be an ocean of flowers answered in big and small waves. Twenty queens, led by Lozikeyi, were adorned in beaded aprons, with coils of golden beads encircling their arms, legs, necks and heads. Their loins and shoulders were respectfully covered in bright cotton cloth, and striking feathers sat over their heads like crowns. They moved in steady, strong movements that held their audience. Lozikeyi waved a long wooden wand, and the other queens followed suit. This went on for hours, and still they kept going, committed to the ceremony of iNxwala. The king’s dance was a testament to Lozikeyi’s induction.`],
    bg: "The iNxwala: twelve thousand men in a half-moon facing twenty queens in beaded aprons and feather crowns",
    fg: "Beaded aprons and golden bead coils swaying in the foreground",
    anim: "Your biggest beadwork scene. Slow push-in; the foreground beads sway sideways." },

  { id: "c2s02", ch: 2, h: "A nation wants an heir", mood: "dusk", art: "C",
    text: [`As senior queen she was expected to bear the king’s offspring. That is what the subjects of the kingdom wanted, and they said so under trees in the valley and quiet ravines, softly, the way people say what they do not mean to be heard saying. But she had been preoccupied. A great storm was heading for New Bulawayo, and she had been preoccupied with the matters of the sky, which, in that house, were also the matters of the king’s life.`],
    anim: "Text only. Storm clouds could creep in from the top edge." },

  { id: "c2s03", ch: 2, h: "Hear what she was", mood: "bruise", art: "A", flash: 0.75,
    text: [`Hear what she was. The Dlodlos were rainmakers, keepers of thunder and of the Red Axe shrine at Dula, where her brother Muntuwani tended the old fire. The elders say that when the lightning walked on the hills, Lozikeyi would step into the yard and cup her hands upward like a woman carrying water to a dry mouth, and the rain would fall. Ask whether the sky obeyed her, or whether it simply recognised her. The elders do not say.`],
    bg: "Lozikeyi in the yard, hands cupped upward, lightning walking on the hills",
    p: [["Beads falling like rain", 50, 30, 50, 0.2, "fall"]],
    anim: "Rain as beads, falling slowly; a flash at the cupped hands. Reused in c3s17." },

  { id: "c2s04", ch: 2, h: "His inyanga", mood: "sepia", art: "B",
    text: [`She had come to Lobhengula as his inyanga before she ever came as his wife. At night she did not go to him as wives go. She went with roots and bark and powders ground fine as ash, and she washed him in the medicines and spoke the old words over his shoulders, until he was sanctified and protected. A woman who handles the war medicines must be untouched. Regard her as part of yourself, the elders told him, and he did, in his careful way.`],
    p: [["Roots and bark", 62, 36, 20, 0.1, "rise"],
        ["A bowl of powder ground fine as ash", 82, 50, 20, 0.25, "rise"],
        ["Her hands, outline only, washing a shoulder", 66, 70, 26, 0.4, "rise"]],
    anim: "Three small cut-outs arrive one after another." },

  { id: "c2s05", ch: 2, h: "A nation reads bellies", mood: "paper", art: "C",
    text: [`But a nation does not read medicine. A nation reads bellies.`,
           `A queen with an empty hut, they whispered. And in that country a woman who dies without a child dies in disgrace, her name going into the ground with no one to carry it up again.`,
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
    text: [`Mamfimfi looked at her for a long time. She was not a girl made for being given. “Then it is asked, and I am answering,” she said. “Not for the king. For the name. Ours is a long name, and I would not see it end in a ditch.”`,
           `Nobody wrote that down, but the fire remembered, and the fire told me.`],
    anim: "Text on deep red. Add a slow firelight flicker in CSS." },

  { id: "c2s08", ch: 2, h: "A child is not a bargain", mood: "paper", art: "C",
    text: [`So Mamfimfi went to the king, and Lozikeyi stayed where she was and did not weep.`,
           `But a child is not a bargain. A child comes when it comes. The Khumalos, who were used to being obeyed by everything on earth, had to wait. A Nyai herbalist was sent for, a small woman with a sack of roots, and she gave Mamfimfi bitter teas and sang at her belly in a tongue the court did not know. Lozikeyi could call a storm and strengthen a regiment, but she could not open one woman’s body. For the first time she understood that her gift had edges.`],
    anim: "Text only." },

  { id: "c2s09", ch: 2, h: "The colour of a bruise", mood: "bruise", art: "A", tint: [0, 0.4],
    text: [`Then one evening the sky went the colour of a bruise. The cattle lowed and would not go in. The air tasted of iron, and the cooking smoke lay down flat as if it were afraid. From Mamfimfi’s hut came the sound every woman in that country knows, the sound that has no name because it needs none.`],
    bg: "The kraal under a bruise-coloured sky; cattle refusing to go in",
    p: [["Cooking smoke lying flat along the ground", 50, 74, 60, 0.2, "fade"]],
    anim: "The sky darkens as you scroll (the tint). Background reused in scene 10." },

  { id: "c2s10", ch: 2, h: "Now", mood: "bruise", art: "R", bgRef: "c2s09", tint: [0.4, 0.55], flash: 0.6,
    text: [`Lozikeyi walked into the yard. She did not decide to. She lifted her arms and cupped her hands upward, and the quiet thing that had stirred in her the night the king named her his counsellor stirred again. It was older than the princess, older than the king’s house. It spoke in the voice that lives behind thunder, and it said only: Now.`],
    p: [["Her cupped hands, lit from within", 72, 60, 28, 0.2, "rise"]],
    anim: "Lightning flash on the word “Now.”" },

  { id: "c2s11", ch: 2, h: "Sidambe", mood: "green", art: "B",
    text: [`And the rain came, the way a held breath comes out. And through the roaring came a thin, furious cry.`,
           `A girl, with a voice like the storm itself.`,
           `They named her Sidambe, nature has been stirred. It was a good name because it was true. In law she belonged to Lozikeyi, Mamfimfi was given a hut close by and a place at the fire, and the nation was told what the nation needed to be told. Lozikeyi held the child that night with the rain still in her hair.`],
    p: [["Beads falling like rain", 70, 22, 50, 0.05, "fall"],
        ["A newborn girl, held", 72, 58, 28, 0.25, "rise"]],
    anim: "Rain beads first, then the baby fades in." },

  { id: "c2s12", ch: 2, h: "Remember it", mood: "paper", art: "C",
    text: [`“I owe you,” she told her cousin.`,
           `“Yes,” said Mamfimfi, and closed her eyes. “Remember it.”`,
           `She remembered.`],
    anim: "Text only, short." },

  { id: "c2s13", ch: 2, h: "The chameleon and the fly", mood: "sepia", art: "B",
    text: [`Now the years turned, as years do, and the white men came with their rifles and their papers. They came to dig gold, they said, and then to take themselves away. The king was told that one signature would buy a hundred pounds each moon and a thousand rifles besides, and he signed. Then he learned what he had signed. “Did you ever see a chameleon catch a fly?” he asked the missionary who had carried the words across. “England is the chameleon, and I am that fly.”`],
    p: [["A chameleon", 64, 54, 26, 0.15, "fade"],
        ["A small fly", 88, 36, 6, 0.4, "slideL"]],
    anim: "The fly drifts toward the chameleon and is gone at the end." },

  { id: "c2s14", ch: 2, h: "Council nights", mood: "ink", art: "C",
    text: [`Lozikeyi was there for the long council nights. She watched the strangers, fed and measured them, and listened, and she told the king what she heard. The young soldiers of Imbizo, her own regiment, wanted blood. The old men wanted peace. The doctors made war medicines and she made them with her own hands, knowing that all the medicine in the world is a shield of ox-hide against a thing that fires without a man behind it.`],
    anim: "Text only." },

  { id: "c2s15", ch: 2, h: "The Maxim guns", mood: "ember", art: "A", date: "1893",
    text: [`For the Maxim guns came. At Gadade, Imbizo went in, the flower of the army, in black ostrich plumes and leopard-skin kilts, against the king’s own warning. The guns spoke, and the plumes fell. Muntuwani was there, they say, and he fought, and he came home. Many did not.`],
    bg: "A ridge with Maxim guns; the Imbizo regiment in black plumes and leopard-skin kilts",
    p: [["Black ostrich plumes falling", 50, 24, 60, 0.3, "fall"]],
    anim: "The plumes drift down as the guns speak. Keep the violence abstract." },

  { id: "c2s16", ch: 2, h: "Bulawayo burns", mood: "sepia", art: "A", date: "1893", place: "Bulawayo to the Tshangani",
    text: [`It was the end of the year before the end came. The rains broke over the Tshangane. Bulawayo burned by the king’s own order, and the cartridges in the fire went off all night like a battle. The king went north in an ox-cart, and then on horseback, and the queens followed by a longer road in the waggons. The oxen died of the tsetse. The people carried their own food and water, and many died of a sickness that Sidambe, grown tall, would later call mysterious. The rain that had once been Lozikeyi’s gift now came down on the wrong side of the war.`],
    bg: "Hand-drawn map: Bulawayo in flames, the Tshangani, the Kana River. Reused in c3s06.",
    route: { at: 0.1, pts: [[26, 68, "Bulawayo"], [46, 46, "Tshangani"], [68, 30, "Kana River"]] },
    anim: "The route line draws itself across your map. Move the points to match your drawing." },

  { id: "c2s17", ch: 2, h: "The Kana River", mood: "river", art: "A", bgMotion: "pullOut", place: "The Kana River",
    text: [`At the Kana River, twenty miles beyond the Tshangane, the king stopped.`,
           `He called his senior queen to him, and his daughter by law, and he did not speak for a while. The Babambeni stood at a distance, too few, and everyone knew it. The river ran loud behind him.`],
    bg: "The Kana River, loud and wide; a small group of Babambeni far back",
    p: [["Lobengula at the river’s edge", 74, 56, 22, 0.2, "fade"]],
    anim: "Slow pull-out. Reused for scenes 18, 19 and 21." },

  { id: "c2s18", ch: 2, h: "Two clay pots", mood: "river", art: "R", bgRef: "c2s17", place: "The Kana River",
    text: [`“You are the only one I have told what I carry,” he said. He gave her two clay pots, so heavy that two men had to set them in her hands, and each was filled with money. “Keep them. Keep this.” He did not say this house or this nation, but she heard it.`],
    p: [["Two heavy clay pots", 74, 66, 32, 0.15, "fall"]],
    anim: "The pots descend slowly, with weight. Reused in c3s12." },

  { id: "c2s19", ch: 2, h: "And you?", mood: "river", art: "R", bgRef: "c2s17", tint: [0.1, 0.45], place: "The Kana River",
    text: [`“And you?” said Lozikeyi.`,
           `He looked north. There was nothing to see but rain-dark hills and the long grass bending. Behind her, from somewhere beneath the stone, she felt the old thing turn over once more, as a great animal does when the weather changes. It did not say Now. It said nothing at all.`],
    anim: "The light dims as he looks north." },

  { id: "c2s20", ch: 2, h: "No king by morning", mood: "sepia", art: "B", date: "1894",
    text: [`Then the king rode away. He rode toward the hills, and by morning there was no king. Some say he drank poison and went into a cave. Some say a friend died in his place, and two heroes died, and the king went on. And some say, and the old people say it still, that a king is not dead until the enemy has taken him, and nobody took him. They sang it under the white men’s rule, though it was forbidden: how the world turned over, how the nation was broken, how our king simply vanished.`],
    p: [["Card: a cave and a cup", 62, 28, 22, 0.1, "fall"],
        ["Card: a friend in the king’s place", 80, 50, 22, 0.3, "fall"],
        ["Card: the enemy never took him", 62, 72, 22, 0.5, "fall"]],
    anim: "Collage: three versions of the king’s end, three cards." },

  { id: "c2s21", ch: 2, h: "Toward Siganda", mood: "gold", art: "R", bgRef: "c2s17", place: "The road south",
    text: [`Lozikeyi stood at the Kana with her hands full of clay. The light of the Ndebele nation had gone out. But the senior queen, with the Dlodlo power, was still there, and she turned south toward Siganda, where her brother Mazha waited, with the cattle and the men who would guard her, the pots on the waggon behind, and the girl at her side with a voice like the storm.`],
    p: [["A waggon on the road south, a girl walking beside it", 78, 64, 36, 0.1, "slideL"]],
    anim: "The waggon drifts left as the light warms." },

  /* ============================ CHAPTER 3 ============================ */

  { id: "c3s01", ch: 3, h: "Three endings", mood: "paper", art: "B",
    text: [`Lobhengula rode away on a horse. Lobhengula was pulled into frothy waters by a mermaid. Lobhengula traded his crown for a name no one knew. Take whichever you like, for the old ones tell all three. That is where his story came to an end at the Kana River.`,
           `Now sit and hear how Lozikeyi held the nation of the amaNdebele while war made itself comfortable in the foothills.`],
    p: [["A rider on a horse", 56, 30, 20, 0.1, "fade"],
        ["A figure drawn into the water", 76, 52, 20, 0.35, "fade"],
        ["A crown set down", 56, 74, 20, 0.6, "fade"]],
    anim: "Triptych: the three endings appear one after another." },

  { id: "c3s02", ch: 3, h: "Ruling in silence", mood: "ink", art: "C",
    text: [`She knew the ins and outs of the king’s affairs, and she knew one thing above the rest: the British must never learn she was ruling in her husband’s absence, this guaranteed that she’d be left alone. So she became a formidable force in silence, and people came to her from near and far for counsel and leadership. That is how loved she was, and how afraid they were for her.`],
    anim: "Text only." },

  { id: "c3s03", ch: 3, h: "A deep gorge", mood: "paper", art: "C",
    text: [`But the nation had been shattered. The war had taken its dead and driven out many of the living. She felt a deep gorge open inside her, the spirit’s kind of sadness, for her king and for her people. She was left with few to attend her: the ever loyal Makhalima, and Matshuma, the daughter of a captive, whom she had made her personal assistant. They settled for a while at Siganda.`],
    anim: "Text only. Optional: a thin crack opens across the paper." },

  { id: "c3s04", ch: 3, h: "The large rock", mood: "sepia", art: "A", place: "Siganda",
    text: [`Lozikeyi sat on a large rock, watching her herds go in search of water. She was naturally a large and full woman, and she had lost so much weight that she looked frail, and this frightened the people near her. So Makhalima and Matshuma were never far, and sat on the ground beside her.`,
           `“I wish to hear news of Sidojiwe’s whereabouts,” she said, to no one in particular.`,
           `“Word was sent out again this morning, my queen,” said Matshuma. She was a little younger than Makhalima, but she had taken the managing of Lozikeyi’s affairs, while Makhalima had become the companion of her heart.`],
    bg: "Lozikeyi on a large rock watching her herds; Makhalima and Matshuma on the ground beside her",
    fg: "Dry grass in the foreground",
    p: [["The herd moving toward water", 30, 76, 40, 0.1, "cross"]],
    anim: "The herd drifts slowly across the far plain. Reused in scene 5." },

  { id: "c3s05", ch: 3, h: "I curse them again", mood: "sepia", art: "R", bgRef: "c3s04", tint: [0, 0.35], place: "Siganda",
    text: [`Lozikeyi sucked her teeth and slashed a line in the sand with the whip she always carried. “When will I hear something useful?” Her voice rose. “What would Lobhengula say if he knew I let his son disappear into the mists of the mountains?”`,
           `“Wherever he is, he will be found,” said Makhalima softly, trying to quiet the anger brewing in her. For as sad as the queen was, she had grown angrier. She had left her home and the king’s ranches and all her possessions behind. Even the dull cloth draped over her frame was a far cry from the bright, patterned linens she once wore.`,
           `“I curse the British, and I curse them again!”`],
    anim: "The scene darkens as her anger rises." },

  { id: "c3s06", ch: 3, h: "Two seasons", mood: "sepia", art: "R", bgRef: "c2s16", place: "The Mbembesi",
    text: [`For two seasons she searched for a home that could be hers, and she kept her herds moving, and her cattle led her where her own eyes would not have gone, until they found the river Mbembesi. Along the way she was advised by Mfulana Khumalo, an inyanga who had served the king, a man who knew the royal cattle, the amambowe, as a herdsman knows his own children. He lived at Majiji across the river, and he said: Here. This is a place the plateau holds up like an open hand. It was high and healthy, thirty miles northwest of Inyathi and sixty miles from the white men’s new capital. Far enough to be forgotten, and near enough to watch.`],
    route: { at: 0.1, pts: [[34, 62, "Siganda"], [54, 46, "Mbembesi"], [70, 32, "Queen’s Kraal"]] },
    anim: "A second route on the same map. Move the points to match your drawing." },

  { id: "c3s07", ch: 3, h: "Queen’s Kraal", mood: "paper", art: "B", place: "Queen’s Kraal",
    text: [`They called it Queen’s Kraal. KoNkosikazi. The whites would say what they liked; the people said it by its name. And in February, two rainy seasons after the king vanished, the High Commissioner in his wisdom gave her title to twelve thousand acres on the Mbembesi, “to serve merely as a residence and grazing ground for the cattle required for domestic use.” Merely, he said. As if a queen could be merely anything.`],
    p: [["The title deed: twelve thousand acres, “merely”", 74, 50, 34, 0.15, "rise"]],
    anim: "Draw a line through “merely” as you scroll (custom text effect)." },

  { id: "c3s08", ch: 3, h: "What the cattle meant", mood: "ink", art: "B",
    text: [`Now hear what the cattle meant to the people. A herd is not meat. It is a family’s ancestors standing in the kraal. And the white men knew it.`,
           `Even before the king was gone they had started to take. A patrol here, a patrol there, then riders in every direction, until the settlers said that the right of conquest made every cow in the land the Company’s. They made the izinduna into little officials of the Native Department, men who had once held the nation’s cattle and now were told to carry them to the loot kraals themselves. By the end the loot committee had counted three hundred and sixty-two thousand head. And when four women refused to say where their animals were hidden, the tax-collectors shot them.`],
    counter: { to: 362000, label: "head of cattle counted", at: 0.3 },
    p: [["Black cattle standing in a kraal, the ancestors", 74, 66, 60, 0.1, "fade"]],
    anim: "The counter climbs to 362,000 as you scroll." },

  { id: "c3s09", ch: 3, h: "Knobkerry Eyes", mood: "ember", art: "C",
    text: [`At Inyathi a young Native Commissioner took up his post. The people called him Knobkerry Eyes, uMehlwenduku, for the way he looked at them. When the induna Maphungo Mabhena, who was too loyal to his king to give up his cattle, refused him, he was tied to horses and dragged fast through hilly country, and when they stopped, his head had been crushed. The Native Police, who were Ndebele men drilled with Winchesters, grew fat on bullying their elders. They tweaked the beards of chiefs. They collected taxes at the point of the assegai. And they killed the sacred black cattle in which the king’s ancestors lived.`],
    anim: "Text only. Don’t illustrate the violence; black cattle silhouettes at most." },

  { id: "c3s10", ch: 3, h: "Many faces", mood: "ink", art: "B",
    text: [`I tell you! That was the day that Lozikeyi’s anger and temper brewed in new form.`,
           `Now she was a woman who had to keep many faces. She could not let the white men know what she was, so she gave them the face of a harmless old queen with a ranch and a few cattle and a sad heart. And it nearly worked.`],
    p: [["The harmless old queen’s face", 60, 48, 26, 0.1, "fade"],
        ["Her true face, the Dlodlo power", 84, 48, 26, 0.45, "fade"]],
    anim: "The faces swap: the first fades as the second rises." },

  { id: "c3s11", ch: 3, h: "Colenbrander", mood: "sepia", art: "C",
    text: [`One day a British settler by the name of Johan Colenbrander found their way to the queens ranch. Colenbrander, who had been trusted by the king and paid by Rhodes, was the one white man she had ever found it easy to talk to, because he could speak her language, and that was exactly why he was dangerous. He said that “the government” had sent him to fetch the king’s treasure.`],
    anim: "Text only." },

  { id: "c3s12", ch: 3, h: "Is that all of it?", mood: "sepia", art: "B",
    text: [`She did not weep. She did not argue. She had Makhalima carry out two clay pots, filled with money, the very pots the king had put in her hands at the Kana River, and she set them at the white man’s feet like a woman handing over her own children. Colenbrander lifted them into his vehicle and drove away.`,
           `Matshuma, watching, asked quietly, “Is that all of it?”`,
           `“Would Lobhengula’s queen put the whole of the king’s trust in one place?” said Lozikeyi.`],
    p: [["Two clay pots at a stranger’s feet", 74, 64, 34, 0.15, "rise"]],
    anim: "An echo of the Kana River pots. Reuse the same drawing." },

  { id: "c3s13", ch: 3, h: "News from the north", mood: "paper", art: "C",
    text: [`Lobhengula’s son News came from the north, in whispers, from traders and runaways and the kind of men who say nothing and are believed. A king had come to the land of Mphezeni, in the country of Zambia, the Angoni chief whose people had left Zululand at the same time as Mzilikazi’s. Some said it was Lobhengula himself. Some said he had come with a queen of the Nyayi, MaDumani. Some said he lived a few months, and some said a few years.`],
    anim: "Text only. (See the FIX note at the top of this file.)" },

  { id: "c3s14", ch: 3, h: "Cattle for a visitor", mood: "paper", art: "C",
    text: [`When visitors came from Zambia, Lozikeyi slaughtered cattle. The old ones said the king had been seen on the other side of the great water, and that there were children who were named for what he had done and at the time`],
    anim: "Text only. This passage ends mid-sentence in your draft." },

  { id: "c3s15", ch: 3, h: "Seeds taken from a field", mood: "green", art: "B",
    text: [`In June the princes Njube, Nguboyenja and Mphezeni were sent to Cape Town, to be educated, so Rhodes said. They were boys, and they were the nation’s rallying points, and they went away like seeds taken from a field. A nation without its heir is a body without its spine. Had the whites known what Lozikeyi truly was, she too would have been put on that road.`],
    p: [["Three seeds lifted from a field", 74, 46, 40, 0.15, "rise"]],
    anim: "The three seeds rise and drift off the page." },

  { id: "c3s16", ch: 3, h: "What is left to take?", mood: "ink", art: "C", reveal: "sentences",
    text: [`They have taken the land, it said. They have taken the cattle. They have taken the king. They have taken the dead’s black cattle from the kraals.`,
           `What is left to take?`],
    anim: "Each “They have taken…” line appears alone. Hold on the last question." },

  { id: "c3s17", ch: 3, h: "Call them", mood: "bruise", art: "R", bgRef: "c2s03", tint: [0.2, 0.5], flash: 0.5,
    text: [`And then, in a voice that was not for rain at all, but for men, and for war, and for the long inconclusive thing that the white men had called a victory and the Ndebele had never called an ending:`,
           `Now, daughter. Call them.`],
    anim: "The storm voice returns. Flash on “Call them.”" },

  { id: "c3s18", ch: 3, h: "The hills leaned in", mood: "ink", art: "A", bgMotion: "pushIn",
    text: [`Lozikeyi lowered her hands. They were dry.`,
           `Behind her, in the dark, the rest of her household slept, and her cattle shifted by the river, and her daughter lay in her new husband’s hut with her whole life ahead of her. Lozikeyi, who had been a quiet regent for two long years, turned and looked north and south and west at the hills. And the hills, which hear everything, leaned in.`],
    bg: "The hills leaning in; a small dry-handed Lozikeyi in front; her household asleep; cattle by the river",
    anim: "CUSTOM (already built): the sound rings from chapter 1 return, played in reverse." }

  ]
};
