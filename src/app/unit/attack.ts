import { ProjectileTemplate } from './projectileTemplate';
import { Unit } from './unit';
import { Projectile } from './projectile';

export class Attack {
    attackCooldown = 0;
    template: ProjectileTemplate;
    target: Unit;
    owner: Unit;

    constructor(template: ProjectileTemplate, owner: Unit) {
        this.template = template;
        this.owner = owner;
    }

    public findTarget(units: Unit[]): Unit {
        let closest: Unit;
        let closestDistance: number;
        for (const unit of units) {
          if (unit.id === this.owner.id) {
            continue;
          }
          if (unit.team.id === this.owner.team.id) {
            continue;
          }
          const distance = Math.hypot(this.owner.sprite.y - unit.sprite.y, this.owner.sprite.x - unit.sprite.x);
          if (!closest) {
            closest = unit;
            closestDistance = distance;
          }
          if (distance < closestDistance) {
            closest = unit;
            closestDistance = distance;
          }
        }
        
        return closest;
      }

    public shoot() {
        if (this.attackCooldown > 0) {
            --this.attackCooldown;
        }

        if (this.attackCooldown <= 0) {
            this.attackCooldown = this.template.attackSpeed;

            const target = this.findTarget(this.owner.gameboard.units);
            
            if (!target) {
                return;
            }
    
            const distance = Math.hypot(this.owner.sprite.y - target.sprite.y, this.owner.sprite.x - target.sprite.x);
    
            if (distance <= this.template.maxRange + target.template.radius &&
                distance >= this.template.minRange + target.template.radius) {
    
                const angle = Math.atan2(
                    target.sprite.y - this.owner.sprite.y, 
                    target.sprite.x - this.owner.sprite.x);
                const random = Math.random() > 0.5 ? 1 : -1;
                const accuracyRoll = Math.random() * this.template.accuracy * random;
                const projectile = new Projectile(this.owner, this, angle + accuracyRoll);
                this.owner.gameboard.addProjectile(projectile);
            }
        }
    }
}
