import { ProjectileTemplate } from './projectileTemplate';
import { Unit } from './unit';
import { Projectile } from './projectile';

export class Attack {
    attackCooldown = 0;
    template: ProjectileTemplate;
    target: Unit;
    targetDistance: number;
    owner: Unit;

    constructor(template: ProjectileTemplate, owner: Unit) {
        this.template = template;
        this.owner = owner;
    }

    public findTarget(units: Unit[]) {
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
        this.target = closest;
        this.targetDistance = closestDistance;
      }

    public shoot(target: Unit) {
        if (!target) {
            return;
        }

        if (this.attackCooldown > 0) {
            --this.attackCooldown;
        }
        if (this.attackCooldown <= 0) {
            this.attackCooldown = this.template.attackSpeed;

            if (this.targetDistance <= this.template.maxRange + this.target.template.radius &&
                this.targetDistance >= this.template.minRange + this.target.template.radius) {

                const angle = Math.atan2(this.target.sprite.y - this.owner.sprite.y, this.target.sprite.x - this.owner.sprite.x);
                const random = Math.random() > 0.5 ? 1 : -1;
                const accuracyRoll = Math.random() * this.template.accuracy * random;
                const projectile = new Projectile(this, angle + accuracyRoll);
                this.owner.gameboard.addProjective(projectile);
            }
        }
    }
}
