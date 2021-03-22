// export default class App {
const gameBoard = document.getElementById('main');

const backgroundStyleComponent = document.createElement('div')
backgroundStyleComponent.classList.add('cityBackground')
let currentPlayerPosition = 'player-one'

const playerForwardMoveMappings = {
  'player-one': 'player-two',
  'player-two': 'player-three',
  'player-three': 'player-four',
  'player-four': 'player-five',
  'player-five': 'player-six',
  'player-six': 'player-seven',
  'player-seven': 'player-eight',
  'player-eight': 'player-nine',
  'player-nine': 'player-one',
}

const playerComponent = document.createElement('div')
const firePower = document.createElement('div');
firePower.classList.add('fire')

playerComponent.append(firePower)

playerComponent.style.left = playerComponent.style.left + 400
const playerLeftLegMiddleForward = document.createElement('div')
const playerRightForward = document.createElement('div')

playerComponent.classList.add('player', 'player-one');

playerComponent.appendChild(playerRightForward)
playerComponent.append(playerLeftLegMiddleForward)

let start;


const step = (timestamp) => {
  if (start === undefined)
    start = timestamp; 2
  const elapsed = timestamp - start;

  gameBoard.appendChild(backgroundStyleComponent)
  backgroundStyleComponent.appendChild(playerComponent)

  if (elapsed < 2000) {
    window.requestAnimationFrame(step);
  }
}


document.addEventListener('keydown', (event) => {

  if (event.key === "ArrowDown" ||
    event.key === "ArrowRight" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowLeft") {
    movePlayer({ keyPress: event.key })
  }

  if (event.code === "Space") {
    movePlayer({ keyPress: event.code })
  }

})

const movePlayer = ({ keyPress }) => {

  switch (keyPress) {
    case 'Space':
      handleFire()
      break;
    case 'ArrowLeft':
      if (backgroundStyleComponent.style.left === '' || backgroundStyleComponent.style.left === '0px') return null
      moveBackground(backgroundStyleComponent.style.left, 50)
      movePlayerPosition('backward')
      break;
    case 'ArrowRight':
      if (backgroundStyleComponent.style.left === '-7300px') return null
      moveBackground(backgroundStyleComponent.style.left, -50)
      movePlayerPosition('forward')
      break;
    case 'ArrowUp': // jump
      playerComponent.classList.remove('player-jump')
      jumpPlayer();
      break;
    default:
      break;
  }
}

const movePlayerPosition = (type) => {

  playerComponent.classList.remove(currentPlayerPosition);
  currentPlayerPosition = playerForwardMoveMappings[currentPlayerPosition]
  switch (type) {
    case 'forward':
      playerComponent.classList.remove('player-move-backwards')
      playerComponent.style.left = splitAndAdd(playerComponent.style.left + 400, 50)
      break;
    case 'backward':
      playerComponent.classList.add('player-move-backwards')
      if (playerComponent.style.left === '40px') break
      playerComponent.style.left = splitAndAdd(playerComponent.style.left + 400, -50)
      break;
    default:
      break;
  }

  playerComponent.classList.add(currentPlayerPosition)

}

const handleFire = () => {
  if (playerComponent.classList.contains('player-one')) {
    playerComponent.classList.remove('player-one')
  } else {
    playerComponent.classList.remove(currentPlayerPosition)
  }
  playerComponent.classList.add('player-fire')
  firePower.classList.add('fire-on')

  setTimeout(() => {
    firePower.classList.remove('fire-on')
  }, 1000);
}

const jumpPlayer = () => {
  playerComponent.classList.add('player-jump')

  if (currentPlayerPosition === 'player-jump') {
    playerComponent.classList.remove(currentPlayerPosition)
  } else {
    playerComponent.classList.remove(currentPlayerPosition)
  }

  setTimeout(() => {
    playerComponent.classList.remove('player-jump')
    playerComponent.classList.add('player-one')
  }, 1000)

  // playerComponent.style.left = splitAndAdd(playerComponent.style.left + 400, 200)
}


const getPlayerPosition = (currentPlayerSpirit) => {

}

const moveBackground = (current, diff) => {
  backgroundStyleComponent.style.left = splitAndAdd(current, diff)
  // backgroundStyleComponent.style.transition = `${backgroundStyleComponent.style.left} 2s`;
}

const splitAndAdd = (current, diff) => {
  let splitCurrent = current.split("px")
  return `${parseInt(splitCurrent[0] || 0) + diff}px`
}


window.requestAnimationFrame(step);
// let tet = new App()
