// variables for elements
const scoreDisplay = document.getElementById("scoreDisplay");
const clearScores = document.getElementById("clearHsBtn");
const backtoStart = document.getElementById("returnBtn");


// clear high scores function
if (clearScores) {
  clearScores.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
}
// gets array of stored scores and names from localstorage, if none are saved, return empty array.
function returnScore() {
  let scoreList = localStorage.getItem("scoreList");
  console.log("looking for scores..");
  if (scoreList !== null) {
    displayList = JSON.parse(scoreList);
    console.log("no stored scores!");
    return displayList;
  } else {
    displayList = [];
  }
  console.log("stored scores found!");
  return displayList;
};


// sorting function
function sortScores() {
  let unsorted = returnScore();
  console.log("sorting scores..");
  if (returnScore.value === null) {
    return;
  } else {
    unsorted.sort((a, b) => b.scored - a.scored)
    console.log("scores sorted!");
    return unsorted;
  }
};

// rendering scores
function displayScores() {
  // start with clear list
  let scores = sortScores();
  // show top 5 only
  let displayedScores = scores.slice(0,5);
  for (let i = 0; i < displayedScores.length; i++) {
    const item = displayedScores[i];
    let createEle = document.createElement("li");
    createEle.textContent = item.userName + " - " + item.scored;
    scoreDisplay.appendChild(createEle);
    console.log("element created!");
  }
};

displayScores();
