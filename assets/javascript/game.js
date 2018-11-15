// list of words 
var words = ["dog", "cat", "moose", "horse", "mouse", "elephant", "crocodile", "dingo", "hyena", "lion", "tiger", "bear"];
// selected word
var selection;
// list of letters in selected word
var wordLetters;
// list of letters to be guessed
var word;
// total wins
var wins;
// guesses remaining
var guessesLeft;
// guessed letters array
var guessed;
// keyed letter
var letter;
// function to reset variable values

// function to initialize variables and start game
var init = function () {
    // show and set "word" to be the selection's letters replaced by underscores
    var selection = words[Math.floor(Math.random() * words.length)];
    var wordLetters = selection.split("");
    var word = [];
    for (let i = 0; i < wordLetters.length; i++) {
        word.push("_");
    }
    var resetVariables = function () {
        guessesLeft = 10;
        guessed = [];
        selection = words[Math.floor(Math.random() * words.length)];
        wordLetters = selection.split("");
        word = [];
        console.log(word);
        document.getElementById("word").innerHTML = word;
        for (let i = 0; i < wordLetters.length; i++) {
            word.push("_");
        }
        wins++;
        document.getElementById("wins").innerHTML = wins;
        console.log(wordLetters);
    }
    console.log(wordLetters);
    document.getElementById("wordH").style.visibility = "visible";
    document.getElementById("word").style.visibility = "visible";
    document.getElementById("word").innerHTML = word.join(" ");

    // show and set "wins"
    wins = 0;
    document.getElementById("wins").style.visibility = "visible";
    document.getElementById("winsH").style.visibility = "visible";
    document.getElementById("wins").innerHTML = wins;

    // show and set "guessesLeft"
    guessesLeft = 10;
    document.getElementById("guessesLeft").style.visibility = "visible";
    document.getElementById("guessesLeftH").style.visibility = "visible";
    document.getElementById("guessesLeft").innerHTML = guessesLeft;

    // show and set "lettersGuessed"
    guessed = [];
    document.getElementById("lettersGuessed").style.visibility = "visible";
    document.getElementById("lettersGuessed").innerHTML = guessed;
    document.getElementById("lettersGuessedH").style.visibility = "visible";

    // hide "gameOver"
    document.getElementById("gameOver").style.visibility = "hidden";

    //logs keystrokes 
    document.onkeyup = function (keyPress) {
        //assigns keystrokes to "letter"
        var letter = keyPress.key.toLowerCase();
        // function to show game over screen and restart after keystroke
        var gameOver = function () {
            document.getElementById("word").style.visibility = "hidden";
            document.getElementById("wins").style.visibility = "hidden";
            document.getElementById("guessesLeft").style.visibility = "hidden";
            document.getElementById("lettersGuessed").style.visibility = "hidden";
            document.getElementById("wordH").style.visibility = "hidden";
            document.getElementById("winsH").style.visibility = "hidden";
            document.getElementById("guessesLeftH").style.visibility = "hidden";
            document.getElementById("lettersGuessedH").style.visibility = "hidden";
            document.getElementById("gameOver").style.visibility = "visible";
            document.onkeyup = init;
        }

        // does nothing if key has already been tried
        if (guessed.includes(letter)) {
            console.log("You already guessed that!");
        }
        // adds letter to masked word if it matches
        else if (wordLetters.includes(letter)) {
            for (var j = 0; j < wordLetters.length; j++) {
                if (letter === wordLetters[j]) {
                    word[j] = letter;
                }
                if (word.indexOf("_") === -1) {
                    resetVariables()
                }
                document.getElementById("word").innerHTML = word;
            }
        }
        // adds key to tried list and deducts a guess if wrong
        else if (guessesLeft > 1) {
            guessed.push(letter);
            document.getElementById("lettersGuessed").innerHTML = guessed;
            guessesLeft--;
            document.getElementById("guessesLeft").innerHTML = guessesLeft;
        }
        // resets if one guess remaining and guess was wrong
        else {
            gameOver();
        }

    }

}







