import { Drawable } from './drawable';
import { Unit } from './unit';
import { ProjectileTemplate } from './projectileTemplate';
import { Attack } from './attack';

export class Projectile extends Drawable {
    id: number;
    direction: number;
    template: ProjectileTemplate;
    attack: Attack;
    decay: number;
    originX: number;
    originY: number;

    penetrationsLeft: number;

    constructor(attack: Attack, direction: number) {
        super(attack.owner.gameboard, attack.template.image, attack.owner.team.color);
        this.id = Math.random();
        this.attack = attack;
        this.direction = direction;
        this.penetrationsLeft = attack.template.penetrations;
        this.color = attack.owner.color;
        this.sprite.x = attack.owner.sprite.x;
        this.sprite.y = attack.owner.sprite.y;
        this.decay = attack.template.projectileDecayTime; // change to length from origin instead of time
    }

    public move() {
        --this.decay;
        if (this.decay <= 0) {
            this.gameboard.removeProjectile(this);
            return;
        }
        this.sprite.x += Math.cos(this.direction) * this.attack.template.speed;
        this.sprite.y += Math.sin(this.direction) * this.attack.template.speed;
    }

    public hit(units: Unit[]) {
        for (const unit of units) {
            if (unit.id === this.attack.owner.id) {
                continue;
            }
            if (unit.team.id === this.attack.owner.team.id) {
                continue;
            }
            const distance = Math.hypot(this.sprite.x - unit.sprite.x, this.sprite.y - unit.sprite.y);
            if (distance <= this.attack.template.radius + unit.radius) {
                const isKill = unit.hit(this);
                this.attack.owner.currentHp += this.attack.template.damage * this.attack.template.lifeLeech;
                if (isKill) {
                    ++this.attack.owner.kills;
                    ++this.attack.owner.team.kills;
                }
                this.impact();
            }
        }
    }

    public impact() {
        if (this.penetrationsLeft <= 0) {
            this.gameboard.removeProjectile(this);
            --this.penetrationsLeft;
        }
    }
}
