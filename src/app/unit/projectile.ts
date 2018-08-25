import { Drawable } from './drawable';
import { Unit } from './unit';
import { ProjectileTemplate } from './projectileTemplate';
import { Attack } from './attack';

export class Projectile extends Drawable {
    id: number;
    direction: number;
    attack: Attack;
    originX: number;
    originY: number;
    rotation = 0;
    chainsLeft: number;
    hits: Unit[] = [];

    penetrationsLeft: number;

    constructor(from: Unit, attack: Attack, direction: number) {
        super(attack.owner.gameboard, attack.template.image, attack.owner.team.color);
        this.id = Math.random();
        this.attack = attack;
        this.direction = direction;
        this.penetrationsLeft = attack.template.penetrations;
        this.color = attack.owner.color;
        this.sprite.x = from.sprite.x;
        this.sprite.y = from.sprite.y;
        this.originX = from.sprite.x;
        this.originY = from.sprite.y;
        this.sprite.rotation = direction;
        this.chainsLeft = attack.template.chains;
    }

    public move() {
        this.sprite.x += Math.cos(this.direction) * this.attack.template.speed;
        this.sprite.y += Math.sin(this.direction) * this.attack.template.speed;

        const distance = Math.hypot(this.sprite.x - this.originX, this.sprite.y - this.originY);
        this.sprite.rotation = this.sprite.rotation + this.attack.template.rotation;

        if (distance >= this.attack.template.projectileDecayTime) {
            this.gameboard.removeProjectile(this);
        }
    }

    public hit(units: Unit[]) {
        for (const unit of units) {
            if (unit.id === this.attack.owner.id ||
                unit.team.id === this.attack.owner.team.id ||
                this.hits.filter(u => u.id === unit.id).length > 0) {
                continue;
            }
            const distance = Math.hypot(this.sprite.x - unit.sprite.x, this.sprite.y - unit.sprite.y);
            if (distance <= this.attack.template.radius + unit.radius) {
                this.hits.push(unit);
                this.impact();
                if (this.chainsLeft > 0) {
                    this.chain();
                }
                else if (this.penetrationsLeft > 0) {
                    this.penetrate();
                }

                const isKill = unit.hit(this);
                this.attack.owner.currentHp += this.attack.template.damage * this.attack.template.lifeLeech;
                if (isKill) {
                    ++this.attack.owner.kills;
                    ++this.attack.owner.team.kills;
                }
                return;
            }
        }
    }

    public penetrate() {
        --this.penetrationsLeft;
    }

    public impact() {
        if (this.penetrationsLeft <= 0 && this.chainsLeft <= 0) {
            this.gameboard.removeProjectile(this);
        }
    }

    public chain() {
        --this.chainsLeft;

        let target: Unit;
        let closestDistance: number;
        for (const unit of this.gameboard.units) {
            if (unit.id === this.attack.owner.id ||
                unit.team.id === this.attack.owner.team.id ||
                this.hits.filter(u => u.id === unit.id).length > 0) {
                continue;
            }
            const distance = Math.hypot(this.sprite.y - unit.sprite.y, this.sprite.x - unit.sprite.x);
            if (!target) {
                target = unit;
                closestDistance = distance;
            }
            if (distance < closestDistance) {
                target = unit;
                closestDistance = distance;
            }
        }

        if (!target) {
            return;
        }

        if (closestDistance <= this.attack.template.maxRange + target.template.radius) {
            const angle = Math.atan2(
                target.sprite.y - this.sprite.y,
                target.sprite.x - this.sprite.x);
            const random = Math.random() > 0.5 ? 1 : -1;
            const accuracyRoll = Math.random() * this.attack.template.accuracy * random;
            this.sprite.rotation = angle + accuracyRoll;
            this.direction = angle + accuracyRoll;
        }
    }
}
