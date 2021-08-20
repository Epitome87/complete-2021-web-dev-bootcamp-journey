const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];

let hasGameStarted = false;
let level = 0;

$(document).keypress(function () {
  if (!hasGameStarted) {
    hasGameStarted = true;
    $('#level-title').text('Level 0');
    nextSequence();
  }
});

// setInterval(() => {
//   nextSequence();
// }, 500);

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $(document).css('color', randomChosenColor);
  $('#' + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$('.btn').click(function () {
  const userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');

  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed');
  }, 100);

  // Uncomment these out if you wish to cheat! ;)
  // console.log('Entered Pattern:', userClickedPattern);
  // console.log('Game Pattern:', gamePattern);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');

    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key to Restart');

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  hasGameStarted = false;
}
