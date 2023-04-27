let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let highScoresTable = document.getElementById("high-scores");
/**
 * Function for opening high score page
 * Applied to buttons when clicked
 */
highScoresTable.innerHTML = highScores.map(highScores => {
    return `<table>
    <tr>
    <th>Username</th>
    <th>Score</th>
    </tr>
    <tr>
    <td>${highScores.name}</td>
    <td>${highScores.score}</td>
    </tr>
    </table>
    `;
})
    .join("");

function openHighScore() {
    highScoresTable.innerHTML = highScores.map(highScores => {
        return `<table>
        <tr>
        <th>Username</th>
        <th>Score</th>
        </tr>
        <tr>
        <td>${highScores.name}</td>
        <td>${highScores.score}</td>
        <tr>
         </table>`;
    })
        .join("");
}


/**
 * onclick function
 * this function will navigate from leagerboard page to homepage
 */
function returnHome() {
    window.location.assign('./index.html');
}

//Function to clear the Highscore-taken from W3
const resetHighscoreBtn = document.getElementById('resetHighscoreBtn');
function resetHighscore() {
    localStorage.clear();
}