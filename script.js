// global variables
let level, answer, score;
const levelArr = document.getElementsByName("level"); //why does this one need getelementsbyname and not other ones?
const scoreArr = [];
date.textContent = time();

// add event listeners
playBtn.addEventListener("click", play); // why don't we add function()
guessBtn.addEventListener("click", makeGuess);

function play(){ //this disables level select, enables guessing, random # based on level, sets score to 0 every new game)
    score = 0;
    guess.disabled = false;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    // not doing giveUp rn (we gotta figure out ourselves)
    
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){ //you don't need to include true
            level = levelArr[i].value; // 3, 10, or 100
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = "Guess a number from 1-" + level + "!";
    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer; // js for our purposes
}

function makeGuess(){
    let userGuess = parseInt(guess.value); // parseInt looks for numbers in the string, number tries to make the whole thing a number
    if(isNaN(userGuess) || userGuess <1 || userGuess > level){
        msg.textContent = "Enter a VALID #1-" + level;
        return; // make sure none of the other parts of the func occurs
    }
    score++; // valid guess add 1 to score
    if(userGuess > answer){
        msg.textContent = userGuess + " is too high! Guess again...";
    }
    else if(userGuess < answer){
        msg.textContent = userGuess + " is too low! Guess again...";
    }
    else{
        msg.textContent = "You got it, it took you " + score + " tries :) Press play to play again."
        updateScore();
        reset();
    }
}

function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i=0; i<levelArr.length; i++){ //resets level select
        levelArr[i].disabled = false;
    }
}

function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b); //sorts by increasing order
    let sum = 0;
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: " + scoreArr.length; //only does this when you get the right value bc updateScore() is in the makeGuess else{} 
    for(let i=0; i<scoreArr.length; i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: " + avg.toFixed(2);
}
function time(){
    let d = new Date();
    // concatenate a string with all teh date info
    d = d.getFullYear() + " " + d.getTime();
    return d;
}