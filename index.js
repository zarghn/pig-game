"use strict";

// these are for selecting element (EL = element)
let player1EL = document.querySelector(".p1");
let player2EL = document.querySelector(".p2");
let score1EL = document.querySelector("#score1");
let score2EL = document.getElementById("score2");
let diceEL = document.querySelector(".dice");
let btnNew = document.querySelector(".btnNew");
let btnRoll = document.querySelector(".btnRoll");
let btnHold = document.querySelector(".btnHold");
let right1EL = document.getElementById("right1");
let right2EL = document.getElementById("right2");

// for hiding dice IMGs
let score, rightScore, activeP, playing;

let all = function () {
  score = [0, 0];
  rightScore = 0;
  activeP = 0;
  playing = true;

  score1EL.textContent = 0;
  score2EL.textContent = 0;
  right1EL.textContent = 0;
  right2EL.textContent = 0;

  diceEL.classList.add("hidden");
  player1EL.classList.remove("p-winner");
  player2EL.classList.remove("p-winner");
  player1EL.classList.add("p-active");
  player2EL.classList.remove("p-active");
};
all();

let switchplayer = function () {
  document.getElementById(`right${activeP + 1}`).textContent = 0;
  rightScore = 0;
  activeP = activeP === 0 ? 1 : 0;
  player1EL.classList.toggle("p-active");
  player2EL.classList.toggle("p-active");
};
//when we click roll ( fuctions ) :
btnRoll.addEventListener("click", function () {
  // first select random dice ( 1 2 3 4 5 6 )
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // showing dice :
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // then ckeck it >> true : next player / false : add total
    if (dice !== 1) {
      rightScore = rightScore + dice;
      document.getElementById(`right${activeP + 1}`).textContent = rightScore;
    } else {
      switchplayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add to total score!
    score[activeP] += rightScore;
    document.getElementById(`score${activeP + 1}`).textContent = score[activeP];
    switchplayer();
    //winner !!! (=>100)
    if (score[activeP] >= 10) {
      document.querySelector(`.p${activeP + 1}`).classList.add("p-winner");
      document.querySelector(`.p${activeP + 1}`).classList.remove("p-active");
    } else {
      switchplayer();
    }
  }
});
btnNew.addEventListener("click", all);
