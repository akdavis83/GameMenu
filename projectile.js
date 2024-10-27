class Projectile {
    constructor(x, y, targetX, targetY, damage, type = 'player') {
      this.x = x;
      this.y = y;
      this.speed = 15;
      this.damage = damage;
      this.type = type;
      
      // Calculate direction
      const angle = Math.atan2(targetY - y, targetX - x);
      this.dx = Math.cos(angle) * this.speed;
      this.dy = Math.sin(angle) * this.speed;
      
      // Load sprite
      this.sprite = new Image();
      this.sprite.src = type === 'player' ? "../Orbs/Water Orb3.png" : "../Orbs/Fire Orb1.png";
      
      this.width = 20;
      this.height = 20;
      this.active = true;
    }
  
    update() {
      if (!this.active) return;
      
      this.x += this.dx;
      this.y += this.dy;
      
      // Check if out of bounds
      if (this.x < 0 || this.x > 90000 || this.y < 0 || this.y > 90000) {
        this.active = false;
      }
    }
  
    render(ctx) {
      if (!this.active) return;
      
      ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }