const uw = require('you-win')
const {Phone, World, Sound, Sprite, Text, Polygon, Rect} = uw

await uw.begin()

// Make the world
var world = new World
world.title = ''
world.background = 'black'
world.height = 1000
world.width = 500


var pointArr = []
i = 0;
while (i < 5) {
  spawnPoint()
  i++;
}


function spawnPoint() {
  var point = new Sprite

  point.costume = "🔴"
  point.posX = uw.randomInt(0+25, world.width-25)
  point.posY = uw.randomInt(0+25, world.height-25)
  point.justPoked = false

  point.onTap(e => {
    point.costume = "⚪"

    pointArr.forEach((p, i) => {
      if (p.justPoked) {

        var r = new Rect
        r.fill = "yellow"

        r.width = 10
        deltaX = p.posX - point.posX
        deltaY = p.posY - point.posY
        r.height = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))
        r.angle = 90-(180/Math.PI) * Math.atan2(deltaY, deltaX)
        r.posX = (p.posX+point.posX)/2
        r.posY = (p.posY+point.posY)/2

        p.justPoked = false;
      }
    });

    point.justPoked = true;

  })

  // point.forever(() => {
  // })

  pointArr.push(point);


}
