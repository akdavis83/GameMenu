class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 31;
      this.height = 31;
      this.speed = 10;
      this.health = 10000;
      this.maxHealth = 10000;
      this.attack = 100;
      this.defense = 5;
      this.level = 1;
      
      // Status effects
      this.status = {
        fireResist: 0,
        iceResist: 0,
        magicResist: 0
      };
      
      // Power-ups
      this.powerups = {
        speedBoost: 0,
        attackBoost: 0,
        teleport: false
      };
      
      // Sprite loading
      this.sprite = new Image();
      this.sprite.src = "https://opengameart.org/sites/default/files/lpcmalegoldenarmorpreview.png";
      this.spriteX = 0;
      this.spriteY = 640;
    }
  
    update() {
      this.handleInput();
      this.updatePowerups();
      this.bounds();
    }
  
    handleInput() {
      if (keys['KeyW']) this.y -= this.speed;
      if (keys['KeyS']) this.y += this.speed;
      if (keys['KeyA']) this.x -= this.speed;
      if (keys['KeyD']) this.x += this.speed;
      if (keys['Space']) this.attack();
    }
  
    attack() {
      // Create new projectile
      const projectile = new Projectile(
        this.x + this.width / 2,
        this.y + this.height / 2,
        mouse.x,
        mouse.y,
        10 + this.powerups.attackBoost
      );
      gameEngine.projectiles.push(projectile);
    }
  
    updatePowerups() {
      // Update active power-up timers
      Object.keys(this.powerups).forEach(powerup => {
        if (this.powerups[powerup] > 0) {
          this.powerups[powerup]--;
        }
      });
    }
  
    bounds() {
      this.x = Math.max(0, Math.min(this.x, 90000 - this.width));
      this.y = Math.max(0, Math.min(this.y, 90000 - this.height));
    }
  
    render(ctx) {
      ctx.drawImage(
        this.sprite,
        this.spriteX,
        this.spriteY,
        64,
        64,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }