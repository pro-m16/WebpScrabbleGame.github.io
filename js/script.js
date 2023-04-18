// Define a global array to hold the players data
const PlayersData = [];
const playerData = [];
var currentDate = new Date();
const preloaderWrapper = document.querySelector('.preloader-wrapper');

window.addEventListener('load', function() {
    preloaderWrapper.classList.add('fade-out-animation');
});

const wordText = document.querySelector(".word"),
time = document.querySelector(".time b"),
hintText = document.querySelector(".hint span");
const inputField = document.getElementById("inputField1");
const checkBtn = document.getElementById("check-word");
const nextBtn = document.getElementById("next-btn");
const endBtn = document.getElementById("end-btn");
const regisBtn = document.getElementById("regis-btn");
const chartArea = document.getElementById("show-chart");
const startBtn = document.getElementById("start-btn");
const percentBtn = document.getElementById("show-percentage");

let correctWord;
let timer;

const startTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return time.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        playGame();
    }, 1000);
}


// Define the Register function to handle form submission
function handleRegister() {
  // Get form field values
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const email = document.getElementById("email");
  const age = document.getElementById("age");
    
  if (!email.value.endsWith("@gmail.com")) {
    alert('Email address must end with "@gmail.com"');
    return;
  }


  // Add the new player to the players data array
  PlayersData.push({
    firstName: firstName.value,
    lastName: lastName.value,
    dob: dob.value,
    age: age.value,
    gender: gender.value,
    email: email.value,
    percentageScore: 0,
  });
    

  console.log(PlayersData);
  // Display a success message
  alert("Success");

  firstName.disabled = true;
  lastName.disabled = true;
  dob.disabled = true;
  age.disabled = true;
  gender.disabled = true;
  email.disabled = true;
  //startBtn.disabled = false;
  regisBtn.disabled = true;
  endBtn.disabled = false;


  //return true;
}

// Define a function to calculate age based on date of birth
function setAge(dobFeild) {
    let dob = new Date(dobFeild.value);
    let age = currentDate.getFullYear() - dob.getFullYear();

    // get the number of month since birth month
    let month = currentDate.getMonth() - dob.getMonth();
    age = (month < 0 || (month === 0 && currentDate.getDate() < dob.getDate())) ? --age : age;    
    document.getElementById("age").value = age;

    if (age < 8 || age > 25) {
        alert("You must be between 8 and 25 years old to register.");
        return false;
    } 
    
    
}


function enableGame() {

  // function made to enable all features of the game
  playGame();
  const playField = document.getElementById("game-area");
  document.getElementById('check-word').disabled = false
  document.getElementById('next-btn').disabled = false
  document.getElementById('inputField1').disabled = false

  
  playField.hidden = false;

    
}
function playGame() {

    startTimer(90);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); //combining words together as a text
    hintText.innerText = randomObj.hint; // passing to the hint div
    correctWord = randomObj.word.toLowerCase();; //passing the random word to correct word
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
    
}
//playGame();


//task 6
function checkAnswer(wordsIndex){

    const currentQuestion = words[wordsIndex];

    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} Awesome!! The word is correct`);
   
   
    playerData.push({
    questionAnswered: userWord,
    correct: correctWord
  });

    console.log('Result', playerData);
    
    playGame();
    showAll();
    //console.log(showAll);
    
    
}

function findPercentageScore() {


  const showPercentage = document.getElementById("showPercentage");
  let checkArrayOFPlayerLength =
    PlayersData.length > 1 ? PlayersData.length - 1 : 0;

  const playerName = PlayersData[0].firstName + " " +PlayersData[0].lastName;

  const totalQuestions = playerData.length;
  const correctAnswers = playerData.filter((gameData) => gameData.correct)
    .length;
  const percentageScore = (correctAnswers / totalQuestions) * 100;

  const currentDate = new Date().toLocaleDateString();

  showPercentage.value = ""; // Clear textarea
  showPercentage.value = `Name: ${playerName}\nDate: ${currentDate}\nTotal Questions: ${totalQuestions}\nCorrect Answers: ${correctAnswers}\nPercentage Score: ${percentageScore.toFixed(
    2
  )}%`;

  PlayersData[checkArrayOFPlayerLength].percentageScore = percentageScore;
}

// Function to disable the timer

function quitGame() {
  //Call the findPercentageScore() function
  findPercentageScore();
  showAll();
  const disableForm = document.getElementById("form1");
  disableForm.reset();
  const regisBtn = document.getElementById("regis-btn");
  const playArea = document.getElementById("game-area");
   // Disable all the buttons except the Register button
  regisBtn.disabled = true;
  nextBtn.disabled = true;
  endBtn.disabled = true;
  checkBtn.disabled = true;

  // Disable the Play and Results area
  playArea.hidden = true;
  
    
}

function showAll() {
  // Get the textarea element
  var showallplayers = document.getElementById("showallplayers");

  // Clear the textarea before displaying the data
  showallplayers.value = "";


  PlayersData.forEach((player, index) => {
    const firstName = player.firstName;
    const lastName = player.lastName;
    const Age = player.age;
    // let randomObj = words[Math.floor(Math.random() * words.length)];
    // let wordArray = randomObj.word.split("");
    // for (let i = wordArray.length - 1; i > 0; i--) {
    //     let j = Math.floor(Math.random() * (i + 1));
    //     [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    // }
    // const questions = randomObj.hint;

    const totalQuestions = playerData.length;
    const correctAnswers = playerData.filter(
      (gameData) => gameData.correct
    ).length;

    const percentageScore = (correctAnswers / totalQuestions) * 100;

    showallplayers.value += `Player ${
      index + 1
    }: ${firstName} ${lastName}, Age: ${Age}, Total Questions asked: ${totalQuestions}, Total Questions Answered: ${correctAnswers},  Percentage: ${percentageScore.toFixed(
      2
    )}%\n`;
  });
  
}






//regisBtn.addEventListener("click", handleRegister);
//startBtn.addEventListener("click", playGame);
checkBtn.addEventListener("click", checkAnswer);
nextBtn.addEventListener("click", playGame);
endBtn.addEventListener("click", quitGame);
percentBtn.addEventListener("click", findPercentageScore);


// Add this function to calculate the frequency of scores
function getScoreFrequency(percentageScore) {
  if (percentageScore < 50) {
    return "<50";
  } else if (percentageScore < 60) {
    return "50-59";
  } else if (percentageScore < 70) {
    return "60-69";
  } else if (percentageScore < 80) {
    return "70-79";
  } else if (percentageScore < 90) {
    return "80-89";
  } else if (percentageScore < 100) {
    return "90-99";
  } else {
    return "100";
  }
}

function showFrequencies() {
  const genderCounts = { male: 0, female: 0 };
  const scoreCounts = {
    "<50": 0,
    "50-59": 0,
    "60-69": 0,
    "70-79": 0,
    "80-89": 0,
    "90-99": 0,
    "100": 0,
  };

  const totalPlayers = PlayersData.length;

  
  PlayersData.forEach((player) => {
 
    if (player.gender === "male") {
      genderCounts.male++;
    } else if (player.gender === "female") {
      genderCounts.female++;
    }
    const percentageScore = player.percentageScore;
    const scoreRange = getScoreFrequency(percentageScore);
    scoreCounts[scoreRange]++;
  });

  
  const malePercentage = (genderCounts.male / totalPlayers) * 100;
  const femalePercentage = (genderCounts.female / totalPlayers) * 100;

  
  const genderChart = `
    <h3>Gender Chart</h3>
    <table>
      <tr>
        <td>Male</td>
        <td><img src="./img/bar.jpg" width="${malePercentage}%" height="45px"></td>
      </tr>
      <tr>
        <td>Female</td>
        <td><img src="./img/bar.jpg" width="${femalePercentage}%" height="45px"></td>
      </tr>
    </table>
  `;

  
  const scoreChart = `
    <h3>Score Chart</h3>
    <table>
      ${Object.keys(scoreCounts)
        .map((range) => {
          const scorePercentage = (scoreCounts[range] / totalPlayers) * 100;
          return `
            <tr>
              <td>${range}</td>
              <td><img src="./img/bar.jpg" width="${scorePercentage}%" height="45px"></td>
            </tr>
          `;
        })
        .join("")}
    </table>
  `;

  // Display the charts
  const showcharts = document.getElementById("showcharts");
  showcharts.innerHTML = genderChart + scoreChart;
}

// Call displayFrequencies every 5 seconds
setInterval(showFrequencies, 5000);