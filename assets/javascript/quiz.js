// Assign the IDS and CLASS to variables
let timer = document.querySelector(".timer");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 21;
let countdown;

/**
 * Add quiz Arrays
 * this array contains the questions of the quiz with 4 options and correct answer
 * this will be initiated to run randomly in the quiz
 */
const quizArray = [{
    id: "0",
    question: "Where in the Bible is the Book of the 1st Kings?",
    options: ["Old Testament", "New Testament", "Not in the Bible", "Both New and Old"],
    correct: "Old Testament",
  },
  {
    id: "1",
    question: "In what city was Jesus born?",
    options: ["Nazareth", "Bethleham", "Egypt", "Jericho"],
    correct: "Bethleham",
  },
  {
    id: "2",
    question: "How many books are in the New Testament?",
    options: ["66", "33", "27", "56"],
    correct: "27",
  },
  {
    id: "3",
    question: "Who were the first apostles called to follow Jesus?",
    options: ["John the Baptist	", "Simon", "Judas", "James"],
    correct: "Simon",
  },
  {
    id: "4",
    question: "How many people did Jesus feed with five loaves of bread and two fish?",
    options: ["200", "500", "5000", "400"],
    correct: "5000",
  },

  {
    id: "5",
    question: "Matthew was a......when He met Jesus.",
    options: ["Fisherman", "Tax Collector", "Lawyer", "Apostle"],
    correct: "Tax Collector",
  },
  {
    id: "6",
    question: "How many days did God use to create Heaven and Earth?",
    options: ["6", "7", "5", "4"],
    correct: "6",
  },
  {
    id: "7",
    question: "Who baptizes Jesus?",
    options: ["John the Baptist", "God", "James", "Peter"],
    correct: "John the Baptist",
  },
  {
    id: "8",
    question: " Who is the first apostle to deny Jesus",
    options: ["Judas Iscariot", "James", "Peter", "Andrew"],
    correct: "Peter",
  },
  {
    id: "9",
    question: "She was a woman who never got her first child through a man.",
    options: ["Esther", "Elizabeth", "Mary", "Hannah"],
    correct: "Mary",
  },
];
//end of questions Array with options and correct answer

/**
 * User must enter username at start screen to enter quiz
 * Empty entry displays invalid alert and when name entered
 * start screen hide and display quiz page
 */
function start() {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  mainQuestionDisplay();
};


function validateUser() {
  let userName = document.getElementById("userName")
  if (userName.value.trim() == "") {
    alert("Invalid Username!! PLEASE ENTER A NAME");
  }
  else if (userName.value != "") {
    return start();
  }
}

//EventListerner to paly the Quiz again after finishing
restart.addEventListener("click", () => {
  mainQuestionDisplay();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
/**
 * Displays the next question.
 * if the questions end, this will dispaly the scores and play game again.
 * or you click on the logo to return to the home page.
 */
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
      `${userName.value}, Your score is ${scoreCount} out of ${questionCount}`;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 21;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

/**
 * Assign Timer to countdown
 * setInterval called to initiate the time out function
 */
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timer.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

/**
 * Display quiz
 */
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};


/**
 * Quiz Creation to generate the quiz
 * //generate randomly questions and options, so user cant guess answers upon replay
 */
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

/**
 * Checks the answer against each question.
 * if right option is selected, the return is correct.
 * if wrong option is selected, the return is incorrect.
 */
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

/**
 * initial setup
 */
function mainQuestionDisplay() {
  welcomeNote()
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 21;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

/* Add a title with Username to question display */
function welcomeNote() {
  let welcomeStatement = document.getElementById('nameEntered');
  let html = `
  <h3> Welcome ${userName.value}, Please Choose the Correct Answer</h3>
  `;
  welcomeStatement.innerHTML = html;
}

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

/**
 * Scoreboard
 * idea taken from Brain Design and Manupulated
 */
let leaderboardMain = document.querySelector('.leaderboard-main');
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let highScoresTable = document.getElementById("high-scores");

const saveScoreBtn = document.querySelector('#saveScoreBtn');
saveScoreBtn.addEventListener('click', saveHighScore);

function saveHighScore(event) {
  event.preventDefault()
  let highScore = {
    score: scoreCount,
    name: userName.value
  };
  highScores.push(highScore);
  highScores.sort((a, b) => b.score - a.score); // Sorts scores into descending order
  highScores.splice(10); // Only shows 10 high scores

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign('./leaderboard.html');
}