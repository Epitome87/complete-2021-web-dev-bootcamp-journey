const buttons = document.querySelectorAll('.drum');

const sounds = [
  'crash',
  'kick-bass',
  'snare',
  'tom-1',
  'tom-2',
  'tom-3',
  'tom-4',
];

buttons.forEach((button, index) => {
  button.addEventListener('click', (event) => {
    let audio = new Audio(`sounds/${sounds[index]}.mp3`);
    audio.play();
    buttonAnimation(event.currentTarget.innerHTML);
  });
});

document.addEventListener('keypress', (event) => {
  makeSound(event.key);
});

function makeSound(key) {
  switch (key) {
    case 'w':
      buttons[0].click();
      break;
    case 'a':
      buttons[1].click();
      break;
    case 's':
      buttons[2].click();
      break;
    case 'd':
      buttons[3].click();
      break;
    case 'j':
      buttons[4].click();
      break;
    case 'k':
      buttons[5].click();
      break;
    case 'l':
      buttons[6].click();
      break;
  }
}

function buttonAnimation(currentKey) {
  const activeButton = document.querySelector(`.${currentKey}`);
  activeButton.classList.add('pressed');

  setTimeout(() => {
    activeButton.classList.remove('pressed');
  }, 100);
}
