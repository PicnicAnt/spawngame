import { Drawable } from "./drawable";
import { Unit } from "./unit";
import { Gameboard } from "./gameboard";
import { Point } from "pixi.js";
import { Team } from "./team";

export class Projectile extends Drawable {
    id: number;
    shooter: Unit;
    direction: number;

    penetrationsLeft: number;

    constructor(shooter: Unit, direction: number) {
        super(shooter.gameboard, shooter.template.projectileImage, shooter.team.color);
        this.id = Math.random();
        this.shooter = shooter;
        this.direction = direction;
        this.penetrationsLeft = this.shooter.template.projectilePenetrations;
        this.color = shooter.color;
    }

    public move() {
        this.sprite.x += Math.cos(this.direction) * this.shooter.template.projectileSpeed;
        this.sprite.y += Math.sin(this.direction) * this.shooter.template.projectileSpeed;
    }

    public hit(units: Unit[]) {
        for (const unit of units) {
            if (unit.id === this.shooter.id) {
                continue;
            }
            if (unit.team.id === this.shooter.team.id) {
                continue;
            }
            const distance = Math.hypot(this.sprite.x - unit.sprite.x, this.sprite.y - unit.sprite.y);
            if (distance <= this.shooter.template.projectileSize + unit.size / 2) {
                const isKill = unit.hit(this);
                this.shooter.currentHp += this.shooter.template.damage * this.shooter.template.lifeLeech;
                if (isKill) {
                    ++this.shooter.kills;
                    ++this.shooter.team.kills;
                    this.shooter.sprite.scale.set(this.shooter.currentHp / this.shooter.template.maxHp);
                    this.shooter.size *= this.shooter.currentHp / this.shooter.template.maxHp;
                }
                this.impact(unit);
            }
        }
    }

    public impact(unit: Unit) {
        if (this.penetrationsLeft <= 0) {
            this.gameboard.removeProjectile(this);
            --this.penetrationsLeft;
        }
    }
}