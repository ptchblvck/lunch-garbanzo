// variables for dom manipulation

const KNOWLEDGE_HELP_BUTTON = document.querySelector(".knowledge-help");
const KNOWLEDGE_VIDEO_HELP = document.getElementById("knowledge-video-help");

// knowledge link on help page

// imported functions via module type in html

KNOWLEDGE_HELP_BUTTON.onclick = function () {
  console.log("knowledge was found.");
  playKnowledge();
};

function playKnowledge() {
  KNOWLEDGE_VIDEO_HELP.style.visibility = "visible";
  playTheVideo();
  setTimeout(function () {
    KNOWLEDGE_VIDEO_HELP.style.visibility = "hidden";
  }, 1000);
}

function playTheVideo() {
  KNOWLEDGE_VIDEO_HELP.muted = false;
  void KNOWLEDGE_VIDEO_HELP.offsetWidth;
  KNOWLEDGE_VIDEO_HELP.play();
}
