let hit;
let timer = 60;
let pbotm = document.querySelector("#pbotm");
    pbotm.addEventListener('click', gameFun);
let score = document.querySelector("#score");
let newScore = 0;



function generateHit() {
    hit = Math.floor(Math.random() * 10);
    document.querySelector("#hitTarget").textContent = hit;
}

function timerFun() {
    var tmr = setInterval(() => {
        if(timer > 0) {
            timer--;
            document.querySelector("#timeCounter").textContent = timer;
            
        }else{
           clearInterval(tmr);
           pbotm.innerHTML = `
            <div style="color: wheat;"><h3>Game Over!</h3><h1>Final Score : ${score.textContent}</h1>
            <div style="display: flex; gap: 20px; align-items: center; margin: 0;">
                <label style="margin: 0;">Lets Smash the HighScore : </label><button class="btn btn-dark" style="color: gold;border: 1px solid;" id="replay">Go</button>
            </div>
            </div>`;

            if(Number(getCookie("bubbleHighScore")) < newScore || getCookie("bubbleHighScore") == '') {
                setCookie("bubbleHighScore", newScore, 10);
            }

            document.querySelector("#highscore").textContent = getCookie("bubbleHighScore");
            document.querySelector("#replay").addEventListener("click", function() {
                startTheGame();
            });
        }
    }, 1000);
}

function createBubbles () {
    let bubbles = ``;
    for (let i = 0; i < 108; i++) {
        rn = Math.floor(Math.random() * 10);
        bubbles += `<div class="bubble" style="color: ${getRandomColor()}">${rn}</div>`;        
    }
    pbotm.innerHTML = bubbles;
}

function gameFun(details) {
    // console.log(details.target.textContent);
    if(details.target.classList[0] == "bubble") {
        if(Number(details.target.textContent) == hit) {
            newScore += 10;
            score.textContent = newScore;
            generateHit();
            createBubbles();
        }else{
            if(newScore > 0) {
                newScore -= 10;
                score.textContent = newScore;
                generateHit();
                createBubbles();
            }
        }
    }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function startTheGame(){
    createBubbles ();
    timerFun();
    generateHit(); 
    timer = 60;
    newScore = 0;
    score.textContent = "0";
}

document.querySelector("#startButton").addEventListener("click", function(){
    startTheGame();
});




if(getCookie("bubbleHighScore")) {
    document.querySelector("#highscore").textContent = getCookie("bubbleHighScore");
}else{
    document.querySelector("#highscore").textContent = "0";
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}