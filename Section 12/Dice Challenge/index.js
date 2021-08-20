let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

// Set the dice images according to which numbers were rolled
document
  .querySelector('.img1')
  .setAttribute('src', `images/dice${randomNumber1}.png`);
document
  .querySelector('.img2')
  .setAttribute('src', `images/dice${randomNumber2}.png`);

// Set the h1 to announce the appropriate winner
if (randomNumber1 > randomNumber2) {
  document.querySelector('h1').innerHTML = '🚩 Player 1 Wins!';
} else if (randomNumber2 > randomNumber1) {
  document.querySelector('h1').innerHTML = 'Player 2 Wins! 🚩';
} else {
  document.querySelector('h1').innerHTML = 'Draw!';
}
