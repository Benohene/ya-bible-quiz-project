// Assign the IDS and CLASS to variables
let timeLeft = document.querySelector("time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
#
//Assign the count to 21 to achieve 20s countdown for each question
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

//EventListerner to paly the Quiz again after finishing
restart.addEventListener("click", () => {
    initial();
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
                "Your score is " + scoreCount + " out of " + questionCount;
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
      timeLeft.innerHTML = `${count}s`;
      if (count == 0) {
        clearInterval(countdown);
        displayNext();
      }
    }, 1000);
  };

  //Display quiz
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
    
    quizArray.sort(() => Math.random() - 0.5);
    for (let i of quizArray) {
      i.options.sort(() => Math.random() - 0.5);
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