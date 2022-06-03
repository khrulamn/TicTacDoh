//------------------------------------ INITIALISING GAME VARIABLES -----------------------------------------------
// Tracks player move and who's turn
let playerTracker = 0;

// Initialising Score (from sessionstorage)
if (!sessionStorage.player1 && !sessionStorage.player2 && !sessionStorage.drawgame) {
    sessionStorage.player1 = 0;
    sessionStorage.player2 = 0;
    sessionStorage.drawgame = 0;
}

let isDraw = true; //tracks if the game has drawn

document.querySelectorAll("td")[3].innerText = sessionStorage.player1; //inputs scores into scoreboard from session storage
document.querySelectorAll("td")[5].innerText = sessionStorage.player2;
document.querySelectorAll("td")[4].innerText = sessionStorage.drawgame;

//Initialising Player names with sessionstorage
if (!sessionStorage.p1Name && !sessionStorage.p2Name) {
    sessionStorage.p1Name = prompt("Please enter Player 1 name");
    sessionStorage.p2Name = prompt("Please enter Player 2 name");
    if (sessionStorage.p1Name == "" || sessionStorage.p1Name == "null") {
        sessionStorage.p1Name = "Player 1"
    }
    if (sessionStorage.p2Name == "" || sessionStorage.p2Name == "null") {
        sessionStorage.p2Name = "Player 2"
    }
}

//Inputting player names into h2 and scoreboard
document.querySelector("h2").innerText = "Start the game with " + sessionStorage.p1Name + " making a move!";
document.querySelectorAll("td")[0].innerText = sessionStorage.p1Name;
document.querySelectorAll("td")[2].innerText = sessionStorage.p2Name;

//Array to track who wins or not (used later in checkX and checkO function)
let xArray = ["X", "X", "X"];
let winX = xArray.toString();
let yArray = ["O", "O", "O"];
let winY = yArray.toString();
let homerArray = ['<img src="assets/icons/Homerlah.png">', '<img src="assets/icons/Homerlah.png">', '<img src="assets/icons/Homerlah.png">'];
let winHomer = homerArray.toString();
let margeArray = ['<img src="assets/icons/Marge.png">', '<img src="assets/icons/Marge.png">', '<img src="assets/icons/Marge.png">'];
let winMarge = margeArray.toString();

//----------------------------------- INITIALISING AUDIO WITH RESPECTIVE FUNCTIONS ---------------------------------------
// Audio stuff
let audioHello = new Audio("assets/sounds/hello-3.mp3");
let audioRoar = new Audio("assets/sounds/roar.mp3");
let audioDoh = new Audio("assets/sounds/doh-2.mp3");
let audioWhoo = new Audio("assets/sounds/whoo.mp3");
let audioWin1 = new Audio("assets/sounds/no-losers.mp3");
let audioWin2 = new Audio("assets/sounds/fun-day-with-your-daddy.mp3");
let audioDraw = new Audio("assets/sounds/haha-2.mp3");
let audioAgain = new Audio("assets/sounds/IT DOESN'T MATTER.mp3");
let audioReset = new Audio("assets/sounds/911.mp3");
let audioIcon1 = new Audio("assets/sounds/be-on-tv.mp3")
let audioIcon2 = new Audio("assets/sounds/hello-everyone.mp3")
let audioBg = new Audio("assets/sounds/The Simpsons.mp3")
audioBg.volume = 0.45;

function icon1Sound() {
    audioIcon1.play();
}
function icon2Sound() {
    audioIcon2.play()
}
function helloSound() {
    audioHello.play();
}
function roarSound() {
    audioRoar.play();
}
function dohSound() {
    audioDoh.play();
}
function whooSound() {
    audioWhoo.play();
}
function win1Sound() {
    audioWin1.play();
}
function win2Sound() {
    audioWin2.play();
}
function drawSound() {
    audioDraw.play();
}
function againSound() {
    audioAgain.play();
}
function resetSound() {
    audioReset.play();
}
function playBgMusic() {
    audioBg.play();
}
function pauseBgMusic() {
    audioBg.pause();
}

//stops all the sounds from playing
function stopAllSounds() {
    audioWin1.pause();
    audioWin1.currentTime = 0;
    audioWin2.pause();
    audioWin2.currentTime = 0;
    audioDoh.pause();
    audioDoh.currentTime = 0;
    audioWhoo.pause();
    audioWhoo.currentTime = 0;
    audioDraw.pause();
    audioDraw.currentTime = 0;
}

//------------------------------------------------ GAME MECHANIC FUNCTIONS ---------------------------------------------------------
// Function to disable all buttons
const disableButtons = () => {
    for (i = 1; i < 10; i++) {
        document.getElementsByName("button" + i)[0].disabled = true;
    }
}

//Scoreboard (adds score depending on outcome of match)
const addP1Score = () => {
    sessionStorage.player1 = Number(sessionStorage.player1) + 1;
    document.querySelectorAll("td")[3].innerText = sessionStorage.player1;
}

const addP2Score = () => {
    sessionStorage.player2 = Number(sessionStorage.player2) + 1;
    document.querySelectorAll("td")[5].innerText = sessionStorage.player2;
}

const addDrawScore = () => {
    sessionStorage.drawgame = Number(sessionStorage.drawgame) + 1;
    document.querySelectorAll("td")[4].innerText = sessionStorage.drawgame;
}

// Alerts for player 1 wins, disable buttons, add score, and make sure a draw is not the output
const player1Wins = () => {
    document.querySelector("h2").innerText = sessionStorage.p1Name + " wins!";
    Swal.fire({
        title: sessionStorage.p1Name + " wins!",
        confirmButtonColor: "#363E61",
        imageUrl: 'assets/icons/HomerWin.png',
        imageWidth: 200,
        imageHeight: 200,
    })
    disableButtons();
    addP1Score();
    win1Sound();
    isDraw = false;
}

// Alerts for player 2 wins, disable buttons, add score, and make sure a draw is not the output
const player2Wins = () => {
    document.querySelector("h2").innerText = sessionStorage.p2Name + " wins!";
    Swal.fire({
        title: sessionStorage.p2Name + " wins!",
        confirmButtonColor: "#363E61",
        imageUrl: 'assets/icons/MargeWin.png',
        imageWidth: 250,
        imageHeight: 250,
    })
    disableButtons();
    addP2Score();
    win2Sound();
    isDraw = false;
}

//Function to check if player 1 (X) has won and adds a strikethrough class to show how p1 has won
const checkX = () => {
    but1 = document.getElementsByName("button1")[0].innerHTML;
    but2 = document.getElementsByName("button2")[0].innerHTML;
    but3 = document.getElementsByName("button3")[0].innerHTML;
    but4 = document.getElementsByName("button4")[0].innerHTML;
    but5 = document.getElementsByName("button5")[0].innerHTML;
    but6 = document.getElementsByName("button6")[0].innerHTML;
    but7 = document.getElementsByName("button7")[0].innerHTML;
    but8 = document.getElementsByName("button8")[0].innerHTML;
    but9 = document.getElementsByName("button9")[0].innerHTML;

    if ([but1, but2, but3].toString() == winX || [but1, but2, but3].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-row-1")
    } else if ([but4, but5, but6].toString() == winX || [but4, but5, but6].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-row-2")
    } else if ([but7, but8, but9].toString() == winX || [but7, but8, but9].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-row-3")
    } else if ([but1, but4, but7].toString() == winX || [but1, but4, but7].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-column-1")
    } else if ([but2, but5, but8].toString() == winX || [but2, but5, but8].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-column-2")
    } else if ([but3, but6, but9].toString() == winX || [but3, but6, but9].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-column-3")
    } else if ([but1, but5, but9].toString() == winX || [but1, but5, but9].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-diagonal-1")
    } else if ([but3, but5, but7].toString() == winX || [but3, but5, but7].toString() == winHomer) {
        player1Wins();
        document.getElementById("strike").classList.add("strike-diagonal-2")
    }
}

// Function to check if player 2 (O) has won and adds a striketrough class to show how p2 has won
const checkO = () => {
    but1 = document.getElementsByName("button1")[0].innerHTML;
    but2 = document.getElementsByName("button2")[0].innerHTML;
    but3 = document.getElementsByName("button3")[0].innerHTML;
    but4 = document.getElementsByName("button4")[0].innerHTML;
    but5 = document.getElementsByName("button5")[0].innerHTML;
    but6 = document.getElementsByName("button6")[0].innerHTML;
    but7 = document.getElementsByName("button7")[0].innerHTML;
    but8 = document.getElementsByName("button8")[0].innerHTML;
    but9 = document.getElementsByName("button9")[0].innerHTML;

    if ([but1, but2, but3].toString() == winY || [but1, but2, but3].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-row-1")
    } else if ([but4, but5, but6].toString() == winY || [but4, but5, but6].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-row-2")
    } else if ([but7, but8, but9].toString() == winY || [but7, but8, but9].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-row-3")
    } else if ([but1, but4, but7].toString() == winY || [but1, but4, but7].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-column-1")
    } else if ([but2, but5, but8].toString() == winY || [but2, but5, but8].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-column-2")
    } else if ([but3, but6, but9].toString() == winY || [but3, but6, but9].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-column-3")
    } else if ([but1, but5, but9].toString() == winY || [but1, but5, but9].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-diagonal-1")
    } else if ([but3, but5, but7].toString() == winY || [but3, but5, but7].toString() == winMarge) {
        player2Wins();
        document.getElementById("strike").classList.add("strike-diagonal-2")
    }
}

//Function to play the game; detects player move, and check if P1 or P2 has won, and when max moves has been done, trigger a draw if it is a draw.
const playGame = (num) => {
    if (playerTracker % 2 == 0) {
        getBox = document.getElementsByName("button" + num)[0]
        if (sessionStorage.iconOption == 'true') {
            getBox.innerHTML = "<img src='assets/icons/Homerlah.png'>"
        } else {
            getBox.innerText = "X";
        }
        getBox.style.fontSize = '400%';
        getBox.disabled = true;
        dohSound();

        document.querySelector("h2").innerText = sessionStorage.p2Name + "!";
    }
    else {
        getBox = document.getElementsByName("button" + num)[0]
        if (sessionStorage.iconOption == 'true') {
            getBox.innerHTML = "<img src='assets/icons/Marge.png'>"
        } else {
            getBox.innerText = "O";
        }
        getBox.style.fontSize = '400%';
        getBox.disabled = true;
        whooSound();

        document.querySelector("h2").innerText = sessionStorage.p1Name + "!";
    }

    playerTracker += 1;

    if (playerTracker >= 4) {
        checkX();
        checkO();
    }

    if (playerTracker >= 9 && isDraw === true) {
        document.querySelector("h2").innerText = "It's a draw!"
        Swal.fire({
            title: "It's a draw!",
            confirmButtonColor: "#363E61",
            imageUrl: 'assets/icons/Draw.png',
            // imageWidth: 250,
            imageHeight: 250,
        })
        addDrawScore();
        drawSound();
    }
}

// Clears board and starts game again (listens to again button click)
const againGame = () => {
    stopAllSounds();
    againSound();
    playerTracker = 0;
    isDraw = true;

    for (i = 1; i < 10; i++) {
        document.getElementsByName("button" + i)[0].innerText = "";
    }

    for (i = 1; i < 10; i++) {
        document.getElementsByName("button" + i)[0].disabled = false;
    }

    document.querySelector("h2").innerText = "Start the game with " + sessionStorage.p1Name + " making a move!";

    document.getElementById('strike').classList = "strike"
}

//Total reset of game, with new names and clean score (listens to reset button click)
const resetGame = () => {
    sessionStorage.p1Name = prompt("Please enter Player 1 name");
    sessionStorage.p2Name = prompt("Please enter Player 2 name");
    if (sessionStorage.p1Name == "" || sessionStorage.p1Name == "null") {
        sessionStorage.p1Name = "Player 1"
    }
    if (sessionStorage.p2Name == "" || sessionStorage.p2Name == "null") {
        sessionStorage.p2Name = "Player 2"
    }
    resetSound();
    sessionStorage.player1 = 0;
    sessionStorage.player2 = 0;
    sessionStorage.drawgame = 0;
    document.querySelectorAll("td")[0].innerText = sessionStorage.p1Name;
    document.querySelectorAll("td")[2].innerText = sessionStorage.p2Name;
    document.querySelectorAll("td")[3].innerText = sessionStorage.player1;
    document.querySelectorAll("td")[5].innerText = sessionStorage.player2;
    document.querySelectorAll("td")[4].innerText = sessionStorage.drawgame;
    againGame();
    audioAgain.pause();
    audioAgain.currentTime = 0;
}

//---------------------------------- MISCELLANEOUS STUFF --------------------------------------------------------
//Play button image change
let playButton = document.getElementsByClassName("play")[0];

playButton.addEventListener("mouseover", function() {
    playButton.src = "assets/icons/play3.png"
}, false)

playButton.addEventListener("mouseout", function() {
    playButton.src = "assets/icons/play2.png"    
}, false)

//Pause button image change
let pauseButton = document.getElementsByClassName("pause")[0];

pauseButton.addEventListener("mouseover", function() {
    pauseButton.src = "assets/icons/pause3.png"
}, false)

pauseButton.addEventListener("mouseout", function() {
    pauseButton.src = "assets/icons/pause2.png"    
}, false)

//flag to initialise which icon is used
if (!sessionStorage.iconOption) {
    sessionStorage.iconOption = 'false';
}

//Function to change icons
function changeIcon() {
    againGame();
    audioAgain.pause();
    audioAgain.currentTime = 0;
    if (sessionStorage.iconOption == 'false') {
        sessionStorage.iconOption = 'true';
        icon2Sound();
        Swal.fire({
            title: "Changed icons to Homers and Marges",
            confirmButtonColor: "#363E61",
            icon: "warning"
        })
    } else {
        sessionStorage.iconOption = 'false';
        icon1Sound();
        Swal.fire({
            title: "Changed icons to X's and O's",
            confirmButtonColor: "#363E61",
            icon: "warning"
        })
    }
}