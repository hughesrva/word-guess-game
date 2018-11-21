// list of words 
var words = ["octorok", "guardian", "hyrule", "korok", "zelda", "ganon"];
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

// function to hide element
var hide = function (elementName) {
    document.getElementById(elementName).style.visibility = "hidden";
}

// function to show element
var show = function (elementName) {
    document.getElementById(elementName).style.visibility = "visible";
}

// changes sound source before playing new sound
var changeSound = function (soundSource) {
    var sound = document.getElementById("sound");
    sound.src = soundSource;
}

// hides all elements other than start screen
var init = function () {
    show("start");
    hide("wordH");
    hide("word");
    hide("wins");
    hide("winsH");
    hide("guessesLeft");
    hide("guessesLeftH");
    hide("lettersGuessed");
    hide("lettersGuessedH");
    hide("gameOver1");
    hide("gameOver2");

    // function to create and show variables
    var startGame = function () {
        document.onclick = null;
        // show and set "word" to be the selection's letters replaced by underscores
        var selection = words[Math.floor(Math.random() * words.length)];
        var wordLetters = selection.split("");
        var word = [];
        sound.pause();
        song.volume = 0.1;
        song.loop = true;
        song.play();
        for (let i = 0; i < wordLetters.length; i++) {
            word.push("_");
        }
        // resets most variables after completing word
        var resetVariables = function () {
            guessesLeft = 10;
            guessed = [];
            selection = words[Math.floor(Math.random() * words.length)];
            wordLetters = selection.split("");
            word = [];
            document.getElementById("lettersGuessed").innerHTML = guessed;
            document.getElementById("guessesLeft").innerHTML = guessesLeft;
            for (let i = 0; i < wordLetters.length; i++) {
                word.push("_");
            }
            wins++;
            document.getElementById("wins").innerHTML = wins;
            console.log(wordLetters);
        }

        show("title");
        console.log(wordLetters);
        wins = 0;
        guessesLeft = 10;
        guessed = [];
        document.getElementById("lettersGuessed").innerHTML = guessed;
        document.getElementById("word").innerHTML = word.join(" ");
        document.getElementById("wins").innerHTML = wins;
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
        show("wordH");
        show("word");
        show("wins");
        show("winsH");
        show("guessesLeft");
        show("guessesLeftH");
        show("lettersGuessed");
        show("lettersGuessedH");
        hide("start");
        hide("gameOver1");
        hide("gameOver2");

        //logs keystrokes 
        document.onkeyup = function (keyPress) {
            //assigns keystrokes to "letter"
            var letter = keyPress.key.toLowerCase();
            // function to show game over screen and restart after keystroke
            var gameOver = function () {
                hide("word");
                hide("wins");
                hide("guessesLeft");
                hide("lettersGuessed");
                hide("wordH");
                hide("winsH");
                hide("guessesLeftH");
                hide("lettersGuessedH");
                hide("title");
                show("gameOver1");
                show("gameOver2");
                changeSound("assets/sounds/gameOver.mp3");
                song.pause();
                sound.play();
                document.onkeyup = startGame;
            }

            // does nothing if key has already been tried
            if (guessed.includes(letter)) {
                console.log("You already guessed that!");
            }
            // adds letter to masked word if it matches
            else if (wordLetters.includes(letter)) {
                for (var j = 0; j < wordLetters.length; j++) {
                    if (letter === wordLetters[j] && guessed.includes(letter)=== false)  {
                        word[j] = letter;
                        changeSound("assets/sounds/itemget.mp3");
                        sound.volume = 1.0;
                        sound.play();
                    }
                    // checks to see if word is complete
                    if (word.indexOf("_") === -1) {
                        changeSound("assets/sounds/secretsolve.mp3");
                        sound.volume = 1.0;
                        sound.play();
                        resetVariables()
                    }
                }
                document.getElementById("word").innerHTML = word.join(" ");

            }
            // adds key to tried list and deducts a guess if wrong
            else if (guessesLeft > 1) {
                changeSound("assets/sounds/korokdrop.mp3");
                sound.volume = 1.0;
                sound.play();
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
    document.onclick = startGame;

}





