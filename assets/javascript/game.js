var guessesLeft = document.getElementById('guessLeft');
    var question = document.getElementById('question');
    var gameStatus = document.getElementById('status');
    var chosen = document.getElementById('alreadyChosen');
    var roundHint = document.querySelector('#gameHint');
    var totalWins = document.querySelector('#win');
    var totalLoses = document.querySelector('#lose');
    var riddlesLeft = document.querySelector('#riddles');

    var riddleCount = 14;
    var index = 0;
    var wins = 0;
    var loses = 0;
    var remGuess = 7;
    var toCompare = [];
    var alreadyGuessed = [];
    var leftOver = [];
    console.log(toCompare.length)
    console.log("Rem Guess: " + remGuess)

    //Generates random word and passes word to renderMe() function
    function wordGen() {
        // var listOfWords = ['wtatter', 'piiei', 'ttea', 'sdodda', 'jiuiice'];
        var listOfWords = [
        {w:'giants', h:'The orange baseball team.'},
        {w:'karl', h:'What they call San Francisco\'s fog.'},
        {w:'pixels', h:'The millions of tiny squares that make up your screen.'},
        {w:'zipper', h:'It goes up and down, locking you in and out.'},
        {w:'whiskey', h:'You have it with coke.'},
        {w:'fingerprints', h:'Something you always have but always leave behind?'},
        {w:'fiiiish', h:'What do you call a fish with 4 eyes?'},
        {w:'light', h:'What can you fill a room up that takes no space?'},
        {w:'electricity', h:'What city has no people?'},
        {w:'dam', h:'What does a fish say when it runs into a wall?'},
        {w:'bed', h:'What has one head, one foot and four legs?'},
        {w:'keyboard', h:'What has keys but no locks, Space but no room, You can enter but you can’t exit.?'},
        {w:'noon', h:'What time starts and stops with \'n\'?'},
        {w:'strangers', h:'Who are the people you see everyday, but you don\'t know?'},
        {w:'gameover', h:'GAME OVER - PLEASE REFRESH THE PAGE - (Or guess above and go on a ride)'},
        {w:'its-over-refresh-the-page', h:'YOUR CURRENT SCORE IS INVALID - GAME OVER - PLEASE REFRESH THE PAGE'}
        ];
        // var index = Math.floor(Math.random() * listOfWords.length);
        
        var gameWord = listOfWords[index].w;
        var gameHint = listOfWords[index].h;
        // console.log(listOfWords[index].h);
        renderMe(gameWord, gameHint);   
    }

    //Creates underlines based on letter count in word. Pushes underlines to leftOver array and to page
    //Also pushes letters in order to toCompare array
    function renderMe(word, hint) {
        console.log(hint)
        
        riddlesLeft.innerHTML = riddleCount;
        roundHint.innerHTML = hint;
        guessesLeft.innerHTML = remGuess;
        totalWins.innerHTML = wins;
        totalLoses.innerHTML = loses;

        var wordArr = word.split('');

        for (var i = 0; i < wordArr.length; i++) {
            toCompare.push(wordArr[i]);
            leftOver.push('__');

            var newEl = document.createElement('span');
            newEl.classList.add("guess");
            newEl.innerHTML = ' ___  ';
            question.append(newEl);
        }
    }

    function resetMe() {
        remGuess = 7;
        question.innerHTML = ' ';
        chosen.innerHTML = ' ';
        roundHint.innerHTML = ' ';
        gameStatus.innerHTML = ' ';
        toCompare .length = 0;
        alreadyGuessed.length = 0; 
        leftOver.length = 0;
        if(index < 15){
            index++;
            riddleCount--;
            riddlesLeft.innerHTML = riddleCount;
        }else if (index > 15) {
            index = 15;
            riddleCount--;
            riddlesLeft.innerHTML = riddleCount;
        }
        wordGen();
    }

    function winOrLose() {
            
            var joinToCompare = toCompare.join('');
            var joinLeftOver = leftOver.join('');
            
             if (joinToCompare === joinLeftOver) {
                var youWin = document.createElement('h1');
                youWin.innerHTML = 'YOU WIN!!!!!!!! New Game In 2 Seconds';
                gameStatus.append(youWin);
                console.log('YOU WIN!!!!!! New Game In 2 Seconds');
                setTimeout(function(){
                    resetMe();
                    wins++
                    totalWins.innerHTML = wins;
                }, 2000);
                
            } else if (remGuess == 0) {
                remGuess--
                guessesLeft.innerHTML = 0
                var youLose = document.createElement('h1');
                youLose.innerHTML = 'YOU LOSE. Game Over! New Game In 2 Seconds';
                gameStatus.append(youLose);
                console.log("YOU LOSE. Game Over! New Game In 2 Seconds");
            
                setTimeout(function(){ 
                    resetMe(); 
                    loses++
                    totalLoses.innerHTML = loses;
                }, 2000);
            }
        }

    //Listens for key ups, takes in value and compares to toCompare array. If wrong, guesses left is deincremented, if right the letter appears on page
    //with at correct index point. 
    function guessMe() {
        document.onkeyup = function keyMeUp(event) {
            
            console.log("Rem Guess: " + remGuess)
            console.log("Im LeftOver:" + leftOver);

            var chosenLetter = document.createElement('span');
            var answer = event.key;
            var answered = answer.toLowerCase();
            var grabGuess = document.getElementsByClassName('guess');
            var doesInclude = toCompare.includes(answered);
            var ltrIndex = toCompare.indexOf(answered);
            var guessedAlready = alreadyGuessed.includes(answered);
            console.log(answered);

            if (doesInclude && guessedAlready == false) {
                    grabGuess[ltrIndex].innerHTML = "    " + answered;
                    leftOver.splice(ltrIndex, 1)
                    leftOver.splice(ltrIndex,0,answered);
                    alreadyGuessed.push(answered)
                    console.log('Correct')
                    // console.log(leftOver)
                    winOrLose()
                    for (var i = ltrIndex + 1; i < toCompare.length; i++) {
                        if (answered === toCompare[i]) {
                            grabGuess[i].innerHTML = "    " + answered;
                            leftOver.splice(i, 1)
                            leftOver.splice(i,0,answered);
                            console.log(leftOver)
                            console.log('Correct')
                            winOrLose()
                        } 
                    }
                } else if (guessedAlready == true) {
                    console.log('Already Guessed')
                    var newEleme = document.createElement('h1');
                    newEleme.innerHTML = 'You Guessed That Already. Try Again!';
                    gameStatus.append(newEleme);
                    setTimeout(function(){ 
                        newEleme.remove()
                    }, 3000);
                    winOrLose()
                } else if(doesInclude == false) {
                    remGuess--
                    guessesLeft.innerHTML = remGuess
                    alreadyGuessed.push(answered)
                    chosenLetter.innerHTML = "    " + answered;
                    chosen.append(chosenLetter);
                    console.log('Guesses Left: ' + remGuess)
                    console.log('Incorrect')
                    winOrLose()
                }
            }
        }

    wordGen()
    guessMe()