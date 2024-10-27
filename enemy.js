class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 31;
      this.height = 31;
      this.speed = 5;
      this.health = 15000;
      this.attackPower = 50;
      this.attackRange = 400;
      this.projectileSpeed = 8;
      this.lastAttack = 0;
      this.attackCooldown = 1000; // ms
      
      // Random enemy type selection
      const types = [
        "../LPC imp/walk - sword shield.png",
        "../golem-walk.png",
        "../LPC imp/attack - pitchfork shield.png"
      ];
      this.sprite = new Image();
      this.sprite.src = types[Math.floor(Math.random() * types.length)];
    }
  
    update(player) {
      this.moveTowardsPlayer(player);
      this.attackPlayer(player);
    }
  
    moveTowardsPlayer(player) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > this.attackRange / 2) {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  
    attackPlayer(player) {
      const now = Date.now();
      if (now - this.lastAttack >= this.attackCooldown) {
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance <= this.attackRange) {
          // Create enemy projectile
          const angle = Math.atan2(dy, dx);
          const projectile = new Projectile(
            this.x,
            this.y,
            this.x + Math.cos(angle) * this.attackRange,
            this.y + Math.sin(angle) * this.attackRange,
            this.attackPower,
            'enemy'
          );
          gameEngine.projectiles.push(projectile);
          this.lastAttack = now;
        }
      }
    }
  
    render(ctx) {
      ctx.drawImage(
        this.sprite,
        0,
        0,
        64,
        64,
        this.x,
        this.y,
        this.width,
        this.height
      );
      
      // Health bar
      const healthPercent = this.health / 15000;
      ctx.fillStyle = 'red';
      ctx.fillRect(this.x, this.y - 10, this.width * healthPercent, 5);
    }
  }