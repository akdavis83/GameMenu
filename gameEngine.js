class GameEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.camera = { x: 0, y: 0 };
      this.isPaused = false;
      this.score = 0;
      
      // Set canvas size
      this.canvas.width = 1250;
      this.canvas.height = 650;
      
      // Initialize game objects
      this.player = null;
      this.enemies = [];
      this.projectiles = [];
      this.powerups = [];
      
      // Bind event listeners
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      window.addEventListener('keydown', (e) => {
        if (e.code === 'KeyP') this.togglePause();
      });
    }
  
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) this.showPauseMenu();
    }
  
    showPauseMenu() {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = 'white';
      this.ctx.font = '30px Arial';
      this.ctx.fillText("Game Paused", this.canvas.width / 2 - 100, this.canvas.height / 2);
      this.ctx.fillText("Press 'P' to resume", this.canvas.width / 2 - 140, this.canvas.height / 2 + 40);
    }
  
    updateEnemies() {
      for (let i = this.enemies.length - 1; i >= 0; i--) {
        const enemy = this.enemies[i];
        enemy.update(this.player);
        
        // Remove dead enemies
        if (enemy.health <= 0) {
          this.enemies.splice(i, 1);
          this.score += 1;
        }
      }
    }
  
    updateProjectiles() {
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const projectile = this.projectiles[i];
        projectile.update();
        
        // Remove inactive projectiles
        if (!projectile.active) {
          this.projectiles.splice(i, 1);
          continue;
        }
  
        // Check collisions
        if (projectile.type === 'player') {
          this.enemies.forEach(enemy => {
            if (this.checkCollision(projectile, enemy)) {
              enemy.health -= projectile.damage;
              projectile.active = false;
            }
          });
        } else if (projectile.type === 'enemy') {
          if (this.checkCollision(projectile, this.player)) {
            this.player.health -= projectile.damage * (1 - this.player.defense / 100);
            projectile.active = false;
          }
        }
      }
    }
  
    updatePowerups() {
      for (let i = this.powerups.length - 1; i >= 0; i--) {
        const powerup = this.powerups[i];
        if (!powerup.active) {
          this.powerups.splice(i, 1);
          continue;
        }
  
        if (this.checkCollision(this.player, powerup)) {
          powerup.apply(this.player);
        }
      }
    }
  
    checkCollision(obj1, obj2) {
      return obj1.x < obj2.x + obj2.width &&
             obj1.x + obj1.width > obj2.x &&
             obj1.y < obj2.y + obj2.height &&
             obj1.y + obj1.height > obj2.y;
    }
  
    renderBackground() {
      // Calculate visible area
      const startX = Math.floor(-this.camera.x / 60);
      const startY = Math.floor(-this.camera.y / 60);
      const endX = startX + Math.ceil(this.canvas.width / 60) + 1;
      const endY = startY + Math.ceil(this.canvas.height / 60) + 1;
  
      // Draw visible tiles
      for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
          if (x >= 0 && x < 3000 && y >= 0 && y < 3000) {
            this.ctx.fillStyle = (x + y) % 2 === 0 ? '#1a1a1a' : '#242424';
            this.ctx.fillRect(x * 60, y * 60, 60, 60);
          }
        }
      }
    }
  
    update() {
      if (this.isPaused) return;
  
      this.player.update();
      this.updateEnemies();
      this.updateProjectiles();
      this.updatePowerups();
      this.updateCamera();
    }
  
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Apply camera transform
      this.ctx.save();
      this.ctx.translate(this.camera.x, this.camera.y);
      
      // Render game objects
      this.renderBackground();
      this.player.render(this.ctx);
      this.enemies.forEach(enemy => enemy.render(this.ctx));
      this.projectiles.forEach(proj => proj.render(this.ctx));
      this.powerups.forEach(powerup => powerup.render(this.ctx));
      
      this.ctx.restore();
      
      // Render HUD
      this.renderHUD();
    }
  
    renderHUD() {
      // Health bar
      const healthWidth = (this.player.health / this.player.maxHealth) * 200;
      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(10, 10, healthWidth, 20);
      
      // Level and score
      this.ctx.fillStyle = 'white';
      this.ctx.font = '20px Arial';
      this.ctx.fillText(`Level: ${Math.floor(this.score / 10)}`, 10, 50);
      this.ctx.fillText(`Score: ${this.score}`, 10, 80);
    }
  
    updateCamera() {
      this.camera.x = this.canvas.width / 2 - this.player.x;
      this.camera.y = this.canvas.height / 2 - this.player.y;
    }
  
    start() {
      this.gameLoop();
    }
  
    gameLoop() {
      this.update();
      this.render();
      requestAnimationFrame(() => this.gameLoop());
    }
  }