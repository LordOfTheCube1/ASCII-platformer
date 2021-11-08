// Welcome to the ASCII platformer source code
// Made by LordOfTheCube1 (discord LordOfTheCube#0419)
// See LICENSE before using any code
// This cannot be run locally, it must be run on a server (if you want to run it on localhost see README.md)
// Enjoy!


// to do: limit x-movement in the air
//====================================
// ASCII Character Set
//====================================
// all if the whitespace is to make sure that everything lines up nicely (kinda)
let floor = '&nbsp;=';
let wall = '|&nbsp;&nbsp;';
let death = 'X';
let playerHead = 'O';
let playerBody = '&nbsp;|&nbsp;';
let playerFeet = "/ \\";
let empty = "&nbsp;&nbsp;&nbsp;"; // basically just a triple space, but will actually be displayed as whitespace
let dead; // the text that says that you have died, will be automatically acquired once the game has loaded
//====================================
// Game Initilization
//====================================

// Values


let Game = {};
Game.matrix = new Matrix(30, 100); // The actual board that represents what the player sees
Game.tickLength = 50; // How often the game will update in milliseconds (this is 20 frames per second);
Game.time = 0; // This is how many "ticks" the game has run for (divide this number by 20 to get seconds)
Game.timedout = false;
Game.level = null;
fetch("level.json").then(response => response.json()).then(data => Game.level = data);
class GameStage {
  constructor(type) {
    this.type = type;
    if(this.type == 'welcome screen') {
      this.value = 0;
    } else if (this.type == 'playing game') {
      this.value = 1;
    } else {
      this.value = 2;
    }
  }
} // really didn't need to make a class for this but i felt like it so lol
Game.stage = new GameStage('welcome screen');


// Functions


Game.setTickLength = function(value) {
  Game.tickLength = value;
}

Game.setTicksPerSecond = function(value) {
  Game.tickLength = Math.floor(1000 / value);
}

// Turn the table of values into the ASCII string that will be displayed
Game.getString = function() {

  let string = '';
  if(Game.stage.value == 0) {
    string = '<h1> Welcome to the ASCII Platformer! </h1> <br> <p> This was made by LordOfTheCube#0419 </p> <p> Press \'p\' to start the game </p>';
  }
  if(Game.player.dead) {
    return dead;
  }
  for(let i = 0; i < Game.matrix.rows; i++) {
      for(let j = 0; j < Game.matrix.cols; j++) {
        string += Game.matrix.values[i][j];
      }
      string += `<br>`;
  }
  return string;
}

Game.render = function() {
  Game.matrix.initialize(empty); // Set every value to an empty space
  Game.matrix.setRow(29, floor); // Set the bottom row to =
  Game.matrix.setRow(0, death); // Set the top row to X
  Game.renderLevel();
  Game.player.render();
  document.body.innerHTML = Game.getString();
}

Game.start = function() {
  Game.stage = new GameStage('playing game');
  Game.render();
  Game.loop();
}

Game.timeout = function() {
  Game.timedout = Game.timedout ? false : true;
  if(Game.timedout == false) Game.loop();
}
//====================================
// Level Maker
//====================================
Game.generateWall = function(bottom, top, x, cut) { // top will be a "=" unless "cut" is true (default is false)
  for(let i = bottom; i > (top-1); i--) {
    Game.matrix.values[i][x] = wall;
  }
  if(!cut) {
    Game.matrix.values[top][x] = floor;
  } else {
    Game.matrix.values[top][x] = wall;
  }
}

 Game.renderLevel = function() {


        Game.level.forEach(e => {

         if(e.type == "wall") {
            Game.generateWall(e.bottomY, e.topY, e.x, e.cut);
          }
          else if (e.type == "floor") {
            Game.matrix.values[e.bottomY][e.x] = floor;
          }
        })




 }
//====================================
// Player
//====================================

Game.player = {
  dead: false,
  location: {
    x: 0, // which column the player is in
    y: 28, // the exact y-value at which the player's feet are at, used to calculate vertical movement accurately
    displayY: 28, // which row the player's feet are in
    velocity: 0, // the upwards velocity of the player, used to calculate its next position
    /* My intention is to add an X-Velocity value as well, which would mean that you cannot change your movement while in the air, so you have to start moving before jumping.
    However, this may prove to be a bit buggy given the slow framerate, and the lack of visible precision of the player's location*/
  },
  render: function() {
    if(Game.matrix.values[this.location.displayY-3][this.location.x] != empty && this.location.velocity > 0) this.location.velocity = 0; // if there is something above the player's head, stop going upwards
    this.location.y -= this.location.velocity / (1000 / Game.tickLength); // Move up / down
    this.location.velocity -= 2 / (1000/ Game.tickLength); // Basic law of gravity... if the player is jumping it will slow down, if it is falling it will speed up
    if(Game.matrix.values[this.location.displayY + 1][this.location.x] != empty && this.location.velocity < 0) this.location.velocity = 0; // if there is something below the player's feet, stop going downwards
    if(this.location.velocity == 0) this.location.y = Math.floor(this.location.y); // once the player lands, it can't be above the ground
    this.location.displayY = Math.floor(this.location.y);
    Game.matrix.values[this.location.displayY][this.location.x] = playerFeet;
    Game.matrix.values[this.location.displayY-1][this.location.x] = playerBody;
    Game.matrix.values[this.location.displayY-2][this.location.x] = playerHead;
  },
  moveRight: function() {
    if(this.location.x === 99) return; // if the player is at the edge of the world, it can't move
    if(Game.matrix.values[this.location.displayY][this.location.x + 1] != empty ||
      Game.matrix.values[this.location.displayY - 1][this.location.x + 1] != empty ||
      Game.matrix.values[this.location.displayY - 2][this.location.x + 1] != empty)
      return; // If there are any blocks to the right of the player, it can't move more right without jumping
    this.location.x++;
  },
  moveLeft: function() {
    if(this.location.x === 0) return; // if the player is at the edge of the world, it can't move
    if(Game.matrix.values[this.location.displayY][this.location.x - 1] != empty ||
    Game.matrix.values[this.location.displayY - 1][this.location.x - 1] != empty ||
    Game.matrix.values[this.location.displayY - 2][this.location.x - 1] != empty)
    return; // If there are any blocks to the left of the player, it can't move without jumping
    this.location.x--;
  },
  jump: function() {
    if(this.location.velocity != 0) return "already moving"; // if it's already jumping/falling, it can't jump (maybe i will add a double jump thing as demonstration of the modding api soon)
    if(Game.matrix.values[this.location.displayY-3][this.location.x] != empty) return "blocked"; // if there's something above the player's head, it can't jump
    if(this.dead) return "dead"; // if the player has died, it obviously can't jump
    this.location.velocity += 2.5;
  },
  die: function() {
    Game.stage = new GameStage('dead');
    this.dead = true;
    this.location.x = 0;
    this.location.y = 28;
    this.location.displayY = 28;
    this.location.velocity = 0;
  }
}
// On keypress, do stuff
document.addEventListener("keypress", function onEvent(event) {
  // console.log("Key pressed"); // debugging
    if (event.key === "a") {
        Game.player.moveLeft();
    } else if (event.key === "d") {
      Game.player.moveRight();
    } else if(event.key === "w") {
      Game.player.jump();
    }
    else if (event.key === "t") {
        Game.timeout();
    }
    else if(event.key === "p") {
      Game.start();
    }
})
//====================================
// Main Loop
//====================================
Game.loop = function() {
  if(Game.timedout) return;
  Game.render();
  Game.time++;
  setTimeout(Game.loop, Game.tickLength);
}

//====================================
// End!!!1!1!111!1
//====================================
function load() {
  dead = "<pre>" + document.getElementById("death").innerHTML + "</pre>";
  Game.render() // Let's start this thing!
}
