/**
 * doors.js — homepage carousel + "walk through the door" transition.
 * Cycles through STORIES (from story-data.js), recolouring the door and
 * roof trim to match each story's accent, then zooms into the door on
 * click and hands off to story.html.
 */
(() => {
  const hutPage   = document.getElementById("hutPage");
  const hutStage  = document.getElementById("hutStage");
  const door      = document.getElementById("doorButton");
  const overlay   = document.getElementById("doorOverlay");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");
  const figureName  = document.getElementById("figureName");
  const figureBlurb = document.getElementById("figureBlurb");

  const ACCENT_VAR = {
    red:   "var(--accent-red)",
    blue:  "var(--accent-blue)",
    gold:  "var(--accent-gold)",
    green: "var(--accent-green)"
  };

  let index = Number(sessionStorage.getItem("doorIndex")) || 0;
  if (!Number.isInteger(index) || index < 0 || index >= STORIES.length) index = 0;

  function render(){
    const story = STORIES[index];
    hutPage.style.setProperty("--accent", ACCENT_VAR[story.accent] || ACCENT_VAR.red);
    figureName.textContent = story.figure;
    figureBlurb.textContent = story.blurb;
    door.setAttribute("aria-label", `Enter ${story.figure}'s story`);
    sessionStorage.setItem("doorIndex", String(index));
  }

  function step(delta){
    index = (index + delta + STORIES.length) % STORIES.length;
    render();
  }

  prevArrow.addEventListener("click", () => step(-1));
  nextArrow.addEventListener("click", () => step(1));

  function enterDoor(){
    if (hutPage.classList.contains("is-entering")) return;
    const story = STORIES[index];
    hutPage.classList.add("is-entering");
    window.setTimeout(() => {
      window.location.href = `story.html?story=${story.slug}`;
    }, 650);
  }

  door.addEventListener("click", enterDoor);
  door.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " "){
      e.preventDefault();
      enterDoor();
    }
  });

  render();
})();
