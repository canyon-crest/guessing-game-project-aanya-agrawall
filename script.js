// GLOBAL VARIABLES
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const timeArr = [];
date.textContent = getTime();

// EVENT LISTENERS
playBtn.addEventListener("click", play); // why don't we add function()
guessBtn.addEventListener("click", makeGuess);
giveUp.addEventListener("click", givingUp);
enterName.addEventListener("click", setName);

function setName(){
    username = document.getElementById("username").value;
    username = username.charAt(0).toUpperCase() + username.substring(1).toLowerCase();
    enterName.disabled=true;
    document.getElementById("username").disabled=true;
    nameInput.textContent = username + "'s Game:";
}

function play(){ //this disables level select, enables guessing, random # based on level, sets score to 0 every new game)
    score = 0;
    guess.disabled = false;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUp.disabled = false;
    startTimer();
    // not doing giveUp rn (we gotta figure out ourselves)
    
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){ //you don't need to include true
            level = levelArr[i].value; // 3, 10, or 100
        }
        levelArr[i].disabled = true;
    }
    msg.textContent = username + ", guess a number from 1-" + level + "!";
    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer; // js for our purposes
}

function startTimer(){
    let seconds = 0;
    

}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    let temperature = "";
    if(isNaN(userGuess) || userGuess <1 || userGuess > level){
        msg.textContent = username + ", enter a VALID #1-" + level;
        return; // make sure none of the other parts of the func occurs
    }
    score++; // valid guess add 1 to score
    
    // all the absolute value stuff
    if(level == 3){
        if(Math.abs(answer - userGuess) == 1){ temperature = "You're hot!"; }
        else{ temperature = "You're cold."; }
    }
    else if(level == 10){
        if(Math.abs(answer - userGuess) == 1){ temperature = "You're hot!"; }
        else if(Math.abs(answer - userGuess) <=3){ temperature = "You're warm :)"}
        else{ temperature = "You're cold." }
    }
    else{
        if(Math.abs(answer - userGuess) <=5){ temperature = "You're hot!"; }
        else if(Math.abs(answer - userGuess) <= 10){ temperature="You're warm :)"}
        else{ temperature = "You're cold."}
    }
    
    if(userGuess > answer){
        msg.textContent = username + ", your guess, " + userGuess + ", is too high. " + temperature + " Guess again...";
    }
    else if(userGuess < answer){
        msg.textContent = username + ", your guess, " + userGuess + " is too low. " + temperature + " Guess again...";
    }
    else{
        msg.textContent = username + ", you got it! It took you " + score + " tries :) Press play to play again."
        updateScore();
        reset();
        giveUp.disabled = true;
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

function givingUp(){
    score = parseInt(level);
    msg.textContent = "You've given up! Your score is " + level + ". Press play to play again!";
    updateScore();
    reset();
    giveUp.disabled = true;
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

function getTime(){
    let d = new Date();
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let suffix = "";
    if ( d.getDate() == 1 || d.getDate() == 21 || d.getDate() == 31 ){ suffix = "st"; }
    else if( d.getDate() == 2 || d.getDate() == 22 ){ suffix = "nd"; }
    else if( d.getDate() == 3 || d.getDate() == 23){ suffix = "rd"; }
    else{ suffix = "th"; }

    d = monthArr[d.getMonth()] + " " + d.getDate() + suffix + ", " + d.getFullYear() + ", ";
    
    time = new Date();
        h = time.getHours()%12;
        m = time.getMinutes();
        s = time.getSeconds();
        if ( s < 10 ) { s = "0" + s; }
        if (m < 10) { m = "0" + m;} 
        document.getElementById("date").innerHTML = d + h + ":" + m + ":" + s;
        setInterval(getTime, 1000);
}