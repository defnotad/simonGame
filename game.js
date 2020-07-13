var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var keyPressed = false;
var currentLevel = 0;
var numberOfKeysPressed = 0;

$(document).keypress(function () {
    if (keyPressed) {
        return;
    }
    $("h1").text("Level " + currentLevel);
    keyPressed = true;
    nextSequence();
});

$(".btn").click(function (event) {
    clickHandler(event.target.id);
});

function nextSequence() {
    numberOfKeysPressed = 0;
    gamePattern = [];
    userPattern = [];
    currentLevel++;
    $("#level-title").text("Level " + currentLevel);
    for (var i = 0; i < currentLevel;) {
        setTimeout(function () {
            var randomNumber = Math.random() * 4;
            randomNumber = Math.floor(randomNumber);
            var randomChosenColor = buttonColors[randomNumber];

            gamePattern.push(randomChosenColor);

            $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
            playSound(randomChosenColor);
            i++;
        }, 1000);
    }
}

function clickHandler(buttonId) {
    userPattern.push(buttonId);
    playSound(buttonId);
    animatePress(buttonId);
    numberOfKeysPressed++;
    if (numberOfKeysPressed == currentLevel) {
        checkAnswer(currentLevel);
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () { $("#" + currentColor).removeClass("pressed"); }, 100);
}

function checkAnswer(currentLevel) {
    for (var i = 0; i < currentLevel; i++) {
        if (gamePattern[i] == userPattern[i]) {
            continue;
        } else {
            $("h1").text("Wrong!");
            restart();
            return;
        }
    }
    $("h1").text("Right!");
    setTimeout(function () {
        nextSequence();
    }, 1000);
}

function restart() {
    currentLevel = 0;
}