import { Drawable } from './drawable';
import { Gameboard } from './gameboard';
import { Projectile } from './projectile';
import { Team } from './team';
import { UnitTemplate } from './unitTemplate';

export class Unit extends Drawable {
  public id: number;
  public direction: number;
  public target: Unit;
  public team: Team;
  public targetDistance: number;
  public currentHp: number;
  public attackCooldown = 0;
  public kills = 0;
  public size: number;
  public readonly template: UnitTemplate;

  constructor(gameboard: Gameboard, team: Team, template: UnitTemplate) {
    super(gameboard, template.image, team.color);
    this.id = Math.random();
    this.template = template;
    this.currentHp = this.template.maxHp;
    this.color = team.color;
    this.team = team;
    this.image = template.image;
    this.size = template.size;
  }

  public move() {
    if (!this.target) {
      return;
    }

    if (this.targetDistance <= this.template.range / 2) {
      return;
    }
    const angle = Math.atan2(this.target.sprite.y - this.sprite.y, this.target.sprite.x - this.sprite.x);
    const x = this.sprite.x + Math.cos(angle) * this.template.speed;
    const y = this.sprite.y + Math.sin(angle) * this.template.speed;
    this.setPosition(x, y);
  }

  public setPosition(x: number, y: number) {
    this.sprite.x = x < 0 ? 0 : x > this.gameboard.app.renderer.width ? this.gameboard.app.renderer.width : x;
    this.sprite.y = y < 0 ? 0 : y > this.gameboard.app.renderer.height ? this.gameboard.app.renderer.height : y;
  }

  public dodge(projectiles: Projectile[]) {
    let closest: Projectile;
    let closestDistance: number;
    for (const projectile of projectiles) {
      if (projectile.shooter.id === this.id) {
        continue;
      }
      if (projectile.shooter.team.id === this.team.id) {
        continue;
      }
      const rawDistance = Math.hypot(this.sprite.x - projectile.sprite.x, this.sprite.y - projectile.sprite.y);
      const distance = rawDistance - projectile.shooter.template.projectileSize;
      if (!closest) {
        closest = projectile;
        closestDistance = distance;
      }
      if (distance < closestDistance) {
        closest = projectile;
        closestDistance = distance;
      }
    }

    if (!!closest && closestDistance < this.template.size * 3) {
      const angle = Math.atan2(closest.sprite.y - this.sprite.y, closest.sprite.x - this.sprite.x);
      const x = this.sprite.x - Math.cos(angle) * this.template.dodgeSpeed;
      const y = this.sprite.y - Math.sin(angle) * this.template.dodgeSpeed;
      this.setPosition(x, y);
    }
  }

  public findTarget(units: Unit[]) {
    let closest: Unit;
    let closestDistance: number;
    for (const unit of units) {
      if (unit.id === this.id) {
        continue;
      }
      if (unit.team.id === this.team.id) {
        continue;
      }
      const distance = Math.hypot(this.sprite.y - unit.sprite.y, this.sprite.x - unit.sprite.x);
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

      if (this.targetDistance <= this.template.range + this.target.template.size) {
        const angle = Math.atan2(this.target.sprite.y - this.sprite.y, this.target.sprite.x - this.sprite.x);
        const random = Math.random() > 0.5 ? 1 : -1;
        const accuracyRoll = Math.random() * this.template.accuracy * random;
        const projectile = new Projectile(this, angle + accuracyRoll);
        projectile.shooter = this;
        projectile.sprite.x = this.sprite.x;
        projectile.sprite.y = this.sprite.y;
        this.gameboard.addProjective(projectile);
      }
    }
  }

  public die() {
    this.gameboard.removeUnit(this);
  }

  public hit(projectile: Projectile): boolean {
    this.currentHp -= projectile.shooter.template.damage;
    if (this.currentHp <= 0) {
      this.die();
      return true;
    }
    return false;
  }
}
