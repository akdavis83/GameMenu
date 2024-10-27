// TO DO: 
// 
/// Have enemies shoot projectiles from a distance and do damage to the player 
// 
// 
// 

// Shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback){
              window.setTimeout(callback, 1000/60);
            };
  })();
  
  // Setup the canvas
  var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
  
  canvas.width = 1250;
  canvas.height = 650;
  
  document.body.appendChild(canvas);
  
  // Movement controls
  var keys = {};
  window.addEventListener('keydown', function(e) {
      keys[e.keyCode] = true;
      e.preventDefault();
  });
  window.addEventListener('keyup', function(e) {
      delete keys[e.keyCode];
  });
  
  // Keeps the player in bounds
  var math = function() {
    this.clamp = function(i, min, max) {
      return Math.max(Math.min(i, max), min);
    };
  };
  
  var Camera = function() {
    this.camera = function(entity) {
      this.x = (canvas.width / 2) - entity.x;
      this.y = (canvas.height / 2) - entity.y;
    };
  
    this.getPosition = function(entity) {
      this.x = (canvas.width / 2) - entity.x;
      this.y = (canvas.height / 2) - entity.y;
    };
  };
  
  var ent = function() {
      this.load = false;
      this.imgX = 0;
  
      this.sprite = function(src, srcX, srcY, dtx, dty, x, y, width, height, speed) {
          this.src = src;
          this.srcX = srcX;
          this.srcY = srcY;
          this.dtx = dtx;
          this.dty = dty;
          this.x = x;
          this.y = y;
          this.width = width;
          this.height = height;
          this.speed = speed;
  
          this.image = new Image();
          this.image.src = src;
  
          this.render = function() {
              ctx.drawImage(this.image, this.srcX, this.srcY, this.dtx, this.dty, this.x, this.y, this.width, this.height);
          };
      };
  
      this.update = function() {};
  
      this.move = function() {
          if (87 in keys) { // W 
              this.spriteRoll(512, 8);
              this.y -= this.speed;
          }
          if (83 in keys) { // S
              this.spriteRoll(640, 8);
              this.y += this.speed;
          }
          if (65 in keys) { // A
              this.spriteRoll(576, 8);
              this.x -= this.speed;
          }
          if (68 in keys) { // D
              this.spriteRoll(704, 8);
              this.x += this.speed;
          }
          if (32 in keys) { // Spacebar
              attack = true;
              attackEnemy();
          }
      };
  
      this.spriteRoll = function(srY, maxLength) {
          this.srcY = srY;
          this.imgX += 1;
          this.srcX = this.dtx * this.imgX;
  
          if (this.imgX >= maxLength) {
              this.imgX = 0;
          }
      };
  
      this.bounds = function() {
          this.x = m.clamp(this.x, 0 - this.width/2 + 20, 90000 - this.width/2);
          this.y = m.clamp(this.y, 0 - this.height/2 + 20, 90000 - this.height/2);
      };
  };
  
  // Player's starting position
  var playerStartX = 100;
  var playerStartY = 100;
  
  // Define minimum distance between player and endGame marker
  var minDistance = 500;
  
  // Function to generate valid endGame location
  function generateEndGameLocation() {
      var x, y;
      do {
          x = Math.random() > 0.5 ? 0 : 90000;
          y = Math.random() > 0.5 ? 0 : 90000;
          var distance = Math.sqrt(Math.pow(x - playerStartX, 2) + Math.pow(y - playerStartY, 2));
      } while (distance < minDistance);
      return { x: x, y: y };
  }
  var endGameLocation = generateEndGameLocation();
  
  // Function to check if player reached end game
  function checkEndGame() {
      if (Math.abs(player.x - endGameLocation.x) < 64 && Math.abs(player.y - endGameLocation.y) < 64) {
          window.location.href = "index15.html"; // Redirect to next page
      }
  }
  
  // Create player
  var player = new ent();
  player.sprite("https://opengameart.org/sites/default/files/lpcmalegoldenarmorpreview.png", 0, 640, 64, 64, 100, 100, 62, 62, 100);
  
  player.image.onload = function() {
      player.load = true;
  };
  
  var tileImage = new Image();
  tileImage.src = '../custom1/Grass Texture 1.jpg';
  var tileImage2 = new Image();
  tileImage2.src = '../Minecraft/Wood.PNG';
  
  this.draw = function() {
      var img = Math.random() > 0.5 ? tileImage : tileImage2;  // Randomly choose a tile
      ctx.drawImage(img, this.sx, this.sy, this.width, this.height);
  };
  
  
  // Health and stats
  var playerHealth = 1000000000;
  var playerStats = {
      attack: 100000000,
      defense: 5000000000000
  };
  
  function drawHealthNumber(x, y, playerHealth, health) {
    ctx.fillStyle = "white";              // Set text color
    ctx.font = "16px Arial";              // Set text font and size
    ctx.textAlign = "center";             // Align text to center to make it more readable
    ctx.fillText("HP: " + playerHealth, x, y);  // Display health at the specified (x, y) coordinates
  }
  
  
  // Enemy array
  var enemies = [];
  
  function createEnemy(x, y, health, isStationary) {
      if (isStationary) {
        createStationaryEnemy(x, y, health);
      } else {
        var enemy = new ent();
        var enemyTypes = [
          "../custom1/Bud.png",
          "../custom1/Chomper.png",
          "../custom1/Cub.png",
          "../custom1/Cub.png",
          "../custom1/Flux.png",
          "../custom1/Fungus.png",
          "../custom1/Gator.png",
          "../custom1/Goo.png",
          "../custom1/Goofball.png",
          "../custom1/Harpy.png",
          "../custom1/Hornet.png",
          "../custom1/Husk.png",
          "../custom1/Imp.png",
          "../custom1/Peeper.png",
          "../custom1/Possessed.png",
          "../custom1/Possessed.png",
          "../custom1/Rage.png",
          "../custom1/Seeker.png",
          "../custom1/Sevalecan.png",
          "../custom1/Stomper.png",
          "../custom1/Toad.png",
          "../custom1/Treant.png",
          "../custom1/Treant.png",
          "../custom1/turtle.png",
          "../custom1/Viper.png",
          "../custom1/Vulture.png",
          "../custom1/Wasp.png",
        ];
        var randomType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        enemy.sprite(randomType, 0, 0, 256, 256, x, y, 256, 256, 10);
        enemy.load = true;
        enemy.health = 200000000000;
        enemies.push(enemy);
      }
    }
  
  function createStationaryEnemy(x, y, health) {
      var enemy = new ent();
      enemy.sprite("../custom1/Stump.png", 0, 0, 64, 64, x, y, 64, 64, 20);
      enemy.load = true;
      enemy.health = 200000000000;
      enemy.isStationary = true;
      enemies.push(enemy);
      
    }
    // Add this after the enemies array declaration
  function addHardcodedEnemies() {
      createEnemy(550, 550, 20000, true);
      createEnemy(600, 600, 25000, true);
      createEnemy(600, 600, 30000, true);
      createEnemy(650, 650, 20000, true);
      createEnemy(620, 520, 25000, true);
      createEnemy(700, 700, 30000, true);
      createEnemy(1000, 1000, 20000, true);
      createEnemy(2000, 2000, 25000, true);
      createEnemy(3000, 3000, 30000, true);
      createEnemy(550, 550, 20000, true);
      createEnemy(600, 600, 25000, true);
      createEnemy(600, 600, 30000, true);
      createEnemy(650, 650, 20000, true);
      createEnemy(620, 520, 25000, true);
      createEnemy(700, 700, 30000, true);
      createEnemy(1000, 1000, 20000, true);
      createEnemy(2000, 2000, 25000, true);
      createEnemy(3000, 3000, 30000, true);
      
    }
    
    // Call this function to add the hardcoded enemies
    addHardcodedEnemies();
    
  // Debugger for enemies
  function debugEnemies() {
      console.log("Total enemies:", enemies.length);
      console.log("Stationary enemies:", enemies.filter(e => e.isStationary).length);
    }
    
    // Call this function every few seconds
    setInterval(debugEnemies, 5000);
  
  // Function to generate random enemies
  function generateRandomEnemy() {
      var x, y, distance;
      do {
          x = Math.floor(Math.random() * 90000);
          y = Math.floor(Math.random() * 90000);
          distance = Math.sqrt(Math.pow(x - player.x, 2) + Math.pow(y - player.y, 2));
      } while (distance < 500);
      var health = Math.floor(Math.random() * 100) + 50;
      createEnemy(x, y, health);
  }
  
  // Spawn an enemy every 5 seconds
  setInterval(function() {
      generateRandomEnemy();
  }, 1);
  
  // Attack logic
  var attack = false;
  var attackSprite = new Image();
  attackSprite.src = "../custom1/Whirlpool.png";
  
  function attackEnemy() {
      enemies.forEach(function(enemy, index) {
          if (Math.abs(player.x - enemy.x) > 400 && Math.abs(player.y - enemy.y) > 400) {
              enemy.health -= playerStats.attack;  // Reduce enemy health
              if (enemy.health <= 0) {
                  enemies.splice(index, 1);  // Remove enemy if health is 0 or below
                  playerHealth = Math.min(playerHealth += 1000000000, 10000000000000000000000000000000000000);  // Reward player with health
                  playerStats.attack += 1000000000;  // Increase player attack power
              }
          }
      });
  }
  
  // Randomly increase enemy strength every 10 seconds
  setInterval(function() {
      enemies.forEach(function(enemy) {
          enemy.health += 10;  // Increase health
          enemy.speed += 0.1;  // Increase speed slightly
      });
  }, 1);
  
  // Enemy movement and AI behavior
  function updateEnemyBehavior(enemy) {
      var dx = player.x - enemy.x;
      var dy = player.y - enemy.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 50) {
          enemy.x += (dx / distance) * enemy.speed;
          enemy.y += (dy / distance) * enemy.speed;
      } else {
          playerHealth -= 1000000;  // Drain player health if too close
      }
  }
  
  // Tiles and map generation
  var tiles = function() {
      this.TILE_WIDTH = 30;
      this.TILE_HEIGHT = 30;
      this.x = 0;
      this.y = 0;
      this.width = 60;
      this.height = 60;
      this.draw = function() {
          this.sx = this.x * this.TILE_WIDTH;
          this.sy = this.y * this.TILE_HEIGHT;
          if (tileImage.complete) {
              ctx.drawImage(tileImage, this.sx, this.sy, this.width, this.height);
          } else {
              tileImage.onload = () => {
                  ctx.drawImage(tileImage, this.sx, this.sy, this.width, this.height);
              };
          }
      };
  };
  
  var Map = function() {
    this.ROWS = 3000;
    this.COLS = 3000;
    this.tilesArray = [];
  
    this.map = function() {
      for (var y = 0; y < this.COLS; y++) {
        for (var x = 0; x < this.ROWS; x++) {
          this.tilesArray[y * this.COLS + x] = new tiles();
          this.tilesArray[y * this.COLS + x].x = x;
          this.tilesArray[y * this.COLS + x].y = y;
        }
      }
    }
  
    this.tiles = function(cam, tWidth, tHeight) {
      for (var y = 0; y < this.COLS; y++) {
        for (var x = 0; x < this.ROWS; x++) {
          if (
            this.tilesArray[y * this.COLS + x].x * tWidth < -cam.x + canvas.width &&
            this.tilesArray[y * this.COLS + x].y * tHeight < -cam.y + canvas.width &&
            (this.tilesArray[y * this.COLS + x].x + 1) * tWidth > -cam.x &&
            (this.tilesArray[y * this.COLS + x].y + 1) * tHeight > -cam.y
          ) {
            this.tilesArray[y * this.COLS + x].draw();
          }
        }
      }
    }
  }
  var score = 0;
  
  
  // Load sound effects
  var shootSound = new Audio('shoot.mp3');
  var hitSound = new Audio('hit.mp3');
  var backgroundMusic = new Audio('../misc/Dream Raid Pack/Dream Raid Part I.mp3');
  
  // Play background music in a loop
  backgroundMusic.loop = true;
  backgroundMusic.play();
  function attackEnemy() {
      enemies.forEach(function(enemy, index) {
          if (Math.abs(player.x - enemy.x) < 400 && Math.abs(player.y - enemy.y) < 400) {
              shootSound.play();
              enemy.health -= playerStats.attack;
              if (enemy.health <= 0) {
                  hitSound.play(); // Play hit sound
                  enemies.splice(index, 1); // Remove enemy if health <= 0
                  playerHealth = Math.min(playerHealth + 1000000000, 100000000000000000000000000000000000000);
                  playerStats.attack += 1000000000;
                  score += 1; // Increment score
              }
          }
      });
  }
  
  function drawScoreAndHealth() {
    ctx.save(); // Save the current canvas state
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transformations to ensure it's drawn in absolute coordinates
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("LVL: " + Math.round(score / 10), 10, 30);  // Position the score at (10, 30) on the screen
    ctx.fillText("Health: " + playerHealth, 10, 60);
    ctx.restore(); // Restore the previous state
  }
  
  
  
  // Main game class
  var game = function() {
    this.m = new Map();
    this.t = new tiles();
    this.cam = new Camera();
  
    this.start = function() {
      this.m.map();
      this.cam.camera(player);
      this.loop();
    }
  
    this.loop = function() {
      this.update();
      this.render();
      requestAnimFrame(this.loop.bind(this));
    }
  
    function drawEndGameMarker() {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.6)'; // Red color with transparency
      ctx.fillRect(endGameLocation.x, endGameLocation.y, endGameLocation.width, endGameLocation.height);
    }
  
    var isPaused = false;
  
    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 80) { // P key for pause
            isPaused = !isPaused;
        }
    });
    
    function showPauseMenu() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText("Game Paused", canvas.width / 2 - 100, canvas.height / 2);
        ctx.fillText("Press 'P' to resume", canvas.width / 2 - 140, canvas.height / 2 + 40);
    }
    
   
    
    // Update game loop with obstacle check
    this.update = function() {
        if (!isPaused) {
            player.prevX = player.x;
            player.prevY = player.y;
            this.cam.getPosition(player);
            player.bounds();
            player.move(); 
            checkEndGame();
            enemies.forEach(function(enemy) {
                updateEnemyBehavior(enemy);
            });
            if (attack) {
                attackEnemy();
            }
        }
    };
    
    
    this.render = function() {
        if (isPaused) {
            showPauseMenu();
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(this.cam.x, this.cam.y);
            this.m.tiles(this.cam, this.t.TILE_WIDTH, this.t.TILE_HEIGHT);
            if (player.load) {
                player.render();
                drawHealthNumber(player.x, player.y - 20, playerHealth);
            }
            if (attack) {
                ctx.drawImage(attackSprite, player.x + 20, player.y - 1, 228, 228);
                setTimeout(() => { attack = false; }, 100);
            }
            enemies.forEach(function(enemy) {
                if (enemy.load) {
                    enemy.render();
                    drawHealthNumber(enemy.x, enemy.y - 20, enemy.health);
                }
            });
            drawEndGameMarker();
            ctx.restore();
            drawScoreAndHealth();
      }
    }
    
    
    }
    var m = new math();
    var g = new game();
    g.start();
  