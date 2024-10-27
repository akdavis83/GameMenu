// Initialize game
const canvas = document.getElementById('gameCanvas');
const gameEngine = new GameEngine(canvas);

// Create player
const player = new Player(100, 100);
gameEngine.player = player;

// Input handling
const keys = {};
const mouse = { x: 0, y: 0 };

window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => delete keys[e.code]);
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left - gameEngine.camera.x;
  mouse.y = e.clientY - rect.top - gameEngine.camera.y;
});

// Spawn enemies periodically
setInterval(() => {
  if (!gameEngine.isPaused) {
    const x = Math.random() * 90000;
    const y = Math.random() * 90000;
    const distance = Math.sqrt(
      Math.pow(x - player.x, 2) + 
      Math.pow(y - player.y, 2)
    );
    
    if (distance > 500) {
      gameEngine.enemies.push(new Enemy(x, y));
    }
  }
}, 1000);

// Spawn power-ups periodically
setInterval(() => {
  if (!gameEngine.isPaused) {
    const types = ['speed', 'teleport', 'attack'];
    const type = types[Math.floor(Math.random() * types.length)];
    const x = Math.random() * 90000;
    const y = Math.random() * 90000;
    
    gameEngine.powerups.push(new PowerUp(x, y, type));
  }
}, 10000);

// Start the game
gameEngine.start();

// Load and play background music
const backgroundMusic = new Audio('../audio/awesomeness.wav');
backgroundMusic.loop = true;
backgroundMusic.play();