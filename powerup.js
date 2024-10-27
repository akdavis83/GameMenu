class PowerUp {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.type = type;
      this.width = 20;
      this.height = 20;
      this.active = true;
      
      // Define power-up effects
      this.effects = {
        speed: {
          duration: 5000,
          boost: 500
        },
        teleport: {
          duration: 3000,
          boost: 5000
        },
        attack: {
          duration: 10000,
          boost: 200
        }
      };
    }
  
    apply(player) {
      const effect = this.effects[this.type];
      
      switch(this.type) {
        case 'speed':
          player.speed += effect.boost;
          setTimeout(() => {
            player.speed -= effect.boost;
          }, effect.duration);
          break;
        
        case 'teleport':
          player.powerups.teleport = true;
          setTimeout(() => {
            player.powerups.teleport = false;
          }, effect.duration);
          break;
        
        case 'attack':
          player.powerups.attackBoost += effect.boost;
          setTimeout(() => {
            player.powerups.attackBoost -= effect.boost;
          }, effect.duration);
          break;
      }
      
      this.active = false;
    }
  
    render(ctx) {
      if (!this.active) return;
      
      ctx.fillStyle = this.getColor();
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    getColor() {
      switch(this.type) {
        case 'speed': return 'yellow';
        case 'teleport': return 'purple';
        case 'attack': return 'red';
        default: return 'white';
      }
    }
  }