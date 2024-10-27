// Causes the floor to be animated and to switch between two tile patterns:

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

        // Randomly choose between tileImage and tileImage2
        var img = Math.random() > 0.1 ? tileImage : tileImage2;

        // Ensure both images are loaded before drawing
        if (img.complete) {
            ctx.drawImage(img, this.sx, this.sy, this.width, this.height);
        } else {
            img.onload = () => {
                ctx.drawImage(img, this.sx, this.sy, this.width, this.height);
            };
        }
    };
};

// Debugger for enemies
function debugEnemies() {
    console.log("Total enemies:", enemies.length);
    console.log("Stationary enemies:", enemies.filter(e => e.isStationary).length);
  }
  
  // Call this function every few seconds
  setInterval(debugEnemies, 5000);

//   Debugger 2
function debugEnemies() {
    console.log("Total enemies:", enemies.length);
    console.log("Stationary enemies:", enemies.filter(e => e.isStationary).length);
    console.log("Enemy types:", enemies.map(e => e.isStationary ? "Stationary" : "Mobile"));
  }
  
  // Call this function periodically
  setInterval(debugEnemies, 5000);