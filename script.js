var score = 0;
var cross = 1;
var over_play = 1;

var audio = new Audio('game.mp3');
var over = new Audio('game_over.mp3');

document.onkeydown = function(e){
    // console.log("key code is: ",e.key);
    if(over_play){
        audio.play();
    }
    if (e.key=='ArrowUp') {
        var dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },700);
    }
    if (e.key=='ArrowRight'){
        var dino = document.querySelector('.dino');
        var dinoDem = dino.getBoundingClientRect();
        dino.style.left = dinoDem.left+110+'px';
    }
    if (e.key=='ArrowLeft'){
        var dino = document.querySelector('.dino');
        var dinoDem = dino.getBoundingClientRect();
        dino.style.left = dinoDem.left-110+'px';
    }
}

setInterval(() => {
    var dino = document.querySelector('.dino');
    var gameOver = document.querySelector('.gameOver');
    var obstacle = document.querySelector('.obstacle');
    var dinoDem = dino.getBoundingClientRect();
    var obstacleDem = obstacle.getBoundingClientRect();
    if (obstacleDem.left<=dinoDem.right&&
        obstacleDem.right>=dinoDem.left+10&&
        obstacleDem.top<=dinoDem.bottom)
    {
        obstacle.classList.remove('obstacleAni');
        document.querySelector('.gameOver').style.visibility = 'visible';
        audio.pause();
        if(over_play){
            over.play();
            over_play = 0;
        }
    } 
    else if(obstacleDem.right<dinoDem.left&&obstacleDem.left>0&&cross){
        score+=1;
        updateScore(score);
        cross = 0;
    }
    if(obstacleDem.left<0){
        cross = 1;
        var obstacleAni = document.querySelector('.obstacleAni');
        var obstacleAniStyle = window. getComputedStyle(obstacleAni);
        var currentDuration = parseFloat(obstacleAniStyle.animationDuration);
        var newDuration = currentDuration - 0.1 ;  
        if(currentDuration>2){
            obstacleAni.style.animationDuration = newDuration + "s";
        }
    }
}, 100);


function updateScore(score){
    document.querySelector('#scoreCnt').innerHTML = "Your Score: " + score;
}