/**
 * Creating the window pop up with the instruction content
 * create variables and assign them to the instruction and Enter game content
 */

const instruction = document.getElementById("instruction-main");
const enterQuiz= document.getElementById("lets-go");
const instructionsBtn = document.getElementById("instructionsBtn");
const closeInstruction = document.getElementsByClassName("exit")[0];

// Instruction Buttons EventListerner
instructionsBtn.addEventListener('click', instructShow);
closeInstruction.addEventListener('click', instructHide);

// Enter Quiz Buttons EventListerner
enterQuiz.addEventListener("click", () => {
    return window.location.assign('./quiz.html');
  });

  // Instruction Functions
function instructShow() {  
    instruction.style.display = "block";
  }

function instructHide() {
    instruction.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == instruction) {
    instruction.style.display = "none";
  }
};