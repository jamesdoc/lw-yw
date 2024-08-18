const uw = require('you-win')
const {Phone, World, Sprite, Text, Polygon} = uw

// Load everything we need
await uw.begin()

// Make the world
var world = new World
world.title = ''
world.background = 'black'

var speed = 2
var carriageCount = 0
var sWidth = 35
var trainHistory = []

var train = new Sprite
train.costume = '🚂'
train.direction = 'D'

var gameEnded = false

var rollingStock = []

setTimeout(function () {
  passengerHandler()
}, 1000);

train.forever(() => {

  // Has the train left the edge
  if (isOutOfBounds(train)) {
    gameOver(train);
    return false
  }

  // Has the train hit itself?
  for (let i = 0; i < rollingStock.length; i++) {
    if (i != 0 && train.isTouching(rollingStock[i])) {
      gameOver(train);
      return false
    }
  }

  trainHistory.push({
    posX: train.posX,
    posY: train.posY,
    angle: train.angle
  });

  handleDirection(train);

  handleCarriages();

})


function handleDirection(car) {
  if (train.direction == 'L') {
    car.posX -= speed
    car.angle = 0
  }

  if (train.direction == 'R') {
    car.posX += speed
    car.angle = 180
  }

  if (train.direction == 'U') {
    car.posY += speed
    car.angle = 90
  }

  if (train.direction == 'D') {
    car.posY -= speed
    car.angle = 270
  }
}

function handleCarriages() {
  var frameCounter = trainHistory.length;
  rollingStock.forEach((c, i) => {

    frameCounter = frameCounter -= 20

    var previousCarriage = train
    if (i > 0) {
      previousCarriage = rollingStock[i-1];
    }

    // TODO tidy up
    console.log(trainHistory);

    c.direction = previousCarriage.direction

    c.posX = trainHistory[frameCounter].posX
    c.posY = trainHistory[frameCounter].posY
    c.angle = trainHistory[frameCounter].angle
  });
}

function isOutOfBounds(car) {
  if (car.posX <= 0 || car.posY <= 0 || car.posX >= world.width || car.posY >= world.height) {
    return true
  }

  return false
}

function gameOver() {

  if (gameEnded) { return }

  gameEnded = true
  train.angle = uw.randomInt(1, 360)

  rollingStock.forEach((c) => {
    c.angle = uw.randomInt(1, 360)
  })

  var goText = new Text
  goText.text = 'Game over'
  goText.fill = 'white'

  goText.forever(() => {
    goText.posY += 2;

    if(isOutOfBounds(goText)) {
      location.reload();
      return false
    }
  })
}

function passengerHandler() {
  var passenger = new Sprite
  passenger.lower()
  passenger.costume = uw.randomChoice(['🧒', '👧', '🧑', '👨', '👩', '🧓', '👴', '👵'])
  passenger.posX = uw.randomInt(50, world.width-50)
  passenger.posY = uw.randomInt(50, world.height-50)

  passenger.forever(() => {
    if (passenger.isTouching(train)) {
      passenger.destroy();
      carriageCount++;
      rollingStock.push(addCarriage())
      passengerHandler();
      return false;
    }
  })
}

function addCarriage() {
  var carriage = new Sprite
  carriage.costume = '🚋'
  carriage.direction = ''
  return carriage
}

document.addEventListener("keydown", (event) => {
  switch (event.code) {
    case 'ArrowUp':
      train.direction = 'U'
      turn = true;
      break
    case 'ArrowDown':
      train.direction = 'D'
      turn = true;
      break
    case 'ArrowRight':
      train.direction = 'R'
      turn = true;
      break
    case 'ArrowLeft':
      train.direction = 'L'
      turn = true;
      break
  }
});

// function getDirectionOfPrevious(currentIndex) {
//   console.log(currentIndex);
//   console.log(rollingStock[currentIndex-1])
// }
