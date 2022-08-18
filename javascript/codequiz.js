// variables for future logging of score and highscores
let questionNum = 0;
let score = 0;
let highscores = [];
// questions array
let questions = [
  {
    question: "What does HTML stand for?",
    options: ["Horizontal Text Modification Language", "Helpful Type and Math Linker", "Hyper Text Markup Language", "Human To Machine Link"],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "What is the correct HTML element for inserting a line break?",
    options: ["<break>", "<br>", "<linebreak>", "<brk>"],
    answer: "<br>",
  },
  {
    question: "Choose the correct HTML element to define emphasized text",
    options: ["<e>", "<b>", "<i>", "<em>"],
    answer: "<em>",
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Coordinated Style Systems", "Computer Safe Styling", "Calculated Safe Styling"],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Where is the correct place to refer to an external style sheet in an HTML document?",
    options: ["Anywhere is fine", "In the <head> section", "In the <body> section", "In the <html> section"],
    answer: "In the <head> section",
  },
  {
    question: "Which property is used to change the font of an element?",
    options: ["font-display", "font-family", "font-style", "font"],
    answer: "font-family",
  },
  {
    question: "Inside which HTML element do you put inline JavaScript?",
    options: ["<js>", "<head>", "<code>", "<script>"],
    answer: "<script>",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function = myFunction()", "var function myFunction()", "function myFunction{}"],
    answer: "function myFunction()",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["clicked", "mousedown", "onclick", "click"],
    answer: "onclick",
  },
];

// variables for elements
const timeDisplay = document.getElementById("clock");
const eleBody = document.getElementById("eleBody");
const startButton = document.getElementById("startQuiz");
const makeDiv = document.createElement("div");
const choiceBtns = document.getElementById("choiceBtns");
const scoreCount = document.getElementById("score");

// 75 seconds
let sec = 75;
let stopped = 0;

// starts the timer and displays page content accordingly
if (startButton) {
  startButton.addEventListener("click", function () {
    // since the clear interval value is set at 0, comparing it to 0 will always return true
    // the game will only be able to start again at the end, or when the page is initially loaded
    if (stopped === 0) {
      stopped = setInterval(() => {
        sec--;
        timeDisplay.innerHTML = "Time left is : " + sec;
  
        if (sec <= 0) {
          clearInterval(stopped);
          quizEnd();
        }
      }, 1000);
    }
    displayQuiz(questionNum);
  });
}

// If start button is clicked, quiz code is generated inside the display element
// generate questions and choices buttons when the quiz starts

function displayQuiz(questionNum) {
  choiceBtns.innerHTML = "";

  let currentChoice = questions[questionNum].options;

  for (let i = 0; i < questions.length; i++) {
    let currentQuestion = questions[questionNum].question;
    eleBody.textContent = currentQuestion;
  }

  currentChoice.forEach(function (newChoice) {
    let makeBtn = document.createElement("button");
    makeBtn.classList.add("button", "is-fullwidth");
    makeBtn.textContent = newChoice;
    makeBtn.addEventListener("click", verifyChoice);
    choiceBtns.append(makeBtn);
  });
}



// the selection is compared to the correct choice
// if wrong, 10 seconds are deducted

function verifyChoice(event) {
  let element = event.target;

  if (element.matches("button")) {
    makeDiv.setAttribute("id", "response");

    // if the correct answer is selected, add one point to the score total
    // else, subtract 10s

    if (element.textContent == questions[questionNum].answer) {
      score++;
      scoreCount.innerText = score;
      makeDiv.textContent = "Your last answer was correct!";
    } else {
      sec = sec - 10;

      makeDiv.textContent =
        "Your last answer was wrong... The correct choice was: " + questions[questionNum].answer;
    }
  }
  questionNum++;

  if (questionNum >= questions.length) {
    quizEnd();
    makeDiv.textContent =
      " You got " + score + " out of " + questions.length + " correct!";
  } else {
    displayQuiz(questionNum);
  }
  eleBody.appendChild(makeDiv);
}

function quizEnd() {
  
  let addScore = Math.round(sec/3);
  let finalScore = addScore + score;
  if (score == 0) {
    finalScore = 0;
  }
  let makeP = document.createElement("p");
  score.innerText = finalScore;

  timeDisplay.textContent = "Quiz over!";
  choiceBtns.innerHTML = "";

  

  if (sec >= 0) {
    clearInterval(stopped);
    
    makeP.innerText = "Your total score is " + finalScore + "!";
    eleBody.innerText = "";
    eleBody.appendChild(makeP);
  }

  // creating the high score form

  let cL = document.createElement("label");
  let cI = document.createElement("input");
  let cB = document.createElement("button");
  cL.classList.add("label", "is-size-5", "has-text-info");
  cI.classList.add("input", "has-text-centered");
  cB.classList.add("button", "is-success", "mt-3");
  cL.textContent = "Enter your name: ";
  cI.textContent = "";
  cB.textContent = "Submit";
  eleBody.appendChild(cL);
  eleBody.appendChild(cI);
  eleBody.appendChild(cB);

  // event listener for saving to local storage on submit

  cB.addEventListener("click", function () {
    if (cI === "") {
      console.error("No value entered");
      window.alert("Enter your name to save your score!");
      return;
    } else {
      let userData = {
        userName: cI.value,
        scored: finalScore
      }
      console.log(userData);
      let scoreList = localStorage.getItem("scoreList");
      if (scoreList === null) {
        scoreList = [];
      } else {
        scoreList = JSON.parse(scoreList);
      }
      scoreList.push(userData);
      localStorage.setItem("scoreList", JSON.stringify(scoreList));

      // redirect final page

      window.location.replace("highscores.html");
    }
    
  })



};
