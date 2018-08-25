import { Drawable } from './drawable';
import { Gameboard } from './gameboard';
import { Projectile } from './projectile';
import { Team } from './team';
import { UnitTemplate } from './unitTemplate';
import { Attack } from './attack';

export class Unit extends Drawable {
  public id: number;
  public direction: number;
  public target: Unit;
  public team: Team;
  public targetDistance: number;
  public currentHp: number;
  public attackCooldown = 0;
  public kills = 0;
  public radius: number;
  public readonly template: UnitTemplate;
  public attacks: Attack[] = [];

  constructor(gameboard: Gameboard, team: Team, template: UnitTemplate) {
    super(gameboard, template.image, team.color);
    this.id = Math.random();
    this.template = template;
    this.currentHp = this.template.maxHp;
    this.color = team.color;
    this.team = team;
    this.image = template.image;
    this.radius = template.radius;

    for (const projectileTemplate of template.attacks) {
      const attack = new Attack(projectileTemplate, this);
      this.attacks.push(attack);
    }
  }

  public move() {
    if (!this.target) {
      return;
    }

    if (this.targetDistance <= this.template.maxRange &&
      this.targetDistance >= this.template.minRange) {
      return;
    }

    const angle = Math.atan2(this.target.sprite.y - this.sprite.y, this.target.sprite.x - this.sprite.x);
    let offsetX = Math.cos(angle) * this.template.speed;
    let offsetY = Math.sin(angle) * this.template.speed;

    if (this.targetDistance <= this.template.minRange) {
      offsetX *= -1;
      offsetY *= -1;
    }

    this.setPosition(this.sprite.x + offsetX, this.sprite.y + offsetY);
  }

  public setPosition(x: number, y: number) {
    this.sprite.x = x < 0 ? 0 : x > this.gameboard.app.renderer.width ? this.gameboard.app.renderer.width : x;
    this.sprite.y = y < 0 ? 0 : y > this.gameboard.app.renderer.height ? this.gameboard.app.renderer.height : y;
  }

  public dodge(projectiles: Projectile[]) {
    let closest: Projectile;
    let closestDistance: number;
    for (const projectile of projectiles) {
      if (projectile.attack.owner.id === this.id) {
        continue;
      }
      if (projectile.attack.owner.team.id === this.team.id) {
        continue;
      }
      const rawDistance = Math.hypot(this.sprite.x - projectile.sprite.x, this.sprite.y - projectile.sprite.y);
      const distance = rawDistance - projectile.attack.template.radius;
      if (!closest) {
        closest = projectile;
        closestDistance = distance;
      }
      if (distance < closestDistance) {
        closest = projectile;
        closestDistance = distance;
      }
    }

    if (!!closest && closestDistance < this.template.radius * 3) {
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

  public die() {
    this.gameboard.removeUnit(this);
  }

  public hit(projectile: Projectile): boolean {
    this.currentHp -= projectile.attack.template.damage;
    if (this.currentHp <= 0) {
      this.die();
      return true;
    }
    return false;
  }
}
